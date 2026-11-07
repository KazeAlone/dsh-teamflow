/** Transitive dependents that must wait for a person's rerun confirmation. */
import type { TeamTask } from './types.ts'
export function rerunImpact(tasks: readonly TeamTask[], id: string): { descendants: TeamTask[]; active: TeamTask[] } {
  const affected = new Set([id])
  let changed = true
  while (changed) { changed = false; for (const task of tasks) if (!affected.has(task.id) && task.dependencies.some(dep => affected.has(dep))) { affected.add(task.id); changed = true } }
  const descendants = tasks.filter(task => task.id !== id && affected.has(task.id))
  return {
    descendants,
    active: descendants.filter(task => ['claimed','in_progress'].includes(task.status) || task.reassigning),
  }
}
export function canRestartTask(task: Pick<TeamTask,'checkpoint'|'status'|'workflowPaused'|'workflowConfigPending'|'reassigning'|'attempt'|'stoppedAttempts'>): boolean {
  return !task.checkpoint && (['completed','failed','cancelled'].includes(task.status) || (task.status==='pending'&&!!task.workflowPaused&&!task.reassigning&&!task.workflowConfigPending&&((task.attempt??0)>0||!!task.stoppedAttempts?.length)))
}
export function rerunnableTasks(tasks: readonly TeamTask[], memberName: string): TeamTask[] {
  return tasks.filter(task => task.assignee === memberName && canRestartTask(task))
}
/** Keep the contract, identity and monotonic generation; invalidate old capabilities and evidence. */
export function resetTaskForRerun(task: TeamTask, suspended: boolean, now: number): void {
  if (['completed','failed','cancelled'].includes(task.status)) {
    task.stoppedAttempts ??= []
    const status = task.status === 'completed' ? '已完成' : task.status === 'cancelled' ? '已取消' : '失败'
    task.stoppedAttempts.push({ attemptId: task.attemptId, output: `${status} · ${task.output || '未提交结果'}`, at: now })
  }
  task.status='pending'; task.workflowPaused=suspended; task.workflowRerunRequired=suspended; task.updatedAt=now
  task.workflowAwaitingStart = false
  delete task.workflowRerunContext
  for (const key of ['output','attemptId','handoffId','handoffFromMemberId','reassigning','verdict','findings','changedPaths','acceptanceResults','commandsRun','supplementalEvidence','reviewedAttempt','reviewedArtifacts','reviewedGaps','reviewedScope','reviewedDuringDrift','verdictStartSnapshot'] as const) delete task[key]
  if(task.checkpoint) task.checkpoint={round:task.checkpoint.round+1,history:task.checkpoint.history}
}
import { taskNeedsConfiguration } from './task-description.ts'
import type { TeamState } from './types.ts'

/** Ancestors before consumers; completed ancestors are preserved. */
export function rerunPath(tasks: readonly TeamTask[], targetId: string): TeamTask[] {
  const byId=new Map(tasks.map(task=>[task.id,task])), visited=new Set<string>(), visiting=new Set<string>(), ordered:TeamTask[]=[]
  function visit(id:string):void {
    if(visited.has(id))return
    const task=byId.get(id)
    if(!task)throw new Error('重跑路径存在缺失节点')
    if(visiting.has(id))throw new Error('重跑路径存在循环')
    visiting.add(id);task.dependencies.forEach(visit);visiting.delete(id);visited.add(id);ordered.push(task)
  }
  visit(targetId)
  return ordered
}

/** Validate the entire plan before mutating it; normal scheduling and human gates remain authoritative. */
export function startWorkflowPath(team:TeamState,targetId:string,now=Date.now()):string[] {
  if(team.halted || team.phase==='staged')throw new Error('请先恢复或启动团队，再运行到此节点')
  const path=rerunPath(team.tasks,targetId),target=path.at(-1)!
  if(target.status!=='pending')throw new Error('此节点已不需要确认重跑，请刷新状态')
  for(const task of path){
    if(task.status==='completed')continue
    if(taskNeedsConfiguration(task))throw new Error(`请先完成路径节点的配置：${task.subject}`)
    if(task.reassigning || team.members.some(m=>m.name===task.assignee&&m.stopping))throw new Error(`路径节点正在停止，请稍后重试：${task.subject}`)
    if(['failed','cancelled'].includes(task.status)||task.checkpoint?.decision==='reject')throw new Error(`请先处理路径中的失败或退回节点：${task.subject}`)
    if(task.workflowRerunRequired && task.status!=='pending')throw new Error(`路径节点状态已变化，请刷新：${task.subject}`)
    if(task.workflowPaused && ['claimed','in_progress'].includes(task.status))throw new Error(`路径节点正在停止，请稍后重试：${task.subject}`)
    if(!task.checkpoint && task.assignee!=='captain' && !team.members.some(m=>m.status!=='removed'&&(!task.assignee||m.name===task.assignee)))throw new Error(`路径节点缺少执行成员：${task.subject}`)
  }
  const beyond=rerunImpact(team.tasks,targetId)
  if(beyond.active.length)throw new Error('目标之后仍有任务运行，请先暂停这些任务再限定执行范围')
  const resumed=path.filter(task=>task.status==='pending')
  for(const task of resumed){task.workflowRerunRequired=false;task.workflowPaused=false;task.workflowAwaitingStart=false;task.updatedAt=now}
  for(const task of beyond.descendants)if(task.status==='pending'&&!task.workflowPaused){task.workflowPaused=true;task.workflowAwaitingStart=false;task.updatedAt=now}
  return resumed.map(task=>task.id)
}

export function resumeRerunPath(team:TeamState,targetId:string,now=Date.now()):string[]{
  if(!team.tasks.find(t=>t.id===targetId)?.workflowRerunRequired)throw new Error('此节点已不需要确认重跑，请刷新状态')
  return startWorkflowPath(team,targetId,now)
}
