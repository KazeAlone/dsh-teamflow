import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { outcomeCsv, outcomeFiles } from "../outcomes.js";
import { useWorkflowText } from "./workflow-i18n.js";
import { workflowMessage } from "./workflow-text.js";
import { taskReadiness } from "./task-readiness.js";
import css from './OutcomeShowcase.module.css';
/** Small safe Markdown subset. React escapes all text; no HTML, embeds, or external resources. */
export function OutcomeMarkdown({ text }) {
    const blocks = [];
    let code, paragraph = [];
    const flush = () => { if (paragraph.length) {
        blocks.push(_jsx("p", { children: paragraph.join('\n') }, blocks.length));
        paragraph = [];
    } };
    for (const line of text.split(/\r?\n/)) {
        if (/^\s*```/.test(line)) {
            flush();
            if (code) {
                blocks.push(_jsx("pre", { children: _jsx("code", { children: code.join('\n') }) }, blocks.length));
                code = undefined;
            }
            else
                code = [];
            continue;
        }
        if (code) {
            code.push(line);
            continue;
        }
        const heading = /^(#{1,6})\s+(.+)$/.exec(line);
        if (heading) {
            flush();
            blocks.push(_jsx("h3", { children: heading[2] }, blocks.length));
        }
        else if (/^\s*[-*]\s+/.test(line)) {
            flush();
            blocks.push(_jsxs("p", { className: css.bullet, children: ["\u2022 ", line.replace(/^\s*[-*]\s+/, '')] }, blocks.length));
        }
        else if (!line.trim())
            flush();
        else
            paragraph.push(line);
    }
    flush();
    if (code)
        blocks.push(_jsx("pre", { children: _jsx("code", { children: code.join('\n') }) }, blocks.length));
    return _jsx("div", { className: css.markdown, children: blocks });
}
export function OutcomeShowcase({ team, sessionId, archived, onTask }) {
    const l = useWorkflowText();
    const tasks = team.tasks.filter(t => !t.checkpoint);
    const [taskId, setTaskId] = useState(tasks.find(t => t.output || outcomeFiles(t).length)?.id ?? tasks[0]?.id ?? '');
    const task = tasks.find(t => t.id === taskId) ?? tasks[0];
    const [file, setFile] = useState();
    const [refresh, setRefresh] = useState(0);
    const [result, setResult] = useState();
    const [raw, setRaw] = useState(false);
    const files = task ? outcomeFiles(task) : [];
    const validFile = file !== undefined && files.some(f => f.path === file) ? file : undefined;
    const key = JSON.stringify([sessionId, team.id, task?.id, validFile, archived, refresh]);
    useEffect(() => {
        if (!task || validFile === undefined)
            return;
        const controller = new AbortController();
        void (async () => {
            try {
                const response = await fetch('/plugins/dsh-agent-teams/workflow', { method: 'POST', headers: { 'content-type': 'application/json' }, signal: controller.signal,
                    body: JSON.stringify({ action: 'outcome_preview', sessionId, teamId: team.id, taskId: task.id, path: validFile, archived }) });
                const body = await response.json();
                if (!response.ok || !body.preview)
                    throw new Error(body.error ?? `HTTP ${response.status}`);
                if (!controller.signal.aborted)
                    setResult({ key, preview: body.preview });
            }
            catch (err) {
                if (!controller.signal.aborted)
                    setResult({ key, error: err instanceof Error ? err.message : String(err) });
            }
        })();
        return () => controller.abort();
    }, [key, sessionId]);
    const preview = result?.key === key ? result.preview : undefined;
    const error = result?.key === key ? result.error : undefined;
    const csv = useMemo(() => preview?.kind === 'csv' ? outcomeCsv(preview.text ?? '') : undefined, [preview]);
    const gates = team.tasks.filter(g => g.checkpoint && g.dependencies.includes(task?.id ?? ''));
    const statusText = (status) => l({ ready: '文件可预览', missing: '文件不存在或已被移除', blocked: '此路径不支持预览：仅允许工作区内明确声明的普通文件。', unsupported: '此文件类型或编码暂不支持预览。', too_large: '文件超过预览上限：文本 256 KiB，图片 4 MiB。', unreadable: '文件无法读取或读取期间已变化，请刷新重试。' }[status]);
    function selectTask(id) { setTaskId(id); setFile(undefined); setRaw(false); }
    return _jsxs("section", { className: css.showcase, "aria-label": l('交付内容'), children: [_jsxs("header", { className: css.header, children: [_jsxs("div", { children: [_jsx("h2", { children: l('交付内容') }), _jsx("p", { children: l('根据任务记录整理，不调用模型。') })] }), _jsx("span", { children: l('{0} 个任务有提交说明 · {1} 个文件条目', tasks.filter(t => !!t.output).length, tasks.reduce((n, t) => n + outcomeFiles(t).length, 0)) })] }), !tasks.length ? _jsx("p", { className: css.empty, children: l('暂无执行任务成果。任务提交后会在这里显示。') }) : _jsxs("div", { className: css.layout, children: [_jsx("nav", { className: css.tasks, "aria-label": l('成果来源任务'), children: tasks.map(t => _jsxs("button", { "aria-pressed": task?.id === t.id, onClick: () => selectTask(t.id), children: [_jsx("strong", { children: t.subject }), _jsxs("small", { children: [taskReadiness(team, t, l).label, " \u00B7 ", t.assignee || l('未分配')] }), _jsxs("span", { children: [t.output ? l('已提交说明') : l('暂无提交说明'), " \u00B7 ", l('{0} 个文件条目', outcomeFiles(t).length)] })] }, t.id)) }), task && _jsxs("article", { className: css.detail, children: [_jsxs("header", { className: css.taskHeader, children: [_jsxs("div", { children: [_jsx("h3", { children: task.subject }), _jsxs("p", { children: [l('来源任务'), " \u00B7 ", task.id, " \u00B7 ", task.assignee || l('未分配'), " \u00B7 ", l('第 {0} 次执行', task.attempt ?? 0)] })] }), _jsx("button", { onClick: () => onTask(task.id), children: l('查看原任务') })] }), (task.workflowRerunRequired || task.workflowRerunContext || task.status === 'in_progress' || task.status === 'claimed') && _jsx("p", { className: css.notice, children: l('任务正在更新或等待重跑；当前文件不代表本轮已完成交付。') }), _jsxs("div", { className: css.tabs, children: [_jsx("button", { "aria-pressed": validFile === undefined, onClick: () => setFile(undefined), children: l('提交说明与验证') }), _jsx("span", { children: l('文件来自约定交付或报告变更，是否存在需打开核对。') })] }), !!files.length && _jsx("div", { className: css.files, "aria-label": l('成果文件'), children: files.slice(0, 200).map(f => _jsxs("button", { "aria-pressed": validFile === f.path, onClick: () => { setFile(f.path); setRaw(false); }, children: [_jsx("strong", { children: f.path }), _jsxs("small", { children: [f.declared ? l('约定交付物') : l('报告变更'), f.declared && f.changed ? ` · ${l('报告变更')}` : ''] })] }, f.path)) }), files.length > 200 && _jsx("p", { children: l('仅展示前 200 个文件条目，其余请查看原任务。') }), validFile !== undefined ? _jsxs("section", { className: css.preview, "aria-live": "polite", children: [_jsxs("header", { children: [_jsx("strong", { children: validFile }), _jsx("button", { onClick: () => setRefresh(v => v + 1), children: l('刷新文件') })] }), _jsx("p", { className: css.notice, children: l('当前工作区文件，不是历史快照；审批记录不代表此文件版本已验收。') }), error ? _jsx("p", { role: "alert", children: workflowMessage(error, l) }) : !preview ? _jsx("p", { children: l('正在读取文件…') }) : _jsxs(_Fragment, { children: [_jsxs("p", { className: css.meta, children: [preview.size !== undefined && `${preview.size.toLocaleString()} bytes · `, preview.modifiedAt !== undefined && new Date(preview.modifiedAt).toLocaleString()] }), preview.status !== 'ready' ? _jsx("p", { children: statusText(preview.status) }) : _jsxs(_Fragment, { children: [preview.kind === 'image' ? _jsx("img", { src: preview.dataUrl, alt: validFile, onError: e => { e.currentTarget.alt = l('图片无法解码，请在工作区查看原文件。'); } }) : _jsxs(_Fragment, { children: [(preview.kind === 'markdown' || preview.kind === 'csv') && _jsx("button", { "aria-pressed": raw, onClick: () => setRaw(!raw), children: raw ? l('预览') : l('查看原文') }), !raw && preview.kind === 'markdown' ? _jsx(OutcomeMarkdown, { text: preview.text ?? '' }) : !raw && csv ? _jsxs(_Fragment, { children: [_jsx("div", { className: css.tableScroll, children: _jsx("table", { children: _jsx("tbody", { children: csv.rows.map((row, i) => _jsx("tr", { children: row.map((cell, j) => i === 0 ? _jsx("th", { children: cell }, j) : _jsx("td", { children: cell }, j)) }, i)) }) }) }), csv.truncated && _jsx("p", { children: l('仅预览前 100 行、50 列。') })] }) : _jsx("pre", { children: preview.text || l('文件为空') })] }), _jsxs("details", { children: [_jsx("summary", { children: l('当前文件指纹') }), _jsx("code", { children: preview.sha256 })] })] })] })] }) : _jsxs(_Fragment, { children: [_jsxs("section", { className: css.report, children: [_jsx("h4", { children: l('任务提交说明') }), task.output ? _jsx(OutcomeMarkdown, { text: task.output }) : _jsx("p", { children: l('尚未提交结果。约定交付物和任务完成状态不能代替实际成果。') })] }), _jsxs("section", { className: css.report, children: [_jsx("h4", { children: l('验证记录') }), _jsx("p", { className: css.meta, children: l('以下为 Agent 提交记录，不代表独立测试或人工验收。') }), !task.commandsRun?.length && !task.acceptanceResults?.length && _jsx("p", { children: l('暂无验证记录') }), task.commandsRun?.map((r, i) => _jsxs("div", { children: [_jsx("strong", { children: r.status === 'passed' ? l('报告通过') : l('报告失败') }), " \u00B7 ", _jsx("code", { children: r.command }), _jsx("p", { children: r.evidence || l('未提交证据说明') })] }, `c${i}`)), task.acceptanceResults?.map((r, i) => _jsxs("div", { children: [_jsx("strong", { children: r.criterion }), " \u00B7 ", r.status === 'passed' ? l('报告通过') : l('报告失败'), _jsx("p", { children: r.evidence || l('未提交证据说明') })] }, `a${i}`))] }), !!gates.length && _jsxs("section", { className: css.report, children: [_jsx("h4", { children: l('下游人工检查点') }), gates.map(g => _jsxs("button", { onClick: () => onTask(g.id, true), children: [g.subject, " \u00B7 ", g.checkpoint?.decision === 'approve' ? l('已通过') : g.checkpoint?.decision === 'reject' ? l('已退回') : l('等待人工决定')] }, g.id))] }), !!task.stoppedAttempts?.length && _jsxs("details", { className: css.report, children: [_jsxs("summary", { children: [l('历史提交说明'), " \u00B7 ", task.stoppedAttempts.length] }), _jsx("p", { className: css.meta, children: l('这里只保留历史文字记录，没有保存历史文件副本。') }), [...task.stoppedAttempts].reverse().map((a, i) => _jsxs("section", { children: [_jsx("small", { children: new Date(a.at).toLocaleString() }), _jsx("pre", { children: a.output || l('本次停止前未提交结果') })] }, i))] })] })] })] })] });
}
