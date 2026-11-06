import test from 'node:test'
import assert from 'node:assert/strict'
import { registerHooks } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { parseReviewMaterial, reviewItems, reviewChanges } from '../lib/client/review-evidence.js'
import { isCheckpoint } from '../lib/workflow-validation.js'
import { WorkflowLocale } from '../lib/client/workflow-i18n.js'
import { en } from '../lib/client/locales.js'
const hook = registerHooks({ resolve(specifier, context, next) {
  if (specifier.endsWith('.module.css')) return { url: 'data:text/javascript,export default new Proxy({}, {get: (_, key) => key})', shortCircuit: true }
  return next(specifier, context)
} })
const { ReviewWorkbench } = await import('../lib/client/ReviewWorkbench.js')
hook.deregister()
const task = { id: 'review', subject: 'Review export', description: 'Inspect all evidence before approving.', acceptance: ['Encoding'], dependencies: ['work'], status: 'pending', checkpoint: { round: 2, history: [] } }
const raw = JSON.stringify({ check: { id: 'review', subject: task.subject, description: task.description, round: 2 }, results: [{ id: 'work', subject: 'Implementation', output: '<script>unsafe()</script>', acceptanceResults: [{ criterion: 'Encoding', status: 'passed', evidence: 'Round-trip test' }, { criterion: 'Encoding performance', status: 'failed' }], commandsRun: [{ command: 'npm test', status: 'passed', evidence: '3 tests', exitCode: 0 }] }], files: { artifacts: [{ path: 'out.csv', present: true, sha256: 'abc' }], gaps: [{ pattern: 'private', reason: 'Excluded' }] } })
const material = parseReviewMaterial(raw)
test('evidence parsing tolerates malformed legacy records without fabricating success', () => {
  for (const value of ['null', '[]', '{}', '{', '{"check":null,"results":[]}']) assert.equal(parseReviewMaterial(value), undefined)
  const malformed = parseReviewMaterial(JSON.stringify({check: material.check, results: [null, {id:'work',acceptanceResults:[{}, {criterion:'x',status:'unknown'}]}],files:{artifacts:[null,{}, {path:'missing'}]}}))
  assert.deepEqual(malformed.results[0].acceptanceResults, [])
  assert.equal(malformed.files[0].present, false)
  assert.equal(isCheckpoint({...task.checkpoint,history:[{round:1,decision:'approve',at:1,note:'',evidence:'hash',materials:{}}]}),false)
})
test('criteria use exact matching and retain upstream-only reports as reports', () => {
  const items = reviewItems(task,material)
  assert.equal(items[0].kind,'requirement');assert.equal(items[0].reports.length,1)
  assert.equal(items[1].kind,'report');assert.equal(items[1].reports[0].status,'failed')
  assert.equal(reviewItems({...task,acceptance:['Encoding speed']},material)[0].reports.length,0)
  assert.equal(reviewItems({...task,acceptance:undefined,description:'1. A\n2. B'},undefined).length,0)
})
test('comparison ignores timestamps but detects reports, file identity and scope gaps', () => {
  const previous=structuredClone(material)
  assert.deepEqual(reviewChanges(previous,material),{results:[],files:[],requirementsChanged:false,gapsChanged:false})
  previous.results[0].commandsRun[0].status='failed';previous.files[0].sha256='old';previous.gaps=[];previous.check.description='Old requirements'
  const diff=reviewChanges(previous,material)
  assert.equal(diff.results.length,1);assert.equal(diff.files.length,1);assert.equal(diff.requirementsChanged,true);assert.equal(diff.gapsChanged,true)
})
const render = (overrides={}) => {
  const props={team:{id:'team',phase:'running',members:[],tasks:[task]},task,ready:true,archived:false,busy:false,note:'',conversation:{materials:raw,materialsRound:2,evidence:'digest'},onNote(){},onRefresh(){},onDecision:async()=>true,onDiscuss(){},onBack(){},...overrides}
  return renderToStaticMarkup(React.createElement(WorkflowLocale,{t:(key)=>en[key]??key},React.createElement(ReviewWorkbench,props)))
}
test('workbench renders escaped, localized evidence and no automatic approval', () => {
  const html=render()
  assert.match(html,/&lt;script&gt;unsafe/);assert.doesNotMatch(html,/<script>/)
  assert.doesNotMatch(html,/\p{Script=Han}/u)
  assert.match(html,/Human checkpoint/);assert.match(html,/Return for changes/)
  assert.doesNotMatch(html,/Confirm approval<\/button>/)
})
test('archive and decided legacy rounds are read-only and never show current evidence as historical', () => {
  const decided={...task,checkpoint:{round:2,decision:'approve',history:[{round:2,decision:'approve',at:1,note:'Legacy decision',evidence:'old'}]}}
  const html=render({task:decided,archived:true})
  assert.match(html,/no evidence snapshot/);assert.match(html,/Legacy decision/)
  assert.doesNotMatch(html,/Round-trip test|Return for changes|unsafe/)
  const waiting=render({ready:false,conversation:undefined})
  assert.match(waiting,/not ready/);assert.match(waiting,/disabled=""[^>]*>Approve/)
})


test('returned review offers reconsideration and repair; archives do not mutate',()=>{
 const returned={...task,checkpoint:{round:2,decision:'reject',note:'Fix encoding',history:[]}};
 const team={id:'team',phase:'running',members:[],tasks:[{id:'work',subject:'Implementation',status:'completed',dependencies:[]},returned]};
 const props={team,task:returned,onReopen(){},onRerun:async()=>true};
 const html=render(props);assert.match(html,/Review current results again/);assert.match(html,/Save instructions and rerun task/);assert.match(html,/Fix encoding/);assert.doesNotMatch(html,/\p{Script=Han}/u);
 const archive=render({...props,archived:true});assert.doesNotMatch(archive,/Save instructions and rerun task|Review current results again/);
 const empty=render({...props,task:{...returned,dependencies:[]},team:{...team,tasks:[{...returned,dependencies:[]}]}});assert.match(empty,/No upstream task can be rerun/);assert.match(empty,/Review current results again/);
});
