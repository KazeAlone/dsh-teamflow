import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { mkdtemp, writeFile, mkdir, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { Readable } from 'node:stream'
import { parseTemplate, templateSeed, extractedTemplate, instantiateTemplate, templateTopology, validateAdaptation } from '../lib/templates.js'
import { listTemplates, getTemplate, saveTemplate, deleteTemplate } from '../lib/template-store.js'
import { builtinTemplates, getBuiltinTemplate } from '../lib/builtin-templates.js'
import { resolveTeamProfile } from '../lib/profiles.js'
import { taskText, taskNeedsConfiguration } from '../lib/task-description.js'
import { applyWorkflowOperations, workflowFingerprint, checkpointReady, parseWorkflowOperations } from '../lib/workflow.js'
import { isTeamTask, createTeamDir, readTeam, writeTeam } from '../lib/state.js'
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
const adaptation=t=>t.tasks.map(task=>({action:'update_task',id:task.id,description:`本次处理算子 B：${task.subject}。交付 B 的实现，验收 B 的正确性。`,adaptationIssue:'',confirmConfiguration:true}))

test('export and instantiation keep structure but never reuse execution/session/route data',()=>{
  const source=team();Object.assign(source.tasks[0],{output:'A secret result',attempt:5,status:'completed',attemptId:'old',changedPaths:['A.cpp']});Object.assign(source.members[0],{id:'old-session',provider:'old-provider',specificPrompt:'A ONLY'});source.workflow.discussions={};
  source.workflow.positions['task:deleted']={x:12,y:12};source.members[0].status='removed';
  const saved=templateSeed(source),fresh=instantiateTemplate({...saved,...template()},'b','new-captain','B','B goal')
  assert.equal(templateTopology(saved),templateTopology(definition()))
  assert.ok(!JSON.stringify(saved).includes('A secret'));assert.ok(!JSON.stringify(saved).includes('old-session'));assert.ok(!JSON.stringify(saved).includes('old-provider'));assert.ok(!JSON.stringify(saved).includes('A ONLY'))
  assert.equal(fresh.tasks[0].output,undefined);assert.equal(fresh.tasks[0].attempt,0);assert.equal(fresh.members[0].id,'');assert.equal(fresh.phase,'staged');assert.equal(fresh.tasks[1].checkpoint.decision,undefined)
  assert.ok(fresh.tasks.every(t=>t.workflowConfigPending));assert.equal(fresh.tasks[0].description,'');assert.ok(isWorkflowState(fresh.workflow));assert.ok(fresh.tasks.every(isTeamTask))
  fresh.workflow.templateDefinition.tasks[0].general.requirements='changed';assert.equal(template().tasks[0].general.requirements,general.requirements);assert.equal(saved.tasks[0].general.requirements,'')
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
  const changed=structuredClone(ops);changed[0].general='skip tests';assert.throws(()=>validateAdaptation(current,changed),/描述/)
  const ready=applyWorkflowOperations(current,ops);assert.ok(ready.tasks.every(t=>!taskNeedsConfiguration(t)))
  const incomplete=applyWorkflowOperations(ready,[{action:'update_task',id:'t1',description:''}]);assert.equal(incomplete.tasks[0].workflowConfigPending,true)
  assert.ok(!taskText(ready.tasks[0]).includes('通用任务'));assert.match(taskText(ready.tasks[0]),/算子 B/)
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
  const messages=[]
  let title;const renames=[]
  const captain={id:'captain',followup:message=>messages.push(message),options:{provider:'fixture',model:'test'},session:{header:{cwd:workspace},requestHeader:()=>undefined,ownEvents:()=>[]}}
  const ctx={get:key=>key==='sessionTitle'?{get:()=>title,rename:(_session,name)=>{renames.push(name);title={title:name,source:{kind:'user'}}}}:undefined,agents:{get:id=>id==='captain'?captain:undefined},llm:{resolveCallConfig:async v=>v},effect:fn=>fn()};let route
  installWorkflowWorkbench(ctx,{stateDir:'.agent-teams',templateDirectory:library,maxMembers:8},{},{register:r=>{route=r;return()=>{}}})
  async function call(action,fields={}){const req=Readable.from([JSON.stringify({sessionId:'captain',action,...fields})]);req.method='POST';let status,value;await route.handler(req,{writeHead:s=>{status=s},end:v=>{value=JSON.parse(v)}});return {status,...value}}
  assert.equal((await call('template_list')).templates.length,4)
  assert.equal(messages.length,0,'Browsing must leave the captain blank')
  assert.equal((await call('template_apply',{templateId:template.id,version:999,name:'Invalid',description:'B'})).status,409)
  assert.equal(messages.length,0,'Rejected template use must not start a conversation')
  assert.equal(renames.length,0)
  const result=await call('template_apply',{templateId:template.id,version:1,name:'B',description:'实现 B'});assert.equal(result.status,200,result.error);assert.equal(result.activity.teamId,result.team.id);assert.equal(result.activity.captainSessionId,'captain');assert.equal(result.activity.phase,'staged');assert.equal(result.team.phase,'staged');assert.ok(result.team.tasks.every(t=>t.workflowConfigPending));assert.equal(result.team.members[0].model,'test')
  assert.equal((await call('template_apply',{templateId:template.id,version:1,name:'duplicate',description:'B'})).status,409)
  assert.equal(messages.length,1,'Successful application starts exactly one captain turn; duplicate requests do not')
  assert.equal(messages[0].source.kind,'user')
  assert.ok(messages[0].content[0].text.includes(template.name))
  assert.ok(messages[0].content[0].text.includes('实现 B'))
  assert.ok(messages[0].content[0].text.includes(result.team.id))
  assert.deepEqual(renames,['B'],'Template name immediately titles the captain once')
  title=undefined;await call('state',{teamId:result.team.id})
  assert.equal(title.title,'B','Opening an older untitled template repairs its title')
  title={title:'My custom title',source:{kind:'user'}};await call('state',{teamId:result.team.id})
  assert.equal(title.title,'My custom title','Existing custom titles remain intact')
  assert.equal(await readFile(join(state,'source','team.json'),'utf8'),before);assert.ok(await readTeam(state,result.team.id))
  const renamed=structuredClone(result.team);renamed.description='new target';assert.notEqual(workflowFingerprint(renamed),result.base)

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
  assert.ok(instance.tasks.every(task=>task.workflowConfigPending && task.description==='' && !task.layers))
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


test('authenticated global library works without a session but execution still requires one',async t=>{
 const root=await mkdtemp(join(tmpdir(),'global-gallery-'));t.after(()=>rm(root,{recursive:true,force:true}))
 const {authenticatedWebRoutes}=await import('../lib/web-routes.js')
 let route,rejection,pickerKind;const ctx={get:()=>({capability:()=>({kind:pickerKind})}),effect:fn=>fn(),agents:{get:()=>undefined}}
 installWorkflowWorkbench(ctx,{stateDir:'.agent-teams',templateDirectory:root,maxMembers:8},{},authenticatedWebRoutes({register(value){route=value;return()=>{}}},()=>({requestRejection:()=>rejection})))
 const request=async body=>{let status,result;const req=Readable.from([JSON.stringify(body)]);req.method='POST';req.headers={};await route.handler(req,{writeHead:code=>status=code,end:value=>result=JSON.parse(value)});return{status,...result}}
 rejection=401;assert.equal((await request({action:'template_list'})).status,401)
 assert.equal((await request({action:'launcher_context'})).status,401)
 rejection=undefined;for(const kind of ['native','browse','other']){pickerKind=kind;assert.equal((await request({action:'launcher_context'})).directoryPicker,kind==='other'?'unavailable':kind)}
 const listed=await request({action:'template_list'});assert.equal(listed.status,200);assert.ok(listed.templates.length>=3);assert.equal(listed.context,'')
 const saved=await request({action:'template_save',definition:definition()});assert.equal(saved.status,200)
 assert.equal((await request({action:'template_apply',templateId:saved.template.id,version:1,name:'Flow',description:'Goal'})).status,409)
 assert.equal((await request({action:'template_delete',templateId:saved.template.id,version:1})).status,200)
})

test('Gallery switches remain independent through templates, AI extraction and instance edits', () => {
  const input = template()
  Object.assign(input.members[0], { gallerySkill: true, galleryMcp: false })
  const instance = instantiateTemplate(input, 'new-team', 'captain', 'Run', 'Goal')
  assert.equal(instance.members[0].gallerySkill, true)
  assert.equal(instance.members[0].galleryMcp, false)
  assert.equal(team().members[0].galleryMcp, undefined)
  const extraction = definition()
  Object.assign(extraction.members[0], { gallerySkill: false, galleryMcp: true })
  assert.deepEqual(extractedTemplate(instance, extraction).members, input.members)
  const operations = parseWorkflowOperations([{ action: 'update_member', name: 'worker', galleryMcp: true }])
  const updated = applyWorkflowOperations(instance, operations)
  assert.equal(updated.members[0].gallerySkill, true)
  assert.equal(updated.members[0].galleryMcp, true)
  assert.throws(() => parseWorkflowOperations([{ action: 'update_member', name: 'worker', gallerySkill: 'false' }]), /布尔值/)
})
