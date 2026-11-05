import { useWorkflowText } from './workflow-i18n.tsx'
/** Editable human approval, shared by the workbench and discussion sidebar. */
import { useEffect, useRef, useState } from 'react'
import type { TeamState } from '../types.ts'
import type { WorkflowOperation, WorkflowProposal } from '../workflow-types.ts'
import { adaptationReviewOperations, lineDiff, proposalIssues, reviewedOperations, reviewFields, setReviewField } from './proposal-review.ts'
import css from './ProposalReview.module.css'
import { TaskRerunImpact } from './TaskRerunPicker.tsx'

export type ProposalReviewDraft = { operations: WorkflowOperation[]; included: boolean[] }
export function ProposalReview({ team, proposal, base, busy, onApply, onDismiss, draft, onChange, fixedStructure=false, focusRequest=0 }: {
  fixedStructure?: boolean
  focusRequest?: number
  team: TeamState; proposal: WorkflowProposal; base: string; busy: boolean;
  onApply: (operations: WorkflowOperation[]) => void; onDismiss: () => void;
  draft?: ProposalReviewDraft; onChange: (draft: ProposalReviewDraft) => void;
}) {
  const l = useWorkflowText()

  const [original] = useState(() => structuredClone(team))
  const root = useRef<HTMLElement>(null)
  const [selectedIndex, setSelectedIndex] = useState(() => proposalIssues(team, draft?.operations ?? proposal.operations, draft?.included ?? proposal.operations.map(() => true))[0]?.index ?? 0)
  const operations = draft?.operations ?? proposal.operations
  const included = draft?.included ?? proposal.operations.map(() => true)
  const issues = proposalIssues(original, operations, included)
  const blockedByIssue = !fixedStructure && issues.some(issue => issue.blocksApply)
  function jumpToItem(index: number, issue = false) {
    setSelectedIndex(index)
    requestAnimationFrame(() => {
      const article = root.current?.querySelector<HTMLElement>('[data-review-index="' + index + '"]')
      const target = article?.querySelector<HTMLElement>(issue ? '[data-field="adaptationIssue"] textarea' : 'textarea, input') ?? article
      target?.focus({preventScroll:true}); target?.scrollIntoView({block:'nearest'})
    })
  }
  useEffect(() => {
    if (focusRequest) jumpToItem(issues[0]?.index ?? 0, !!issues.length)
  }, [focusRequest])
  const effective = reviewedOperations(original, fixedStructure ? adaptationReviewOperations(original, operations) : operations, included)
  const stale = base !== proposal.base
  const missingRerunInstructions = effective.some(operation => operation.action === 'rerun_task' && !operation.instructions?.trim())
  const edited = JSON.stringify(operations) !== JSON.stringify(proposal.operations) || included.some(value => !value)
  return <section ref={root} data-generated={fixedStructure} className={css.review} aria-label={l("审批修改对照")}>
    <header><strong>{l("待确认修改 · ")}{proposal.title}</strong><p>{fixedStructure ? l("逐项检查本次生成的任务。所有修改会在确认后一起应用。") : l("绿色 + 新增 · 红色 − 删除 · = 相同。可直接编辑「之后」，确认后生效。")}</p></header>
    {!!issues.length && <div className={css.issues} role="status"><strong>{l("有 {0} 项需要确认的问题", issues.length)}</strong><p>{l("请先补充任务要求，再明确标记问题已解决。仅修改任务正文不会自动清除问题。")}</p>
      {issues.map(issue => <button key={issue.index} type="button" onClick={() => jumpToItem(issue.index, true)}>{l("定位问题 · {0}", reviewFields(original, operations[issue.index]!, l).title)}</button>)}
      {!blockedByIssue && <p>{l("应用后仍有问题的任务会保持待配置，不会执行。")}</p>}
    </div>}
    {missingRerunInstructions && <p role="alert">{l("请在「本次要求」中填写重跑的新要求后再确认。")}</p>}
    {stale && <p role="alert">{l("团队已变化，此提案已过期。请与 AI 重新确认，避免覆盖新结果。")}</p>}
    {!effective.length && <p role="status">{l("当前没有要应用的改动，可以继续编辑或放弃修改。")}</p>}
    {fixedStructure && operations.length > 0 && <label className={css.itemPicker}>
      <span>{l("选择要检查的项目")} · {selectedIndex + 1} / {operations.length}</span>
      <select value={selectedIndex} onChange={event => jumpToItem(Number(event.target.value))}>
        {operations.map((operation, index) => <option key={index} value={index}>{index + 1}. {reviewFields(original, operation, l).title}</option>)}
      </select>
    </label>}
    {operations.map((operation, index) => {
      if (fixedStructure && selectedIndex !== index) return null
      const comparison = reviewFields(original, operation, l)
      return <article key={index} tabIndex={-1} data-review-index={index} className={css.operation} data-included={included[index]}>{fixedStructure ? <h4>{comparison.title}</h4> : <label className={css.include}><input type="checkbox" checked={included[index]} disabled={busy || fixedStructure} onChange={event => onChange({ operations, included: included.map((value, i) => i === index ? event.target.checked : value) })} />{l("应用此项 · ")}{comparison.title}</label>}
        {operation.action === 'rerun_task' && <><p>{l("上一轮结果（自动提供给 Agent）：")}</p><pre>{original.tasks.find(task=>task.id===operation.id)?.output || l("上一轮未提交结果")}</pre><TaskRerunImpact tasks={original.tasks} taskId={operation.id} /></>}
        {comparison.fields.filter(field=>!fixedStructure || field.key==='description' || field.key==='adaptationIssue' || field.key==='specificPrompt').map(field => {
          const same = field.before === field.after
          return <section key={field.key} data-field={field.key} className={css.field} data-change={same ? 'same' : !field.before ? 'added' : !field.after ? 'removed' : 'changed'}><div className={css.fieldHeading}><strong>{field.label}</strong><span>{same ? l("= 相同") : !field.before ? l("+ 新增") : !field.after ? l("− 删除") : l("± 修改")}</span></div>
            <div className={css.pair}>{!fixedStructure && <div><span className={css.caption}>{l("之前")}</span><pre>{field.before || l("（空）")}</pre></div>}<label><span className={css.caption}>{l("之后")}{field.editable ? l(" · 可编辑") : ''}</span>{field.editable ? <textarea aria-label={l("{0} · {1} · 之后", comparison.title, field.label)} rows={Math.min(12, Math.max(field.key === 'description' ? 7 : 2, field.after.split('\n').length))} value={field.after} disabled={busy || !included[index]} onChange={event => onChange({ included, operations: operations.map((op, i) => i === index ? setReviewField(op, field, event.target.value) : op) })} /> : <pre>{field.after || l("（空）")}</pre>}</label></div>
            {field.key === 'adaptationIssue' && !!field.after.trim() && <button type="button" disabled={busy || !included[index]} onClick={() => onChange({included,operations:operations.map((op,i)=>i === index ? setReviewField(op,field,'') : op)})}>{l("已解决，清除问题")}</button>}
            {!same && <details open={!fixedStructure}><summary>{l("逐行差异")}</summary><div className={css.diff}>{lineDiff(field.before, field.after).map((line, i) => <div key={i} data-kind={line.kind}><span aria-label={line.kind === 'same' ? l("相同") : line.kind === 'added' ? l("新增") : l("删除")}>{line.kind === 'same' ? '=' : line.kind === 'added' ? '+' : '−'}</span><code>{line.text || ' '}</code></div>)}</div></details>}
          </section>
        })}
      </article>
    })}
    <div className={css.actions}><button type="button" className={css.apply} disabled={busy || stale || missingRerunInstructions || blockedByIssue || effective.length === 0} onClick={() => onApply(effective)}>{edited ? l("确认应用编辑后的内容") : l("确认应用")}</button><button type="button" disabled={busy} onClick={onDismiss}>{l("放弃修改")}</button>{edited && <button type="button" disabled={busy} onClick={() => onChange({ operations: structuredClone(proposal.operations), included: proposal.operations.map(() => true) })}>{l("恢复 AI 建议")}</button>}</div>
  </section>
}
