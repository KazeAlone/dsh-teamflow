import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { WorkflowLocale, useWorkflowText } from "./workflow-i18n.js";
import { workflowMessage } from "./workflow-text.js";
import { WorkflowWorkbench } from "./WorkflowWorkbench.js";
import { TemplateGallery } from "./TemplateGallery.js";
import { BrandIcon } from "./BrandIcon.js";
import { selectedWorkflowWorkspace, workflowLauncherRequest, WorkflowLaunchController } from "./workflow-launcher.js";
import css from './WorkflowLauncher.module.css';
function Launcher({ sessions, workspaces, uiWorkspace, modelDirectories, t, openMember }) {
    const l = useWorkflowText();
    const workspaceSource = useMemo(() => ({ subscribe: (listener) => workspaces.list.subscribe(listener), getSnapshot: () => workspaces.list.getSnapshot() }), [workspaces]);
    const sessionSource = useMemo(() => ({ subscribe: (listener) => sessions.list.subscribe(listener), getSnapshot: () => sessions.list.getSnapshot() }), [sessions]);
    const workspaceState = useSyncExternalStore(workspaceSource.subscribe, workspaceSource.getSnapshot);
    const sessionState = useSyncExternalStore(sessionSource.subscribe, sessionSource.getSnapshot);
    const currentWorkspace = selectedWorkflowWorkspace(workspaceState.items, sessionState);
    const [pending, setPending] = useState();
    const [created, setCreated] = useState();
    const [busy, setBusy] = useState(false), [error, setError] = useState('');
    const [directoryMode, setDirectoryMode] = useState('unavailable');
    const [adding, setAdding] = useState(false), [path, setPath] = useState('');
    const controller = useRef(), lifetime = useRef();
    const busyRef = useRef(false), choiceHeading = useRef(null);
    useEffect(() => {
        const abort = new AbortController(), instance = new WorkflowLaunchController(sessions);
        lifetime.current = abort;
        controller.current = instance;
        void workflowLauncherRequest('launcher_context').then(result => { if (!abort.signal.aborted)
            setDirectoryMode(result.directoryPicker ?? 'unavailable'); }).catch(() => { });
        return () => { abort.abort(); instance.dispose(); };
    }, [sessions]);
    useEffect(() => { if (pending)
        choiceHeading.current?.focus(); }, [pending]);
    async function run(action) {
        if (busyRef.current)
            return;
        busyRef.current = true;
        setBusy(true);
        setError('');
        try {
            await action();
        }
        catch (error) {
            if (!lifetime.current?.signal.aborted)
                setError(error instanceof Error ? error.message : String(error));
        }
        finally {
            busyRef.current = false;
            if (!lifetime.current?.signal.aborted)
                setBusy(false);
        }
    }
    async function launch(input, workspace) {
        const result = await controller.current.launch(input, workspace, lifetime.current.signal);
        setCreated({ sessionId: result.sessionId, teamId: result.team.id });
        setPending(undefined);
    }
    async function adoptDirectory(directory) {
        lifetime.current.signal.throwIfAborted();
        const workspace = await workspaces.create({ path: directory });
        lifetime.current.signal.throwIfAborted();
        if (pending)
            await launch(pending, workspace);
    }
    async function addWorkspace() {
        if (directoryMode === 'native') {
            const chosen = await uiWorkspace.pickDirectory();
            if (chosen)
                await adoptDirectory(chosen);
        }
        else
            setAdding(true);
    }
    return _jsxs("main", { className: css.launcher, "aria-label": "Workflow", children: [_jsxs("header", { className: css.header, children: [_jsx(BrandIcon, { size: 26 }), _jsxs("div", { children: [_jsx("h1", { children: "Workflow" }), _jsx("p", { children: l("先选择模板、填写需求，再选择工作区。") })] }), currentWorkspace && _jsx("span", { children: l("当前工作区 · {0}", currentWorkspace.title) })] }), error && _jsx("p", { className: css.error, role: "alert", children: workflowMessage(error, l) }), _jsx("div", { hidden: !!pending || !!created, className: css.gallery, children: _jsx(TemplateGallery, { onApply: async (template, name, goal) => {
                        const input = { template, name, goal, language: l.language };
                        setPending(input);
                        if (currentWorkspace)
                            await run(() => launch(input, currentWorkspace));
                    } }) }), pending && !created && _jsxs("section", { className: css.choose, "aria-label": l("选择流程工作区"), children: [_jsx("button", { type: "button", disabled: busy, onClick: () => { setPending(undefined); setError(''); }, children: l("返回修改需求") }), _jsx("h2", { ref: choiceHeading, tabIndex: -1, children: l("选择工作区") }), _jsx("p", { children: l("模板和需求已保留。选择工作区后，将在其中的新对话中创建流程。") }), _jsxs("div", { className: css.summary, children: [_jsx("strong", { children: pending.name }), _jsx("p", { children: pending.goal })] }), !!workspaceState.items.length && _jsxs("div", { className: css.projects, children: [_jsx("h3", { children: l("已有工作区") }), workspaceState.items.map(workspace => _jsxs("button", { type: "button", disabled: busy, onClick: () => void run(() => launch(pending, workspace)), children: [_jsx("strong", { children: workspace.title }), _jsx("small", { children: workspace.path })] }, workspace.workspaceId))] }), workspaceState.state === 'loading' && _jsx("p", { role: "status", children: l("正在读取工作区…") }), workspaceState.state === 'error' && _jsx("p", { role: "alert", children: l("工作区列表读取失败，仍可添加工作区。") }), _jsx("button", { className: css.primary, type: "button", disabled: busy, onClick: () => void run(addWorkspace), children: busy ? l("正在准备工作区与流程…") : l("添加工作区") }), _jsx("p", { className: css.hint, children: directoryMode === 'native' ? l("可选择已有文件夹；需要新目录时，可在文件夹选择器中新建。") : l("输入工作区所在机器上的完整文件夹路径") }), adding && _jsxs("form", { onSubmit: event => { event.preventDefault(); void run(() => adoptDirectory(path.trim())); }, children: [_jsxs("label", { children: [l("工作区文件夹"), _jsx("input", { required: true, value: path, disabled: busy, onChange: event => setPath(event.target.value), placeholder: l("输入工作区所在机器上的完整文件夹路径") })] }), _jsx("button", { disabled: busy || !path.trim(), children: l("添加并继续") })] })] }), created && _jsx(WorkflowWorkbench, { sessionId: created.sessionId, teamId: created.teamId, initiallyOpen: true, entryDiscussion: "adapt", t: t, modelDirectory: modelDirectories.directoryFor(created.sessionId), openExecution: (target, parent) => openMember((parent ?? created.sessionId), target), onClose: () => { setCreated(undefined); controller.current?.release(); } }, created.sessionId)] });
}
export function WorkflowLauncher(props) { return _jsx(WorkflowLocale, { t: props.t, children: _jsx(Launcher, { ...props }) }); }
