import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { mkdtemp, writeFile, mkdir, readFile, rm } from 'node:fs/promises'
const tmpdir = () => join(process.cwd(), 'output')
import { join } from 'node:path'
import { Readable } from 'node:stream'
import { parseTemplate, templateSeed, extractedTemplate, instantiateTemplate, templateTopology, validateAdaptation } from '../lib/templates.js'
import { listTemplates, getTemplate, saveTemplate, deleteTemplate } from '../lib/template-store.js'
import { builtinTemplates, getBuiltinTemplate } from '../lib/builtin-templates.js'
import { taskSplitBlock, validateTaskSplit } from '../lib/task-split.js'
import { resolveTeamProfile } from '../lib/profiles.js'
import { taskText, emptyBrief, taskNeedsConfiguration, requireGeneratedTaskLayers, parseLayers } from '../lib/task-layers.js'
import { applyWorkflowOperations, workflowFingerprint, checkpointReady, parseWorkflowOperations } from '../lib/workflow.js'
import { isTeamTask, createTeamDir, readTeam } from '../lib/state.js'
import { installWorkflowWorkbench } from '../lib/workflow-runtime.js'
import { isWorkflowState } from '../lib/workflow-validation.js'
import { memberPersona } from '../lib/members.js'
import { reviewedOperations, reviewFields, setReviewField } from '../lib/client/proposal-review.js'
import { initialEditorDraft } from '../lib/client/workbench-selection.js'
import { propertyOperation } from '../lib/client/workbench-drafts.js'

const general={requirements:'按已确认规格实现目标算子',deliverables:'实现与说明',acceptance:'通过独立验证'}
const definition=()=>({name:'算子流程',description:'适合算子开发',tags:['开发'],inputs:'参考实现与精度目标',members:[{name:'worker',summary:'实现',role:'开发',executionPrompt:'遵循项目约定'}],tasks:[{id:'t1',subject:'实现',assignee:'worker',dependencies:[],checkpoint:false,general:{...general}},{id:'gate',subject:'人工验收',assignee:'',dependencies:['t1'],checkpoint:true,general:{...general,requirements:'检查提交证据'}}],positions:{'task:t1':{x:20,y:20}}})
const template=()=>({...definition(),id:'11111111-1111-4111-8111-111111111111',version:1,createdAt:1,updatedAt:1})
const team=()=>instantiateTemplate(template(),'new-team','captain','算子 B','实现算子 B')
const adaptation=t=>t.tasks.map(task=>({action:'update_task',id:task.id,layers:{general:task.layers.general,specific:{requirements:`本次处理算子 B：${task.subject}`,deliverables:'B 的交付物',acceptance:'B 的验收要求'}},adaptationIssue:'',confirmConfiguration:true}))

test('layer diagnostics identify the failing path and type without guessing task content', () => {
  for (const [value, type] of [[null, 'null'], [[], 'array'], ['', 'string'], ['{}', 'string'], [false, 'boolean']]) {
    assert.throws(() => parseLayers(value), error => error.message.includes(`layers must be an object (received ${type})`))
  }
  const layers = { general: { ...general }, specific: { ...general } }
  assert.throws(() => parseLayers({ specific: general }), /layers.general must be an object/)
  assert.throws(() => parseLayers({ ...layers, specific: { ...general, acceptance: undefined } }), /layers.specific.acceptance must be a string \(received undefined\)/)
  assert.throws(() => parseLayers({ ...layers, specific: { ...general, deliverables: ['result.txt'] } }), /layers.specific.deliverables must be a string \(received array\)/)
  assert.throws(() => parseLayers({ ...layers, specific: { ...general, requirements: 'x'.repeat(16001) } }), /layers.specific.requirements.*16000/)
  assert.throws(() => parseWorkflowOperations([{ action: 'update_member', name: 'worker', summary: 'unchanged' }, { action: 'update_task', id: 't1', layers: { ...layers, specific: [] } }]), /operations\[1\].layers.specific must be an object/)
  assert.equal(parseLayers({ ...layers, specific: { ...general, deliverables: '  a\nb  ' } }).specific.deliverables, 'a\nb')
  assert.deepEqual(layers, { general, specific: general }, 'parsing cannot change the caller input')
})

