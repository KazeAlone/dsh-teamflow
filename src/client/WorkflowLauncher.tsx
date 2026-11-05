import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import type { Context } from '@deepseek-ai/cordis'
import type { WorkspaceView } from '@deepseek-ai/dsh-api-workspace-controller/client'
import type { SessionId } from '@deepseek-ai/dsh-session/types'
import type { AgentTeamsTranslate } from './locales.ts'
import { WorkflowLocale, useWorkflowText } from './workflow-i18n.tsx'
import { workflowMessage } from './workflow-text.ts'
import { WorkflowWorkbench } from './WorkflowWorkbench.tsx'
import { TemplateGallery } from './TemplateGallery.tsx'
import { BrandIcon } from './BrandIcon.tsx'
import { selectedWorkflowWorkspace, workflowLauncherRequest, WorkflowLaunchController, type WorkflowApplication } from './workflow-launcher.ts'
import css from './WorkflowLauncher.module.css'
import type {} from '@deepseek-ai/dsh-client-ui-workspace/client'

type LauncherServices = Pick<Context,'sessions'|'workspaces'|'uiWorkspace'|'modelDirectories'>
export interface WorkflowLauncherProps extends LauncherServices { t: AgentTeamsTranslate; openMember:(parentId:SessionId,childId:SessionId)=>Promise<void> }
function Launcher({sessions,workspaces,uiWorkspace,modelDirectories,t,openMember}: WorkflowLauncherProps) {
  const l=useWorkflowText()
  const workspaceSource=useMemo(()=>({subscribe:(listener:()=>void)=>workspaces.list.subscribe(listener),getSnapshot:()=>workspaces.list.getSnapshot()}),[workspaces])
  const sessionSource=useMemo(()=>({subscribe:(listener:()=>void)=>sessions.list.subscribe(listener),getSnapshot:()=>sessions.list.getSnapshot()}),[sessions])
  const workspaceState=useSyncExternalStore(workspaceSource.subscribe,workspaceSource.getSnapshot)
  const sessionState=useSyncExternalStore(sessionSource.subscribe,sessionSource.getSnapshot)
  const currentWorkspace=selectedWorkflowWorkspace(workspaceState.items,sessionState)
  const [pending,setPending]=useState<WorkflowApplication>()
  const [created,setCreated]=useState<{sessionId:SessionId;teamId:string}>()
  const [busy,setBusy]=useState(false), [error,setError]=useState('')
  const [directoryMode,setDirectoryMode]=useState<'native'|'browse'|'unavailable'>('unavailable')
  const [adding,setAdding]=useState(false), [path,setPath]=useState('')
  const controller=useRef<WorkflowLaunchController>(), lifetime=useRef<AbortController>()
  const busyRef=useRef(false), choiceHeading=useRef<HTMLHeadingElement>(null)
  useEffect(()=>{
    const abort=new AbortController(), instance=new WorkflowLaunchController(sessions)
    lifetime.current=abort;controller.current=instance
    void workflowLauncherRequest('launcher_context').then(result=>{if(!abort.signal.aborted)setDirectoryMode(result.directoryPicker ?? 'unavailable')}).catch(()=>{})
    return()=>{abort.abort();instance.dispose()}
  },[sessions])
  useEffect(()=>{if(pending)choiceHeading.current?.focus()},[pending])
  async function run(action:()=>Promise<void>) {
    if(busyRef.current)return
    busyRef.current=true;setBusy(true);setError('')
    try{await action()}catch(error){if(!lifetime.current?.signal.aborted)setError(error instanceof Error?error.message:String(error))}
    finally{busyRef.current=false;if(!lifetime.current?.signal.aborted)setBusy(false)}
  }
  async function launch(input:WorkflowApplication,workspace:WorkspaceView) {
    const result=await controller.current!.launch(input,workspace,lifetime.current!.signal)
    setCreated({sessionId:result.sessionId,teamId:result.team.id});setPending(undefined)
  }
  async function adoptDirectory(directory:string) {
    lifetime.current!.signal.throwIfAborted()
    const workspace=await workspaces.create({path:directory})
    lifetime.current!.signal.throwIfAborted()
    if(pending)await launch(pending,workspace)
  }
  async function addWorkspace() {
    if(directoryMode==='native') {
      const chosen=await uiWorkspace.pickDirectory()
      if(chosen)await adoptDirectory(chosen)
    } else setAdding(true)
  }
  return <main className={css.launcher} aria-label="Workflow">
    <header className={css.header}><BrandIcon size={26}/><div><h1>Workflow</h1><p>{l("先选择模板、填写需求，再选择工作区。")}</p></div>{currentWorkspace&&<span>{l("当前工作区 · {0}",currentWorkspace.title)}</span>}</header>
    {error&&<p className={css.error} role="alert">{workflowMessage(error,l)}</p>}
    <div hidden={!!pending||!!created} className={css.gallery}><TemplateGallery onApply={async(template,name,goal)=>{
      const input={template,name,goal,language:l.language}
      setPending(input)
      if(currentWorkspace)await run(()=>launch(input,currentWorkspace))
    }}/></div>
    {pending&&!created&&<section className={css.choose} aria-label={l("选择流程工作区")}>
      <button type="button" disabled={busy} onClick={()=>{setPending(undefined);setError('')}}>{l("返回修改需求")}</button>
      <h2 ref={choiceHeading} tabIndex={-1}>{l("选择工作区")}</h2>
      <p>{l("模板和需求已保留。选择工作区后，将在其中的新对话中创建流程。")}</p>
      <div className={css.summary}><strong>{pending.name}</strong><p>{pending.goal}</p></div>
      {!!workspaceState.items.length&&<div className={css.projects}><h3>{l("已有工作区")}</h3>{workspaceState.items.map(workspace=><button type="button" key={workspace.workspaceId} disabled={busy} onClick={()=>void run(()=>launch(pending,workspace))}><strong>{workspace.title}</strong><small>{workspace.path}</small></button>)}</div>}
      {workspaceState.state==='loading'&&<p role="status">{l("正在读取工作区…")}</p>}
      {workspaceState.state==='error'&&<p role="alert">{l("工作区列表读取失败，仍可添加工作区。")}</p>}
      <button className={css.primary} type="button" disabled={busy} onClick={()=>void run(addWorkspace)}>{busy?l("正在准备工作区与流程…"):l("添加工作区")}</button>
      <p className={css.hint}>{directoryMode==='native'?l("可选择已有文件夹；需要新目录时，可在文件夹选择器中新建。"):l("输入工作区所在机器上的完整文件夹路径")}</p>
      {adding&&<form onSubmit={event=>{event.preventDefault();void run(()=>adoptDirectory(path.trim()))}}>
        <label>{l("工作区文件夹")}<input required value={path} disabled={busy} onChange={event=>setPath(event.target.value)} placeholder={l("输入工作区所在机器上的完整文件夹路径")}/></label>
        <button disabled={busy||!path.trim()}>{l("添加并继续")}</button>
      </form>}
    </section>}
    {created&&<WorkflowWorkbench key={created.sessionId} sessionId={created.sessionId} teamId={created.teamId} initiallyOpen entryDiscussion="adapt" t={t} modelDirectory={modelDirectories.directoryFor(created.sessionId)} openExecution={(target,parent)=>openMember((parent??created.sessionId) as SessionId,target as SessionId)} onClose={()=>{setCreated(undefined);controller.current?.release()}}/>}
  </main>
}
export function WorkflowLauncher(props: WorkflowLauncherProps) {return <WorkflowLocale t={props.t}><Launcher {...props}/></WorkflowLocale>}
