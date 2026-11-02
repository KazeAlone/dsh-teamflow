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
import { taskNeedsConfiguration } from '../lib/task-description.js'

const brief = { requirements: 'Follow confirmed requirements; test valid, boundary and invalid inputs.', deliverables: 'Implementation and tests', acceptance: 'Independent boundary tests pass' }

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

test('normal planning proposes complete descriptions in one call without creating a reusable draft', async t => {
  const f = await mount(t), context = await f.context()
  assert.deepEqual([...f.definitions.keys()].sort(), ['agent_teams_template_propose','agent_teams_workflow_context','agent_teams_workflow_propose'])
  const operations = [{action:'add_member',name:'worker',summary:'Implement and test'},
    {action:'add_task',id:'build',subject:'Port validation',assignee:'worker',dependencies:[],description:'Implement validatePort for integers 1–65535. Deliver validator and tests. Reject 0, 65536 and non-number inputs.'},
    {action:'add_task',id:'review',subject:'Human acceptance',checkpoint:true,dependencies:['build'],description:'Check the implementation and boundary-test evidence; approve only if all checks pass.'}]
  await f.call('agent_teams_workflow_propose',{base:context.base,title:'Ports',operations})
  const saved = await f.read()
  assert.equal(saved.tasks.length,0,'Generation must remain a proposal until user confirmation')
  const applied = applyWorkflowProposal(saved,saved.workflow.discussions['discussion:graph'].proposal,8)
  assert.equal(applied.tasks.length,2)
  assert.ok(applied.tasks.every(task => task.description && !task.layers && !taskNeedsConfiguration(task)))
  assert.ok(applied.members.every(member => !member.id))
  assert.equal(applied.workflow.discussions['discussion:graph'].generalDraft,undefined)
  await assert.rejects(f.call('agent_teams_workflow_propose',{base:context.base,title:'Invalid',operations:[{action:'add_task',subject:'Missing requirements',dependencies:[]}]}),/description/)
})

test('template context carries generic requirements; adaptation saves only complete descriptions and server-owned readiness', async t => {
  const f = await mount(t,true), context = await f.context()
  assert.deepEqual(context.template.tasks,f.source.workflow.templateDefinition.tasks)
  assert.equal(context.goal,'Validate ports 1–65535')
  assert.ok(context.tasks.every(task => !task.layers && !task.description))
  const operations=context.tasks.map(task=>({action:'update_task',id:task.id,description:`Port-specific work for ${task.subject}; follow the required method, deliver tests and verify boundary cases.`}))
  await assert.rejects(f.call('agent_teams_workflow_propose',{base:context.base,title:'Partial',operations:operations.slice(1)}),/所有节点/)
  await assert.rejects(f.call('agent_teams_workflow_propose',{base:context.base,title:'Changed graph',operations:[{...operations[0],assignee:'captain'},...operations.slice(1)]}),/负责人/)
  await f.call('agent_teams_workflow_propose',{base:context.base,title:'Adapted',operations})
  const saved=await f.read(),applied=applyWorkflowProposal(saved,saved.workflow.discussions['discussion:adapt'].proposal,8)
  assert.deepEqual(applied.workflow.templateDefinition,f.source.workflow.templateDefinition)
  assert.deepEqual(applied.tasks.map(t=>[t.id,t.assignee,t.dependencies]),f.source.tasks.map(t=>[t.id,t.assignee,t.dependencies]))
  assert.ok(applied.tasks.every(task=>!taskNeedsConfiguration(task)&&!task.layers&&task.description))
  assert.ok(applied.members.every(m=>!m.id))
  await f.save(applied)
  const next=await f.context()
  await f.call('agent_teams_workflow_propose',{base:next.base,title:'Missing information',operations:operations.map((op,i)=>i?op:{...op,adaptationIssue:'Need the deployment target',confirmConfiguration:true})})
  const blocked=await f.read(),after=applyWorkflowProposal(blocked,blocked.workflow.discussions['discussion:adapt'].proposal,8)
  assert.ok(taskNeedsConfiguration(after.tasks[0]),'A model cannot confirm away a real blocker')
})

test('old layer records flatten without losing constraints or bypassing human configuration holds',async t=>{
  const f=await mount(t,true), old=structuredClone(f.source)
  delete old.workflow.templateDefinition
  for(const task of old.tasks)task.layers={general:brief,specific:{requirements:'Use ports 1–65535',deliverables:'validator.mjs',acceptance:'Reject other inputs'}}
  old.planReviewState='generating'
  old.workflow.discussions['discussion:graph']={key:'graph',messages:[],calls:[],generalDraft:{id:'legacy-draft',base:'old-base',title:'Unsaved plan',operations:[{action:'add_task',id:'extra',subject:'Legacy draft',dependencies:[],layers:{general:brief,specific:{requirements:'',deliverables:'',acceptance:''}}}]}}
  await f.save(old)
  const loaded=await f.read()
  assert.deepEqual(loaded.workflow.templateDefinition.tasks[0].general,brief)
  for(const task of loaded.tasks){
    assert.match(task.description,/Follow confirmed requirements/)
    assert.match(task.description,/Use ports 1–65535/)
    assert.equal(task.layers,undefined)
    assert.equal(task.workflowConfigPending,true)
  }
  assert.equal(loaded.planReviewState,'awaiting_review')
  assert.equal(loaded.workflow.discussions['discussion:graph'].generalDraft,undefined)
  assert.match(loaded.workflow.discussions['discussion:graph'].proposal.operations[0].description,/Follow confirmed requirements/)
  await f.save(loaded)
  assert.deepEqual(await f.read(),loaded,'Migration must be idempotent')
})
