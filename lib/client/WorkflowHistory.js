import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { workflowRequest } from "./workflow-request.js";
import { workflowMessage } from "./workflow-text.js";
import { useWorkflowText } from "./workflow-i18n.js";
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import css from './WorkflowWorkbench.module.css';
import { publishWorkflowActivity } from "./activity-monitor.js";
/** History comes from activity snapshots, never from the mutable workflow API. */
export function WorkflowHistory({ name, children, restore }) {
    const l = useWorkflowText();
    const dialog = useRef(null);
    const [busy, setBusy] = useState(false), [error, setError] = useState(''), [restored, setRestored] = useState(false);
    async function restoreWorkflow() {
        if (!restore || busy)
            return;
        setBusy(true);
        setError('');
        try {
            const result = await workflowRequest({ action: 'restore_archive', sessionId: restore.sessionId, teamId: restore.teamId });
            if (!result.activity)
                throw new Error(result.error ?? l("恢复失败，请重新连接后重试"));
            setRestored(true);
            dialog.current?.close();
            publishWorkflowActivity(result.activity);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        }
        finally {
            setBusy(false);
        }
    }
    return _jsxs(_Fragment, { children: [_jsxs("button", { type: "button", className: `${css.entry} ${css.launcher}`, "aria-haspopup": "dialog", onClick: () => dialog.current?.showModal(), children: [_jsxs("strong", { children: [l("团队与流程 "), _jsx("span", { "aria-hidden": true, children: "\u2197" })] }), _jsxs("span", { children: [name, " ", l(" · 历史记录，只读")] })] }), createPortal(_jsxs("dialog", { ref: dialog, className: `${css.entry} ${css.historyDialog}`, "aria-label": l("{0} · 团队与流程（只读）", name), children: [_jsxs("header", { children: [_jsxs("div", { children: [_jsx("strong", { children: name }), _jsx("p", { children: l("历史记录 · 只读") })] }), _jsx("button", { type: "button", autoFocus: true, onClick: () => dialog.current?.close(), children: l("关闭") })] }), restore && _jsxs("section", { children: [_jsx("p", { children: l("可恢复为待确认流程：保留已完成成果与原归档，重新建立空闲成员；不会自动执行。请确认成员配置后启动，人工节点仍需正式验收。") }), _jsx("button", { type: "button", disabled: busy || restored, onClick: () => void restoreWorkflow(), children: busy ? l("正在恢复…") : restored ? l("已恢复，请查看当前团队") : l("恢复为待确认流程") }), error && _jsx("p", { role: "alert", children: workflowMessage(error, l) })] }), children] }), document.body)] });
}
