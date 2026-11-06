import { parseGalleryAccess, type GalleryAccess } from "./gallery-access.ts"
/** Runtime-independent template format. Only explicitly portable fields are exported. */
import type { TeamState } from './types.ts'
import type { WorkflowOperation } from './workflow-types.ts'
import { emptyBrief, parseBrief, type TaskBrief } from './template-brief.ts'

export interface TemplateMember extends GalleryAccess { name: string; summary: string; role: string; executionPrompt: string }
export interface TemplateTask { id: string; subject: string; assignee: string; dependencies: string[]; checkpoint: boolean; general: TaskBrief }
export interface TemplateDefinition {
  name: string; description: string; tags: string[]; inputs: string
  members: TemplateMember[]; tasks: TemplateTask[]; positions: Record<string,{x:number;y:number}>
}
export interface TemplateVersion extends TemplateDefinition { id: string; version: number; createdAt: number; updatedAt: number }
export interface TemplateSource { id: string; version: number; name: string }

// The model submits an object, never JSON encoded inside a string. Keep layout
// out of generation: the server copies it from the source workflow.
const requiredText = { type: 'string', required: true } as const
export const templateDefinitionParameter = {
  type: 'object', required: true, additionalProperties: false,
  description: 'Submit the template object directly, not a JSON-encoded string. Copy node IDs, owners and dependencies from templateFormat; omit positions.',
  properties: {
    name: requiredText, description: requiredText, inputs: requiredText,
    tags: { type: 'array', required: true, items: { type: 'string' } },
    members: { type: 'array', required: true, items: { type: 'object', additionalProperties: false, properties: {
      name: requiredText, summary: requiredText, role: requiredText, executionPrompt: requiredText,
    } } },
    tasks: { type: 'array', required: true, items: { type: 'object', additionalProperties: false, properties: {
      id: requiredText, subject: requiredText, assignee: { ...requiredText, description: 'Exact member name, or empty string for a human checkpoint. Never null.' },
      dependencies: { type: 'array', required: true, items: { type: 'string' } }, checkpoint: { type: 'boolean', required: true },
      general: { type: 'object', required: true, additionalProperties: false, properties: {
        requirements: requiredText, deliverables: requiredText, acceptance: requiredText,
      } },
    } } },
  },
} as const

