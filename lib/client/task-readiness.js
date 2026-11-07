import { sourceText } from "./workflow-text.js";
import { awaitsFirstStart } from "../task-start-state.js";
import { taskControlState } from "./task-control.js";
import { zh } from "./locales.js";
/** Explain saved execution state without claiming to know live host availability. */
export function taskReadiness(team, task, l = sourceText, execution) {
    const result = (label, detail = label, dependencies = [], action) => ({ label, detail, dependencies, action });
    const control = taskControlState(team, { ...task, workflowAwaitingStart: awaitsFirstStart(task) });
    if (task.checkpoint?.decision === 'reject')
        return result(l("已退回"), task.checkpoint.note || l("等待调整方案并返工。"), [], 'review');
    if (task.status === 'completed')
        return result(task.checkpoint ? l("验收通过") : l("已完成"));
    if (task.status === 'failed')
        return result(l("执行失败"), l("查看执行记录中的失败原因，再决定是否修改并重跑。"), [], 'rerun');
    if (task.status === 'cancelled')
        return result(l("已取消"));
    if (task.workflowConfigPending)
        return result(l("待配置"), l("节点已保存，可先连线；请填写要求并完成配置。"), [], 'edit');
    if (team.halted)
        return result(l("团队已停止"), l("团队停止期间不会派发此任务。"));
    if (control.stopping || execution === 'stopping')
        return result(l(zh[control.label]), l("已禁止再次调度，正在等待执行会话停止；失败时可重试停止。"), [], 'stop');
    if (execution === 'interrupted' && ['in_progress', 'claimed'].includes(task.status))
        return result(l('执行已中断'), l('任务尚未提交完成，但宿主已无运行中的执行会话。继续会封存旧尝试并重新派发，已完成的其他任务保留。'), [], 'continue');
    if (task.status === 'in_progress' || task.status === 'claimed')
        return result(l(zh[control.label]), task.status === 'claimed' ? l(zh['task.control.claimedHint']) : l("执行 Agent 正在处理任务。"));
    const blocked = task.dependencies.filter(id => !team.tasks.some(t => t.id === id && t.status === 'completed'));
    const upstream = blocked.map(id => {
        const item = team.tasks.find(t => t.id === id);
        return item ? `${item.subject}（${item.status === 'failed' ? l("失败") : item.status === 'cancelled' ? l("已取消") : item.workflowConfigPending ? l("待配置") : item.checkpoint ? l("未通过验收") : l("未完成")}）` : l("{0}（不存在）", id);
    }).join('、');
    if (task.workflowRerunRequired)
        return result(l(zh[control.label]), l('点击「运行到此节点」，自动安排本节点及必要上游，按依赖顺序执行；人工检查仍需你确认。') + (blocked.length ? ' ' + l('仍需等待：{0}', upstream) : ''), blocked, 'path');
    if (awaitsFirstStart(task))
        return result(l("待启动"), l("节点已配置，点击开始后进入调度。{0}", blocked.length ? l("仍需等待：{0}", upstream) : ''), blocked, 'path');
    if (task.workflowPaused)
        return result(l(zh[control.label]), l("点击开始后重新进入调度，已停止的执行将重新开始。{0}", blocked.length ? l("仍需等待：{0}", upstream) : ''), blocked, 'path');
    if (team.phase === 'staged')
        return result(l(zh[control.label]), l("团队方案尚未确认启动。"));
    if (blocked.length)
        return result(l(zh[control.label]), l("等待：{0}", upstream), blocked, 'path');
    if (task.checkpoint)
        return result(l(zh[control.label]), l("上游已完成，打开材料并作出验收决定。"), [], 'review');
    if (task.assignee === 'captain')
        return result(l("等待队长"), l("依赖已满足，等待队长领取。"));
    const candidates = team.members.filter(m => m.status !== 'removed' && (!task.assignee || m.name === task.assignee));
    if (!candidates.length)
        return result(l("缺少执行 Agent"), task.assignee ? l("执行成员 {0} 不可用，请调整负责人。", task.assignee) : l("请创建或恢复至少一个执行 Agent。"), [], 'member');
    const available = candidates.filter(m => !m.stopping && !team.tasks.some(t => t.assignee === m.name && ['claimed', 'in_progress'].includes(t.status)));
    if (!available.length)
        return result(l("等待 Agent 空闲"), task.assignee ? l("{0} 正在执行其他任务或停止中。", task.assignee) : l("可用成员均在执行其他任务或停止中。"));
    if (available.every(m => !!m.spawnError))
        return result(l("Agent 启动失败"), available.map(m => `${m.name}：${m.spawnError}`).join('；'), [], 'continue');
    return result(l("等待调度"), l("依赖已满足，等待调度器派发；实际成员会话状态由宿主确认。"), [], 'continue');
}
