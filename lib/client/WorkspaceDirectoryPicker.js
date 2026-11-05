import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { Button, Modal } from '@deepseek-ai/dsh-client-ui-primitives';
import { useWorkflowText } from "./workflow-i18n.js";
import css from './WorkspaceDirectoryPicker.module.css';
/** Uses the same host directory API and modal primitives as DSH's workspace browser. */
export function WorkspaceDirectoryPicker({ workspace, onPick, onClose }) {
    const l = useWorkflowText();
    const [listing, setListing] = useState();
    const [target, setTarget] = useState({});
    const [loading, setLoading] = useState(true), [busy, setBusy] = useState(false), [error, setError] = useState('');
    const [hidden, setHidden] = useState(false), [editing, setEditing] = useState(false), [path, setPath] = useState('');
    const [creating, setCreating] = useState(false), [name, setName] = useState('');
    const alive = useRef(true), working = useRef(false);
    useEffect(() => { alive.current = true; return () => { alive.current = false; }; }, []);
    useEffect(() => {
        const abort = new AbortController();
        setLoading(true);
        setError('');
        void workspace.listDirectory(target.path, abort.signal).then(value => {
            if (!abort.signal.aborted) {
                setListing(value);
                setPath(value.path);
                setLoading(false);
            }
        }).catch(err => { if (!abort.signal.aborted) {
            setError(String(err instanceof Error ? err.message : err));
            setLoading(false);
        } });
        return () => abort.abort();
    }, [workspace, target]);
    function navigate(path) { setEditing(false); setTarget({ path }); }
    async function perform(action) {
        if (working.current)
            return;
        working.current = true;
        setBusy(true);
        setError('');
        try {
            await action();
        }
        catch (err) {
            if (alive.current)
                setError(err instanceof Error ? err.message : String(err));
        }
        finally {
            working.current = false;
            if (alive.current)
                setBusy(false);
        }
    }
    const blocked = loading || busy || creating;
    return _jsxs(Modal, { open: true, title: l("选择工作区目录"), closeLabel: l("取消"), onClose: () => { if (!busy)
            onClose(); }, className: css.modal, contentClassName: css.content, footer: _jsxs("div", { className: css.footer, children: [_jsx(Button, { variant: "outline", disabled: blocked || !listing || !!error, onClick: () => { setCreating(true); setName(''); }, children: l("新建文件夹") }), _jsx(Button, { "aria-pressed": hidden, disabled: busy || creating, onClick: () => setHidden(!hidden), children: hidden ? l("隐藏隐藏文件") : l("显示隐藏文件") }), _jsx("span", {}), _jsx(Button, { variant: "outline", disabled: busy, onClick: onClose, children: l("取消") }), _jsx(Button, { variant: "primary", disabled: blocked || !listing || !!error || editing, onClick: () => void perform(() => onPick(listing.path)), children: busy ? l("正在准备工作区与流程…") : l("打开") })] }), children: [_jsxs("div", { className: css.navigation, children: [_jsxs("nav", { "aria-label": l("目录路径"), children: [_jsx(Button, { size: "sm", disabled: busy || creating, onClick: () => navigate(), children: l("主目录") }), listing?.crumbs.map(crumb => _jsx(Button, { size: "sm", disabled: busy || creating, title: crumb.path, onClick: () => navigate(crumb.path), children: crumb.name }, crumb.path))] }), _jsx(Button, { size: "sm", disabled: busy || creating, onClick: () => { setPath(target.path ?? listing?.path ?? ''); setEditing(!editing); }, children: l("编辑路径") })] }), editing && _jsxs("form", { className: css.path, onSubmit: event => { event.preventDefault(); if (path.trim())
                    navigate(path.trim()); }, children: [_jsx("input", { autoFocus: true, "aria-label": l("目录路径"), value: path, onChange: event => setPath(event.target.value) }), _jsx(Button, { type: "submit", disabled: !path.trim() || busy, children: l("前往") })] }), error && _jsxs("div", { role: "alert", className: css.error, children: [error, _jsx(Button, { size: "sm", disabled: busy, onClick: () => setTarget({ ...target }), children: l("重试") })] }), creating && _jsxs("form", { className: css.create, onSubmit: event => {
                    event.preventDefault();
                    if (!name.trim() || !listing)
                        return;
                    void perform(async () => {
                        const created = await workspace.createDirectory(listing.path, name.trim());
                        if (alive.current) {
                            setCreating(false);
                            navigate(created);
                        }
                    });
                }, children: [_jsxs("label", { children: [l("文件夹名称"), _jsx("input", { autoFocus: true, required: true, pattern: "[^\\\\/]+", value: name, disabled: busy, onChange: event => setName(event.target.value) })] }), _jsx(Button, { type: "button", disabled: busy, onClick: () => setCreating(false), children: l("取消新建") }), _jsx(Button, { type: "submit", variant: "primary", disabled: !name.trim() || busy, children: l("创建") })] }), _jsx("div", { className: css.directories, "aria-label": l("文件夹列表"), "aria-busy": loading, children: loading ? _jsx("p", { role: "status", children: l("正在读取文件夹…") }) : !error && _jsxs(_Fragment, { children: [listing?.entries.filter(entry => hidden || !entry.hidden).map(entry => _jsxs("button", { type: "button", disabled: busy || creating, onClick: () => navigate(entry.path), children: [_jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", "aria-hidden": "true", children: [_jsx("path", { d: "M3 7V5h6l2 2h10v13H3V7Z" }), _jsx("path", { d: "M3 10h18" })] }), _jsx("span", { children: entry.name }), _jsx("span", { "aria-hidden": "true", children: "\u203A" })] }, entry.path)), !listing?.entries.some(entry => hidden || !entry.hidden) && _jsx("p", { children: l("此目录下没有可见的子文件夹，可直接打开当前目录。") }), listing?.truncated && _jsx("p", { children: l("文件夹较多，仅显示部分内容；可编辑路径直接前往。") })] }) })] });
}
