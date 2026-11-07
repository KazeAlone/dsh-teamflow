import assert from 'node:assert/strict';
const {chromium}=await import(process.env.TEAMFLOW_PLAYWRIGHT_MODULE??'playwright');
const browser=await chromium.launch({channel:'msedge',headless:true});
try {
 const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.TEAMFLOW_RECOVERY_URL??'http://127.0.0.1:8380');await page.getByRole('button',{name:/Teamflow/}).first().click();
 const dialog=page.getByRole('dialog');await dialog.getByText('阻塞与恢复 · 3',{exact:true}).click();await dialog.locator('details').getByRole('button',{name:'需求调研',exact:true}).click();
 await dialog.getByRole('button',{name:'继续此任务',exact:true}).waitFor();assert.equal(await dialog.getByRole('button',{name:'开始全部',exact:true}).isEnabled(),true);
 let offline=false,mutations=0;
 await page.route('**/plugins/dsh-agent-teams/workflow',async route=>{const body=route.request().postDataJSON();if(offline)return route.abort('internetdisconnected');if(body.action==='continue_task'){mutations++;await route.fetch();offline=true;return route.abort('internetdisconnected')}return route.continue()});
 await dialog.getByRole('button',{name:'继续此任务',exact:true}).click();await dialog.getByText('连接需要恢复',{exact:true}).waitFor();assert.equal(mutations,1);
 offline=false;await dialog.getByRole('button',{name:'重新连接并读取状态',exact:true}).click();await dialog.getByText('连接需要恢复',{exact:true}).waitFor({state:'hidden'});
 assert.equal(mutations,1,'reconnect does not replay a mutation whose response was lost');assert.equal(await dialog.getByRole('button',{name:'继续此任务',exact:true}).count(),0,'latest active execution replaces interrupted state');
 await context.setOffline(true);await dialog.getByText('连接需要恢复',{exact:true}).waitFor();await context.setOffline(false);await dialog.getByText('连接需要恢复',{exact:true}).waitFor({state:'hidden'});
 await page.screenshot({path:'output/workflow-recovery/reconnected.png'});await page.getByRole('combobox',{name:'Preview language'}).selectOption('en');assert.doesNotMatch(await dialog.getByRole('region',{name:'Blocker and next step'}).innerText(),/\p{Script=Han}/u);
 assert.deepEqual(errors,[]);console.log('PASS interrupted task, no-input continuation, lost response, reconnect without replay, offline recovery, English recovery controls');
}finally{await browser.close()}
