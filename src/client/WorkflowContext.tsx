import { useWorkflowText } from './workflow-i18n.tsx'
/** The stored facts a person and the native discussion can inspect together. */
import type { TeamState, TeamTask } from '../types.ts'
import css from './WorkflowWorkbench.module.css'
import { taskReadiness } from './task-readiness.ts'


export function TaskRecord({ task, team, expanded = false, showContract = true }: { task: TeamTask; team: TeamState; expanded?: boolean; showContract?: boolean }) {
  const l = useWorkflowText()

  return <details data-task-record tabIndex={-1} className={css.contextTask} open={expanded || task.status === 'in_progress'}><summary>{!showContract && l("执行记录 · ")}{task.subject} · {taskReadiness(team,task,l).label}</summary>
    {showContract && (<p>{task.description || l("未单独填写任务说明")}</p>)}
    {task.workflowRerunContext && <details><summary>{l("本轮重跑依据")}</summary><p><strong>{l("上一轮结果：")}</strong>{task.workflowRerunContext.previousOutput || l("上一轮未提交结果")}</p><p><strong>{l("本轮新增要求：")}</strong>{task.workflowRerunContext.instructions}</p></details>}
    {task.workflowRerunRequired && <p><strong>{taskReadiness(team,task,l).label}：</strong>{taskReadiness(team,task,l).detail}</p>}
    <p><strong>{l("输入来自：")}</strong>{task.dependencies.map(id => team.tasks.find(t => t.id === id)?.subject ?? id).join('、') || l("无前置任务")}</p>
    {task.objective && <p><strong>{l("目标：")}</strong>{task.objective}</p>}
    {!!task.inScope?.length && <p><strong>{l("工作范围：")}</strong>{task.inScope.join('、')}</p>}
    {!!task.outOfScope?.length && <p><strong>{l("范围之外：")}</strong>{task.outOfScope.join('、')}</p>}
    {!!task.acceptance?.length && <p><strong>{l("验收标准：")}</strong>{task.acceptance.join('；')}</p>}
    {!!task.verify?.length && <p><strong>{l("计划验证：")}</strong>{task.verify.join('；')}</p>}
    {!!task.deliverables?.length && <p><strong>{l("约定交付：")}</strong>{task.deliverables.join('、')}</p>}
    <p><strong>{l("已提交结果：")}</strong>{task.output || l("尚未提交结果")}</p>
    {!!task.checkpoint?.history.length && <details><summary>{l("历轮人工验收记录")}</summary>{task.checkpoint.history.map((decision,i)=><p key={i}>{l("第 ")}{decision.round} {l(" 轮 · ")}{decision.decision==='approve'?l("通过"):l("退回")} · {decision.note || l("未填写意见")}</p>)}</details>}
    {!!task.changedPaths?.length && <p><strong>{l("已报告变更：")}</strong>{task.changedPaths.join('、')}</p>}
    {task.commandsRun?.map((item, i) => <p key={`cmd:${i}`}><strong>{item.status === 'passed' ? l("报告通过") : l("报告失败")}：</strong>{item.command}{item.evidence ? `\n${item.evidence}` : ''}</p>)}
    {task.acceptanceResults?.map((item, i) => <p key={`result:${i}`}>{item.criterion} · {item.status === 'passed' ? l("报告通过") : l("报告失败")}{item.evidence ? `\n${item.evidence}` : ''}</p>)}
    {!!task.findings?.length && <details><summary>{l("审查发现")}</summary><pre>{JSON.stringify(task.findings, null, 2)}</pre></details>}
    {!!task.stoppedAttempts?.length && <details><summary>{l("历史执行记录 · ")}{task.stoppedAttempts.length} {l(" 次")}</summary>{task.stoppedAttempts.map((attempt, i) => <p key={i}>{attempt.output || l("本次停止前未提交结果")}</p>)}</details>}
  </details>
}

