import assert from 'node:assert/strict'
/** Packaged Teamflow against the installed, pinned Harness cohort; only LLM output is scripted. */
import { spawn, spawnSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync, realpathSync, existsSync, readdirSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { runRuntimeScenarios, linkDirectory } from './harness-runtime-scenarios.mjs'
const artifact=resolve(process.argv[2]??''),report=resolve(process.argv[3]??'output/template-runtime')
if(!artifact.endsWith('.tgz')||!existsSync(artifact))throw new Error('Usage: node scripts/template-runtime-verify.mjs <package.tgz> <new-report-directory>')
if(existsSync(report))throw new Error('Choose a fresh report directory')
const runtime=join(report,'runtime'),modules=join(runtime,'node_modules'),plugin=join(modules,'@yogurtss/dsh-teamflow')
mkdirSync(plugin,{recursive:true})
const unpack=spawnSync('tar',['-xf',artifact,'-C',plugin,'--strip-components=1'],{encoding:'utf8'})
if(unpack.status!==0)throw new Error(unpack.stderr||'Could not unpack artifact')
const namespace=realpathSync('node_modules/.pnpm/node_modules/@deepseek-ai')
mkdirSync(join(modules,'@deepseek-ai'),{recursive:true})
for(const source of [namespace,resolve('node_modules/@deepseek-ai')])for(const name of readdirSync(source)){const dest=join(modules,'@deepseek-ai',name);if(!existsSync(dest))linkDirectory(realpathSync(join(source,name)),dest)}
linkDirectory(resolve('node_modules'),join(plugin,'node_modules'))
const host=JSON.parse(readFileSync(join(modules,'@deepseek-ai/dsh/package.json'),'utf8'))
if(host.version!=='0.2.1-rc.2')throw new Error('This composition requires the project-pinned Harness 0.2.1-rc.2')
async function command(argv,cwd,env,label,timeoutMs){
  const child=spawn(argv[0],argv.slice(1),{cwd,env,stdio:['ignore','pipe','pipe'],windowsHide:true})
  let stdout='',stderr='',timedOut=false;child.stdout.on('data',v=>stdout+=v);child.stderr.on('data',v=>stderr+=v)
  const timer=setTimeout(()=>{timedOut=true;child.kill()},timeoutMs)
  const result=await new Promise((ok,fail)=>{child.on('error',fail);child.on('exit',(code,signal)=>ok({code,signal}))});clearTimeout(timer)
  writeFileSync(join(report,`${label}.stdout.log`),stdout);writeFileSync(join(report,`${label}.stderr.log`),stderr)
  return {...result,stdout,stderr,timedOut}
}
const runs=await runRuntimeScenarios({report,runtime,command,environment:extra=>({...process.env,...extra}),selectedScenarios:['web-approval'],linkWorkspacePackages:true})
const trace=readFileSync(join(report,'web-approval/trace.jsonl'),'utf8').trim().split('\n').map(line=>JSON.parse(line))
const template=trace.find(row=>row.event==='workflow-template-passed')
const result={host:host.version,plugin:JSON.parse(readFileSync(join(plugin,'package.json'),'utf8')).version,runs,templates:template??null}
writeFileSync(join(report,'result.json'),JSON.stringify(result,null,2)+'\n')
console.log(JSON.stringify(result,null,2))
assert.deepEqual(template?.snapshot,JSON.parse(readFileSync(new URL('./fixtures/snapshots/teamflow-template.json',import.meta.url),'utf8')),'Packaged template composition snapshot changed')
assert.ok(trace.some(row=>row.event==='specific-contract-execution' && row.specificOnly), 'Real executor must receive the complete specific contract')
assert.deepEqual(trace.find(row=>row.event==='builtin-templates-passed')?.snapshot,JSON.parse(readFileSync(new URL('./fixtures/snapshots/builtin-templates.json',import.meta.url),'utf8')),'Built-in template catalog changed')
if(!template||runs.some(run=>!run.passed))process.exitCode=1

assert.deepEqual(trace.find(row=>row.event==='workflow-native-request')?.tools.find(tool=>tool.name==='agent_teams_workflow_propose'),JSON.parse(readFileSync(new URL('./fixtures/snapshots/workflow-proposal-tool.json',import.meta.url),'utf8')),'Structured proposal tool contract changed')

assert.ok(trace.some(row=>row.event==='builtin-english-passed' && row.tasks===9), 'English built-in template must apply through the packaged HTTP route');

assert.ok(trace.some(row=>row.event==='rerun-path-passed' && row.humanGatePreserved && row.automaticContinuation), 'Packaged rerun path must continue after human approval');
assert.ok(trace.some(row=>row.event==='captain-single-description-passed' && row.createCalls===1 && row.configuredTasks===2 && row.approvalStatus===200), 'One create call must produce runnable descriptions without specialization calls');
