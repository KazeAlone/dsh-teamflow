import assert from 'node:assert/strict'
import { test } from 'node:test'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { Readable } from 'node:stream'
import { applyWorkflowOperations, checkpointReady, parseWorkflowOperations, workflowFingerprint } from '../lib/workflow.js'
import { createTeamDir, readTeam } from '../lib/state.js'
import { installWorkflowWorkbench } from '../lib/workflow-runtime.js'
import { registerAgentTeamsTools } from '../lib/tools.js'
import { decodeDrafts, draftStorageKey, pendingDrafts, propertyOperation, remainingMessage } from '../lib/client/workbench-drafts.js'
import { editorKey, initialEditorDraft, initialWorkbenchView, selectWorkbench, finishWorkbenchSave } from '../lib/client/workbench-selection.js'
import { taskReadiness } from '../lib/client/task-readiness.js'

const task = (id, dependencies = []) => ({id,subject:id,dependencies,status:'pending',attempt:0,createdAt:1,updatedAt:1})
const team = () => ({id:'demo',name:'Demo',captainSessionId:'captain',phase:'running',createdAt:1,taskSeq:1,members:[{id:'',name:'worker',role:'work',status:'idle',joinedAt:1}],tasks:[task('t1')]})

test('canvas placeholders retain wiring but cannot enter review until explicitly configured and resumed', () => {
  let source = applyWorkflowOperations(team(),[{action:'add_task',id:'gate',subject:'人工检查',checkpoint:true,configurationPending:true,dependencies:[]}])
  assert.equal(checkpointReady(source,source.tasks[1]),false)
  const before = structuredClone(source)
  assert.throws(() => applyWorkflowOperations(source,[{action:'update_task',id:'gate',confirmConfiguration:true}]),/要求/)
  assert.deepEqual(source,before)
  source = applyWorkflowOperations(source,[{action:'update_task',id:'gate',description:'检查成果',dependencies:['t1']}])
  assert.equal(source.tasks[1].workflowConfigPending,true,'saving text or wiring is not configuration approval')
  source = applyWorkflowOperations(source,[{action:'update_task',id:'gate',confirmConfiguration:true}])
  assert.equal(source.tasks[1].workflowConfigPending,false)
  assert.equal(source.tasks[1].workflowPaused,true,'running team still requires explicit resume')
  source.tasks[0].status='completed'; source.tasks[1].workflowPaused=false
  assert.equal(checkpointReady(source,source.tasks[1]),true)
  const staged = applyWorkflowOperations({...team(),phase:'staged'},[{action:'add_task',id:'new',subject:'New',configurationPending:true,dependencies:[]}])
  const configured=applyWorkflowOperations(staged,[{action:'update_task',id:'new',description:'Do the work',confirmConfiguration:true}])
  assert.equal(configured.tasks[1].workflowPaused,false,'configured staged work can run after team approval')
  assert.throws(()=>parseWorkflowOperations([{action:'update_task',id:'t1',confirmConfiguration:'yes'}]),/布尔/)
})

