import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createHash } from 'node:crypto'
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { applyWorkflowOperations, applyWorkflowProposal, checkpointReady, decideCheckpoint, parseWorkflowOperations, proposeWorkflow, workflowFingerprint, workflowState } from '../lib/workflow.js'
import { workflowMaterials, installWorkflowWorkbench } from '../lib/workflow-runtime.js'
import { Readable } from 'node:stream'
import { installTeamScheduler } from '../lib/scheduler.js'
import { cancelUnfinishedTask, createTeamDir, readArchivedTeam, readTeam, writeTeam } from '../lib/state.js'
import { assertWorkflowArchivable, prepareArchivedWorkflow } from '../lib/workflow-lifecycle.js'
import { registerAgentTeamsTools } from '../lib/tools.js'
import { installWorkflowConversations, workflowDiscussion } from '../lib/workflow-native.js'
import { connectionIssue, connectionTarget } from '../lib/client/workflow-connections.js'
import { openAgentTeamMember, openWorkflowConversation } from '../lib/client/session-navigation.js'
import { taskDraftOperations } from '../lib/client/workflow-draft.js'
import { rerunImpact, rerunnableTasks } from '../lib/task-rerun.js'
import { draftSource, editorKey, editorTarget, finishWorkbenchSave, initialWorkbenchView, selectWorkbench, targetDiscussion } from '../lib/client/workbench-selection.js'
import { arrangeTasks, fitGraph } from '../lib/client/workflow-layout.js'
import { flowControlVersion, flowControlState, taskControlState } from '../lib/client/task-control.js'

const member = { id: '', name: 'worker', role: 'developer', provider: 'fixture', model: 'fixture', status: 'idle', joinedAt: 1 }
const task = (id, dependencies = []) => ({ id, subject: id, assignee: 'worker', dependencies, status: 'pending', attempt: 0, kind: 'work', createdAt: 1, updatedAt: 1 })
const team = () => ({ id: 'demo', name: 'Demo', captainSessionId: 'captain-id', members: [{ ...member }], tasks: [task('t1')], taskSeq: 1, createdAt: 1, phase: 'running' })
const withGate = () => applyWorkflowOperations(team(), [{ action: 'add_task', id: 'gate', subject: 'Human review', checkpoint: true, dependencies: ['t1'] }, { action: 'add_task', id: 'after', subject: 'After', dependencies: ['gate'], assignee: 'worker' }])


async function lifecycleFixture(t, source, options = {}) {
  const root = mkdtempSync(join(tmpdir(), 'workflow-lifecycle-'))
  t.after(() => rmSync(root, {recursive:true,force:true}))
  const stateRoot = join(root, '.agent-teams')
  await createTeamDir(stateRoot, source)
  const captain = {id:'captain-id',status:'idle',session:{header:{cwd:root},ownEvents:()=>[]}}
  const dispatched = []
  let route
  const ctx = {agents:{get:id=>id===captain.id?captain:options.liveAgents?.get(id)}, on(){}, effect:fn=>fn(), logger:{warn(){},debug(){}}, subagents:{drainChildren:options.drain ?? (async()=>{})}}
  const scheduler = installTeamScheduler(ctx,{stateDir:'.agent-teams',dispatch:async(...args)=>{dispatched.push(args);return true}})
  installWorkflowWorkbench(ctx,{stateDir:'.agent-teams',maxMembers:8},scheduler,{register:value=>{route=value;return()=>{}}},options.conversations)
  const read = () => readTeam(stateRoot,'demo')
  const call = async (action, fields = {}) => {
    const req=Readable.from([JSON.stringify({sessionId:captain.id,teamId:'demo',action,...fields})]);req.method='POST';req.headers={}
    let code, value
    await route.handler(req,{writeHead:c=>{code=c},end:body=>{value=JSON.parse(body)}})
    return {code,...value}
  }
  return {workspace:root,read,call,dispatched,save:state=>writeTeam(stateRoot,state),kick:()=>scheduler.kickTeam(root,source.id,captain)}
}

test('conditional state omits unchanged large payloads but updates for live execution and edits',async t=>{
 const liveAgents=new Map(),source=team();source.members[0].id='worker-session';source.tasks[0].status='claimed'
 const f=await lifecycleFixture(t,source,{liveAgents})
 const initial=await f.call('state',{conditionalState:true});assert.equal(initial.code,200);assert.ok(initial.revision)
 const same=await f.call('state',{conditionalState:true,knownRevision:initial.revision});assert.equal(same.notModified,true);assert.equal(same.team,undefined)
 liveAgents.set('worker-session',{status:'running'})
 const running=await f.call('state',{conditionalState:true,knownRevision:initial.revision});assert.notEqual(running.revision,initial.revision);assert.equal(running.execution.t1,'active')
 const saved=await f.read();saved.tasks[0].subject='Updated';await f.save(saved)
 const changed=await f.call('state',{conditionalState:true,knownRevision:running.revision});assert.equal(changed.team.tasks[0].subject,'Updated')
 assert.ok((await f.call('state')).team,'old clients still receive complete state')
})

test('manual and approved AI additions share the first-start boundary for work and reviews', async t => {
  for (const action of ['edit','apply']) {
    const source=team();source.tasks[0].status='completed'
    const f=await lifecycleFixture(t,source)
    const operations=[{action:'add_task',id:'b',subject:'Inserted work',assignee:'worker',dependencies:['t1']},{action:'add_task',id:'review',subject:'Inserted review',checkpoint:true,dependencies:['b']}]
    let fields={title:'Add nodes',operations,base:workflowFingerprint(source)}
    if(action==='apply') {
      const preview=await f.call('preview',fields)
      assert.equal(preview.code,200,preview.error)
      fields={proposalId:preview.team.workflow.discussions['discussion:graph'].proposal.id}
    }
    const added=await f.call(action,fields)
    assert.equal(added.code,200,added.error)
    for(const item of added.team.tasks.slice(1)) {
      assert.equal(item.workflowPaused,true)
      assert.equal(item.workflowAwaitingStart,true)
      assert.equal(taskControlState(added.team,item).label,'task.control.awaitingStart')
    }
    assert.equal(f.dispatched.length,0)
    const started=await f.call('set_flow_enabled',{enabled:true,version:flowControlVersion(added.activity)})
    assert.equal(started.code,200,started.error)
    assert.equal(f.dispatched.length,1)
    assert.equal(started.team.tasks[2].checkpoint.decision,undefined)
    assert.equal(started.ready.includes('review'),false)
  }
})

test('explicit rerun dispatch carries the previous result and new requirements without changing the contract', async t => {
  const source=withGate()
  Object.assign(source.tasks[0],{status:'completed',description:'Original contract',output:'Previous delivered result',attemptId:'old',attempt:1})
  const f=await lifecycleFixture(t,source)
  let response=await f.call('edit',{base:workflowFingerprint(source),title:'Rerun',operations:[{action:'rerun_task',id:'t1'}]})
  assert.equal(response.code,409)
  assert.match(response.error,/本次重跑要求/)
  assert.equal((await f.read()).tasks[0].status,'completed')
  response=await f.call('edit',{base:workflowFingerprint(source),title:'Rerun with context',operations:[{action:'rerun_task',id:'t1',instructions:'Add failure coverage',workflowRerunContext:{previousOutput:'forged'}}]})
  assert.equal(response.code,200,response.error)
  const dispatched=f.dispatched[0][3]
  for(const value of ['Original contract','Previous delivered result','Add failure coverage','historical source material']) assert.ok(dispatched.includes(value),value)
  assert.ok(!dispatched.includes('forged'))
  let saved=await f.read()
  assert.equal(saved.tasks[0].description,'Original contract')
  assert.equal(saved.tasks[0].workflowRerunContext.previousOutput,'Previous delivered result')
  assert.equal(saved.tasks[0].workflowRerunContext.previousAttemptId,'old')
  assert.equal(saved.tasks[1].workflowRerunRequired,true)
  Object.assign(saved.tasks[0],{status:'completed',output:'Second result'});saved.members[0].status='idle';await f.save(saved)
  response=await f.call('edit',{base:workflowFingerprint(saved),title:'Next rerun',operations:[{action:'rerun_task',id:'t1',instructions:'Check accessibility'}]})
  assert.equal(response.code,200,response.error)
  saved=await f.read()
  assert.equal(saved.tasks[0].workflowRerunContext.previousOutput,'Second result')
  assert.equal(saved.tasks[0].workflowRerunContext.instructions,'Check accessibility')
  assert.equal(saved.tasks[0].description,'Original contract')
  assert.ok(f.dispatched[1][3].includes('Second result'))
  assert.ok(!f.dispatched[1][3].includes('Add failure coverage'))
})

test('pause all fences the entire chain before draining, retains results and recovers failed drains', async t => {
  const source=withGate()
  Object.assign(source.tasks[0],{status:'in_progress',attempt:1,attemptId:'run-a',output:'Partial A'})
  Object.assign(source.members[0],{id:'child-a',status:'working'})
  let f,fail=true
  f=await lifecycleFixture(t,source,{drain:async()=>{
    const during=await f.read()
    assert.ok(during.tasks.every(item=>item.workflowPaused),'all nodes fenced before the first child stops')
    assert.equal(checkpointReady(during,during.tasks[1]),false)
    const race=await f.call('set_task_enabled',{taskId:'after',enabled:true,updatedAt:during.tasks[2].updatedAt})
    assert.equal(race.code,409,'a second page cannot undo a bulk stop midway through its drain')
    if(fail) {fail=false;throw Error('drain failed')}
  }})
  let response=await f.call('set_flow_enabled',{enabled:false,version:flowControlVersion(source)})
  assert.equal(response.code,409)
  let current=await f.read()
  assert.equal(taskControlState(current,current.tasks[0]).stopping,true)
  assert.equal(flowControlState(current).canStart,false)
  response=await f.call('set_flow_enabled',{enabled:true,version:flowControlVersion(current)})
  assert.equal(response.code,409,'resume cannot race the outstanding stop')
  response=await f.call('set_flow_enabled',{enabled:false,version:flowControlVersion(current)})
  assert.equal(response.code,200,response.error)
  current=response.team
  assert.equal(current.tasks[0].status,'pending')
  assert.equal(current.tasks[0].attemptId,undefined)
  assert.equal(current.tasks[0].stoppedAttempts[0].output,'Partial A')
  assert.equal(current.tasks[0].stoppedAttempts.length,1,'retry does not invent another execution')
  assert.equal(current.members[0].id,'')
  assert.equal(f.dispatched.length,0)
  response=await f.call('set_flow_enabled',{enabled:true,version:flowControlVersion(response.activity)})
  assert.equal(response.code,200,response.error)
  assert.equal(f.dispatched.length,1,'only the root is eligible after restarting')
})

test('start all confirms reruns while preserving configuration, rejected reviews and terminal results', async t => {
  const source=withGate();source.tasks[0].status='completed';source.tasks[0].output='Keep result'
  source.tasks[1].checkpoint.decision='reject'
  source.tasks[2].workflowPaused=true
  source.tasks.push({...task('draft'),workflowPaused:true,workflowConfigPending:true},{...task('rerun'),workflowPaused:true,workflowRerunRequired:true},{...task('failed'),status:'failed'})
  const f=await lifecycleFixture(t,source)
  const stale=await f.call('set_flow_enabled',{enabled:true,version:'stale'})
  assert.equal(stale.code,409)
  const response=await f.call('set_flow_enabled',{enabled:true,version:flowControlVersion(source)})
  assert.equal(response.code,200,response.error)
  assert.equal(response.team.tasks[0].output,'Keep result')
  assert.equal(response.team.tasks[1].checkpoint.decision,'reject')
  assert.equal(response.team.tasks[2].workflowPaused,false)
  assert.equal(taskControlState(response.team,response.team.tasks[2]).label,'task.control.blocked')
  assert.equal(response.team.tasks.find(item=>item.id==='draft').workflowPaused,true)
  assert.equal(response.team.tasks.find(item=>item.id==='rerun').workflowPaused,false)
  assert.equal(response.team.tasks.find(item=>item.id==='rerun').workflowRerunRequired,false)
  assert.equal(response.team.tasks.at(-1).status,'failed')
  assert.equal(f.dispatched.length,1)
  assert.equal(checkpointReady({...source,tasks:[{...source.tasks[1],checkpoint:{round:1,history:[]},dependencies:[],workflowRerunRequired:true}]},{...source.tasks[1],checkpoint:{round:1,history:[]},dependencies:[],workflowRerunRequired:true}),false)
})

for (const legacy of [false, true]) test(`task discussion carries saved context, stays isolated and requires human approval (${legacy ? 'legacy' : 'modern'} history)`, async t => {
  const root=mkdtempSync(join(tmpdir(),'workflow-task-discussion-'));t.after(()=>rmSync(root,{recursive:true,force:true}))
  const stateRoot=join(root,'.agent-teams'), source=team()
  Object.assign(source.tasks[0],{description:'Saved requirements',dependencies:['up'],workflowPaused:true,workflowConfigPending:true})
  source.tasks.push({...task('up'),status:'completed',output:'Upstream evidence'},task('down',['t1']),{...task('unrelated'),output:'UNRELATED OUTPUT'})
  await createTeamDir(stateRoot,source)
  const definitions=new Map(), agents=new Map(), prompts=[], restrictions=[];let setup,route,status,response,kicks=0
  const captain={id:'captain-id',status:'idle',options:{provider:'fixture',model:'fixture'},session:{header:{cwd:root},requestHeader:()=>({config:{}}),ownEvents:()=>[]}}
  agents.set(captain.id,captain)
  const ctx={tools:{register:d=>definitions.set(d.name,d)},subagents:{registerContinuableSetup:fn=>{setup=fn}},llm:{resolveCallConfig:async v=>v},effect:fn=>fn(),sessions:{flush:async()=>{}},logger:{warn(){}},agents:{get:id=>agents.get(id),create:async spec=>{
    spec.setup({effect:fn=>fn(),tools:{restrict:filter=>{restrictions.push(filter);return()=>{}}}})
    const events=[], agent={id:spec.sessionId,status:'idle',session:{header:{cwd:root},...(legacy ? {events} : {ownEvents:()=>events})},whenIdle:async()=>{},followup:message=>{prompts.push(message);events.push({type:'user/message',seq:events.length+1,data:message})}}
    agents.set(agent.id,agent);return{agent,dispose(){}}
  }}}
  const conversations=installWorkflowConversations(ctx,{stateDir:'.agent-teams',maxMembers:8},workflowMaterials)
  installWorkflowWorkbench(ctx,{stateDir:'.agent-teams',maxMembers:8},{kickTeam:async()=>{kicks++}},{register:value=>{route=value;return()=>{}}},conversations)
  const call=async(action,fields={})=>{const req=Readable.from([JSON.stringify({action,sessionId:captain.id,teamId:'demo',discussion:'task:t1',...fields})]);req.method='POST';req.headers={};await route.handler(req,{writeHead:code=>{status=code},end:body=>{response=JSON.parse(body)}})}
  await call('open_discussion');assert.equal(status,200,JSON.stringify(response))
  const id=response.openedSessionId, agent=agents.get(id), exec={agent,signal:new AbortController().signal}
  assert.notEqual(id,captain.id);assert.match(prompts[0].content[0].text,/独立任务讨论：t1/);assert.match(prompts[0].content[0].text,/Saved requirements/)
  assert.match(prompts[0].content[0].text,/直接上游/);assert.match(prompts[0].content[0].text,/直接下游/);assert.equal(kicks,0)
  assert.deepEqual(restrictions,[{allow:['agent_teams_workflow_context','agent_teams_workflow_propose']}])
  const restoredFilters=[], hooks=[]
  setup({agent,tools:{restrict:filter=>{restoredFilters.push(filter);return()=>{}}},systemPrompt:{section:()=>()=>{},getSectionOrder:()=>0},on:(event,fn)=>{hooks.push(fn);return()=>{}}})
  assert.deepEqual(restoredFilters,restrictions,'restored task conversations retain proposal-only tools')
  const read=async()=>JSON.parse(await definitions.get('agent_teams_workflow_context').execute({},exec))
  let context=await read()
  assert.equal(context.task.description,'Saved requirements');assert.equal(context.owner.name,'worker')
  assert.equal(context.upstream[0].output,'Upstream evidence');assert.equal(context.downstream[0].id,'down')
  assert.doesNotMatch(JSON.stringify(context),/UNRELATED OUTPUT/)
  const propose=operations=>definitions.get('agent_teams_workflow_propose').execute({base:context.base,title:'Refine task',operations},exec)
  await assert.rejects(propose([{action:'update_member',name:'worker',summary:'not allowed'}]),/只能调整/)
  await assert.rejects(propose([{action:'update_task',id:'unrelated',description:'not allowed'}]),/只能调整/)
  await assert.rejects(propose([{action:'update_task',id:'t1',confirmConfiguration:true}]),/完成配置/)
  await propose([{action:'update_task',id:'t1',description:'Suggested requirements: {"port":80}\nC:\\workspace\\validator.mjs'}])
  let saved=await readTeam(stateRoot,'demo');const proposal=saved.workflow.discussions['discussion:task:t1'].proposal
  assert.equal(saved.tasks[0].description,'Saved requirements','AI suggestion does not mutate task')
  await call('open_discussion');assert.equal(response.openedSessionId,id);assert.equal(prompts.length,1,'reopen preserves native history without another introduction')
  await call('conversation_send',{message:'Explain the dependencies'});assert.equal(status,200);assert.equal(prompts.at(-1).content[0].text,'Explain the dependencies')
  await call('conversation_state');assert.equal(status,200);assert.equal(response.messages.at(-1).text,'Explain the dependencies')
  await call('conversation_state',{discussion:'member:worker'});assert.equal(status,409,'another scope cannot reuse the task session')
  await call('apply',{sessionId:id,proposalId:proposal.id});assert.equal(status,200,JSON.stringify(response));assert.equal(response.currentDiscussion,'task:t1')
  saved=await readTeam(stateRoot,'demo');assert.equal(saved.tasks[0].description,'Suggested requirements: {"port":80}\nC:\\workspace\\validator.mjs');assert.equal(saved.tasks[0].workflowConfigPending,true);assert.equal(saved.tasks[0].workflowPaused,true)
  context=await read();saved.tasks[0].description='Concurrent edit';await writeTeam(stateRoot,saved)
  await assert.rejects(propose([{action:'update_task',id:'t1',description:'Stale'}]),/团队已变化/)
  context=await read();assert.equal(context.task.description,'Concurrent edit')
  saved.tasks=saved.tasks.filter(item=>item.id!=='t1');await writeTeam(stateRoot,saved)
  await assert.rejects(read(),/讨论对象不存在/)
  assert.deepEqual(await hooks[0]({agent},()=>({kind:'allow'})),{kind:'reject'},'deleted task cannot resume a discussion turn')
})

