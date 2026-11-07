import { workflowRequest } from './workflow-request.ts'
import { workflowMessage } from './workflow-text.ts'
import { useWorkflowText } from './workflow-i18n.tsx'
import { useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import css from './WorkflowWorkbench.module.css'
import { publishWorkflowActivity, type ActivityTeam } from './activity-monitor.ts'

/** History comes from activity snapshots, never from the mutable workflow API. */
export function WorkflowHistory({ name, children, restore }: { name: string; children: ReactNode; restore?: {sessionId:string;teamId:string} }) {
  const l = useWorkflowText()

  const dialog = useRef<HTMLDialogElement>(null)
  const [busy,setBusy]=useState(false), [error,setError]=useState(''), [restored,setRestored]=useState(false)
  async function restoreWorkflow():Promise<void> {
    if(!restore || busy) return
    setBusy(true);setError('')
    try {
      const result=await workflowRequest<{activity?:ActivityTeam;error?:string}>({action:'restore_archive',sessionId:restore.sessionId,teamId:restore.teamId})
      if(!result.activity) throw new Error(result.error??l("恢复失败，请重新连接后重试"))
      setRestored(true);dialog.current?.close()
      publishWorkflowActivity(result.activity)
    } catch(err) {setError(err instanceof Error?err.message:String(err))} finally {setBusy(false)}
  }
  return <>
    <button type="button" className={`${css.entry} ${css.launcher}`} aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}>
      <strong>{l("团队与流程 ")}<span aria-hidden>↗</span></strong><span>{name} {l(" · 历史记录，只读")}</span>
    </button>
    {createPortal(<dialog ref={dialog} className={`${css.entry} ${css.historyDialog}`} aria-label={l("{0} · 团队与流程（只读）", name)}>
      <header><div><strong>{name}</strong><p>{l("历史记录 · 只读")}</p></div><button type="button" autoFocus onClick={() => dialog.current?.close()}>{l("关闭")}</button></header>
      {restore && <section><p>{l("可恢复为待确认流程：保留已完成成果与原归档，重新建立空闲成员；不会自动执行。请确认成员配置后启动，人工节点仍需正式验收。")}</p><button type="button" disabled={busy||restored} onClick={()=>void restoreWorkflow()}>{busy?l("正在恢复…"):restored?l("已恢复，请查看当前团队"):l("恢复为待确认流程")}</button>{error&&<p role="alert">{workflowMessage(error, l)}</p>}</section>}
      {children}
    </dialog>, document.body)}
  </>
}
