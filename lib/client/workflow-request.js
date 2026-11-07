/** Bounded requests. Never replay a mutation when its server-side outcome is unknown. */
export async function workflowRequest(payload, fetcher = fetch, timeoutMs = payload['action'] === 'state' ? 12000 : 45000) {
    const controller = new AbortController(), timer = setTimeout(() => controller.abort(), timeoutMs);
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
    }
}