test('running and finished tasks can be discussed without starting or changing execution', async t => {
  const root=mkdtempSync(join(tmpdir(),'workflow-task-status-'));t.after(()=>rmSync(root,{recursive:true,force:true}))
  const definitions=new Map(), nativeId=`session-at-discussion-${createHash('sha256').update('demo').digest('hex').slice(0,16)}-00000000-0000-0000-0000-000000000009`
  const source=team();source.tasks[0].status='in_progress'
  workflowDiscussion(source,'task:t1').native={sessionId:nativeId,label:'task-discussion'}
  assert.throws(()=>workflowDiscussion(withGate(),'task:gate'),/不存在/);assert.throws(()=>workflowDiscussion(source,'task:missing'),/不存在/)
  const stateRoot=join(root,'.agent-teams');await createTeamDir(stateRoot,source)
  installWorkflowConversations({tools:{register:value=>definitions.set(value.name,value)},subagents:{registerContinuableSetup(){}}},{stateDir:'.agent-teams',maxMembers:8},workflowMaterials)
  const exec={agent:{id:nativeId,session:{header:{cwd:root}}},signal:new AbortController().signal}
  const read=async()=>JSON.parse(await definitions.get('agent_teams_workflow_context').execute({},exec))
  let context=await read();assert.equal(context.task.status,'in_progress')
  const propose=operations=>definitions.get('agent_teams_workflow_propose').execute({base:context.base,title:'Task suggestion',operations},exec)
  await assert.rejects(propose([{action:'update_task',id:'t1',description:'unsafe'}]))
  const saved=await readTeam(stateRoot,'demo');Object.assign(saved.tasks[0],{status:'failed',output:'Failure details',commandsRun:[{command:'test',status:'failed',evidence:'failed assertion'}]});await writeTeam(stateRoot,saved)
  context=await read();assert.equal(context.task.output,'Failure details');assert.equal(context.task.commandsRun[0].evidence,'failed assertion')
  await propose([{action:'rerun_task',id:'t1',instructions:'Fix the reported failure'}])
  const proposed=await readTeam(stateRoot,'demo');assert.equal(proposed.tasks[0].status,'failed');assert.equal(proposed.workflow.discussions['discussion:task:t1'].proposal.status,'pending')
})

const sixOfSeven = () => {
  const source=team();source.tasks=Array.from({length:6},(_,i)=>({...task(`t${i+1}`),status:'completed',output:`result ${i+1}`}));source.taskSeq=6
  return applyWorkflowOperations(source,[{action:'add_task',id:'gate',subject:'人工检查',description:'核对全部六项成果',checkpoint:true,dependencies:source.tasks.map(t=>t.id)}])
}

test('archive tool refuses 6/7 workflows before modifying members or durable results', async t => {
  const root=mkdtempSync(join(tmpdir(),'workflow-archive-guard-'));t.after(()=>rmSync(root,{recursive:true,force:true}))
  const source=sixOfSeven(), stateRoot=join(root,'.agent-teams');await createTeamDir(stateRoot,source)
  const captain={id:'captain-id',status:'idle',session:{header:{id:'captain-id',cwd:root},ownEvents:()=>[]}}
  const definitions=new Map(), noop=()=>{}
  const ctx={on:()=>noop,effect:fn=>fn(),logger:{warn:noop,debug:noop},tools:{register:value=>definitions.set(value.name,value)},agents:{get:id=>id===captain.id?captain:undefined},llm:{resolveCallConfig:async value=>value},subagents:{followup:async()=>{},registerContinuableSetup:()=>noop}}
  registerAgentTeamsTools(ctx,{stateDir:'.agent-teams',memberProvider:'spawn',memberMaxDepth:1,maxMembers:8,profiles:{},toolPolicies:{}})
  await assert.rejects(definitions.get('agent_teams_delete').execute({},{agent:captain,signal:new AbortController().signal}),/未完成节点.*不能归档/)
  assert.deepEqual(await readTeam(stateRoot,'demo'),JSON.parse(JSON.stringify(source)),'guard runs before retiring or deleting any member')
  assert.equal(await readArchivedTeam(stateRoot,'demo'),undefined)
  const status=await definitions.get('agent_teams_status').execute({},{agent:captain,signal:new AbortController().signal})
  const gate=status.tasks.find(t=>t.id==='gate');assert.equal(gate.human_checkpoint,true);assert.equal(gate.checkpoint_decision,'pending')
  const text=definitions.get('agent_teams_status').output.render({},status)[0].text
  assert.match(text,/HUMAN CHECKPOINT/);assert.match(text,/聊天文字不改变审批状态/)
})

test('restoring an archive preserves finished work and pauses unfinished execution with fresh members', () => {
  const source=sixOfSeven();source.members[0].id='retired-child';source.members[0].status='removed'
  source.tasks.push({...task('unfinished'),status:'claimed',attempt:2,attemptId:'old-capability',output:'partial output'})
  const before=structuredClone(source), restored=prepareArchivedWorkflow(source)
  assert.deepEqual(source,before);assert.equal(restored.phase,'staged');assert.equal(restored.planReviewState,'awaiting_review')
  assert.deepEqual(restored.tasks.slice(0,6),source.tasks.slice(0,6));assert.equal(restored.tasks[6].status,'pending')
  assert.equal(restored.members[0].status,'idle');assert.equal(restored.members[0].id,'');assert.ok(restored.members[0].previousSessionIds.includes('retired-child'))
  const unfinished=restored.tasks.at(-1)
  assert.equal(unfinished.status,'pending');assert.equal(unfinished.workflowPaused,true);assert.equal(unfinished.workflowRerunRequired,false)
  assert.equal(unfinished.attempt,2);assert.equal(unfinished.attemptId,undefined);assert.equal(unfinished.stoppedAttempts[0].output,'partial output')
  assert.equal(editorTarget(restored,{type:'task',id:'unfinished'}).type,'task')
  assertWorkflowArchivable({...restored,tasks:restored.tasks.map(t=>({...t,status:'cancelled'}))})
  const proposal=proposeWorkflow(sixOfSeven(),'old proposal',[{action:'update_member',name:'worker',summary:'old suggestion'}])
  workflowState(source).discussions['discussion:graph']={key:'graph',messages:[],calls:[],proposal}
  assert.equal(prepareArchivedWorkflow(source).workflow.discussions['discussion:graph'].proposal.status,'dismissed','stale proposals cannot block starting the restored plan')
})

test('archive recovery route is owner-bound, never starts work, and formal approval changes 6/7 into 7/7',async t=>{
  const root=mkdtempSync(join(tmpdir(),'workflow-recover-'));t.after(()=>rmSync(root,{recursive:true,force:true}))
  const stateRoot=join(root,'.agent-teams'), source=sixOfSeven();source.members[0].status='removed';source.members[0].id='retired-child'
  await createTeamDir(join(stateRoot,'archive'),source)
  const captain={id:'captain-id',status:'idle',session:{header:{id:'captain-id',cwd:root},ownEvents:()=>[]}}, stranger={...captain,id:'stranger'}
  let handler,status,response,kicks=0
  const ctx={agents:{get:id=>id===captain.id?captain:id===stranger.id?stranger:undefined},effect:fn=>fn(),logger:{warn(){}}}
  installWorkflowWorkbench(ctx,{stateDir:'.agent-teams',maxMembers:8},{kickTeam:async()=>{kicks++}},{register:value=>{handler=value;return()=>{}}})
  async function send(action,extra={}) {const req=Readable.from([JSON.stringify({sessionId:captain.id,teamId:'demo',action,...extra})]);req.method='POST';req.headers={};await handler.handler(req,{writeHead:code=>{status=code},end:body=>{response=JSON.parse(body)}})}
  await send('archive_state',{sessionId:stranger.id});assert.equal(status,409)
  await send('archive_state');assert.equal(status,200,JSON.stringify(response));assert.deepEqual(response.team,JSON.parse(JSON.stringify(source)))
  assert.equal(await readTeam(stateRoot,'demo'),undefined,'inspecting an archive never restores or starts it');assert.equal(kicks,0)
  await send('edit',{base:workflowFingerprint(source),title:'must not edit archive',operations:[{action:'update_member',name:'worker',summary:'unsafe'}]});assert.equal(status,409)
  await send('restore_archive',{sessionId:stranger.id});assert.equal(status,409);assert.equal(await readTeam(stateRoot,'demo'),undefined)
  await send('restore_archive');assert.equal(status,200,JSON.stringify(response));assert.equal(kicks,0);assert.equal(response.team.phase,'staged');assert.equal(response.activity.tasks.filter(t=>t.status==='completed').length,6)
  assert.deepEqual(await readArchivedTeam(stateRoot,'demo'),JSON.parse(JSON.stringify(source)),'original archive remains intact')
  await send('restore_archive');assert.equal(status,409,'cannot overwrite a live team')
  const restored=await readTeam(stateRoot,'demo');restored.phase='running';await writeTeam(stateRoot,restored)
  await send('materials',{discussion:'check:gate'});assert.equal(status,200,JSON.stringify(response))
  const evidence=response.team.workflow.discussions['discussion:check:gate'].evidence
  await send('review',{taskId:'gate',decision:'approve',note:'已核对六项成果',evidence})
  assert.equal(status,200,JSON.stringify(response));assert.equal(response.team.tasks.filter(t=>t.status==='completed').length,7)
  assert.equal(response.activity.tasks.filter(t=>t.status==='completed').length,7,'the main activity view receives the same approved state immediately')
  assert.equal(response.team.tasks.find(t=>t.id==='gate').checkpoint.decision,'approve');assert.ok(await readTeam(stateRoot,'demo'),'approval does not archive the team')
})

test('completed canvas tasks edit and rerun atomically while preserving unrelated work and suspending descendants',()=>{
  const source=withGate();source.tasks[0].status='completed';source.tasks[0].output='old result'
  source.tasks[0].attempt=1;source.tasks[0].objective='keep objective';source.tasks[0].acceptance=['keep acceptance']
  source.tasks[1].status='completed';source.tasks[1].checkpoint.decision='approve'
  source.tasks[2].status='completed';source.tasks[2].output='downstream old'
  source.tasks.push({...task('unrelated'),status:'completed',output:'preserved'})
  source.members.push({...member,name:'replacement'})
  const before=structuredClone(source), operation=parseWorkflowOperations([{action:'rerun_task',id:'t1',instructions:'Use the previous result and check the new requirement',subject:'Revised task',description:'New requirement',assignee:'replacement',output:'ignore forged result'}])[0]
  assert.equal(editorTarget(source,{type:'task',id:'t1'},true).type,'task')
  const result=applyWorkflowOperations(source,[operation])
  assert.deepEqual(source,before);assert.equal(result.tasks[0].subject,'Revised task');assert.equal(result.tasks[0].description,'New requirement');assert.equal(result.tasks[0].assignee,'replacement')
  assert.equal(result.tasks[0].status,'pending');assert.equal(result.tasks[0].output,undefined);assert.equal(result.tasks[0].objective,'keep objective');assert.deepEqual(result.tasks[0].acceptance,['keep acceptance'])
  assert.equal(result.tasks[1].workflowPaused,true);assert.equal(result.tasks[1].checkpoint.decision,undefined);assert.equal(result.tasks[2].workflowRerunRequired,true)
  assert.deepEqual(result.tasks[3],source.tasks[3])
  for(const extra of [{subject:''},{assignee:'missing'}]) assert.throws(()=>applyWorkflowOperations(source,[{action:'rerun_task',id:'t1',...extra}]))
  assert.deepEqual(source,before,'rejected edited reruns leave all prior results intact')
})

test('member, task, checkpoint and discussion selection each own one property context', () => {
  const source=withGate(); let view=selectWorkbench(initialWorkbenchView(),{type:'task',id:'t1'},source)
  assert.equal(editorTarget(source,view.target).type,'task')
  view=selectWorkbench(view,{type:'member',id:'worker'},source)
  assert.deepEqual(view.target,{type:'member',id:'worker'});assert.equal(editorTarget(source,view.target).type,'member');assert.equal(targetDiscussion(view.target),'member:worker')
  view=selectWorkbench(view,{type:'check',id:'gate'},source)
  assert.equal(editorTarget(source,view.target).type,'check');assert.equal(targetDiscussion(view.target),'check:gate')
  view=selectWorkbench(view,{type:'edge',from:'t1',to:'gate'},source)
  assert.equal(editorTarget(source,view.target),undefined);assert.equal(targetDiscussion(view.target),'graph')
  view=selectWorkbench(view,{type:'discussion',key:'member:worker'},source)
  assert.equal(editorTarget(source,view.target),undefined,'leaving member editing cannot expose an old task selection')
})

test('unsaved member and task drafts survive switching while saved source is unchanged', () => {
  const source=team(), memberTarget={type:'member',id:'worker'}, taskTarget={type:'task',id:'t1'}
  let view=selectWorkbench(initialWorkbenchView(),memberTarget,source,{executionPrompt:'Unsaved PE'})
  const memberKey=editorKey(source.id,memberTarget)
  view=selectWorkbench(view,taskTarget,source,{description:'Unsaved task requirement'})
  const taskKey=editorKey(source.id,taskTarget)
  view=selectWorkbench(view,memberTarget,source)
  assert.equal(view.drafts[memberKey].values.executionPrompt,'Unsaved PE')
  assert.equal(view.drafts[taskKey].values.description,'Unsaved task requirement')
  assert.equal(view.drafts[memberKey].source,draftSource(source,memberTarget))
  const taskSource=draftSource(source,taskTarget);source.tasks[0].dependencies=['another-task'];source.tasks[0].updatedAt=2
  assert.equal(draftSource(source,taskTarget),taskSource,'moving or connecting nodes cannot invalidate property drafts that do not edit dependencies')
  source.members[0].role='Concurrent edit'
  assert.notEqual(view.drafts[memberKey].source,draftSource(source,memberTarget),'concurrent configuration changes cannot silently overwrite a retained draft')
  assert.notEqual(editorKey('another-team',memberTarget),memberKey)
})