test('pending configuration survives disk reload and blocks resume, claiming and team start', async t => {
  const root=mkdtempSync(join(tmpdir(),'workflow-config-'));t.after(()=>rmSync(root,{recursive:true,force:true}))
  const stateRoot=join(root,'.agent-teams')
  const source=applyWorkflowOperations(team(),[{action:'add_task',id:'new',subject:'New',configurationPending:true,dependencies:[]}])
  await createTeamDir(stateRoot,source)
  let result,status,route
  const captain={id:'captain',status:'idle',session:{header:{id:'captain',cwd:root},ownEvents:()=>[]}}
  const definitions=new Map(), noop=()=>{}
  const ctx={on:()=>noop,effect:fn=>fn(),logger:{warn:noop,debug:noop},tools:{register:value=>definitions.set(value.name,value)},agents:{get:id=>id==='captain'?captain:undefined},llm:{resolveCallConfig:async value=>value},subagents:{followup:async()=>{},registerContinuableSetup:()=>noop}}
  const runtime=registerAgentTeamsTools(ctx,{stateDir:'.agent-teams',maxMembers:8,memberProvider:'spawn',memberMaxDepth:1,profiles:{},toolPolicies:{}})
  installWorkflowWorkbench(ctx,{stateDir:'.agent-teams',maxMembers:8},runtime,{register:value=>{route=value;return noop}})
  const request=async(action,fields={})=>{
    const req=Readable.from([JSON.stringify({sessionId:'captain',teamId:'demo',action,...fields})]);req.method='POST';req.headers={}
    await route.handler(req,{writeHead:code=>{status=code},end:body=>{result=JSON.parse(body)}})
  }
  assert.equal((await readTeam(stateRoot,'demo')).tasks[1].workflowConfigPending,true)
  await request('resume_task',{taskId:'new',base:workflowFingerprint(await readTeam(stateRoot,'demo'))});assert.equal(status,409);assert.match(result.error,/配置/)
  await assert.rejects(definitions.get('agent_teams_claim_task').execute({task_id:'new',assignee:'worker'},{agent:captain,signal:new AbortController().signal}),/configuration/)
  const {writeTeam}=await import('../lib/state.js')
  const staged=await readTeam(stateRoot,'demo');staged.phase='staged';await writeTeam(stateRoot,staged)
  await request('start');assert.equal(status,409);assert.match(result.error,/配置/)
  assert.equal((await readTeam(stateRoot,'demo')).phase,'staged')
  await request('edit',{base:workflowFingerprint(staged),title:'configure',operations:[{action:'update_task',id:'new',description:'Do the work',confirmConfiguration:true}]})
  assert.equal(status,200,JSON.stringify(result));assert.equal(result.team.tasks[1].workflowConfigPending,false)
})

test('draft persistence restores only scoped, changed objects and tolerates malformed storage', () => {
  const source=team(), target={type:'task',id:'t1'}
  let view=selectWorkbench(initialWorkbenchView(),target,source)
  assert.equal(pendingDrafts(source,view.drafts).length,0,'selection is not an edit')
  view=selectWorkbench(view,target,source,{description:'Unsaved text'})
  const saved=JSON.stringify({version:1,drafts:view.drafts})
  const restored=decodeDrafts(saved,source.id)
  assert.equal(pendingDrafts(source,restored)[0].entry.values.description,'Unsaved text')
  assert.deepEqual(decodeDrafts(saved,'other'),{})
  assert.deepEqual(decodeDrafts('{broken',source.id),{})
  assert.deepEqual(decodeDrafts(JSON.stringify({version:1,drafts:{bad:{source:1,values:[]}}}),source.id),{})
  assert.notEqual(draftStorageKey('captain','demo'),draftStorageKey('other','demo'))
  source.tasks[0].description='Server changed'
  assert.throws(()=>propertyOperation(source,target,restored[editorKey(source.id,target)]),/变化/)
})

test('bulk property save is atomic, preserves newer typing, and never confirms configuration or reruns', () => {
  const source=team();source.tasks[0].workflowConfigPending=true;source.tasks[0].workflowPaused=true
  const target={type:'task',id:'t1'}, key=editorKey(source.id,target)
  let view=selectWorkbench(initialWorkbenchView(),target,source,{description:'Submitted'})
  view=selectWorkbench(view,{type:'member',id:'worker'},source,{role:'New role'})
  const submitted=pendingDrafts(source,view.drafts), revision=view.revision
  const updated=applyWorkflowOperations(source,submitted.map(item=>propertyOperation(source,item.target,item.entry)))
  assert.equal(updated.tasks[0].workflowConfigPending,true)
  assert.equal(updated.members[0].role,'New role')
  view=selectWorkbench(view,target,source,{description:'Typed while saving'})
  for(const item of submitted) view=finishWorkbenchSave(view,item.key,item.entry,revision,updated,undefined,item.target)
  assert.equal(view.drafts[key].values.description,'Typed while saving')
  assert.equal(pendingDrafts(updated,view.drafts).length,1)
  assert.doesNotThrow(()=>propertyOperation(updated,target,view.drafts[key]))
  const terminal=team();terminal.tasks[0].status='completed'
  assert.throws(()=>propertyOperation(terminal,target,initialEditorDraft(terminal,target)),/不会自动重跑/)
  const before=structuredClone(source)
  assert.throws(()=>applyWorkflowOperations(source,[{action:'update_member',name:'worker',role:'Should rollback'},{action:'update_task',id:'t1',subject:''}]),/不能为空/)
  assert.deepEqual(source,before)
})

