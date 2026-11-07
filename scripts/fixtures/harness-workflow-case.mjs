import assert from 'node:assert/strict';
import { createUserMessage } from '@deepseek-ai/dsh-llm';
import { writeFileSync } from 'node:fs';

/** Runs against the packaged plugin, real authentication, scheduler and LLM service. */
export async function exerciseWorkflow({ baseUrl, cookie, captain, readTeam, record, ctx, events }) {
  let activeSession = captain.id, activeTeam = 'runtime-lab';
  const post = async (action, fields = {}, expected = 200) => {
    if(action==='resume_task'&&fields.base===undefined)fields={...fields,base:(await post('state')).base};
    const response = await fetch(baseUrl + '/plugins/dsh-agent-teams/workflow', {
      method: 'POST', headers: { 'content-type': 'application/json', origin: baseUrl, cookie },
      body: JSON.stringify({ sessionId: activeSession, teamId: activeTeam, action, ...fields }), signal: AbortSignal.timeout(25000),
    });
    const result = await response.json();
    assert.equal(response.status, expected, JSON.stringify(result)); return result;
  };
  const nativeDiscussion = async (key) => {
    const before = events.filter(e => e.event === 'web-request' && !e.isMember).length;
    const opened = await post('open_discussion', { discussion: key });
    assert.ok(opened.openedSessionId); assert.notEqual(opened.openedSessionId, captain.id);
    const deadline = Date.now() + 20000;
    while (!events.some(e => e.event === 'workflow-native-finished' && e.sessionId === opened.openedSessionId)) {
      assert.ok(Date.now() < deadline, 'Native discussion did not finish: ' + key);
      await new Promise(resolve => setTimeout(resolve, 30));
    }
    const live = ctx.agents.get(opened.openedSessionId); assert.ok(live); await live.whenIdle();
    assert.equal(live.session.header.parentSession, undefined, 'Discussion must have no execution parent');
    assert.equal(live.session.header.origin, 'subagent', 'Internal discussion must be hidden by the host session browser');
    const scoped = await post('state', { sessionId: live.id }); assert.equal(scoped.currentDiscussion, key);assert.equal(scoped.activity.captainSessionId,scoped.team.captainSessionId);assert.equal(scoped.activity.teamId,scoped.team.id);
    await post('state', { sessionId: live.id, teamId: 'another-team' }, 409);
    live.followup(createUserMessage({ content: [{ type: 'text', text: '继续核对当前方案，不应用修改。' }], source: { kind: 'user' } }));
    await live.whenIdle();
    assert.equal(events.filter(e => e.event === 'workflow-native-finished' && e.sessionId === live.id).length, 2, 'Native follow-up must retain history and restrictions');
    await ctx.sessions.flush(live.session);
    assert.equal(events.filter(e => e.event === 'web-request' && !e.isMember).length, before, 'Discussion must not wake the execution captain');
    const same = await post('open_discussion', { discussion: key }); assert.equal(same.openedSessionId, opened.openedSessionId, 'Reopening must reuse native history');
    return post('state');
  };
  const unauthorized = await fetch(baseUrl + '/plugins/dsh-agent-teams/workflow', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ sessionId: captain.id, teamId: 'runtime-lab', action: 'state' }) });
  assert.ok([401, 403].includes(unauthorized.status));
  await post('state', { teamId: 'missing-team' }, 409);
  writeFileSync('outcome-report.md','# Packaged outcome preview');
  const beforePreview=(await post('state')).team, callsBeforePreview=events.filter(e=>e.event==='web-request').length;
  const preview=await post('outcome_preview',{taskId:'t1',path:'outcome-report.md'});
  assert.equal(preview.preview.text,'# Packaged outcome preview');assert.equal(preview.preview.kind,'markdown');
  await post('outcome_preview',{taskId:'t1',path:'undeclared.md'},409);
  await post('outcome_preview',{sessionId:'unknown-session',taskId:'t1',path:'outcome-report.md'},409);
  assert.deepEqual((await post('state')).team,beforePreview);
  assert.equal(events.filter(e=>e.event==='web-request').length,callsBeforePreview);
  record({event:'outcome-preview-passed',readOnly:true,noModelCalls:true,ownerBound:true});
  const prior = readTeam().members[0].summary;
  let result = await nativeDiscussion('member:worker');
  assert.equal(readTeam().members[0].summary, prior, 'Discussion must not mutate the worker');
  const proposal = result.team.workflow.discussions['discussion:member:worker'].proposal;
  assert.equal(proposal.status, 'pending');
  result = await post('apply', { discussion: 'member:worker', proposalId: proposal.id });
  assert.equal(result.team.members[0].summary, '负责实现与自测，交付验证证据');
  assert.equal(result.team.members[0].id, '', 'Persona change retires the old execution session');
  await post('apply', { discussion: 'member:worker', proposalId: proposal.id }, 409);
  result = await post('preview', { title: '两个串联的人工检查', operations: [
    { action: 'add_task', id: 'g1', subject: '第一次验收', dependencies: ['t1'], checkpoint: true },
    { action: 'add_task', id: 'g2', subject: '第二次验收', dependencies: ['g1'], checkpoint: true },
  ] });
  assert.equal(readTeam().tasks.length, 1);
  result = await post('apply', { proposalId: result.team.workflow.discussions['discussion:graph'].proposal.id });
  assert.deepEqual(result.ready, []);
  await post('resume_task',{taskId:'g1'});
  result=await post('resume_task',{taskId:'g2'});
  assert.deepEqual(result.ready, ['g1']);
  await post('preview', { title: '模型不得批准', operations: [{ action: 'approve', id: 'g1' }] }, 409);
  await post('review', { taskId: 'g1', decision: 'approve', evidence: 'unseen' }, 409);
  result = await nativeDiscussion('check:g1');
  const discussion = result.team.workflow.discussions['discussion:check:g1'];
  assert.ok(discussion.materials.includes('WEB_MEMBER_TASK_DONE'));
  assert.ok(discussion.native.sessionId); assert.equal(discussion.calls.length, 0);
  assert.equal(result.team.tasks.find(t => t.id === 'g1').status, 'pending');
  result = await post('review', { taskId: 'g1', decision: 'approve', evidence: discussion.evidence, note: '已核对' });
  assert.deepEqual(result.ready, ['g2']);
  await post('review', { taskId: 'g1', decision: 'approve', evidence: discussion.evidence }, 409);
  result = await nativeDiscussion('check:g2');
  result = await post('review', { taskId: 'g2', decision: 'reject', evidence: result.team.workflow.discussions['discussion:check:g2'].evidence, note: '需要更多证据' });
  assert.equal(result.team.tasks.find(t => t.id === 'g2').status, 'pending');
  assert.equal(result.team.tasks.find(t => t.id === 'g2').checkpoint.decision, 'reject');
  assert.deepEqual(result.ready, []);
  const rejection=result.team.tasks.find(t=>t.id==='g2').checkpoint.history.at(-1);
  result=await post('reopen_review',{taskId:'g2',base:result.base});
  assert.equal(result.team.tasks.find(t=>t.id==='g2').checkpoint.round,2);
  assert.deepEqual(result.team.tasks.find(t=>t.id==='g2').checkpoint.history.at(-1),rejection);
  result=await post('review',{taskId:'g2',decision:'approve',evidence:result.team.workflow.discussions['discussion:check:g2'].evidence,note:'重新核对通过'});
  assert.equal(result.team.tasks.find(t=>t.id==='g2').status,'completed');
  record({event:'returned-review-reopened',historyRetained:true,humanApproval:true});
  const manual = await ctx.agents.create({ sessionId: 'session-workflow-' + Date.now(), meta: { cwd: process.cwd() }, agentOptions: { provider: 'runtime-lab', model: 'manual-fixture' } });
  ctx.effect(() => () => manual.dispose());
  await manual.agent.whenIdle(); activeSession = manual.agent.id; activeTeam = '';
  result = await post('create', { name: 'manual-workflow', description: '先人工验收，再执行任务' });
  activeTeam = result.team.id;
  assert.equal(result.team.workflow.mode, undefined); assert.equal(result.team.phase, 'staged');
  await post('create', { name: 'duplicate' }, 409);
  await post('state', { sessionId: captain.id }, 409);
  result = await post('preview', { title: '手动创建可运行流程', operations: [
    { action: 'add_member', name: 'worker', summary: '完成验证任务', role: 'WEB_APPROVAL_MEMBER', executionPrompt: 'WEB_APPROVAL_MEMBER: complete the assigned task and report.' },
    { action: 'add_task', id: 'gate', subject: '开始前人工确认', dependencies: [], checkpoint: true },
    { action: 'add_task', id: 't1', subject: '人工确认后执行', dependencies: ['gate'], assignee: 'worker' },
  ] });
  result = await post('apply', { proposalId: result.team.workflow.discussions['discussion:graph'].proposal.id });
  assert.ok(result.team.taskSeq >= Math.max(0, ...result.team.tasks.map(task => /^t\d+$/.test(task.id) ? Number(task.id.slice(1)) : 0)), 'Canvas IDs must advance the original task allocator');
  result = await post('start');
  assert.equal(result.team.phase, 'running'); assert.deepEqual(result.ready, ['gate']);
  assert.equal(result.team.members[0].id, '', 'Checkpoint must prevent lazy worker spawn');
  result = await post('stop_task', { taskId: 't1' });
  assert.equal(result.team.tasks[1].workflowPaused, true);
  result = await nativeDiscussion('check:gate');
  result = await post('review', { taskId: 'gate', decision: 'approve', evidence: result.team.workflow.discussions['discussion:check:gate'].evidence });
  assert.equal(result.team.members[0].id, '', 'Approval must not resume a task explicitly paused for editing');
  await post('resume_task', { taskId: 't1' });
  const deadline = Date.now() + 20000;
  do {
    result = await post('state');
    if (result.team.tasks[1].status === 'completed') break;
    await new Promise(resolve => setTimeout(resolve, 50));
  } while (Date.now() < deadline);
  assert.equal(result.team.tasks[1].output, 'WEB_MEMBER_TASK_DONE', 'Approving and resuming must dispatch a real member through the scheduler');
  for (const agent of ctx.agents.list()) await agent.whenIdle();
  // Agent idle precedes asynchronous completion cleanup. Wait for a quiet
  // revision before simulating the next human edit; do not retry mutations or
  // weaken the stale-base rejection assertions below.
  const settledDeadline = Date.now() + 5000;
  result = await post('state');
  let stableReads = 0;
  while (stableReads < 3) {
    assert.ok(Date.now() < settledDeadline, 'Completion state did not settle before the next human edit');
    await new Promise(resolve => setTimeout(resolve, 50));
    const next = await post('state');
    stableReads = next.base === result.base ? stableReads + 1 : 0;
    result = next;
  }
  result=await post('edit',{base:result.base,title:'Rerun path gates',operations:[
    {action:'add_task',id:'path-gate',subject:'Review rerun output',description:'Read the new output',checkpoint:true,dependencies:['t1']},
    {action:'add_task',id:'path-target',subject:'Final rerun review',description:'Confirm the new review',checkpoint:true,dependencies:['path-gate']}
  ]});
  result=await post('edit',{base:result.base,title:'Rerun upstream',operations:[{action:'rerun_task',id:'t1',instructions:'Recheck the work for the downstream review path'}]});
  await post('resume_rerun_path',{taskId:'path-target',base:'stale'},409);
  result=await post('resume_rerun_path',{taskId:'path-target',base:result.base});
  assert.ok(result.team.tasks.filter(t=>t.id.startsWith('path-')).every(t=>!t.workflowPaused&&!t.workflowRerunRequired));
  const pathDeadline=Date.now()+20000;
  do{result=await post('state');if(result.team.tasks.find(t=>t.id==='t1').status==='completed')break;await new Promise(r=>setTimeout(r,50))}while(Date.now()<pathDeadline);
  assert.deepEqual(result.ready,['path-gate']);
  const pathMaterials=await post('materials',{discussion:'check:path-gate'});
  result=await post('review',{taskId:'path-gate',decision:'approve',evidence:pathMaterials.team.workflow.discussions['discussion:check:path-gate'].evidence});
  assert.deepEqual(result.ready,['path-target'],'Approval advances the authorized path without another resume');
  record({event:'rerun-path-passed',humanGatePreserved:true,automaticContinuation:true});
  const automatic = await ctx.agents.create({ sessionId: 'session-auto-' + Date.now(), meta: { cwd: process.cwd() }, agentOptions: { provider: 'runtime-lab', model: 'manual-fixture' } });
  ctx.effect(() => () => automatic.dispose()); await automatic.agent.whenIdle();
  activeSession = automatic.agent.id; activeTeam = '';
  result = await post('create', { name: 'auto-workflow', description: '自动规划验证' }); activeTeam = result.team.id;
  assert.equal(result.team.workflow.mode, undefined);
  result = await nativeDiscussion('graph');
  assert.equal(result.team.members.length, 0, 'Automatic planning remains a proposal until confirmed');
  result = await post('apply', { proposalId: result.team.workflow.discussions['discussion:graph'].proposal.id });
  assert.equal(result.team.members.length, 1); assert.equal(result.team.tasks.length, 1); assert.equal(result.team.phase, 'staged');
  assert.equal(result.team.tasks[0].layers,undefined, 'Ordinary tasks do not generate reusable layers');
  assert.match(result.team.tasks[0].description, /Implement operator A/);
  const nativeId = result.team.workflow.discussions['discussion:graph'].native.sessionId;
  writeFileSync('workflow-resume.json', JSON.stringify({ teamId: activeTeam, captainId: activeSession, nativeId }));
  await ctx.sessions.flush(automatic.agent.session);
  // Template extraction and adaptation use the real isolated native sessions.
  const sourceBefore=JSON.stringify(result.team.tasks);
  result=await nativeDiscussion('template');
  const extracted=result.team.workflow.discussions['discussion:template'].templateDraft;
  assert.ok(extracted?.definition.tasks[0].general.requirements);
  assert.equal(JSON.stringify(result.team.tasks),sourceBefore,'Extraction must not mutate source tasks');
  const saved=await post('template_save',{definition:extracted.definition});
  const library=await post('template_list');assert.ok(library.templates.some(t=>t.id===saved.template.id));
  const appliedCaptain=await ctx.agents.create({sessionId:'session-template-'+Date.now(),meta:{cwd:process.cwd()},agentOptions:{provider:'runtime-lab',model:'manual-fixture'}});
  ctx.effect(()=>()=>appliedCaptain.dispose());await appliedCaptain.agent.whenIdle();activeSession=appliedCaptain.agent.id;activeTeam='';
  result=await post('template_apply',{templateId:saved.template.id,version:saved.template.version,name:'Operator B',description:'Implement operator B'});activeTeam=result.team.id;
  await appliedCaptain.agent.whenIdle();
  const captainEvents=appliedCaptain.agent.session.ownEvents();
  assert.equal(ctx.get('sessionTitle').get(appliedCaptain.agent.session)?.title,'Operator B');
  assert.equal(ctx.get('sessionTitle').get(appliedCaptain.agent.session)?.source.kind,'user');
  assert.ok(captainEvents.some(e=>e.type==='turn/start'),'Template application must engage the blank main session');
  assert.ok(captainEvents.some(e=>e.type==='user/message'&&e.data.source.kind==='user'&&e.data.content.some(b=>b.type==='text'&&b.text.includes('Implement operator B'))));
  assert.notEqual(appliedCaptain.agent.session.header.origin,'subagent','The captain must remain an ordinary conversation');
  await ctx.sessions.flush(appliedCaptain.agent.session);
  writeFileSync('template-captain-resume.json',JSON.stringify({sessionId:appliedCaptain.agent.id,teamId:activeTeam}));
  record({event:'template-captain-visible',sessionId:appliedCaptain.agent.id,ordinary:true,engaged:true});
  assert.ok(result.team.tasks.every(t=>t.workflowConfigPending));assert.ok(result.team.members.every(m=>!m.id));
  await post('start',{},409);
  result=await nativeDiscussion('adapt');
  assert.ok(result.team.tasks.every(t=>!t.description && !t.layers),'Generation stays a proposal');
  const adapted=result.team.workflow.discussions['discussion:adapt'].proposal;
  result=await post('apply',{discussion:'adapt',proposalId:adapted.id});
  assert.ok(result.team.tasks.every(t=>!t.workflowConfigPending && t.description.includes('Implement operator B according to confirmed specifications') && !t.layers));
  assert.ok(result.team.members.every(m=>!m.id),'Applying a proposal must not execute staged tasks');
  const generic=result.team.workflow.templateDefinition.tasks[0].general.requirements;
  const v2=await post('template_save',{definition:{...saved.template,name:'Updated template'},templateId:saved.template.id,version:1});
  assert.equal(v2.template.version,2);
  result=await post('state');assert.equal(result.team.workflow.templateSource.version,1);assert.equal(result.team.workflow.templateDefinition.tasks[0].general.requirements,generic);
  result=await post('start');
  const templateDeadline=Date.now()+20000;
  do{result=await post('state');if(result.team.tasks[0].status==='completed')break;await new Promise(r=>setTimeout(r,50))}while(Date.now()<templateDeadline);
  assert.equal(result.team.tasks[0].status,'completed');
  record({event:'workflow-template-passed',extraction:true,fixedGraph:true,unifiedAdaptation:true,independentVersion:true,execution:true,
    snapshot:{task:{description:result.team.tasks[0].description},sourceVersion:result.team.workflow.templateSource.version,templateVersion:v2.template.version}});
  const catalog = (await post('template_list')).templates.filter(t=>t.id.startsWith('builtin-'));
  assert.equal(catalog.length,3);
  for(const item of catalog){
    const owner=await ctx.agents.create({sessionId:'session-builtin-'+item.id,meta:{cwd:process.cwd()},agentOptions:{provider:'runtime-lab',model:'manual-fixture'}});
    ctx.effect(()=>()=>owner.dispose());await owner.agent.whenIdle();activeSession=owner.agent.id;activeTeam='';
    await post('template_save',{definition:item,templateId:item.id,version:item.version},409);
    await post('template_delete',{templateId:item.id,version:item.version},409);
    const copied=await post('template_save',{definition:item});assert.notEqual(copied.template.id,item.id);
    const installed=await post('template_apply',{templateId:item.id,version:item.version,name:item.name,description:'本次具体目标'});activeTeam=installed.team.id;assert.equal(installed.activity.teamId,activeTeam);assert.equal(installed.activity.phase,'staged');
    assert.equal(installed.team.tasks.length,item.tasks.length);
    assert.ok(installed.team.tasks.every(t=>t.workflowConfigPending && !t.description && !t.layers));
    await post('start',{},409);
  }
  record({event:'builtin-templates-passed',snapshot:catalog});
  const englishOwner=await ctx.agents.create({sessionId:'session-builtin-english',meta:{cwd:process.cwd()},agentOptions:{provider:'runtime-lab',model:'manual-fixture'}});
  ctx.effect(()=>()=>englishOwner.dispose());await englishOwner.agent.whenIdle();activeSession=englishOwner.agent.id;activeTeam='';
  const english=await post('template_apply',{templateId:'builtin-feature',version:2,name:'English feature',description:'Keep my task 具体目标',language:'en'});
  assert.equal(english.team.description,'Keep my task 具体目标');
  assert.ok(english.team.tasks.every(t=>!t.description && !t.layers && t.workflowConfigPending));
  assert.ok(english.team.workflow.templateDefinition.tasks.every(t=>!/[\p{Script=Han}]/u.test(JSON.stringify(t.general))));
  assert.deepEqual(english.team.tasks.map(t=>t.dependencies),catalog.find(t=>t.id==='builtin-feature').tasks.map(t=>t.dependencies));
  record({event:'builtin-english-passed',tasks:english.team.tasks.length});

  record({ event: 'workflow-workbench-passed', proposalIsolation: true, nativeScopedDiscussion: true, humanApproval: true, rejectionBlocks: true });
  process.stdout.write('WORKFLOW_WORKBENCH_OK\n');
}