test('late saves cannot move a newer selection or remove newer typing', () => {
  const source=team(), target={type:'task',id:'t1'}, key=editorKey(source.id,target)
  let view=selectWorkbench(initialWorkbenchView(),target,source,{description:'Submitted value'})
  const revision=view.revision, submitted=view.drafts[key]
  view=selectWorkbench(view,{type:'member',id:'worker'},source,{role:'Member draft'})
  const completed=finishWorkbenchSave(view,key,submitted,revision,source,{type:'discussion',key:'graph'})
  assert.deepEqual(completed.target,view.target);assert.equal(completed.revision,view.revision);assert.equal(completed.drafts[key],undefined)
  const memberKey=editorKey(source.id,{type:'member',id:'worker'})
  assert.equal(completed.drafts[memberKey].values.role,'Member draft')
  view=selectWorkbench(view,target,source,{description:'Newer typing during save'})
  assert.equal(finishWorkbenchSave(view,key,submitted,revision,source).drafts[key].values.description,'Newer typing during save')
  const saved=structuredClone(source);saved.tasks[0].description='Submitted value';saved.tasks[0].updatedAt=2
  const retained=finishWorkbenchSave(view,key,submitted,revision,saved,undefined,target)
  assert.equal(retained.drafts[key].values.description,'Newer typing during save')
  assert.equal(retained.drafts[key].source,draftSource(saved,target),'our own save advances the baseline without discarding newer typing')
  const memberTarget={type:'member',id:'worker'}, routeKey=editorKey(source.id,memberTarget)
  let routeView=selectWorkbench(initialWorkbenchView(),memberTarget,source,{model:'submitted-model',routeChanged:'yes'})
  const routeDraft=routeView.drafts[routeKey], routeRevision=routeView.revision
  routeView=selectWorkbench(routeView,memberTarget,source,{model:'newer-model',routeChanged:'yes'})
  saved.members[0].model='submitted-model'
  const routeSaved=finishWorkbenchSave(routeView,routeKey,routeDraft,routeRevision,saved,undefined,memberTarget)
  assert.equal(routeSaved.drafts[routeKey].values.model,'newer-model');assert.equal(routeSaved.drafts[routeKey].values.routeChanged,'yes','newer model changes still get submitted on the next save')
})

test('completed work remains a task selection and explicit member navigation clears it', () => {
  const source=team();source.tasks[0].status='completed'
  let view=selectWorkbench(initialWorkbenchView(),{type:'task',id:'t1'},source)
  assert.equal(editorTarget(source,view.target),undefined,'completed work has read-only task properties')
  view=selectWorkbench(view,{type:'member',id:'worker'},source,{rerunTaskId:'t1'})
  assert.equal(view.target.type,'member');assert.equal(editorTarget(source,view.target).type,'member')
  view=selectWorkbench(view,{type:'discussion',key:'member:worker'},source)
  assert.equal(view.target.type,'discussion','cancelling does not fall back to the completed task')
})

test('rerun overwrites the same task, suspends all transitive dependents and preserves unrelated work', () => {
  const source=withGate()
  source.members.push({...member,name:'other'})
  Object.assign(source.tasks[0],{status:'completed',attempt:3,attemptId:'old',output:'old result',profileSeedId:'seed',deliverables:['report.md'],coverageOf:['goal'],commandsRun:[{command:'check',status:'passed'}],supplementalEvidence:[{at:1,by:'worker',attempt:3,note:'old note'}]})
  decideCheckpoint(source,'gate','approve','old-evidence','old-evidence','old approval')
  Object.assign(source.tasks[2],{status:'completed',attempt:2,output:'dependent old result',assignee:'other',reviewedAttempt:3,reviewedArtifacts:[{path:'report.md',present:false}]})
  source.tasks.push({...task('parallel'),assignee:'other',status:'completed',output:'preserve this'}, {...task('future',['after']),assignee:'other'})
  workflowState(source).discussions['discussion:check:gate']={key:'check:gate',messages:[],calls:[],materials:'old materials',evidence:'old-evidence',materialsRound:1,native:{sessionId:'review-session',label:'review',reviewEvidence:'old-evidence'}}
  const before=structuredClone(source)
  const result=applyWorkflowOperations(source,[{action:'update_member',name:'worker',executionPrompt:'New PE'},{action:'rerun_task',id:'t1',instructions:'Check again'}])
  assert.deepEqual(source,before,'proposal validation is pure')
  assert.equal(result.tasks.length,source.tasks.length); assert.equal(result.taskSeq,source.taskSeq)
  assert.deepEqual(result.tasks.map(t=>[t.id,t.dependencies]),source.tasks.map(t=>[t.id,t.dependencies]),'IDs and connections do not change')
  const selected=result.tasks[0]
  assert.equal(selected.status,'pending'); assert.equal(selected.workflowPaused,false); assert.equal(selected.attempt,3,'generation stays monotonic')
  assert.equal(selected.attemptId,undefined); assert.equal(selected.output,undefined); assert.equal(selected.supplementalEvidence,undefined)
  assert.equal(selected.commandsRun,undefined); assert.equal(selected.workflowRerunContext.instructions,'Check again'); assert.equal(selected.description,source.tasks[0].description)
  assert.equal(selected.profileSeedId,'seed'); assert.deepEqual(selected.deliverables,['report.md']); assert.deepEqual(selected.coverageOf,['goal'])
  for(const id of ['gate','after','future']) {
    const item=result.tasks.find(t=>t.id===id)
    assert.equal(item.status,'pending'); assert.equal(item.workflowPaused,true); assert.equal(item.workflowRerunRequired,true); assert.equal(item.output,undefined)
  }
  assert.equal(result.tasks[2].reviewedAttempt,undefined); assert.equal(result.tasks[2].reviewedArtifacts,undefined)
  assert.equal(result.tasks[1].checkpoint.round,2); assert.equal(result.tasks[1].checkpoint.decision,undefined); assert.equal(result.tasks[1].checkpoint.history.length,1)
  assert.deepEqual(result.tasks.find(t=>t.id==='parallel'),source.tasks.find(t=>t.id==='parallel'))
  assert.deepEqual(result.members[1],source.members[1]); assert.equal(result.members[0].executionPrompt,'New PE')
  assert.equal(checkpointReady(result,result.tasks[1]),false)
  const review=result.workflow.discussions['discussion:check:gate']
  assert.equal(review.materials,undefined);assert.equal(review.evidence,undefined);assert.equal(review.materialsRound,undefined);assert.equal(review.native.reviewEvidence,undefined);assert.equal(review.native.sessionId,'review-session','discussion context is retained while obsolete materials are invalidated')
  assert.deepEqual(rerunImpact(source.tasks,'t1').descendants.map(t=>t.id),['gate','after','future'])
})

test('rerun rejects active work and invalid targets without partially saving member changes', () => {
  for(const mutate of [s=>s.tasks[0].status='pending',s=>s.phase='staged',s=>s.halted=true,s=>s.members[0].status='removed',s=>s.members[0].stopping=true,s=>s.tasks[2].status='in_progress',s=>s.tasks.push({...task('busy'),status:'claimed'})]) {
    const source=withGate();source.tasks[0].status='completed';mutate(source)
    const before=structuredClone(source)
    assert.throws(()=>applyWorkflowOperations(source,[{action:'update_member',name:'worker',summary:'must not save'},{action:'rerun_task',id:'t1',instructions:'Recheck the previous result'}]))
    assert.deepEqual(source,before)
  }
  const source=withGate();source.tasks[0].status='completed'
  assert.throws(()=>applyWorkflowOperations(source,[{action:'rerun_task',id:'gate'}]),/只能重跑/)
  assert.throws(()=>applyWorkflowOperations(source,[{action:'rerun_task',id:'missing'}]),/不存在/)
  assert.deepEqual(rerunnableTasks(source.tasks,'worker').map(t=>t.id),['t1'])
  assert.deepEqual(parseWorkflowOperations([{action:'rerun_task',id:'t1',instructions:' fix ',output:'untrusted'}]),[{action:'rerun_task',id:'t1',instructions:'fix'}])
})

for (const initialStatus of ['completed','cancelled','failed']) test(`rerun ${initialStatus} route dispatches one task; downstream waits for manual confirmation and new human approval`, async t => {
  const root=mkdtempSync(join(tmpdir(),'workflow-rerun-'));t.after(()=>rmSync(root,{recursive:true,force:true}))
  const source=withGate();Object.assign(source.tasks[0],{status:'completed',output:'OLD RESULT',attempt:1,attemptId:'old-capability'})
  source.members.push({...member,name:'other'})
  Object.assign(source.tasks[2],{status:'completed',output:'OLD DOWNSTREAM',attempt:1,assignee:'other'})
  decideCheckpoint(source,'gate','approve','old','old','previous approval')
  source.tasks[0].status=initialStatus
  source.tasks.push({...task('parallel'),assignee:'other',status:'completed',output:'UNRELATED'})
  await createTeamDir(join(root,'.agent-teams'),source)
  const captain={id:'captain-id',status:'idle',session:{header:{cwd:root},ownEvents:()=>[]}}
  const dispatched=[];let route,status,response
  const ctx={agents:{get:id=>id===captain.id?captain:undefined},on(){},effect:fn=>fn(),logger:{warn:message=>{throw Error(message)}}}
  const scheduler=installTeamScheduler(ctx,{stateDir:'.agent-teams',dispatch:async(...args)=>{dispatched.push(args);return true}})
  installWorkflowWorkbench(ctx,{stateDir:'.agent-teams',maxMembers:8},scheduler,{register:value=>{route=value;return()=>{}}})
  const read=()=>readTeam(join(root,'.agent-teams'),'demo')
  async function send(action,extra={}) {const req=Readable.from([JSON.stringify({sessionId:captain.id,teamId:'demo',action,...action==='resume_task'?{base:workflowFingerprint(await read())}:{},...extra})]);req.method='POST';req.headers={};await route.handler(req,{writeHead:code=>{status=code},end:body=>{response=JSON.parse(body)}})}
  await send('edit',{base:workflowFingerprint(source),title:'Edit and rerun',operations:[{action:'update_member',name:'worker',role:'Adjusted role'},{action:'rerun_task',id:'t1',instructions:'Recheck the previous result'}]})
  assert.equal(status,200,JSON.stringify(response));assert.equal(dispatched.length,1);assert.equal(dispatched[0][2],'worker');assert.match(dispatched[0][3],/Task: t1/)
  assert.equal(response.activity.tasks.find(task=>task.id==='t1').status,'claimed')
  assert.equal(response.activity.tasks.find(task=>task.id==='gate').workflowRerunRequired,true)
  let saved=await read();assert.equal(saved.tasks[0].attempt,2);assert.notEqual(saved.tasks[0].attemptId,'old-capability');assert.equal(saved.members[0].role,'Adjusted role')
  assert.match(saved.tasks[0].stoppedAttempts.at(-1).output,/OLD RESULT/)
  assert.equal(saved.tasks[0].stoppedAttempts.at(-1).attemptId,'old-capability')
  assert.match(saved.tasks[0].stoppedAttempts.at(-1).output,new RegExp(initialStatus==='cancelled'?'已取消':initialStatus==='completed'?'已完成':'失败'))
  saved=await read();Object.assign(saved.tasks[0],{status:'completed',output:'NEW RESULT'});saved.members[0].status='idle';await writeTeam(join(root,'.agent-teams'),saved)
  await scheduler.kickTeam(root,'demo',captain);assert.equal(dispatched.length,1,'completion alone cannot release descendants')
  await send('resume_task',{taskId:'gate',base:'stale'});assert.equal(status,409);assert.match(response.error,/重新确认/)
  await send('state');assert.deepEqual(response.ready,[],'suspended gate is not ready for review')
  await send('resume_task',{taskId:'gate'});assert.equal(status,200);assert.deepEqual(response.ready,['gate']);assert.equal(dispatched.length,1,'checkpoint never dispatched')
  saved=await read();const materials=workflowMaterials(saved,'gate',root)
  assert.match(materials.text,/NEW RESULT/);assert.doesNotMatch(materials.text,/OLD RESULT|OLD DOWNSTREAM/)
  assert.throws(()=>decideCheckpoint(saved,'gate','approve','old',materials.evidence,''),/材料已变化/)
  decideCheckpoint(saved,'gate','approve',materials.evidence,materials.evidence,'new approval');await writeTeam(join(root,'.agent-teams'),saved)
  await scheduler.kickTeam(root,'demo',captain);assert.equal(dispatched.length,1,'approval does not auto-release paused downstream')
  await send('edit',{base:workflowFingerprint(await read()),title:'Adjust suspended task',operations:[{action:'update_task',id:'after',description:'Use the new input'}]})
  assert.equal(status,200,JSON.stringify(response));assert.equal(dispatched.length,1)
  await send('resume_task',{taskId:'after'});assert.equal(status,200);assert.equal(dispatched.length,2);assert.equal(dispatched[1][2],'other');assert.match(dispatched[1][3],/NEW RESULT/);assert.doesNotMatch(dispatched[1][3],/OLD RESULT/)
  saved=await read();assert.equal(saved.tasks[2].attempt,2);assert.deepEqual(saved.tasks.find(t=>t.id==='parallel'),source.tasks.find(t=>t.id==='parallel'))
  Object.assign(saved.tasks[0],{status:'completed',output:'NEW RESULT'});saved.members[0].status='idle';saved.tasks[2].status='completed';saved.members[1].status='idle';await writeTeam(join(root,'.agent-teams'),saved)
  await send('edit',{base:workflowFingerprint(saved),title:'Rerun again',operations:[{action:'rerun_task',id:'t1',instructions:'Recheck the previous result'}]})
  assert.equal(status,200);assert.equal(dispatched.length,3);assert.equal((await read()).tasks.length,source.tasks.length,'repeated reruns overwrite in place')
})

test('suspension survives reload and malformed confirmation flags fail the durable boundary', async t => {
  const root=mkdtempSync(join(tmpdir(),'workflow-rerun-state-'));t.after(()=>rmSync(root,{recursive:true,force:true}))
  const source=withGate();source.tasks[0].status='completed'
  const updated=applyWorkflowOperations(source,[{action:'rerun_task',id:'t1',instructions:'Recheck the previous result'}]);await createTeamDir(root,updated)
  assert.equal((await readTeam(root,'demo')).tasks[1].workflowRerunRequired,true)
  const cancelled=structuredClone(updated.tasks[2]);cancelUnfinishedTask(cancelled,'stop')
  assert.equal(cancelled.status,'cancelled');assert.equal(cancelled.workflowPaused,false);assert.equal(cancelled.workflowRerunRequired,false,'stopping the team must remove pending confirmation badges')
  updated.tasks[1].workflowRerunRequired='true';writeFileSync(join(root,'demo','team.json'),JSON.stringify(updated))
  await assert.rejects(readTeam(root,'demo'),/invalid AgentTeams state/)
})

test('malformed model operations explain the required action discriminator', () => {
  for (const operation of [{ type: 'update_member', name: 'worker' }, { op: 'update_member' }, { update_member: { name: 'worker' } }]) {
    assert.throws(() => parseWorkflowOperations([operation]), /action.*update_member/)
  }
  assert.deepEqual(parseWorkflowOperations([{ action: 'update_member', name: 'worker', summary: 'Three items' }]), [{ action: 'update_member', name: 'worker', summary: 'Three items' }])
})

test('manual numeric IDs advance the sequence used by original task tools', () => {
  const result = applyWorkflowOperations(team(), [{ action: 'add_task', id: 't20', subject: 'Manual', dependencies: [] }])
  assert.equal(result.taskSeq, 20)
  assert.equal(result.tasks.some(t => t.id === `t${result.taskSeq + 1}`), false)
})

test('cold read recovers the sequence of teams saved by early canvas builds', async t => {
  const root = mkdtempSync(join(tmpdir(), 'workflow-sequence-')); t.after(() => rmSync(root, { recursive: true, force: true }))
  const source = team(); source.tasks.push(task('t20'))
  await createTeamDir(root, source)
  assert.equal((await readTeam(root, source.id)).taskSeq, 20)
})

test('rework preserves the complete work order but does not inherit execution evidence', () => {
  const source = withGate()
  Object.assign(source.tasks[0], { status: 'completed', output: 'old output', deliverables: ['report.md'], nonGoals: ['deploy'], coverageOf: ['request-1'], sourceFindingIds: ['f1'], findingSourceTaskIds: ['review-0'], round: 2, commandsRun: [{ command: 'test', status: 'passed' }] })
  decideCheckpoint(source, 'gate', 'reject', 'a', 'a', 'fix report')
  const result = applyWorkflowOperations(source, [{ action: 'rework', id: 'gate', taskIds: ['t1'], instructions: 'Fix' }])
  const rerun = result.tasks.at(-1)
  for (const field of ['deliverables', 'nonGoals', 'coverageOf', 'sourceFindingIds', 'findingSourceTaskIds', 'round']) assert.deepEqual(rerun[field], source.tasks[0][field], field)
  assert.equal(rerun.output, undefined)
  assert.equal(rerun.commandsRun, undefined)
})

