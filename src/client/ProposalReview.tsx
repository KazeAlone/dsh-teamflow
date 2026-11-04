import { useWorkflowText } from './workflow-i18n.tsx'
/** Editable human approval, shared by the workbench and discussion sidebar. */
import { useState } from 'react'
import type { TeamState } from '../types.ts'
import type { WorkflowOperation, WorkflowProposal } from '../workflow-types.ts'
import { lineDiff, reviewedOperations, reviewFields, setReviewField } from './proposal-review.ts'
import css from './ProposalReview.module.css'
import { TaskRerunImpact } from './TaskRerunPicker.tsx'

export type ProposalReviewDraft = { operations: WorkflowOperation[]; included: boolean[] }
export function ProposalReview({ team, proposal, base, busy, onApply, onDismiss, draft, onChange, fixedStructure=false }: {
  fixedStructure?: boolean
  team: TeamState; proposal: WorkflowProposal; base: string; busy: boolean;
  onApply: (operations: WorkflowOperation[]) => void; onDismiss: () => void;
  draft?: ProposalReviewDraft; onChange: (draft: ProposalReviewDraft) => void;
}) {
  const l = useWorkflowText()

  const [original] = useState(() => structuredClone(team))
  const [selectedIndex, setSelectedIndex] = useState(0)
  const operations = draft?.operations ?? proposal.operations
  const included = draft?.included ?? proposal.operations.map(() => true)
  const effective = reviewedOperations(original, operations, included)
  const stale = base !== proposal.base
  const missingRerunInstructions = effective.some(operation => operation.action === 'rerun_task' && !operation.instructions?.trim())
  const edited = JSON.stringify(operations) !== JSON.stringify(proposal.operations) || included.some(value => !value)
  return <section data-generated={fixedStructure} className={css.review} aria-label={l("审批修改对照")}>
    <header><strong>{l("待确认修改 · ")}{proposal.title}</strong><p>{fixedStructure ? l("逐项检查本次生成的任务。所有修改会在确认后一起应用。") : l("绿色 + 新增 · 红色 − 删除 · = 相同。可直接编辑「之后」，确认后生效。")}</p></header>
    {missingRerunInstructions && <p role="alert">{l("请在「本次要求」中填写重跑的新要求后再确认。")}</p>}
    {stale && <p role="alert">{l("团队已变化，此提案已过期。请与 AI 重新确认，避免覆盖新结果。")}</p>}
    {!effective.length && <p role="status">{l("当前没有要应用的改动，可以继续编辑或放弃修改。")}</p>}
    {fixedStructure && operations.length > 0 && <label className={css.itemPicker}>
      <span>{l("选择要检查的项目")} · {selectedIndex + 1} / {operations.length}</span>
      <select value={selectedIndex} onChange={event => setSelectedIndex(Number(event.target.value))}>
        {operations.map((operation, index) => <option key={index} value={index}>{index + 1}. {reviewFields(original, operation, l).title}</option>)}
      </select>
    </label>}
    {operations.map((operation, index) => {
      if (fixedStructure && selectedIndex !== index) return null
      const comparison = reviewFields(original, operation, l)
      return <article key={index} className={css.operation} data-included={included[index]}>{fixedStructure ? <h4>{comparison.title}</h4> : <label className={css.include}><input type="checkbox" checked={included[index]} disabled={busy || fixedStructure} onChange={event => onChange({ operations, included: included.map((value, i) => i === index ? event.target.checked : value) })} />{l("应用此项 · ")}{comparison.title}</label>}
        {operation.action === 'rerun_task' && <><p>{l("上一轮结果（自动提供给 Agent）：")}</p><pre>{original.tasks.find(task=>task.id===operation.id)?.output || l("上一轮未提交结果")}</pre><TaskRerunImpact tasks={original.tasks} taskId={operation.id} /></>}
        {comparison.fields.filter(field=>!fixedStructure || field.key==='description' || field.key==='adaptationIssue' || field.key==='specificPrompt').map(field => {
          const same = field.before === field.after
          return <section key={field.key} className={css.field} data-change={same ? 'same' : !field.before ? 'added' : !field.after ? 'removed' : 'changed'}><div className={css.fieldHeading}><strong>{field.label}</strong><span>{same ? l("= 相同") : !field.before ? l("+ 新增") : !field.after ? l("− 删除") : l("± 修改")}</span></div>
            <div className={css.pair}>{!fixedStructure && <div><span className={css.caption}>{l("之前")}</span><pre>{field.before || l("（空）")}</pre></div>}<label><span className={css.caption}>{l("之后")}{field.editable ? l(" · 可编辑") : ''}</span>{field.editable ? <textarea aria-label={l("{0} · {1} · 之后", comparison.title, field.label)} rows={Math.min(12, Math.max(field.key === 'description' ? 7 : 2, field.after.split('\n').length))} value={field.after} disabled={busy || !included[index]} onChange={event => onChange({ included, operations: operations.map((op, i) => i === index ? setReviewField(op, field, event.target.value) : op) })} /> : <pre>{field.after || l("（空）")}</pre>}</label></div>
            {!same && <details open={!fixedStructure}><summary>{l("逐行差异")}</summary><div className={css.diff}>{lineDiff(field.before, field.after).map((line, i) => <div key={i} data-kind={line.kind}><span aria-label={line.kind === 'same' ? l("相同") : line.kind === 'added' ? l("新增") : l("删除")}>{line.kind === 'same' ? '=' : line.kind === 'added' ? '+' : '−'}</span><code>{line.text || ' '}</code></div>)}</div></details>}
          </section>
        })}
      </article>
    })}
    <div className={css.actions}><button type="button" className={css.apply} disabled={busy || stale || missingRerunInstructions || effective.length === 0} onClick={() => onApply(effective)}>{edited ? l("确认应用编辑后的内容") : l("确认应用")}</button><button type="button" disabled={busy} onClick={onDismiss}>{l("放弃修改")}</button>{edited && <button type="button" disabled={busy} onClick={() => onChange({ operations: structuredClone(proposal.operations), included: proposal.operations.map(() => true) })}>{l("恢复 AI 建议")}</button>}</div>
  </section>
}
