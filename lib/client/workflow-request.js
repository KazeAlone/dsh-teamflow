/** Bounded requests. Never replay a mutation when its server-side outcome is unknown. */
async function transport(payload, fetcher, timeoutMs, signal) {
    const controller = new AbortController(), timer = setTimeout(() => controller.abort(), timeoutMs);
    const cancel = () => controller.abort(signal?.reason);
    signal?.addEventListener('abort', cancel, { once: true });
    if (signal?.aborted)
        cancel();
    try {
        let response;
        try {
            response = await fetcher('/plugins/dsh-agent-teams/workflow', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload), signal: controller.signal });
        }
        catch {
            throw new Error('连接中断或请求超时。操作可能已经保存，请先重新连接并核对状态，再决定是否继续。');
        }
        let result;
        try {
            result = await response.json();
        }
        catch {
            throw new Error('连接中断或请求超时。操作可能已经保存，请先重新连接并核对状态，再决定是否继续。');
        }
        if (!response.ok)
            throw new Error(result.error ?? `HTTP ${response.status}`);
        return result;
    }
    finally {
        clearTimeout(timer);
        signal?.removeEventListener('abort', cancel);
    }
}
// Share only explicit reads, never settled authority or mutations. A mutation
// fences earlier reads, including when its server-side outcome is unknown.
const reads = new Set(['state', 'archive_state', 'conversation_state', 'template_list', 'template_seed', 'launcher_context', 'outcome_preview']);
const requests = new WeakMap();
let generation = 0;
export function workflowRequest(payload, fetcher = fetch, timeoutMs = reads.has(String(payload['action'])) ? 12000 : 45000, signal) {
    if (signal?.aborted)
        return Promise.reject(signal.reason ?? new DOMException('Aborted', 'AbortError'));
    if (!reads.has(String(payload['action']))) {
        generation++;
        return transport(payload, fetcher, timeoutMs, signal).finally(() => { generation++; });
    }
    let pool = requests.get(fetcher);
    if (!pool) {
        pool = new Map();
        requests.set(fetcher, pool);
    }
    const key = JSON.stringify([generation, timeoutMs, payload]);
    let entry = pool.get(key);
    if (!entry) {
        const controller = new AbortController();
        entry = { controller, consumers: 0, promise: transport(payload, fetcher, timeoutMs, controller.signal) };
        pool.set(key, entry);
        const created = entry;
        void entry.promise.finally(() => { if (pool.get(key) === created)
            pool.delete(key); }).catch(() => { });
    }
    const shared = entry;
    shared.consumers++;
    return new Promise((resolve, reject) => {
        let done = false;
        const finish = (callback) => {
            if (done)
                return;
            done = true;
            signal?.removeEventListener('abort', cancel);
            if (--shared.consumers === 0) {
                if (pool.get(key) === shared)
                    pool.delete(key);
                shared.controller.abort();
            }
            callback();
        };
        const cancel = () => finish(() => reject(signal?.reason ?? new DOMException('Aborted', 'AbortError')));
        signal?.addEventListener('abort', cancel, { once: true });
        shared.promise.then(value => finish(() => resolve(value)), error => finish(() => reject(error)));
        if (signal?.aborted)
            cancel();
    });
}
