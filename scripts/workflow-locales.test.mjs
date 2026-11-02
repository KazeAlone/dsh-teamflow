import test from 'node:test';
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import { readFileSync } from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { zh, en } from '../lib/client/locales.js';
import { workflowEnglish } from '../lib/client/workflow-messages.js';
import { workflowText, workflowMessage, briefDisplay } from '../lib/client/workflow-text.js';
import { WorkflowLocale } from '../lib/client/workflow-i18n.js';
import { taskReadiness } from '../lib/client/task-readiness.js';
import { builtinTemplates } from '../lib/builtin-templates.js';
import { localizeBuiltinTemplate } from '../lib/builtin-template-locales.js';
import { instantiateTemplate } from '../lib/templates.js';
const hook=registerHooks({resolve(specifier,context,next){
 if(specifier.endsWith('.module.css'))return {url:'data:text/javascript,export default new Proxy({}, {get: (_, key) => key})',shortCircuit:true};
 return next(specifier,context);
}});
const {WorkflowContext,TaskRecord}=await import('../lib/client/WorkflowContext.js');
const {ProposalReview}=await import('../lib/client/ProposalReview.js');
const {TaskRerunImpact}=await import('../lib/client/TaskRerunPicker.js');
const {EmbeddedDiscussion}=await import('../lib/client/EmbeddedDiscussion.js');
hook.deregister();
const translate=dict=>(key,params={})=>dict[key]?.replace(/\{(\w+)\}/g,(_,name)=>String(params[name]))??key;
const layers={general:{requirements:'Reusable method',deliverables:'Evidence',acceptance:'Verified'},specific:{requirements:'Current contract',deliverables:'Files',acceptance:'Tests pass'}};
const team={id:'sample',name:'Sample',phase:'staged',captainSessionId:'captain',members:[{id:'',name:'builder',summary:'Build',status:'idle'}],tasks:[{id:'task',subject:'Implement',description:'Current contract with deliverables and acceptance criteria',dependencies:[],assignee:'builder',status:'pending',attempt:0}]};
const render=(Component,props,dict)=>renderToStaticMarkup(React.createElement(WorkflowLocale,{t:translate(dict)},React.createElement(Component,props)));
const text=html=>html.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
const surfaces=dict=>({
 context:text(render(WorkflowContext,{team,discussion:'graph'},dict)),
 proposal:text(render(ProposalReview,{team,proposal:{id:'proposal',base:'base',title:'Requirements',operations:[{action:'update_task',id:'task',description:'Updated execution contract'}]},base:'base',busy:false,onApply(){},onDismiss(){},onChange(){}},dict)),
 rerun:text(render(TaskRerunImpact,{tasks:[{...team.tasks[0],status:'completed'},{id:'review',subject:'Review',dependencies:['task'],status:'pending',checkpoint:{round:1}}],taskId:'task'},dict)),
 discussion:text(render(EmbeddedDiscussion,{sessionId:'captain',teamId:'sample',discussion:'graph'},dict)),
});
test('English workflow chrome has no Chinese leakage and the Chinese render remains independent',()=>{
 const actual={en:surfaces(en),zh:surfaces(zh)};
 assert.doesNotMatch(JSON.stringify(actual.en),/\p{Script=Han}/u);
 assert.match(actual.en.context,/Current contract with deliverables/);assert.match(actual.en.proposal,/Updated execution contract/);
 assert.doesNotMatch(actual.zh.context,/通用任务|本次任务 ·/);
 assert.deepEqual(Object.fromEntries(Object.entries(actual).map(([lang,value])=>[lang,{rerun:value.rerun,discussion:value.discussion}])),JSON.parse(readFileSync(new URL('./fixtures/snapshots/workflow-locales.json',import.meta.url),'utf8')));
});
test('task and draft content remain unchanged while labels follow language',()=>{
 const content='用户原文不能自动翻译 {0}';
 const html=render(TaskRecord,{team,task:{...team.tasks[0],description:content}},en);
 assert.match(html,/Inputs from/);assert.ok(html.includes(content));
 assert.equal(briefDisplay({...layers.general,requirements:content},workflowText(translate(en))),content+'\n\nDeliverables:\nEvidence\n\nAcceptance criteria:\nVerified');
});
test('feedback translates at display time without losing dynamic values',()=>{
 const english=workflowText(translate(en)),chinese=workflowText(translate(zh));
 const old='已保存「用户模板 {0}」v2';
 assert.equal(workflowMessage(old,english),'Saved “用户模板 {0}” v2');
 assert.equal(workflowMessage('Saved “用户模板 {0}” v2',chinese),old);
 assert.equal(workflowMessage('Unexpected provider error: detail',english),'Unexpected provider error: detail');
});
test('all workflow message placeholders have matching English arguments',()=>{
 for(const [source,target] of Object.entries(workflowEnglish)){
  const placeholders=s=>[...s.matchAll(/\{\d+\}/g)].map(m=>m[0]).sort();
  assert.deepEqual(placeholders(target),placeholders(source),source);assert.doesNotMatch(target,/\p{Script=Han}/u,source);
 }
});
test('built-ins translate both ways without mutating identities, structure or personal content',()=>{
 const originals=builtinTemplates();for(const item of originals){const english=localizeBuiltinTemplate(item,'en');
  assert.doesNotMatch(JSON.stringify(english),/\p{Script=Han}/u);assert.deepEqual(localizeBuiltinTemplate(english,'zh'),item);
  assert.deepEqual(english.tasks.map(({id,dependencies,assignee})=>({id,dependencies,assignee})),item.tasks.map(({id,dependencies,assignee})=>({id,dependencies,assignee})));
  const instance=instantiateTemplate(english,'instance','captain','User name','User goal');assert.equal(instance.tasks[0].subject,english.tasks[0].subject);
  const readiness=taskReadiness(instance,instance.tasks[0],workflowText(translate(en)));assert.equal(readiness.label,'Needs configuration');assert.doesNotMatch(readiness.detail,/older task/);
 }
 assert.deepEqual(builtinTemplates(),originals);
 const personal={...originals[0],id:'personal-template'};assert.equal(localizeBuiltinTemplate(personal,'en'),personal);
});
