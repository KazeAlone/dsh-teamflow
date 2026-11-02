/** Reusable requirements stored only in template definitions. */
export interface TaskBrief { requirements: string; deliverables: string; acceptance: string }
export const emptyBrief = (): TaskBrief => ({ requirements: '', deliverables: '', acceptance: '' })
export function isTaskBrief(value: unknown): value is TaskBrief {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const v = value as Record<string, unknown>
  return ['requirements','deliverables','acceptance'].every(key => typeof v[key] === 'string' && v[key].length <= 16000)
}
function valueType(value: unknown): string {
  return value === null ? 'null' : Array.isArray(value) ? 'array' : typeof value
}
function briefObject(value: unknown, path: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${path} must be an object (received ${valueType(value)}). Pass a JSON object directly, not a JSON-encoded string, array or null.`)
  }
  return value as Record<string, unknown>
}
export function parseBrief(value: unknown, path = 'taskBrief'): TaskBrief {
  const brief = briefObject(value, path)
  for (const key of ['requirements', 'deliverables', 'acceptance']) {
    if (typeof brief[key] !== 'string') throw new Error(`${path}.${key} must be a string (received ${valueType(brief[key])}). Use plain text for lists, not arrays; all three text fields are required.`)
    if (brief[key].length > 16000) throw new Error(`${path}.${key} must contain at most 16000 characters.`)
  }
  return { requirements: (brief['requirements'] as string).trim(), deliverables: (brief['deliverables'] as string).trim(), acceptance: (brief['acceptance'] as string).trim() }
}
export function briefText(value: TaskBrief): string {
  return [value.requirements, value.deliverables && `交付物：\n${value.deliverables}`, value.acceptance && `验收要求：\n${value.acceptance}`].filter(Boolean).join('\n\n')
}
