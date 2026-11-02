import assert from 'node:assert/strict'
import test from 'node:test'
import { mkdtemp, rm, readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createHash } from 'node:crypto'
import { installWorkflowConversations } from '../lib/workflow-native.js'
import { createTeamDir, readTeam, writeTeam } from '../lib/state.js'
import { workflowFingerprint, applyWorkflowProposal } from '../lib/workflow.js'
import { instantiateTemplate } from '../lib/templates.js'
import { getBuiltinTemplate } from '../lib/builtin-templates.js'
import { taskNeedsConfiguration } from '../lib/task-layers.js'

const brief = { requirements: 'Follow confirmed requirements; test valid, boundary and invalid inputs.', deliverables: 'Implementation and tests', acceptance: 'Independent boundary tests pass' }
const stageOne = base => ({base,title:'Port workflow',members:[{name:'worker',summary:'Implement and test'}],tasks:[{id:'build',subject:'Implement port validation',assignee:'worker',dependencies:[],...brief},{id:'review',subject:'Review evidence',assignee:'',checkpoint:true,dependencies:['build'],...brief}]})
const instance = id => ({id,requirements:'Implement validatePort for primitive number integers 1–65535, checking valid, boundary and invalid inputs.',deliverables:'validator.mjs and tests',acceptance:'Independent checks cover 1, 65535, 0, 65536 and wrong types'})

async function mount(t, template = false) {
  const root=await mkdtemp(join(tmpdir(),'two-stage-'));t.after(()=>rm(root,{recursive:true,force:true}))
  const stateRoot=join(root,'.agent-teams')
  const source=template?instantiateTemplate(getBuiltinTemplate('builtin-feature',1),'demo','captain','Ports','Validate ports 1–65535'):{id:'demo',name:'Ports',description:'Validate ports 1–65535',captainSessionId:'captain',phase:'staged',members:[],tasks:[],taskSeq:0,createdAt:1,workflow:{positions:{},history:[],discussions:{}}}
  const key=template?'adapt':'graph',id=`session-at-discussion-${createHash('sha256').update('demo').digest('hex').slice(0,16)}-00000000-0000-0000-0000-000000000001`
  source.workflow.discussions[`discussion:${key}`]={key,messages:[],calls:[],native:{sessionId:id,label:'planning'}}
  await createTeamDir(stateRoot,source)
  const definitions=new Map(),sections=[],filters=[];let setup
  const install=()=>installWorkflowConversations({tools:{register:d=>definitions.set(d.name,d)},subagents:{registerContinuableSetup:fn=>{setup=fn}}},{stateDir:'.agent-teams',maxMembers:8},()=>({text:'',evidence:''}))
  const agent={id,session:{header:{cwd:root},ownEvents:()=>[]}},exec={agent,signal:new AbortController().signal}
  const restore=()=>{install();setup({agent,tools:{restrict:f=>{filters.push(f);return()=>{}}},systemPrompt:{section:s=>{sections.push(s.text);return()=>{}},getSectionOrder:()=>0},on:()=>()=>{}})}
  restore()
  const call=async(name,args={})=>JSON.parse(await definitions.get(name).execute(args,exec))
  return {source,key,sections,filters,restore,definitions,call,read:()=>readTeam(stateRoot,'demo'),save:s=>writeTeam(stateRoot,s),raw:()=>readFile(join(stateRoot,'demo','team.json'),'utf8'),context:()=>call('agent_teams_workflow_context')}
}

test('two stages persist a recoverable general draft, feed generic requirements into stage two, and require final human application',async t=>{
  const f=await mount(t),context=await f.context()
  assert.match(f.sections[0],/创建分两次提交/)
  const draft=await f.call('agent_teams_plan_general',stageOne(context.base))
  assert.equal(draft.goal,f.source.description)
  assert.deepEqual(draft.tasks[0].general,brief)
  assert.deepEqual(draft.tasks[1].dependencies,['build'])
  let saved=await f.read()
  assert.equal(saved.tasks.length,0);assert.equal(saved.members.length,0)
  assert.equal(saved.workflow.discussions['discussion:graph'].proposal,undefined)
  f.restore()
  const restored=await f.context()
  assert.equal(restored.draftId,draft.draftId);assert.deepEqual(restored.tasks,draft.tasks)
  const before=await f.raw()
  await assert.rejects(f.call('agent_teams_plan_specific',{draftId:draft.draftId,tasks:[instance('build')]}),/Missing: review/)
  assert.equal(await f.raw(),before)
  await f.call('agent_teams_plan_specific',{draftId:draft.draftId,tasks:draft.tasks.map(task=>instance(task.id))})
  saved=await f.read();assert.equal(saved.tasks.length,0)
  const proposal=saved.workflow.discussions['discussion:graph'].proposal
  const applied=applyWorkflowProposal(saved,proposal,8)
  assert.equal(applied.tasks.length,2);assert.equal(applied.phase,'staged')
  assert.deepEqual(applied.tasks[0].layers.general,brief)
  assert.equal(applied.tasks[0].layers.specific.requirements,instance('build').requirements)
  assert.equal(applied.workflow.discussions['discussion:graph'].generalDraft,undefined)
  assert.ok(applied.tasks.every(task=>!taskNeedsConfiguration(task)))
})

