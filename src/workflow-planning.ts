/** Two model calls: reusable graph first, then instance-only task contracts. */
import { randomUUID } from 'node:crypto'
import { emptyBrief, parseBrief, type TaskBrief } from './task-layers.ts'
import { applyWorkflowOperations, proposeWorkflow, workflowFingerprint } from './workflow.ts'
import type { TeamState, TeamTask } from './types.ts'
import type { WorkflowOperation, GeneralPlanDraft } from './workflow-types.ts'

export interface SpecificTaskInput extends TaskBrief { id: string; blocker?: string }
export const briefFields = { requirements: { type: 'string', required: true }, deliverables: { type: 'string', required: true }, acceptance: { type: 'string', required: true } } as const
export const generalPlanParameters = {
  base: { type: 'string', required: true, description: 'Copy the latest context base.' },
  title: { type: 'string', required: true },
  members: { type: 'array', required: true, items: { type: 'object', additionalProperties: false, properties: {
    name: { type: 'string', required: true }, summary: { type: 'string', required: true }, role: { type: 'string' }, executionPrompt: { type: 'string' },
    provider: { type: 'string' }, model: { type: 'string' }, reasoningEffort: { type: 'string' },
  } } },
  tasks: { type: 'array', required: true, items: { type: 'object', additionalProperties: false, properties: {
    id: { type: 'string', required: true }, subject: { type: 'string', required: true }, assignee: { type: 'string', required: true, description: 'Exact member name for execution tasks. Human checkpoints use the empty string "". Never use null.' },
    dependencies: { type: 'array', required: true, items: { type: 'string' } }, checkpoint: { type: 'boolean' }, ...briefFields,
  } } },
} as const
export const specificPlanParameters = {
  draftId: { type: 'string', required: true, description: 'Copy draftId from the general-plan result or template context.' },
  tasks: { type: 'array', required: true, description: 'All listed task IDs exactly once. Only instance text; never return general, layers or configuration flags.', items: {
    type: 'object', additionalProperties: false, properties: { id: { type: 'string', required: true }, ...briefFields,
      blocker: { type: 'string', description: 'Only a genuine unresolved blocker. Omit when ready; never put normal explanations or success notes here.' },
    },
  } },
} as const

export function createGeneralDraft(team: TeamState, title: string, members: { name: string; summary: string; role?: string; executionPrompt?: string; provider?: string; model?: string; reasoningEffort?: string }[], tasks: (TaskBrief & { id: string; subject: string; assignee?: string; dependencies: string[]; checkpoint?: boolean })[], maxMembers: number): GeneralPlanDraft {
  if (!tasks.length || tasks.length > 32 || !title.trim() || title.length > 500) throw new Error('Provide a title and 1–32 tasks for the general draft.')
  const operations: WorkflowOperation[] = [
    ...members.map(member => ({ action: 'add_member' as const, ...member })),
    ...tasks.map((task, index) => {
      const general = parseBrief(task, `tasks[${index}]`)
      if (!general.requirements) throw new Error(`tasks[${index}].requirements must describe the reusable method.`)
      return { action: 'add_task' as const, id: task.id, subject: task.subject, assignee: task.assignee, dependencies: task.dependencies, checkpoint: task.checkpoint, layers: { general, specific: emptyBrief() } }
    }),
  ]
  if (JSON.stringify(operations).length > 120000) throw new Error('General draft is too large.')
  const proposal = proposeWorkflow(team, title, operations, maxMembers)
  return { id: randomUUID(), base: proposal.base, title: proposal.title, operations: proposal.operations }
}

export function generalDraftContext(team: TeamState, draft: GeneralPlanDraft, maxMembers: number) {
  if (draft.base !== workflowFingerprint(team)) throw new Error('团队已变化，请重新生成通用草稿')
  const preview = applyWorkflowOperations(team, draft.operations, maxMembers)
  const ids = new Set(draft.operations.filter(op => op.action === 'add_task').map(op => op.id))
  return preview.tasks.filter(task => ids.has(task.id))
}

export function specificOperations(tasks: Pick<TeamTask, 'id' | 'layers'>[], inputs: SpecificTaskInput[]): WorkflowOperation[] {
  if (JSON.stringify(inputs).length > 120000) throw new Error('Specific task descriptions are too large.')
  const ids = new Set(tasks.map(task => task.id)), seen = new Set<string>()
  const operations: WorkflowOperation[] = inputs.map((input, index) => {
    if (!ids.has(input.id) || seen.has(input.id)) throw new Error(`tasks[${index}].id is unknown or repeated: ${input.id}`)
    seen.add(input.id)
    const general = tasks.find(task => task.id === input.id)?.layers?.general
    if (!general?.requirements.trim()) throw new Error(`Task ${input.id} needs a general contract first.`)
    const specific = parseBrief(input, `tasks[${index}]`)
    if (input.blocker !== undefined && (typeof input.blocker !== 'string' || input.blocker.length > 16000)) throw new Error(`tasks[${index}].blocker must be text of at most 16000 characters.`)
    const blocker = input.blocker?.trim() ?? ''
    if (!specific.requirements && !blocker) throw new Error(`tasks[${index}].requirements must contain the complete instance contract, or report a blocker.`)
    return { action: 'update_task', id: input.id, layers: { general: structuredClone(general), specific }, adaptationIssue: blocker, confirmConfiguration: !blocker }
  })
  if (seen.size !== ids.size) throw new Error(`Include every task exactly once. Missing: ${[...ids].filter(id => !seen.has(id)).join(', ')}`)
  return operations
}

export const SPECIFIC_INSTRUCTIONS = '调用 agent_teams_plan_specific，draftId 原样复制。tasks 必须覆盖列出的全部节点，每项只填写 id、requirements、deliverables、acceptance 四个字符串。将该节点通用方法、交付要求和验收约束结合当前目标完整具体化；执行 Agent 只读本次描述，不能只写差异或引用通用层。不要返回 general、layers、依赖或配置状态。只有真正缺少必要信息或不适用时才填写 blocker；正常说明不放在 blocker。用户最后统一确认，提交本身不执行任务。'
