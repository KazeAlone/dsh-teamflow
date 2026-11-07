import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { workflowRequest } from "./workflow-request.js";
import { workflowMessage } from "./workflow-text.js";
import { useWorkflowText } from "./workflow-i18n.js";
/** Inline member configuration in the activity list, saved via the same workflow API as the canvas. */
import { useEffect, useState } from 'react';
import { StagedModelPicker } from "./StagingPlanEditor.js";
import css from './ActivityPanel.module.css';
import { TaskRerunPicker } from "./TaskRerunPicker.js";
import { rerunnableTasks } from "../task-rerun.js";
async function request(payload, signal) {
    return workflowRequest(payload, fetch, undefined, signal);
}
export function QuickMemberEditor({ team, member, directory, t, close, onRerun }) {
    const l = useWorkflowText(t);
    const [base, setBase] = useState('');
    const [role, setRole] = useState(member.role);
    const [route, setRoute] = useState({ provider: '', model: '', reasoningEffort: '' });
    const [routeChanged, setRouteChanged] = useState(false);
    const [busy, setBusy] = useState(true);
    const [error, setError] = useState('');
    const [tasks, setTasks] = useState([]);
    const [rerunId, setRerunId] = useState('');
    useEffect(() => {
        let live = true;
        const controller = new AbortController();
        setBusy(true);
        setError('');
        void request({ action: 'state', sessionId: team.captainSessionId, teamId: team.teamId }, controller.signal).then(result => {
            const current = result.team.members.find(item => item.name === member.name);
            if (!current)
                throw new Error(l("成员不存在"));
            if (live) {
                setBase(result.base);
                setRole(current.role ?? '');
                setRoute({ provider: current.provider ?? '', model: current.model ?? '', reasoningEffort: current.reasoningEffort ?? '' });
                setRouteChanged(false);
                setTasks(result.team.tasks);
                setRerunId(rerunnableTasks(result.team.tasks, member.name).at(-1)?.id ?? '');
            }
        }).catch(err => { if (live)
            setError(err instanceof Error ? err.message : String(err)); }).finally(() => { if (live)
            setBusy(false); });
        return () => { live = false; controller.abort(); };
    }, [team.captainSessionId, team.teamId, member.name]);
    async function save(rerun = false) {
        setBusy(true);
        setError('');
        try {
            const operations = [{ action: 'update_member', name: member.name, role, ...(routeChanged ? { ...route, reasoningEffort: route.reasoningEffort || 'default' } : {}) }];
            if (rerun && !rerunId)
                throw new Error(l("请选择重跑任务"));
            await request({ action: 'edit', sessionId: team.captainSessionId, teamId: team.teamId, title: l("调整 {0} 的配置{1}", member.name, rerun ? l("并进入任务编辑") : ''), base, operations });
            if (rerun)
                onRerun(rerunId);
            close();
        }
        catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        }
        finally {
            setBusy(false);
        }
    }
    return _jsxs("form", { className: css.quickMember, "aria-label": l("配置 {0}", member.name), onSubmit: event => { event.preventDefault(); void save(event.nativeEvent.submitter?.getAttribute('data-rerun') === 'true'); }, children: [_jsxs("strong", { children: [l("配置 · "), member.name] }), _jsx(StagedModelPicker, { directory: directory, t: t, ...route, busy: busy || !base, onChange: value => { setRoute(value); setRouteChanged(true); } }), _jsxs("label", { children: [l("职责"), _jsx("textarea", { value: role, disabled: busy || !base, onChange: event => setRole(event.target.value) })] }), _jsx(TaskRerunPicker, { tasks: tasks, member: member.name, taskId: rerunId, disabled: busy || !base, onTask: setRerunId }), error && _jsx("p", { role: "alert", children: workflowMessage(error, l) }), _jsxs("div", { children: [_jsx("button", { type: "submit", disabled: busy || !base, children: l("保存") }), rerunId && _jsx("button", { type: "submit", "data-rerun": "true", disabled: busy || !base, children: l("保存成员并编辑重跑要求") }), _jsx("button", { type: "button", disabled: busy, onClick: close, children: l("取消") })] })] });
}
