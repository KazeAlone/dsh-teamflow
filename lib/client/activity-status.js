/** Completed nodes, not estimated model progress. Scope matches the badge's click target. */
export function activityStatus(team, archived = false) {
    const tasks = team?.tasks ?? [];
    const completed = tasks.filter(t => t.status === 'completed' && (!t.checkpoint || t.checkpoint.decision === 'approve')).length;
    const running = archived || team?.halted ? 0 : tasks.filter(t => !t.workflowPaused && ['claimed', 'in_progress'].includes(t.status)).length;
    const reviews = archived || team?.halted || team?.phase === 'staged' ? 0 : tasks.filter(t => t.checkpoint && !t.checkpoint.decision && t.status === 'pending' && !t.workflowPaused && !t.workflowRerunRequired && !t.workflowConfigPending && t.dependencies.every(id => tasks.some(up => up.id === id && up.status === 'completed'))).length;
    const issues = archived ? 0 : tasks.filter(t => t.status === 'failed' || t.checkpoint?.decision === 'reject' || t.workflowConfigPending || t.workflowRerunRequired).length;
    const configuration = archived ? 0 : tasks.filter(t => t.workflowConfigPending && t.status !== 'failed' && t.checkpoint?.decision !== 'reject' && !t.workflowRerunRequired).length;
    const attention = reviews + issues;
    const done = tasks.length > 0 && completed === tasks.length;
    const paused = !!team?.halted || tasks.some(t => t.workflowPaused) && !running && !tasks.some(t => t.status === 'pending' && !t.workflowPaused && !t.workflowConfigPending && !t.workflowRerunRequired && !t.checkpoint?.decision);
    const state = done ? 'completed' : archived ? 'archived' : !team ? 'history' : issues ? (configuration === issues && !reviews ? 'configuration' : 'attention') : team.phase === 'staged' ? 'staged' : reviews ? 'review' : paused ? 'paused' : running ? 'running' : 'waiting';
    return { state, completed, total: tasks.length, percent: tasks.length ? Math.floor(completed / tasks.length * 100) : 0, running, reviews, attention };
}
