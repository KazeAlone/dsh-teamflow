/** Single execution descriptions and explicit configuration holds. */
export function taskNeedsConfiguration(task:{workflowConfigPending?:boolean;adaptationIssue?:string}):boolean {
  return !!task.workflowConfigPending || !!task.adaptationIssue?.trim()
}
export function taskText(task: { description?: string }): string {
  return task.description ?? ''
}
/** Model-authored tasks need a complete, single execution description. */
export function requireTaskDescriptions(operations:import('./workflow-types.ts').WorkflowOperation[]):void {
  for (const op of operations) if (op.action === 'add_task' && !op.description?.trim()) throw new Error('新建任务必须填写完整的 description，包含要求、交付物和验收标准')
}
