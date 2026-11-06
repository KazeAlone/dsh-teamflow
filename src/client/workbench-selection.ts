/** One selected object owns the property panel; drafts survive navigation. */
import type { TeamState } from '../types.ts'
import { rerunnableTasks } from '../task-rerun.ts'

export type EditorTarget = { type: 'member' | 'task' | 'check'; id?: string }
export type WorkbenchTarget = EditorTarget | { type: 'edge'; from: string; to: string } | { type: 'discussion'; key: string }
export type EditorDraft = { values: Record<string,string>; source: string; baseline?: Record<string,string> }
export type WorkbenchView = { target: WorkbenchTarget; revision: number; drafts: Record<string,EditorDraft> }
export const initialWorkbenchView = (): WorkbenchView => ({ target: {type:'discussion',key:'graph'}, revision:0, drafts:{} })
export const editorKey = (teamId: string, target: EditorTarget): string => JSON.stringify([teamId,target.type,target.id??null])
export function editorTarget(team: TeamState | undefined, target: WorkbenchTarget, allowRerun = false): EditorTarget | undefined {
  if(target.type==='edge'||target.type==='discussion') return
  if(target.type==='member'||!target.id) return target
  const task=team?.tasks.find(item=>item.id===target.id)
  if(allowRerun && task && !task.checkpoint && ['completed','failed','cancelled'].includes(task.status)) return target
  if(task?.status==='pending' && ((task.attempt??0)===0 || task.workflowPaused) && !task.checkpoint?.decision && !task.reassigning) return target
}
export function targetDiscussion(target: WorkbenchTarget): string {
  return target.type==='discussion'?target.key:target.type==='member'&&target.id?`member:${target.id}`:target.type==='check'&&target.id?`check:${target.id}`:'graph'
}
export function draftSource(team: TeamState | undefined, target: EditorTarget): string {
  if(!target.id) return ''
  const member=team?.members.find(item=>item.name===target.id)
  const task=team?.tasks.find(item=>item.id===target.id)
  return JSON.stringify(target.type==='member'?member && [member.name,member.summary,member.role,member.executionPrompt,member.specificPrompt,member.gallerySkill,member.galleryMcp,member.provider,member.model,member.reasoningEffort,member.status==='removed']:task && [task.id,task.subject,task.description,task.adaptationIssue,task.workflowConfigPending,task.assignee,task.kind,task.status,task.attemptId,task.output])??''
}
export function initialEditorDraft(team: TeamState | undefined, target: EditorTarget): EditorDraft {
  const m=team?.members.find(item=>item.name===target.id), t=team?.tasks.find(item=>item.id===target.id)
  const values: Record<string,string> = target.type==='member'
    ? {name:m?.name??'',summary:m?.summary??m?.role??'',role:m?.role??'',executionPrompt:m?.executionPrompt??'',specificPrompt:m?.specificPrompt??'',gallerySkill:m?.gallerySkill === undefined ? (target.id ? '' : 'false') : String(m.gallerySkill),galleryMcp:m?.galleryMcp === undefined ? (target.id ? '' : 'false') : String(m.galleryMcp),provider:m?.provider??'',model:m?.model??'',reasoningEffort:m?.reasoningEffort??'',routeChanged:'',rerunTaskId:m?rerunnableTasks(team?.tasks??[],m.name).at(-1)?.id??'':'',rerunInstructions:''}
    : {subject:t?.subject??'',description:t?.description??'',adaptationIssue:t?.adaptationIssue??'',assignee:t?.assignee??'',rerunInstructions:''}
  return {source:draftSource(team,target), values, baseline:values}
}
export function selectWorkbench(view: WorkbenchView, target: WorkbenchTarget, team: TeamState | undefined, overrides?: Record<string,string>): WorkbenchView {
  const editor=editorTarget(team,target), drafts={...view.drafts}
  if(editor) {
    const key=editorKey(team?.id??'',editor), draft=drafts[key]??initialEditorDraft(team,editor)
    drafts[key]=overrides?{...draft,values:{...draft.values,...overrides}}:draft
  }
  return {target,revision:view.revision+1,drafts}
}
/** A late save may clear only the exact draft it submitted, never newer typing. */
export function finishWorkbenchSave(view: WorkbenchView, key: string | undefined, submitted: EditorDraft | undefined, revision: number, team: TeamState, nextTarget?: WorkbenchTarget, submittedTarget?: EditorTarget): WorkbenchView {
  const drafts={...view.drafts}
  const addedMember = submittedTarget?.type === 'member' && !submittedTarget.id && submitted ? team.members.find(m => m.name === submitted.values['name']?.trim()) : undefined
  const savedTarget = addedMember ? {type:'member' as const,id:addedMember.name} : submittedTarget
  const savedKey = savedTarget && addedMember ? editorKey(team.id,savedTarget) : key
  if(key && submitted && drafts[key]===submitted) delete drafts[key]
  else if(key && submitted && submittedTarget && drafts[key]?.source===submitted.source) {
    const latest=drafts[key]!, fresh=initialEditorDraft(team,savedTarget!)
    delete drafts[key]
    drafts[savedKey!]={source:fresh.source, baseline:fresh.values, values:{...fresh.values,...Object.fromEntries(Object.entries(latest.values).filter(([field,value])=>value!==submitted.values[field]))}}
    if(submittedTarget.type==='member' && ['provider','model','reasoningEffort'].some(field=>latest.values[field]!==submitted.values[field])) drafts[savedKey!]!.values['routeChanged']='yes'
  }
  const updated={...view,drafts}
  return view.revision===revision && nextTarget?selectWorkbench(updated,nextTarget,team):updated
}