test('export and instantiation keep structure but never reuse execution/session/route data',()=>{
  const source=team();Object.assign(source.tasks[0],{output:'A secret result',attempt:5,status:'completed',attemptId:'old',changedPaths:['A.cpp']});Object.assign(source.members[0],{id:'old-session',provider:'old-provider',specificPrompt:'A ONLY'});source.workflow.discussions={};
  source.workflow.positions['task:deleted']={x:12,y:12};source.members[0].status='removed';
  const saved=templateSeed(source),fresh=instantiateTemplate({...saved,...template()},'b','new-captain','B','B goal')
  assert.equal(templateTopology(saved),templateTopology(definition()))
  assert.ok(!JSON.stringify(saved).includes('A secret'));assert.ok(!JSON.stringify(saved).includes('old-session'));assert.ok(!JSON.stringify(saved).includes('old-provider'));assert.ok(!JSON.stringify(saved).includes('A ONLY'))
  assert.equal(fresh.tasks[0].output,undefined);assert.equal(fresh.tasks[0].attempt,0);assert.equal(fresh.members[0].id,'');assert.equal(fresh.phase,'staged');assert.equal(fresh.tasks[1].checkpoint.decision,undefined)
  assert.ok(fresh.tasks.every(t=>t.workflowConfigPending));assert.equal(fresh.tasks[0].layers.specific.requirements,'');assert.ok(isWorkflowState(fresh.workflow));assert.ok(fresh.tasks.every(isTeamTask))
  fresh.tasks[0].layers.general.requirements='changed';assert.equal(saved.tasks[0].general.requirements,general.requirements)
})
test('template parser rejects cycles, missing references, unsafe ids, invalid layers and strips runtime fields',()=>{
  for(const change of [d=>d.tasks[0].dependencies=['gate'],d=>d.tasks[0].assignee='missing',d=>d.tasks[1].dependencies=['missing'],d=>d.tasks[0].id='../escape',d=>d.tasks[0].general.requirements=7,d=>d.tasks[1].assignee='worker',d=>d.tasks[0].id='t999999999999999999999']){const d=definition();change(d);assert.throws(()=>parseTemplate(d))}
  assert.equal(parseTemplate({...definition(),captainSessionId:'old'}).captainSessionId,undefined)
  const changed=definition();changed.tasks.pop();assert.throws(()=>extractedTemplate(team(),changed),/保留/)
  const old=team();delete old.tasks[0].layers;old.tasks[0].description='Implement operator A';assert.equal(templateSeed(old).tasks[0].general.requirements,'')
})
test('unified adaptation preserves all nodes, members and generic requirements',()=>{
  const current=team(),ops=adaptation(current);validateAdaptation(current,ops)
  assert.throws(()=>validateAdaptation(current,ops.slice(1)),/所有节点/)
  assert.throws(()=>validateAdaptation(current,[...ops,{action:'add_task',subject:'extra',dependencies:[]}]),/增删/)
  assert.throws(()=>validateAdaptation(current,[{...ops[0],assignee:'captain'},ops[1]]),/负责人/)
  const changed=structuredClone(ops);changed[0].layers.general.requirements='skip tests';assert.throws(()=>validateAdaptation(current,changed),/通用/)
  const ready=applyWorkflowOperations(current,ops);assert.ok(ready.tasks.every(t=>!taskNeedsConfiguration(t)))
  const cleared=structuredClone(ready.tasks[0].layers);cleared.specific.requirements='';const incomplete=applyWorkflowOperations(ready,[{action:'update_task',id:'t1',layers:cleared}]);assert.equal(incomplete.tasks[0].workflowConfigPending,true);
  assert.ok(!taskText(ready.tasks[0]).includes('通用任务'));assert.match(taskText(ready.tasks[0]),/算子 B/)
})
test('non-applicable nodes stay blocked; explicit resolution and changed generic layer require confirmation',()=>{
  let current=team(),ops=adaptation(current);ops[0].adaptationIssue='当前项目没有 GPU';ops[0].confirmConfiguration=false
  current=applyWorkflowOperations(current,ops);assert.ok(taskNeedsConfiguration(current.tasks[0]))
  assert.throws(()=>applyWorkflowOperations(current,[{action:'update_task',id:'t1',confirmConfiguration:true}]),/先处理/)
  current=applyWorkflowOperations(current,[{action:'update_task',id:'t1',adaptationIssue:'',confirmConfiguration:true}]);assert.ok(!taskNeedsConfiguration(current.tasks[0]))
  const layers=structuredClone(current.tasks[0].layers);layers.general.acceptance='增加独立审查'
  current=applyWorkflowOperations(current,[{action:'update_task',id:'t1',layers}]);assert.ok(current.tasks[0].workflowConfigPending)
  assert.match(current.tasks[0].layers.specific.requirements,/算子 B/)
  current=applyWorkflowOperations(current,[{action:'update_task',id:'t1',confirmConfiguration:true}]);assert.ok(!taskNeedsConfiguration(current.tasks[0]))
  current.phase='running';current.tasks[0].status='completed';current.tasks[1].adaptationIssue='缺少证据';assert.equal(checkpointReady(current,current.tasks[1]),false)
})
test('layered drafts, human proposal edits and member prompts preserve both layers',()=>{
  const current=team(),ops=adaptation(current),target={type:'task',id:'t1'}
  let fields=reviewFields(current,ops[0]).fields;assert.ok(fields.some(f=>f.label==='本次验收要求'))
  ops[0]=setReviewField(ops[0],fields.find(f=>f.key==='layers.specific.acceptance'),'用户要求验证误差')
  const selected=reviewedOperations(current,ops,[true,true]);assert.equal(selected.length,2);assert.equal(selected[0].confirmConfiguration,true)
  const updated=applyWorkflowOperations(current,selected),draft=initialEditorDraft(updated,target);assert.match(draft.values.description,/算子 B/);assert.ok(!draft.values.description.includes('通用任务：'))
  draft.values.specificDeliverables='新交付';const op=propertyOperation(updated,target,draft);assert.equal(op.layers.general.requirements,general.requirements);assert.equal(op.layers.specific.deliverables,'新交付')
  const m={...updated.members[0],specificPrompt:'关注 B 的低精度'};const prompt=memberPersona(updated,m,'.agent-teams');assert.match(prompt,/遵循项目约定/);assert.match(prompt,/关注 B 的低精度/)
  assert.ok(!isTeamTask({...updated.tasks[0],layers:{general:{},specific:{}}}))
})
test('personal library is durable, versioned, concurrent-safe and deletion does not mutate instances',async(t)=>{
  const root=await mkdtemp(join(tmpdir(),'teamflow-library-'));t.after(()=>rm(root,{recursive:true,force:true}))
  assert.deepEqual(await listTemplates(root),{templates:[],warnings:[]})
  const one=await saveTemplate(root,definition()),copy=instantiateTemplate(one,'copy','captain','Copy','goal')
  const attempts=await Promise.allSettled([saveTemplate(root,{...definition(),name:'new version'},{id:one.id,version:1}),saveTemplate(root,definition(),{id:one.id,version:1})])
  assert.equal(attempts.filter(r=>r.status==='fulfilled').length,1);assert.equal((await getTemplate(root,one.id)).version,2)
  assert.equal((await getTemplate(root,one.id,1)).name,'算子流程');assert.equal(copy.workflow.templateSource.version,1)
  await assert.rejects(()=>deleteTemplate(root,one.id,1),/变化/);await deleteTemplate(root,one.id,2);assert.equal((await listTemplates(root)).templates.length,0);await assert.rejects(()=>getTemplate(root,one.id),/删除/)
  assert.equal(copy.tasks.length,2)
  await writeFile(join(root,'22222222-2222-4222-8222-222222222222.json'),'{broken');assert.equal((await listTemplates(root)).warnings.length,1)
  await assert.rejects(()=>getTemplate(root,'../escape'))
})
test('authenticated workflow handler applies templates once and leaves the source unchanged',async(t)=>{
  const workspace=await mkdtemp(join(tmpdir(),'teamflow-api-')),library=join(workspace,'library'),state=join(workspace,'.agent-teams');await mkdir(state);t.after(()=>rm(workspace,{recursive:true,force:true}))
  const template=await saveTemplate(library,definition()),source=team();source.id='source';source.captainSessionId='another-captain';await createTeamDir(state,source)
  const before=await readFile(join(state,'source','team.json'),'utf8')
  const captain={id:'captain',options:{provider:'fixture',model:'test'},session:{header:{cwd:workspace},requestHeader:()=>undefined,ownEvents:()=>[]}}
  const ctx={agents:{get:id=>id==='captain'?captain:undefined},llm:{resolveCallConfig:async v=>v},effect:fn=>fn()};let route
  installWorkflowWorkbench(ctx,{stateDir:'.agent-teams',templateDirectory:library,maxMembers:8},{},{register:r=>{route=r;return()=>{}}})
  async function call(action,fields={}){const req=Readable.from([JSON.stringify({sessionId:'captain',action,...fields})]);req.method='POST';let status,value;await route.handler(req,{writeHead:s=>{status=s},end:v=>{value=JSON.parse(v)}});return {status,...value}}
  assert.equal((await call('template_list')).templates.length,4)
  const result=await call('template_apply',{templateId:template.id,version:1,name:'B',description:'实现 B'});assert.equal(result.status,200,result.error);assert.equal(result.activity.teamId,result.team.id);assert.equal(result.activity.captainSessionId,'captain');assert.equal(result.activity.phase,'staged');assert.equal(result.team.phase,'staged');assert.ok(result.team.tasks.every(t=>t.workflowConfigPending));assert.equal(result.team.members[0].model,'test')
  assert.equal((await call('template_apply',{templateId:template.id,version:1,name:'duplicate',description:'B'})).status,409)
  assert.equal(await readFile(join(state,'source','team.json'),'utf8'),before);assert.ok(await readTeam(state,result.team.id))
  const renamed=structuredClone(result.team);renamed.description='new target';assert.notEqual(workflowFingerprint(renamed),result.base)
})


