import test from 'node:test'
import assert from 'node:assert/strict'
import {WorkflowLaunchController, selectedWorkflowWorkspace} from '../lib/client/workflow-launcher.js'
const workspace={workspaceId:'project',title:'Project',path:'/project',sessionIds:['existing']}
const input={template:{id:'template',version:2},name:'Flow',goal:'Requirements',language:'zh'}
const result=()=>({id:'created',name:'Flow',description:'Requirements',workflow:{templateSource:{id:'template',version:2}}})
function fixture(request){const calls=[], releases=[];return {calls,releases,controller:new WorkflowLaunchController({async create(options){calls.push(options);return 'fresh'},retain(id,options){assert.equal(options.source,'teamflowLauncher');return {sessionId:id,ready:Promise.resolve({}),release(){releases.push(id)}}}},request)}}
test('current project follows main conversation ownership and never guesses from recent projects',()=>{
 assert.equal(selectedWorkflowWorkspace([workspace],{byId:{existing:{id:'existing',retainedBy:{mainView:1}}}}),workspace)
 assert.equal(selectedWorkflowWorkspace([workspace],{byId:{existing:{id:'existing',retainedBy:{background:1}}}}),undefined)
 assert.equal(selectedWorkflowWorkspace([workspace],{current:'unassigned',byId:{}}),undefined)
 assert.equal(selectedWorkflowWorkspace([workspace],{byId:{existing:{id:'existing',blank:true,retainedBy:{mainView:1}}}}),undefined)
})
test('launch creates and retains a fresh conversation in the explicitly chosen project',async()=>{
 const actions=[];const f=fixture(async(action,fields)=>{actions.push({action,fields});return action==='state'?{}:{team:result()}})
 const launched=await f.controller.launch(input,workspace,new AbortController().signal)
 assert.deepEqual(f.calls,[{workspaceId:'project'}]);assert.equal(launched.sessionId,'fresh')
 assert.equal(actions[1].fields.description,'Requirements');assert.equal(actions[1].fields.sessionId,'fresh')
 f.controller.dispose();assert.deepEqual(f.releases,['fresh'])
})
test('a response lost after creation recovers the same workflow without a second apply',async()=>{
 let created=false,applies=0;const f=fixture(async action=>{if(action==='state')return created?{team:result()}:{};applies++;created=true;throw Error('connection lost')})
 assert.equal((await f.controller.launch(input,workspace,new AbortController().signal)).team.id,'created')
 await f.controller.launch(input,workspace,new AbortController().signal)
 assert.equal(applies,1);assert.equal(f.calls.length,1);f.controller.dispose()
})
test('failed launch can retry in its existing fresh session; an unrelated workflow is never overwritten',async()=>{
 let fail=true,other=false;const f=fixture(async action=>{if(action==='state')return other?{team:{...result(),name:'Other'}}:{};if(fail)throw Error('try again');return {team:result()}})
 await assert.rejects(f.controller.launch(input,workspace,new AbortController().signal),/try again/)
 fail=false;await f.controller.launch(input,workspace,new AbortController().signal);assert.equal(f.calls.length,1)
 other=true;await assert.rejects(f.controller.launch(input,workspace,new AbortController().signal),/已有其他流程/);f.controller.dispose()
})
test('leaving the panel before session creation settles prevents template execution',async()=>{
 let finish,applies=0,retains=0;const controller=new WorkflowLaunchController({create:()=>new Promise(resolve=>finish=resolve),retain(){retains++}},async()=>{applies++;return {}})
 const pending=controller.launch(input,workspace,new AbortController().signal);controller.dispose();finish('fresh')
 await assert.rejects(pending,/closed/);assert.equal(applies,0);assert.equal(retains,0)
})
