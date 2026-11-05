import {resumeRerunPath,resetTaskForRerun} from '../lib/task-rerun.js';
import { builtinTemplates, getBuiltinTemplate } from '../lib/builtin-templates.js';
import { localizeBuiltinTemplate } from '../lib/builtin-template-locales.js';
import { templateSeed, instantiateTemplate } from '../lib/templates.js';
/** Local interaction fixture: real React workbench and workflow reducer; simulated execution/model. */
import { createServer } from 'node:http';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { build } from 'tsdown';
import { applyWorkflowProposal, checkpointReady, decideCheckpoint, proposeWorkflow, workflowFingerprint, workflowState } from '../lib/workflow.js';
import { workflowMaterials } from '../lib/workflow-runtime.js';
import { prepareArchivedWorkflow } from '../lib/workflow-lifecycle.js';
import { assembleTeamSnapshot } from '../lib/snapshot.js';
import { flowControlVersion } from '../lib/client/task-control.js';

const port = Number(process.env.TEAMFLOW_PREVIEW_PORT ?? 8371);
const directory = resolve('node_modules/workflow-ui');
mkdirSync(directory, { recursive: true });
writeFileSync(directory + '/entry.tsx', `import React from 'react';
import { createRoot } from 'react-dom/client';
import { WorkflowWorkbench } from '../../lib/client/WorkflowWorkbench.js';
import { TeamSection } from '../../lib/client/ActivityPanel.js';
import { ActivitySurface } from '../../lib/client/WorkspaceActivity.js';
import { TeamChatEntry } from '../../lib/client/TeamChatEntry.js';
import { AgentTeamsSummary } from '../../lib/client/AgentTeamsCard.js';
import { createWorkspaceState } from '../../lib/client/workspace-state.js';
import { zh, en } from '../../lib/client/locales.js';
import { WorkflowHistory } from '../../lib/client/WorkflowHistory.js';
import { getActivitySnapshotsSnapshot, subscribeActivitySnapshots, publishWorkflowActivity } from '../../lib/client/activity-monitor.js';
const snapshot = { groups: [{ id: 'fixture', name: '测试提供方', models: [{ id: '模拟模型', name: '模拟模型', reasoning: { efforts: [{ id: 'low', name: 'Low' }, { id: 'high', name: 'High' }], defaultEffort: 'low' } }, { id: '模拟模型 B', name: '模拟模型 B', reasoning: { efforts: [{ id: 'low', name: 'Low' }, { id: 'high', name: 'High' }], defaultEffort: 'low' } }] }], failures: [], status: 'ready', current: null, pending: null, error: null };
const modelDirectory = { store: { subscribe: () => () => {}, getSnapshot: () => snapshot }, load: async () => {} } as any;
const activityState=createWorkspaceState();
const selectedPreview=${JSON.stringify(process.env.TEAMFLOW_PREVIEW_ACTIVITY_DISCUSSION?'session-at-discussion-preview-adapt':'preview')};
const sessionSnapshot={current:selectedPreview,byId:{[selectedPreview]:{id:selectedPreview}}};
const sessionStore={subscribe:()=>()=>{},getSnapshot:()=>sessionSnapshot} as any;
const modelDirectories={directoryFor:()=>modelDirectory} as any;

const example = { workspace: '', teamId: 'preview', name: '活动面板示例', captainSessionId: 'preview', phase: 'running', workflowEnabled: true, messageCount: 0, captainInbox: [], members: [{ id: '', name: 'researcher', role: '需求分析师', provider: 'fixture', model: '模拟模型', activity: 'idle', progress: 0, done: 0, total: 1, currentTask: '', unread: 0 }], tasks: [{ id:'t1', subject:'需求调研', assignee:'researcher', status:'pending', state:'open', dependencies:[], depth:0 }] } as any;
const archived = {...example,name:'6/7 人工验收归档恢复示例',workflowEnabled:true,tasks:[...Array.from({length:6},(_,i)=>({id:'t'+(i+1),subject:'已完成成果 '+(i+1),status:'completed',state:'completed',assignee:'researcher',dependencies:[],depth:0})),{id:'t7',subject:'人工检查',status:'pending',state:'open',assignee:'',dependencies:['t1','t2','t3','t4','t5','t6'],depth:1,checkpoint:{round:1,history:[]}}]} as any;
function Preview({language}:{language:string}) {const t = ((key: string, values: Record<string, unknown> = {}) => ((language==='en'?en:zh) as Record<string, string>)[key]?.replace(/\\{(\\w+)\\}/g, (_, name) => String(values[name])) ?? key) as any;const snapshots=React.useSyncExternalStore(subscribeActivitySnapshots,getActivitySnapshotsSnapshot);const restored=snapshots.teams.find(team=>team.teamId==='preview');
  React.useEffect(()=>{if(${Boolean(process.env.TEAMFLOW_PREVIEW_DEPENDENCIES)}) void fetch('/plugins/dsh-agent-teams/workflow',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({action:'state',sessionId:'preview',teamId:'preview'})}).then(res=>res.json()).then(value=>publishWorkflowActivity(value.activity));},[]);
  if(${Boolean(process.env.TEAMFLOW_PREVIEW_ACTIVITY)}) return <><main data-phase="active" style={{minHeight:500}}><header><h3>当前团队对话</h3><TeamChatEntry sessionId={'preview' as any} t={t} openMember={()=>{}}/></header><p>团队已建立。右上角的小圆点可直接打开流程画布。</p>{restored && <AgentTeamsSummary data={{teamId:restored.teamId,teamName:restored.name,captainSessionId:'preview',members:restored.members}} sessionId="preview" openMember={()=>{}} t={t}/>}</main><div data-shell-overlay style={{position:'fixed',inset:0,pointerEvents:'none'}}><div style={{pointerEvents:'auto'}}><ActivitySurface state={activityState} sessionsList={sessionStore} modelDirectories={modelDirectories} openMember={()=>{}} t={t}/></div></div></>;
  if(${Boolean(process.env.TEAMFLOW_PREVIEW_DEPENDENCIES)}) return restored ? <TeamSection team={restored} workspace={!${Boolean(process.env.TEAMFLOW_PREVIEW_COMPACT)}} modelDirectory={modelDirectory} t={t} onNavigate={()=>{}}/> : <p>正在加载依赖图…</p>;
  if(${Boolean(process.env.TEAMFLOW_PREVIEW_ARCHIVED)}) return <><WorkflowWorkbench sessionId="preview" teamId="preview" archived={!restored} embeddedContext modelDirectory={modelDirectory} t={t}/><TeamSection team={restored??archived} workspace historic={!restored} modelDirectory={modelDirectory} onNavigate={()=>{}} t={t}/></>;
  return <><WorkflowWorkbench sessionId="preview" embeddedContext modelDirectory={modelDirectory} t={t} teamId={location.search.includes('blank') ? undefined : 'preview'} waitingCount={location.search.includes('blank') ? 0 : 1} /><TeamSection team={example} workspace modelDirectory={modelDirectory} onNavigate={() => {}} t={t} /></>}
function LocalePreview(){const [language,setLanguage]=React.useState('zh');return <><select aria-label="Preview language" style={{position:'fixed',right:12,top:8,zIndex:2147483647}} value={language} onChange={event=>setLanguage(event.target.value)}><option value="zh">中文</option><option value="en">English</option></select><Preview language={language}/></>}
createRoot(document.getElementById('root')!).render(<LocalePreview/>);`);
writeFileSync(directory + '/config.mjs', `import base from '../../tsdown.config.ts';
const previewMenu = { name: 'preview-menu', resolveId(id) { if (id === '@deepseek-ai/dsh-client-ui-primitives') return '\\0preview-menu'; }, load(id) { if (id === '\\0preview-menu') return \`import React from 'react'; export function Modal() { return null; } export function Menu({anchor,open,items,onSelect}) { return React.createElement('div', null, anchor, open && React.createElement('div', {role:'menu'}, items.map(item => item.label && React.createElement('button',{key:item.id,type:'button',role:'menuitem',disabled:item.disabled,onClick:()=>onSelect(item.id)},item.label)))); }\`; } };
export default { ...base, plugins:[previewMenu, ...base.plugins], name:'workflow-preview', entry:[${JSON.stringify(directory + '/entry.tsx')}], outDir:${JSON.stringify(directory)}, format:'iife', sourcemap:false, deps:{alwaysBundle:()=>true}, outputOptions:{entryFileNames:'app.js'} };`);
await build({ config: directory + '/config.mjs' });
let team = {
  id: 'preview', name: '长链路协作 · 人工验收示例', captainSessionId: 'preview', description: '完成需求调研，通过人工检查后实现与发布。', phase: process.env.TEAMFLOW_PREVIEW_STAGED ? 'staged' : 'running', taskSeq: 3, createdAt: 1,
  members: [{ id: '', name: 'researcher', summary: '梳理需求与风险，交付调研报告。', role: '需求分析师', executionPrompt: '核对证据并注明不确定项。', provider: 'fixture', model: '模拟模型', joinedAt: 1, status: 'idle' }, { id: '', name: 'developer', summary: '实现已确认方案，交付代码和测试结果。', role: '工程实现', provider: 'fixture', model: '模拟模型', joinedAt: 1, status: 'idle' }],
  tasks: [
    { id: 't1', subject: '需求调研', description: '明确范围、风险与验收标准', assignee: 'researcher', dependencies: [], status: 'completed', output: '已整理三项需求：成员职责可调整、画布编排、人工审批。需要确认返工边界。', attempt: 1, createdAt: 1, updatedAt: 1 },
    { id: 't2', subject: '需求人工验收', description: '共同确认需求与验收标准', dependencies: ['t1'], status: 'pending', checkpoint: { round: 1, history: [] }, attempt: 0, createdAt: 1, updatedAt: 1 },
    { id: 't3', subject: '开发与自测', description: '仅在需求通过后执行', assignee: 'developer', dependencies: ['t2'], status: 'pending', attempt: 0, createdAt: 1, updatedAt: 1 },
  ],
};
if(process.env.TEAMFLOW_PREVIEW_ACTIVITY_DISCUSSION)team=instantiateTemplate(getBuiltinTemplate('builtin-feature'),'preview','preview','模板适配中的团队','实现本次功能');
if(process.env.TEAMFLOW_PREVIEW_ARCHIVED) {
  team.name='6/7 人工验收归档恢复示例';team.phase='running';team.taskSeq=7
  team.tasks=[...Array.from({length:6},(_,i)=>({id:'t'+(i+1),subject:'已完成成果 '+(i+1),assignee:'researcher',dependencies:[],status:'completed',output:'第 '+(i+1)+' 项成果已提交。',attempt:1,createdAt:1,updatedAt:1})),{id:'t7',subject:'人工检查',description:'核对六项成果并由用户批准。',dependencies:['t1','t2','t3','t4','t5','t6'],status:'pending',checkpoint:{round:1,history:[]},attempt:0,createdAt:1,updatedAt:1}]
  team.members.forEach(member=>{member.status='removed'});workflowState(team)
}
if (process.env.TEAMFLOW_PREVIEW_RERUN) {
  decideCheckpoint(team,'t2','approve','fixture','fixture','模拟已通过')
  Object.assign(team.tasks[2],{status:'completed',attempt:1,output:'模拟已完成的实现结果'})
  team.tasks.push({id:'t4',subject:'独立文档整理',assignee:'developer',dependencies:[],status:'completed',attempt:1,output:'独立分支结果保持不变',createdAt:1,updatedAt:1}); team.taskSeq=4
}
if (process.env.TEAMFLOW_PREVIEW_CANCELLED) {
  Object.assign(team.tasks[0], { status: 'cancelled', output: '用户取消了上一轮任务；保留需求草稿。' })
}
if(process.env.TEAMFLOW_PREVIEW_RERUN_PATH){for(const task of team.tasks.slice(0,3))resetTaskForRerun(task,true,Date.now());team.tasks.push({id:'sibling',subject:'其他待重跑分支',assignee:'developer',dependencies:['t1'],status:'pending',workflowPaused:true,workflowRerunRequired:true,attempt:1,createdAt:1,updatedAt:1});}
if (process.env.TEAMFLOW_PREVIEW_RUNNING) {
  team.tasks.push({id:'t4',subject:'运行中的独立任务',assignee:'developer',dependencies:[],status:'in_progress',attempt:1,attemptId:'preview-running',createdAt:1,updatedAt:1})
  team.taskSeq=4
}
if (process.env.TEAMFLOW_PREVIEW_STATES) {
  const variants = [
    {subject:'等待明确开始',workflowPaused:true,workflowAwaitingStart:true},
    {subject:'人工暂停的任务',workflowPaused:true,workflowAwaitingStart:false},
    {subject:'需要补充配置',workflowConfigPending:true,workflowPaused:true},
    {subject:'失败后待修改',status:'failed',output:'上次检查发现验收遗漏。'},
    {subject:'等待确认返工',workflowRerunRequired:true,workflowPaused:true},
  ];
  for (const item of variants) team.tasks.push({id:'t'+(++team.taskSeq),assignee:'researcher',status:'pending',dependencies:[],attempt:0,createdAt:1,updatedAt:1,...item});
}
if (process.env.TEAMFLOW_PREVIEW_DISCUSSION && !process.env.TEAMFLOW_PREVIEW_ARCHIVED && !process.env.TEAMFLOW_PREVIEW_ACTIVITY_DISCUSSION) {
  const key = 'member:researcher'
  workflowState(team).discussions[`discussion:${key}`] = { key, messages: [], calls: [], proposal: proposeWorkflow(team, '调整研究成员职责', [{ action: 'update_member', name: 'researcher', summary: '整理需求并明确每项验收标准。', role: '需求与验收分析师' }]) }
}
if (process.env.TEAMFLOW_PREVIEW_ISSUES) {
  team.tasks.forEach(task => { task.status='pending'; task.attempt=0; delete task.output; task.workflowConfigPending=true; task.description='请根据本次需求补充任务要求。' })
  team.tasks[2].adaptationIssue='请确认目标平台及验收阈值。'
  const operations=team.tasks.map(task=>({action:'update_task',id:task.id,description:task.description,confirmConfiguration:!task.adaptationIssue}))
  workflowState(team).discussions['discussion:adapt']={key:'adapt',messages:[],calls:[],proposal:proposeWorkflow(team,'确认本次任务',operations)}
}
let galleryBlank = Boolean(process.env.TEAMFLOW_PREVIEW_GALLERY);
const sample = templateSeed(team);sample.name='需求到交付';sample.description='从需求分析到实现验证，保留人工验收。';sample.tags=['研发','人工验收'];sample.tasks.forEach(t=>t.general={requirements:'完成'+t.subject+'，依据本次目标确定范围',deliverables:'可复核的工作成果',acceptance:'满足已确认的需求与质量标准'});
let library=[{...sample,id:'11111111-1111-4111-8111-111111111111',version:1,createdAt:Date.now(),updatedAt:Date.now()}];
const send = (res, status, value) => { res.writeHead(status, { 'content-type': 'application/json' }); res.end(JSON.stringify(value)); };
const transcripts = new Map();
// Standalone fixture supplies the semantic tokens normally provided by Harness.
const previewTheme = `:root { --dsw-alias-bg-base:light-dark(#f6f7f9,#181a1e); --dsw-alias-bg-layer-1:light-dark(#fff,#24272c); --dsw-alias-bg-module-platform:var(--dsw-alias-bg-layer-1); --dsw-alias-border-l2:light-dark(#d7dce3,#4b515c); --dsw-alias-border-l3:light-dark(#bac2cf,#626b78); --dsw-alias-label-primary:light-dark(#26303d,#e3e6ec); --dsw-alias-label-secondary:light-dark(#526075,#bac3d1); --dsw-alias-label-tertiary:light-dark(#69758a,#a3aec0); --dsw-alias-label-primary-inverted:light-dark(#fff,#181a1e); --dsw-alias-state-business-primary:light-dark(#3269d1,#83a9ff); --dsw-alias-state-warn-primary:light-dark(#a67722,#e5b856); --dsw-alias-state-success-primary:light-dark(#2c8a68,#78d5ab); --dsw-alias-state-error-primary:light-dark(#be4848,#f48d8d); --dsw-alias-interactive-bg-hover:light-dark(#edf2fa,#313944); }`;
function previewMessages(key) {
  if (!transcripts.has(key)) {
    const task=key.startsWith('task:') && team.tasks.find(task=>task.id===key.slice(5));
    transcripts.set(key,[{id:'1',role:'assistant',text:task ? `这是任务讨论的模拟回复。当前任务：${task.subject}；已保存要求：${task.description || '尚未填写'}。可以讨论要求、上下游或已有结果，修改需确认后生效。` : `这是 ${key} 独立讨论的模拟回复。你希望重点调整什么？`}]);
  }
  return transcripts.get(key);
}
createServer(async (req, res) => {
  if (req.url === '/app.js') { res.writeHead(200, { 'content-type': 'text/javascript' }); res.end(readFileSync(directory + '/app.js')); return; }
  if(req.method==='GET' && req.url?.startsWith('/plugins/dsh-agent-teams/state')) { send(res,200,{teams:req.url.includes('archived=1')?[]:[await assembleTeamSnapshot({agents:{get(){}}},resolve('node_modules/workflow-preview-state'),'测试',team)]});return; }
  if (req.method !== 'POST') { res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); res.end('<!doctype html><html lang="zh" style="color-scheme:' + (req.url.includes('dark') ? 'dark' : 'light') + '"><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>AgentTeams 工作台交互验证</title><style>'+previewTheme+'</style></head><body style="font-family:system-ui;padding:30px;background:light-dark(#f6f7f9,#181a1e);color:light-dark(#26303d,#e3e6ec)"><h2>AgentTeams 工作台 · 开发预览</h2><p>本页使用实际界面代码，执行结果为模拟数据；原生讨论入口需要在 DSH 中使用。</p><div id="root"></div><script src="/app.js"></script></body></html>'); return; }
  try {
    let raw = ''; for await (const chunk of req) raw += chunk;
    const body = JSON.parse(raw), key = body.discussion || 'graph';
    const messages = previewMessages(key);
    if(body.action==='template_list'){send(res,200,{templates:[...builtinTemplates(),...library],warnings:[],context:'实现算子 B，验证正确性和性能。'});return}
    if(body.action==='template_seed'){send(res,200,{definition:templateSeed(team),base:workflowFingerprint(team)});return}
    if(body.action==='template_save'){const old=library.find(t=>t.id===body.templateId);const saved={...body.definition,id:old?.id??crypto.randomUUID(),version:(old?.version??0)+1,createdAt:Date.now(),updatedAt:Date.now()};library=library.filter(t=>t.id!==saved.id).concat(saved);send(res,200,{template:saved});return}
    if(body.action==='template_delete'){library=library.filter(t=>t.id!==body.templateId);send(res,200,{ok:true});return}
    if(body.action==='template_apply'){team=instantiateTemplate(body.templateId.startsWith('builtin-')?localizeBuiltinTemplate(getBuiltinTemplate(body.templateId,body.version),body.language==='en'?'en':'zh'):library.find(t=>t.id===body.templateId),'preview','preview',body.name,body.description);team.members.forEach(m=>Object.assign(m,{provider:'fixture',model:'模拟模型'}));galleryBlank=false}
    if(body.action==='state'&&galleryBlank){send(res,200,{team:null,ready:[],busy:[]});return}
    if(body.action==='create')galleryBlank=false;
    if (body.action === 'edit' && process.env.TEAMFLOW_PREVIEW_EDIT_DELAY_MS) await new Promise(resolve => setTimeout(resolve, Number(process.env.TEAMFLOW_PREVIEW_EDIT_DELAY_MS)));
    if (process.env.TEAMFLOW_PREVIEW_DISCUSSION && body.action === 'conversation_state') { send(res, 200, { messages, busy: false }); return; }
    if (process.env.TEAMFLOW_PREVIEW_DISCUSSION && body.action === 'conversation_send') { if (process.env.TEAMFLOW_PREVIEW_SEND_DELAY_MS) await new Promise(resolve => setTimeout(resolve, Number(process.env.TEAMFLOW_PREVIEW_SEND_DELAY_MS))); messages.push({ id: String(messages.length + 1), role: 'user', text: body.message }, { id: String(messages.length + 2), role: 'assistant', text: '这是模拟回复，正式环境将由独立 DSH 会话生成。' }); send(res, 200, { messages, busy: false }); return; }
    if (body.action === 'create') team = { id: 'preview', name: body.name, description: body.description, captainSessionId: 'preview', phase: 'staged', members: [], tasks: [], taskSeq: 0, createdAt: 1 };
    const state = workflowState(team), slot = `discussion:${key}`;
    if(body.action==='restore_archive') team=prepareArchivedWorkflow(team);
    const discussion = state.discussions[slot] ??= { key, messages: [], calls: [] };
    if (body.action === 'preview') discussion.proposal = proposeWorkflow(team, body.title, body.operations);
    const existingIds = new Set(team.tasks.map(task => task.id));
    if (body.action === 'edit') { if (body.base !== workflowFingerprint(team)) throw Error('团队已变化'); const oldIds = team.tasks.map(task => task.id); team = applyWorkflowProposal(team, proposeWorkflow(team, body.title, body.operations)); if (body.positions) { const layout = workflowState(team).positions; for (const [id, point] of Object.entries(body.positions)) if (team.tasks.some(task => task.id === id)) layout[`task:${id}`] = point; for (const task of team.tasks) if (!oldIds.includes(task.id)) { layout[`task:${task.id}`] = { x: 32, y: Math.max(0, ...Object.values(layout).map(point => point.y)) + 160 }; if (!task.checkpoint && team.phase !== 'staged') task.workflowPaused = true; } } }
    if (body.action === 'apply') {
      if (!discussion.proposal || discussion.proposal.id !== body.proposalId) throw new Error('提案已替换');
      const proposal = body.operations ? { ...discussion.proposal, suggestedOperations: discussion.proposal.operations, operations: body.operations } : discussion.proposal;
      team = applyWorkflowProposal(team, proposal);
    }
    if (['edit','apply'].includes(body.action) && team.phase !== 'staged') for (const task of team.tasks) if (!existingIds.has(task.id)) {task.workflowPaused=true;task.workflowAwaitingStart=true}
    if (body.action === 'set_flow_enabled') {
      if (body.version !== flowControlVersion(team) || typeof body.enabled !== 'boolean') throw Error('流程状态已变化');
      for (const task of team.tasks) {
        if (['completed','failed','cancelled'].includes(task.status) || task.checkpoint?.decision || task.workflowConfigPending || task.workflowRerunRequired) continue;
        if (body.enabled ? !task.workflowPaused : task.workflowPaused && !['claimed','in_progress'].includes(task.status)) continue;
        task.workflowPaused=!body.enabled;task.workflowAwaitingStart=false;task.updatedAt=Date.now();
        if (!body.enabled) task.status='pending';
      }
    }
    if(body.action==='resume_rerun_path'){if(body.base!==workflowFingerprint(team))throw Error('团队已变化，请刷新节点后重新确认');resumeRerunPath(team,body.taskId);}
    if (body.action === 'resume_task') {
      const task=team.tasks.find(task=>task.id===body.taskId)
      if(task?.workflowConfigPending) throw Error('请先填写任务／验收要求并完成节点配置')
      if(!task?.workflowPaused || task.status!=='pending') throw Error('节点没有挂起')
      if(task.workflowRerunRequired && task.dependencies.some(id=>team.tasks.find(item=>item.id===id)?.status!=='completed')) throw Error('请先等待所有上游任务完成')
      task.workflowPaused=false;task.workflowRerunRequired=false;task.workflowAwaitingStart=false
    }
    if (body.action === 'stop_task' || body.action === 'set_task_enabled') {
      const task=team.tasks.find(task=>task.id===body.taskId);
      if(!task || body.action==='set_task_enabled' && (task.updatedAt!==body.updatedAt || typeof body.enabled!=='boolean')) throw Error('节点状态已变化，请刷新后重试');
      if(['completed','failed','cancelled'].includes(task.status) || task.checkpoint?.decision || task.workflowConfigPending || task.workflowRerunRequired) throw Error('请在节点属性中处理');
      const stopping=body.action==='stop_task' || body.enabled===false;
      if(stopping && !task.checkpoint) {
        if(task.attemptId || task.output) {task.stoppedAttempts??=[];task.stoppedAttempts.push({attemptId:task.attemptId,output:task.output,at:Date.now()})}
        task.status='pending';task.attempt=0;task.attemptId=undefined;task.reassigning=false;
      }
      task.workflowPaused=stopping;task.workflowAwaitingStart=false;task.updatedAt=Date.now();
    }
    // Explicit fixture mode: simulate successful work; never calls a real model.
    if (process.env.TEAMFLOW_PREVIEW_RERUN) for(const task of team.tasks) if(task.status==='pending' && !task.checkpoint && !task.workflowPaused && task.dependencies.every(id=>team.tasks.find(item=>item.id===id)?.status==='completed')) {task.status='completed';task.attempt=(task.attempt??0)+1;task.output='模拟重跑结果：已按最新要求重新执行。'}
    if (body.action === 'dismiss' && discussion.proposal) discussion.proposal.status = 'dismissed';
    if (body.action === 'layout') for (const [id, point] of Object.entries(body.positions ?? { [body.taskId]: { x: body.x, y: body.y } })) state.positions[`task:${id}`] = point;
    if (body.action === 'start') team.phase = 'running';
    if (body.action === 'new_discussion') state.discussions[slot] = { key, messages: [], calls: [] };
    if (body.action === 'materials' && key.startsWith('check:')) {
      const task=team.tasks.find(t=>t.id===key.slice(6)), material=workflowMaterials(team,task.id,process.cwd());
      discussion.materials=material.text; discussion.evidence=material.evidence; discussion.materialsRound=task.checkpoint.round;
    }
    if (body.action === 'open_discussion') {
      if (!process.env.TEAMFLOW_PREVIEW_DISCUSSION) throw new Error('此开发预览不包含 DSH 原生会话，请在真实宿主中使用此入口。');
      if(body.fresh) {transcripts.delete(key);discussion.proposal=undefined;}
      if(key==='adapt')discussion.proposal=proposeWorkflow(team,'统一本次任务',team.tasks.map(t=>({action:'update_task',id:t.id,description:'算子 B：'+t.subject+'。交付算子 B 的成果，通过本次验证。',adaptationIssue:'',confirmConfiguration:true})));
      if(key==='template')discussion.templateDraft={base:workflowFingerprint(team),definition:{...sample,name:'可复用研发流程'}};
      discussion.native = { sessionId: `session-at-discussion-preview-${key}`, label: key };
    }
    if (body.action === 'review') decideCheckpoint(team, body.taskId, body.decision, body.evidence, workflowMaterials(team, body.taskId, process.cwd()).evidence, body.note || '');
    send(res, 200, { team, base: workflowFingerprint(team), ...(['set_flow_enabled','restore_archive','review','set_task_enabled','state','create','template_apply','open_discussion','edit','apply','resume_rerun_path','resume_task','stop_task','start'].includes(body.action)?{activity:await assembleTeamSnapshot({agents:{get(){}}},resolve('node_modules/workflow-preview-state'),'测试',team)}:{}), ready: body.action === 'archive_state' ? [] : team.tasks.filter(t => checkpointReady(team, t) && !t.checkpoint.decision).map(t => t.id), busy: [], ...(process.env.TEAMFLOW_PREVIEW_ACTIVITY_DISCUSSION ? {currentDiscussion:'adapt'} : process.env.TEAMFLOW_PREVIEW_DISCUSSION ? { currentDiscussion: 'member:researcher' } : {}), ...(body.action === 'open_discussion' ? { openedSessionId: discussion.native.sessionId } : {}) });
  } catch (error) { send(res, 409, { error: error.message }); }
}).listen(port, '127.0.0.1', () => console.log(`Workflow UI fixture: http://127.0.0.1:${port}`));