test('first model-authored nodes require both layers while legacy operations remain compatible',()=>{
  const op={action:'add_task',subject:'Implement',dependencies:[]}
  assert.throws(()=>requireGeneratedTaskLayers([op]),/layers/)
  assert.throws(()=>requireGeneratedTaskLayers([{...op,layers:{general:emptyBrief(),specific:general}}]),/layers/)
  const layers={general,specific:{requirements:'Implement B',deliverables:'B.cpp',acceptance:'B tests'}}
  assert.doesNotThrow(()=>requireGeneratedTaskLayers([{...op,layers}]))
  assert.doesNotThrow(()=>requireGeneratedTaskLayers([{action:'update_task',id:'t1',description:'legacy'}]))
  const fields=reviewFields(team(),{...op,layers,description:taskText({layers})}).fields
  assert.ok(!fields.some(f=>f.key==='description'))
  assert.equal(fields.filter(f=>f.key.startsWith('layers.')).length,6)
})

test('inline plans normalize layered contracts and keep old profiles readable',()=>{
  const layers={general,specific:{requirements:'Implement B',deliverables:'B.cpp',acceptance:'B tests'}}
  const profile=resolveTeamProfile({demo:{members:[{name:'worker'}],tasks:[{id:'build',subject:'Build',assignee:'worker',layers}]}},'demo',8)
  assert.deepEqual(profile.tasks[0].layers,layers)
})