test('stage two rejects stale/replaced drafts and misplaced model state without losing the general draft',async t=>{
  const f=await mount(t),context=await f.context()
  const first=await f.call('agent_teams_plan_general',stageOne(context.base))
  const second=await f.call('agent_teams_plan_general',stageOne(context.base))
  const before=await f.raw()
  const nullAssignee=stageOne(context.base);nullAssignee.tasks[1].assignee=null
  await assert.rejects(f.call('agent_teams_plan_general',nullAssignee),/assignee.*string/)
  for(const invalid of [JSON.stringify(second.tasks),null,{}])await assert.rejects(f.call('agent_teams_plan_specific',{draftId:second.draftId,tasks:invalid}),/tasks.*array/)
  for(const change of [t=>t.deliverables=['result.txt'],t=>delete t.acceptance]){
    const tasks=second.tasks.map(t=>instance(t.id));change(tasks[0])
    await assert.rejects(f.call('agent_teams_plan_specific',{draftId:second.draftId,tasks}),/deliverables|acceptance/)
  }
  assert.equal(await f.raw(),before,'Malformed generation calls leave the saved draft intact')
  await assert.rejects(f.call('agent_teams_plan_specific',{draftId:first.draftId,tasks:first.tasks.map(t=>instance(t.id))}),/草稿/)
  for(const extra of [{general:brief},{layers:{general:brief}},{confirmConfiguration:true},{adaptationIssue:'all good'}]){
    await assert.rejects(f.call('agent_teams_plan_specific',{draftId:second.draftId,tasks:second.tasks.map(t=>({...instance(t.id),...extra}))}),/not a declared property/)
  }
  const changed=await f.read();changed.description='Changed goal';await f.save(changed)
  await assert.rejects(f.call('agent_teams_plan_specific',{draftId:second.draftId,tasks:second.tasks.map(t=>instance(t.id))}),/团队已变化/)
  assert.equal((await f.read()).workflow.discussions['discussion:graph'].generalDraft.id,second.draftId)
})

test('template skips general generation; server preserves topology and generic contracts and handles blockers',async t=>{
  const f=await mount(t,true),context=await f.context()
  assert.deepEqual(f.filters[0].allow,['agent_teams_workflow_context','agent_teams_plan_specific'])
  assert.match(f.sections[0],/只执行第二阶段/)
  assert.equal(context.goal,f.source.description)
  assert.deepEqual(context.tasks[0].general,f.source.tasks[0].layers.general)
  await assert.rejects(f.call('agent_teams_plan_general',stageOne(context.base)),/整体流程/)
  const tasks=context.tasks.map(t=>instance(t.id));tasks[0].blocker='Missing confirmed input'
  await f.call('agent_teams_plan_specific',{draftId:context.draftId,tasks})
  let saved=await f.read(),applied=applyWorkflowProposal(saved,saved.workflow.discussions['discussion:adapt'].proposal,8)
  assert.ok(taskNeedsConfiguration(applied.tasks[0]));assert.equal(applied.tasks[0].adaptationIssue,tasks[0].blocker)
  assert.deepEqual(applied.tasks.map(t=>[t.id,t.assignee,t.dependencies,t.layers.general]),f.source.tasks.map(t=>[t.id,t.assignee,t.dependencies,t.layers.general]))
  await f.save(applied)
  const latest=await f.context()
  await f.call('agent_teams_plan_specific',{draftId:latest.draftId,tasks:context.tasks.map(t=>instance(t.id))})
  saved=await f.read();applied=applyWorkflowProposal(saved,saved.workflow.discussions['discussion:adapt'].proposal,8)
  assert.ok(applied.tasks.every(t=>!taskNeedsConfiguration(t)))
  assert.equal(applied.tasks[0].adaptationIssue,'')
})

test('legacy graph tool cannot bypass the general-first creation path',async t=>{
  const f=await mount(t),context=await f.context()
  const before=await f.raw()
  await assert.rejects(f.call('agent_teams_workflow_propose',{base:context.base,title:'bad operations',operations:'[]'}),/operations.*array/)
  for(const layers of ['',null,[],JSON.stringify({general:brief,specific:brief})]){
    await assert.rejects(f.call('agent_teams_workflow_propose',{base:context.base,title:'bad layers',operations:[{action:'add_task',subject:'x',dependencies:[],layers}]}),/layers.*object/)
  }
  assert.equal(await f.raw(),before,'Previously reported operations/layers errors cannot modify state')
  await assert.rejects(f.call('agent_teams_workflow_propose',{base:context.base,title:'bypass',operations:[{action:'add_task',id:'x',subject:'x',dependencies:[],layers:{general:brief,specific:brief}}]}),/agent_teams_plan_general/)
  assert.equal((await f.read()).tasks.length,0)
})
