/** workflow-preview with TEAMFLOW_PREVIEW_REVIEW=1 and TEAMFLOW_PREVIEW_REPAIR=1. */
import assert from 'node:assert/strict'
const {chromium}=await import(process.env.TEAMFLOW_PLAYWRIGHT_MODULE??'playwright')
const browser=await chromium.launch({channel:'msedge',headless:true})
try {
 const page=await browser.newPage({viewport:{width:1440,height:1050}}),errors=[]
 page.on('pageerror',e=>errors.push(e.message))
 await page.goto(process.env.TEAMFLOW_REVIEW_URL??'http://127.0.0.1:8378')
 await page.getByRole('button',{name:'验收 · 功能交付验收 ↗',exact:true}).click()
 const review=page.locator('[data-review-workbench]')
 await review.getByRole('textbox',{name:'验收意见',exact:true}).fill('修复编码')
 await review.getByRole('button',{name:'退回修改',exact:true}).click()
 await review.getByRole('button',{name:'保存要求并重跑任务',exact:true}).click()
 const dialog=page.getByRole('dialog',{name:'TeamFlow 编排工作台'});const start=dialog.getByRole('button',{name:'开始全部',exact:true}),pause=dialog.getByRole('button',{name:'暂停全部',exact:true})
 await review.getByRole('button',{name:'重跑到此节点',exact:true}).waitFor()
 assert.equal(await start.isEnabled(),true,'Start all must be available when downstream awaits rerun confirmation')
 await start.click()
 const state=()=>page.request.post(new URL('/plugins/dsh-agent-teams/workflow',page.url()).href,{data:{action:'state',sessionId:'preview',teamId:'preview'}}).then(r=>r.json())
 let current=await state()
 for(const id of ['t2','t3','t4']){const t=current.team.tasks.find(t=>t.id===id);assert.equal(t.workflowPaused,false);assert.equal(t.workflowRerunRequired,false)}
 assert.equal(current.team.tasks.find(t=>t.id==='t3').status,'pending','Review must still block downstream')
 await pause.click();current=await state()
 assert.equal(current.team.tasks.find(t=>t.id==='t3').workflowPaused,true)
 assert.equal(await review.getByRole('button',{name:'通过验收',exact:true}).isDisabled(),true)
 await start.click()
 await review.getByRole('button',{name:'通过验收',exact:true}).click()
 await review.getByRole('button',{name:'确认通过',exact:true}).click()
 await review.getByText('已保存的验收决定 · 通过',{exact:true}).waitFor()
 current=await state()
 assert.equal(current.team.tasks.find(t=>t.id==='t3').status,'completed','Downstream must continue after approval without another start')
 assert.equal(current.team.tasks.find(t=>t.id==='t4').checkpoint.decision,undefined,'Other human reviews must not be auto-approved')
 assert.deepEqual(errors,[])
 console.log('PASS repair → Start all → pause → Start all → approve → automatic downstream completion')
} finally {await browser.close()}
