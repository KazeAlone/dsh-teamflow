import test from 'node:test'
import assert from 'node:assert/strict'
import {activityStatus} from '../lib/client/activity-status.js'
const task=(id,patch={})=>({id,status:'pending',dependencies:[],...patch})
const team=tasks=>({phase:'running',tasks,members:[]})
test('capsule shows node completion and prioritizes actionable reviews over concurrent work',()=>{
 const result=activityStatus(team([task('a',{status:'completed'}),task('b',{status:'in_progress'}),task('g',{checkpoint:{round:1},dependencies:['a']})]))
 assert.equal(result.percent,33);assert.equal(result.running,1);assert.equal(result.reviews,1);assert.equal(result.attention,1);assert.equal(result.state,'review')
})
test('a manual checkpoint only counts as completed after approval; cancelled tasks do not inflate progress',()=>{
 const tasks=[task('a',{status:'completed'}),task('g',{status:'completed',checkpoint:{round:1}}),task('c',{status:'cancelled'})]
 assert.equal(activityStatus(team(tasks)).percent,33)
 assert.equal(activityStatus(team([task('g',{status:'completed',checkpoint:{round:1,decision:'approve'}})])).state,'completed')
})
test('empty, staged, paused, attention and archive states never imply active execution',()=>{
 assert.equal(activityStatus().state,'history');assert.equal(activityStatus(team([])).percent,0)
 assert.equal(activityStatus({...team([task('a')]),phase:'staged'}).state,'staged')
 assert.equal(activityStatus(team([task('a',{workflowPaused:true})])).state,'paused')
 assert.equal(activityStatus(team([task('a',{status:'failed',workflowConfigPending:true})])).attention,1)
 const archived=activityStatus(team([task('a',{status:'in_progress'})]),true);assert.equal(archived.running,0);assert.equal(archived.state,'archived')
 assert.equal(activityStatus(team([task('g',{checkpoint:{round:1},workflowPaused:true})])).reviews,0)
})

test('pure configuration issues have their own label, including staged workflows; mixed issues stay attention',()=>{
 const config=task('config',{workflowConfigPending:true});
 assert.equal(activityStatus(team([config])).state,'configuration');
 assert.equal(activityStatus({...team([config]),phase:'staged'}).state,'configuration');
 assert.equal(activityStatus(team([config,task('failed',{status:'failed'})])).state,'attention');
 assert.equal(activityStatus(team([config,task('review',{checkpoint:{round:1}})])).state,'attention');
 assert.equal(activityStatus(team([config,task('rerun',{workflowRerunRequired:true})])).state,'attention');
 assert.equal(activityStatus(team([config]),true).state,'archived');
});
