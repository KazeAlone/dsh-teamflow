/** Run against the activity preview: TEAMFLOW_PREVIEW_ACTIVITY=1. */
import assert from 'node:assert/strict'
const {chromium}=await import(process.env.TEAMFLOW_PLAYWRIGHT_MODULE??'playwright')
const browser=await chromium.launch({channel:'msedge',headless:true})
try {
 const page=await browser.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message))
 await page.goto(process.env.TEAMFLOW_REOPEN_URL??'http://127.0.0.1:8371')
 const badge=page.locator('[data-agent-teams-collapsed]')
 await badge.click();const dialog=page.getByRole('dialog')
 await dialog.getByRole('button',{name:'暂停全部',exact:true}).waitFor()
 await dialog.getByRole('button',{name:'关闭编排工作台'}).click()
 let release;const delayed=new Promise(resolve=>{release=resolve})
 await page.route('**/plugins/dsh-agent-teams/workflow',async route=>{
  if(route.request().postDataJSON().action==='state')await delayed
  await route.continue()
 })
 await badge.click()
 await dialog.getByText('已显示上次状态，正在同步最新进度…',{exact:true}).waitFor()
 assert.equal(await dialog.getByText('正在读取团队…',{exact:true}).count(),0)
 assert.equal(await dialog.getByRole('button',{name:'暂停全部',exact:true}).isDisabled(),true,'cached state cannot authorize mutations')
 assert.ok((await dialog.innerText()).includes('需求调研'),'previous canvas renders before the response')
 release()
 await dialog.getByText('已显示上次状态，正在同步最新进度…',{exact:true}).waitFor({state:'hidden'})
 assert.equal(await dialog.getByRole('button',{name:'暂停全部',exact:true}).isEnabled(),true)
 assert.deepEqual(errors,[])
 console.log('PASS remounted workflow paints before delayed state, fences mutations, then enables fresh state')
}finally{await browser.close()}
