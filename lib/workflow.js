import { parseGalleryAccess } from "./gallery-access.js";
/** Human workflow operations. Model output is a proposal, never execution authority. */
import { createHash, randomUUID } from 'node:crypto';
import { validateCreateTask } from "./quality-gates.js";
import { sanitizeKey } from "./state.js";
import { canRestartTask, rerunImpact, resetTaskForRerun } from "./task-rerun.js";
import { taskNeedsConfiguration } from "./task-description.js";
export function workflowState(team) {
    return team.workflow ??= { positions: {}, discussions: {}, history: [] };
}
export function workflowFingerprint(team) {
    // Discussion turns and layout moves do not invalidate a proposal; execution does.
    return createHash('sha256').update(JSON.stringify({ phase: team.phase, halted: team.halted,
        goal: team.description, templateSource: team.workflow?.templateSource, templateDefinition: team.workflow?.templateDefinition, members: team.members, tasks: team.tasks })).digest('hex');
}
function object(value) {
    if (value === null || typeof value !== 'object' || Array.isArray(value))
        throw new Error('操作必须是对象');
    return value;
}
function text(value, name, required = false) {
    if (value === undefined && !required)
        return undefined;
    if (typeof value !== 'string' || value.length > 16000 || (required && !value.trim()))
        throw new Error(`${name} 必须是有效文本`);
    return value.trim();
}
function strings(value, name) {
    if (!Array.isArray(value) || value.length > 100 || value.some(item => typeof item !== 'string' || !item.trim()))
        throw new Error(`${name} 必须是字符串列表`);
    return [...new Set(value)];
}
/** Strip unknown fields and validate every browser/model-supplied operation. */
export function parseWorkflowOperations(value) {
    if (!Array.isArray(value))
        throw new Error('operations must be an array of objects, not a JSON-encoded string. Pass operations: [{"action":"update_member","name":"worker","summary":"Updated responsibility"}] directly.');
    if (value.length === 0 || value.length > 50)
        throw new Error('每次提案需要 1–50 个修改');
    return value.map((raw, index) => {
        const op = object(raw), action = op['action'];
        if (typeof action !== 'string' || !action.trim())
            throw new Error('每个修改对象必须包含 action 字段，例如 {"action":"update_member","name":"planner","summary":"职责说明"}；参数与 action 同层，不使用 type、op 或嵌套 payload');
        const fields = (names) => Object.fromEntries(names.flatMap(name => op[name] === undefined ? [] : [[name, text(op[name], name)]]));
        if (op['layers'] !== undefined)
            throw new Error('任务只使用 description 字符串；通用要求请在保存模板时提炼');
        for (const field of ['configurationPending', 'confirmConfiguration'])
            if (op[field] !== undefined && typeof op[field] !== 'boolean')
                throw new Error(`${field} 必须是布尔值`);
        switch (action) {
            case 'add_member': return { action, ...parseGalleryAccess(op), name: text(op['name'], 'name', true), summary: text(op['summary'], 'summary', true), ...fields(['role', 'executionPrompt', 'specificPrompt', 'provider', 'model', 'reasoningEffort']) };
            case 'update_member': return { action, ...parseGalleryAccess(op), name: text(op['name'], 'name', true), ...fields(['summary', 'role', 'executionPrompt', 'specificPrompt', 'provider', 'model', 'reasoningEffort']) };
            case 'remove_member': return { action, name: text(op['name'], 'name', true) };
            case 'add_task': {
                if (op['checkpoint'] !== undefined && typeof op['checkpoint'] !== 'boolean')
                    throw new Error('checkpoint 必须是布尔值');
                return { action, subject: text(op['subject'], 'subject', true), ...fields(['id', 'description', 'assignee', 'adaptationIssue']),
                    dependencies: strings(op['dependencies'], 'dependencies'), checkpoint: op['checkpoint'] === true, ...op['configurationPending'] === true ? { configurationPending: true } : {} };
            }
            case 'update_task': return { action, id: text(op['id'], 'id', true), ...fields(['subject', 'description', 'assignee', 'adaptationIssue']),
                ...op['confirmConfiguration'] === true ? { confirmConfiguration: true } : {},
                ...op['dependencies'] === undefined ? {} : { dependencies: strings(op['dependencies'], 'dependencies') } };
            case 'remove_task': return { action, id: text(op['id'], 'id', true) };
            case 'rerun_task': return { action, id: text(op['id'], 'id', true), ...fields(['instructions', 'subject', 'description', 'assignee', 'adaptationIssue']) };
            case 'rework': return { action, id: text(op['id'], 'id', true), taskIds: strings(op['taskIds'], 'taskIds'), instructions: text(op['instructions'], 'instructions', true) };
            default: throw new Error(`未知修改操作：${String(action)}`);
        }
    });
}
function taskOf(team, id) {
    const task = team.tasks.find(t => t.id === id);
    if (!task)
        throw new Error(`任务不存在：${id}`);
    return task;
}
function nextTaskId(team) {
    let id;
    do {
        id = `t${++team.taskSeq}`;
    } while (team.tasks.some(t => t.id === id));
    return id;
}
function editable(task, reconnectRejected = false) {
    if (task.status !== 'pending' || ((task.attempt ?? 0) !== 0 && !task.workflowPaused) || task.reassigning || (task.checkpoint?.decision && !reconnectRejected)) {
        throw new Error(`任务 ${task.id} 已开始；请先停止该任务，已结束任务请使用修改并重跑`);
    }
}
function updateDescription(task, op) {
    if (op.description !== undefined) {
        task.description = op.description;
        if (!op.description.trim())
            task.workflowConfigPending = true;
    }
    if (op.adaptationIssue !== undefined)
        task.adaptationIssue = op.adaptationIssue;
    if (task.adaptationIssue?.trim())
        task.workflowConfigPending = true;
}
export function validateWorkflowGraph(team) {
    const members = new Set(team.members.filter(m => m.status !== 'removed').map(m => m.name));
    const ids = new Set(team.tasks.map(t => t.id));
    if (ids.size !== team.tasks.length)
        throw new Error('任务 ID 重复');
    const done = new Set(), visiting = new Set();
    function visit(task) {
        if (visiting.has(task.id))
            throw new Error('连接产生循环，任务无法执行');
        if (done.has(task.id))
            return;
        visiting.add(task.id);
        if (!task.subject.trim())
            throw new Error('任务名称不能为空');
        if (!task.checkpoint && !['completed', 'failed', 'cancelled'].includes(task.status) && task.assignee !== undefined && !members.has(task.assignee) && task.assignee !== 'captain')
            throw new Error(`执行成员不存在：${task.assignee}`);
        if (task.checkpoint && task.assignee)
            throw new Error('人工检查不能分配给执行成员');
        for (const id of task.dependencies) {
            if (!ids.has(id))
                throw new Error(`依赖任务不存在：${id}`);
            visit(taskOf(team, id));
        }
        visiting.delete(task.id);
        done.add(task.id);
    }
    team.tasks.forEach(visit);
}
export function checkpointReady(team, task) {
    return !!task.checkpoint && team.phase !== 'staged' && !team.halted && task.status === 'pending' && !task.workflowPaused && !taskNeedsConfiguration(task) && !task.workflowRerunRequired && !task.checkpoint.decision
        && task.dependencies.every(id => team.tasks.some(t => t.id === id && t.status === 'completed'));
}
/** All transitive upstream results, in dependency order. */
export function checkpointInputs(team, task) {
    const seen = new Set(), results = [];
    function visit(id) {
        if (seen.has(id))
            return;
        seen.add(id);
        const item = taskOf(team, id);
        item.dependencies.forEach(visit);
        results.push(item);
    }
    task.dependencies.forEach(visit);
    return results;
}
/** Apply to a detached copy: validation errors never partly modify durable state. */
export function applyWorkflowOperations(original, operations, maxMembers = 8) {
    if (original.halted)
        throw new Error('团队已停止，请先恢复团队');
    const team = structuredClone(original);
    const now = Date.now();
    for (const op of operations) {
        if (op.action === 'add_member') {
            if (sanitizeKey(op.name) === 'captain' || team.members.some(m => sanitizeKey(m.name) === sanitizeKey(op.name)))
                throw new Error('成员名称重复或保留');
            if (team.members.filter(m => m.status !== 'removed').length >= maxMembers)
                throw new Error('已达到团队成员上限');
            team.members.push({ id: '', name: op.name, gallerySkill: op.gallerySkill ?? false, galleryMcp: op.galleryMcp ?? false, summary: op.summary, role: op.role, executionPrompt: op.executionPrompt, specificPrompt: op.specificPrompt,
                provider: op.provider, model: op.model, reasoningEffort: op.reasoningEffort, joinedAt: now, status: 'idle' });
        }
        else if (op.action === 'update_member' || op.action === 'remove_member') {
            const member = team.members.find(m => m.name === op.name && m.status !== 'removed');
            if (!member)
                throw new Error('成员不存在');
            if (member.stopping || team.tasks.some(t => t.assignee === member.name && ['claimed', 'in_progress'].includes(t.status)))
                throw new Error('成员正在执行任务，请先停止该任务');
            if (op.action === 'remove_member') {
                if (team.tasks.some(t => t.assignee === member.name && t.status === 'pending'))
                    throw new Error('先重新分配该成员的待执行任务');
                member.status = 'removed';
            }
            else {
                Object.assign(member, parseGalleryAccess({ ...op }));
                if (op.summary !== undefined)
                    member.summary = op.summary;
                if (op.role !== undefined)
                    member.role = op.role;
                if (op.executionPrompt !== undefined)
                    member.executionPrompt = op.executionPrompt;
                if (op.specificPrompt !== undefined)
                    member.specificPrompt = op.specificPrompt;
                if (op.provider !== undefined)
                    member.provider = op.provider;
                if (op.model !== undefined)
                    member.model = op.model;
                if (op.reasoningEffort !== undefined)
                    member.reasoningEffort = op.reasoningEffort;
            }
        }
        else if (op.action === 'add_task') {
            const id = op.id || nextTaskId(team);
            if (!/^[a-zA-Z0-9_-]{1,80}$/u.test(id))
                throw new Error('任务 ID 仅支持字母、数字、下划线和连字符');
            // Original task tools also allocate tN from taskSeq. Explicit canvas IDs
            // must advance their shared sequence, including within this proposal.
            if (/^t[1-9]\d*$/u.test(id)) {
                const sequence = Number(id.slice(1));
                if (!Number.isSafeInteger(sequence) || sequence >= Number.MAX_SAFE_INTEGER)
                    throw new Error('任务 ID 序号超出范围');
                team.taskSeq = Math.max(team.taskSeq, sequence);
            }
            team.tasks.push({ id, subject: op.subject, description: op.description, adaptationIssue: op.adaptationIssue, assignee: op.checkpoint ? undefined : op.assignee || undefined,
                dependencies: op.dependencies, kind: 'work', status: 'pending', attempt: 0, createdAt: now, updatedAt: now,
                ...op.configurationPending || !!op.adaptationIssue?.trim() ? { workflowConfigPending: true, workflowPaused: true, workflowAwaitingStart: true } : {},
                ...op.checkpoint ? { checkpoint: { round: 1, history: [] } } : {} });
        }
        else if (op.action === 'update_task') {
            const task = taskOf(team, op.id);
            // Connecting new upstream work is the manual equivalent of a rework round.
            // A rejected human checkpoint has no execution process to stop. Only a
            // dependency edit that adds an input may reopen it; keep other edits fenced.
            const reconnectRejected = task.checkpoint?.decision === 'reject'
                && !!op.dependencies?.some(id => !task.dependencies.includes(id))
                && op.subject === undefined && op.description === undefined && op.adaptationIssue === undefined && op.assignee === undefined && !op.confirmConfiguration;
            editable(task, reconnectRejected);
            if (op.subject !== undefined)
                task.subject = op.subject;
            if (op.description !== undefined)
                task.description = op.description;
            updateDescription(task, op);
            if (op.assignee !== undefined)
                task.assignee = op.assignee || undefined;
            if (op.dependencies !== undefined)
                task.dependencies = op.dependencies;
            if (op.confirmConfiguration && task.workflowConfigPending) {
                if (task.adaptationIssue?.trim())
                    throw new Error(`任务「${task.subject}」仍有需要确认的问题：${task.adaptationIssue}。请补充任务要求，并在问题解决后清除问题说明。`);
                if (!task.subject.trim() || !task.description?.trim())
                    throw new Error(`请填写 ${task.subject} 的名称与任务／验收要求，再完成配置`);
                task.workflowConfigPending = false;
                if (team.phase === 'staged')
                    task.workflowPaused = false;
            }
            const validation = validateCreateTask({ ...team, tasks: team.tasks.filter(t => t.id !== task.id) }, task);
            if (!validation.ok)
                throw new Error(validation.error ?? '任务修改违反验收契约');
            if (reconnectRejected && task.checkpoint)
                task.checkpoint = { round: task.checkpoint.round + 1, history: task.checkpoint.history };
            task.updatedAt = now;
        }
        else if (op.action === 'remove_task') {
            const task = taskOf(team, op.id);
            editable(task);
            if (team.tasks.some(t => t.dependencies.includes(task.id)))
                throw new Error('请先断开该任务的下游连接');
            team.tasks = team.tasks.filter(t => t.id !== task.id);
        }
        else if (op.action === 'rerun_task') {
            const original = taskOf(team, op.id);
            if (team.phase === 'staged')
                throw new Error('团队尚未启动，请直接编辑待执行任务');
            if (!canRestartTask(original))
                throw new Error('只能重跑已结束的执行任务');
            if (op.subject !== undefined)
                original.subject = op.subject;
            if (op.description !== undefined)
                original.description = op.description;
            updateDescription(original, op);
            if (original.adaptationIssue?.trim())
                throw new Error(`任务「${original.subject}」仍有需要确认的问题：${original.adaptationIssue}。请补充任务要求，并在问题解决后清除问题说明。`);
            original.workflowConfigPending = false;
            if (op.assignee !== undefined)
                original.assignee = op.assignee || undefined;
            const owner = team.members.find(member => member.name === original.assignee && member.status !== 'removed');
            if (!owner || owner.stopping || team.tasks.some(task => task.assignee === owner.name && (['claimed', 'in_progress'].includes(task.status) || task.reassigning)))
                throw new Error('执行成员不可用或仍在运行，请先停止该成员的任务');
            const impact = rerunImpact(team.tasks, original.id);
            if (impact.active.length)
                throw new Error('受影响的下游任务仍在运行，请先停止后重跑');
            const instructions = op.instructions?.trim();
            if (!instructions)
                throw new Error('请在编辑任务中填写本次重跑要求');
            const rerunContext = { instructions, previousStatus: original.status, previousOutput: original.output, previousAttemptId: original.attemptId, requestedAt: now };
            resetTaskForRerun(original, false, now);
            original.workflowRerunContext = rerunContext;
            const validation = validateCreateTask({ ...team, tasks: team.tasks.filter(t => t.id !== original.id) }, original);
            if (!validation.ok)
                throw new Error(validation.error ?? '任务修改违反验收契约');
            for (const task of impact.descendants) {
                resetTaskForRerun(task, true, now);
                const review = task.checkpoint && team.workflow?.discussions[`discussion:check:${task.id}`];
                if (review) {
                    delete review.materials;
                    delete review.evidence;
                    delete review.materialsRound;
                    if (review.native)
                        delete review.native.reviewEvidence;
                }
            }
        }
        else {
            const gate = taskOf(team, op.id);
            if (gate.checkpoint?.decision !== 'reject' || gate.status !== 'pending')
                throw new Error('只能为已拒绝的人工检查创建返工');
            const upstream = checkpointInputs(team, gate);
            if (!op.taskIds.length || op.taskIds.some(id => !upstream.some(t => t.id === id && !t.checkpoint)))
                throw new Error('请选择该检查点上游的执行任务');
            const rerun = new Set(op.taskIds);
            // Preserve dependent computation: a changed input requires its downstream work again.
            for (const task of upstream)
                if (task.dependencies.some(id => rerun.has(id)))
                    rerun.add(task.id);
            if (upstream.some(t => rerun.has(t.id) && t.checkpoint))
                throw new Error('返工路径跨越其他人工检查，请分段处理');
            const mapping = new Map();
            for (const task of upstream.filter(t => rerun.has(t.id))) {
                if (['claimed', 'in_progress'].includes(task.status))
                    throw new Error('返工任务仍在运行');
                const id = nextTaskId(team);
                mapping.set(task.id, id);
                team.tasks.push({ id, subject: `${task.subject} · 返工 ${gate.checkpoint.round + 1}`,
                    description: `${task.description ?? ''}\n\n返工要求：${op.instructions}`, assignee: task.assignee,
                    dependencies: task.dependencies.map(dep => mapping.get(dep) ?? dep), kind: task.kind,
                    objective: task.objective, acceptance: task.acceptance, inScope: task.inScope, outOfScope: task.outOfScope, verify: task.verify,
                    deliverables: task.deliverables, nonGoals: task.nonGoals, coverageOf: task.coverageOf, round: task.round,
                    contractSnapshot: task.contractSnapshot, revisions: task.revisions, sourceFindingIds: task.sourceFindingIds,
                    findingSourceTaskIds: task.findingSourceTaskIds?.map(id => mapping.get(id) ?? id),
                    reviewedTaskId: task.reviewedTaskId ? mapping.get(task.reviewedTaskId) ?? task.reviewedTaskId : undefined,
                    sourceTaskId: task.sourceTaskId ? mapping.get(task.sourceTaskId) ?? task.sourceTaskId : undefined,
                    status: 'pending', attempt: 0, createdAt: now, updatedAt: now });
            }
            gate.dependencies = gate.dependencies.map(id => mapping.get(id) ?? id);
            gate.checkpoint = { round: gate.checkpoint.round + 1, history: gate.checkpoint.history };
            gate.updatedAt = now;
        }
    }
    validateWorkflowGraph(team);
    return team;
}
export function proposeWorkflow(team, title, raw, maxMembers) {
    const operations = parseWorkflowOperations(raw);
    applyWorkflowOperations(team, operations, maxMembers);
    return { id: randomUUID(), base: workflowFingerprint(team), title, operations, status: 'pending', createdAt: Date.now() };
}
export function applyWorkflowProposal(team, proposal, maxMembers) {
    if (proposal.status !== 'pending' || proposal.base !== workflowFingerprint(team))
        throw new Error('团队状态已变化，请重新生成修改预览');
    const updated = applyWorkflowOperations(team, parseWorkflowOperations(proposal.operations), maxMembers);
    const state = workflowState(updated);
    for (const discussion of Object.values(state.discussions))
        if (discussion.proposal?.id === proposal.id) {
            discussion.proposal = { ...proposal, status: 'applied' };
        }
    state.history.push({ ...proposal, status: 'applied' });
    return updated;
}
/** Only the authenticated human route calls this; no model tool can decide a gate. */
export function decideCheckpoint(team, id, decision, evidence, current, note, materials) {
    const task = taskOf(team, id);
    if (!checkpointReady(team, task) || !task.checkpoint || task.checkpoint.decision)
        throw new Error('该检查点当前不能验收');
    if (!evidence || evidence !== current)
        throw new Error('验收材料已变化，请刷新材料后重新检查');
    if (materials !== undefined && createHash('sha256').update(materials).digest('hex') !== evidence)
        throw new Error('验收材料已变化，请刷新材料后重新检查');
    const gate = task.checkpoint, at = Date.now();
    gate.decision = decision;
    gate.decidedAt = at;
    gate.note = note;
    gate.evidence = evidence;
    gate.history.push({ round: gate.round, decision, at, note, evidence, ...(materials === undefined ? {} : { materials }) });
    task.updatedAt = at;
    if (decision === 'approve') {
        task.status = 'completed';
        task.output = `人工验收通过：${note}`;
    }
}
