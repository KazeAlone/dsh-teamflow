import { draftGalleryAccess } from "./workbench-drafts.ts"
import { galleryAccessKeys } from "../gallery-access.ts"
import { workflowRequest } from './workflow-request.ts'
import { createWorkflowCache, workflowCacheKey } from './workflow-cache.ts'
import { workflowMessage } from './workflow-text.ts'
import { useWorkflowText, WorkflowLocale } from './workflow-i18n.tsx'
/** Editable task canvas and isolated configuration / human-review discussions. */
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react'
import { createPortal } from 'react-dom'
import type { TeamState, TeamTask } from '../types.ts'
import type { WorkflowOperation } from '../workflow-types.ts'
import css from './WorkflowWorkbench.module.css'
import { TaskRecord, WorkflowContext } from './WorkflowContext.tsx'
import { connectionIssue, connectionTarget, connectionPort, connectionPath, WORKFLOW_NODE_WIDTH, WORKFLOW_PORT_Y } from './workflow-connections.ts'
import { LEAD_ART, REVIEW_ART, memberArtUrl } from './artwork.ts'
import type { ModelDirectory } from '@deepseek-ai/dsh-client-ui-model-selection/client'
import type { AgentTeamsTranslate } from './locales.ts'
import { StagedModelPicker } from './StagingPlanEditor.tsx'
import { EmbeddedDiscussion } from './EmbeddedDiscussion.tsx'
import { ProposalReview, type ProposalReviewDraft } from './ProposalReview.tsx'
import { TaskStateBadge, taskStateNodeClass } from './TaskStateBadge.tsx'
import { TaskRerunPicker } from './TaskRerunPicker.tsx'
import { canRestartTask, rerunPath, resumeRerunPath, rerunImpact, rerunnableTasks } from '../task-rerun.ts'
import { draftSource, editorKey, editorTarget, finishWorkbenchSave, initialEditorDraft, initialWorkbenchView, selectWorkbench, targetDiscussion, type EditorTarget, type WorkbenchTarget, type WorkbenchView } from './workbench-selection.ts'
import { publishWorkflowActivity, type ActivityTeam } from './activity-monitor.ts'
import { arrangeTasks, clampZoom, fitGraph } from './workflow-layout.ts'
import { decodeDrafts, draftStorageKey, pendingDrafts, propertyOperation } from './workbench-drafts.ts'
import { taskReadiness, type ExecutionState } from './task-readiness.ts'
import { flowControlState, flowControlVersion, taskControlState } from './task-control.ts'
import { zh } from './locales.ts'
import { awaitsFirstStart } from '../task-start-state.ts'
import { IconBranchOutline16, WorkflowIcon } from './icons.tsx'
import { BrandIcon } from './BrandIcon.tsx'
import { TemplateGallery } from './TemplateGallery.tsx'
import { OutcomeShowcase } from './OutcomeShowcase.tsx'
import { ReviewWorkbench } from './ReviewWorkbench.tsx'

interface Response { revision?:string; execution?:Record<string,ExecutionState>; team: TeamState; base: string; ready: string[]; busy: string[]; openedSessionId?: string; currentDiscussion?: string; activity?:ActivityTeam }
const viewCache=createWorkflowCache<Response>()
async function request(payload: Record<string, unknown>, signal?:AbortSignal): Promise<Response | undefined> {
  const reading=payload['action']==='state'||payload['action']==='archive_state'
  const key=workflowCacheKey(String(payload['sessionId']),String(payload['teamId']??''),payload['action']==='archive_state')
  const previous=reading?viewCache.get(key):undefined
  const result = await workflowRequest<Response & {notModified?:boolean}>({...payload,...reading?{conditionalState:true,knownRevision:previous?.revision}:{}},fetch,undefined,signal)
  if(result.notModified&&previous)return previous
  if(reading&&!result.team)viewCache.remove(key)
  if (!result.team) return
  return result
}


function ReviewMaterials({ text }: { text: string }) {
  const l = useWorkflowText()

  try {
    const material = JSON.parse(text) as { check: { round: number }; results: Pick<TeamTask, 'id' | 'subject' | 'output' | 'commandsRun' | 'acceptanceResults'>[]; files?: { artifacts: { path: string; present: boolean; unreadable?: boolean }[] }; limitation?: string }
    if (!Array.isArray(material.results) || !material.check) return <pre>{text}</pre>
    return <div className={css.materials}><small>{l("第 ")}{material.check.round} {l(" 轮验收")}</small>
      {material.results.length === 0 && <p>{l("此检查点没有上游执行结果，请根据验收要求确认是否继续。")}</p>}
      {material.results.map(result => <section key={result.id}><strong>{result.subject}</strong><p>{result.output || l("尚未提交结果说明")}</p>
        {result.commandsRun?.map((command, i) => <p key={i}>{command.status === 'passed' ? l("通过") : l("未通过")} · {command.command}{command.evidence ? `\n${command.evidence}` : ''}</p>)}
        {result.acceptanceResults?.map((item, i) => <p key={i}>{item.status === 'passed' ? l("通过") : l("未通过")} · {item.criterion}{item.evidence ? `\n${item.evidence}` : ''}</p>)}
      </section>)}
      {!!material.files?.artifacts.length && <section><strong>{l("相关文件")}</strong>{material.files.artifacts.map(file => <p key={file.path}>{file.path}{file.unreadable ? l(" · 无法读取") : !file.present ? l(" · 文件不存在") : ''}</p>)}</section>}
      <p className={css.hint}>{workflowMessage(material.limitation ?? '', l)}</p><details><summary>{l("原始证据记录")}</summary><pre>{text}</pre></details>
    </div>
  } catch { return <pre>{text}</pre> }
}

