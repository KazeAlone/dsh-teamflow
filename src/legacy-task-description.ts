/** Read compatibility only. New tasks never write reusable or instance layers. */
import { briefText, isTaskBrief, type TaskBrief } from './template-brief.ts'
export interface TaskLayers { general: TaskBrief; specific: TaskBrief }
export function isTaskLayers(value: unknown): value is TaskLayers {
  const v = value as TaskLayers | undefined
  return !!v && isTaskBrief(v.general) && isTaskBrief(v.specific)
}

export function legacyDescription(value: { description?: unknown; layers?: unknown; specificContractVersion?: unknown }): string {
  if (!isTaskLayers(value.layers)) return typeof value.description === 'string' ? value.description : ''
  const specific = briefText(value.layers.specific)
  // Older instances were deltas. Preserve both sets of requirements in one
  // document; modern complete contracts already include the generic rules.
  if (value.specificContractVersion === 1 && value.layers.specific.requirements.trim()) return specific
  return [briefText(value.layers.general), specific, typeof value.description === 'string' && value.description !== specific ? value.description : ''].filter(Boolean).join('\n\n')
}

export function flattenLegacyTask(value: Record<string, unknown>): Record<string, unknown> {
  if (!isTaskLayers(value['layers'])) return value
  const next: Record<string, unknown> = { ...value, description: legacyDescription(value) }
  if (!value['layers'].specific.requirements.trim()) {
    if (value['status'] === 'pending') next['workflowConfigPending'] = true
    if (value['action'] === 'add_task') next['configurationPending'] = true
    if (value['action'] === 'update_task') next['confirmConfiguration'] = false
  }
  delete next['layers']; delete next['specificContractVersion']; delete next['specificSourceGoal']
  return next
}