test('corrupt workflow and stopped-attempt records fail at the durable boundary', async t => {
  const root = mkdtempSync(join(tmpdir(), 'workflow-corrupt-')); t.after(() => rmSync(root, { recursive: true, force: true }))
  const source = team()
  await createTeamDir(root, source)
  assert.ok(await readTeam(root, source.id), 'legacy teams remain readable')
  workflowState(source)
  writeFileSync(join(root, source.id, 'team.json'), JSON.stringify(source))
  assert.ok(await readTeam(root, source.id))
  for (const workflow of [{}, { positions: {}, discussions: { 'discussion:graph': null }, history: [] }, { positions: {}, discussions: {}, history: [{ id: 'p', base: 'b', title: 'bad', status: 'pending', createdAt: 1, operations: [{ action: 'rework', id: 'g', taskIds: null }] }] }]) {
    writeFileSync(join(root, source.id, 'team.json'), JSON.stringify({ ...source, workflow }))
    await assert.rejects(readTeam(root, source.id), /invalid AgentTeams state/)
  }
  source.tasks[0].stoppedAttempts = [null]
  writeFileSync(join(root, source.id, 'team.json'), JSON.stringify(source))
  await assert.rejects(readTeam(root, source.id), /invalid AgentTeams state/)
})

test('canvas insertion replaces bypass edges atomically and preserves unrelated parents', () => {
  const source = team()
  source.tasks.push(task('t2'), task('next', ['t1', 't2']), task('parallel', ['t1']))
  const operations = taskDraftOperations(source, { checkpoint: true, subject: 'Review', dependencies: ['t1'], successors: ['next'] })
  assert.equal(operations[0].id, 't3', 'draft IDs skip existing aliases')
  const proposal = proposeWorkflow(source, 'Insert gate', operations)
  assert.deepEqual(source.tasks.find(t => t.id === 'next').dependencies, ['t1', 't2'], 'preview does not mutate execution')
  const result = applyWorkflowProposal(source, proposal)
  assert.deepEqual(result.tasks.find(t => t.id === 'next').dependencies, ['t2', 't3'])
  assert.deepEqual(result.tasks.find(t => t.id === 'parallel').dependencies, ['t1'])
  assert.deepEqual(result.tasks.find(t => t.id === 't3').dependencies, ['t1'])
  assert.equal(result.tasks.find(t => t.id === 't3').checkpoint.round, 1)
})

test('editing successors removes only deselected edges; rejected cycles and active targets leave source unchanged', () => {
  const source = withGate()
  const operations = taskDraftOperations(source, { id: 'gate', checkpoint: true, subject: 'Review', dependencies: ['t1'], successors: [] })
  const result = applyWorkflowOperations(source, operations)
  assert.deepEqual(result.tasks.find(t => t.id === 'after').dependencies, [])
  assert.deepEqual(source.tasks.find(t => t.id === 'after').dependencies, ['gate'])
  const cycle = taskDraftOperations(source, { checkpoint: false, subject: 'Cycle', dependencies: ['after'], successors: ['t1'] })
  assert.throws(() => applyWorkflowOperations(source, cycle), /循环|cycle/i)
  source.tasks.find(t => t.id === 'after').status = 'in_progress'
  const original = structuredClone(source)
  assert.throws(() => applyWorkflowOperations(source, taskDraftOperations(source, { checkpoint: true, subject: 'Too late', dependencies: ['gate'], successors: ['after'] })))
  assert.deepEqual(source, original)
})

test('connection magnet accepts node interiors and rejects duplicate, cyclic and active targets', () => {
  const tasks = [task('a'), task('b', ['a']), task('c')]
  const positions = { a: { x: 20, y: 20 }, b: { x: 290, y: 20 }, c: { x: 20, y: 180 } }
  assert.equal(connectionTarget(tasks, id => positions[id], { x: 105, y: 230 }, 'a').id, 'c')
  assert.equal(connectionTarget(tasks, id => positions[id], { x: -15, y: 235 }, 'a').id, 'c')
  assert.equal(connectionTarget(tasks, id => positions[id], { x: 900, y: 900 }, 'a'), undefined)
  assert.match(connectionIssue(tasks, 'a', 'b'), /已存在/)
  assert.match(connectionIssue(tasks, 'b', 'a'), /循环/)
  assert.match(connectionIssue(tasks, 'a', 'a'), /自身/)
  assert.equal(connectionIssue(tasks, 'a', 'c'), undefined)
  tasks[2].status = 'in_progress'
  assert.match(connectionIssue(tasks, 'a', 'c'), /停止/)
  Object.assign(tasks[2],{status:'pending',attempt:2,workflowPaused:true,workflowRerunRequired:true})
  assert.equal(connectionIssue(tasks,'a','c'),undefined,'suspended downstream nodes remain editable with drawio connections')
})

test('native discussion and return-to-captain navigation open ordinary sessions', async () => {
  const seen = []
  await openAgentTeamMember({}, 'discussion', 'discussion', { selectPanel: value => seen.push(value) }, { openSession: value => seen.push(value) })
  assert.deepEqual(seen, ['discussion', null])
})

test('restored native discussion is restricted and cannot propose outside its own scope', async t => {
  const root = mkdtempSync(join(tmpdir(), 'workflow-native-')); t.after(() => rmSync(root, { recursive: true, force: true }))
  const source = team(), label = 'native-label', nativeId = `session-at-discussion-${createHash('sha256').update('demo').digest('hex').slice(0, 16)}-00000000-0000-0000-0000-000000000001`
  source.tasks[0].status='completed'
  workflowState(source).discussions['discussion:member:worker'] = { key: 'member:worker', messages: [], calls: [], native: { sessionId: nativeId, label } }
  source.members.push({ ...source.members[0], name: 'unrelated' })
  source.tasks.push({ ...task('unrelated-task'), assignee: 'unrelated', output: 'UNRELATED EXECUTION' })
  await createTeamDir(join(root, '.agent-teams'), source)
  const definitions = new Map(); let setup
  const ctx = { tools: { register: definition => definitions.set(definition.name, definition) }, subagents: { registerContinuableSetup: fn => { setup = fn } } }
  installWorkflowConversations(ctx, { stateDir: '.agent-teams', maxMembers: 8 }, workflowMaterials)
  const restricted = []
  const agent = { id: nativeId, session: { header: { cwd: root }, ownEvents: () => [] } }
  const agentCtx = { agent, tools: { restrict: filter => { restricted.push(filter); return () => {} } }, systemPrompt: { section: () => () => {}, getSectionOrder: () => 0 }, on: () => () => {} }
  const dispose = setup(agentCtx)
  assert.deepEqual(restricted, [{ allow: ['agent_teams_workflow_context', 'agent_teams_workflow_propose'] }])
  const exec = { agent, signal: new AbortController().signal }
  const context = JSON.parse(await definitions.get('agent_teams_workflow_context').execute({}, exec))
  assert.equal(context.team.members.length, 1)
  assert.ok(context.team.tasks.every(task => task.assignee === 'worker'))
  assert.doesNotMatch(JSON.stringify(context), /UNRELATED EXECUTION/)
  assert.equal(context.team.members[0].runtimeSetup, undefined)
  const propose = args => definitions.get('agent_teams_workflow_propose').execute({ base: context.base, title: 'edit', operations: args }, exec)
  await assert.rejects(propose([{ action: 'add_member', name: 'other', summary: 'other scope' }]), /只能调整/)
  await propose([{ action: 'update_member', name: 'worker', summary: 'new summary' }])
  await propose([{action:'rerun_task',id:'t1',instructions:'Only after human approval'}])
  await assert.rejects(propose([{action:'rerun_task',id:'unrelated-task'}]))
  const persisted = await readTeam(join(root, '.agent-teams'), 'demo')
  assert.equal(persisted.members[0].summary, undefined)
  assert.equal(persisted.tasks[0].status,'completed','proposing a rerun cannot execute it')
  assert.equal(persisted.workflow.discussions['discussion:member:worker'].proposal.status, 'pending')
  const intruder = { ...agent, id: nativeId.replace(/1$/, '2') }
  await assert.rejects(definitions.get('agent_teams_workflow_context').execute({}, { ...exec, agent: intruder }), /失效|关联记录缺失/)
  dispose()
})

