/** Version-tolerant navigation into durable AgentTeams member transcripts. */
/** Newer sessions retain view ownership instead of publishing list.current. */
export function currentSessionId(state) {
    if ('current' in state)
        return state.current;
    return Object.values(state.byId).find(row => (row.retainedBy?.mainView ?? 0) > 0)?.id;
}
/** Independent workflow discussions are ordinary sessions, never captain subagents. */
export function openWorkflowConversation(openMember, sessionId) {
    return openMember(sessionId, sessionId);
}
/**
 * Open one member's persisted transcript.
 *
 * Harness rc.8 intentionally removed cold subagents from the ordinary session
 * list. They must first be rediscovered in their parent's catalog, then opened
 * with the exact parent/child/mode address. Older runtimes have only `open()`;
 * the fallback preserves ordinary-session navigation. New layouts also select
 * the Conversation panel and cancel catalog refreshes superseded by navigation.
 */
const navigationEpochs = new WeakMap();
const catalogReads = new WeakMap();
export async function openAgentTeamMember(sessions, parentSessionId, childSessionId, layout, workspace) {
    const epoch = (navigationEpochs.get(sessions) ?? 0) + 1;
    navigationEpochs.set(sessions, epoch);
    if (parentSessionId === childSessionId) {
        if (workspace)
            workspace.openSession(childSessionId);
        else if (sessions.open)
            sessions.open(childSessionId);
        else
            throw new Error('Harness does not expose session navigation');
        layout?.selectPanel?.(null);
        return 'session';
    }
    if (sessions.open === undefined && workspace !== undefined) {
        workspace.openSession({ parentSessionId, childSessionId, mode: 'continuable' });
        return 'subagent';
    }
    const navigation = layout?.beginNavigation?.();
    if (sessions.openSubagent === undefined || sessions.refreshSubagents === undefined) {
        if (sessions.open === undefined)
            throw new Error('Harness does not expose session navigation');
        sessions.open(childSessionId);
        layout?.selectPanel?.(null);
        return 'session';
    }
    // A retained address has already been resolved by the host. Refreshing the
    // parent's entire catalog on every click adds a serial remote round trip.
    const known = sessions.subagentAddress?.(childSessionId);
    if (known?.parentSessionId === parentSessionId && known.childSessionId === childSessionId) {
        if (navigation?.aborted)
            return 'cancelled';
        sessions.openSubagent(known);
        layout?.selectPanel?.(null);
        return 'subagent';
    }
    let reads = catalogReads.get(sessions);
    if (!reads) {
        reads = new Map();
        catalogReads.set(sessions, reads);
    }
    let pending = reads.get(parentSessionId);
    if (!pending) {
        pending = Promise.resolve().then(() => sessions.refreshSubagents(parentSessionId));
        reads.set(parentSessionId, pending);
        void pending.finally(() => { if (reads.get(parentSessionId) === pending)
            reads.delete(parentSessionId); }).catch(() => { });
    }
    try {
        await pending;
    }
    catch (error) {
        if (navigation?.aborted || navigationEpochs.get(sessions) !== epoch)
            return 'cancelled';
        throw error;
    }
    if (navigation?.aborted || navigationEpochs.get(sessions) !== epoch)
        return 'cancelled';
    const retained = sessions.subagentAddress?.(childSessionId);
    sessions.openSubagent(retained?.parentSessionId === parentSessionId
        ? retained
        : { parentSessionId, childSessionId, mode: 'continuable' });
    layout?.selectPanel?.(null);
    return 'subagent';
}
/** Blank sessions suppress the host's normal header actions. */
export function blankTeamflowSession(state, conversationVisible) {
    const id = currentSessionId(state);
    return conversationVisible && id && state.byId[id]?.blank ? id : undefined;
}