test('one-click split permits only replacing the same editable task layers',()=>{
 const source=team().tasks[0];source.description='Implement B';delete source.layers
 assert.equal(taskSplitBlock(source),undefined)
 for(const status of ['completed','in_progress','claimed'])assert.ok(taskSplitBlock({...source,status}))
 assert.ok(taskSplitBlock({...source,description:''}))
 const op={action:'update_task',id:source.id,layers:{general,specific:{requirements:'B',deliverables:'B.cpp',acceptance:'B tests'}}}
 assert.doesNotThrow(()=>validateTaskSplit(source.id,[op]))
 for(const ops of [[{...op,id:'different'}],[{...op,action:'add_task'}],[{...op,subject:'rename'}],[{...op,confirmConfiguration:true}],[op,op]])assert.throws(()=>validateTaskSplit(source.id,ops),/只能/)
 assert.throws(()=>validateTaskSplit(source.id,[{...op,layers:{general:emptyBrief(),specific:general}}]),/同时填写/)
})

test('execution renders only the standalone specific layer and legacy layers require confirmation',()=>{
 const legacy={layers:{general:{requirements:'GENERAL_ONLY_SENTINEL',deliverables:'Reusable outputs',acceptance:'Reusable gate'},specific:{requirements:'Implement B using confirmed spec',deliverables:'B.cpp and tests',acceptance:'Independent B checks'}},description:'stale combined description'}
 assert.ok(taskNeedsConfiguration(legacy))
 const task={...legacy,specificContractVersion:1}
 assert.equal(taskNeedsConfiguration(task),false)
 assert.equal(taskText(task),'Implement B using confirmed spec\n\n交付物：\nB.cpp and tests\n\n验收要求：\nIndependent B checks')
 assert.ok(!taskText(task).includes('GENERAL_ONLY_SENTINEL'))
 assert.equal(taskText({description:'Legacy single task'}),'Legacy single task')
 const portable=templateSeed({...team(),tasks:[{...team().tasks[0],...task}]})
 assert.equal(portable.tasks[0].general.requirements,'GENERAL_ONLY_SENTINEL')
 assert.ok(!JSON.stringify(portable).includes('B.cpp'))
})