test('message completion preserves text entered while a previous message was sending', () => {
  assert.equal(remainingMessage('sent','sent'),'')
  assert.equal(remainingMessage('next message','sent'),'next message')
  assert.equal(remainingMessage('sent plus new text','sent'),'sent plus new text')
})

test('new member typing during creation is retained under its saved identity', () => {
  const source=team(), target={type:'member'}, key=editorKey(source.id,target)
  let view=selectWorkbench(initialWorkbenchView(),target,source,{name:'new-member',summary:'First summary'})
  const submitted=view.drafts[key], revision=view.revision
  view=selectWorkbench(view,target,source,{summary:'Typed while creating'})
  const saved=applyWorkflowOperations(source,[propertyOperation(source,target,submitted)])
  const next=finishWorkbenchSave(view,key,submitted,revision,saved,undefined,target)
  assert.equal(next.drafts[key],undefined)
  const restoredKey=editorKey(source.id,{type:'member',id:'new-member'})
  assert.equal(next.drafts[restoredKey].values.summary,'Typed while creating')
  const pending=pendingDrafts(saved,next.drafts)
  assert.equal(propertyOperation(saved,pending[0].target,pending[0].entry).action,'update_member','must not try to create the same member again')
})

test('readiness distinguishes upstream failures, pauses, busy members and host dispatch', () => {
  const source=team();const next=task('next',['t1']);source.tasks.push(next)
  source.tasks[0].status='failed'
  assert.deepEqual(taskReadiness(source,next).dependencies,['t1']);assert.match(taskReadiness(source,next).detail,/失败/)
  next.workflowPaused=true;next.workflowAwaitingStart=false;assert.equal(taskReadiness(source,next).label,'已暂停')
  next.workflowConfigPending=true;assert.equal(taskReadiness(source,next).label,'待配置')
  next.workflowConfigPending=false;next.workflowPaused=false;source.tasks[0].status='completed'
  assert.equal(taskReadiness(source,next).label,'等待调度')
  source.tasks.push({...task('busy'),assignee:'worker',status:'in_progress'})
  assert.equal(taskReadiness(source,next).label,'等待 Agent 空闲')
  source.members=[];assert.equal(taskReadiness(source,next).label,'缺少执行 Agent')
  source.phase='staged';assert.equal(taskReadiness(source,next).label,'等待团队启动')
})

test('downstream rerun labels explain waiting versus work or review ready for new inputs', () => {
  const source=team(), next={...task('next',['t1']),workflowPaused:true,workflowRerunRequired:true}
  source.tasks.push(next)
  assert.equal(taskReadiness(source,next).label,'等待上游新结果')
  assert.deepEqual(taskReadiness(source,next).dependencies,['t1'])
  source.tasks[0].status='completed'
  assert.equal(taskReadiness(source,next).label,'需要重新执行')
  assert.match(taskReadiness(source,next).detail,/运行到此节点/)
  next.checkpoint={round:2,history:[]}
  assert.equal(taskReadiness(source,next).label,'需要重新验收')
  assert.match(taskReadiness(source,next).detail,/人工检查仍需你确认/)
  source.tasks[0].status='failed'
  assert.equal(taskReadiness(source,next).label,'等待上游新结果')
  assert.match(taskReadiness(source,next).detail,/失败/)
  assert.equal(next.workflowPaused,true,'wording changes must not silently resume downstream work')
})


test('configuration errors identify the task and issue, and only explicit resolution allows confirmation', () => {
  const source=team(); Object.assign(source.tasks[0],{subject:'需要确认验收标准',description:'任务正文',adaptationIssue:'缺少验收阈值',workflowConfigPending:true})
  const before=structuredClone(source)
  assert.throws(()=>applyWorkflowOperations(source,[{action:'update_task',id:'t1',description:'补充正文',confirmConfiguration:true}]),/需要确认验收标准.*缺少验收阈值/)
  assert.deepEqual(source,before)
  const resolved=applyWorkflowOperations(source,[{action:'update_task',id:'t1',description:'补充正文与验收阈值',adaptationIssue:'',confirmConfiguration:true}])
  assert.equal(resolved.tasks[0].workflowConfigPending,false)
})
