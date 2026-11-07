import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useWorkflowText } from "./workflow-i18n.js";
import { rerunImpact, rerunnableTasks } from "../task-rerun.js";
import css from './TaskRerunPicker.module.css';
export function TaskRerunImpact({ tasks, taskId }) {
    const l = useWorkflowText();
    const impact = rerunImpact(tasks, taskId);
    return _jsxs("div", { className: css.impact, children: [_jsx("p", { children: l("所选任务开启新一轮执行，原有状态和提交结果保存在历史执行记录中。旧验证证据不作为本轮证据，无关分支保持不变。") }), !!impact.descendants.length && _jsxs("p", { children: [l("以下下游节点需使用新结果；可选任意节点点击「运行到此节点」，人工检查仍需确认："), impact.descendants.map(task => task.subject).join('、'), l("。此前结果与验收不再用于本轮。")] }), !!impact.active.length && _jsxs("p", { role: "alert", children: [l("请先停止受影响的运行任务："), impact.active.map(task => task.subject).join('、')] })] });
}
export function TaskRerunPicker({ tasks, member, taskId, onTask, disabled }) {
    const l = useWorkflowText();
    const candidates = rerunnableTasks(tasks, member);
    if (!candidates.length)
        return null;
    return _jsxs("fieldset", { className: css.picker, children: [_jsx("legend", { children: l("单独重跑") }), _jsxs("label", { className: css.field, children: [l("重跑任务"), _jsx("select", { value: taskId, disabled: disabled, onChange: event => onTask(event.target.value), children: candidates.map(task => _jsxs("option", { value: task.id, children: [task.subject, "\uFF08", task.id, "\uFF09"] }, task.id)) })] }), _jsx("p", { children: l("保存成员后进入任务编辑，查看上一轮结果并填写本轮要求，再确认重跑。") })] });
}
