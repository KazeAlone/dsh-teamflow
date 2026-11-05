import test from 'node:test'
import assert from 'node:assert/strict'
import { adaptationReviewOperations, lineDiff, proposalIssues, reviewedOperations, reviewFields, setReviewField } from '../lib/client/proposal-review.js'
const team = { members: [{ name:'worker', summary:'Keep\nOld line', role:'reviewer', executionPrompt:'Read files' }], tasks:[{ id:'t1', subject:'Task', description:'Details', assignee:'worker', dependencies:[] }] }

test('line comparison preserves unchanged lines while marking additions and removals', () => {
  assert.deepEqual(lineDiff('keep\nold\ntail', 'keep\nnew\ntail'), [{kind:'same',text:'keep'},{kind:'removed',text:'old'},{kind:'added',text:'new'},{kind:'same',text:'tail'}])
  assert.deepEqual(lineDiff('', 'new'), [{kind:'added',text:'new'}])
  assert.deepEqual(lineDiff('old', ''), [{kind:'removed',text:'old'}])
  assert.deepEqual(lineDiff('same', 'same'), [{kind:'same',text:'same'}])
})

test('human can edit the latest member value while retaining unchanged fields', () => {
  const operation = { action:'update_member', name:'worker', summary:'Keep\nNew line' }
  const fields = reviewFields(team, operation).fields
  assert.equal(fields.find(f=>f.key==='role').after, 'reviewer')
  const edited = setReviewField(operation, fields.find(f=>f.key==='summary'), 'Keep\nHuman line')
  assert.deepEqual(reviewedOperations(team,[edited],[true]), [{action:'update_member',name:'worker',summary:'Keep\nHuman line'}])
  assert.deepEqual(reviewedOperations(team,[edited],[false]), [])
  assert.deepEqual(reviewedOperations(team,[setReviewField(edited,fields.find(f=>f.key==='summary'),'Keep\nOld line')],[true]), [])
})

test('approval supports editable additions, dependencies and keeping deleted objects', () => {
  const add = {action:'add_member',name:'new',summary:'New role'}
  assert.equal(reviewFields(team,add).fields.find(f=>f.key==='summary').before,'')
  const change = {action:'update_task',id:'t1',dependencies:['t2']}
  const field=reviewFields(team,change).fields.find(f=>f.key==='dependencies')
  assert.deepEqual(setReviewField(change,field,'t2, t3\nt2').dependencies,['t2','t3'])
  const remove={action:'remove_member',name:'worker'}
  assert.ok(reviewFields(team,remove).fields.every(f=>!f.editable&&f.after===''))
  assert.deepEqual(reviewedOperations(team,[remove],[false]),[])
  assert.ok(!reviewFields(team,{action:'add_task',subject:'Gate',dependencies:[],checkpoint:true}).fields.some(f=>f.key==='assignee'))
})

test('large multiline instructions use bounded diff memory', () => {
  const a = Array.from({length:450},(_,i)=>`old ${i}`).join('\n'), b=Array.from({length:450},(_,i)=>`new ${i}`).join('\n')
  const result=lineDiff(a,b)
  assert.equal(result.filter(line=>line.kind==='removed').length,450)
  assert.equal(result.filter(line=>line.kind==='added').length,450)
})

test('rerun approval names the existing task and keeps editable rerun instructions', () => {
  const operation={action:'rerun_task',id:'t1',instructions:'Review latest input'}
  const review=reviewFields(team,operation)
  assert.match(review.title,/仅重跑任务 · Task/)
  assert.deepEqual(review.fields.map(f=>f.key),['instructions'])
  const edited=setReviewField(operation,review.fields[0],'Human requirement')
  assert.deepEqual(reviewedOperations(team,[edited],[true]),[{action:'rerun_task',id:'t1',instructions:'Human requirement'}])
  assert.deepEqual(reviewedOperations(team,[edited],[false]),[])
})


test('saved issues stay visible when a proposal omits them and clearing is explicit', () => {
  const original = {...team, tasks: [{...team.tasks[0], adaptationIssue:'Missing acceptance criteria'}]}
  const operation = {action:'update_task',id:'t1',description:'New requirements',confirmConfiguration:true}
  const field = reviewFields(original, operation).fields.find(field=>field.key==='adaptationIssue')
  assert.equal(field.after,'Missing acceptance criteria')
  assert.deepEqual(proposalIssues(original,[operation],[true]),[{index:0,issue:'Missing acceptance criteria',blocksApply:true}])
  const cleared = setReviewField(operation,field,'')
  assert.deepEqual(proposalIssues(original,[cleared],[true]),[])
  assert.equal(reviewedOperations(original,[cleared],[true])[0].adaptationIssue,'')
  assert.equal(original.tasks[0].adaptationIssue,'Missing acceptance criteria')
})

test('issue navigation preserves item indexes, excludes unchecked items, and follows prior clears', () => {
  const original={...team,tasks:[...team.tasks,{id:'t2',adaptationIssue:'Need input'}]}
  const ops=[{action:'update_task',id:'t1',description:'Ready'},{action:'update_task',id:'t2',confirmConfiguration:true}]
  assert.equal(proposalIssues(original,ops,[true,true])[0].index,1)
  assert.deepEqual(proposalIssues(original,ops,[true,false]),[])
  assert.deepEqual(proposalIssues(original,[{action:'update_task',id:'t2',adaptationIssue:''},ops[1]],[true,true]),[])
  assert.equal(proposalIssues(original,[{action:'update_task',id:'t2',description:'Draft'}],[true])[0].blocksApply,false)
  assert.equal(proposalIssues(original,[{action:'rerun_task',id:'t2',instructions:'Retry'}],[true])[0].blocksApply,true)
})


test('template approval carries inherited issues and preserves an explicit empty resolution', () => {
  const source={...team,tasks:[{...team.tasks[0],adaptationIssue:'Need approval'}]}
  const op={action:'update_task',id:'t1',description:'Requirements',confirmConfiguration:false}
  assert.equal(adaptationReviewOperations(source,[op])[0].adaptationIssue,'Need approval')
  assert.equal(adaptationReviewOperations(source,[{...op,adaptationIssue:''}])[0].adaptationIssue,'')
  assert.equal(op.adaptationIssue,undefined)
})
