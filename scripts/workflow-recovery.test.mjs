import test from 'node:test'
import assert from 'node:assert/strict'
import {workflowRequest} from '../lib/client/workflow-request.js'
import {taskReadiness} from '../lib/client/task-readiness.js'
import {canRestartTask} from '../lib/task-rerun.js'
const task={id:'work',subject:'Work',assignee:'worker',status:'in_progress',dependencies:[],attempt:2}
const team={phase:'running',tasks:[task],members:[{name:'worker',status:'idle'}]}
test('bounded network requests fail once and never replay uncertain mutations',async()=>{
 let calls=0
 const fetcher=async(url,init)=>{calls++;return new Promise((resolve,reject)=>init.signal.addEventListener('abort',()=>reject(new Error('offline')),{once:true}))}
 await assert.rejects(workflowRequest({action:'continue_task'},fetcher,15),/操作可能已经保存/)
 assert.equal(calls,1)
 assert.deepEqual(await workflowRequest({action:'state'},async()=>new Response(JSON.stringify({team:{id:'latest'}})),100),{team:{id:'latest'}})
 await assert.rejects(workflowRequest({action:'edit'},async()=>new Response(JSON.stringify({error:'stale base'}),{status:409}),100),/stale base/)
})
test('readiness distinguishes observed interruption, running work, paused work, missing members and dependencies',()=>{
 assert.equal(taskReadiness(team,task,undefined,'interrupted').action,'continue')
 assert.equal(taskReadiness(team,task,undefined,'active').action,undefined)
 assert.equal(taskReadiness(team,{...task,workflowPaused:true},undefined,'active').action,'stop')
 assert.equal(taskReadiness({...team,members:[]},{...task,status:'pending'}).action,'member')
 assert.deepEqual(taskReadiness(team,{...task,status:'pending',dependencies:['missing']}).dependencies,['missing'])
 assert.equal(taskReadiness(team,{...task,status:'pending',workflowPaused:true}).action,'path')
 assert.equal(taskReadiness(team,{...task,status:'pending',workflowRerunRequired:true}).action,'path')
})
test('restart accepts stopped partial attempts but never a live attempt or untouched draft',()=>{
 assert.equal(canRestartTask(task),false)
 assert.equal(canRestartTask({...task,status:'pending',workflowPaused:true}),true)
 assert.equal(canRestartTask({...task,status:'pending',workflowPaused:true,reassigning:true}),false)
 assert.equal(canRestartTask({...task,status:'pending',workflowPaused:true,attempt:0}),false)
})

test('unmount cancellation aborts an in-flight read without waiting for its deadline',async()=>{
 const controller=new AbortController();let signal;
 const pending=workflowRequest({action:'conversation_state'},async(url,init)=>{signal=init.signal;return new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(Error('cancelled')),{once:true}))},10000,controller.signal);
 controller.abort();await assert.rejects(pending,{name:'AbortError'});assert.equal(signal.aborted,true);
});