export function templateGenerationFormat(team: TeamState): Omit<TemplateDefinition, 'positions'> {
  const { positions: _positions, ...format } = templateSeed(team)
  return format
}
const object = (v: unknown): Record<string,unknown> => {
  if (!v || typeof v !== 'object' || Array.isArray(v)) throw new Error('模板格式无效')
  return v as Record<string,unknown>
}
function text(v: unknown, required = false, max = 16000): string {
  if (typeof v !== 'string' || v.length > max || required && !v.trim()) throw new Error('模板文本为空或过长')
  return v.trim()
}
function array(v: unknown, max: number): unknown[] {
  if (!Array.isArray(v) || v.length > max) throw new Error('模板列表无效或过长')
  return v
}
export function parseTemplate(value: unknown): TemplateDefinition {
  const v = object(value)
  const members = array(v['members'], 32).map(raw => {
    const m = object(raw)
    return {name:text(m['name'],true,80), summary:text(m['summary']), role:text(m['role']), executionPrompt:text(m['executionPrompt']), ...parseGalleryAccess(m)}
  })
  if (members.some(m => !/^[\p{L}\p{N}_-]+$/u.test(m.name) || m.name.toLowerCase() === 'captain') || new Set(members.map(m=>m.name.toLowerCase())).size !== members.length) throw new Error('模板成员名称重复或无效')
  const tasks = array(v['tasks'], 32).map(raw => {
    const t = object(raw), id = text(t['id'],true,80)
    if (!/^[a-zA-Z0-9_-]+$/u.test(id) || typeof t['checkpoint'] !== 'boolean') throw new Error('模板节点 ID 或类型无效')
    if(/^t\d+$/.test(id) && (!Number.isSafeInteger(Number(id.slice(1))) || Number(id.slice(1))>=Number.MAX_SAFE_INTEGER))throw new Error('模板节点序号超出范围')
    return {id, subject:text(t['subject'],true,200), assignee:text(t['assignee']), dependencies:array(t['dependencies'],32).map(d=>text(d,true,80)), checkpoint:t['checkpoint'], general:parseBrief(t['general'])}
  })
  if (!tasks.length || new Set(tasks.map(t=>t.id)).size !== tasks.length) throw new Error('模板需要 1–32 个不同的节点')
  const ids = new Set(tasks.map(t=>t.id)), names = new Set(members.map(m=>m.name))
  for (const t of tasks) {
    if (t.checkpoint && t.assignee || t.assignee && t.assignee !== 'captain' && !names.has(t.assignee)) throw new Error('模板负责人不存在或人工节点分配了负责人')
    if (t.dependencies.some(id=>!ids.has(id)) || new Set(t.dependencies).size !== t.dependencies.length) throw new Error('模板依赖缺失或重复')
  }
  const done=new Set<string>(), visiting=new Set<string>()
  const visit=(id:string):void=>{if(visiting.has(id))throw new Error('模板连接产生循环');if(done.has(id))return;visiting.add(id);tasks.find(t=>t.id===id)!.dependencies.forEach(visit);visiting.delete(id);done.add(id)}
  tasks.forEach(t=>visit(t.id))
  const positions:TemplateDefinition['positions']={}
  for(const [key,raw] of Object.entries(object(v['positions'] ?? {}))) {
    const p=object(raw)
    if (!key.startsWith('task:') || !ids.has(key.slice(5)) || !['x','y'].every(k=>typeof p[k]==='number' && Number.isFinite(p[k]) && p[k]>=0 && p[k]<=10000)) throw new Error('模板布局无效')
    positions[key]={x:p['x'] as number,y:p['y'] as number}
  }
  return {name:text(v['name'],true,120),description:text(v['description'],false,2000),inputs:text(v['inputs'],false,4000),tags:[...new Set(array(v['tags'],12).map(t=>text(t,true,40)))],members,tasks,positions}
}
/** A manual starting point; legacy descriptions are not silently promoted to generic instructions. */
export function templateSeed(team: TeamState): TemplateDefinition {
  return parseTemplate({name:team.name,description:'',inputs:'',tags:[],
    members:team.members.filter(m=>m.status!=='removed'||team.tasks.some(t=>t.assignee===m.name)).map(m=>({name:m.name,summary:m.summary??'',role:m.role??'',executionPrompt:m.executionPrompt??'', ...parseGalleryAccess({...m})})),
    tasks:team.tasks.map(t=>({id:t.id,subject:t.subject,assignee:t.checkpoint?'':t.assignee??'',dependencies:t.dependencies,checkpoint:!!t.checkpoint,general:emptyBrief()})),
    positions:Object.fromEntries(Object.entries(team.workflow?.positions??{}).filter(([key])=>team.tasks.some(t=>key===`task:${t.id}`)))})
}
export function templateTopology(value: Pick<TemplateDefinition,'members'|'tasks'>): string {
  return JSON.stringify({members:value.members.map(m=>m.name).sort(),tasks:value.tasks.map(t=>({id:t.id,assignee:t.assignee,checkpoint:t.checkpoint,dependencies:[...t.dependencies].sort()})).sort((a,b)=>a.id.localeCompare(b.id))})
}
export function extractedTemplate(team:TeamState, value:unknown):TemplateDefinition {
  const result=parseTemplate(value)
  const source = templateSeed(team)
  if(templateTopology(result)!==templateTopology(source))throw new Error('提炼模板必须保留成员、节点、负责人和连线')
  result.members = result.members.map(({ name, summary, role, executionPrompt }) => ({
    name, summary, role, executionPrompt,
    ...parseGalleryAccess({ ...source.members.find(member => member.name === name) }),
  }))
  return result
}
export function instantiateTemplate(template:TemplateVersion, id:string, captainSessionId:string, name:string, goal:string, now=Date.now()):TeamState {
  const clean=parseTemplate(template)
  return {id,name:name.trim()||clean.name,description:goal.trim(),captainSessionId,createdAt:now,phase:'staged',planReviewState:'awaiting_review',
    members:clean.members.map(m=>({...m,id:'',status:'idle',joinedAt:now,specificPrompt:''})),
    tasks:clean.tasks.map(t=>({id:t.id,subject:t.subject,assignee:t.assignee||undefined,dependencies:[...t.dependencies],kind:'work',status:'pending',attempt:0,createdAt:now,updatedAt:now,
      description:'',workflowConfigPending:true,workflowPaused:true,...t.checkpoint?{checkpoint:{round:1,history:[]}}:{}})),
    taskSeq:Math.max(0,...clean.tasks.map(t=>/^t\d+$/.test(t.id)?Number(t.id.slice(1)):0)),
    workflow:{templateDefinition:structuredClone(clean),positions:structuredClone(clean.positions),discussions:{},history:[],templateSource:{id:template.id,version:template.version,name:template.name}}}
}
/** The adaptation agent may fill the instance, never alter the saved graph or template definition. */
export function validateAdaptation(team:TeamState, operations:WorkflowOperation[]):void {
  if(!team.workflow?.templateSource || team.phase!=='staged')throw new Error('统一适配仅用于尚未启动的模板流程')
  const seen=new Set<string>()
  for(const op of operations){
    if(op.action==='update_member'){
      if(!team.members.some(m=>m.name===op.name)||Object.keys(op).some(k=>!['action','name','specificPrompt'].includes(k)))throw new Error('适配只能修改成员本次补充指令')
    }else if(op.action==='update_task'){
      const task=team.tasks.find(t=>t.id===op.id)
      if(!task || seen.has(op.id) || typeof op.description !== 'string' || Object.keys(op).some(k=>!['action','id','description','adaptationIssue','confirmConfiguration'].includes(k)))throw new Error('适配必须保留节点、名称、负责人和连线，只填写完整任务描述')
      if(!op.description.trim() && !op.adaptationIssue?.trim())throw new Error('请填写完整任务描述或说明缺少的信息')
      seen.add(op.id)
    }else throw new Error('适配不能增删节点或成员')
  }
  if(team.tasks.some(t=>!seen.has(t.id)))throw new Error('请一次性提交所有节点的本次任务；不适用的节点填写 adaptationIssue')
}

export const isBuiltinTemplate = (id:string):boolean => id.startsWith('builtin-')
