export function rerunImpact(tasks, id) {
    const affected = new Set([id]);
    let changed = true;
    while (changed) {
        changed = false;
        for (const task of tasks)
            if (!affected.has(task.id) && task.dependencies.some(dep => affected.has(dep))) {
                affected.add(task.id);
                changed = true;
            }
    }
    const descendants = tasks.filter(task => task.id !== id && affected.has(task.id));
    return {
        descendants,
        active: descendants.filter(task => ['claimed', 'in_progress'].includes(task.status) || task.reassigning),
    };
}
export function rerunnableTasks(tasks, memberName) {
    return tasks.filter(task => !task.checkpoint && task.assignee === memberName && ['completed', 'failed', 'cancelled'].includes(task.status));
}
/** Keep the contract, identity and monotonic generation; invalidate old capabilities and evidence. */
export function resetTaskForRerun(task, suspended, now) {
    if (['completed', 'failed', 'cancelled'].includes(task.status)) {
        task.stoppedAttempts ??= [];
        const status = task.status === 'completed' ? '已完成' : task.status === 'cancelled' ? '已取消' : '失败';
        task.stoppedAttempts.push({ attemptId: task.attemptId, output: `${status} · ${task.output || '未提交结果'}`, at: now });
    }
    task.status = 'pending';
    task.workflowPaused = suspended;
    task.workflowRerunRequired = suspended;
    task.updatedAt = now;
    task.workflowAwaitingStart = false;
    delete task.workflowRerunContext;
    for (const key of ['output', 'attemptId', 'handoffId', 'handoffFromMemberId', 'reassigning', 'verdict', 'findings', 'changedPaths', 'acceptanceResults', 'commandsRun', 'supplementalEvidence', 'reviewedAttempt', 'reviewedArtifacts', 'reviewedGaps', 'reviewedScope', 'reviewedDuringDrift', 'verdictStartSnapshot'])
        delete task[key];
    if (task.checkpoint)
        task.checkpoint = { round: task.checkpoint.round + 1, history: task.checkpoint.history };
}
import { taskNeedsConfiguration } from "./task-description.js";
/** Ancestors before consumers; only rerun-invalidated nodes are released by this action. */
export function rerunPath(tasks, targetId) {
    const byId = new Map(tasks.map(task => [task.id, task])), visited = new Set(), visiting = new Set(), ordered = [];
    function visit(id) {
        if (visited.has(id))
            return;
        const task = byId.get(id);
        if (!task)
            throw new Error('重跑路径存在缺失节点');
        if (visiting.has(id))
            throw new Error('重跑路径存在循环');
        visiting.add(id);
        task.dependencies.forEach(visit);
        visiting.delete(id);
        visited.add(id);
        ordered.push(task);
    }
    visit(targetId);
    return ordered;
}
/** Validate the entire plan before mutating it; normal scheduling and human gates remain authoritative. */
export function resumeRerunPath(team, targetId, now = Date.now()) {
    if (team.halted || team.phase === 'staged')
        throw new Error('请先恢复或启动团队，再重跑到此节点');
    const path = rerunPath(team.tasks, targetId), target = path.at(-1);
    if (!target.workflowRerunRequired || target.status !== 'pending')
        throw new Error('此节点已不需要确认重跑，请刷新状态');
    for (const task of path) {
        if (task.status === 'completed' && !task.workflowRerunRequired)
            continue;
        if (taskNeedsConfiguration(task))
            throw new Error(`请先完成路径节点的配置：${task.subject}`);
        if (task.reassigning || team.members.some(m => m.name === task.assignee && m.stopping))
            throw new Error(`路径节点正在停止，请稍后重试：${task.subject}`);
        if (['failed', 'cancelled'].includes(task.status) || task.checkpoint?.decision === 'reject')
            throw new Error(`请先处理路径中的失败或退回节点：${task.subject}`);
        if (task.workflowRerunRequired && task.status !== 'pending')
            throw new Error(`路径节点状态已变化，请刷新：${task.subject}`);
        if (!task.workflowRerunRequired && task.workflowPaused)
            throw new Error(`请先启动路径中手动暂停的节点：${task.subject}`);
        if (!task.checkpoint && task.assignee !== 'captain' && !team.members.some(m => m.status !== 'removed' && (!task.assignee || m.name === task.assignee)))
            throw new Error(`路径节点缺少执行成员：${task.subject}`);
    }
    const resumed = path.filter(task => task.workflowRerunRequired);
    for (const task of resumed) {
        task.workflowRerunRequired = false;
        task.workflowPaused = false;
        task.workflowAwaitingStart = false;
        task.updatedAt = now;
    }
    return resumed.map(task => task.id);
}
