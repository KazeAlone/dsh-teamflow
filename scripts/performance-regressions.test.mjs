import test from 'node:test'
import assert from 'node:assert/strict'
import {mkdtemp,rm,writeFile} from 'node:fs/promises'
import {tmpdir} from 'node:os'
import {join} from 'node:path'
import {createWorkspaceAuditor} from '../lib/workspace-audit-async.js'
import {auditTeamWorkspace} from '../lib/workspace-audit.js'
import {createTeamDir} from '../lib/state.js'
import {collectTeamsActivity,assembleTeamSnapshot} from '../lib/snapshot.js'
import {createWorkflowCache,workflowCacheKey} from '../lib/client/workflow-cache.js'

test('workflow view memory is bounded, owner-scoped, expires and never caches oversized records',()=>{
 const cache=createWorkflowCache(2,100,1000)
 const a=workflowCacheKey('a','same',false),b=workflowCacheKey('b','same',false)
 cache.set(a,{n:1});cache.set(b,{n:2});assert.equal(cache.get(a).n,1)
 cache.set('c',{n:3});assert.equal(cache.get(b),undefined)
 cache.set('huge','x'.repeat(100));assert.equal(cache.get('huge'),undefined);assert.equal(cache.get(a).n,1)
 assert.notEqual(a,workflowCacheKey('a','same',true))
 const expired=createWorkflowCache(1,100,-1);expired.set('a',1);assert.equal(expired.get('a'),undefined)
})

test('scoped polling does not inspect mailboxes or audit unrelated teams',async t=>{
 const root=await mkdtemp(join(tmpdir(),'teamflow-scope-'));t.after(()=>rm(root,{recursive:true,force:true}))
 for(let i=0;i<40;i++)await createTeamDir(root,{id:`team-${i}`,name:'Team',captainSessionId:`captain-${i}`,createdAt:1,members:[],tasks:[],taskSeq:0})
 const audits=[]
 const ctx={agents:{get(){}},logger:{warn(){}}}
 const result=await collectTeamsActivity(ctx,[{workspace:'fixture',stateRoot:root,workspacePath:root}],new Set(['captain-20']),async(_,team)=>{audits.push(team.id);return{artifacts:[],expandedScope:[]}})
 assert.deepEqual(result.map(t=>t.teamId),['team-20']);assert.deepEqual(audits,['team-20'])
 const state={id:'team-20',name:'Team',captainSessionId:'captain-20',createdAt:1,members:[],tasks:[],taskSeq:0}
 const unavailable=await assembleTeamSnapshot(ctx,root,'fixture',state,{workspacePath:root,auditWorkspace:async()=>{throw Error('worker unavailable')}})
 assert.equal(unavailable.teamId,state.id,'worker failure must not make the team disappear')
 assert.equal(unavailable.delivery.ok,false,'failed audit must not appear verified')
})

test('background audits retain exact byte checks, coalesce only in-flight work and leave timers responsive',async t=>{
 const root=await mkdtemp(join(tmpdir(),'teamflow-audit-')),auditor=createWorkspaceAuditor()
 t.after(async()=>{await auditor.dispose();await rm(root,{recursive:true,force:true})})
 await writeFile(join(root,'result.bin'),Buffer.alloc(32*1024*1024,7))
 const team={tasks:[{id:'review',reviewedArtifacts:[{path:'result.bin'}]}]}
 let timerRan=false;const timer=setTimeout(()=>{timerRan=true},0)
 const first=auditor.audit(root,team);assert.equal(auditor.audit(root,team),first)
 const value=await first;clearTimeout(timer);assert.equal(timerRan,true)
 assert.deepEqual(value,auditTeamWorkspace(root,team))
 await writeFile(join(root,'result.bin'),'changed')
 const changed=await auditor.audit(root,team);assert.notEqual(changed.artifacts[0].sha256,value.artifacts[0].sha256)
 await auditor.dispose();await assert.rejects(auditor.audit(root,team),/disposed/)
})
