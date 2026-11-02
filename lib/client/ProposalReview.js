import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useWorkflowText } from "./workflow-i18n.js";
/** Editable human approval, shared by the workbench and discussion sidebar. */
import { useState } from 'react';
import { lineDiff, reviewedOperations, reviewFields, setReviewField } from "./proposal-review.js";
import css from './ProposalReview.module.css';
import { TaskRerunImpact } from "./TaskRerunPicker.js";
export function ProposalReview({ team, proposal, base, busy, onApply, onDismiss, draft, onChange, fixedStructure = false }) {
    const l = useWorkflowText();
    const [original] = useState(() => structuredClone(team));
    const operations = draft?.operations ?? proposal.operations;
    const included = draft?.included ?? proposal.operations.map(() => true);
    const effective = reviewedOperations(original, operations, included);
    const stale = base !== proposal.base;
    const missingRerunInstructions = effective.some(operation => operation.action === 'rerun_task' && !operation.instructions?.trim());
    const edited = JSON.stringify(operations) !== JSON.stringify(proposal.operations) || included.some(value => !value);
    return _jsxs("section", { className: css.review, "aria-label": l("审批修改对照"), children: [_jsxs("header", { children: [_jsxs("strong", { children: [l("待确认修改 · "), proposal.title] }), _jsx("p", { children: l("绿色 + 新增 · 红色 − 删除 · = 相同。可直接编辑「之后」，确认后生效。") })] }), _jsxs("div", { className: css.actions, children: [_jsx("button", { type: "button", className: css.apply, disabled: busy || stale || missingRerunInstructions || effective.length === 0, onClick: () => onApply(effective), children: edited ? l("确认应用编辑后的内容") : l("确认应用") }), _jsx("button", { type: "button", disabled: busy, onClick: onDismiss, children: l("放弃修改") }), edited && _jsx("button", { type: "button", disabled: busy, onClick: () => onChange({ operations: structuredClone(proposal.operations), included: proposal.operations.map(() => true) }), children: l("恢复 AI 建议") })] }), missingRerunInstructions && _jsx("p", { role: "alert", children: l("请在「本次要求」中填写重跑的新要求后再确认。") }), stale && _jsx("p", { role: "alert", children: l("团队已变化，此提案已过期。请与 AI 重新确认，避免覆盖新结果。") }), !effective.length && _jsx("p", { role: "status", children: l("当前没有要应用的改动，可以继续编辑或放弃修改。") }), operations.map((operation, index) => {
                const comparison = reviewFields(original, operation, l);
                if (fixedStructure)
                    for (const field of comparison.fields)
                        field.editable = field.key === 'description' || field.key === 'adaptationIssue' || field.key === 'specificPrompt';
                return _jsxs("article", { className: css.operation, "data-included": included[index], children: [_jsxs("label", { className: css.include, children: [_jsx("input", { type: "checkbox", checked: included[index], disabled: busy || fixedStructure, onChange: event => onChange({ operations, included: included.map((value, i) => i === index ? event.target.checked : value) }) }), l("应用此项 · "), comparison.title] }), operation.action === 'rerun_task' && _jsxs(_Fragment, { children: [_jsx("p", { children: l("上一轮结果（自动提供给 Agent）：") }), _jsx("pre", { children: original.tasks.find(task => task.id === operation.id)?.output || l("上一轮未提交结果") }), _jsx(TaskRerunImpact, { tasks: original.tasks, taskId: operation.id })] }), comparison.fields.filter(field => !fixedStructure || field.key === 'description' || field.key === 'adaptationIssue' || field.key === 'specificPrompt').map(field => {
                            const same = field.before === field.after;
                            return _jsxs("section", { className: css.field, "data-change": same ? 'same' : !field.before ? 'added' : !field.after ? 'removed' : 'changed', children: [_jsxs("div", { className: css.fieldHeading, children: [_jsx("strong", { children: field.label }), _jsx("span", { children: same ? l("= 相同") : !field.before ? l("+ 新增") : !field.after ? l("− 删除") : l("± 修改") })] }), _jsxs("div", { className: css.pair, children: [_jsxs("div", { children: [_jsx("span", { className: css.caption, children: l("之前") }), _jsx("pre", { children: field.before || l("（空）") })] }), _jsxs("label", { children: [_jsxs("span", { className: css.caption, children: [l("之后"), field.editable ? l(" · 可编辑") : ''] }), field.editable ? _jsx("textarea", { "aria-label": l("{0} · {1} · 之后", comparison.title, field.label), rows: Math.min(9, Math.max(2, field.after.split('\n').length)), value: field.after, disabled: busy || !included[index], onChange: event => onChange({ included, operations: operations.map((op, i) => i === index ? setReviewField(op, field, event.target.value) : op) }) }) : _jsx("pre", { children: field.after || l("（空）") })] })] }), !same && _jsxs("details", { open: !fixedStructure, children: [_jsx("summary", { children: l("逐行差异") }), _jsx("div", { className: css.diff, children: lineDiff(field.before, field.after).map((line, i) => _jsxs("div", { "data-kind": line.kind, children: [_jsx("span", { "aria-label": line.kind === 'same' ? l("相同") : line.kind === 'added' ? l("新增") : l("删除"), children: line.kind === 'same' ? '=' : line.kind === 'added' ? '+' : '−' }), _jsx("code", { children: line.text || ' ' })] }, i)) })] })] }, field.key);
                        })] }, index);
            })] });
}