test('saved old contracts and changed team goals require explicit review before execution',async t=>{
 const root=await mkdtemp(join(tmpdir(),'specific-migration-'));t.after(()=>rm(root,{recursive:true,force:true}))
 let current=applyWorkflowOperations(team(),adaptation(team()))
 await createTeamDir(root,current)
 assert.ok(!(await readTeam(root,current.id)).tasks[0].workflowConfigPending)
 current.description='A different target'
 await writeFile(join(root,current.id,'team.json'),JSON.stringify(current))
 let loaded=await readTeam(root,current.id);assert.ok(loaded.tasks.every(task=>task.workflowConfigPending))
 loaded=applyWorkflowOperations(loaded,loaded.tasks.map(task=>({action:'update_task',id:task.id,confirmConfiguration:true})))
 assert.ok(loaded.tasks.every(task=>task.specificSourceGoal==='A different target' && !taskNeedsConfiguration(task)))
 delete loaded.tasks[0].specificContractVersion
 await writeFile(join(root,current.id,'team.json'),JSON.stringify(loaded))
 assert.ok((await readTeam(root,current.id)).tasks[0].workflowConfigPending)
})

test('built-in starter workflows are complete, immutable and copy into personal templates',async t=>{
 const root=await mkdtemp(join(tmpdir(),'builtin-copy-'));t.after(()=>rm(root,{recursive:true,force:true}))
 const catalog=builtinTemplates();assert.equal(catalog.length,3)
 for(const item of catalog){
  assert.deepEqual(parseTemplate(item).tasks,item.tasks)
  assert.ok(item.tasks.every(task=>Object.values(task.general).every(text=>text.trim())))
  assert.equal(item.tasks.filter(task=>task.checkpoint).length,2)
  const instance=instantiateTemplate(item,'instance','captain','New goal','User task')
  assert.deepEqual(instance.tasks.map(task=>task.id),item.tasks.map(task=>task.id))
  assert.ok(instance.tasks.every(task=>task.workflowConfigPending && task.layers.specific.requirements===''))
  validateAdaptation(instance,adaptation(instance))
  const copy=await saveTemplate(root,item);assert.notEqual(copy.id,item.id)
  await assert.rejects(()=>saveTemplate(root,item,{id:item.id,version:1}),/只读/)
  await assert.rejects(()=>deleteTemplate(root,item.id,1),/不能删除/)
  assert.throws(()=>getBuiltinTemplate(item.id,item.version+1),/版本不存在/)
 }
 catalog[0].tasks[0].general.requirements='mutated'
 assert.notEqual(getBuiltinTemplate(catalog[0].id).tasks[0].general.requirements,'mutated')
 assert.equal((await listTemplates(root)).templates.length,3)
})

test('feature template v2 preserves classic v1 and leaves other built-ins unchanged',()=>{
 const previous=JSON.parse(readFileSync(new URL('./fixtures/snapshots/builtin-templates-v1.json',import.meta.url),'utf8'))
 for(const item of previous)assert.deepEqual(getBuiltinTemplate(item.id,1),item)
 assert.equal(getBuiltinTemplate('builtin-feature').version,2)
 assert.equal(getBuiltinTemplate('builtin-feature').tasks.length,9)
 for(const id of ['builtin-bugfix','builtin-operator'])assert.deepEqual(getBuiltinTemplate(id),previous.find(item=>item.id===id))
})