function Workbench({ sessionId, teamId, archived = false, waitingCount = 0, openExecution, nativeOnly = false, reviewEntryOnly = false, embeddedContext = false, onNativeContext, openContext, modelDirectory, t, entryTarget, entryDiscussion, initiallyOpen = false, onShowActivity, onClose }: {
  entryDiscussion?: string
  initiallyOpen?: boolean
  onShowActivity?: () => void
  entryTarget?: { taskId: string; review?: boolean; rerun?: boolean }
  onClose?: () => void
  archived?: boolean
  modelDirectory?: ModelDirectory
  t?: AgentTeamsTranslate
  reviewEntryOnly?: boolean
  embeddedContext?: boolean
  onNativeContext?: (value: boolean) => void
  openContext?: () => void
  nativeOnly?: boolean
  /** Compatibility prop for older callers; discussions now stay inside Workflow. */
  openConversation?: (id: string) => void | Promise<void>
  sessionId: string; teamId?: string; waitingCount?: number; openExecution?: (memberId: string, parentId?: string) => void | Promise<void>
}) {
  const l = useWorkflowText(t)

  const [opened, setOpened] = useState(initiallyOpen || !!entryTarget)
  const [connectionError,setConnectionError]=useState('')
  const refreshInFlight=useRef(false), mutationInFlight=useRef(false)
  const [showOutcomes, setShowOutcomes] = useState(false)
  const [galleryMode,setGalleryMode]=useState<'browse'|'save'|undefined>(teamId?undefined:'browse')
  const entryOpened = useRef(false)
  const [editing, setEditing] = useState(false)
  const [archiveView, setArchiveView] = useState(archived)
  const [cached]=useState(()=>teamId?viewCache.get(workflowCacheKey(sessionId,teamId,archived)):undefined)
  const [data, setData] = useState<Response | undefined>(cached)
  const [revalidating,setRevalidating]=useState(!!cached)
  const [activeId, setActiveId] = useState(teamId)
  const [view, setView] = useState(initialWorkbenchView)
  const viewRef = useRef(view)
  const [error, setError] = useState('')
  const [feedback, setFeedback] = useState('')
  const [reviewDrafts, setReviewDrafts] = useState<Record<string, ProposalReviewDraft>>({})
  const [proposalFocus, setProposalFocus] = useState(0)
  const [attentionFocus, setAttentionFocus] = useState<{selector:string; revision:number}>()
  const [mutating, setWorking] = useState(false)
  const working=mutating||revalidating
  const [saveState, setSaveState] = useState<'saved' | 'saving' | 'error'>('saved')
  const [storageError, setStorageError] = useState('')
  const loadedDraftScope = useRef<string>()
  const [reviewNotes, setReviewNotes] = useState<Record<string, string>>({})
  const [embeddedDiscussion, setEmbeddedDiscussion] = useState<string>()
  const [pane, setPane] = useState<'members' | 'flow' | 'discussion'>('flow')
  const [name, setName] = useState<string>()
  const [goal, setGoal] = useState('')

  const [zoom, setZoom] = useState(1)
  const [library, setLibrary] = useState<'tasks' | 'agents'>('tasks')
  const [panMode, setPanMode] = useState(false)
  const [maximized, setMaximized] = useState(false)
  const [inspectorWidth, setInspectorWidth] = useState(420)
  const [inspectorExpanded, setInspectorExpanded] = useState(false)
  const [inspectorHidden, setInspectorHidden] = useState(true)
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({})
  const [link, setLink] = useState<{ from: string; x: number; y: number; to?: string; issue?: string }>()
  const suppressNodeClick = useRef(false)
  const suppressPanClick = useRef(false)
  const cancelLink = useRef<(() => void) | undefined>(undefined)
  const canvas = useRef<HTMLDivElement>(null)
  const dialog = useRef<HTMLElement>(null)
  const mounted = useRef(true)
  const generation = useRef(0)
  const initializedDiscussion = useRef(false)
  const team = data?.team
  const flow = team ? flowControlState(team) : undefined
  const selection = view.target
  const discussion = targetDiscussion(selection)
  const selectedTask = selection.type === 'task' || selection.type === 'check' ? selection.id : undefined
  const selectedEdge = selection.type === 'edge' ? selection : undefined
  const editor = !archiveView && editing ? editorTarget(team, selection, true) : undefined
  const draftId = editor ? editorKey(team?.id ?? '', editor) : undefined
  const draftEntry = draftId ? view.drafts[draftId] : undefined
  const draft = draftEntry?.values ?? (editor ? initialEditorDraft(team, editor).values : {})
  const draftStale = !!editor && !!draftEntry && draftEntry.source !== draftSource(team, editor)
  const highlightedTask = selectedTask ?? (discussion.startsWith('check:') ? discussion.slice(6) : discussion.startsWith('task:') ? discussion.slice(5) : undefined)
  const relatedMember = selection.type === 'member' ? selection.id : selectedTask ? team?.tasks.find(task => task.id === selectedTask)?.assignee : discussion.startsWith('member:') ? discussion.slice(7) : undefined
  const conversation = team?.workflow?.discussions[`discussion:${discussion}`]
  const proposal = conversation?.proposal?.status === 'pending' ? conversation.proposal : undefined
  const reviewingTemplate = discussion === 'adapt' && !!proposal
  const MessageArea = reviewingTemplate ? 'details' : 'div'
  const reviewTask = discussion.startsWith('check:') ? team?.tasks.find(t => t.id === discussion.slice(6)) : undefined
  const reviewScope = `${team?.id}:${reviewTask?.id}:${reviewTask?.checkpoint?.round}`
  const note = reviewNotes[reviewScope] ?? ''
  const setNote = (value: string) => setReviewNotes(notes => ({ ...notes, [reviewScope]: value }))
  const reviewingCheckpoint = !!reviewTask && !editor && !selectedTask && !selectedEdge
  const discussionTask = discussion.startsWith('task:') ? team?.tasks.find(t => t.id === discussion.slice(5) && !t.checkpoint) : undefined
  const activeTask = team?.tasks.find(t => t.id === selectedTask)
  const terminalEdit = !!editor && editor.type !== 'member' && !!activeTask && canRestartTask(activeTask)
  const member = discussion.startsWith('member:') ? team?.members.find(m => m.name === discussion.slice(7)) : undefined
  const defaultPositions = useMemo(() => arrangeTasks(team?.tasks ?? []), [team?.tasks])
  const taskEditing = !!editor && editor.type !== 'member'
  const unsaved = pendingDrafts(team, view.drafts,l)
  const currentDirty = unsaved.some(item => item.key === draftId)
  const unconfigured = team?.tasks.filter(task => task.workflowConfigPending) ?? []
  const taskStatus = (task: TeamTask, _ready: string[]) => taskReadiness(team!, task, l).label
  useEffect(() => {
    if (!activeId || !team || team.id !== activeId) return
    const scope = draftStorageKey(sessionId, activeId)
    if (loadedDraftScope.current !== scope) {
      loadedDraftScope.current = scope
      try {
        const restored = decodeDrafts(sessionStorage.getItem(scope), activeId)
        updateView(current => ({...current, drafts:{...restored,...current.drafts}}))
        setStorageError('')
      } catch { setStorageError(l("当前浏览器无法保存草稿，刷新前请保存属性。")) }
      return
    }
    try {
      const drafts = Object.fromEntries(pendingDrafts(team, view.drafts,l).map(item => [item.key,item.entry]))
      if (Object.keys(drafts).length) sessionStorage.setItem(scope, JSON.stringify({version:1,drafts}))
      else sessionStorage.removeItem(scope)
      setStorageError('')
    } catch { setStorageError(l("草稿备份失败，刷新前请保存属性。")) }
  }, [sessionId, activeId, team, view.drafts])
  useEffect(() => {
    if (!storageError || !unsaved.length) return
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = '' }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [storageError, unsaved.length])
  useEffect(() => { onNativeContext?.(!!data?.currentDiscussion) }, [data?.currentDiscussion, onNativeContext])
  useEffect(() => {
    if (!entryTarget || entryOpened.current || !team) return
    entryOpened.current = true
    const task = team.tasks.find(task => task.id === entryTarget.taskId)
    if (!task) { setError(l("节点已不存在，请刷新任务列表")); return }
    choose({type:task.checkpoint ? 'check' : 'task',id:task.id})
    if (entryTarget.rerun && !archiveView && !team.halted && team.phase !== 'staged' && !task.checkpoint && ['completed','failed','cancelled'].includes(task.status)) setEditing(true)
    if (entryTarget.review && task.checkpoint) void openReview(task.id)
  }, [team,entryTarget])
  useEffect(() => {
    if (!entryDiscussion || entryOpened.current || !team) return
    entryOpened.current = true
    void startEmbedded(entryDiscussion)
  }, [entryDiscussion, team])
  function updateView(update: (current: WorkbenchView) => WorkbenchView): void { const next = update(viewRef.current); viewRef.current = next; setView(next) }
  function choose(target: WorkbenchTarget, overrides?: Record<string,string>): void {
    updateView(current => selectWorkbench(current, target, team, overrides)); setError(''); setFeedback('')
    setInspectorHidden(false)
    if (target.type === 'member') setLibrary('agents')
    if (target.type === 'task' || target.type === 'check') setLibrary('tasks')
    const graphTarget = target.type === 'task' || target.type === 'check' || target.type === 'edge'
    setPane(graphTarget && !window.matchMedia('(max-width: 900px)').matches ? 'flow' : 'discussion')
  }
  const selectDiscussion = (key: string) => choose({ type:'discussion', key })
  function focusAttention(selector: string): void { setAttentionFocus({selector,revision:viewRef.current.revision}) }
  useLayoutEffect(() => {
    if (!attentionFocus || attentionFocus.revision !== viewRef.current.revision) return
    const target = dialog.current?.querySelector<HTMLElement>(attentionFocus.selector)
    if (!target) return
    if (target instanceof HTMLDetailsElement) target.open = true
    target.focus({preventScroll:true}); target.scrollIntoView({block:'nearest'})
    setAttentionFocus(undefined)
  }, [attentionFocus, view, editing, data])
  function openProposal(key: string): void {
    setGalleryMode(undefined); setOpened(true); setEditing(false); selectDiscussion(key)
    setProposalFocus(value => value + 1)
  }
  function closeWorkbench(): void { updateView(current=>({...current,revision:current.revision+1})); setOpened(false); onClose?.() }
  function setDraft(update: Record<string,string> | ((previous: Record<string,string>) => Record<string,string>)): void {
    if (!editor || !draftId) return
    updateView(current => { const entry = current.drafts[draftId] ?? initialEditorDraft(team, editor); return { ...current, drafts:{...current.drafts,[draftId]:{...entry,values:typeof update === 'function' ? update(entry.values) : update}} } })
  }
  function cancelEdit(): void {
    if (draftId) updateView(current => { const drafts={...current.drafts}; delete drafts[draftId]; return {...current,drafts} })
    selectDiscussion(editor?.type === 'member' && editor.id ? `member:${editor.id}` : 'graph')
  }
  useEffect(() => { mounted.current = true; return () => { mounted.current = false } }, [])
  useEffect(() => { setArchiveView(archived) }, [archived])
  useEffect(() => {
    if (!opened) return
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.current?.querySelector<HTMLElement>('button, input')?.focus()
    return () => { document.body.style.overflow = overflow; previous?.focus() }
  }, [opened])
  useEffect(() => {
    if (editor && !editor.id) dialog.current?.querySelector<HTMLElement>('[data-workflow-editor] input:not(:disabled), [data-workflow-editor] textarea')?.focus()
  }, [editor])
  useEffect(() => { if (teamId && teamId !== activeId) { setActiveId(teamId); setData(undefined); updateView(current => ({...initialWorkbenchView(),revision:current.revision+1})); setPositions({}); initializedDiscussion.current = false; generation.current++ } }, [sessionId, teamId])
  const refresh = async (signal?:AbortSignal): Promise<void> => {
    if(refreshInFlight.current||mutationInFlight.current)return
    refreshInFlight.current=true
    const token = generation.current
    try {
      const result = await request({ sessionId, teamId: activeId, action: archiveView ? 'archive_state' : 'state' },signal)
      if (!result) {if(mounted.current&&!signal?.aborted&&token===generation.current){setData(undefined);setRevalidating(false)};return}
      if (mounted.current && !signal?.aborted && token === generation.current) {
        setConnectionError('')
        setError(previous=>previous.startsWith('连接中断')||previous===l('请先重新连接并核对最新状态，再操作流程。')?'':previous)
        if(!activeId)setGalleryMode(undefined)
        viewCache.set(workflowCacheKey(sessionId,result.team.id,archiveView),result)
        setData(result); setActiveId(result.team.id);setRevalidating(false)
        if (!initializedDiscussion.current && result.currentDiscussion) { initializedDiscussion.current = true; if (!initiallyOpen && viewRef.current.revision === 0) selectDiscussion(result.currentDiscussion) }
      }
    } catch (err) { if (mounted.current && token === generation.current && activeId) setConnectionError(err instanceof Error ? err.message : String(err)) }
    finally {refreshInFlight.current=false}
  }
  useEffect(() => {
    if (mutating || (!activeId && data)) return
    const controller=new AbortController()
    void refresh(controller.signal)
    // A restored native conversation can mount before the host attaches its
    // Agent. Keep retrying discovery so that its persisted team appears without
    // requiring another navigation or accidentally offering to create a team.
    const reconnect=()=>{if(!document.hidden)void refresh(controller.signal)}
    window.addEventListener('online',reconnect)
    document.addEventListener('visibilitychange',reconnect)
    const timer = setInterval(reconnect, 2500)
    return () => {controller.abort();clearInterval(timer);window.removeEventListener('online',reconnect);document.removeEventListener('visibilitychange',reconnect)}
  }, [activeId, mutating, archiveView])
  async function perform(action: string, fields: Record<string, unknown> = {}): Promise<Response | undefined> {
    if(revalidating)return
    if(archiveView && action !== 'restore_archive') {setError(l("请先恢复归档，再修改或重新执行。"));return}
    if(mutationInFlight.current)return
    if(connectionError){setError(l('请先重新连接并核对最新状态，再操作流程。'));return}
    mutationInFlight.current=true
    setWorking(true)
    const saving = action === 'edit' || action === 'layout'
    if (saving) setSaveState('saving')
    setError(''); setFeedback(''); const token = ++generation.current
    try {
      const result = await request({ sessionId, teamId: activeId, discussion, action, ...fields })
      if (!result) { if (saving) setSaveState('error'); return }
      if (saving) setSaveState('saved')
      if(action==='restore_archive') {setArchiveView(false);setEditing(false);setFeedback(l("已恢复为待确认流程。已完成成果保留；确认成员配置并启动后，可修改和重跑。"))}
      if(result.activity) publishWorkflowActivity(result.activity)
      if (mounted.current && token === generation.current) {viewCache.set(workflowCacheKey(sessionId,result.team.id,action==='restore_archive'?false:archiveView),result);setData(result); setActiveId(result.team.id) }
      return result
    } catch (err) { if (mounted.current) { setError(err instanceof Error ? err.message : String(err));if(err instanceof Error&&err.message.startsWith('连接中断'))setConnectionError(err.message); if (saving) setSaveState('error') }; return undefined }
    finally { mutationInFlight.current=false;if (mounted.current) { setWorking(false) } }
  }
  async function createFlow(): Promise<void> {
    const created = await perform('create', { name: name ?? l('新团队'), description: goal })
    if (created) await startEmbedded('graph', created.team.id)
  }
  async function saveEdit(operations: WorkflowOperation[], title: string, finishEditing = false): Promise<Response | undefined> {
    if (finishEditing && draftStale) { setError(l("当前对象已变化。草稿已保留，请先核对最新资料，或点击「重新载入」后编辑。")); return }
    const revision=viewRef.current.revision, submitted=draftId&&editor?(viewRef.current.drafts[draftId]??initialEditorDraft(team,editor)):undefined
    const result=await perform('edit', { operations, title, base: data?.base, positions: Object.fromEntries(team?.tasks.map(task => [task.id, pos(task.id)]) ?? []) })
    if (result && finishEditing) {
      let nextTarget: WorkbenchTarget | undefined
      if(editor?.id && (editor.type==='member' ? !result.team.members.some(m=>m.name===editor.id && m.status!=='removed') : !result.team.tasks.some(task=>task.id===editor.id))) nextTarget={type:'discussion',key:'graph'}
      if(editor && !editor.id) {
        if(editor.type==='member') { const added=operations.find(op=>op.action==='add_member'); if(added?.action==='add_member') nextTarget={type:'member',id:added.name.trim()} }
        else { const added=result.team.tasks.find(task=>!team?.tasks.some(old=>old.id===task.id)); if(added) nextTarget={type:added.checkpoint?'check':'task',id:added.id} }
      }
      updateView(current=>finishWorkbenchSave(current,draftId,submitted,revision,result.team,nextTarget,editor))
      if(viewRef.current.revision===revision) setFeedback(draftId && viewRef.current.drafts[draftId] ? l("已保存本次提交；后续修改仍为草稿。") : l("已保存。"))
    }
    return result
  }
  async function saveAllProperties(): Promise<void> {
    if (!team || working || archiveView) return
    const submitted = pendingDrafts(team, viewRef.current.drafts,l), revision = viewRef.current.revision
    if (!submitted.length) return
    try {
      if (submitted.length > 50) throw new Error(l("一次最多保存 50 个对象，请先逐项保存部分草稿。"))
      const operations = submitted.map(item => propertyOperation(team,item.target,item.entry))
      const result = await saveEdit(operations, l("保存全部属性草稿"))
      if (!result) return
      updateView(current => {
        let next = current
        for (const item of submitted) next = finishWorkbenchSave(next,item.key,item.entry,revision,result.team,undefined,item.target)
        if (current.revision === revision && selection.type === 'member' && !selection.id) {
          const added = submitted.find(item => item.target.type === 'member' && !item.target.id)
          if (added) next = selectWorkbench(next,{type:'member',id:added.entry.values['name']!.trim()},result.team)
        }
        return next
      })
      setFeedback(l("本次提交的属性已保存；待配置节点仍需单独完成配置，任务不会自动重跑。"))
    } catch (err) { setError(err instanceof Error ? err.message : String(err)) }
  }
  function scrollToTask(id: string): void {
    requestAnimationFrame(() => { const p = pos(id); canvas.current?.scrollTo({left:Math.max(0,p.x*zoom-48),top:Math.max(0,p.y*zoom-48),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'}) })
  }
  function locateTask(id: string, focusField?: string, focusSection = '[data-task-heading]'): void {
    setShowOutcomes(false)
    const task = team?.tasks.find(item => item.id === id)
    if (!task) return
    setGalleryMode(undefined); setOpened(true)
    choose({type:task.checkpoint ? 'check' : 'task',id})
    scrollToTask(id)
    focusAttention(focusField ? '[data-workflow-editor] [data-field="' + focusField + '"] :is(input,textarea)' : focusSection)
  }
  function renderReadiness(task: TeamTask) {
    if (!team) return null
    const state = taskReadiness(team,task,l,data?.execution?.[task.id])
    const labels={path:'运行到此节点',review:'打开验收',edit:'完善节点配置',rerun:'修改并重跑',continue:'继续此任务',stop:'重试停止',member:'调整负责人'}
    const action=state.action
    const run=()=>{if(action==='review')void openReview(task.id);else if(action==='edit'||action==='rerun'||action==='member')edit(task.checkpoint?'check':'task',task.id);else if(action==='continue')void perform(task.checkpoint?'resume_task':'continue_task',{taskId:task.id,base:data?.base});else if(action==='path')void perform('start_path',{taskId:task.id,base:data?.base});else if(action==='stop')void perform('stop_task',{taskId:task.id})}
    return <section className={css.readiness} aria-label={l("阻塞原因与下一步")}><strong>{state.label}</strong><p>{state.detail}</p>{action&&!(action==='path'&&task.workflowRerunRequired)&&!(action==='review'&&reviewingCheckpoint)&&!archiveView&&<button type="button" disabled={working||!!unsaved.length||!!connectionError} onClick={run}>{l(labels[action])}</button>}{task.status==='pending'&&canRestartTask(task)&&!archiveView&&!team.halted&&<button type="button" disabled={working||!!unsaved.length} onClick={()=>edit('task',task.id)}>{l('修改并重跑')}</button>}{state.dependencies.map(id => <button type="button" key={id} onClick={() => locateTask(id)}>{l("定位 · ")}{team.tasks.find(item => item.id === id)?.subject ?? id}</button>)}</section>
  }
  function renderRerunPath(task: TeamTask) {
    if(!team || archiveView || !task.workflowRerunRequired)return null
    let path:TeamTask[]=[],issue=''
    try { path=rerunPath(team.tasks,task.id).filter(item=>item.workflowRerunRequired);resumeRerunPath(structuredClone(team),task.id) }
    catch(error){issue=error instanceof Error?error.message:String(error)}
    return <section className={css.readiness} data-rerun-path tabIndex={-1} aria-label={l('重跑路径')}><strong>{l('从上游运行到此节点')}</strong><p>{path.map(item=>item.subject).join(' → ')}</p><p>{l('按依赖顺序执行，独立分支可并行；经过人工检查时等待你确认，确认后继续。不会启动目标之外的其他待重跑分支。')}</p>{issue&&<p role="alert">{workflowMessage(issue,l)}</p>}<button type="button" disabled={working||!!unsaved.length||!!issue} title={unsaved.length?l('请先保存属性草稿'):undefined} onClick={()=>void perform('resume_rerun_path',{taskId:task.id,base:data?.base})}>{l('运行到此节点')}</button></section>
  }
  function renderTaskControl(task: TeamTask) {
    if (!team || archiveView) return null
    const control = taskControlState(team, {...task, workflowAwaitingStart:awaitsFirstStart(task)})
    if (control.canRerun) return <button type="button" data-node-rerun disabled={working} onPointerDown={event=>event.stopPropagation()} onClick={event=>{event.stopPropagation();edit('task',task.id)}}>{l("修改并重跑")}</button>
    if (control.terminal || control.disabled) return null
    const label = t ? t(control.actionLabel) : l(zh[control.actionLabel])
    return <button type="button" data-node-playback disabled={working || unsaved.some(item => item.target.id === task.id)}
      aria-label={`${label} · ${task.subject}`} title={l(zh['task.control.hint'])}
      onPointerDown={event => event.stopPropagation()}
      onClick={event => { event.stopPropagation(); void perform('set_task_enabled', {taskId:task.id,enabled:control.stopping ? false : !control.checked,updatedAt:task.updatedAt}) }}>{label}</button>
  }
  async function startEmbedded(key: string, targetId = activeId, fresh = false): Promise<void> {
    selectDiscussion(key)
    const revision=viewRef.current.revision
    const result = await perform('open_discussion', { discussion: key, teamId: targetId, fresh })
    if (revision!==viewRef.current.revision) return
    if (result?.openedSessionId && result.openedSessionId.startsWith('session-at-discussion-') && result.openedSessionId !== team?.captainSessionId) setEmbeddedDiscussion(key)
    else if (result) setError(l("宿主未返回独立讨论会话"))
  }
  function prepareDiscussion(name: string): void { void startEmbedded(`member:${name}`, activeId) }
  async function deleteEdge(): Promise<void> {
    const target = team?.tasks.find(task => task.id === selectedEdge?.to)
    if (!target || !selectedEdge || working || archiveView || !editing) return
    const revision=viewRef.current.revision
    if(await saveEdit([{ action: 'update_task', id: target.id, dependencies: target.dependencies.filter(id => id !== selectedEdge.from) }], l("删除任务交接")) && revision===viewRef.current.revision) selectDiscussion('graph')
  }
  async function deleteNode(id: string): Promise<void> {
    if (!team || working || archiveView || !editing) return
    const updates: WorkflowOperation[] = team.tasks.filter(task => task.dependencies.includes(id)).map(task => ({ action: 'update_task', id: task.id, dependencies: task.dependencies.filter(dep => dep !== id) }))
    updates.push({ action: 'remove_task', id })
    const revision=viewRef.current.revision
    if (await perform('edit', { operations: updates, title: l("删除节点及其连接"), base: data?.base, positions: Object.fromEntries(team.tasks.map(task => [task.id, pos(task.id)])) })) {
      updateView(current => { const drafts={...current.drafts}; delete drafts[editorKey(team.id,{type:'task',id})]; delete drafts[editorKey(team.id,{type:'check',id})]; return {...current,drafts} })
      if (revision===viewRef.current.revision) selectDiscussion('graph')
    }
  }
  function beginNodeDrag(event: ReactPointerEvent<HTMLElement>, task: TeamTask): void {
    suppressNodeClick.current=false
    if (panMode || event.button !== 0 || working || archiveView || !editing || (event.target as HTMLElement).closest('[data-connection-handle]')) return
    const target = event.currentTarget, start = point(event), original = pos(task.id)
    let last = original, moved = false
    target.setPointerCapture(event.pointerId)
    const cleanup = () => { target.onpointermove = null; target.onpointerup = null; target.onpointercancel = null; if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId) }
    target.onpointermove = move => {
      const at = point(move)
      if (!moved && Math.hypot(at.x - start.x, at.y - start.y) < 4 / zoom) return
      if(!moved) edit(task.checkpoint?'check':'task',task.id)
      moved = true; suppressNodeClick.current = true
      last = { x: Math.min(10000, Math.max(0, original.x + at.x - start.x)), y: Math.min(10000, Math.max(0, original.y + at.y - start.y)) }
      setPositions(prev => ({ ...prev, [task.id]: last }))
    }
    target.onpointerup = () => { cleanup(); if (moved) void perform('layout', { taskId: task.id, ...last }).then(() => setPositions(prev => { const next = { ...prev }; delete next[task.id]; return next })) }
    target.onpointercancel = () => { cleanup(); suppressNodeClick.current = false; setPositions(prev => { const next = { ...prev }; delete next[task.id]; return next }) }
  }
  function edit(type: EditorTarget['type'], id?: string, overrides?: Record<string,string>): void { if(!archiveView) setEditing(true); choose({type,id},overrides) }
  const field = (key: string, label: string, multiline = false) => <label data-field={key}>{label}{multiline
    ? <textarea required={(key === 'summary' && !editor?.id) || (key === 'description' && !!activeTask?.workflowConfigPending) || key === 'rerunInstructions'} value={draft[key] ?? ''} onChange={e => setDraft({ ...draft, [key]: e.target.value })} />
    : <input required={key === 'name' || key === 'subject' || (key === 'summary' && !editor?.id)} value={draft[key] ?? ''} disabled={key === 'name' && (!!editor?.id || working)} onChange={e => setDraft({ ...draft, [key]: e.target.value })} />}</label>
  function pos(id: string) {
    return positions[id] ?? team?.workflow?.positions[`task:${id}`] ?? defaultPositions[id] ?? { x: 32, y: 32 }
  }
  function point(event: { clientX: number; clientY: number }) {
    const bounds = canvas.current!.getBoundingClientRect()
    return { x: (event.clientX - bounds.left + canvas.current!.scrollLeft) / zoom, y: (event.clientY - bounds.top + canvas.current!.scrollTop) / zoom }
  }
  const draftPosition = editor?.id ? pos(editor.id) : {
    x: 32,
    y: Math.max(-128, ...team?.tasks.map(t => pos(t.id).y) ?? []) + 160,
  }
  const graphWidth = Math.max(580, ...team?.tasks.map(t => pos(t.id).x + 265) ?? [], taskEditing ? draftPosition.x + 265 : 0)
  const graphHeight = Math.max(260, ...team?.tasks.map(t => pos(t.id).y + 170) ?? [], taskEditing ? draftPosition.y + 170 : 0)
  function fitCanvas(): void {
    if (!canvas.current) return
    setZoom(fitGraph(canvas.current.clientWidth, canvas.current.clientHeight, graphWidth, graphHeight))
    canvas.current.scrollTo(0, 0)
  }
  function changeZoom(value: number, clientX?: number, clientY?: number): void {
    const viewport = canvas.current
    if (!viewport) return
    const bounds = viewport.getBoundingClientRect(), next = clampZoom(value)
    const x = clientX === undefined ? viewport.clientWidth / 2 : clientX - bounds.left
    const y = clientY === undefined ? viewport.clientHeight / 2 : clientY - bounds.top
    const left = (viewport.scrollLeft + x) * next / zoom - x
    const top = (viewport.scrollTop + y) * next / zoom - y
    setZoom(next)
    requestAnimationFrame(() => viewport.scrollTo(Math.max(0, left), Math.max(0, top)))
  }
  useEffect(() => {
    const viewport = canvas.current
    if (!opened || !viewport) return
    const wheel = (event: WheelEvent) => {
      if (event.deltaY === 0) return
      event.preventDefault()
      const pixels = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientHeight : 1)
      const delta = Math.max(-120, Math.min(120, pixels))
      changeZoom(zoom * Math.exp(-delta * .002), event.clientX, event.clientY)
    }
    viewport.addEventListener('wheel', wheel, { passive: false })
    return () => viewport.removeEventListener('wheel', wheel)
  }, [opened, zoom, !!team])
  useLayoutEffect(() => {
    // CSS zoom rounds borders to device pixels. Use the rendered border widths
    // so ports remain on the SVG's outer-box anchors at fractional zoom too.
    const measured = Array.from(canvas.current?.querySelectorAll<HTMLElement>('[data-canvas-node]') ?? []).map(node => {
      const style = getComputedStyle(node)
      return {node,side:style.borderLeftWidth,top:style.borderTopWidth}
    })
    for (const {node,side,top} of measured) {
      node.style.setProperty('--node-side-border',side)
      node.style.setProperty('--node-top-border',top)
    }
  }, [opened,zoom,team?.tasks])
  function beginPan(event: ReactPointerEvent<HTMLDivElement>): void {
    if (event.button !== 0 && event.button !== 1) return
    const blank = event.target === event.currentTarget || (event.target as HTMLElement).classList.contains(css.plane!)
    if (event.button !== 1 && !panMode && !blank && editing && !archiveView) return
    if ((event.target as Element).closest('[data-connection-handle], [data-node-playback], [data-node-rerun]')) return
    const immediate = blank || panMode || event.button === 1
    if (immediate) { event.preventDefault(); event.stopPropagation() }
    const target = event.currentTarget, x = event.clientX, y = event.clientY
    const left = target.scrollLeft, top = target.scrollTop
    let moved = false
    suppressPanClick.current = false
    if (immediate) target.setPointerCapture(event.pointerId)
    target.onpointermove = move => {
      if (!moved && Math.hypot(move.clientX - x, move.clientY - y) <= 4) return
      if (!moved) { moved = true; target.setPointerCapture(event.pointerId); target.dataset.dragging = 'true' }
      move.preventDefault(); suppressPanClick.current = true
      target.scrollTo(left - move.clientX + x, top - move.clientY + y)
    }
    const cleanup = () => { target.onpointermove = null; target.onpointerup = null; target.onpointercancel = null; delete target.dataset.dragging; if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId) }
    target.onpointerup = () => {
      cleanup()
      if (moved || !blank || panMode) return
      updateView(current => selectWorkbench(current, { type: 'discussion', key: 'graph' }, team))
      setPane('flow')
      setInspectorHidden(true)
      setError('')
      setFeedback('')
    }
    target.onpointercancel = () => { cleanup(); suppressPanClick.current = false }
  }
  function resizeInspector(event: ReactPointerEvent<HTMLDivElement>): void {
    if (event.button !== 0) return
    event.preventDefault()
    const target = event.currentTarget, right = target.parentElement!.getBoundingClientRect().right
    setInspectorExpanded(false)
    target.setPointerCapture(event.pointerId)
    target.onpointermove = move => setInspectorWidth(Math.max(300, Math.min(720, right - move.clientX)))
    const cleanup = () => { target.onpointermove = null; target.onpointerup = null; target.onpointercancel = null; if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId) }
    target.onpointerup = cleanup; target.onpointercancel = cleanup
  }
  async function arrangeCanvas(): Promise<void> {
    if (!team || working || archiveView) return
    const result = await perform('layout', { positions: defaultPositions })
    if (result) { setPositions({}); setFeedback(l("已按任务依赖整理布局。")) }
  }
  async function createNode(type: 'task' | 'check'): Promise<void> {
    if (!team || working || archiveView) return
    const revision = viewRef.current.revision
    const label = type === 'check' ? l("人工检查") : l("新任务")
    let number = team.tasks.length + 1
    while (team.tasks.some(task => task.subject === `${label} ${number}`)) number++
    const result = await saveEdit([{ action: 'add_task', subject: `${label} ${number}`, checkpoint: type === 'check', configurationPending: true, dependencies: [] }], l("创建{0}", label))
    if (!result || revision !== viewRef.current.revision) return
    const added = result.team.tasks.find(task => !team.tasks.some(old => old.id === task.id))
    if (!added) return
    setEditing(true); setPanMode(false)
    updateView(current => selectWorkbench(current, { type, id: added.id }, result.team))
    setLibrary('tasks'); setPane(window.matchMedia('(max-width: 900px)').matches ? 'discussion' : 'flow'); setInspectorHidden(false)
    setFeedback(l("节点已保存，可直接连线；填写要求并完成配置前不会执行或进入验收。"))
    requestAnimationFrame(() => {
      const p = result.team.workflow?.positions[`task:${added.id}`]
      if (p) canvas.current?.scrollTo({ left: Math.max(0, p.x * zoom - 48), top: Math.max(0, p.y * zoom - 48), behavior: 'smooth' })
    })
  }
  async function openReview(id: string): Promise<void> {
    setShowOutcomes(false)
    setGalleryMode(undefined); setEditing(false); setOpened(true)
    setInspectorWidth(width => Math.max(width, 640))
    selectDiscussion(`check:${id}`); scrollToTask(id)
    focusAttention('[data-review-heading]')
    // Reading a gate never starts a model turn or writes to an archive/decided round.
    if (!archiveView && data?.ready.includes(id)) await perform('materials', { discussion: `check:${id}` })
  }
  function renderProposalReview() {
    if (!proposal || !team || !data) return null
    return <ProposalReview key={proposal.id} team={team} proposal={proposal} base={data.base} busy={working} fixedStructure={discussion==='adapt'} focusRequest={proposalFocus} draft={reviewDrafts[proposal.id]} onChange={draft => setReviewDrafts(prev => ({ ...prev, [proposal.id]: draft }))}
      onApply={operations => { void perform('apply', { proposalId: proposal.id, operations }).then(result => { if (result) { setFeedback(l("修改已应用，可继续讨论。")) } }) }}
      onDismiss={() => void perform('dismiss', { proposalId: proposal.id }).then(result => { if (result) setFeedback(l("修改已放弃，可以继续讨论。")) })} />
  }
  const pendingProposals = Object.entries(team?.workflow?.discussions ?? {}).filter(([key, item]) => !archiveView && key.startsWith('discussion:') && item.proposal?.status === 'pending').map(([, item]) => item)
  const pendingCount = pendingProposals.length
  const pendingNotice = pendingCount > 0 && <div className={css.pendingNotice} role="status"><strong>{l("有 ")}{pendingCount} {l(" 项修改等待确认")}</strong>
    {pendingProposals.map(item => <button type="button" key={item.key} onClick={() => openProposal(item.key)}>{l("查看并决定 · ")}{item.proposal!.title}</button>)}
    {!!editor && <small>{l("切换查看会保留当前草稿。")}</small>}
  </div>
  const reviewCount = archiveView ? 0 : data?.ready.length ?? waitingCount
  const reviewNotice = !archiveView && !!data?.ready.length && <div className={css.reviewNotice} role="status" aria-label={l("等待你验收")}>
    <strong><span className={css.reviewDot} aria-hidden />{l("等待你验收")}</strong>
    {data.ready.map(id => <button type="button" key={id} disabled={working} onClick={() => void openReview(id)}>{l("验收 · ")}{team?.tasks.find(t => t.id === id)?.subject} ↗</button>)}
    {!reviewEntryOnly && <small>{l("上游已完成 · 打开验收工作台核对证据")}</small>}
  </div>
  const adaptation = pendingProposals.find(item => item.key === 'adapt' && item.proposal?.base === data?.base)?.proposal
  const proposedTasks = new Set(adaptation?.operations.flatMap(op => op.action === 'update_task' ? [op.id] : []))
  const attention = [
    ...(archiveView ? [] : team?.tasks.filter(task=>task.checkpoint?.decision==='reject')??[]).map(task=>({key:'rejected:'+task.id,label:l('安排返工 · {0}',task.subject),open:()=>void openReview(task.id)})),
    ...pendingProposals.map(item => ({
      key: 'proposal:' + item.key, label: l("确认方案 · {0}", item.proposal!.title), open: () => openProposal(item.key),
    })),
    ...(archiveView ? [] : data?.ready ?? []).map(id => ({
      key: 'review:' + id, label: l("验收 · {0}", team?.tasks.find(task => task.id === id)?.subject ?? id), open: () => void openReview(id),
    })),
    ...(archiveView ? [] : unconfigured.filter(task => !proposedTasks.has(task.id))).map(task => ({
      key: 'configure:' + task.id, label: l("配置 · {0}", task.subject), open: () => { setEditing(true); locateTask(task.id, task.adaptationIssue?.trim() ? 'adaptationIssue' : 'subject') },
    })),
    ...(archiveView ? [] : team?.tasks.filter(task => task.workflowRerunRequired && !task.workflowConfigPending) ?? []).map(task => ({
      key: 'rerun:' + task.id, label: l("查看重跑路径 · {0}", task.subject), open: () => { setEditing(false); locateTask(task.id, undefined, '[data-rerun-path]') },
    })),
    ...(archiveView || team?.halted ? [] : team?.tasks.filter(task => task.status === 'failed' && !task.workflowRerunRequired && !task.workflowConfigPending) ?? []).map(task => ({
      key: 'failure:' + task.id, label: l("查看失败任务 · {0}", task.subject), open: () => { setEditing(false); locateTask(task.id, undefined, '[data-task-record]') },
    })),
  ]
  const blockers=archiveView?[]:(team?.tasks??[]).filter(task=>task.status!=='completed').map(task=>({task,state:taskReadiness(team!,task,l,data?.execution?.[task.id])})).filter(({task,state})=>state.action||state.dependencies.length||task.workflowPaused||task.workflowRerunRequired)
  const firstAction = attention[0]
  const completed = team?.tasks.filter(task => task.status === 'completed').length ?? 0
  // The chat header always exposes Teamflow, even before a team exists.
  return <>
    {!initiallyOpen && <>
    {data?.currentDiscussion && team && <div className={css.nativeBanner}><span>{data.currentDiscussion.startsWith('check:') ? l("独立验收对话") : l("独立配置对话")} · {team.name}</span><button className={css.entry} onClick={() => void openExecution?.(team.captainSessionId, team.captainSessionId)}>{l("返回团队对话 ↗")}</button></div>}
    {<button type="button" className={`${css.entry} ${nativeOnly ? css.compact : css.launcher}`} aria-haspopup="dialog" onClick={() => setOpened(true)}>
      <strong><span className={css.iconLabel}><BrandIcon size={20}/>Teamflow</span><span aria-hidden>↗</span></strong>
      {!nativeOnly && <span>{archiveView ? l("归档画布 · ") : ''}{team?.name ?? (activeId ? l("查看成员、任务交接与人工检查") : l("讨论目标，创建初步团队"))}</span>}
      {pendingCount > 0 && <span>{pendingCount} {l(" 项修改待确认")}</span>}
      {reviewCount > 0 && <span>{reviewCount} {l(" 项等待人工验收")}</span>}
    </button>}
    {!nativeOnly && !reviewEntryOnly && !archiveView && team?.phase === 'staged' && <button type="button" className={`${css.entry} ${css.startEntry}`} disabled={working || unsaved.length > 0 || unconfigured.length > 0 || pendingCount > 0} title={unsaved.length ? l("请先保存属性草稿") : unconfigured.length ? l("请先完成待配置节点") : pendingCount ? l("请先处理待确认的修改") : undefined} onClick={() => void perform('start')}>{l("确认并启动团队")}</button>}
    {!opened && !nativeOnly && !reviewEntryOnly && pendingNotice}
    {error && !opened && <div className={css.error} role="alert">{workflowMessage(error, l)}</div>}
    {!nativeOnly && reviewNotice}
    {nativeOnly && data?.currentDiscussion && openContext && <button className={`${css.entry} ${css.compact}`} onClick={openContext}>{proposal ? l("查看待确认修改 ↗") : l("团队与讨论资料 ↗")}</button>}
    {embeddedContext && team && <section className={css.contextPanel} aria-label={l("讨论资料")}><header><strong>{l("讨论资料")}</strong><span>{l("当前已保存的信息")}</span></header><label>{l("查看对象")}<select value={discussion} onChange={event => selectDiscussion(event.target.value)}><option value="graph">{l("团队与流程")}</option>{team.members.filter(m => m.status !== 'removed').map(m => <option key={m.name} value={`member:${m.name}`}>{m.name}</option>)}{team.tasks.map(t => <option key={t.id} value={`${t.checkpoint ? 'check' : 'task'}:${t.id}`}>{t.checkpoint ? l("验收") : l("任务")} · {t.subject}</option>)}</select></label>
      {feedback && <p role="status">{workflowMessage(feedback, l)}</p>}
      {conversation?.materials && <details><summary>{l("本轮验收证据")}</summary><ReviewMaterials text={conversation.materials} /></details>}
      {proposal && !opened && <section className={css.contextProposal} aria-label={l("待确认修改")}>{renderProposalReview()}<button onClick={() => { setPane('discussion'); setOpened(true) }}>{l("在画布查看 ↗")}</button></section>}
      <WorkflowContext team={team} discussion={discussion} onSelect={selectDiscussion} openExecution={openExecution} />
    </section>}
    </>}
    {opened && createPortal(<section ref={dialog} className={css.workbench} style={{'--wb-node-width':`${WORKFLOW_NODE_WIDTH}px`,'--wb-port-y':`${WORKFLOW_PORT_Y}px`} as CSSProperties} data-live={!archiveView} data-maximized={maximized} data-editing={!!editor || !!selectedEdge || !!activeTask} role="dialog" aria-modal="true" aria-label={l("TeamFlow 编排工作台")} onKeyDown={event => {
      if (!galleryMode && !showOutcomes && !archiveView && editing && (event.key === 'Delete' || event.key === 'Backspace') && (selectedEdge || selectedTask) && !(event.target as HTMLElement).closest('input,textarea,select,[contenteditable="true"]')) { event.preventDefault(); if (selectedEdge) void deleteEdge(); else if (selectedTask) void deleteNode(selectedTask); return }
      if (event.key === 'Escape') { if (cancelLink.current) { cancelLink.current(); return }; if (editor) { setEditing(false); setFeedback(l("已退出编辑，未保存的草稿已保留。")) } else closeWorkbench() }
      if (event.key === 'Tab') {
        const scope = dialog.current
        const items = [...scope?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), summary, [tabindex="0"]') ?? []].filter(el => el.getClientRects().length)
        const first = items[0], last = items.at(-1)
        if (event.shiftKey && (document.activeElement === first || !scope?.contains(document.activeElement))) { event.preventDefault(); last?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }
    }}>
      <header className={css.header}><div className={css.title}><BrandIcon size={32}/><div><strong>{team?.name ?? 'Teamflow'}</strong><span>{archiveView ? l("归档画布 · 成果与详情完整保留") : team?.phase === 'staged' ? l("准备流程 · 确认后开始执行") : l("团队工作台")}{!!team?.tasks.length && <> · {l("已完成 {0}/{1}", completed, team.tasks.length)}</>}</span></div></div>
        <div>{team && !galleryMode && !showOutcomes && (archiveView ? <button className={css.primary} disabled={working} onClick={() => void perform('restore_archive')}><WorkflowIcon name="edit" />{l("恢复并编辑流程")}</button> : <button aria-pressed={editing} onClick={() => {setEditing(!editing);updateView(current=>({...current,revision:current.revision+1}))}}>{editing ? <IconBranchOutline16 /> : <WorkflowIcon name="edit" />}{editing ? l("查看流程") : l("编辑流程")}</button>)}
          {!galleryMode && !showOutcomes && !archiveView && team?.phase === 'staged' && <button className={css.primary} disabled={working || unsaved.length > 0 || unconfigured.length > 0 || pendingCount > 0} title={unsaved.length ? l("请先保存属性草稿") : unconfigured.length ? l("请先完成待配置节点") : pendingCount ? l("请先处理待确认的修改") : undefined} onClick={() => void perform('start')}>{l("确认并启动")}</button>}
          {!galleryMode && !showOutcomes && !archiveView && team?.phase !== 'staged' && team && !team.halted && <span data-flow-controls title={l(zh['flow.control.hint'])}>
            <button disabled={working || unsaved.length > 0 || !flow?.canStart} onClick={() => void perform('set_flow_enabled',{enabled:true,version:flowControlVersion(team)})}>{l("开始全部")}</button>
            <button disabled={working || !flow?.canPause} onClick={() => void perform('set_flow_enabled',{enabled:false,version:flowControlVersion(team)})}>{l("暂停全部")}</button>
          </span>}
          {onShowActivity && <button onClick={onShowActivity}>{l("团队活动与历史")}</button>}
          <button aria-pressed={maximized} onClick={() => setMaximized(!maximized)}><WorkflowIcon name="expand" />{maximized ? l("退出全屏") : l("全屏")}</button>
          <button onClick={closeWorkbench} aria-label={l("关闭编排工作台")}>{l("关闭")}</button></div></header>
      <nav className={css.pageTabs} aria-label={l("Teamflow 页面")}><button aria-pressed={!galleryMode && !showOutcomes} onClick={()=>{setGalleryMode(undefined);setShowOutcomes(false)}}><BrandIcon/>{team?l("当前流程"):l("从零创建")}</button><button hidden={!team} aria-pressed={showOutcomes} onClick={()=>{setGalleryMode(undefined);setShowOutcomes(true)}}><WorkflowIcon name="task"/>{l("交付内容")}</button><button aria-pressed={galleryMode==='browse'} className={css.galleryEntry} onClick={()=>{setShowOutcomes(false);setGalleryMode('browse')}}><BrandIcon name="gallery"/>{l("流程模板库 ")}</button>{team&&<button disabled={working||!!unsaved.length||!team.tasks.length} title={unsaved.length?l("请先保存属性草稿"):undefined} onClick={()=>{setShowOutcomes(false);setGalleryMode('save')}}><BrandIcon name="save"/>{l("保存为模板")}</button>}{team?.workflow?.templateSource&&<small>{l("来自 ")}{team.workflow.templateSource.name} · v{team.workflow.templateSource.version}</small>}</nav>
      {galleryMode&&<TemplateGallery key={galleryMode} sessionId={sessionId} team={team} archived={archiveView} mode={galleryMode} onBack={()=>setGalleryMode(undefined)} onApply={async(template,name,goal)=>{const result=await perform('template_apply',{templateId:template.id,version:template.version,name,description:goal,language:l.language});if(!result)throw new Error(l("未能创建流程，请查看页面错误或刷新重试"));setGalleryMode(undefined);setEditing(false);await startEmbedded('adapt',result.team.id)}}/>}
      {showOutcomes && !galleryMode && team && <OutcomeShowcase key={team.id+':'+sessionId} team={team} sessionId={sessionId} archived={archiveView} onTask={(id,review)=>{if(review)void openReview(id);else locateTask(id)}}/>}
      <div className={css.workbenchBody} hidden={!!galleryMode || showOutcomes}>
      {team && <nav className={css.commandBar} aria-label={l("创建与视图")}>
        {team.workflow?.templateSource&&team.phase==='staged'&&<button disabled={working} onClick={()=>void startEmbedded('adapt')}><BrandIcon/>{l("统一适配本次任务")}</button>}<strong>{l("创建")}</strong><button disabled={working || archiveView} onClick={() => void createNode('task')}><WorkflowIcon name="task" />{l("任务节点")}</button><button disabled={working || archiveView} onClick={() => void createNode('check')}><WorkflowIcon name="review" />{l("人工节点")}</button><button disabled={working || archiveView} onClick={() => edit('member')}><WorkflowIcon name="agent" />Agent</button>
        <span className={css.commandSpacer} /><button aria-pressed={!inspectorHidden} onClick={() => { setPane(inspectorHidden ? 'discussion' : 'flow'); setInspectorHidden(!inspectorHidden) }}>{inspectorHidden ? l("显示右侧面板") : l("收起右侧面板")}</button>
      </nav>}
      {revalidating&&<p role="status" className={css.hint}>{l('已显示上次状态，正在同步最新进度…')}</p>}
      {team && (unsaved.length > 0 || saveState !== 'saved' || storageError) && <section className={css.saveBar} aria-label={l("保存状态")}>
        <span role="status">{saveState === 'saving' ? l("正在保存画布…") : saveState === 'error' ? l("上次保存失败，请重试") : l("节点与连线自动保存")} · {unsaved.length ? l("{0} 个对象有未保存属性", unsaved.length) : l("属性已保存")}</span>
        {!!unsaved.length && <><button disabled={working || archiveView} onClick={() => void saveAllProperties()}>{l("保存全部属性")}</button><details><summary>{l("查看未保存对象")}</summary>{unsaved.map(item => <button key={item.key} onClick={() => edit(item.target.type,item.target.id)}>{item.label} {l(" · 未保存")}</button>)}</details></>}
        {storageError && <span role="alert">{workflowMessage(storageError, l)}</span>}
      </section>}
      {team && <nav className={css.paneTabs} aria-label={l("工作台视图")}>{(['members', 'flow', 'discussion'] as const).map(value => <button key={value} aria-pressed={pane === value} onClick={() => { setPane(value); setInspectorExpanded(false); if (value === 'discussion') setInspectorHidden(false) }}>{value === 'members' ? l("对象列表") : value === 'flow' ? l("任务流程") : l("修改与验收")}{value === 'discussion' && proposal && <i aria-label={l("有待确认的修改")} />}</button>)}</nav>}
      {firstAction && <nav className={css.attention} aria-label={l("待处理")}>
        <strong>{l("待处理")} · {attention.length}</strong>
        <button disabled={working} title={firstAction.label} onClick={firstAction.open}>{firstAction.label}</button>
        {attention.length > 1 && <select aria-label={l("其他待处理事项")} value="" disabled={working} onChange={event => attention.find(item => item.key === event.target.value)?.open()}>
          <option value="" disabled>{l("其他待处理事项")}</option>
          {attention.slice(1).map(item => <option key={item.key} value={item.key}>{item.label}</option>)}
        </select>}
      </nav>}
      {!galleryMode&&!showOutcomes&&team?.halted&&!archiveView&&<section className={css.readiness}><strong>{l('团队已停止')}</strong><p>{l('恢复后可继续待执行工作；已取消或失败的任务需单独重跑。')}</p><button disabled={working} onClick={()=>void perform('resume_team',{base:data?.base,reason:'用户恢复流程'})}>{l('恢复团队')}</button></section>}
      {!galleryMode&&!showOutcomes&&!!blockers.length&&<details className={css.blockers}><summary>{l('阻塞与恢复')} · {blockers.length}</summary><div>{blockers.map(({task,state})=><section key={task.id}><button onClick={()=>{setEditing(false);locateTask(task.id)}}>{task.subject}</button><strong>{state.label}</strong><p>{state.detail}</p></section>)}</div></details>}
      {connectionError&&<div className={css.error} role="alert"><strong>{l('连接需要恢复')}</strong><p>{workflowMessage(connectionError,l)}</p><button type="button" disabled={working} onClick={()=>void refresh()}>{l('重新连接并读取状态')}</button></div>}
      {error && <div className={css.error} role="alert">{workflowMessage(error, l)}</div>}
      {archiveView && <p className={css.notice}>{l("归档画布 · 可查看全部节点、连接与成果。恢复并编辑将保留原归档和已完成成果，建立待确认流程，不会自动执行。")}</p>}
      {feedback && !editor && <p className={css.notice} role="status">{workflowMessage(feedback, l)}</p>}
      {!activeId ? <form className={css.create} onSubmit={e => { e.preventDefault(); void createFlow() }}>
        <h2>{l("描述目标，一起规划团队")}</h2><p>{l("已有适合的流程？")}<button type="button" onClick={()=>setGalleryMode('browse')}><BrandIcon name="gallery"/>{l("从模板开始")}</button></p><label>{l("团队名称")}<input required value={name ?? l('新团队')} placeholder={l("新团队")} onChange={e => setName(e.target.value)} /></label>
        <label>{l("团队目标")}<textarea required value={goal} onChange={e => setGoal(e.target.value)} /></label><button className={css.primary} disabled={working}>{l("在 DSH 中讨论方案 ↗")}</button>
      </form> : !team ? <p role="status">{l("正在读取团队…")}</p> : <div className={css.columns} style={{ '--inspector-width': `${inspectorWidth}px` } as CSSProperties} data-reviewing={reviewingCheckpoint} data-inspector-hidden={inspectorHidden} data-inspector-expanded={inspectorExpanded} data-pane={pane} data-editing={!!editor || !!selectedEdge || !!activeTask}>
        <aside className={css.roster} aria-label={l("对象列表")}>
          <nav className={css.libraryTabs} aria-label={l("对象分类")}><button aria-pressed={library === 'tasks'} onClick={() => setLibrary('tasks')}><WorkflowIcon name="task" />{l("任务 ")}{team.tasks.length}</button><button aria-pressed={library === 'agents'} onClick={() => setLibrary('agents')}><WorkflowIcon name="agent" />Agent {team.members.filter(m => archiveView || m.status !== 'removed').length}</button></nav>
          {library === 'tasks' ? <section className={css.taskList}><h3>{l("任务流程")}</h3><p className={css.hint}>{l("任务决定做什么，Agent 决定由谁执行。")}</p>{team.tasks.map(task => <button key={task.id} data-kind={task.checkpoint ? 'check' : 'task'} aria-pressed={selectedTask === task.id} onClick={() => {
            choose({ type: task.checkpoint ? 'check' : 'task', id: task.id })
            requestAnimationFrame(() => { const p = pos(task.id); canvas.current?.scrollTo({ left: Math.max(0, p.x * zoom - 48), top: Math.max(0, p.y * zoom - 48), behavior: 'smooth' }) })
          }}><small className={css.iconLabel}><WorkflowIcon name={task.checkpoint ? 'review' : 'task'} />{task.checkpoint ? l("人工节点") : l("任务节点")} · {task.id}</small><strong>{task.subject}{unsaved.some(item => item.target.id === task.id && item.target.type !== 'member') && <em className={css.dirtyDot}> {l(" · 未保存")}</em>}</strong><span title={taskReadiness(team,task,l).detail}>{taskStatus(task, data.ready)}</span></button>)}{!team.tasks.length && <p className={css.hint}>{l("从顶部创建任务节点或人工节点。")}</p>}</section> : <><h3>{l("Agent 成员 ")}<button disabled={working || archiveView} aria-label={l("添加成员")} onClick={() => edit('member')}>{l("＋ 添加")}</button></h3>
          {team.members.filter(m => archiveView || m.status !== 'removed').map(m => <article key={m.name} className={relatedMember === m.name ? css.selected : ''} onClick={event => { if (!(event.target as HTMLElement).closest('button')) { edit('member', m.name) } }}>
            <button className={css.member} aria-pressed={selection.type === 'member' && selection.id === m.name} onClick={() => { edit('member', m.name) }}><img src={memberArtUrl(m.name, m.role ?? '')} alt="" /><span><strong>{m.name}{unsaved.some(item => item.target.type === 'member' && item.target.id === m.name) && <em className={css.dirtyDot}> {l(" · 未保存")}</em>}</strong><span>{m.summary || m.role || l("尚未填写职责概述")}</span></span></button>
            <small className={css.iconLabel}><WorkflowIcon name="agent" />Agent · {m.model || l("继承队长模型")}</small><div><button disabled={working || archiveView} onClick={() => prepareDiscussion(m.name)}><WorkflowIcon name="chat" />{l("讨论调整 ↗")}</button>
              {m.id && openExecution && <button onClick={() => { openExecution(m.id, team.captainSessionId); closeWorkbench() }}>{l("执行对话 ↗")}</button>}
              {openExecution && m.previousSessionIds?.map((id, i) => <button key={id} onClick={() => { openExecution(id, team.captainSessionId); closeWorkbench() }}>{l("历史执行 ")}{i + 1} ↗</button>)}</div>
          </article>)}
          <p className={css.hint}>{archiveView ? l("点击成员查看保存的配置与执行记录；恢复并编辑后可调整。") : l("点击成员卡片直接编辑；讨论调整默认继续该成员的独立讨论，保留历史上下文。")}</p></>}
        </aside>
        <main className={css.graphArea}>
          <nav className={css.toolbar} aria-label={l("画布工具")}><button aria-pressed={!panMode} onClick={() => setPanMode(false)}><WorkflowIcon name="select" />{l("选择")}</button><button aria-pressed={panMode} onClick={() => setPanMode(true)}><WorkflowIcon name="pan" />{l("平移")}</button><button aria-label={l("缩小画布")} disabled={zoom <= .1} onClick={() => changeZoom(zoom - .1)}>−</button><button title={l("恢复 100%")} aria-label={l("缩放 {0}%，点击恢复 100%", Math.round(zoom * 100))} onClick={() => changeZoom(1)}>{Math.round(zoom * 100)}%</button><button aria-label={l("放大画布")} disabled={zoom >= 2} onClick={() => changeZoom(zoom + .1)}>＋</button><button onClick={fitCanvas}><WorkflowIcon name="fit" />{l("适应画布")}</button><button disabled={working || archiveView || !team.tasks.length} onClick={() => void arrangeCanvas()}><WorkflowIcon name="arrange" />{l("自动整理")}</button></nav>
          <div className={css.canvas} data-pan={panMode || !editing || archiveView} data-linking={!!link} ref={canvas} onPointerDownCapture={beginPan} onClickCapture={event=>{if(suppressPanClick.current) {suppressPanClick.current=false;event.preventDefault();event.stopPropagation()}}}>
            <div className={css.plane} style={{ width: graphWidth, height: graphHeight, zoom }}>
              <svg className={css.edges} aria-label={l("任务交接连线")}><defs><marker id="workflow-arrow" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="var(--wb-muted)" /></marker><marker id="workflow-arrow-active" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="var(--wb-accent)" /></marker></defs>
                {team.tasks.flatMap(t => t.dependencies.map(dep => { const path = connectionPath(connectionPort(pos(dep),'output'),connectionPort(pos(t.id),'input')); const selected=selectedEdge?.from === dep && selectedEdge.to === t.id; const related=highlightedTask === dep || highlightedTask === t.id; return <g key={`${dep}-${t.id}`} data-selected={selected} data-related={related} data-dimmed={(!!highlightedTask || !!selectedEdge) && !related && !selected} className={css.edge}>
                  <path d={path} markerEnd={selected ? 'url(#workflow-arrow-active)' : 'url(#workflow-arrow)'} />
                  <path className={css.edgeHit} d={path} role="button" tabIndex={0} aria-label={l("交接：{0} → {1}", team.tasks.find(task => task.id === dep)?.subject ?? dep, t.subject)} aria-pressed={selectedEdge?.from === dep && selectedEdge.to === t.id} onClick={() => { choose({ type:'edge',from:dep,to:t.id }) }} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); choose({ type:'edge',from:dep,to:t.id }) } }} />
                </g> }))}
                {link && <path d={connectionPath(connectionPort(pos(link.from),'output'),link)} />}
              </svg>
              {team.tasks.map(task => { const p = pos(task.id), control=taskControlState(team,{...task,workflowAwaitingStart:awaitsFirstStart(task)},archiveView); return <article key={task.id} data-canvas-node={task.id} data-lifecycle={control.visual} data-status={task.status} data-member-match={selection.type === 'member' && !!selection.id && task.assignee === selection.id || undefined} data-connection={link?.to === task.id ? link.issue ? 'invalid' : 'valid' : undefined} data-review-ready={!!task.checkpoint && !task.checkpoint.decision && data.ready.includes(task.id)} data-config-pending={task.workflowConfigPending || undefined} data-suspended={task.workflowRerunRequired || undefined} className={`${css.node} ${taskStateNodeClass} ${task.checkpoint ? css.checkpoint : ''} ${highlightedTask === task.id ? css.selected : ''}`} style={{ left: p.x, top: p.y }} onPointerDown={event => beginNodeDrag(event, task)} onClick={event => { if ((event.target as HTMLElement).closest('[data-connection-handle]')) return; if (suppressNodeClick.current) { suppressNodeClick.current = false; return }; if(editing && !archiveView) edit(task.checkpoint ? 'check' : 'task', task.id); else choose({type:task.checkpoint ? 'check' : 'task',id:task.id}) }}>
                <div className={`${css.drag} ${css.iconLabel}`}><WorkflowIcon name={task.checkpoint ? 'review' : 'task'} />{task.checkpoint ? l("人工节点") : l("任务节点")} · {task.id}{renderTaskControl(task)}</div>
                <button className={css.nodeBody} >
                  <strong title={task.subject}>{task.subject}</strong><span className={css.taskOwner} title={task.assignee}>{task.checkpoint ? l("人工验收 · 由你确认") : l("执行 Agent · {0}", task.assignee || l("自动分配"))}</span><TaskStateBadge control={control} t={t} detail={taskReadiness(team,task,l).detail} /></button>
                <button className={`${css.port} ${css.input}`} data-connection-handle data-input-id={task.id} aria-label={l("{0} 输入端", task.subject)} />
                <button className={`${css.port} ${css.output}`} data-connection-handle aria-label={l("{0} 输出端", task.subject)} disabled={working || archiveView || !editing || (taskEditing && !editor?.id)} title={l("从圆点拖出连接线")} onPointerDown={event => {
                  if (event.button !== 0) return
                  event.preventDefault()
                  const target = event.currentTarget
                  target.setPointerCapture(event.pointerId)
                  const update = (move: { clientX: number; clientY: number }) => {
                    const at = point(move), to = connectionTarget(team.tasks, pos, at, task.id)
                    const issue = to ? connectionIssue(team.tasks, task.id, to.id, l) : undefined
                    const end = to && !issue ? connectionPort(pos(to.id),'input') : at
                    setLink({ from: task.id, ...end, to: to?.id, issue })
                    return { to, issue }
                  }
                  const cleanup = () => {
                    target.onpointermove = null; target.onpointerup = null; target.onpointercancel = null
                    if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId)
                    cancelLink.current = undefined; setLink(undefined)
                  }
                  cancelLink.current = cleanup
                  update(event)
                  target.onpointermove = move => { update(move) }
                  target.onpointerup = up => {
                    const { to, issue } = update(up); cleanup()
                    if (issue) setError(issue)
                    if (to && !issue) void saveEdit([{ action: 'update_task', id: to.id, dependencies: [...to.dependencies, task.id] }], l("连接 {0} → {1}", task.subject, to.subject))
                  }
                  target.onpointercancel = cleanup
                }} />
              </article> })}
              {taskEditing && !editor?.id && <article className={`${css.node} ${css.draftNode}`} style={{ left: draftPosition.x, top: draftPosition.y }}><div className={css.drag}>{l("草稿 · 确认后加入流程")}</div><div className={css.nodeBody}><strong>{draft['subject'] || (editor?.type === 'check' ? l("新人工检查") : l("新任务"))}</strong><span>{editor?.type === 'check' ? l("你与独立验收 Agent") : draft['assignee'] || l("待指定 Agent")}</span><small>{l("尚未应用")}</small></div></article>}
              {!team.tasks.length && !editor && <p className={css.empty}>{l("添加任务或人工检查，或让 AI 根据目标提出流程方案。")}</p>}
            </div>
          </div>
          <footer className={css.canvasStatus} role="status">{link ? link.issue ?? (link.to ? l("已吸附 · 松开连接") : l("拖到下游节点 · Esc 取消")) : l("{0} 个任务节点 · {1} · 滚轮缩放（以鼠标位置为中心）{2}", team.tasks.length, editing ? l("拖动空白处平移") : l("拖动画布平移"), editing ? l(" · 靠近节点显示圆点，拖动连线 · Delete 删除") : l(" · 单击节点查看详情"))}</footer>
        </main>
        <div className={css.resizeHandle} role="separator" aria-label={l("调整右侧面板宽度")} aria-orientation="vertical" aria-valuemin={300} aria-valuemax={720} aria-valuenow={inspectorWidth} tabIndex={inspectorHidden ? -1 : 0} onPointerDown={resizeInspector} onKeyDown={event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); setInspectorExpanded(false); setInspectorWidth(value => Math.max(300, Math.min(720, value + (event.key === 'ArrowLeft' ? 40 : -40)))) } }} />
        <section className={css.inspector} aria-label={l("属性与讨论面板")}><header className={css.inspectorHeader}><strong>{reviewingCheckpoint ? l("验收工作台") : editor ? l("编辑属性") : activeTask || selectedEdge ? l("节点与连接") : l("讨论与验收")}</strong><button aria-pressed={inspectorExpanded} onClick={() => setInspectorExpanded(!inspectorExpanded)}>{inspectorExpanded ? l("还原面板") : l("放大面板")}</button></header>
          {selectedEdge && <aside className={css.editor} aria-label={l("交接详情")}><strong>{team.tasks.find(task => task.id === selectedEdge.from)?.subject} → {team.tasks.find(task => task.id === selectedEdge.to)?.subject}</strong><p>{l("上游完成后，下游才开始。编辑时按 Delete 删除；已开始的下游需先停止。")}</p><button disabled={working || archiveView || !editing} onClick={() => void deleteEdge()}>{l("删除连线")}</button></aside>}
          {activeTask && !editor && !selectedEdge && <aside className={css.editor} aria-label={activeTask.checkpoint ? l("人工验收属性") : l("任务属性")}><header className={css.taskHeading}>
            <small>{activeTask.checkpoint ? l("人工验收属性") : l("任务属性")} · {activeTask.id}</small>
            <h3 data-task-heading tabIndex={-1}>{activeTask.subject}</h3>
            {!archiveView && editorTarget(team,selection,true) && <button onClick={() => setEditing(true)}>{!activeTask.checkpoint && ['completed','failed','cancelled'].includes(activeTask.status) ? l("修改并重跑") : l("编辑节点")}</button>}
          </header>
          <section className={css.taskBrief}><strong>{l("任务要求 / 验收要求")}</strong><p>{activeTask.description || l("暂无任务说明")}</p></section>
          {renderReadiness(activeTask)}
          {!['completed', 'failed', 'cancelled'].includes(activeTask.status) && renderTaskControl(activeTask)}{renderRerunPath(activeTask)}
          {activeTask.checkpoint && <p>{l("第 ")}{activeTask.checkpoint.round} {l(" 轮 · ")}{activeTask.checkpoint.note || l("暂无验收意见")}</p>}<div>
            {!archiveView && !activeTask.checkpoint && <button className={css.primary} disabled={working} onClick={() => void startEmbedded(`task:${activeTask.id}`)}><WorkflowIcon name="chat" />{l("与 AI 讨论任务")}</button>}
            {!archiveView && !activeTask.checkpoint && activeTask.assignee && rerunnableTasks(team.tasks, activeTask.assignee).some(task => task.id === activeTask.id) && <button disabled={working} onClick={() => { edit('member', activeTask.assignee, {rerunTaskId:activeTask.id}) }}>{l("修改负责人并重跑此任务")}</button>}
          </div><TaskRecord task={activeTask} team={team} showContract={false} />
            {activeTask.checkpoint && <button className={css.primary} disabled={working} onClick={() => void openReview(activeTask.id)}>{data.ready.includes(activeTask.id) && !archiveView ? l("开始验收") : l("查看验收工作台")}</button>}
          </aside>}

        {reviewingCheckpoint && reviewTask && <ReviewWorkbench key={`${team.id}:${reviewTask.id}:${reviewTask.checkpoint?.round}`} team={team} task={reviewTask} conversation={conversation} ready={data.ready.includes(reviewTask.id)} archived={archiveView} busy={working} note={note} onNote={setNote}
          onReopen={()=>void perform('reopen_review',{taskId:reviewTask.id,base:data.base})}
          onRerun={async (taskId,instructions)=>!!(await saveEdit([{action:'rerun_task',id:taskId,instructions}],l('安排验收返工')))}
          reworkBlocked={unsaved.length?l('请先保存属性草稿'):undefined} continuation={<>{!reviewTask.checkpoint?.decision&&renderReadiness(reviewTask)}{renderRerunPath(reviewTask)}</>}
          onBack={() => locateTask(reviewTask.id)} onRefresh={() => void perform('materials', { discussion })}
          onDecision={async (decision, evidence, submittedNote) => {
            const scope = reviewScope
            const result = await perform('review', { taskId: reviewTask.id, discussion, evidence, decision, note: submittedNote })
            if (result) setReviewNotes(notes => notes[scope] === submittedNote ? { ...notes, [scope]: '' } : notes)
            return !!result
          }}
          onDiscuss={() => void startEmbedded(discussion)}
          onRestart={!data.currentDiscussion ? () => void startEmbedded(discussion, activeId, true) : undefined} discussionBusy={data.busy.includes(discussion)}
          discussion={embeddedDiscussion === discussion && activeId ? <EmbeddedDiscussion key={`${activeId}:${discussion}:${conversation?.native?.sessionId}`} sessionId={sessionId} teamId={activeId} discussion={discussion} /> : undefined}
          proposal={proposal ? <section className={css.proposal}>{renderProposalReview()}</section> : undefined}
        />}
        {!editor && !selectedEdge && !activeTask && !reviewingCheckpoint && <aside className={css.discussion} data-template-review={reviewingTemplate}><header><img src={reviewTask ? REVIEW_ART : member ? memberArtUrl(member.name, member.role ?? '') : LEAD_ART} alt="" /><div><h3 data-review-heading tabIndex={-1}>{reviewTask ? l("验收 · {0}", reviewTask.subject) : discussionTask ? l("任务讨论 · {0}", discussionTask.subject) : member ? l("成员职责 · {0}", member.name) : reviewingTemplate ? l("统一适配本次任务") : l("流程修改")}</h3>
          <small>{reviewTask ? l("一起检查成果，由你决定是否通过") : l("讨论不影响执行，修改确认后生效")}</small></div></header>
          <MessageArea className={css.messages}>
            {reviewingTemplate && <summary>{l("讨论记录与资料")}</summary>}
            <p className={css.hint}>{reviewTask ? l("在此窗口内共同检查成果并确认验收决定。") : discussionTask ? l("基于已保存的任务要求、负责人、上下游和提交结果讨论；未保存草稿不会发送给 AI。") : member ? l("在这里与独立配置顾问讨论；队长对话保持独立。") : l("在此窗口内讨论团队与流程，修改方案会显示在这里。")}</p>
            {discussionTask && <div><button onClick={() => locateTask(discussionTask.id)}>{l("返回任务属性")}</button><button disabled={working || archiveView} onClick={() => void startEmbedded('graph')}>{l("讨论整体流程与拆分")}</button></div>}
            {archiveView ? <p className={css.hint}>{l("恢复并编辑流程后可继续讨论。")}</p> : embeddedDiscussion === discussion && activeId ? <EmbeddedDiscussion key={`${activeId}:${discussion}:${conversation?.native?.sessionId}`} sessionId={sessionId} teamId={activeId} discussion={discussion} /> : <button className={css.primary} disabled={working} onClick={() => member ? prepareDiscussion(member.name) : void startEmbedded(discussion)}>{l(conversation?.native ? "继续在此处讨论" : "在此处开始讨论")}</button>}
            <details open={archiveView || !proposal && selection.type === 'member'}><summary>{l("已保存资料（不含待确认修改）")}</summary><WorkflowContext team={team} discussion={discussion} onSelect={key => key.startsWith('member:') ? edit('member', key.slice(7)) : selectDiscussion(key)} openExecution={openExecution} /></details>
            {conversation?.materials && <details open><summary>{l("本轮验收材料与证据")}</summary><ReviewMaterials text={conversation.materials} /></details>}
            {embeddedDiscussion !== discussion && data.busy.includes(discussion) && <p role="status">{l("原生对话正在整理方案…")}</p>}
          </MessageArea>
          {!archiveView && proposal && <section className={css.proposal}>{renderProposalReview()}</section>}
          {!archiveView && !data.currentDiscussion && <details><summary>{l("重新开始讨论")}</summary><p className={css.hint}>{l("新建独立讨论会归档当前讨论，从当前资料重新开始。")}</p><button disabled={working || data.busy.includes(discussion)} onClick={() => void startEmbedded(discussion, activeId, true)}>{l("新建独立讨论")}</button></details>}
        </aside>}

      {editor && <form key={`${editor.type}:${editor.id ?? 'new'}`} data-workflow-editor className={css.editor} onSubmit={event => {
        event.preventDefault()
        try {
          const route = draft['routeChanged'] ? { provider: draft['provider'], model: draft['model'], reasoningEffort: draft['reasoningEffort'] || 'default' } : {}
          const operations: WorkflowOperation[] = editor.type === 'member' ? [editor.id ? { action: 'update_member', name: editor.id, summary: draft['summary'], role: draft['role'], executionPrompt: draft['executionPrompt'], specificPrompt:draft['specificPrompt'], ...draftGalleryAccess(draft), ...route } : { action: 'add_member', name: draft['name'] ?? '', summary: draft['summary'] ?? '', role: draft['role'], executionPrompt: draft['executionPrompt'], specificPrompt:draft['specificPrompt'], ...draftGalleryAccess(draft), ...route }]
            : [editor.id ? { action: terminalEdit ? 'rerun_task' : 'update_task', id: editor.id, ...!terminalEdit && activeTask?.workflowConfigPending ? {confirmConfiguration:true} : {}, ...terminalEdit ? {instructions:draft['rerunInstructions']} : {}, subject: draft['subject'] ?? '', description: draft['description'], adaptationIssue:draft['adaptationIssue']??'', assignee: editor.type === 'check' ? undefined : draft['assignee'] } : { action: 'add_task', checkpoint: editor.type === 'check', subject: draft['subject'] ?? '', description: draft['description'], adaptationIssue:draft['adaptationIssue']??'', assignee: editor.type === 'check' ? undefined : draft['assignee'], dependencies: [] }]
          const rerun = (event.nativeEvent as SubmitEvent).submitter?.getAttribute('data-rerun') === 'true'
          if (rerun) {
            if (!editor.id || !draft['rerunTaskId'] || !team.tasks.some(task => task.id === draft['rerunTaskId'] && task.assignee === editor.id)) throw new Error(l("请选择该成员的已结束任务"))
            // Save member settings first, then review the selected task's result and new requirements.
          }
          const resumeId = (event.nativeEvent as SubmitEvent).submitter?.getAttribute('data-resume') === 'true' ? editor.id : undefined
          const resumeCheck = editor.type === 'check', revision=viewRef.current.revision, rerunTaskId=rerun ? draft['rerunTaskId'] : undefined
          void saveEdit(operations, rerun ? l("保存成员配置并进入重跑编辑") : editor.type === 'member' ? l("调整团队成员") : l("调整任务"), true).then(async saved => { if(saved && rerunTaskId && revision===viewRef.current.revision) edit('task',rerunTaskId); if (saved && resumeId && await perform('resume_task', { taskId: resumeId, base: saved.base }) && resumeCheck && revision===viewRef.current.revision) await openReview(resumeId) })
        } catch (error) { setError(error instanceof Error ? error.message : String(error)) }
      }}><div className={css.formBody}><h3>{editor.id ? l("编辑") : l("添加")}{editor.type === 'member' ? l("成员") : editor.type === 'check' ? l("人工检查") : l("任务")} <small className={currentDirty ? css.dirtyDot : css.hint}>{currentDirty ? l("未保存") : editor.id ? l("已保存") : l("尚未创建")}</small></h3>
        {terminalEdit && activeTask && <section className={css.rerunContext} aria-label={l("重跑输入")}><strong>{l("上一轮结果（自动提供给 Agent）")}</strong><pre>{activeTask.output || l("上一轮未提交结果")}</pre>{field('rerunInstructions',l("本次重跑要求（必填）"),true)}<p>{l("Agent 将结合原任务要求、上一轮结果和本次新增要求重新执行，并重新验证结果。")}</p></section>}
        {editor.type === 'member' ? <>{field('name', l("名称"))}<div className={css.memberModelSettings}><strong>{l("模型与 Thinking")}</strong>{modelDirectory && t ? <StagedModelPicker directory={modelDirectory} t={t} provider={draft['provider'] ?? ''} model={draft['model'] ?? ''} reasoningEffort={draft['reasoningEffort'] ?? ''} busy={working} onChange={selection => setDraft(prev => ({ ...prev, ...selection, routeChanged: 'yes' }))} /> : <p className={css.hint}>{l("模型目录暂不可用，请在 DSH 团队活动页面打开编辑。")}</p>}</div>{field('summary', l("Summary · 功能概述"), true)}{field('role', l("长期职责"), true)}{field('executionPrompt', l("通用执行指令 / PE"), true)}{field('specificPrompt', l("本次补充指令（可选）"), true)}
          {galleryAccessKeys.map(key => <label className={css.galleryPermission} key={key}><input type="checkbox" checked={draft[key] !== 'false'} disabled={working} onChange={event => setDraft(prev => ({ ...prev, [key]: String(event.target.checked) }))} />{key === 'gallerySkill' ? l("允许使用 Gallery Skill") : l("允许使用 Gallery MCP")}</label>)}</>
          : <>{field('subject', l("任务名称"))}{field('description', l("任务要求 / 验收要求"), true)}{activeTask?.adaptationIssue && <section className={css.adaptationIssue}>{field('adaptationIssue', l("需要确认的问题（处理后清空）"), true)}{draft['adaptationIssue']?.trim() ? <><p>{l("请先补充任务要求，再明确标记问题已解决。仅修改任务正文不会自动清除问题。")}</p><button type="button" disabled={working} onClick={() => setDraft({...draft,adaptationIssue:''})}>{l("已解决，清除问题")}</button></> : <p role="status">{l("问题已标记解决，保存后生效。")}</p>}</section>}{editor.type !== 'check' && <label>{l("执行 Agent")}<select value={draft['assignee'] ?? ''} onChange={e => setDraft({ ...draft, assignee: e.target.value })}><option value="">{l("由空闲成员领取")}</option>{team.members.filter(m => m.status !== 'removed').map(m => <option key={m.name}>{m.name}</option>)}</select></label>}
            <p className={css.hint}>{l("节点已在画布中，靠近节点后可拖动右侧圆点连线。修改名称或要求后点击保存。")}</p></>}
        {editor.type !== 'member' && activeTask && <>{renderReadiness(activeTask)}{!terminalEdit && <>{renderTaskControl(activeTask)}{renderRerunPath(activeTask)}</>}</>}
        {editor.type === 'task' && activeTask && <><button type="button" disabled={working} onClick={() => void startEmbedded(`task:${activeTask.id}`)}><WorkflowIcon name="chat" />{l("与 AI 讨论任务")}</button><small className={css.hint}>{l("讨论使用已保存的资料；当前草稿会保留。")}</small></>}
        {editor.type !== 'member' && activeTask && <TaskRecord task={activeTask} team={team} expanded={false} showContract={false} />}
        {terminalEdit && activeTask && <><p className={css.notice}>{l("保存将开启新一轮执行，原有状态与结果保存在历史执行记录中。以下下游先等待新结果：")}{rerunImpact(team.tasks,activeTask.id).descendants.map(task=>task.subject).join('、') || l("无")}{l("。可在任意下游节点选择「运行到此节点」，按依赖执行；人工检查仍需确认，其他分支保留。")}{team.phase === 'staged' ? l("请先查看流程并确认启动团队，再重跑。") : ''}</p></>}
        {editor.type === 'member' && editor.id && <TaskRerunPicker tasks={team.tasks} member={editor.id} taskId={draft['rerunTaskId'] ?? ''} disabled={working} onTask={id => setDraft(prev => ({ ...prev, rerunTaskId: id }))} />}
        {editor.type !== 'member' && activeTask?.workflowRerunRequired && <p className={css.hint}>{taskReadiness(team,activeTask,l).detail}</p>}
        {feedback && <p role="status">{workflowMessage(feedback, l)}</p>}<p className={css.hint}>{l("属性需点击保存；草稿保存在此标签页，刷新可恢复。Esc 退出编辑并保留草稿。")}</p>{draftStale && <p role="alert">{l("当前对象已变化，草稿仍保留。")}<button type="button" onClick={() => { if(draftId) updateView(current=>{const drafts={...current.drafts};delete drafts[draftId];return {...current,drafts}}) }}>{l("重新载入")}</button></p>}
        </div><footer>{editor.type !== 'member' && !!draft['adaptationIssue']?.trim() && <button type="button" onClick={() => focusAttention('[data-workflow-editor] [data-field="adaptationIssue"] textarea')}>{l("先处理需要确认的问题")}</button>}<button className={css.primary} disabled={working || (editor.type !== 'member' && !!draft['adaptationIssue']?.trim()) || (terminalEdit && (team.phase === 'staged' || !draft['rerunInstructions']?.trim()))}>{terminalEdit ? l("保存并重跑此任务") : activeTask?.workflowConfigPending && editor.type !== 'member' ? l("保存并完成配置") : l("保存")}</button>
          {editor.type === 'member' && editor.id && rerunnableTasks(team.tasks,editor.id).some(task=>task.id===draft['rerunTaskId']) && <button type="submit" data-rerun="true" disabled={working}>{l("保存成员并编辑重跑要求")}</button>}
          {editor.id && editor.type !== 'member' && !terminalEdit && !activeTask?.workflowConfigPending && !activeTask?.workflowRerunRequired && team.tasks.find(task => task.id === editor.id)?.workflowPaused && <button type="submit" data-resume="true" disabled={working || (activeTask?.workflowRerunRequired && activeTask.dependencies.some(id => team.tasks.find(task => task.id === id)?.status !== 'completed'))}>{activeTask?.workflowRerunRequired ? editor.type === 'check' ? l("使用新结果重新验收") : l("使用新结果执行") : editor.type === 'check' ? l("保存并开始验收") : l("保存并开始执行")}</button>}
          {editor.id && editor.type !== 'member' && !terminalEdit && <button type="button" disabled={working} onClick={() => void deleteNode(editor.id!)}>{l("删除节点")}</button>}
          {editor.type === 'check' && editor.id && data.ready.includes(editor.id) && <button type="button" disabled={working} onClick={() => void openReview(editor.id!)}>{l("开始验收 ↗")}</button>}<button type="button" onClick={cancelEdit}>{l("放弃修改")}</button>
          {editor.type === 'member' && editor.id && <button type="button" disabled={working} onClick={() => void saveEdit([{ action: 'remove_member', name: editor.id! }], l("移除 {0}", editor.id), true)}>{l("移除成员")}</button>}</footer>
      </form>}
        </section>
      </div>}
      </div>
    </section>, document.body)}
  </>
}

export function WorkflowWorkbench(props: Parameters<typeof Workbench>[0]) {
  return <WorkflowLocale t={props.t}><Workbench {...props}/></WorkflowLocale>
}
