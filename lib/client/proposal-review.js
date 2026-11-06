import { sourceText } from "./workflow-text.js";
const memberFields = ['summary', 'role', 'executionPrompt', 'specificPrompt', 'provider', 'model', 'reasoningEffort', 'gallerySkill', 'galleryMcp'];
const taskFields = ['subject', 'description', 'assignee', 'dependencies'];
const labels = { name: '成员名称', id: '任务 ID', summary: 'Summary · 功能概述', role: '长期职责', executionPrompt: '执行指令 / PE', provider: '模型提供方', model: '模型', reasoningEffort: 'Thinking', gallerySkill: '允许使用 Gallery Skill', galleryMcp: '允许使用 Gallery MCP', subject: '任务名称', description: '任务要求 / 验收要求', assignee: '负责人', dependencies: '上游任务 ID', taskIds: '返工任务 ID', instructions: '本次要求' };
const show = (value) => Array.isArray(value) ? value.join('\n') : typeof value === 'string' || typeof value === 'boolean' ? String(value) : '';
export function reviewFields(team, operation, l = sourceText) {
    const op = operation;
    const isMember = operation.action.endsWith('member');
    const removed = operation.action.startsWith('remove_');
    const added = operation.action.startsWith('add_');
    const original = isMember ? team.members.find(item => item.name === op['name']) : team.tasks.find(item => item.id === op['id']);
    const before = added ? {} : (original ?? {});
    const keys = operation.action === 'rerun_task' ? [...taskFields.filter(key => key !== 'dependencies' && op[key] !== undefined), 'instructions'] : operation.action === 'rework' ? ['taskIds', 'instructions'] : isMember ? [...(added ? ['name'] : []), ...memberFields] : [...(added && op['id'] ? ['id'] : []), ...taskFields];
    const fields = keys.filter(key => !(key === 'assignee' && operation.action === 'add_task' && operation.checkpoint) && (key !== 'gallerySkill' && key !== 'galleryMcp' || op[key] !== undefined || before[key] !== undefined)).map(key => ({ key, label: l(labels[key] ?? key), before: show(before[key]), after: removed ? '' : show(op[key] === undefined && !added ? before[key] : op[key]), array: ['dependencies', 'taskIds'].includes(key), editable: !removed && key !== 'id' && key !== 'gallerySkill' && key !== 'galleryMcp' }));
    const name = String(isMember ? op['name'] : op['subject'] ?? before['subject'] ?? op['id']);
    if (['add_task', 'update_task', 'rerun_task'].includes(operation.action) && (op['adaptationIssue'] !== undefined || show(before['adaptationIssue'])))
        fields.push({ key: 'adaptationIssue', label: l("需要确认的问题（处理后清空）"), before: show(before['adaptationIssue']), after: show(op['adaptationIssue'] ?? before['adaptationIssue']), array: false, editable: true });
    return { title: `${added ? l("新增") : removed ? l("删除") : operation.action === 'rerun_task' ? l("仅重跑") : operation.action === 'rework' ? l("返工") : l("修改")}${isMember ? l("成员") : operation.action === 'add_task' && op['checkpoint'] ? l("人工检查") : l("任务")} · ${name}`, fields: fields.map(f => f.key === 'specificPrompt' ? { ...f, label: l("本次补充指令") } : f) };
}
export function setReviewField(operation, field, value) {
    return { ...operation, [field.key]: field.array ? [...new Set(value.split(/[\n,，]+/u).map(item => item.trim()).filter(Boolean))] : value };
}
export function reviewedOperations(team, operations, included) {
    return operations.flatMap((operation, index) => {
        if (!included[index])
            return [];
        if (!operation.action.startsWith('update_'))
            return [operation];
        if (operation.action === 'update_task' && operation.confirmConfiguration !== undefined)
            return [operation];
        const result = operation.action === 'update_member' ? { action: operation.action, name: operation.name } : { action: operation.action, id: operation.id };
        for (const field of reviewFields(team, operation).fields)
            if (field.before !== field.after)
                result[field.key] = operation[field.key];
        return Object.keys(result).length > 2 ? [result] : [];
    });
}
export function lineDiff(before, after) {
    if (before === after)
        return before.split('\n').map(text => ({ kind: 'same', text }));
    const a = before ? before.split('\n') : [], b = after ? after.split('\n') : [];
    // Large PE values must not allocate an unbounded quadratic table.
    if (a.length * b.length > 160000)
        return [...a.map(text => ({ kind: 'removed', text })), ...b.map(text => ({ kind: 'added', text }))];
    const table = Array.from({ length: a.length + 1 }, () => new Uint32Array(b.length + 1));
    for (let i = a.length - 1; i >= 0; i--)
        for (let j = b.length - 1; j >= 0; j--)
            table[i][j] = a[i] === b[j] ? table[i + 1][j + 1] + 1 : Math.max(table[i + 1][j], table[i][j + 1]);
    const result = [];
    let i = 0, j = 0;
    while (i < a.length || j < b.length) {
        if (i < a.length && j < b.length && a[i] === b[j]) {
            result.push({ kind: 'same', text: a[i++] });
            j++;
        }
        else if (i < a.length && (j === b.length || table[i + 1][j] >= table[i][j + 1]))
            result.push({ kind: 'removed', text: a[i++] });
        else
            result.push({ kind: 'added', text: b[j++] });
    }
    return result;
}
/** Find unresolved issues in submission order without clearing or confirming them implicitly. */
export function proposalIssues(team, operations, included) {
    const issues = new Map(team.tasks.map(task => [task.id, task.adaptationIssue ?? '']));
    return operations.flatMap((op, index) => {
        if (!included[index] || !['add_task', 'update_task', 'rerun_task'].includes(op.action))
            return [];
        if (op.action !== 'add_task' && op.action !== 'update_task' && op.action !== 'rerun_task')
            return [];
        const issue = op.adaptationIssue ?? (op.id ? issues.get(op.id) : '') ?? '';
        if (op.id)
            issues.set(op.id, issue);
        return issue.trim() ? [{ index, issue, blocksApply: op.action === 'rerun_task' || op.action === 'update_task' && !!op.confirmConfiguration }] : [];
    });
}
/** Template approval must carry inherited issues because its server normalization defaults missing values to empty. */
export function adaptationReviewOperations(team, operations) {
    return operations.map(op => op.action === 'update_task' ? { ...op, adaptationIssue: op.adaptationIssue ?? team.tasks.find(task => task.id === op.id)?.adaptationIssue ?? '' } : op);
}
