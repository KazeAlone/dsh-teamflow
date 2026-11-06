import { galleryAccessKeys, type GalleryAccess } from "../gallery-access.ts"
import { sourceText, type WorkflowText } from './workflow-text.ts'
import type { TeamState } from '../types.ts'
import type { WorkflowOperation } from '../workflow-types.ts'
import { draftSource, initialEditorDraft, type EditorDraft, type EditorTarget } from './workbench-selection.ts'

export function draftTarget(key: string, teamId: string): EditorTarget | undefined {
  try {
    const value: unknown = JSON.parse(key)
    if (!Array.isArray(value) || value.length !== 3 || value[0] !== teamId || !['member','task','check'].includes(value[1]) || (value[2] !== null && typeof value[2] !== 'string')) return
    return { type: value[1], ...value[2] === null ? {} : { id: value[2] } }
  } catch { return }
}
export function draftChanged(entry: EditorDraft, baseline: Record<string,string>): boolean {
  const original = entry.baseline ?? baseline
  return Object.keys({...original,...entry.values}).some(key => (entry.values[key] ?? '') !== (original[key] ?? ''))
}
export function pendingDrafts(team: TeamState | undefined, drafts: Record<string,EditorDraft>, l: WorkflowText = sourceText) {
  if (!team) return []
  return Object.entries(drafts).flatMap(([key, entry]) => {
    const target = draftTarget(key, team.id)
    if (!target || !draftChanged(entry, initialEditorDraft(team,target).values)) return []
    const label = target.type === 'member' ? entry.values['name'] || target.id || l('新 Agent') : entry.values['subject'] || target.id || l('新任务')
    return [{key,entry,target,label}]
  })
}
const stringRecord = (value: unknown): value is Record<string,string> => !!value && typeof value === 'object' && !Array.isArray(value) && Object.values(value).every(item => typeof item === 'string')
export function decodeDrafts(raw: string | null, teamId: string): Record<string,EditorDraft> {
  try {
    const value = JSON.parse(raw ?? '{}')
    if (value.version !== 1 || !value.drafts || typeof value.drafts !== 'object' || Array.isArray(value.drafts)) return {}
    return Object.fromEntries(Object.entries(value.drafts).filter(([key, item]) => {
      const entry = item as EditorDraft | null
      return draftTarget(key,teamId) && entry && typeof entry.source === 'string' && stringRecord(entry.values) && stringRecord(entry.baseline)
    })) as Record<string,EditorDraft>
  } catch { return {} }
}
export const draftStorageKey = (sessionId: string, teamId: string) => `teamflow:property-drafts:v1:${JSON.stringify([sessionId,teamId])}`

export function draftGalleryAccess(draft: Record<string, string>): GalleryAccess {
  const result: GalleryAccess = {}
  for (const key of galleryAccessKeys) {
    if (draft[key] === 'true' || draft[key] === 'false') result[key] = draft[key] === 'true'
  }
  return result
}

/** Bulk save changes configuration only; execution decisions require their own button. */
export function propertyOperation(team: TeamState, target: EditorTarget, entry: EditorDraft): WorkflowOperation {
  if (entry.source !== draftSource(team,target)) throw new Error('有对象已变化，请逐项核对草稿后再保存全部。')
  const value = entry.values
  if (['rerunTaskId','rerunInstructions'].some(key => (value[key] ?? '') !== (entry.baseline?.[key] ?? initialEditorDraft(team,target).values[key] ?? ''))) throw new Error('重跑设置需在对应任务中单独确认，保存全部不会执行或丢弃重跑设置。')
  if (target.type === 'member') {
    if (target.id && !team.members.some(m => m.name === target.id && m.status !== 'removed')) throw new Error(`成员 ${target.id} 已移除，草稿保留。`)
    const route = value['routeChanged'] ? {provider:value['provider'],model:value['model'],reasoningEffort:value['reasoningEffort'] || 'default'} : {}
    return target.id
      ? {action:'update_member',name:target.id,summary:value['summary'],role:value['role'],executionPrompt:value['executionPrompt'],specificPrompt:value['specificPrompt'],...draftGalleryAccess(value),...route}
      : {action:'add_member',name:value['name'] ?? '',summary:value['summary'] ?? '',role:value['role'],executionPrompt:value['executionPrompt'],specificPrompt:value['specificPrompt'],...draftGalleryAccess(value),...route}
  }
  const task = team.tasks.find(item => item.id === target.id)
  if (!task || task.status !== 'pending') throw new Error('已开始或已结束任务的草稿需单独处理；保存全部不会自动重跑。')
  return {action:'update_task',id:task.id,subject:value['subject'],description:value['description'],adaptationIssue:value['adaptationIssue']??'',assignee:target.type === 'check' ? undefined : value['assignee']}
}

/** Editing a composer while its old message sends must never lose the new text. */
export const remainingMessage = (current: string, submitted: string): string => current === submitted ? '' : current
