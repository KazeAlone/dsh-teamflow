import { workflowRequest } from './workflow-request.ts'
import { workflowMessage } from './workflow-text.ts'
import { useWorkflowText } from './workflow-i18n.tsx'
/** Inline member configuration in the activity list, saved via the same workflow API as the canvas. */
import { useEffect, useState } from 'react'
import type { ModelDirectory } from '@deepseek-ai/dsh-client-ui-model-selection/client'
import type { ActivityMember, ActivityTeam } from './activity-monitor.ts'
import type { AgentTeamsTranslate } from './locales.ts'
import { StagedModelPicker } from './StagingPlanEditor.tsx'
import css from './ActivityPanel.module.css'
import type { TeamState, TeamTask } from '../types.ts'
import type { WorkflowOperation } from '../workflow-types.ts'
import { TaskRerunPicker } from './TaskRerunPicker.tsx'
import { rerunnableTasks } from '../task-rerun.ts'

type Details = { base: string; team: TeamState }
async function request(payload: Record<string, unknown>, signal?: AbortSignal): Promise<Details> {
  return workflowRequest<Details>(payload,fetch,undefined,signal)
}
export function QuickMemberEditor({ team, member, directory, t, close, onRerun }: { team: ActivityTeam; member: ActivityMember; directory: ModelDirectory; t: AgentTeamsTranslate; close: () => void; onRerun:(taskId:string)=>void }) {
  const l = useWorkflowText(t)

  const [base, setBase] = useState('')
  const [role, setRole] = useState(member.role)
  const [route, setRoute] = useState({ provider: '', model: '', reasoningEffort: '' })
  const [routeChanged, setRouteChanged] = useState(false)
  const [busy, setBusy] = useState(true)
  const [error, setError] = useState('')
  const [tasks, setTasks] = useState<TeamTask[]>([])
  const [rerunId, setRerunId] = useState('')
  useEffect(() => {
    let live = true
    const controller=new AbortController()
    setBusy(true); setError('')
    void request({ action: 'state', sessionId: team.captainSessionId, teamId: team.teamId },controller.signal).then(result => {
      const current = result.team.members.find(item => item.name === member.name)
      if (!current) throw new Error(l("成员不存在"))
      if (live) { setBase(result.base); setRole(current.role ?? ''); setRoute({ provider: current.provider ?? '', model: current.model ?? '', reasoningEffort: current.reasoningEffort ?? '' }); setRouteChanged(false); setTasks(result.team.tasks); setRerunId(rerunnableTasks(result.team.tasks, member.name).at(-1)?.id ?? '') }
    }).catch(err => { if (live) setError(err instanceof Error ? err.message : String(err)) }).finally(() => { if (live) setBusy(false) })
    return () => { live = false; controller.abort() }
  }, [team.captainSessionId, team.teamId, member.name])
  async function save(rerun = false): Promise<void> {
    setBusy(true); setError('')
    try {
      const operations: WorkflowOperation[] = [{ action: 'update_member', name: member.name, role, ...(routeChanged ? { ...route, reasoningEffort: route.reasoningEffort || 'default' } : {}) }]
      if (rerun && !rerunId) throw new Error(l("请选择重跑任务"))
      await request({ action: 'edit', sessionId: team.captainSessionId, teamId: team.teamId, title: l("调整 {0} 的配置{1}", member.name, rerun ? l("并进入任务编辑") : ''), base, operations })
      if(rerun) onRerun(rerunId)
      close()
    } catch (err) { setError(err instanceof Error ? err.message : String(err)) } finally { setBusy(false) }
  }
  return <form className={css.quickMember} aria-label={l("配置 {0}", member.name)} onSubmit={event => { event.preventDefault(); void save((event.nativeEvent as SubmitEvent).submitter?.getAttribute('data-rerun') === 'true') }}>
    <strong>{l("配置 · ")}{member.name}</strong>
    <StagedModelPicker directory={directory} t={t} {...route} busy={busy || !base} onChange={value => { setRoute(value); setRouteChanged(true) }} />
    <label>{l("职责")}<textarea value={role} disabled={busy || !base} onChange={event => setRole(event.target.value)} /></label>
    <TaskRerunPicker tasks={tasks} member={member.name} taskId={rerunId} disabled={busy || !base} onTask={setRerunId} />
    {error && <p role="alert">{workflowMessage(error, l)}</p>}
    <div><button type="submit" disabled={busy || !base}>{l("保存")}</button>{rerunId && <button type="submit" data-rerun="true" disabled={busy || !base}>{l("保存成员并编辑重跑要求")}</button>}<button type="button" disabled={busy} onClick={close}>{l("取消")}</button></div>
  </form>
}