export function WorkflowContext({ team, discussion, onSelect, openExecution }: {
  team: TeamState; discussion: string; onSelect?: (key: string) => void;
  openExecution?: (id: string, parentId?: string) => void | Promise<void>;
}) {
  const l = useWorkflowText()

  const member = discussion.startsWith('member:') ? team.members.find(m => m.name === discussion.slice(7)) : undefined
  const gate = discussion.startsWith('check:') ? team.tasks.find(t => t.id === discussion.slice(6)) : undefined
  const focusedTask = discussion.startsWith('task:') ? team.tasks.find(t => t.id === discussion.slice(5) && !t.checkpoint) : undefined
  const tasks = member ? team.tasks.filter(t => t.assignee === member.name) : gate ? team.tasks.filter(t => gate.dependencies.includes(t.id)) : focusedTask ? team.tasks.filter(t => focusedTask.dependencies.includes(t.id) || t.dependencies.includes(focusedTask.id)) : team.tasks
  return <div className={css.contextInfo}>
    {member ? <>
      <section><h4>{member.name} {l(" · 当前配置")}</h4><p>{member.summary || member.role || l("尚未填写职责概述")}</p><dl>
        <dt>{l("长期职责")}</dt><dd>{member.role || l("未单独设置")}</dd>
        <dt>{l("PE · 成员执行指令")}</dt><dd>{member.executionPrompt || l("未单独设置；执行时可能沿用团队或插件指令")}</dd>
        <dt>{l("本次补充指令")}</dt><dd>{member.specificPrompt||l("未设置")}</dd><dt>{l("模型")}</dt><dd>{member.activeModel ?? member.model ?? l("未记录")}{member.fallbackActive ? l("（已切换备用模型）") : ''}</dd>
      </dl></section>
      <details><summary>{l("本次执行的角色提示词快照")}</summary>
        <p className={css.hint}>{l("由插件按团队目标、角色、执行指令和协作规则组装；不等于完整模型请求。")}</p>
        {member.runtimeSetup?.persona ? <pre>{member.runtimeSetup.persona}</pre> : <p>{member.id ? l("当前记录没有保存该快照，可打开执行对话核对。") : l("尚无执行快照；成员启动后会保存角色提示词。")}</p>}
      </details>
      {member.id && openExecution && <button type="button" onClick={() => void openExecution(member.id, team.captainSessionId)}>{l("查看执行对话与工具记录 ↗")}</button>}
    </> : focusedTask ? <section><h4>{focusedTask.subject} {l(" · 当前任务")}</h4><p>{l("执行负责人：")}{focusedTask.assignee || l("自动分配")}</p><p>{l("下游交接：")}{team.tasks.filter(t => t.dependencies.includes(focusedTask.id)).map(t => t.subject).join('、') || l("无")}</p><TaskRecord task={focusedTask} team={team} expanded /></section>
      : gate ? <section><h4>{gate.subject} {l(" · 第 ")}{gate.checkpoint?.round ?? 1} {l(" 轮")}</h4><p>{gate.description || l("未填写验收要求")}</p><p>{gate.checkpoint?.decision === 'approve' ? l("已通过") : gate.checkpoint?.decision === 'reject' ? l("已退回") : l("等待人工决定")}</p>{gate.checkpoint?.note && <p>{gate.checkpoint.note}</p>}</section>
      : <section><h4>{l("团队目标")}</h4><p>{team.description || l("未填写目标")}</p><h4>{l("成员与分工")}</h4>{team.members.filter(m => m.status !== 'removed').map(m => <button type="button" className={css.contextMember} key={m.name} onClick={() => onSelect?.(`member:${m.name}`)}><strong>{m.name}</strong><span>{m.summary || m.role || l("尚未填写职责")}</span></button>)}</section>}
    <h4>{member ? l("负责的任务与成果") : gate ? l("直接上游的提交记录") : focusedTask ? l("直接上下游的提交记录") : l("任务与成果")}</h4>
    {!tasks.length && <p className={css.hint}>{focusedTask ? l("没有直接上下游任务。") : l("尚未分配任务。")}</p>}
    {tasks.map(task => <TaskRecord key={task.id} task={task} team={team} />)}
    <p className={css.hint}>{l("结果和验证记录来自 Agent 提交；没有记录的内容会标明缺失，不视为已经验证。")}</p>
  </div>
}
