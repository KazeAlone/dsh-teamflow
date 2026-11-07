export function taskControlState(team, task, historic = false) {
    const terminal = ['completed', 'failed', 'cancelled'].includes(task.status);
    const stopping = !!task.workflowPaused && ['claimed', 'in_progress'].includes(task.status);
    const waiting = task.dependencies.filter(id => !team.tasks.some(upstream => upstream.id === id && upstream.status === 'completed'));
    const reviewReady = !!task.checkpoint && !task.checkpoint.decision && task.status === 'pending' && !task.workflowPaused && !task.workflowConfigPending && !task.workflowRerunRequired && !waiting.length && team.phase !== 'staged' && !team.halted && !historic;
    const disabled = historic || !!team.halted || terminal || !!task.workflowConfigPending || !!task.workflowRerunRequired || !!task.checkpoint?.decision;
    const checked = !terminal && !task.workflowPaused && !task.workflowConfigPending && !task.workflowRerunRequired && !task.checkpoint?.decision;
    const label = terminal ? task.checkpoint?.decision === 'approve' ? 'task.status.reviewPassed' : task.status === 'completed' ? 'task.status.completed' : task.status === 'failed' ? 'task.status.failed' : 'task.status.cancelled'
        : task.checkpoint?.decision === 'reject' ? 'task.status.reviewRejected'
            : task.workflowConfigPending ? 'task.status.configurationPending'
                : task.workflowRerunRequired ? waiting.length ? 'task.control.rerunWaiting' : task.checkpoint ? 'task.control.reviewRequired' : 'task.control.rerunRequired'
                    : historic || team.halted ? 'task.control.stopped'
                        : stopping ? 'task.control.stopping'
                            : task.workflowPaused ? task.workflowAwaitingStart ? 'task.control.awaitingStart' : 'task.control.paused'
                                : team.phase === 'staged' ? 'task.control.staged'
                                    : task.status === 'in_progress' ? 'task.status.inProgress'
                                        : task.status === 'claimed' ? 'task.status.claimed'
                                            : waiting.some(id => team.tasks.some(upstream => upstream.id === id && (['failed', 'cancelled'].includes(upstream.status) || upstream.checkpoint?.decision === 'reject'))) ? 'task.control.blocked'
                                                : waiting.length ? 'task.control.waiting'
                                                    : task.checkpoint ? 'task.status.reviewReady' : 'task.control.queued';
    const canRerun = terminal && !task.checkpoint && !historic && !team.halted && team.phase !== 'staged';
    const active = ['claimed', 'in_progress'].includes(task.status);
    // Scheduling permission is not execution. A queued task can be withdrawn,
    // but must never advertise an execution pause before it has been claimed.
    const queued = checked && !active;
    const actionLabel = stopping ? 'task.control.retryStop'
        : !checked ? 'task.control.start' : active ? 'task.control.pause' : 'task.control.dequeue';
    const visual = label.slice(label.lastIndexOf('.') + 1);
    return { disabled, checked, label, waiting, reviewReady, stopping, terminal, canRerun, active, queued, actionLabel, visual };
}
/** Optimistic concurrency token shared by the canvas, activity view and route. */
export function flowControlVersion(team) {
    return JSON.stringify([team.phase ?? 'running', !!team.halted, team.tasks.map(task => [task.id, task.updatedAt, task.status, !!task.workflowPaused, !!task.workflowConfigPending, !!task.workflowRerunRequired, task.checkpoint?.decision, task.dependencies])]);
}
export function flowControlState(team) {
    // Global start explicitly confirms pending reruns; individual node controls remain guarded.
    const controls = team.tasks.map(task => taskControlState(team, { ...task, workflowPaused: task.workflowPaused || task.workflowRerunRequired, workflowRerunRequired: false }));
    return {
        canStart: !team.halted && team.phase !== 'staged' && !controls.some(c => c.stopping) && controls.some(c => !c.disabled),
        canPause: !team.halted && team.phase !== 'staged' && controls.some(c => !c.disabled && (c.checked || c.stopping)),
    };
}
