import test from 'node:test'
import assert from 'node:assert/strict'
import {DiscussionStreams} from '../lib/workflow-stream.js'
test('stream snapshots contain only reply text, preserve blocks, and settle without duplication',()=>{
 const streams=new DiscussionStreams(),agent={id:'discussion'},other={id:'other'}
 let revision=0;const frame=(type,rest={})=>({type,attemptId:'one',revision:++revision,...rest})
 streams.accept(agent,frame('start'));assert.equal(streams.read(agent),undefined)
 streams.accept(agent,frame('chunk',{index:0,chunk:{type:'reasoning-delta',index:0,text:'private reasoning'}}))
 streams.accept(agent,frame('chunk',{index:1,chunk:{type:'tool-call-delta',index:1,argumentsDelta:'private arguments'}}))
 assert.equal(streams.read(agent),undefined)
 streams.accept(agent,frame('chunk',{index:2,chunk:{type:'text-delta',index:2,text:'Hello '}}))
 assert.equal(streams.read({id:agent.id}).text,'Hello ');assert.equal(streams.read(other),undefined)
 streams.accept(agent,frame('chunk',{index:3,chunk:{type:'text-delta',index:2,text:'world'}}))
 streams.accept(agent,frame('chunk',{index:3,chunk:{type:'text-delta',index:2,text:'world'}}))
 assert.equal(streams.read(agent).text,'Hello world')
 streams.accept(agent,frame('chunk',{index:4,chunk:{type:'block-end',index:2,block:{type:'text',text:'Hello world!'}}}))
 streams.accept(agent,frame('chunk',{index:5,chunk:{type:'text-delta',index:2,text:'ignored'}}))
 streams.accept(agent,frame('chunk',{index:6,chunk:{type:'text-delta',index:3,text:'Next paragraph'}}))
 assert.equal(streams.read(agent).text,'Hello world!\nNext paragraph')
 streams.accept(agent,frame('end',{outcome:{kind:'committed'}}));assert.equal(streams.read(agent),undefined)
})
test('retry replaces provisional text and late old frames cannot damage the new attempt',()=>{
 const streams=new DiscussionStreams(),agent={id:'discussion'}
 streams.accept(agent,{type:'start',attemptId:'old',revision:1})
 streams.accept(agent,{type:'chunk',attemptId:'old',revision:2,index:0,chunk:{type:'text-delta',index:0,text:'Discard'}})
 streams.accept(agent,{type:'start',attemptId:'new',revision:3})
 streams.accept(agent,{type:'end',attemptId:'old',revision:1,outcome:{kind:'abandoned'}})
 streams.accept(agent,{type:'chunk',attemptId:'new',revision:4,index:0,chunk:{type:'text-delta',index:0,text:'New reply'}})
 assert.equal(streams.read(agent).text,'New reply')
 streams.accept(agent,{type:'end',attemptId:'new',revision:5,outcome:{kind:'abandoned'}})
 assert.equal(streams.read(agent),undefined)
})
