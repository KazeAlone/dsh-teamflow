import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { TeamState, TeamTask } from '../types.ts'
import type { WorkflowDiscussion } from '../workflow-types.ts'
import { useWorkflowText } from './workflow-i18n.tsx'
import { workflowMessage } from './workflow-text.ts'
import { parseReviewMaterial, reviewChanges, reviewItems, type ReviewResult } from './review-evidence.ts'
import { taskReadiness } from './task-readiness.ts'
import { WorkflowIcon } from './icons.tsx'
import css from './ReviewWorkbench.module.css'

export function ReviewWorkbench({ team, task, conversation, ready, archived, busy, note, onNote, onRefresh, onDecision, onDiscuss, onRestart, discussionBusy = false, discussion, proposal, onBack }: {
  team: TeamState; task: TeamTask; conversation?: WorkflowDiscussion; ready: boolean; archived: boolean; busy: boolean
  note: string; onNote: (value: string) => void; onRefresh: () => void
  onDecision: (decision: 'approve' | 'reject', evidence: string, note: string) => Promise<boolean>
  onDiscuss: () => void; discussion?: ReactNode; proposal?: ReactNode; onBack: () => void
  onRestart?: () => void; discussionBusy?: boolean
}) {
  const l = useWorkflowText(), checkpoint = task.checkpoint!
  const [round, setRound] = useState('current')
  const [selected, setSelected] = useState('overview')
  const [tab, setTab] = useState<'evidence' | 'diff'>('evidence')
  const [confirm, setConfirm] = useState<{ evidence: string; round: number }>()
  const [error, setError] = useState('')
  const submitting = useRef(false)
  const history = checkpoint.history ?? []
  const historical = round !== 'current'
  const entry = historical ? history[Number(round)] : [...history].reverse().find(h => h.round === checkpoint.round && h.decision === checkpoint.decision)
  const currentText = checkpoint.decision ? entry?.materials : conversation?.materialsRound === checkpoint.round ? conversation.materials : undefined
  const raw = historical ? entry?.materials : currentText
  const material = useMemo(() => parseReviewMaterial(raw), [raw])
  const validMaterial = material?.check.id === task.id && material.check.round === (entry?.round ?? checkpoint.round) ? material : undefined
  const items = useMemo(() => reviewItems(historical || checkpoint.decision ? { ...task, acceptance: undefined } : task, validMaterial), [task, validMaterial, historical, checkpoint.decision])
  const item = items.find(value => value.id === selected)
  const priorEntry = [...history].reverse().find(h => h.round < (historical ? entry?.round ?? checkpoint.round : checkpoint.round))
  const prior = parseReviewMaterial(priorEntry?.materials)
  const changes = validMaterial && prior?.check.id === task.id ? reviewChanges(prior, validMaterial) : undefined
  const canDecide = !historical && !archived && ready && !checkpoint.decision && !!validMaterial && !!conversation?.evidence && conversation.materialsRound === checkpoint.round
  const issues = validMaterial ? validMaterial.results.flatMap(r => [...r.acceptanceResults, ...r.commandsRun]).filter(r => r.status === 'failed').length + validMaterial.files.filter(f => !f.present || f.unreadable).length + validMaterial.gaps.length : 0
  const downstream = team.tasks.filter(t => t.dependencies.includes(task.id))
  useEffect(() => { setConfirm(undefined); setError('') }, [conversation?.evidence, checkpoint.round, checkpoint.decision, ready, round])
  useEffect(() => { if (selected !== 'overview' && !items.some(i => i.id === selected)) setSelected('overview') }, [items, selected])
  function changeRound(value: string) { setRound(value); setSelected('overview'); setTab('evidence'); setConfirm(undefined) }
  async function decide(decision: 'approve' | 'reject') {
    if (submitting.current || busy || !canDecide || !conversation?.evidence) return
    if (decision === 'reject' && !note.trim()) { setError(l('请填写退回原因。')); return }
    if (decision === 'approve' && (!confirm || confirm.evidence !== conversation.evidence || confirm.round !== checkpoint.round)) return
    submitting.current = true
    try { if (await onDecision(decision, conversation.evidence, note)) { setConfirm(undefined); setError('') } }
    finally { submitting.current = false }
  }
  const renderResult = (result: ReviewResult) => <section className={css.result} key={result.id}>
    <strong>{result.subject}</strong><p>{result.output || l('尚未提交结果说明')}</p>
    {result.commandsRun.length > 0 && <details><summary>{l('命令记录')} · {result.commandsRun.length}</summary>{result.commandsRun.map((r, i) => <div key={i} className={css.report}><span>{r.status === 'passed' ? l('报告通过') : l('报告失败')}</span><code>{r.command}</code>{r.exitCode !== undefined && <small>{l('退出码')} · {r.exitCode}</small>}<p>{r.evidence || l('未提交证据说明')}</p></div>)}</details>}
    {result.acceptanceResults.length > 0 && <details><summary>{l('上游提交条目')} · {result.acceptanceResults.length}</summary>{result.acceptanceResults.map((r, i) => <p key={i}>{r.criterion} · {r.status === 'passed' ? l('报告通过') : l('报告失败')}{'\n'}{r.evidence || l('未提交证据说明')}</p>)}</details>}
  </section>
  return <aside className={css.workbench} aria-label={l('验收工作台')} data-review-workbench>
    <header className={css.header}><div><small>{l('人工检查点')} · {l('第 {0} 轮', checkpoint.round)}</small><h3 data-review-heading tabIndex={-1}>{task.subject}</h3></div><button type="button" onClick={onBack}>{l('返回节点')}</button></header>
    <div className={css.status}><span>{checkpoint.decision === 'approve' ? l('已通过') : checkpoint.decision === 'reject' ? l('已退回') : ready ? l('等待人工决定') : taskReadiness(team, task, l).label}</span><label>{l('验收轮次')}<select aria-label={l('验收轮次')} value={round} onChange={e => changeRound(e.target.value)}><option value="current">{l('当前轮次')} · {checkpoint.round}</option>{history.map((h, i) => <option key={i} value={String(i)}>{l('第 {0} 轮', h.round)} · {h.decision === 'approve' ? l('通过') : l('退回')}</option>)}</select></label></div>
    <p className={css.hint}>{l('提交记录不等于人工验收通过；没有证据的内容不视为已验证。')}</p>
    <div className={css.body}>
      <nav className={css.criteria} aria-label={l('要求与提交条目')}><strong>{l('要求与提交条目')}</strong><button aria-pressed={selected === 'overview'} onClick={() => setSelected('overview')}><WorkflowIcon name="review" />{l('验收要求与全部证据')}</button>{items.map(i => <button key={i.id} aria-pressed={selected === i.id} onClick={() => setSelected(i.id)}><span>{i.reports.some(r => r.status === 'failed') ? '!' : i.reports.some(r => r.evidence?.trim()) ? '↳' : '?'}</span><span>{i.title}<small>{i.kind === 'report' ? l('上游报告 · {0}', i.source ?? '') : i.reports.some(r => r.evidence?.trim()) ? l('已关联同名提交记录') : l('未关联证据')}</small></span></button>)}{!items.length && <p className={css.hint}>{l('未提供结构化验收条目，请按完整要求核对全部证据。')}</p>}</nav>
      <section className={css.evidence} aria-live="polite"><h4>{item?.title ?? l('验收要求')}</h4>{!item && <p className={css.requirements}>{validMaterial?.check.description || (!historical && !checkpoint.decision ? task.description : undefined) || l('此记录没有保存验收要求快照。')}</p>}
        <div className={css.tabs} role="group" aria-label={l('证据视图')}><button aria-pressed={tab === 'evidence'} onClick={() => setTab('evidence')}>{l('关联证据')}</button><button aria-pressed={tab === 'diff'} onClick={() => setTab('diff')}>{l('与上一轮对比')}</button></div>
        {tab === 'diff' ? <div>{!changes ? <p className={css.hint}>{l('没有可比较的上一轮证据快照；旧记录只有审批信息时，不会重建历史证据。')}</p> : <>
          <p className={css.hint}>{l('比较第 {0} 轮与第 {1} 轮的全部提交记录和文件摘要。', prior!.check.round, validMaterial!.check.round)}</p>
          {changes.requirementsChanged && <section className={css.result}><strong>{l('验收要求已变化')}</strong><div className={css.compare}><section><small>{l('上一轮')}</small><p>{prior!.check.description}</p>{prior!.check.acceptance?.map((text, i) => <p key={i}>{text}</p>)}</section><section><small>{l('当前查看轮次')}</small><p>{validMaterial!.check.description}</p>{validMaterial!.check.acceptance?.map((text, i) => <p key={i}>{text}</p>)}</section></div></section>}
          {changes.results.map(r => <details className={css.result} key={r.id} open><summary>{r.after?.subject ?? r.before?.subject}</summary><div className={css.compare}><section><small>{l('上一轮')}</small>{r.before ? renderResult(r.before) : <p>{l('没有此项记录')}</p>}</section><section><small>{l('当前查看轮次')}</small>{r.after ? renderResult(r.after) : <p>{l('没有此项记录')}</p>}</section></div></details>)}
          {changes.files.map(f => <div className={css.result} key={f.path}><strong>{f.path}</strong><p>{l('文件摘要或可读状态已变化；这里不展示文件内容差异。')}</p><div className={css.compare}><section><small>{l('上一轮')}</small><code>{f.before?.sha256 || l('无可读摘要')}</code></section><section><small>{l('当前查看轮次')}</small><code>{f.after?.sha256 || l('无可读摘要')}</code></section></div></div>)}
          {changes.gapsChanged && <p>{l('文件读取范围缺口已变化，请核对原始证据记录。')}</p>}
          {!changes.results.length && !changes.files.length && !changes.requirementsChanged && !changes.gapsChanged && <p>{l('提交内容与文件摘要未变化。')}</p>}
        </>}</div> : item ? <div>{item.kind === 'report' && <p className={css.hint}>{l('这是上游 Agent 的提交条目，不代表已覆盖检查点的全部要求。')}</p>}{item.reports.length ? item.reports.map((r, i) => <section className={css.result} key={i}><strong>{r.status === 'passed' ? l('报告通过') : l('报告失败')}</strong>{r.source && <small>{r.source}</small>}<p>{r.evidence || l('未提交证据说明')}</p></section>) : <p>{l('未找到同名提交记录。请查看全部证据，或与 AI 讨论缺口。')}</p>}</div> : validMaterial ? <>
          {validMaterial.results.length ? validMaterial.results.map(renderResult) : <p>{l('此检查点没有上游执行结果，请根据验收要求确认是否继续。')}</p>}
          {!!validMaterial.files.length && <details className={css.result}><summary>{l('相关文件')} · {validMaterial.files.length}</summary>{validMaterial.files.map(f => <div className={css.report} key={f.path}><strong>{f.path}</strong><small>{f.unreadable ? l('无法读取') : !f.present ? l('文件不存在') : l('宿主已读取文件摘要')}</small>{f.sha256 && <code>{f.sha256}</code>}{f.reason && <p>{f.reason}</p>}</div>)}</details>}
          {!!validMaterial.gaps.length && <section className={css.result}><strong>{l('文件读取范围缺口')}</strong>{validMaterial.gaps.map((g, i) => <p key={i}>{g.pattern} · {g.reason}</p>)}</section>}
        </> : <p className={css.hint}>{historical || checkpoint.decision ? l('此历史记录没有保存证据快照；仅展示原有审批信息。') : ready ? l('打开或刷新验收材料后，才能提交本轮决定。') : l('检查点尚未就绪，可先查看要求；上游完成且节点启用后再验收。')}</p>}
        {raw && <details className={css.raw}><summary>{l('原始证据记录')}</summary><pre>{raw}</pre></details>}
        {validMaterial?.limitation && <p className={css.hint}>{workflowMessage(validMaterial.limitation, l)}</p>}
        {entry && <section className={css.result}><strong>{l('已保存的验收决定')} · {entry.decision === 'approve' ? l('通过') : l('退回')}</strong><p>{entry.note || l('未填写意见')}</p><small>{new Date(entry.at).toLocaleString()}</small></section>}
      </section>
    </div>
    {!historical && <details className={css.discussion}><summary>{l('与 AI 讨论验收')}</summary>{archived ? <p>{l('恢复并编辑流程后可继续讨论。')}</p> : <>{discussion ?? <button disabled={busy} onClick={onDiscuss}><WorkflowIcon name="chat" />{l(conversation?.native ? '继续在此处讨论' : '在此处开始讨论')}</button>}<p className={css.hint}>{l('讨论使用整个检查点的上下文；聊天不会写入审批决定。')}</p>{onRestart && <details><summary>{l('重新开始讨论')}</summary><p>{l('新建独立讨论会归档当前讨论，从当前资料重新开始。')}</p><button disabled={busy || discussionBusy} onClick={onRestart}>{l('新建独立讨论')}</button></details>}</>}</details>}
    {!historical && !archived && proposal}
    {!historical && checkpoint.decision === 'reject' && <p className={css.notice}>{l('已退回，下游保持等待。可将新返工节点连入此审核节点，自动进入下一轮审核；也可讨论返工对象并确认新方案。')}</p>}
    {!historical && !archived && !checkpoint.decision && <footer className={css.decision}><div className={css.footerTitle}><strong>{l('你的验收决定')}</strong><button disabled={busy || !ready} onClick={onRefresh}>{l('刷新验收材料')}</button></div><label>{l('验收意见（随决定保存）')}<textarea aria-label={l('验收意见')} value={note} maxLength={16000} onChange={e => { onNote(e.target.value); setConfirm(undefined) }} placeholder={l('记录通过或退回的原因…')} /></label><p className={css.hint}>{l('通过后，下游仍按依赖与暂停状态调度：')}{downstream.map(t => t.subject).join('、') || l('无')}</p>
      {issues > 0 && <p className={css.notice}>{l('当前材料有 {0} 项失败记录或文件读取缺口，请核实后决定。', issues)}</p>}
      {error && <p role="alert" className={css.notice}>{error}</p>}
      <div className={css.actions}><button disabled={busy || !canDecide} onClick={() => void decide('reject')}>{l('退回修改')}</button><button className={css.primary} disabled={busy || !canDecide} onClick={() => setConfirm({ evidence: conversation!.evidence!, round: checkpoint.round })}>{l('通过验收')}</button></div>
      {confirm && canDecide && confirm.evidence === conversation?.evidence && <div className={css.confirmation} role="group" aria-label={l('确认本轮验收')}><strong>{l('确认通过第 {0} 轮验收？', checkpoint.round)}</strong><p>{l('请确认已核对要求与证据。Agent 报告通过不代表人工已验证。')}</p><div className={css.actions}><button disabled={busy} onClick={() => setConfirm(undefined)}>{l('继续检查')}</button><button className={css.primary} disabled={busy} onClick={() => void decide('approve')}>{l('确认通过')}</button></div></div>}
    </footer>}
  </aside>
}
