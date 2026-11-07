import test from 'node:test'
import assert from 'node:assert/strict'
import {workflowRequest} from '../lib/client/workflow-request.js'
import {openAgentTeamMember} from '../lib/client/session-navigation.js'
import {discussionHistory} from '../lib/discussion-history.js'

function deferredFetch(){const calls=[];const fetcher=(_url,init)=>new Promise((resolve,reject)=>{calls.push({init,resolve:value=>resolve(new Response(JSON.stringify(value)))});init.signal.addEventListener('abort',()=>reject(new DOMException('Aborted','AbortError')),{once:true})});return {fetcher,calls}}
test('shared reads cancel independently, release transport after last reader and never retain settled authority',async()=>{
 const {fetcher,calls}=deferredFetch(),a=new AbortController(),b=new AbortController(),payload={action:'state',sessionId:'a'}
 const first=workflowRequest(payload,fetcher,1000,a.signal),second=workflowRequest(payload,fetcher,1000,b.signal)
 assert.equal(calls.length,1);a.abort();await assert.rejects(first);assert.equal(calls[0].init.signal.aborted,false)
 calls[0].resolve({value:1});assert.deepEqual(await second,{value:1})
 const third=workflowRequest(payload,fetcher,1000,b.signal);assert.equal(calls.length,2);b.abort();await assert.rejects(third);assert.equal(calls[1].init.signal.aborted,true)
 const next=workflowRequest(payload,fetcher,1000);assert.equal(calls.length,3);calls[2].resolve({value:2});assert.deepEqual(await next,{value:2})
})
test('mutations including material capture are independent and fence in-flight reads',async()=>{
 const {fetcher,calls}=deferredFetch(),payload={action:'state',sessionId:'a'}
 const old=workflowRequest(payload,fetcher,1000),write=workflowRequest({action:'materials'},fetcher,1000),write2=workflowRequest({action:'materials'},fetcher,1000),fresh=workflowRequest(payload,fetcher,1000)
 assert.equal(calls.length,4)
 calls.forEach((call,index)=>call.resolve({index}));assert.deepEqual(await fresh,{index:3});await Promise.all([old,write,write2])
})
test('timeout is bounded and a failed read does not poison subsequent requests',async()=>{
 const {fetcher,calls}=deferredFetch();await assert.rejects(workflowRequest({action:'state'},fetcher,5));assert.equal(calls[0].init.signal.aborted,true)
 const retry=workflowRequest({action:'state'},fetcher,1000);calls[1].resolve({ok:true});assert.deepEqual(await retry,{ok:true})
})
test('rapid native history navigation shares catalog work and only opens last selection',async()=>{
 let finish;let count=0;const opened=[];const sessions={open(){},openSubagent:a=>opened.push(a.childSessionId),refreshSubagents:()=>{count++;return new Promise(resolve=>{finish=resolve})}}
 const a=openAgentTeamMember(sessions,'parent','a'),b=openAgentTeamMember(sessions,'parent','b');await Promise.resolve();assert.equal(count,1);finish();assert.equal(await a,'cancelled');assert.equal(await b,'subagent');assert.deepEqual(opened,['b'])
})
test('discussion tail avoids converting old content, caches unchanged log and refreshes on append',()=>{
 let reads=0;const events=Array.from({length:100000},(_,seq)=>({seq,type:'assistant/message',data:{message:{get content(){if(seq<99900)throw Error('old content must not be converted');return [{type:'text',text:String(seq)}]}}}}))
 const session={seq:events.length,ownEvents(){reads++;return events}}
 const first=discussionHistory(session);assert.equal(first.length,100);assert.equal(first[0].text,'99900');assert.equal(discussionHistory(session),first);assert.equal(reads,1)
 events.push({seq:100000,type:'assistant/message',data:{message:{content:[{type:'text',text:'new'}]}}});session.seq++;assert.equal(discussionHistory(session).at(-1).text,'new');assert.equal(reads,2)
 const legacy={ownEvents:()=>events};assert.equal(discussionHistory(legacy).at(-1).text,'new')
})