test('fresh member discussion creates an independent session seeded with member facts and user intent', async t => {
  const root = mkdtempSync(join(tmpdir(), 'workflow-fresh-')); t.after(() => rmSync(root, { recursive: true, force: true }))
  const source = team(); source.members[0].summary = 'Review requirements'; source.members[0].executionPrompt = 'Check acceptance criteria'
  workflowState(source).discussions['discussion:member:worker'] = { key: 'member:worker', messages: [{ role: 'user', text: 'OLD HISTORY' }], calls: [], native: { sessionId: 'old-discussion', label: 'old' } }
  await createTeamDir(join(root, '.agent-teams'), source)
  let spec; const prompts = [], filters = [], grouped = []
  const ctx = { tools: { register() {} }, subagents: { registerContinuableSetup() {} }, llm: { resolveCallConfig: async value => value }, effect() {}, sessions: { flush: async () => {} }, agents: {
    get: () => ({ status: 'idle' }), create: async value => { spec = value; value.setup({ effect: fn => fn(), tools: { restrict: filter => { filters.push(filter); return () => {} } } }); return { agent: { id: value.sessionId, session: {}, whenIdle: async () => {}, followup: message => prompts.push(message) }, dispose() {} } },
  } }
  ctx.get = key => key === 'workspaceRegistry' ? { list: () => [{ sessionIds: ['captain-id'], attachSession: async id => grouped.push(id) }, { sessionIds: ['other-captain'], attachSession: () => { throw Error('wrong workspace') } }] } : undefined
  const runtime = installWorkflowConversations(ctx, { stateDir: '.agent-teams', maxMembers: 8 }, workflowMaterials)
  const captain = { id: 'captain-id', options: { provider: 'fake', model: 'fake' }, session: { header: { cwd: root }, requestHeader: () => ({ config: {} }) } }
  const id = await runtime.open(captain, source, 'member:worker', join(root, '.agent-teams'), { fresh: true, message: 'Focus on requirement risks' })
  assert.deepEqual(grouped, [])
  assert.equal(spec.meta.origin, 'subagent')
  assert.notEqual(id, captain.id); assert.notEqual(id, 'old-discussion')
  assert.equal(spec.resumeSessionId, undefined); assert.equal(spec.parentSessionId, undefined)
  assert.match(prompts[0].content[0].text, /Review requirements/)
  assert.match(prompts[0].content[0].text, /^## 独立讨论：worker/)
  assert.match(prompts[0].content[0].text, /### 执行指令（PE）/)
  assert.match(prompts[0].content[0].text, /### 已分配任务/)
  assert.match(prompts[0].content[0].text, /Check acceptance criteria/)
  assert.match(prompts[0].content[0].text, /Focus on requirement risks/)
  assert.doesNotMatch(prompts[0].content[0].text, /OLD HISTORY/)
  assert.deepEqual(filters, [{ allow: ['agent_teams_workflow_context', 'agent_teams_workflow_propose'] }])
  assert.ok(Object.entries(source.workflow.discussions).some(([key, value]) => key.startsWith('archive:') && value.native.sessionId === 'old-discussion'))
  const secondId = await runtime.open(captain, source, 'member:worker', join(root, '.agent-teams'), { fresh: true })
  assert.notEqual(secondId, id)
  assert.deepEqual(grouped, [])
  assert.match(prompts[1].content[0].text, /询问我希望如何调整/)
  assert.ok(Object.entries(source.workflow.discussions).some(([key, value]) => key.startsWith('archive:') && value.native.sessionId === id))
})

test('independent workflow conversations navigate as ordinary sessions on both modern and legacy hosts', async () => {
  const target = 'session-at-discussion-example', calls = []
  const openMember = (parent, child) => openAgentTeamMember({ open: id => calls.push(['legacy', id]), openSubagent: () => { throw new Error('independent discussion must not use subagent navigation') }, refreshSubagents: async () => { throw new Error('unexpected catalog refresh') } }, parent, child, { selectPanel: () => {} }, { openSession: id => calls.push(['workspace', id]) })
  await openWorkflowConversation(openMember, target)
  assert.deepEqual(calls, [['workspace', target]])
  await openWorkflowConversation((parent, child) => openAgentTeamMember({ open: id => calls.push(['legacy', id]) }, parent, child), target)
  assert.deepEqual(calls[1], ['legacy', target])
})

test('direct graph edits persist atomically, reject stale bases and cycles, and pause newly added running work', async t => {
  const root = mkdtempSync(join(tmpdir(), 'workflow-edit-')); t.after(() => rmSync(root, { recursive: true, force: true }))
  const source = team(); source.tasks.push({ ...task('t2'), dependencies: [] })
  await createTeamDir(join(root, '.agent-teams'), source)
  const captain = { id: 'captain-id', session: { header: { cwd: root }, ownEvents: () => [] }, status: 'idle' }
  let route, status, result
  const ctx = { agents: { get: () => captain }, effect: fn => fn(), logger: { warn() {} } }
  installWorkflowWorkbench(ctx, { stateDir: '.agent-teams', maxMembers: 8 }, { kickTeam: async () => {} }, { register: value => { route = value; return () => {} } })
  async function send(operations, base, positions) {
    const req = Readable.from([JSON.stringify({ sessionId: captain.id, teamId: 'demo', action: 'edit', title: 'Canvas edit', operations, base, positions })]); req.method = 'POST'; req.headers = {}
    await route.handler(req, { writeHead: code => { status = code }, end: body => { result = JSON.parse(body) } })
  }
  const original = workflowFingerprint(source)
  await send([{ action: 'update_task', id: 't2', dependencies: ['t1'] }], original, { t1: { x: 100, y: 180 }, t2: { x: 400, y: 280 } })
  assert.equal(status, 200, JSON.stringify(result)); assert.deepEqual(result.team.tasks[1].dependencies, ['t1'])
  assert.deepEqual(result.team.workflow.positions['task:t2'], { x: 400, y: 280 })
  await send([{ action: 'update_task', id: 't2', dependencies: [] }], original)
  assert.equal(status, 409); assert.match(result.error, /团队已变化/)
  let current = await readTeam(join(root, '.agent-teams'), 'demo')
  await send([{ action: 'update_task', id: 't1', dependencies: ['t2'] }], workflowFingerprint(current))
  assert.equal(status, 409)
  await send([{ action: 'update_task', id: 't2', dependencies: [] }], workflowFingerprint(current))
  assert.equal(status, 200); assert.deepEqual(result.team.tasks[1].dependencies, [])
  await send([{ action: 'add_task', subject: 'Wire before running', dependencies: [] }], result.base)
  assert.equal(status, 200); assert.equal(result.team.tasks.at(-1).workflowPaused, true)
  assert.equal(result.team.tasks.at(-1).workflowAwaitingStart,true)
  assert.equal(result.activity.tasks.at(-1).workflowAwaitingStart,true)
  const addedId = result.team.tasks.at(-1).id
  await send([{ action: 'update_task', id: addedId, dependencies: ['t2'] }], result.base)
  assert.equal(status, 200)
  current = await readTeam(join(root, '.agent-teams'), 'demo')
  assert.equal(current.tasks.find(task => task.id === addedId).subject, 'Wire before running')
  assert.deepEqual(current.tasks.find(task => task.id === addedId).dependencies, ['t2'])
  assert.equal(current.tasks.find(task => task.id === addedId).workflowPaused, true)
  const beforeLayout = workflowFingerprint(current)
  async function layout(positions) {
    const req = Readable.from([JSON.stringify({ sessionId: captain.id, teamId: 'demo', action: 'layout', positions })]); req.method = 'POST'; req.headers = {}
    await route.handler(req, { writeHead: code => { status = code }, end: body => { result = JSON.parse(body) } })
  }
  const arranged = arrangeTasks(current.tasks)
  await layout(arranged)
  assert.equal(status, 200)
  assert.equal(workflowFingerprint(result.team), beforeLayout, 'layout must not change execution or invalidate proposals')
  assert.deepEqual(result.team.workflow.positions[`task:${addedId}`], arranged[addedId])
  await layout({ t1: { x: 9, y: 9 }, t2: { x: -1, y: 0 } })
  assert.equal(status, 409)
  current = await readTeam(join(root, '.agent-teams'), 'demo')
  assert.deepEqual(current.workflow.positions['task:t1'], arranged.t1, 'invalid batch cannot partially move nodes')
  await layout({ missing: { x: 0, y: 0 } })
  assert.equal(status, 409)
})

test('canvas layout separates branching cards and fits tall as well as wide graphs', () => {
  const tasks = [task('a'), task('b'), task('c', ['a']), task('d', ['a', 'b']), task('e', ['c', 'd'])]
  const points = arrangeTasks(tasks)
  for (const a of tasks) for (const b of tasks) {
    if (a.id === b.id) continue
    assert.ok(Math.abs(points[a.id].x - points[b.id].x) >= 225 || Math.abs(points[a.id].y - points[b.id].y) >= 150)
  }
  for (const item of tasks) for (const dep of item.dependencies) assert.ok(points[item.id].x > points[dep].x)
  assert.ok(fitGraph(800, 400, 600, 1200) * 1200 <= 368)
  assert.ok(fitGraph(400, 800, 1200, 600) * 1200 <= 368)
  assert.equal(fitGraph(1200, 800, 600, 400), 1)
})

test('opening a new review round refreshes the native conversation once', async t => {
  const root = mkdtempSync(join(tmpdir(), 'workflow-round-')); t.after(() => rmSync(root, { recursive: true, force: true }))
  const source = withGate(); source.tasks[0].status = 'completed'; source.tasks[1].checkpoint.round = 2
  workflowState(source).discussions['discussion:check:gate'] = { key: 'check:gate', messages: [], calls: [], native: { sessionId: 'review', label: 'review', reviewEvidence: 'old' } }
  await createTeamDir(join(root, '.agent-teams'), source)
  const prompts = []
  const ctx = { tools: { register() {} }, subagents: { registerContinuableSetup() {} }, agents: { get: () => ({ status: 'idle', followup: message => prompts.push(message) }) } }
  const runtime = installWorkflowConversations(ctx, { stateDir: '.agent-teams', maxMembers: 8 }, () => ({ text: 'new evidence', evidence: 'new' }))
  const captain = { session: { header: { cwd: root } } }
  await runtime.open(captain, source, 'check:gate', join(root, '.agent-teams'))
  await runtime.open(captain, source, 'check:gate', join(root, '.agent-teams'))
  assert.equal(prompts.length, 1)
  assert.match(prompts[0].content[0].text, /第 2 轮/)
  assert.equal(source.tasks[1].status, 'pending')
})
test('configuration proposal is isolated until applied and cannot be replayed', () => {
  const source = team(), before = structuredClone(source)
  const proposal = proposeWorkflow(source, 'new role', [{ action: 'update_member', name: 'worker', summary: 'Review code', role: 'reviewer', executionPrompt: 'Read only' }])
  assert.deepEqual(source, before)
  const result = applyWorkflowProposal(source, proposal)
  assert.equal(result.members[0].role, 'reviewer'); assert.equal(source.members[0].role, 'developer')
  assert.throws(() => applyWorkflowProposal(result, proposal), /已变化/)
})
test('execution progress invalidates a pending proposal, discussion and layout do not', () => {
  const source = team(), proposal = proposeWorkflow(source, 'edit', [{ action: 'update_task', id: 't1', subject: 'updated' }])
  workflowState(source).positions['task:t1'] = { x: 25, y: 30 }
  assert.equal(applyWorkflowProposal(source, proposal).tasks[0].subject, 'updated')
  source.tasks[0].status = 'claimed'
  assert.throws(() => applyWorkflowProposal(source, proposal), /已变化/)
})
test('cycle or dangling link rejects an entire multi-operation edit', () => {
  const source = withGate(), before = structuredClone(source)
  assert.throws(() => applyWorkflowOperations(source, [{ action: 'update_member', name: 'worker', summary: 'changed' }, { action: 'update_task', id: 't1', dependencies: ['after'] }]), /循环/)
  assert.deepEqual(source, before)
  assert.throws(() => applyWorkflowOperations(source, [{ action: 'update_task', id: 't1', dependencies: ['missing'] }]), /不存在|does not exist/)
})
test('active work and active member instructions cannot change until stopped', () => {
  const source = team(); source.tasks[0].status = 'in_progress'; source.tasks[0].attempt = 1
  assert.throws(() => applyWorkflowOperations(source, [{ action: 'update_member', name: 'worker', role: 'other' }]), /先停止/)
  assert.throws(() => applyWorkflowOperations(source, [{ action: 'update_task', id: 't1', description: 'other' }]), /已开始/)
})
test('completed work is immutable, and members with pending assignments cannot be removed', () => {
  const source = team()
  assert.throws(() => applyWorkflowOperations(source, [{ action: 'remove_member', name: 'worker' }]), /重新分配/)
  source.tasks[0].status = 'completed'
  assert.throws(() => applyWorkflowOperations(source, [{ action: 'update_task', id: 't1', subject: 'rewrite' }]), /已开始/)
  const removed = applyWorkflowOperations(source, [{ action: 'remove_member', name: 'worker' }])
  assert.equal(removed.members[0].status, 'removed'); assert.equal(removed.tasks[0].assignee, 'worker')
})
test('malformed model proposals cannot smuggle approvals or unsupported operations', () => {
  assert.throws(() => parseWorkflowOperations([{ action: 'approve', id: 'gate' }]), /未知/)
  assert.throws(() => parseWorkflowOperations([{ action: 'add_task', subject: 'gate', dependencies: [], checkpoint: 'yes' }]), /布尔/)
  const ops = parseWorkflowOperations([{ action: 'update_task', id: 't1', status: 'completed' }])
  assert.equal(ops[0].status, undefined)
})
test('checkpoint stays blocked until upstream completes; only current evidence is accepted', () => {
  const source = withGate(), gate = source.tasks[1]
  assert.equal(checkpointReady(source, gate), false)
  assert.throws(() => decideCheckpoint(source, 'gate', 'approve', 'a', 'a', ''), /不能验收/)
  source.tasks[0].status = 'completed'
  assert.equal(checkpointReady(source, gate), true)
  assert.throws(() => decideCheckpoint(source, 'gate', 'approve', 'a', 'b', ''), /材料已变化/)
  decideCheckpoint(source, 'gate', 'approve', 'a', 'a', 'reviewed')
  assert.equal(gate.status, 'completed'); assert.equal(gate.checkpoint.history[0].note, 'reviewed')
  assert.throws(() => decideCheckpoint(source, 'gate', 'approve', 'a', 'a', ''), /不能验收/)
})
test('reject preserves downstream blocking; confirmed rework creates new attempts without rewriting history', () => {
  const source = withGate(); source.tasks[0].status = 'completed'; source.tasks[0].output = 'first result'
  decideCheckpoint(source, 'gate', 'reject', 'a', 'a', 'missing evidence')
  assert.equal(source.tasks[1].status, 'pending')
  const result = applyWorkflowOperations(source, [{ action: 'rework', id: 'gate', taskIds: ['t1'], instructions: 'Add evidence' }])
  assert.equal(result.tasks[0].output, 'first result'); assert.equal(result.tasks[0].status, 'completed')
  assert.equal(result.tasks[1].checkpoint.round, 2); assert.equal(result.tasks[1].checkpoint.history.length, 1)
  assert.notEqual(result.tasks[1].dependencies[0], 't1')
  assert.equal(result.tasks.at(-1).status, 'pending'); assert.equal(checkpointReady(result, result.tasks[1]), false)
})

test('new upstream wiring reopens a rejected checkpoint without stopping it or losing review history', () => {
  let source=withGate();source.tasks[0].status='completed';source.tasks[0].output='Original result'
  decideCheckpoint(source,'gate','reject','old','old','Missing implementation')
  source=applyWorkflowOperations(source,[{action:'add_task',id:'fix',subject:'Fix implementation',dependencies:['t1'],configurationPending:true}])
  const before=structuredClone(source), operation={action:'update_task',id:'gate',dependencies:['t1','fix']}
  assert.equal(connectionIssue(source.tasks,'fix','gate'),undefined)
  const updated=applyWorkflowOperations(source,[operation]), gate=updated.tasks.find(task=>task.id==='gate')
  assert.deepEqual(source,before,'graph edits operate atomically on a copy')
  assert.equal(gate.status,'pending');assert.equal(gate.checkpoint.round,2);assert.equal(gate.checkpoint.decision,undefined)
  assert.equal(gate.checkpoint.evidence,undefined);assert.equal(gate.checkpoint.note,undefined)
  assert.deepEqual(gate.checkpoint.history,before.tasks[1].checkpoint.history)
  assert.equal(updated.tasks[0].output,'Original result');assert.equal(updated.tasks[2].status,'pending')
  assert.equal(checkpointReady(updated,gate),false,'new unfinished upstream blocks review')
  assert.equal(applyWorkflowOperations(updated,[operation]).tasks[1].checkpoint.round,2,'repeat wiring cannot create extra rounds')
  assert.throws(()=>applyWorkflowOperations(source,[{...operation,description:'Unrelated edit'}]),/先停止/)
  assert.throws(()=>applyWorkflowOperations(source,[{action:'update_task',id:'gate',dependencies:['t1']}]),/先停止/)
  assert.throws(()=>applyWorkflowOperations(source,[{action:'update_task',id:'gate',dependencies:[]}]),/先停止/)
  assert.throws(()=>applyWorkflowOperations(source,[{action:'remove_task',id:'gate'}]),/先停止/)
  assert.match(connectionIssue(source.tasks,'after','gate'),/循环/)
  assert.throws(()=>applyWorkflowOperations(source,[{...operation,dependencies:['after']}]),/循环/)
  assert.deepEqual(source,before,'invalid reconnection retains rejected round')
  updated.tasks.find(task=>task.id==='fix').status='completed'
  const current=workflowMaterials(updated,'gate',process.cwd()).evidence
  assert.throws(()=>decideCheckpoint(updated,'gate','approve','old',current,''),/材料已变化/)
  decideCheckpoint(updated,'gate','approve',current,current,'Fixed')
  assert.equal(gate.checkpoint.history.length,2);assert.equal(gate.status,'completed')
  assert.match(connectionIssue(updated.tasks,'fix','t1'),/停止/,'finished ordinary targets stay protected')
  assert.throws(()=>applyWorkflowOperations(updated,[{action:'update_task',id:'gate',dependencies:['fix']}]),/先停止/,'approved checkpoint stays protected')
})

test('reconnecting rejected review through the canvas route persists a new round and refreshes evidence', async t => {
  const root=mkdtempSync(join(tmpdir(),'workflow-reconnect-review-'));t.after(()=>rmSync(root,{recursive:true,force:true}))
  const stateRoot=join(root,'.agent-teams');let source=withGate();source.tasks[0].status='completed'
  const material=workflowMaterials(source,'gate',root)
  decideCheckpoint(source,'gate','reject',material.evidence,material.evidence,'Needs another task')
  workflowState(source).discussions['discussion:check:gate']={key:'check:gate',messages:[],calls:[],materials:material.text,evidence:material.evidence,materialsRound:1}
  source=applyWorkflowOperations(source,[{action:'add_task',id:'fix',subject:'Fix',dependencies:[],configurationPending:true}])
  await createTeamDir(stateRoot,source)
  let route,status,response
  const captain={id:'captain-id',status:'idle',session:{header:{cwd:root},ownEvents:()=>[]}}
  installWorkflowWorkbench({agents:{get:()=>captain},effect:fn=>fn(),logger:{warn(){}}},{stateDir:'.agent-teams',maxMembers:8},{kickTeam:async()=>{}},{register:value=>{route=value;return()=>{}}})
  const call=async(action,fields={})=>{const req=Readable.from([JSON.stringify({action,sessionId:captain.id,teamId:'demo',discussion:'check:gate',...fields})]);req.method='POST';req.headers={};await route.handler(req,{writeHead:code=>{status=code},end:body=>{response=JSON.parse(body)}})}
  await call('edit',{base:workflowFingerprint(source),title:'Connect fix to rejected checkpoint',operations:[{action:'update_task',id:'gate',dependencies:['t1','fix']}]})
  assert.equal(status,200,JSON.stringify(response));assert.equal(response.ready.includes('gate'),false)
  const saved=await readTeam(stateRoot,'demo');assert.equal(saved.tasks[1].checkpoint.round,2);assert.equal(saved.tasks[1].checkpoint.history[0].decision,'reject')
  await call('review',{taskId:'gate',decision:'approve',evidence:material.evidence});assert.equal(status,409,'cannot approve while the new task is unfinished')
  Object.assign(saved.tasks.find(task=>task.id==='fix'),{status:'completed',workflowConfigPending:false,workflowPaused:false,output:'Fixed implementation'});await writeTeam(stateRoot,saved)
  await call('review',{taskId:'gate',decision:'approve',evidence:material.evidence});assert.equal(status,409,'prior-round evidence cannot approve the new round')
  await call('materials');assert.equal(status,200,JSON.stringify(response))
  const discussion=response.team.workflow.discussions['discussion:check:gate'];assert.equal(discussion.materialsRound,2);assert.notEqual(discussion.evidence,material.evidence)
  await call('review',{taskId:'gate',decision:'approve',evidence:discussion.evidence});assert.equal(status,200,JSON.stringify(response));assert.equal(response.team.tasks[1].status,'completed')
})
test('rework also repeats downstream computation before the checkpoint', () => {
  const source = applyWorkflowOperations(team(), [{ action: 'add_task', id: 'build', subject: 'Build', dependencies: ['t1'] }, { action: 'add_task', id: 'gate', subject: 'Review', dependencies: ['build'], checkpoint: true }])
  source.tasks[0].status = source.tasks[1].status = 'completed'
  decideCheckpoint(source, 'gate', 'reject', 'a', 'a', '')
  const result = applyWorkflowOperations(source, [{ action: 'rework', id: 'gate', taskIds: ['t1'], instructions: 'Fix' }])
  assert.equal(result.tasks.length, 5)
  assert.deepEqual(result.tasks[4].dependencies, [result.tasks[3].id])
  assert.deepEqual(result.tasks[2].dependencies, [result.tasks[4].id])
})
test('artifact bytes changing invalidates review evidence, even if task results did not change', t => {
  const root = mkdtempSync(join(tmpdir(), 'workflow-evidence-')); t.after(() => rmSync(root, { recursive: true, force: true }))
  const source = withGate(); source.tasks[0].status = 'completed'; source.tasks[0].changedPaths = ['result.txt']
  writeFileSync(join(root, 'result.txt'), 'first')
  const first = workflowMaterials(source, 'gate', root)
  writeFileSync(join(root, 'result.txt'), 'second')
  const second = workflowMaterials(source, 'gate', root)
  assert.notEqual(first.evidence, second.evidence)
  assert.throws(() => decideCheckpoint(source, 'gate', 'approve', first.evidence, second.evidence, ''), /材料已变化/)
})
test('scheduler never dispatches a human checkpoint or a task paused for editing', async t => {
  const root = mkdtempSync(join(tmpdir(), 'workflow-scheduler-')); t.after(() => rmSync(root, { recursive: true, force: true }))
  const source = withGate(); source.tasks[0].status = 'completed'
  source.tasks.push({ ...task('paused'), workflowPaused: true })
  source.tasks.push({ ...task('unconfigured'), workflowConfigPending: true, workflowPaused: false })
  await createTeamDir(join(root, '.agent-teams'), source)
  const captain = { id: 'captain-id', session: { header: { cwd: root }, ownEvents: () => [] }, status: 'idle' }
  const dispatched = []
  const ctx = { agents: { get: id => id === captain.id ? captain : undefined }, on() {}, effect() {}, logger: { warn() {} } }
  const scheduler = installTeamScheduler(ctx, { stateDir: '.agent-teams', dispatch: async (...args) => { dispatched.push(args); return true } })
  await scheduler.kickTeam(root, 'demo', captain)
  assert.equal(dispatched.length, 0)
  assert.equal((await readTeam(join(root, '.agent-teams'), 'demo')).tasks[1].status, 'pending')
})
test('manual aliases cannot cause generated ID collisions and names respect durable identity', () => {
  const source = team()
  const result = applyWorkflowOperations(source, [{ action: 'add_task', id: 't2', subject: 'alias', dependencies: [] }, { action: 'add_task', subject: 'generated', dependencies: [] }])
  assert.equal(new Set(result.tasks.map(t => t.id)).size, 3)
  assert.throws(() => applyWorkflowOperations(source, [{ action: 'add_member', name: 'CAPTAIN', summary: 'reserved' }]), /保留/)
})
test('pausing a queued task preserves another running task and its member stop boundary; route disposes cleanly', async t => {
  const root = mkdtempSync(join(tmpdir(), 'workflow-pause-')); t.after(() => rmSync(root, { recursive: true, force: true }))
  const source = team()
  source.members[0].id = 'child'; source.members[0].status = 'working'; source.members[0].stopping = true
  source.tasks[0].status = 'in_progress'; source.tasks[0].attemptId = 'original-attempt'; source.tasks[0].attempt = 1
  source.tasks.push(task('queued'))
  await createTeamDir(join(root, '.agent-teams'), source)
  const captain = { id: 'captain-id', session: { header: { cwd: root }, ownEvents: () => [] }, status: 'idle' }
  const disposers = []; let route, removed = false, response, status
  const ctx = { agents: { get: id => id === captain.id ? captain : undefined }, effect: fn => disposers.push(fn()), logger: { warn() {} } }
  installWorkflowWorkbench(ctx, { stateDir: '.agent-teams', maxMembers: 8 }, {}, { register: value => { route = value; return () => { removed = true } } })
  const req = Readable.from([JSON.stringify({ sessionId: captain.id, teamId: 'demo', action: 'stop_task', taskId: 'queued' })]); req.method = 'POST'; req.headers = {}
  await route.handler(req, { writeHead: code => { status = code }, end: body => { response = JSON.parse(body) } })
  assert.equal(status, 200, JSON.stringify(response))
  assert.equal(response.team.tasks[1].workflowPaused, true)
  assert.equal(response.team.tasks[1].workflowAwaitingStart,false)
  assert.equal(response.activity.tasks[1].workflowAwaitingStart,false)
  assert.equal(response.team.tasks[0].attemptId, 'original-attempt')
  assert.equal(response.team.members[0].stopping, true); assert.equal(response.team.members[0].id, 'child')
  disposers.reverse().forEach(dispose => dispose?.()); assert.equal(removed, true)
})

test('node switches release required upstream, stop at target, preserve review and reject stale changes', async t => {
  const root=mkdtempSync(join(tmpdir(),'workflow-task-switch-'));t.after(()=>rmSync(root,{recursive:true,force:true}))
  const stateRoot=join(root,'.agent-teams'),source=withGate();source.tasks[0].workflowPaused=true;source.tasks[2].workflowPaused=true
  await createTeamDir(stateRoot,source)
  const captain={id:'captain-id',status:'idle',session:{header:{cwd:root},ownEvents:()=>[]}}, dispatched=[]
  let route,status,response
  const ctx={agents:{get:id=>id===captain.id?captain:undefined},on(){},effect:fn=>fn(),logger:{warn(){}}}
  const scheduler=installTeamScheduler(ctx,{stateDir:'.agent-teams',dispatch:async(...args)=>{dispatched.push(args);return true}})
  installWorkflowWorkbench(ctx,{stateDir:'.agent-teams',maxMembers:8},scheduler,{register:value=>{route=value;return()=>{}}})
  const toggle=async(id,enabled,extra={})=>{
    const current=await readTeam(stateRoot,'demo'),updatedAt=current.tasks.find(task=>task.id===id)?.updatedAt
    const req=Readable.from([JSON.stringify({action:'set_task_enabled',sessionId:captain.id,teamId:'demo',taskId:id,enabled,updatedAt,...extra})]);req.method='POST';req.headers={}
    await route.handler(req,{writeHead:code=>{status=code},end:body=>{response=JSON.parse(body)}})
  }
  await toggle('after',true);assert.equal(status,200,JSON.stringify(response));assert.equal(response.team.tasks[2].workflowPaused,false)
  assert.equal(response.team.tasks[0].workflowPaused,false);assert.equal(response.team.tasks[1].checkpoint.decision,undefined);assert.equal(dispatched.length,1)
  assert.equal(response.activity.tasks[2].state,'blocked','enabled is still blocked on prerequisites')
  await toggle('gate',false);assert.equal(status,200,JSON.stringify(response));assert.equal(response.team.tasks[1].workflowPaused,true)
  const saved=await readTeam(stateRoot,'demo');saved.tasks[0].status='completed';saved.tasks[0].output='Keep this result';await writeTeam(stateRoot,saved)
  await scheduler.kickTeam(root,'demo',captain);assert.equal(dispatched.length,1)
  assert.equal(checkpointReady(saved,saved.tasks[1]),false,'disabled review cannot approve or unlock')
  await toggle('gate',true);assert.equal(status,200,JSON.stringify(response));assert.equal(response.ready.includes('gate'),true);assert.equal(dispatched.length,1)
  assert.equal(response.team.tasks[1].checkpoint.decision,undefined,'enabling is not approval')
  const ready=await readTeam(stateRoot,'demo');decideCheckpoint(ready,'gate','approve','evidence','evidence','OK');await writeTeam(stateRoot,ready)
  await scheduler.kickTeam(root,'demo',captain);assert.equal(dispatched.length,1,'run through gate pauses descendants after approval')
  await toggle('after',true);assert.equal(status,200);assert.equal(dispatched.length,2)
  await toggle('gate',false);assert.equal(status,409)
  await toggle('t1',true);assert.equal(status,409);assert.equal((await readTeam(stateRoot,'demo')).tasks[0].output,'Keep this result')
  await toggle('after',false,{updatedAt:-1});assert.equal(status,409);assert.match(response.error,/状态已变化/)
  await toggle('after','yes');assert.equal(status,409)
  for(const flag of ['workflowConfigPending','workflowRerunRequired']) {
    const current=await readTeam(stateRoot,'demo');Object.assign(current.tasks[2],{status:'pending',workflowPaused:true,[flag]:true});await writeTeam(stateRoot,current)
    await toggle('after',true);assert.equal(status,409);const unchanged=await readTeam(stateRoot,'demo');assert.equal(unchanged.tasks[2][flag],true)
    delete unchanged.tasks[2][flag];await writeTeam(stateRoot,unchanged)
  }
  const rejected=await readTeam(stateRoot,'demo');Object.assign(rejected.tasks[1],{status:'pending',checkpoint:{round:2,decision:'reject',history:[]}});await writeTeam(stateRoot,rejected)
  await toggle('gate',true);assert.equal(status,409)
})

test('switching off running work drains only its child, fences the old attempt and preserves its record', async t => {
  const root=mkdtempSync(join(tmpdir(),'workflow-switch-running-'));t.after(()=>rmSync(root,{recursive:true,force:true}))
  const stateRoot=join(root,'.agent-teams'), source=team();Object.assign(source.members[0],{id:'child',status:'working'})
  Object.assign(source.tasks[0],{status:'in_progress',attempt:1,attemptId:'old-attempt',output:'Partial result'})
  await createTeamDir(stateRoot,source)
  const captain={id:'captain-id',status:'idle',session:{header:{cwd:root},ownEvents:()=>[]}},drained=[];let route,status,response,failDrain=true
  const ctx={agents:{get:id=>id===captain.id?captain:undefined},subagents:{drainChildren:async(parent,ids)=>{if(failDrain) {failDrain=false;throw Error('Temporary drain failure')} drained.push(...ids)}},effect:fn=>fn(),logger:{warn(){}}}
  installWorkflowWorkbench(ctx,{stateDir:'.agent-teams',maxMembers:8},{kickTeam:async()=>{}},{register:value=>{route=value;return()=>{}}})
  const stop=async()=>{const req=Readable.from([JSON.stringify({action:'set_task_enabled',sessionId:captain.id,teamId:'demo',taskId:'t1',enabled:false,updatedAt:1})]);req.method='POST';req.headers={};await route.handler(req,{writeHead:code=>{status=code},end:body=>{response=JSON.parse(body)}})}
  await stop();assert.equal(status,409);const retry=await readTeam(stateRoot,'demo');assert.equal(retry.members[0].stopping,true);assert.equal(retry.tasks[0].workflowPaused,true);assert.equal(retry.tasks[0].status,'in_progress')
  await stop()
  assert.equal(status,200,JSON.stringify(response));assert.deepEqual(drained,['child'])
  const stopped=response.team.tasks[0];assert.equal(stopped.workflowPaused,true);assert.equal(stopped.status,'pending');assert.equal(stopped.attemptId,undefined)
  assert.equal(stopped.stoppedAttempts[0].output,'Partial result');assert.equal(response.team.members[0].id,'');assert.deepEqual(response.team.members[0].previousSessionIds,['child'])
})

test('an already-paused running task must finish stopping before canvas deletion', async t => {
  for (const child of ['', 'child']) for(const action of ['stop_task','set_task_enabled']) {
    const root=mkdtempSync(join(tmpdir(),'workflow-paused-delete-'));t.after(()=>rmSync(root,{recursive:true,force:true}))
    const stateRoot=join(root,'.agent-teams'),source=team()
    Object.assign(source.tasks[0],{status:'in_progress',workflowPaused:true,attempt:1,attemptId:'old-attempt',output:'Partial result'})
    Object.assign(source.members[0],{id:child,status:'working'})
    source.tasks.push(task('down',['t1']))
    await createTeamDir(stateRoot,source)
    const captain={id:'captain-id',status:'idle',session:{header:{cwd:root},ownEvents:()=>[]}},drained=[]
    let route,status,response
    const ctx={agents:{get:id=>id===captain.id?captain:undefined},subagents:{drainChildren:async(parent,ids)=>drained.push(...ids)},effect:fn=>fn(),logger:{warn(){}}}
    installWorkflowWorkbench(ctx,{stateDir:'.agent-teams',maxMembers:8},{kickTeam:async()=>{}},{register:value=>{route=value;return()=>{}}})
    const call=async(action,fields)=>{
      const req=Readable.from([JSON.stringify({action,sessionId:captain.id,teamId:'demo',...fields})]);req.method='POST';req.headers={}
      await route.handler(req,{writeHead:code=>{status=code},end:body=>{response=JSON.parse(body)}})
    }
    await call('edit',{base:workflowFingerprint(source),title:'Delete before stop',operations:[{action:'update_task',id:'down',dependencies:[]},{action:'remove_task',id:'t1'}]})
    assert.equal(status,409,'pause intent alone must not bypass the running guard')
    await call(action,{taskId:'t1',enabled:false,updatedAt:1})
    assert.equal(status,200,JSON.stringify(response));assert.equal(response.team.tasks[0].status,'pending')
    assert.equal(response.activity.tasks[0].workflowPaused,true);assert.equal(response.team.tasks[0].attemptId,undefined)
    assert.deepEqual(drained,child?[child]:[])
    assert.equal(response.team.tasks[0].stoppedAttempts[0].output,'Partial result')
    await call('edit',{base:response.base,title:'Delete stopped node',operations:[{action:'update_task',id:'down',dependencies:[]},{action:'remove_task',id:'t1'}]})
    assert.equal(status,200,JSON.stringify(response));assert.deepEqual(response.team.tasks.map(task=>task.id),['down'])
    assert.deepEqual(response.team.tasks[0].dependencies,[])
    assert.deepEqual((await readTeam(stateRoot,'demo')).tasks.map(task=>task.id),['down'])
  }
})

test('first human review opens an isolated conversation with checklist and stored evidence before the model responds', async t => {
  const root = mkdtempSync(join(tmpdir(), 'workflow-review-intro-')); t.after(() => rmSync(root, { recursive: true, force: true }))
  const source = withGate(); source.tasks[0].status = 'completed'; source.tasks[0].output = 'Implemented login validation'
  source.tasks[1].description = 'Check validation and error messages'
  await createTeamDir(join(root, '.agent-teams'), source)
  let spec; const prompts = []
  const ctx = { tools: { register() {} }, subagents: { registerContinuableSetup() {} }, llm: { resolveCallConfig: async value => value }, effect() {}, sessions: { flush: async () => {} }, agents: {
    get: () => ({ status: 'idle' }), create: async value => { spec = value; return { agent: { id: value.sessionId, session: {}, whenIdle: async () => {}, followup: message => prompts.push(message) }, dispose() {} } },
  } }
  const runtime = installWorkflowConversations(ctx, { stateDir: '.agent-teams', maxMembers: 8 }, workflowMaterials)
  const captain = { id: 'captain-id', options: { provider: 'fake', model: 'fake' }, session: { header: { cwd: root }, requestHeader: () => ({ config: {} }) } }
  const id = await runtime.open(captain, source, 'check:gate', join(root, '.agent-teams'))
  assert.notEqual(id, captain.id); assert.equal(spec.parentSessionId, undefined)
  assert.match(prompts[0].content[0].text, /^## 待你验收/)
  assert.match(prompts[0].content[0].text, /Check validation and error messages/)
  assert.match(prompts[0].content[0].text, /Implemented login validation/)
  const saved = await readTeam(join(root, '.agent-teams'), source.id)
  const discussion = saved.workflow.discussions['discussion:check:gate']
  assert.equal(discussion.materialsRound, 1)
  assert.equal(discussion.native.reviewEvidence, discussion.evidence)
  assert.match(discussion.materials, /Implemented login validation/)
  await runtime.open(captain, source, 'check:gate', join(root, '.agent-teams'))
  assert.equal(prompts.length, 1)
  assert.equal(source.tasks[1].checkpoint.decision, undefined)
})

test('member model and thinking changes validate and persist atomically in workflow edits', async t => {
  const root = mkdtempSync(join(tmpdir(), 'workflow-route-')); t.after(() => rmSync(root, { recursive: true, force: true }))
  const source = team(); source.phase = 'staged'; Object.assign(source.members[0], { activeProvider: 'old', activeModel: 'fallback', fallbackActive: true })
  await createTeamDir(join(root, '.agent-teams'), source)
  const captain = { id: 'captain-id', options: { provider: 'fixture', model: 'fixture' }, session: { header: { cwd: root }, requestHeader: () => ({ config: { provider: 'fixture', model: 'fixture' } }), ownEvents: () => [] }, status: 'idle' }
  let route, status, result
  const ctx = { agents: { get: () => captain }, llm: { resolveCallConfig: async config => { if (config.model === 'invalid') throw Error('unknown model'); return { ...config, reasoningEffort: config.reasoningEffort ?? 'medium' } } }, effect: fn => fn(), logger: { warn() {} } }
  installWorkflowWorkbench(ctx, { stateDir: '.agent-teams', maxMembers: 8 }, { kickTeam: async () => {} }, { register: value => { route = value; return () => {} } })
  async function send(operation, base) {
    const req = Readable.from([JSON.stringify({ sessionId: captain.id, teamId: source.id, action: 'edit', title: 'Change route', operations: [operation], base })]); req.method = 'POST'; req.headers = {}
    await route.handler(req, { writeHead: code => { status = code }, end: body => { result = JSON.parse(body) } })
  }
  await send({ action: 'update_member', name: 'worker', provider: 'fixture', model: 'model-b', reasoningEffort: 'high' }, workflowFingerprint(source))
  assert.equal(status, 200, JSON.stringify(result)); assert.equal(result.team.members[0].model, 'model-b'); assert.equal(result.team.members[0].reasoningEffort, 'high'); assert.equal(result.team.members[0].fallbackActive, undefined); assert.equal(result.team.members[0].activeModel, undefined)
  let saved = await readTeam(join(root, '.agent-teams'), source.id); assert.equal(saved.members[0].reasoningEffort, 'high')
  await send({ action: 'update_member', name: 'worker', provider: 'fixture', model: 'invalid', reasoningEffort: 'high', summary: 'should not save' }, workflowFingerprint(saved))
  assert.equal(status, 409); saved = await readTeam(join(root, '.agent-teams'), source.id); assert.equal(saved.members[0].model, 'model-b'); assert.notEqual(saved.members[0].summary, 'should not save')
  await send({ action: 'update_member', name: 'worker', provider: 'fixture', model: 'model-b', reasoningEffort: 'default' }, workflowFingerprint(saved))
  assert.equal(status, 200); assert.equal(result.team.members[0].reasoningEffort, 'medium')
})

test('human confirms a proposal directly from the bound independent discussion', async t => {
  const root = mkdtempSync(join(tmpdir(), 'workflow-inline-confirm-')); t.after(() => rmSync(root, { recursive: true, force: true }))
  const source = team(), nativeId = `session-at-discussion-${createHash('sha256').update('demo').digest('hex').slice(0, 16)}-00000000-0000-0000-0000-000000000002`
  const proposal = proposeWorkflow(source, 'Update member', [{ action: 'update_member', name: 'worker', summary: 'Updated after discussion' }])
  workflowState(source).discussions['discussion:member:worker'] = { key: 'member:worker', messages: [], calls: [], native: { sessionId: nativeId, label: 'native' }, proposal }
  await createTeamDir(join(root, '.agent-teams'), source)
  const captain = { id: 'captain-id', session: { header: { cwd: root }, ownEvents: () => [] }, status: 'idle' }
  const native = { id: nativeId, session: { header: { cwd: root }, ownEvents: () => [] }, status: 'idle' }
  let route, status, result
  const ctx = { agents: { get: id => id === captain.id ? captain : id === native.id ? native : undefined }, effect: fn => fn(), logger: { warn() {} } }
  installWorkflowWorkbench(ctx, { stateDir: '.agent-teams', maxMembers: 8 }, { kickTeam: async () => {} }, { register: value => { route = value; return () => {} } })
  const req = Readable.from([JSON.stringify({ action: 'apply', sessionId: nativeId, discussion: 'member:worker', teamId: source.id, proposalId: proposal.id })]); req.method = 'POST'; req.headers = {}
  await route.handler(req, { writeHead: code => { status = code }, end: body => { result = JSON.parse(body) } })
  assert.equal(status, 200, JSON.stringify(result)); assert.equal(result.currentDiscussion, 'member:worker')
  assert.equal((await readTeam(join(root, '.agent-teams'), source.id)).members[0].summary, 'Updated after discussion')
})

test('embedded discussion reads and sends only the bound isolated session', async t => {
  const root = mkdtempSync(join(tmpdir(), 'workflow-embedded-')); t.after(() => rmSync(root, { recursive: true, force: true }))
  const source = team(), nativeId = `session-at-discussion-${createHash('sha256').update('demo').digest('hex').slice(0, 16)}-00000000-0000-0000-0000-000000000003`
  workflowState(source).discussions['discussion:member:worker'] = { key: 'member:worker', messages: [], calls: [], native: { sessionId: nativeId, label: 'native' } }
  await createTeamDir(join(root, '.agent-teams'), source)
  const events = [{ type:'user/message', seq:1, data:{ source:{kind:'user'}, content:[{type:'text',text:'Original discussion'}] } }, { type:'assistant/message', seq:2, data:{ message:{ source:{kind:'model'}, content:[{type:'text',text:'AI response'}] } } }], sent = []
  const captain = { id:'captain-id', session:{header:{cwd:root},ownEvents:()=>[]},status:'idle' }
  const agent = { id:nativeId, session:{header:{cwd:root},ownEvents:()=>events},status:'idle',followup:message=>sent.push(message) }
  let route, status, result, streamListener
  const ctx = { on:(event,listener)=>{if(event==='agent/assistant-stream')streamListener=listener}, tools:{register(){}},subagents:{registerContinuableSetup(){}},agents:{get:id=>id===captain.id?captain:id===agent.id?agent:undefined},effect:fn=>fn(),logger:{warn(){}} }
  const conversations = installWorkflowConversations(ctx, {stateDir:'.agent-teams',maxMembers:8}, workflowMaterials)
  installWorkflowWorkbench(ctx, {stateDir:'.agent-teams',maxMembers:8}, {kickTeam:async()=>{}}, {register:value=>{route=value;return()=>{}}}, conversations)
  async function call(action, message, discussion = 'member:worker') { const req = Readable.from([JSON.stringify({sessionId:captain.id,teamId:'demo',discussion,action,message})]); req.method='POST'; req.headers={}; await route.handler(req,{writeHead:code=>{status=code},end:body=>{result=JSON.parse(body)}}) }
  await call('conversation_state'); assert.equal(status,200); assert.deepEqual(result.messages.map(m=>m.text), ['Original discussion','AI response'])
  await call('conversation_send','Make the role more specific'); assert.equal(status,200); assert.equal(sent[0].content[0].text,'Make the role more specific')
  assert.equal(captain.session.ownEvents().length,0)
  agent.status='running'; await call('conversation_send','another'); assert.equal(status,409); assert.equal(sent.length,1)
  streamListener({agent,frame:{type:'start',attemptId:'live',revision:1}})
  streamListener({agent,frame:{type:'chunk',attemptId:'live',revision:2,index:0,chunk:{type:'text-delta',index:0,text:'Partial'}}})
  await call('conversation_state'); assert.equal(result.messages.at(-1).text,'Partial'); assert.equal(result.messages.at(-1).streaming,true)
  streamListener({agent:captain,frame:{type:'start',attemptId:'other',revision:1}})
  streamListener({agent:captain,frame:{type:'chunk',attemptId:'other',revision:1,index:0,chunk:{type:'text-delta',index:0,text:'Must stay private'}}})
  await call('conversation_state'); assert.equal(result.messages.at(-1).text,'Partial')
  events.push({type:'assistant/message',seq:3,data:{message:{source:{kind:'model'},content:[{type:'text',text:'Partial complete'}]}}})
  streamListener({agent,frame:{type:'end',attemptId:'live',revision:3,outcome:{kind:'committed',seq:3,eventType:'assistant/message'}}})
  agent.status='idle';await call('conversation_state');assert.deepEqual(result.messages.map(m=>m.text),['Original discussion','AI response','Partial complete']);assert.equal(result.busy,false)
  await call('conversation_state',undefined,'graph'); assert.equal(status,409)
})

test('edited approval applies the human version, audits the AI suggestion and rejects stale or invalid changes', async t => {
  const root = mkdtempSync(join(tmpdir(), 'workflow-human-edit-')); t.after(() => rmSync(root, {recursive:true,force:true}))
  const source=team(); source.tasks.push(task('t2',['t1']))
  const proposal=proposeWorkflow(source,'AI suggestion',[{action:'update_member',name:'worker',summary:'AI version'}])
  workflowState(source).discussions['discussion:graph']={key:'graph',messages:[],calls:[],proposal}
  await createTeamDir(join(root,'.agent-teams'),source)
  const captain={id:'captain-id',session:{header:{cwd:root},ownEvents:()=>[]},status:'idle'}
  let route,status,result
  const ctx={agents:{get:()=>captain},effect:fn=>fn(),logger:{warn(){}}}
  installWorkflowWorkbench(ctx,{stateDir:'.agent-teams',maxMembers:8},{kickTeam:async()=>{}},{register:value=>{route=value;return()=>{}}})
  async function send(operations,id=proposal.id) { const req=Readable.from([JSON.stringify({action:'apply',sessionId:captain.id,teamId:source.id,discussion:'graph',proposalId:id,operations})]);req.method='POST';req.headers={};await route.handler(req,{writeHead:code=>{status=code},end:body=>{result=JSON.parse(body)}}) }
  await send([{action:'update_member',name:'worker',summary:'Wrong id'}],'replaced');assert.equal(status,409)
  await send([{action:'update_task',id:'t1',dependencies:['t2']}]);assert.equal(status,409)
  assert.equal((await readTeam(join(root,'.agent-teams'),source.id)).workflow.discussions['discussion:graph'].proposal.status,'pending')
  const current=await readTeam(join(root,'.agent-teams'),source.id);current.tasks[0].output='Concurrent result';await writeTeam(join(root,'.agent-teams'),current)
  await send([{action:'update_member',name:'worker',summary:'Human version'}]);assert.equal(status,409)
  await writeTeam(join(root,'.agent-teams'),source)
  await send([{action:'update_member',name:'worker',summary:'Human version'}]);assert.equal(status,200,JSON.stringify(result))
  const saved=await readTeam(join(root,'.agent-teams'),source.id)
  assert.equal(saved.members[0].summary,'Human version')
  assert.equal(saved.workflow.history.at(-1).suggestedOperations[0].summary,'AI version')
  assert.equal(saved.workflow.discussions['discussion:graph'].proposal.operations[0].summary,'Human version')
  await send([{action:'update_member',name:'worker',summary:'Replay'}]);assert.equal(status,409)
})

test('reopening member discussions preserves history and pending proposals without generating again', async t => {
  const root = mkdtempSync(join(tmpdir(), 'workflow-reopen-')); t.after(() => rmSync(root, {recursive:true,force:true}))
  const source = team(), agents = new Map(), events = [], sent = []; let created = 0, resumed = 0
  await createTeamDir(join(root,'.agent-teams'),source)
  const makeAgent = id => ({id,status:'idle',session:{header:{cwd:root},ownEvents:()=>events},whenIdle:async()=>{},followup:message=>{ sent.push(message); events.push({type:'user/message',seq:events.length+1,data:message}) }})
  const ctx = { tools:{register(){}},subagents:{registerContinuableSetup(){}},llm:{resolveCallConfig:async value=>value},effect(){},sessions:{flush:async()=>{}},agents:{
    get:id=>agents.get(id),
    create:async spec=>{created++;const agent=makeAgent(spec.sessionId);agents.set(agent.id,agent);return {agent,dispose(){}}},
    resume:async spec=>{resumed++;const agent=makeAgent(spec.resumeSessionId);agents.set(agent.id,agent);return {agent,dispose(){}}},
  } }
  const captain={id:'captain-id',options:{provider:'fake',model:'fake'},session:{header:{cwd:root},requestHeader:()=>({config:{}})}}
  const runtime=installWorkflowConversations(ctx,{stateDir:'.agent-teams',maxMembers:8},workflowMaterials)
  const stateRoot=join(root,'.agent-teams'), id=await runtime.open(captain,source,'member:worker',stateRoot)
  const discussion=source.workflow.discussions['discussion:member:worker']
  discussion.messages.push({role:'user',text:'Keep my earlier requirements',at:1})
  discussion.proposal=proposeWorkflow(source,'Existing suggestion',[{action:'update_member',name:'worker',summary:'Pending summary'}])
  await writeTeam(stateRoot,source)
  for(let i=0;i<3;i++) assert.equal(await runtime.open(captain,source,'member:worker',stateRoot),id)
  assert.equal(created,1); assert.equal(sent.length,1)
  assert.equal(source.workflow.discussions['discussion:member:worker'].proposal.id,discussion.proposal.id)
  assert.equal(Object.keys(source.workflow.discussions).filter(key=>key.startsWith('archive:')).length,0)
  agents.delete(id)
  const restored=await readTeam(stateRoot,source.id)
  assert.equal(await runtime.open(captain,restored,'member:worker',stateRoot),id)
  const transcript=await runtime.readEmbedded(restored,'member:worker')
  assert.equal(resumed,1);assert.equal(created,1);assert.equal(sent.length,1)
  assert.equal(transcript.messages.length,1)
  assert.equal(restored.workflow.discussions['discussion:member:worker'].messages[0].text,'Keep my earlier requirements')
})

// Exercise the actual scheduler with the built-in graph; only dispatch transport is scripted.
test('parallel feature template dispatches independent branches and waits at joins', async t => {
  const {getBuiltinTemplate}=await import('../lib/builtin-templates.js')
  const {instantiateTemplate}=await import('../lib/templates.js')
  const phases=[
    [[],['requirements','impact']],
    [['requirements'],['impact']],
    [['requirements','impact'],[]],
    [['requirements','impact','scope-review'],['implementation','test-preparation']],
    [['requirements','impact','scope-review','implementation'],['test-preparation','code-review']],
    [['requirements','impact','scope-review','implementation','test-preparation'],['verification','code-review']],
    [['requirements','impact','scope-review','implementation','test-preparation','verification'],['code-review']],
    [['requirements','impact','scope-review','implementation','test-preparation','verification','code-review'],['delivery']],
    [['requirements','impact','scope-review','implementation','test-preparation','verification','code-review','delivery'],[]],
  ]
  for(const [completed,expected] of phases){
    const root=mkdtempSync(join(tmpdir(),'feature-parallel-'));t.after(()=>rmSync(root,{recursive:true,force:true}))
    const source=instantiateTemplate(getBuiltinTemplate('builtin-feature'),'demo','captain-id','Port validation','Implement validatePort')
    source.phase='running'
    for(const task of source.tasks){task.workflowPaused=false;task.workflowConfigPending=false;task.description='Implement port validation and deliver evidence';if(completed.includes(task.id)){task.status='completed';if(task.checkpoint)task.checkpoint.decision='approve'}}
    await createTeamDir(join(root,'.agent-teams'),source)
    const captain={id:'captain-id',status:'idle',session:{header:{cwd:root},ownEvents:()=>[]}}
    const dispatched=[]
    const ctx={agents:{get:id=>id===captain.id?captain:undefined},on(){},effect(){},logger:{warn(){}}}
    const scheduler=installTeamScheduler(ctx,{stateDir:'.agent-teams',dispatch:async(...args)=>{dispatched.push(args);return true}})
    await scheduler.kickTeam(root,'demo',captain)
    const saved=await readTeam(join(root,'.agent-teams'),'demo')
    assert.deepEqual(saved.tasks.filter(task=>task.status==='claimed').map(task=>task.id).sort(),[...expected].sort(),JSON.stringify(completed))
    assert.equal(dispatched.length,expected.length)
    assert.equal(new Set(dispatched.map(args=>args[2])).size,expected.length,'Concurrent tasks must use distinct members')
    assert.equal(checkpointReady(source,source.tasks.find(task=>task.id==='acceptance')),completed.includes('delivery'))
  }
})

test('rerun through a downstream target queues its ancestry atomically and respects human gates',async t=>{
  const source=team();source.members.push({...member,name:'other'},{...member,name:'third'})
  source.tasks=[{...task('root'),status:'in_progress',attempt:2,attemptId:'current'},
    {...task('left',['root']),workflowPaused:true,workflowRerunRequired:true},
    {...task('right',['root']),assignee:'other',workflowPaused:true,workflowRerunRequired:true},
    {...task('gate',['left','right']),assignee:undefined,checkpoint:{round:2,history:[]},workflowPaused:true,workflowRerunRequired:true},
    {...task('target',['gate']),assignee:'third',workflowPaused:true,workflowRerunRequired:true},
    {...task('sibling',['root']),workflowPaused:true,workflowRerunRequired:true},
    {...task('after-target',['target']),workflowPaused:true,workflowRerunRequired:true}]
  const live={status:'running'};source.members[0].id='worker-live'
  const f=await lifecycleFixture(t,source,{liveAgents:new Map([['worker-live',live]])})
  await f.call('resume_rerun_path',{taskId:'target',base:'stale'}).then(r=>assert.equal(r.code,409))
  assert.deepEqual(await f.read(),JSON.parse(JSON.stringify(source)))
  const result=await f.call('resume_rerun_path',{taskId:'target',base:workflowFingerprint(source)})
  assert.equal(result.code,200,result.error)
  let saved=await f.read()
  assert.equal(saved.tasks[0].attemptId,'current','Running upstream keeps its attempt')
  for(const id of ['left','right','gate','target']){assert.equal(saved.tasks.find(t=>t.id===id).workflowPaused,false);assert.equal(saved.tasks.find(t=>t.id===id).workflowRerunRequired,false)}
  assert.equal(saved.tasks.find(t=>t.id==='gate').checkpoint.round,2,'Do not reset or approve checkpoints')
  for(const id of ['sibling','after-target'])assert.deepEqual(saved.tasks.find(t=>t.id===id),source.tasks.find(t=>t.id===id))
  assert.equal(saved.tasks.find(t=>t.id==='target').status,'pending')
  const repeated=await f.call('resume_rerun_path',{taskId:'target',base:workflowFingerprint(saved)});assert.equal(repeated.code,409)
  saved=await f.read();Object.assign(saved.tasks[0],{status:'completed',output:'NEW ROOT'});await f.save(saved)
  live.status='idle';await f.kick()
  saved=await f.read()
  assert.equal(saved.tasks.find(t=>t.id==='left').status,'claimed');assert.equal(saved.tasks.find(t=>t.id==='right').status,'claimed')
  assert.equal(saved.tasks.find(t=>t.id==='target').status,'pending')
  for(const id of ['left','right'])Object.assign(saved.tasks.find(t=>t.id===id),{status:'completed',output:'NEW '+id})
  await f.save(saved)
  assert.equal(checkpointReady(saved,saved.tasks.find(t=>t.id==='gate')),true)
  const materials=await f.call('materials',{discussion:'check:gate'})
  assert.equal(materials.code,200,materials.error)
  const accepted=await f.call('review',{taskId:'gate',decision:'approve',evidence:materials.team.workflow.discussions['discussion:check:gate'].evidence,note:'Reviewed new inputs'})
  assert.equal(accepted.code,200,accepted.error)
  saved=await f.read();assert.equal(saved.tasks.find(t=>t.id==='target').status,'claimed','Approval continues the already authorized path')
  assert.equal(saved.tasks.find(t=>t.id==='sibling').workflowRerunRequired,true)
})

test('rerun path rejects blocked ancestors without partially releasing any node',async()=>{
 const {resumeRerunPath}=await import('../lib/task-rerun.js')
 for(const patch of [{workflowConfigPending:true},{status:'failed'},{reassigning:true},{assignee:'missing'}]){
  const source=team();source.tasks=[{...task('a'),workflowPaused:true,workflowRerunRequired:true,...patch},{...task('b',['a']),workflowPaused:true,workflowRerunRequired:true}]
  const before=structuredClone(source);assert.throws(()=>resumeRerunPath(source,'b'));assert.deepEqual(source,before)
 }
 const source=team();source.tasks=[{...task('a',['missing']),workflowRerunRequired:true}];assert.throws(()=>resumeRerunPath(source,'a'),/缺失/)
 source.tasks[0].dependencies=['a'];assert.throws(()=>resumeRerunPath(source,'a'),/循环/)
})

test('review decisions retain exact immutable snapshots across rework and reject stale evidence', async t => {
  const source=withGate();source.tasks[0].status='completed';source.tasks[0].output='First result'
  const f=await lifecycleFixture(t,source)
  const opened=await f.call('materials',{discussion:'check:gate'})
  assert.equal(opened.code,200,opened.error)
  const evidence=opened.team.workflow.discussions['discussion:check:gate'].evidence
  const raw=opened.team.workflow.discussions['discussion:check:gate'].materials
  const rejected=await f.call('review',{taskId:'gate',decision:'reject',evidence,note:'Fix the result'})
  assert.equal(rejected.code,200,rejected.error)
  assert.equal(rejected.team.tasks.find(t=>t.id==='gate').checkpoint.history[0].materials,raw)
  const persisted=await f.read();assert.equal(persisted.tasks.find(t=>t.id==='gate').checkpoint.history[0].materials,raw)
  const rerun=applyWorkflowOperations(persisted,[{action:'rerun_task',id:'t1',instructions:'Fix it'}])
  assert.equal(rerun.tasks.find(t=>t.id==='gate').checkpoint.history[0].materials,raw)
  const gate=rerun.tasks.find(t=>t.id==='gate');gate.workflowPaused=false;gate.workflowRerunRequired=false
  rerun.tasks[0].status='completed';rerun.tasks[0].output='Second result';await f.save(rerun)
  const next=await f.call('materials',{discussion:'check:gate'});assert.equal(next.code,200,next.error)
  const oldDecision=await f.call('review',{taskId:'gate',decision:'approve',evidence,note:''})
  assert.equal(oldDecision.code,409)
  const changed=await f.read();changed.tasks[0].output='Changed after reading';await f.save(changed)
  const stale=await f.call('review',{taskId:'gate',decision:'approve',evidence:next.team.workflow.discussions['discussion:check:gate'].evidence,note:''})
  assert.equal(stale.code,409);assert.equal((await f.read()).tasks.find(t=>t.id==='gate').checkpoint.decision,undefined)
})

test('mismatched material snapshots never mutate the checkpoint', () => {
  const source=withGate();source.tasks[0].status='completed';const before=structuredClone(source)
  assert.throws(()=>decideCheckpoint(source,'gate','approve','hash','hash','', '{}'),/材料已变化/)
  assert.deepEqual(source,before)
})


test('outcome preview reads only declared files without dispatching or changing state', async t => {
  const source=team();source.tasks[0].deliverables=['report.md'];source.tasks[0].changedPaths=['changed.txt'];
  const f=await lifecycleFixture(t,source);writeFileSync(join(f.workspace,'report.md'),'# Current report');
  const before=await f.read();
  const result=await f.call('outcome_preview',{taskId:'t1',path:'report.md'});
  assert.equal(result.code,200);assert.equal(result.preview.text,'# Current report');
  assert.equal((await f.call('outcome_preview',{taskId:'t1',path:'changed.txt'})).preview.status,'missing');
  assert.equal((await f.call('outcome_preview',{taskId:'t1',path:'other.md'})).code,409);
  assert.equal((await f.call('outcome_preview',{taskId:'other',path:'report.md'})).code,409);
  assert.equal((await f.call('outcome_preview',{sessionId:'outsider',taskId:'t1',path:'report.md'})).code,409);
  assert.deepEqual(await f.read(),before);assert.equal(f.dispatched.length,0);
  await createTeamDir(join(f.workspace,'.agent-teams','archive'),source);
  assert.equal((await f.call('outcome_preview',{taskId:'t1',path:'report.md',archived:true})).preview.text,'# Current report');
  assert.equal(f.dispatched.length,0);
  source.captainSessionId='someone-else';await f.save(source);
  assert.equal((await f.call('outcome_preview',{taskId:'t1',path:'report.md'})).code,409);
});


test('returned review can reopen with fresh evidence, then approve without losing rejection or starting work early',async t=>{
 const source=withGate();source.tasks[0].status='completed';source.tasks[0].output='Original result';
 const f=await lifecycleFixture(t,source);let state=await f.call('materials',{discussion:'check:gate'});
 const oldEvidence=state.team.workflow.discussions['discussion:check:gate'].evidence;
 state=await f.call('review',{taskId:'gate',decision:'reject',evidence:oldEvidence,note:'Check again'});
 const rejected=structuredClone(state.team.tasks.find(t=>t.id==='gate').checkpoint.history);
 assert.equal((await f.call('reopen_review',{taskId:'gate',base:'stale'})).code,409);
 assert.equal((await f.call('reopen_review',{taskId:'gate',base:state.base,sessionId:'outsider'})).code,409);
 state=await f.call('reopen_review',{taskId:'gate',base:state.base});assert.equal(state.code,200,state.error);
 const gate=state.team.tasks.find(t=>t.id==='gate');assert.equal(gate.checkpoint.round,2);assert.equal(gate.checkpoint.decision,undefined);assert.deepEqual(gate.checkpoint.history,rejected);
 assert.equal(f.dispatched.length,0);assert.equal(state.team.tasks[0].output,'Original result');
 assert.equal((await f.call('review',{taskId:'gate',decision:'approve',evidence:oldEvidence})).code,409);
 assert.equal((await f.call('reopen_review',{taskId:'gate',base:state.base})).code,409);
 state=await f.call('review',{taskId:'gate',decision:'approve',evidence:state.team.workflow.discussions['discussion:check:gate'].evidence,note:'Rechecked'});
 assert.equal(state.code,200,state.error);assert.equal(state.team.tasks.find(t=>t.id==='gate').checkpoint.history.length,2);
 assert.equal(f.dispatched.length,1);
});

test('returned review repair reruns source, then resumes gate path without releasing sibling branches',async t=>{
 const source=withGate();source.tasks[0].status='completed';source.tasks[0].output='Needs repair';source.tasks.push({...task('sibling',['t1']),status:'completed',output:'Old sibling result'});
 const f=await lifecycleFixture(t,source);let state=await f.call('materials',{discussion:'check:gate'});
 state=await f.call('review',{taskId:'gate',decision:'reject',evidence:state.team.workflow.discussions['discussion:check:gate'].evidence,note:'Fix encoding'});
 state=await f.call('edit',{base:state.base,title:'Repair',operations:[{action:'rerun_task',id:'t1',instructions:'Fix encoding'}]});
 assert.equal(state.code,200,state.error);assert.equal(f.dispatched.length,1);assert.equal(state.team.tasks[0].workflowRerunContext.instructions,'Fix encoding');
 assert.equal(state.team.tasks.find(t=>t.id==='gate').checkpoint.history[0].decision,'reject');
 state=await f.call('resume_rerun_path',{taskId:'gate',base:state.base});assert.equal(state.code,200,state.error);
 assert.equal(state.team.tasks.find(t=>t.id==='gate').workflowPaused,false);assert.equal(state.team.tasks.find(t=>t.id==='sibling').workflowPaused,true);
 assert.equal(state.team.tasks.find(t=>t.id==='after').workflowPaused,true);assert.equal(state.ready.includes('gate'),false);
 const completed=await f.read();completed.tasks[0].status='completed';completed.tasks[0].output='Repaired';await f.save(completed);
 state=await f.call('materials',{discussion:'check:gate'});assert.equal(state.code,200,state.error);
 assert.equal(state.team.tasks.find(t=>t.id==='gate').checkpoint.decision,undefined);
 state=await f.call('review',{taskId:'gate',decision:'approve',evidence:state.team.workflow.discussions['discussion:check:gate'].evidence});assert.equal(state.code,200,state.error);
 assert.equal(state.team.tasks.find(t=>t.id==='after').workflowPaused,true);
});


test('start all releases a rerun chain once, approval dispatches downstream, pause all stops continuation',async t=>{
 const source=withGate();source.tasks[0].status='completed';source.tasks[0].output='Old result';
 const f=await lifecycleFixture(t,source);let state=await f.call('state');
 state=await f.call('edit',{base:state.base,title:'Repair',operations:[{action:'rerun_task',id:'t1',instructions:'Fix result'}]});assert.equal(state.code,200,state.error);
 assert.equal(flowControlState(state.team).canStart,true,'pending reruns must enable Start all');
 state=await f.call('set_flow_enabled',{enabled:true,version:flowControlVersion(state.team)});assert.equal(state.code,200,state.error);
 for(const id of ['gate','after']){const task=state.team.tasks.find(t=>t.id===id);assert.equal(task.workflowPaused,false);assert.equal(task.workflowRerunRequired,false);}
 assert.equal(f.dispatched.filter(args=>args[3].includes('Task: after')).length,0,'human review blocks downstream');
 let completed=await f.read();completed.tasks[0].status='completed';completed.tasks[0].output='Fixed';await f.save(completed);
 state=await f.call('materials',{discussion:'check:gate'});assert.equal(state.code,200,state.error);
 state=await f.call('review',{taskId:'gate',decision:'approve',evidence:state.team.workflow.discussions['discussion:check:gate'].evidence});assert.equal(state.code,200,state.error);
 assert.equal(f.dispatched.filter(args=>args[3].includes('Task: after')).length,1,'approval automatically dispatches the next task without another start');
 assert.equal(flowControlState(state.team).canPause,true);
 state=await f.call('set_flow_enabled',{enabled:false,version:flowControlVersion(state.team)});assert.equal(state.code,200,state.error);
 assert.equal(state.team.tasks.find(t=>t.id==='after').workflowPaused,true);const count=f.dispatched.length;await f.kick();assert.equal(f.dispatched.length,count);
 state=await f.call('set_flow_enabled',{enabled:true,version:flowControlVersion(state.team)});assert.equal(state.code,200,state.error);assert.equal(state.team.tasks.find(t=>t.id==='after').workflowPaused,false);
});


test('cold recovery respects persisted pause, rerun, configuration, handoff and dependency fences',async t=>{
 for(const patch of [{workflowPaused:true},{workflowRerunRequired:true},{workflowConfigPending:true},{reassigning:true},{dependencies:['missing']}]){
  const source=team();source.members[0].id='old-child';Object.assign(source.tasks[0],{status:'in_progress',attempt:3,attemptId:'old-capability',...patch});
  const f=await lifecycleFixture(t,source);await f.kick();assert.equal(f.dispatched.length,0,JSON.stringify(patch));assert.equal((await f.read()).tasks[0].attemptId,'old-capability');
 }
 const source=team();source.tasks[0].workflowRerunRequired=true;source.tasks[0].workflowPaused=false;
 const f=await lifecycleFixture(t,source);await f.kick();assert.equal(f.dispatched.length,0,'rerun confirmation is a fence independent of pause');
});

test('explicit continuation replaces an interrupted attempt once, preserves partial output and rejects stale replay',async t=>{
 const source=team();source.members[0].id='old-child';Object.assign(source.tasks[0],{status:'in_progress',attempt:3,attemptId:'old-capability',output:'Partial result',workflowRerunContext:{instructions:'Preserve the previously requested correction',previousStatus:'completed',requestedAt:1}});
 const f=await lifecycleFixture(t,source);const state=await f.call('state');assert.equal(state.execution.t1,'interrupted');
 const resumed=await f.call('continue_task',{taskId:'t1',base:state.base});assert.equal(resumed.code,200,resumed.error);
 const current=await f.read();assert.equal(current.tasks[0].attempt,4);assert.notEqual(current.tasks[0].attemptId,'old-capability');assert.equal(current.tasks[0].stoppedAttempts[0].output,'Partial result');assert.equal(f.dispatched.length,1);assert.match(f.dispatched[0][3],/Preserve the previously requested correction/);assert.equal(current.tasks[0].workflowRerunContext.continuation,true);
 assert.equal((await f.call('continue_task',{taskId:'t1',base:state.base})).code,409);assert.equal(f.dispatched.length,1);
});

test('continuation never interrupts a running live session or bypasses a rerun gate',async t=>{
 const source=team();source.members[0].id='live';Object.assign(source.tasks[0],{status:'in_progress',attempt:1,attemptId:'live-attempt'});
 const f=await lifecycleFixture(t,source,{liveAgents:new Map([['live',{id:'live',status:'running'}]])});let state=await f.call('state');assert.equal(state.execution.t1,'active');
 assert.equal((await f.call('continue_task',{taskId:'t1',base:state.base})).code,409);assert.equal((await f.read()).tasks[0].attemptId,'live-attempt');
 source.tasks[0]={...task('t1'),workflowPaused:true,workflowRerunRequired:true};await f.save(source);state=await f.call('state');assert.equal((await f.call('continue_task',{taskId:'t1',base:state.base})).code,409);
});

test('pause retains monotonic attempts and permits explicit restart of stopped partial work',async t=>{
 const source=withGate();source.members[0].id='child';Object.assign(source.tasks[0],{status:'in_progress',attempt:5,attemptId:'before-stop',output:'Partial'});
 const f=await lifecycleFixture(t,source);let state=await f.call('stop_task',{taskId:'t1'});assert.equal(state.code,200,state.error);assert.equal(state.team.tasks[0].attempt,5);
 const oldBase=state.base;state=await f.call('edit',{base:state.base,title:'Restart from node',operations:[{action:'rerun_task',id:'t1',instructions:'Use corrected input'}]});assert.equal(state.code,200,state.error);
 assert.equal(state.team.tasks[0].attempt,6);assert.equal(state.team.tasks[0].workflowRerunContext.previousOutput,'Partial');assert.equal(state.team.tasks[1].workflowRerunRequired,true);
 assert.equal((await f.call('edit',{base:oldBase,title:'Replay',operations:[{action:'rerun_task',id:'t1',instructions:'Again'}]})).code,409);
});

test('halted workflows require an explicit reason and preserve cancelled results on recovery',async t=>{
 const source=team();source.halted=true;source.tasks[0].status='cancelled';source.tasks[0].output='Keep cancelled record';const f=await lifecycleFixture(t,source);const state=await f.call('state');
 assert.equal((await f.call('resume_team',{base:state.base,reason:''})).code,409);
 const resumed=await f.call('resume_team',{base:state.base,reason:'Connection recovered'});assert.equal(resumed.code,200,resumed.error);assert.equal(resumed.team.halted,false);assert.equal(resumed.team.tasks[0].output,'Keep cancelled record');assert.equal(resumed.team.tasks[0].status,'cancelled');assert.equal(f.dispatched.length,0);
});

for(const action of ['set_flow_enabled','start_path'])test(action+' continues interrupted upstream without new instructions and preserves completed work',async t=>{
 const source=withGate();source.members[0].id='offline-child';Object.assign(source.tasks[0],{status:'in_progress',attempt:4,attemptId:'old',output:'Saved partial work'});source.tasks[1].workflowPaused=true;
 source.tasks.push({...task('done'),status:'completed',output:'Do not repeat'});
 const f=await lifecycleFixture(t,source);const state=await f.call('state');
 const next=await f.call(action,action==='start_path'?{taskId:'gate',base:state.base}:{enabled:true,version:flowControlVersion(state.team)});
 assert.equal(next.code,200,next.error);assert.equal(f.dispatched.length,1);assert.equal(next.team.tasks[0].attempt,5);assert.match(f.dispatched[0][3],/Saved partial work/);assert.doesNotMatch(f.dispatched[0][3],/Explicit rerun/);
 assert.equal(next.team.tasks.find(t=>t.id==='done').output,'Do not repeat');assert.equal(next.team.tasks.find(t=>t.id==='after').workflowPaused,action==='start_path'?true:undefined);
});
test('ordinary paused ancestry starts through target, preserving completed ancestors and pausing further descendants',async t=>{
 const source=team();source.tasks=[{...task('done'),status:'completed',attempt:2,output:'saved'}, {...task('a',['done']),workflowPaused:true}, {...task('b',['a']),workflowPaused:true}, task('later',['b'])];
 const f=await lifecycleFixture(t,source);const state=await f.call('state');const next=await f.call('start_path',{taskId:'b',base:state.base});assert.equal(next.code,200,next.error);
 assert.deepEqual(next.team.tasks[0],source.tasks[0]);assert.equal(next.team.tasks[1].status,'claimed');assert.equal(next.team.tasks[2].workflowPaused,false);assert.equal(next.team.tasks[3].workflowPaused,true);
});

test('conditional discussion history retains streaming and busy changes without resending identical history',async t=>{
 let chat={messages:[{id:'1',role:'assistant',text:'hello'}],busy:false}
 const f=await lifecycleFixture(t,team(),{conversations:{readEmbedded:async()=>chat}})
 const initial=await f.call('conversation_state',{discussion:'member:worker',conditionalState:true});assert.equal(initial.code,200);assert.ok(initial.revision)
 const same=await f.call('conversation_state',{discussion:'member:worker',conditionalState:true,knownRevision:initial.revision});assert.equal(same.notModified,true);assert.equal(same.messages,undefined)
 chat={messages:[...chat.messages,{id:'stream',role:'assistant',text:'partial',streaming:true}],busy:true}
 const changed=await f.call('conversation_state',{discussion:'member:worker',conditionalState:true,knownRevision:initial.revision});assert.equal(changed.busy,true);assert.equal(changed.messages.at(-1).text,'partial');assert.notEqual(changed.revision,initial.revision)
 assert.equal(f.dispatched.length,0);assert.equal((await f.read()).tasks[0].status,'pending')
})
