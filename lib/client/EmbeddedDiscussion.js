import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { workflowMessage } from "./workflow-text.js";
import { useWorkflowText } from "./workflow-i18n.js";
/** A compact view over the same isolated native discussion session. */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BrandIcon } from "./BrandIcon.js";
import css from './WorkflowWorkbench.module.css';
import { remainingMessage } from "./workbench-drafts.js";
export function EmbeddedDiscussion({ sessionId, teamId, discussion }) {
    const l = useWorkflowText();
    return _jsx(Discussion, { sessionId: sessionId, teamId: teamId, discussion: discussion }, JSON.stringify([sessionId, teamId, discussion]));
}
function Discussion({ sessionId, teamId, discussion }) {
    const l = useWorkflowText();
    const storageKey = `teamflow:discussion-draft:v1:${JSON.stringify([sessionId, teamId, discussion])}`;
    const [storageError, setStorageError] = useState('');
    const [chat, setChat] = useState({ messages: [], busy: false });
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState(() => { try {
        return sessionStorage.getItem(storageKey) ?? '';
    }
    catch {
        return '';
    } });
    const textRef = useRef(text), liveRef = useRef(true);
    useEffect(() => { liveRef.current = true; return () => { liveRef.current = false; }; }, []);
    function changeText(value) {
        textRef.current = value;
        setText(value);
        try {
            if (value)
                sessionStorage.setItem(storageKey, value);
            else
                sessionStorage.removeItem(storageKey);
            setStorageError('');
        }
        catch {
            setStorageError(l("草稿备份失败，离开页面前请保留文本。"));
        }
    }
    useEffect(() => {
        if (!text || !storageError)
            return;
        const warn = (event) => { event.preventDefault(); event.returnValue = ''; };
        window.addEventListener('beforeunload', warn);
        return () => window.removeEventListener('beforeunload', warn);
    }, [text, storageError]);
    const [sending, setSending] = useState(false);
    const sendingRef = useRef(false), composingRef = useRef(false);
    const [error, setError] = useState('');
    const transcript = useRef(null);
    const followBottom = useRef(true), pollEpoch = useRef(0);
    const [unread, setUnread] = useState(false);
    function latest() { followBottom.current = true; setUnread(false); if (transcript.current)
        transcript.current.scrollTop = transcript.current.scrollHeight; }
    const tail = chat.messages.at(-1);
    useLayoutEffect(() => {
        if (followBottom.current)
            latest();
        else if (tail)
            setUnread(true);
    }, [tail?.id, tail?.text, chat.busy, sending, loading]);
    async function request(action, message, signal) {
        const response = await fetch('/plugins/dsh-agent-teams/workflow', { method: 'POST', signal, headers: { 'content-type': 'application/json' }, body: JSON.stringify({ sessionId, teamId, discussion, action, message }) });
        const value = await response.json();
        if (!response.ok)
            throw new Error(value.error ?? `HTTP ${response.status}`);
        return value;
    }
    useEffect(() => {
        const abort = new AbortController();
        let timer;
        async function refresh() {
            const epoch = pollEpoch.current;
            let delay = 1500;
            try {
                const value = await request('conversation_state', undefined, abort.signal);
                if (!abort.signal.aborted && epoch === pollEpoch.current) {
                    setChat(value);
                    setError('');
                    setLoading(false);
                }
                if (value.busy)
                    delay = 250;
            }
            catch (err) {
                if (!abort.signal.aborted && epoch === pollEpoch.current) {
                    setError(err instanceof Error ? err.message : String(err));
                    setLoading(false);
                }
            }
            finally {
                if (!abort.signal.aborted)
                    timer = setTimeout(() => void refresh(), delay);
            }
        }
        void refresh();
        return () => { abort.abort(); clearTimeout(timer); };
    }, [sessionId, teamId, discussion]);
    async function send() {
        const submitted = textRef.current, message = submitted.trim();
        if (!message || loading || sendingRef.current || chat.busy)
            return;
        sendingRef.current = true;
        pollEpoch.current++;
        latest();
        setSending(true);
        setError('');
        try {
            const result = await request('conversation_send', message);
            if (liveRef.current) {
                pollEpoch.current++;
                setChat(result);
                changeText(remainingMessage(textRef.current, submitted));
            }
            else {
                try {
                    if (sessionStorage.getItem(storageKey) === submitted)
                        sessionStorage.removeItem(storageKey);
                }
                catch { /* Keep a recoverable draft if storage is unavailable. */ }
            }
        }
        catch (err) {
            if (liveRef.current)
                setError(err instanceof Error ? err.message : String(err));
        }
        finally {
            sendingRef.current = false;
            if (liveRef.current)
                setSending(false);
        }
    }
    const generating = !error && (sending || chat.busy);
    return _jsxs("div", { className: css.embeddedChat, children: [_jsxs("div", { ref: transcript, tabIndex: 0, className: css.embeddedTranscript, "aria-busy": generating, onScroll: () => { const el = transcript.current; if (el) {
                    followBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
                    if (followBottom.current)
                        setUnread(false);
                } }, "aria-label": l("独立讨论记录"), children: [chat.messages.map(message => _jsxs("div", { "data-streaming": !!message.streaming && generating, className: message.role === 'user' ? css.userMessage : css.assistantMessage, children: [_jsx("strong", { children: message.role === 'user' ? l("你") : 'AI' }), _jsxs("p", { children: [message.text, message.streaming && generating && _jsx("span", { className: css.streamCaret, "aria-hidden": "true" })] })] }, message.id)), loading && _jsx("p", { role: "status", children: l("正在读取讨论记录…") }), error && _jsx("p", { role: "alert", className: css.error, children: workflowMessage(error, l) })] }), (generating || unread) && _jsxs("div", { className: css.discussionStatus, children: [generating && _jsxs("div", { className: css.discussionGenerating, role: "status", children: [_jsx("span", { className: css.discussionLogo, "aria-hidden": "true", children: _jsx(BrandIcon, { size: 26 }) }), _jsx("span", { children: tail?.streaming ? l("正在回复…") : l("AI 正在思考…") })] }), unread && _jsxs("button", { type: "button", className: css.latestReply, onClick: latest, children: [l("查看最新回复"), " \u2193"] })] }), _jsxs("form", { className: css.embeddedComposer, onSubmit: event => { event.preventDefault(); void send(); }, children: [_jsxs("label", { children: [l("继续讨论"), _jsx("textarea", { value: text, onChange: event => changeText(event.target.value), onCompositionStart: () => { composingRef.current = true; }, onCompositionEnd: () => { composingRef.current = false; }, onKeyDown: event => {
                                    if (event.key !== 'Enter' || event.shiftKey || event.altKey || event.ctrlKey || event.metaKey || composingRef.current || event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229)
                                        return;
                                    event.preventDefault();
                                    if (!event.repeat)
                                        void send();
                                }, placeholder: discussion.startsWith('task:') ? l("例如：帮我细化这个任务的要求，或分析失败原因…") : discussion.startsWith('member:') ? l("例如：让这个 Agent 更专注于需求分析…") : l("输入你想讨论的问题…") })] }), _jsx("small", { role: storageError ? 'alert' : undefined, children: workflowMessage(storageError, l) || [l("Enter 发送 · Shift+Enter 换行"), text ? l("草稿保存在此标签页，切换讨论或刷新可恢复。") : ""].filter(Boolean).join(" · ") }), _jsx("button", { type: "submit", disabled: !text.trim() || loading || chat.busy || sending, children: sending ? l("发送中…") : l("发送") })] })] });
}
