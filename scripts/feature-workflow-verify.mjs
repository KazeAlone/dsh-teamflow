/** Windows account-backed trial. Uses a fresh profile/workspace, not OS sandbox isolation. */
import { mkdirSync, writeFileSync, copyFileSync, existsSync, readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { spawn } from 'node:child_process';
import { linkDirectory } from './harness-runtime-scenarios.mjs';
const parallel = process.argv.includes('--parallel'), resume = process.argv.includes('--resume');
const planningOnly = process.argv.includes('--planning-only'), fromScratch = process.argv.includes('--from-scratch');
const captainPlanning = process.argv.includes('--captain-planning');
const saveTemplate = process.argv.includes('--save-template');
if(saveTemplate && !planningOnly)throw Error('--save-template requires --planning-only');
if(fromScratch && !planningOnly)throw Error('--from-scratch requires --planning-only');
if(captainPlanning && (!planningOnly || fromScratch || parallel || resume))throw Error('--captain-planning requires only --planning-only');
const runtime = resolve(process.argv[2] ?? ''), report = resolve(process.argv[3] ?? ''), credentials = resolve(process.argv[4] ?? '');
if (!process.argv[4] || !existsSync(join(runtime, 'node_modules/@yogurtss/dsh-teamflow/package.json')) || !existsSync(credentials) || (existsSync(report) && !resume) || (resume && !existsSync(join(report, 'adapted.json'))))
    throw Error('Usage: node scripts/feature-workflow-verify.mjs <packaged-runtime> <fresh-report> <credential-file> [--parallel] [--resume] [--planning-only] [--from-scratch | --captain-planning] [--save-template]');
if(resume){
  const previous=JSON.parse(readFileSync(join(report,'result.json'),'utf8'));
  if(!parallel || previous.passed || previous.stage!=='execute:impact' || !previous.team?.tasks.every(t=>['requirements','impact'].includes(t.id)?t.status==='completed':t.status==='pending'))
    throw Error('Resume is supported only after the parallel analysis stage, before scope approval');
}
if (process.platform !== 'win32') throw Error('This trial currently targets the Windows DeepSeek account profile');
const host = JSON.parse(readFileSync(join(runtime, 'node_modules/@deepseek-ai/dsh/package.json'), 'utf8'));
if (host.version !== '0.2.1-rc.2') throw Error('Prepare the project-pinned Harness 0.2.1-rc.2 runtime first');
const plugin = JSON.parse(readFileSync(join(runtime, 'node_modules/@yogurtss/dsh-teamflow/package.json'), 'utf8'));
const home = join(report, 'home'), profile = join(home, 'profiles/headless'), workspace = join(report, 'workspace');
mkdirSync(join(profile, 'node_modules/@yogurtss'), { recursive: true });
mkdirSync(workspace, { recursive: true });
linkDirectory(join(runtime, 'node_modules/@deepseek-ai'), join(profile, 'node_modules/@deepseek-ai'));
linkDirectory(join(runtime, 'node_modules/@yogurtss/dsh-teamflow'), join(profile, 'node_modules/@yogurtss/dsh-teamflow'));
writeFileSync(join(profile, 'package.json'), JSON.stringify({ name: 'feature-workflow-trial', private: true, type: 'module', dsh: { profile: { bundles: ['@deepseek-ai/dsh-base', '@deepseek-ai/dsh-headless', '@yogurtss/dsh-teamflow'], patchReload: 'startup' } } }));
copyFileSync(new URL('./fixtures/feature-workflow-driver.mjs', import.meta.url), join(profile, 'driver.mjs'));
const model = { provider: 'deepseek-account', model: 'deepseek-flash', reasoningEffort: 'high' };
const patch = [{ id: 'headless-startup', disabled: true }, { id: 'headless-runner', disabled: true }, { id: 'session-title-llm', disabled: true }, { id: 'authorization', disabled: false }, { id: 'credentials', disabled: false, config: { path: credentials, watch: false } }, { id: 'deepseek-account', disabled: false, config: { desktopPlatform: 'win32' } }, { id: 'llm-pi-ai', disabled: true }, { id: 'llm-deepseek', disabled: true }, { id: 'agent-default-model', config: model }, { id: 'approval', config: { policy: 'never' } }, { id: 'permission', config: { defaultPreset: 'workflow-test', presets: { 'workflow-test': { sandbox: planningOnly ? 'workspace-write' : 'danger-full-access', approval: 'never' } } } }, { id: 'teamflow', config: { templateDirectory: join(workspace, 'personal-templates') } }, { insert: [{ id: 'trial-webserver', name: '@deepseek-ai/dsh-host-webserver', config: { host: '127.0.0.1', port: 0 } }, { id: 'trial-connection', name: '@deepseek-ai/dsh-client-connection' }, { id: 'trial-workspace', name: '@deepseek-ai/dsh-workspace' }, { id: 'trial-driver', name: './driver.mjs' }] }];
writeFileSync(join(profile, 'cordis.patch.yml'), JSON.stringify(patch));
if (!resume) writeFileSync(join(workspace, 'README.md'), '# Workflow trial\nImplement validatePort(value) in validator.mjs (named ESM export). Return true only for primitive number integers from 1 to 65535 inclusive; false for all other values (no coercion, no throwing). Add node:test tests in validator.test.mjs. No dependencies. Write requirements.md before implementation. Only modify files in this workspace; no network or git operations. Human approval is simulated by the test driver after checks.\n');
if (parallel && !resume) writeFileSync(join(workspace, 'README.md'), '# Parallel workflow trial\nImplement validatePort(value), a named ESM export in validator.mjs. Accept only primitive number integers 1 through 65535 inclusive. Return false for all other values, without coercion or throwing. No dependencies.\nUse the built-in feature template v2 and preserve its nine-node graph. Keep each document below 80 lines; do not overdesign this small function.\nFile ownership: analyst writes requirements.md and, only at delivery, delivery.md; reviewer writes impact.md during investigation and review.md during final read-only code review; builder writes validator.mjs and validator.test.mjs only; verifier writes tests/independent.test.mjs during preparation and verification.md during verification. The verifier runs tests without modifying implementation, self-tests, or approved specification. Test preparation must work from the approved interface without waiting for implementation; tests may fail until implementation exists. No shared config or lockfile changes.\nUse node --test validator.test.mjs tests/independent.test.mjs. Requirements and impact investigation run concurrently; implementation and test preparation run concurrently; behavior verification and read-only review can run concurrently. Reports must cite evidence and identify failures. Only modify assigned files in this workspace; no network or git operations. Human approval is simulated by the test driver after checks.\n');
if(resume && existsSync(join(report,'result.json'))) copyFileSync(join(report,'result.json'),join(report,'previous-result.json'));
const child = spawn(process.execPath, [join(runtime, 'node_modules/@deepseek-ai/dsh/lib/bin.js'), '--profile', 'headless', 'Run the feature workflow trial.'], { cwd: workspace, env: { ...process.env, DSH_HOME: home, DSH_TELEMETRY_DISABLED: '1', WORKFLOW_TRIAL_REPORT: report, WORKFLOW_TRIAL_PARALLEL: parallel ? '1' : '', WORKFLOW_TRIAL_RESUME: resume ? '1' : '', WORKFLOW_TRIAL_CAPTAIN_PLANNING: captainPlanning ? '1' : '', WORKFLOW_TRIAL_SAVE_TEMPLATE: saveTemplate ? '1' : '', WORKFLOW_TRIAL_PLANNING_ONLY: planningOnly ? '1' : '', WORKFLOW_TRIAL_FROM_SCRATCH: fromScratch ? '1' : '' }, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
writeFileSync(join(report, 'composition.json'), JSON.stringify({host:host.version,plugin:plugin.version,model,permissionPreset:planningOnly?'workspace-write':'danger-full-access',planningOnly,fromScratch,captainPlanning,saveTemplate,requestLimit:planningOnly?12:parallel?110:70,timeoutMs:planningOnly?360000:1200000},null,2));
let stdout = '', stderr = '', timedOut = false;
child.stdout.on('data', d => stdout += d);
child.stderr.on('data', d => stderr += d);
const timer = setTimeout(() => { timedOut = true; child.kill(); }, planningOnly ? 360000 : 1200000);
const code = await new Promise((ok, fail) => { child.on('exit', ok); child.on('error', fail); });
clearTimeout(timer);
writeFileSync(join(report, resume ? 'resume.stdout.log' : 'stdout.log'), stdout);
writeFileSync(join(report, resume ? 'resume.stderr.log' : 'stderr.log'), stderr);
const result = existsSync(join(report, 'result.json')) ? JSON.parse(readFileSync(join(report, 'result.json'), 'utf8')) : {passed:false,stage:'host',error:timedOut?'Trial timed out':'Host exited without a result'};
if (!existsSync(join(report, 'result.json'))) writeFileSync(join(report, 'result.json'), JSON.stringify(result,null,2));
console.log(JSON.stringify({passed:result.passed,stage:result.stage,requests:result.requests,error:result.error,report,code,timedOut},null,2));
process.exitCode = code === 0 && !timedOut && result.passed === true ? 0 : 1;
