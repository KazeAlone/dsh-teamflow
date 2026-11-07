import { useWorkflowText } from './workflow-i18n.tsx'
/** Shared, explicit selection and impact preview for an isolated member rerun. */
import type { TeamTask } from '../types.ts'
import { rerunImpact, rerunnableTasks } from '../task-rerun.ts'
import css from './TaskRerunPicker.module.css'
export function TaskRerunImpact({ tasks, taskId }: { tasks: readonly TeamTask[]; taskId: string }) {
  const l = useWorkflowText()

  const impact=rerunImpact(tasks,taskId)
  return <div className={css.impact}>
    <p>{l("所选任务开启新一轮执行，原有状态和提交结果保存在历史执行记录中。旧验证证据不作为本轮证据，无关分支保持不变。")}</p>
    {!!impact.descendants.length&&<p>{l("以下下游节点需使用新结果；可选任意节点点击「运行到此节点」，人工检查仍需确认：")}{impact.descendants.map(task=>task.subject).join('、')}{l("。此前结果与验收不再用于本轮。")}</p>}
    {!!impact.active.length&&<p role="alert">{l("请先停止受影响的运行任务：")}{impact.active.map(task=>task.subject).join('、')}</p>}
  </div>
}
export function TaskRerunPicker({ tasks, member, taskId, onTask, disabled }: { tasks: readonly TeamTask[]; member: string; taskId: string; onTask: (id:string)=>void; disabled:boolean }) {
  const l = useWorkflowText()

  const candidates=rerunnableTasks(tasks,member)
  if(!candidates.length) return null
  return <fieldset className={css.picker}><legend>{l("单独重跑")}</legend><label className={css.field}>{l("重跑任务")}<select value={taskId} disabled={disabled} onChange={event=>onTask(event.target.value)}>{candidates.map(task=><option key={task.id} value={task.id}>{task.subject}（{task.id}）</option>)}</select></label>
    <p>{l("保存成员后进入任务编辑，查看上一轮结果并填写本轮要求，再确认重跑。")}</p>
  </fieldset>
}
