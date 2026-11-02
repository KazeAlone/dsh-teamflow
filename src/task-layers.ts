/** Portable task contracts shared by the browser, persistence and execution. */
export interface TaskBrief { requirements: string; deliverables: string; acceptance: string }
export interface TaskLayers { general: TaskBrief; specific: TaskBrief }
export function taskNeedsConfiguration(task:{workflowConfigPending?:boolean;adaptationIssue?:string;layers?:TaskLayers;specificContractVersion?:number}):boolean {
  return !!task.workflowConfigPending || !!task.adaptationIssue?.trim() || !!task.layers && (task.specificContractVersion !== 1 || !task.layers.general.requirements.trim() || !task.layers.specific.requirements.trim())
}
export const emptyBrief = (): TaskBrief => ({ requirements: '', deliverables: '', acceptance: '' })
export function isTaskBrief(value: unknown): value is TaskBrief {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const v = value as Record<string, unknown>
  return ['requirements','deliverables','acceptance'].every(key => typeof v[key] === 'string' && v[key].length <= 16000)
}
export function isTaskLayers(value: unknown): value is TaskLayers {
  const v = value as TaskLayers | undefined
  return !!v && isTaskBrief(v.general) && isTaskBrief(v.specific)
}
function valueType(value: unknown): string {
  return value === null ? 'null' : Array.isArray(value) ? 'array' : typeof value
}
function layerObject(value: unknown, path: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${path} must be an object (received ${valueType(value)}). Pass a JSON object directly, not a JSON-encoded string, array or null.`)
  }
  return value as Record<string, unknown>
}
export function parseBrief(value: unknown, path = 'taskBrief'): TaskBrief {
  const brief = layerObject(value, path)
  for (const key of ['requirements', 'deliverables', 'acceptance']) {
    if (typeof brief[key] !== 'string') throw new Error(`${path}.${key} must be a string (received ${valueType(brief[key])}). Use plain text for lists, not arrays; all three text fields are required.`)
    if (brief[key].length > 16000) throw new Error(`${path}.${key} must contain at most 16000 characters.`)
  }
  return { requirements: (brief['requirements'] as string).trim(), deliverables: (brief['deliverables'] as string).trim(), acceptance: (brief['acceptance'] as string).trim() }
}
export function parseLayers(value: unknown, path = 'layers'): TaskLayers {
  const layers = layerObject(value, path)
  return { general: parseBrief(layers['general'], `${path}.general`), specific: parseBrief(layers['specific'], `${path}.specific`) }
}
export function briefText(value: TaskBrief): string {
  return [value.requirements, value.deliverables && `交付物：\n${value.deliverables}`, value.acceptance && `验收要求：\n${value.acceptance}`].filter(Boolean).join('\n\n')
}
export function taskText(task: { description?: string; layers?: TaskLayers }): string {
  return task.layers ? briefText(task.layers.specific) : task.description ?? ''
}
export function layersFromDraft(draft: Record<string,string>): TaskLayers {
  return {general:{requirements:draft['generalRequirements'] ?? '',deliverables:draft['generalDeliverables'] ?? '',acceptance:draft['generalAcceptance'] ?? ''},
    specific:{requirements:draft['description'] ?? '',deliverables:draft['specificDeliverables'] ?? '',acceptance:draft['specificAcceptance'] ?? ''}}
}

/** New model-authored nodes must contain a reusable and an instance contract. */
export function requireGeneratedTaskLayers(operations:import('./workflow-types.ts').WorkflowOperation[]):void {
  for(const op of operations)if(op.action==='add_task'){
    if(!op.layers || !op.layers.general.requirements.trim() || !op.layers.specific.requirements.trim())throw new Error('新建任务必须提供 layers.general 和 layers.specific，各含 requirements、deliverables、acceptance 三个字符串；两层 requirements 均不能为空。不要将分层标题写入 description。')
  }
}
export const briefParameter = {type:'object',additionalProperties:false,properties:{requirements:{type:'string',required:true},deliverables:{type:'string',required:true,description:'Plain text, not an array. Separate multiple deliverables with newlines.'},acceptance:{type:'string',required:true,description:'Plain text, not an array. Separate multiple acceptance criteria with newlines.'}}} as const
export const taskLayersParameter = {type:'object',description:'Pass a JSON object directly, never a JSON-encoded string, array, null or empty string. general and specific are objects; their requirements, deliverables and acceptance fields are strings. Generate both layers when creating tasks: general is the reusable method and quality constraints; specific is the COMPLETE standalone execution contract, concretizing every general method, deliverable and acceptance constraint for the current goal, paths and parameters. Executors see only specific, never general; do not refer back to general. Do not duplicate layers in description. Omit layers entirely when making an unrelated edit.',additionalProperties:false,properties:{general:{...briefParameter,required:true},specific:{...briefParameter,required:true}}} as const
