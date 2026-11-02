import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, appendFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { createUserMessage } from '@deepseek-ai/dsh-llm';
export const name = 'feature-workflow-trial';
export const inject = ['llm', 'agents', 'sessions', 'webServer', 'connection', 'workspaceRegistry'];
export function apply(ctx) {
    ctx.effect(() => ctx.webServer.register({ kind: 'exact', path: '/', handler(req, res) { if (!ctx.connection.authorizeIndex(req, res))
            return; res.writeHead(200, { 'content-type': 'text/plain' }); res.end('Workflow trial'); } }));
    const parallel = process.env.WORKFLOW_TRIAL_PARALLEL === '1', resume = process.env.WORKFLOW_TRIAL_RESUME === '1';
    const planningOnly=process.env.WORKFLOW_TRIAL_PLANNING_ONLY==='1',fromScratch=process.env.WORKFLOW_TRIAL_FROM_SCRATCH==='1';
    const captainPlanning=process.env.WORKFLOW_TRIAL_CAPTAIN_PLANNING==='1';
    const saveTemplate=process.env.WORKFLOW_TRIAL_SAVE_TEMPLATE==='1';
    const report = process.env.WORKFLOW_TRIAL_REPORT, events = [];
    const overlaps = new Set(); let observed = false;
    const pairs = [['requirements','impact'],['implementation','test-preparation'],['verification','code-review']];
    let requests = resume ? readFileSync(join(report,'trace.jsonl'),'utf8').trim().split('\n').map(JSON.parse).filter(e=>e.event==='model-request').length : 0, stage = 'startup', state;
    if(resume) for(const e of readFileSync(join(report,'trace.jsonl'),'utf8').trim().split('\n').map(JSON.parse))if(e.tasks)for(const pair of pairs)if(pair.every(id=>e.tasks.some(t=>t.id===id&&['claimed','in_progress'].includes(t.status))))overlaps.add(pair.join('+'));
    const record = e => { events.push({ ...e, at: Date.now() }); appendFileSync(join(report, 'trace.jsonl'), JSON.stringify(events.at(-1)) + '\n'); };
    ctx.on('agent/error', ({agent,error}) => record({event:'agent-error',sessionId:agent.id,message:String(error.message).slice(0,600),code:error.failure?.code}));
    ctx.on('llm/stream', async function* (options, next) { if (++requests > (planningOnly ? 12 : parallel ? 110 : 70))
        throw Error('Trial request budget exhausted'); record({ event: 'model-request', request: requests, provider: options.provider, model: options.model, sessionId: options.sessionId, ...(planningOnly ? {messages:options.messages} : {}) }); try {
        for await (const chunk of next()) {
            if (chunk.type === 'text-delta')
                record({ event: 'text', text: chunk.text });
            if (chunk.type === 'usage') record({event:'usage',usage:chunk.usage});
            if (chunk.type === 'finish') record({event:'model-finish',reason:chunk.reason});
            yield chunk;
        }
    }
    catch (error) {
        record({ event: 'model-error', message: String(error.message).slice(0, 600) });
        throw error;
    } });
    ctx.on('tools/result', (exec, result) => record({ event: 'tool-result', name: exec.name, arguments: exec.arguments, isError: result.isError, ...result.isError ? { result } : {} }));
    const bounded = async (promise) => { let timer; try {
        return await Promise.race([promise, new Promise((_, reject) => timer = setTimeout(() => reject(Error('Agent idle timeout at ' + stage)), 300000))]);
    }
    finally {
        clearTimeout(timer);
    } };
    void (async () => {
        await ctx.get('loader').await();
        await ctx.workspaceRegistry.create(process.cwd(), 'Feature workflow trial');
        const prior = resume ? JSON.parse(readFileSync(join(report,'adapted.json'),'utf8')) : undefined;
        const handle = resume ? await ctx.agents.resume({resumeSessionId:prior.team.captainSessionId,agentOptions:{provider:'deepseek-account',model:'deepseek-flash',reasoningEffort:'high'}}) : await ctx.agents.create({ sessionId: 'session-feature-' + Date.now(), meta: { cwd: process.cwd() }, setup:agentCtx=>{if(captainPlanning)agentCtx.effect(()=>agentCtx.tools.restrict({allow:['agent_teams_create','agent_teams_edit_plan','agent_teams_status']}))}, agentOptions: { provider: 'deepseek-account', model: 'deepseek-flash', reasoningEffort: 'high' } });
        ctx.effect(() => () => handle.dispose());
        await bounded(handle.agent.whenIdle());
        const origin = 'http://127.0.0.1:' + ctx.webServer.port;
        const auth = await fetch(ctx.connection.authenticatedUrl(origin), { redirect: 'manual' });
        assert.equal(auth.status, 303);
        const cookie = auth.headers.get('set-cookie').split(';', 1)[0];
        let teamId = prior?.team.id ?? '';
        const post = async (action, fields = {}, expected = 200) => { const response = await fetch(origin + '/plugins/dsh-agent-teams/workflow', { method: 'POST', headers: { 'content-type': 'application/json', origin, cookie }, body: JSON.stringify({ sessionId: handle.agent.id, teamId, action, ...fields }), signal: AbortSignal.timeout(25000) }); const body = await response.json(); assert.equal(response.status, expected, JSON.stringify(body)); if (body.team) {
            state = body;
            if(parallel && observed){
                const byId=id=>body.team.tasks.find(t=>t.id===id);
                const active=t=>['claimed','in_progress'].includes(t.status);
                for(const pair of pairs)if(pair.every(id=>active(byId(id))))overlaps.add(pair.join('+'));
                for(const task of body.team.tasks)if(active(task)||task.status==='completed')for(const id of task.dependencies)assert.equal(byId(id).status,'completed','Premature execution: '+task.id+' before '+id);
            }
        } record({ event: 'action', action, status: response.status, tasks: body.team?.tasks.map(t => ({ id: t.id, status: t.status, pending: t.workflowConfigPending, paused: t.workflowPaused })) }); return body; };
        const discussion = async (key) => { stage = 'discussion:' + key; const opened = await post('open_discussion', { discussion: key }); const live = ctx.agents.get(opened.openedSessionId); assert.ok(live); await bounded(live.whenIdle()); return post('state'); };
        const waitTask = async (id) => { stage = 'execute:' + id; const deadline = Date.now() + 300000; do {
            await post('state');
            const task = state.team.tasks.find(t => t.id === id);
            if (task.status === 'completed')
                return task;
            if (task.status === 'failed')
                throw Error('Task failed ' + id + ': ' + task.output);
            await new Promise(r => setTimeout(r, 1000));
        } while (Date.now() < deadline); throw Error('Task timeout ' + id); };
        const extractTemplate = async () => {
          if(!saveTemplate)return;
          teamId=state.team.id;
          const source=JSON.stringify(state.team.tasks);
          await discussion('template');
          const draft=state.team.workflow.discussions['discussion:template'].templateDraft?.definition;
          assert.ok(draft?.tasks.every(task=>task.general.requirements.trim()),'Extraction must produce reusable requirements for every node');
          assert.equal(JSON.stringify(state.team.tasks),source,'Extraction must not rewrite source tasks');
          const saved=await post('template_save',{definition:draft});
          assert.ok(saved.template?.id);
          writeFileSync(join(report,'extracted-template.json'),JSON.stringify(saved.template,null,2));
          record({event:'template-extraction-passed',tasks:draft.tasks.length});
        };
        if(captainPlanning){
          stage='captain-planning';
          handle.agent.followup(createUserMessage({content:[{type:'text',text:'/teamflow 为下面的目标创建团队和完整任务计划，等待我最终确认后再执行。\n'+readFileSync('README.md','utf8')}],source:{kind:'user'}}));
          await bounded(handle.agent.whenIdle());
          await post('state');
          assert.ok(state?.team, 'Model did not create a team; inspect model/tool events');
          assert.equal(state.team.phase,'staged');
          assert.ok(state.team.tasks.length>=2);
          assert.ok(state.team.tasks.every(t=>t.status==='pending'&&!t.workflowConfigPending&&t.description?.trim()&&!t.layers));
          assert.ok(state.team.members.every(m=>!m.id));
          const calls=events.filter(e=>e.event==='tool-result');
          assert.ok(calls.some(e=>e.name==='agent_teams_create'&&!e.isError&&e.arguments.plan?.tasks.every(t=>t.description?.trim()&&!t.layers&&!t.general)),'Captain must create complete descriptions');
          await extractTemplate();
          record({event:'planning-only-passed'});
          writeFileSync(join(report,'result.json'),JSON.stringify({passed:true,stage,requests,captainPlanning,team:state.team},null,2));
          ctx.get('appExit')(0);return;
        }
        if(!resume){
        stage = 'apply-template';
        if(fromScratch)await post('create',{name:'端口输入校验',description:readFileSync('README.md','utf8')+'\nCreate a five-node workflow: requirements, scope-review (human), implementation, verification, acceptance (human), in that dependency order. Use suitable members for analysis, implementation and independent verification. Generate one complete description per task; reusable requirements are extracted only when saving a template. Do not execute.'});
        else await post('template_apply', { templateId: 'builtin-feature', version: parallel ? 2 : 1, name: parallel ? '并行端口输入校验' : '端口输入校验', description: readFileSync('README.md', 'utf8') });
        teamId = state.team.id;
        const topology = state.team.tasks.map(t => ({ id: t.id, dependencies: t.dependencies, assignee:t.assignee }));
        await post('start', {}, 409);
        const planningKey=fromScratch?'graph':'adapt';
        await discussion(planningKey);
        const proposal = state.team.workflow.discussions['discussion:'+planningKey].proposal;
        assert.equal(proposal?.status, 'pending', 'Adaptation must produce a pending proposal');
        assert.ok(state.team.tasks.every(t => !t.description), 'Generation must not overwrite without confirmation');
        await post('apply', { discussion: planningKey, proposalId: proposal.id });
        if(!fromScratch)assert.deepEqual(state.team.tasks.map(t => ({ id: t.id, dependencies: t.dependencies, assignee:t.assignee })), topology);
        else assert.equal(state.team.tasks.length,5);
        assert.ok(state.team.tasks.every(t => !t.workflowConfigPending));
        assert.ok(state.team.members.every(m => !m.id));
        writeFileSync(join(report, 'adapted.json'), JSON.stringify(state, null, 2));
        if(planningOnly){
          assert.equal(state.team.phase,'staged');assert.ok(state.team.tasks.every(t=>t.status==='pending'));
          assert.ok(state.team.tasks.every(t=>t.description?.trim()&&!t.layers));
          await extractTemplate();
          record({event:'planning-only-passed'});
          writeFileSync(join(report,'result.json'),JSON.stringify({passed:true,stage:'planning-only',requests,fromScratch,team:state.team},null,2));
          ctx.get('appExit')(0);return;
        }
        }
        observed = true;
        if(resume) await post('state'); else await post('start');
        await waitTask('requirements');
        if(parallel) await waitTask('impact');
        assert.ok(existsSync('requirements.md'), 'Analyst must produce the requirements artifact');
        const requirements = readFileSync('requirements.md', 'utf8');
        const impact = parallel ? readFileSync('impact.md','utf8') : undefined;
        for (const term of ['validatePort', '65535', 'validator.mjs', parallel ? 'node --test' : 'node:test'])
            assert.ok(requirements.includes(term), 'Missing requirement: ' + term);
        assert.ok(!existsSync('validator.mjs') && !existsSync('validator.test.mjs'), 'Implementation must wait for the scope review');
        await discussion('check:scope-review');
        await post('review', { taskId: 'scope-review', decision: 'approve', evidence: state.team.workflow.discussions['discussion:check:scope-review'].evidence, note: '测试驱动确认 README 中固定的端口语义与范围；允许实现。' });
        await waitTask('implementation');
        if(parallel) await waitTask('test-preparation');
        await waitTask('verification');
        if(parallel){await waitTask('code-review');await waitTask('delivery');assert.equal(readFileSync('impact.md','utf8'),impact);for(const file of ['review.md','verification.md','delivery.md'])assert.ok(readFileSync(file,'utf8').trim(),file);}
        stage = 'external-verification';
        assert.equal(readFileSync('requirements.md', 'utf8'), requirements, 'Builder/verifier must preserve the approved specification');
        const command = spawnSync(process.execPath, ['--test', 'validator.test.mjs', ...(parallel ? ['tests/independent.test.mjs'] : [])], { encoding: 'utf8', timeout: 30000 });
        assert.equal(command.status, 0, command.stdout + command.stderr);
        const { validatePort } = await import(pathToFileURL(join(process.cwd(), 'validator.mjs')));
        for (const value of [1, 80, 443, 65535])
            assert.equal(validatePort(value), true);
        for (const value of [0, -1, 65536, 1.5, NaN, Infinity, -Infinity, '80', '', null, undefined, true, {}, [], 1n, Symbol('port')])
            assert.equal(validatePort(value), false, 'Invalid input accepted: ' + String(value));
        writeFileSync(join(report, 'external-test.txt'), command.stdout + command.stderr);
        await discussion('check:acceptance');
        await post('review', { taskId: 'acceptance', decision: 'approve', evidence: state.team.workflow.discussions['discussion:check:acceptance'].evidence, note: '测试驱动已在 Agent 外复跑 node:test 并验证 20 个边界输入。' });
        assert.ok(state.team.tasks.every(t => t.status === 'completed'));
        if(parallel){assert.ok(overlaps.has('requirements+impact'),'Analysis branches never overlapped');assert.ok(overlaps.has('implementation+test-preparation'),'Implementation and test preparation never overlapped');}
        stage = 'complete';
        record({ event: 'workflow-passed' });
        writeFileSync(join(report, 'result.json'), JSON.stringify({ passed: true, stage, requests, team: state.team, externalCases: 20, parallel, overlaps:[...overlaps] }, null, 2));
        ctx.get('appExit')(0);
    })().catch(error => { writeFileSync(join(report, 'result.json'), JSON.stringify({ passed: false, stage, requests, parallel, overlaps:[...overlaps], error: String(error.stack), team: state?.team, modelErrors: events.filter(e => e.event === 'model-error'||e.event === 'agent-error') }, null, 2)); ctx.get('appExit')(1); });
}
