import { galleryAccessKeys } from "../gallery-access.js";
import { sourceText } from "./workflow-text.js";
import { draftSource, initialEditorDraft } from "./workbench-selection.js";
export function draftTarget(key, teamId) {
    try {
        const value = JSON.parse(key);
        if (!Array.isArray(value) || value.length !== 3 || value[0] !== teamId || !['member', 'task', 'check'].includes(value[1]) || (value[2] !== null && typeof value[2] !== 'string'))
            return;
        return { type: value[1], ...value[2] === null ? {} : { id: value[2] } };
    }
    catch {
        return;
    }
}
export function draftChanged(entry, baseline) {
    const original = entry.baseline ?? baseline;
    return Object.keys({ ...original, ...entry.values }).some(key => (entry.values[key] ?? '') !== (original[key] ?? ''));
}
export function pendingDrafts(team, drafts, l = sourceText) {
    if (!team)
        return [];
    return Object.entries(drafts).flatMap(([key, entry]) => {
        const target = draftTarget(key, team.id);
        if (!target || !draftChanged(entry, initialEditorDraft(team, target).values))
            return [];
        const label = target.type === 'member' ? entry.values['name'] || target.id || l('新 Agent') : entry.values['subject'] || target.id || l('新任务');
        return [{ key, entry, target, label }];
    });
}
const stringRecord = (value) => !!value && typeof value === 'object' && !Array.isArray(value) && Object.values(value).every(item => typeof item === 'string');
export function decodeDrafts(raw, teamId) {
    try {
        const value = JSON.parse(raw ?? '{}');
        if (value.version !== 1 || !value.drafts || typeof value.drafts !== 'object' || Array.isArray(value.drafts))
            return {};
        return Object.fromEntries(Object.entries(value.drafts).filter(([key, item]) => {
            const entry = item;
            return draftTarget(key, teamId) && entry && typeof entry.source === 'string' && stringRecord(entry.values) && stringRecord(entry.baseline);
        }));
    }
    catch {
        return {};
    }
}
export const draftStorageKey = (sessionId, teamId) => `teamflow:property-drafts:v1:${JSON.stringify([sessionId, teamId])}`;
export function draftGalleryAccess(draft) {
    const result = {};
    for (const key of galleryAccessKeys) {
        if (draft[key] === 'true' || draft[key] === 'false')
            result[key] = draft[key] === 'true';
    }
    return result;
}
/** Bulk save changes configuration only; execution decisions require their own button. */
export function propertyOperation(team, target, entry) {
    if (entry.source !== draftSource(team, target))
        throw new Error('有对象已变化，请逐项核对草稿后再保存全部。');
    const value = entry.values;
    if (['rerunTaskId', 'rerunInstructions'].some(key => (value[key] ?? '') !== (entry.baseline?.[key] ?? initialEditorDraft(team, target).values[key] ?? '')))
        throw new Error('重跑设置需在对应任务中单独确认，保存全部不会执行或丢弃重跑设置。');
    if (target.type === 'member') {
        if (target.id && !team.members.some(m => m.name === target.id && m.status !== 'removed'))
            throw new Error(`成员 ${target.id} 已移除，草稿保留。`);
        const route = value['routeChanged'] ? { provider: value['provider'], model: value['model'], reasoningEffort: value['reasoningEffort'] || 'default' } : {};
        return target.id
            ? { action: 'update_member', name: target.id, summary: value['summary'], role: value['role'], executionPrompt: value['executionPrompt'], specificPrompt: value['specificPrompt'], ...draftGalleryAccess(value), ...route }
            : { action: 'add_member', name: value['name'] ?? '', summary: value['summary'] ?? '', role: value['role'], executionPrompt: value['executionPrompt'], specificPrompt: value['specificPrompt'], ...draftGalleryAccess(value), ...route };
    }
    const task = team.tasks.find(item => item.id === target.id);
    if (!task || task.status !== 'pending')
        throw new Error('已开始或已结束任务的草稿需单独处理；保存全部不会自动重跑。');
    return { action: 'update_task', id: task.id, subject: value['subject'], description: value['description'], adaptationIssue: value['adaptationIssue'] ?? '', assignee: target.type === 'check' ? undefined : value['assignee'] };
}
/** Editing a composer while its old message sends must never lose the new text. */
export const remainingMessage = (current, submitted) => current === submitted ? '' : current;
