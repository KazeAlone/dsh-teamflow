import { galleryAccessKeys } from "../gallery-access.ts"
import { createWorkflowCache } from './workflow-cache.ts'
import { workflowRequest } from './workflow-request.ts'
import { briefDisplay } from './workflow-text.ts'
import { workflowMessage } from './workflow-text.ts'
import { localizeBuiltinTemplate, builtinText } from '../builtin-template-locales.ts'
import { useWorkflowText } from './workflow-i18n.tsx'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { isBuiltinTemplate } from '../templates.ts'
import type { TeamState } from '../types.ts'
import type { TemplateDefinition, TemplateVersion } from '../templates.ts'
import { type TaskBrief } from '../template-brief.ts'
import { arrangeTasks } from './workflow-layout.ts'
import { BrandIcon } from './BrandIcon.tsx'
import { EmbeddedDiscussion } from './EmbeddedDiscussion.tsx'
import css from './TemplateGallery.module.css'

type Catalog = {templates:TemplateVersion[];warnings:string[];context?:string}
const catalogCache=createWorkflowCache<Catalog>(4,2*1024*1024)
async function api(sessionId:string | undefined,action:string,fields:Record<string,unknown>={},signal?:AbortSignal){
  return workflowRequest<any>({sessionId,action,...fields},fetch,undefined,signal)
}
function MiniFlow({template,large=false}:{template:TemplateDefinition;large?:boolean}){
  const l = useWorkflowText()

  const layout=arrangeTasks(template.tasks), points=template.tasks.map(t=>({task:t,p:{x:(layout[t.id]?.x??0)*.55,y:(layout[t.id]?.y??0)*.55}}))
  const width=Math.max(320,...points.map(({p})=>p.x+110)),height=Math.max(100,...points.map(({p})=>p.y+80))
  return <svg className={large?css.flowLarge:css.flow} viewBox={`-15 -15 ${width+30} ${height+30}`} role="img" aria-label={l("流程预览，{0} 个节点", template.tasks.length)}>
    {points.flatMap(({task,p})=>task.dependencies.map(id=>{const start=points.find(item=>item.task.id===id)?.p;return start?<path key={`${id}:${task.id}`} d={`M${start.x+100},${start.y+30} C${start.x+160},${start.y+30} ${p.x-50},${p.y+30} ${p.x},${p.y+30}`} fill="none" stroke="currentColor" strokeWidth="3" opacity=".3"/>:null}))}
    {points.map(({task,p})=><g key={task.id}><title>{task.subject}</title><rect x={p.x} y={p.y} width="100" height="60" rx="14" fill={task.checkpoint?'#f6c66c':'currentColor'} opacity={task.checkpoint?0.6:0.15}/><circle cx={p.x+17} cy={p.y+30} r="5" fill="currentColor"/><text x={p.x+30} y={p.y+34} fontSize={l.language==='en'?10:12} fill="currentColor">{task.subject.slice(0,l.language==='en'?12:5)}{task.subject.length>(l.language==='en'?12:5)?'…':''}</text></g>)}
  </svg>
}
export function TemplateGallery({sessionId,team,archived=false,mode='browse',onApply,onBack}:{sessionId?:string;team?:TeamState;archived?:boolean;mode?:'browse'|'save';onApply:(template:TemplateVersion,name:string,goal:string)=>Promise<void>;onBack?:()=>void}){
  const l = useWorkflowText()

  const [templates,setTemplates]=useState<TemplateVersion[]>(()=>catalogCache.get(sessionId??'')?.templates??[]),[warnings,setWarnings]=useState<string[]>([])
  const [search,setSearch]=useState(''),[tag,setTag]=useState(''),[selection,setSelected]=useState<TemplateVersion>()
  const [draft,setDraft]=useState<TemplateDefinition>(),[previous,setPrevious]=useState<{id:string;version:number}>()
  const [busy,setBusy]=useState(true),[error,setError]=useState(''),[notice,setNotice]=useState(''),[goal,setGoal]=useState(''),[name,setName]=useState<string>()
  const [extracting,setExtracting]=useState(false),[aiDraft,setAiDraft]=useState<TemplateDefinition>(),[deleteId,setDeleteId]=useState('')
  const selected=selection?localizeBuiltinTemplate(selection,l.language):undefined
  const catalog=templates.map(item=>localizeBuiltinTemplate(item,l.language))
  const goalInput = useRef<HTMLTextAreaElement>(null)
  const detailHeading = useRef<HTMLHeadingElement>(null)
  const focusGoal = useRef(false)
  const gallery = useRef<HTMLElement>(null)
  const cardTrigger = useRef('')
  useLayoutEffect(() => {
    if (selection) (focusGoal.current ? goalInput.current : detailHeading.current)?.focus()
    else if (!draft && cardTrigger.current) gallery.current?.querySelector<HTMLButtonElement>(`[data-template-choice="${CSS.escape(cardTrigger.current)}"]`)?.focus()
  }, [selection, draft])
  const alive=useRef(true)
  useEffect(()=>{alive.current=true;return()=>{alive.current=false}},[])
  async function refresh(signal?:AbortSignal){const result=await api(sessionId,'template_list',{},signal);if(alive.current&&!signal?.aborted){catalogCache.set(sessionId??'',result);setTemplates(result.templates);setWarnings(result.warnings);setGoal(current=>current||result.context||'')}}
  async function run(action:()=>Promise<void>){setBusy(true);setError('');setNotice('');try{await action()}catch(e){if(alive.current)setError(e instanceof Error?e.message:String(e))}finally{if(alive.current)setBusy(false)}}
  useEffect(()=>{
    const controller=new AbortController()
    setBusy(true);setError('')
    void (async()=>{
      try {
        await refresh(controller.signal)
        if(mode==='save'&&team&&!controller.signal.aborted){const result=await api(sessionId,'template_seed',{teamId:team.id},controller.signal);if(!controller.signal.aborted)setDraft(result.definition)}
      } catch(e){if(!controller.signal.aborted)setError(e instanceof Error?e.message:String(e))}
      finally {if(!controller.signal.aborted)setBusy(false)}
    })()
    return()=>controller.abort()
  },[sessionId,mode,team?.id])
  useEffect(()=>{
    if(!extracting||!team)return
    let live=true, inFlight=false
    const controller=new AbortController()
    const poll=()=>{if(inFlight||document.hidden)return;inFlight=true;void api(sessionId,'state',{teamId:team.id},controller.signal).then(result=>{const candidate=result.team?.workflow?.discussions?.['discussion:template']?.templateDraft;if(live&&candidate){if(candidate.base===result.base)setAiDraft(candidate.definition);else setError(l("源流程已变化，请重新讨论后生成模板草稿。"))}}).catch(e=>{if(live)setError(e instanceof Error ? e.message : String(e))}).finally(()=>{inFlight=false})}
    poll();const timer=setInterval(poll,2500);return()=>{live=false;controller.abort();clearInterval(timer)}
  },[extracting,team?.id,sessionId])
  function choose(item: TemplateVersion, apply = false) {
    cardTrigger.current = (apply ? 'use:' : 'view:') + item.id
    focusGoal.current = apply && !team
    setSelected(item)
    setName(undefined)
    setDeleteId('')
    setError('')
  }
  const tags=[...new Set(catalog.flatMap(t=>t.tags))]
  const activeTag=tags.includes(tag)?tag:builtinText(tag,l.language)
  const filtered=catalog.filter(t=>(!activeTag||t.tags.includes(activeTag))&&`${t.name} ${t.description} ${t.tags.join(' ')}`.toLowerCase().includes(search.toLowerCase()))
  function briefEditor(value:TaskBrief,change:(v:TaskBrief)=>void){return <><label>{l("通用任务要求")}<textarea value={value.requirements} maxLength={16000} onChange={e=>change({...value,requirements:e.target.value})}/></label><details><summary>{l("交付物与验收要求")}</summary><label>{l("通用交付物")}<textarea value={value.deliverables} maxLength={16000} onChange={e=>change({...value,deliverables:e.target.value})}/></label><label>{l("通用验收要求")}<textarea value={value.acceptance} maxLength={16000} onChange={e=>change({...value,acceptance:e.target.value})}/></label></details></>}
  return <section ref={gallery} className={css.gallery} aria-label={l("流程模板库")}>
    {(!selected || draft) && <header className={css.hero}><div className={css.heroIcon}><BrandIcon name="gallery" size={38}/></div><div><small>MY TEAMFLOW GALLERY</small><h2>{draft?l("编辑流程模板"):l("流程模板库")}</h2><p>{l("留下有效的方法，让下一次协作从这里开始。")}</p></div>{onBack && <button onClick={onBack} disabled={busy}>{l("返回当前流程")}</button>}</header>}
    {error&&<p className={css.warning} role="alert">{workflowMessage(error, l)}</p>}{notice&&<p role="status">{workflowMessage(notice, l)}</p>}{warnings.map(w=><p key={w} role="alert">{workflowMessage(w,l)}</p>)}
    {draft?<div className={css.editorGrid}><div className={css.definition}>
      <div className={css.actions}><button onClick={()=>{setDraft(undefined);setExtracting(false);setPrevious(undefined)}} disabled={busy}>{l("返回模板库")}</button>{mode==='save'&&team&&!archived&&<button disabled={busy} onClick={()=>void run(async()=>{await api(sessionId,'open_discussion',{teamId:team.id,discussion:'template'});setExtracting(true)})}>{l("AI 提炼通用流程")}</button>}{aiDraft&&<button onClick={()=>{setDraft(structuredClone(aiDraft));setNotice(l("已载入 AI 草稿，请检查通用要求和成员指令。"))}}>{l("载入 AI 草稿")}</button>}</div>
      <p className={css.muted}>{l("保存成员、通用任务、连线和人工检查点。具体任务、结果、审批、模型路由和旧会话不进入模板。")}</p>
      <label>{l("模板名称")}<input value={draft.name} maxLength={120} onChange={e=>setDraft({...draft,name:e.target.value})}/></label>
      <label>{l("适用说明")}<textarea value={draft.description} maxLength={2000} onChange={e=>setDraft({...draft,description:e.target.value})}/></label>
      <label>{l("标签（逗号分隔）")}<input key={draft.tags.join('，')} defaultValue={draft.tags.join('，')} onBlur={e=>setDraft({...draft,tags:e.target.value.split(/[,，]/).map(s=>s.trim()).filter(Boolean)})}/></label>
      <label>{l("应用前需要提供的信息")}<textarea value={draft.inputs} maxLength={4000} onChange={e=>setDraft({...draft,inputs:e.target.value})}/></label>
      <MiniFlow template={draft} large/>
      <h3>{l("成员通用职责")}</h3>{draft.members.map((m,i)=><details key={m.name}><summary>{m.name} · {m.summary}</summary>{(['summary','role','executionPrompt'] as const).map(key=><label key={key}>{key==='summary'?l("职责概述"):key==='role'?l("长期职责"):l("通用执行指令 / PE")}<textarea value={m[key]} maxLength={16000} onChange={e=>setDraft({...draft,members:draft.members.map((member,index)=>index===i?{...member,[key]:e.target.value}:member)})}/></label>)}{galleryAccessKeys.map(key => <label className={css.galleryPermission} key={key}><input type="checkbox" checked={m[key] !== false} disabled={busy} onChange={e=>setDraft({...draft,members:draft.members.map((member,index)=>index===i?{...member,[key]:e.target.checked}:member)})}/>{key === 'gallerySkill' ? l("允许使用 Gallery Skill") : l("允许使用 Gallery MCP")}</label>)}</details>)}
      <h3>{l("节点通用任务")}</h3>{draft.tasks.map((t,i)=><details key={t.id} open={!t.general.requirements}><summary>{t.checkpoint?l("人工检查"):l("任务")} · {t.subject}</summary><label>{l("通用节点名称")}<input value={t.subject} maxLength={200} onChange={e=>setDraft({...draft,tasks:draft.tasks.map((task,index)=>index===i?{...task,subject:e.target.value}:task)})}/></label>
        {briefEditor(t.general,general=>setDraft({...draft,tasks:draft.tasks.map((task,index)=>index===i?{...task,general}:task)}))}
        {mode==='save'&&team?.tasks.find(task=>task.id===t.id)?.description&&<details><summary>{l("原任务（仅用于对照）")}</summary><p>{team.tasks.find(task=>task.id===t.id)?.description}</p></details>}
      </details>)}
      <div className={css.actions}>{mode==='save'&&team?.workflow?.templateSource&&!isBuiltinTemplate(team.workflow.templateSource.id)&&!previous&&<button disabled={busy} onClick={()=>setPrevious({id:team.workflow!.templateSource!.id,version:team.workflow!.templateSource!.version})}>{l("作为来源模板的新版本")}</button>}<button className={css.primary} disabled={busy||!draft.name.trim()||draft.tasks.some(t=>!t.general.requirements.trim())} onClick={()=>void run(async()=>{const saved=await api(sessionId,'template_save',{definition:draft,...previous?{templateId:previous.id,version:previous.version}:{}});setDraft(undefined);setExtracting(false);setPrevious(undefined);await refresh();setNotice(l("已保存「{0}」v{1}", saved.template.name, saved.template.version))})}><BrandIcon name="save"/>{busy?l("处理中…"):previous?l("保存为 v{0}", previous.version+1):l("保存新模板")}</button></div>
    </div>{extracting&&team&&sessionId?<div className={css.chat}><h3>{l("提炼通用流程")}</h3><p>{l("AI 只提出草稿，源流程保持不变。")}</p><EmbeddedDiscussion sessionId={sessionId} teamId={team.id} discussion="template"/></div>:<aside className={css.guide}><BrandIcon name="save" size={44}/><h3>{l("保存做事的方法")}</h3><p>{l("通用要求保留方法、交付约定和质量标准。项目名称、路径、数值等具体要求留给下次适配。")}</p><p>{l("可先让 AI 提炼，再检查和修改。原流程的执行记录不会被改动。")}</p></aside>}</div>
    :selected?<div className={css.detail}><button onClick={()=>setSelected(undefined)}>{l("← 所有模板")}</button><div className={css.detailHeading}><div><h2 tabIndex={-1} ref={detailHeading}>{selected.name}</h2><p>{selected.description||l("个人流程模板")}</p><small>{isBuiltinTemplate(selected.id)?l("内置"):l("个人")} · v{selected.version} · {selected.members.length} {l(" 个角色 · ")}{selected.tasks.length} {l(" 个节点")}</small></div><BrandIcon name="gallery" size={42}/></div>
      <div className={css.applyGrid}>
      {team ? <p className={css.warning}>{l("当前对话已有流程。请在新的对话打开 Teamflow 后应用；不会覆盖当前流程。")}</p> : <form className={css.apply} onSubmit={e=>{e.preventDefault();void run(()=>onApply(selected,name??selected.name,goal))}}><h3>{l("应用到本次任务")}</h3><p>{selected.inputs||l("描述本次目标、工作范围和特殊要求。")}</p><label>{l("流程名称")}<input required maxLength={120} value={name??selected.name} onChange={e=>setName(e.target.value)}/></label><label>{l("本次需求")}<textarea ref={goalInput} required maxLength={12000} value={goal} onChange={e=>setGoal(e.target.value)} placeholder={l("例如：实现算子 B，遵循当前项目接口，并验证正确性…")}/></label><small>{l("已有对话需求会带入适配。保留全部节点和连线，由 Captain 统一生成本次任务；确认后才执行。")}</small><button className={css.primary} disabled={busy||!!team||!goal.trim()}>{l("使用模板并讨论本次任务")}</button></form>}
      <div><MiniFlow template={selected} large/><h3>{l("流程与通用要求")}</h3>{selected.tasks.map(t=><details key={t.id}><summary>{t.checkpoint?l("人工检查"):l("任务")} · {t.subject}</summary><p>{briefDisplay(t.general,l)}</p><small>{l("负责人：")}{t.assignee||l("人工／自动分配")} {l(" · 上游：")}{t.dependencies.map(id=>selected.tasks.find(n=>n.id===id)?.subject).join('、')||l("无")}</small></details>)}<h3>{l("角色分工")}</h3>{selected.members.map(m=><details key={m.name}><summary>{m.name} · {m.summary}</summary><p>{m.role}</p><p>{m.executionPrompt}</p></details>)}</div>
      </div>
      <div className={css.actions}><button onClick={()=>{setDraft(structuredClone(selected));setPrevious(isBuiltinTemplate(selected.id)?undefined:{id:selected.id,version:selected.version});setSelected(undefined)}}>{isBuiltinTemplate(selected.id)?l("编辑并另存为个人模板"):l("编辑模板")}</button><button onClick={()=>{setDraft({...structuredClone(selected),name:l("{0} · 副本", selected.name)});setPrevious(undefined);setSelected(undefined)}}>{l("复制模板")}</button>{isBuiltinTemplate(selected.id)?<small>{l("内置模板只读，修改后保存为个人模板。")}</small>:deleteId===selected.id?<><span>{l("删除后已创建的流程不受影响。")}</span><button disabled={busy} onClick={()=>void run(async()=>{await api(sessionId,'template_delete',{templateId:selected.id,version:selected.version});setSelected(undefined);await refresh()})}>{l("确认删除")}</button><button onClick={()=>setDeleteId('')}>{l("取消")}</button></>:<button onClick={()=>setDeleteId(selected.id)}>{l("删除模板")}</button>}</div>
    </div>:<><div className={css.filters}><input aria-label={l("搜索模板")} placeholder={l("搜索模板名称、用途或标签")} value={search} onChange={e=>setSearch(e.target.value)}/><select aria-label={l("标签筛选")} value={activeTag} onChange={e=>setTag(e.target.value)}><option value="">{l("所有标签")}</option>{tags.map(t=><option key={t}>{t}</option>)}</select><span>{filtered.length} {l(" 个模板")}</span></div>
      {busy&&!templates.length?<p role="status">{l("正在读取模板库…")}</p>:!filtered.length?<div className={css.empty}><BrandIcon name="gallery" size={56}/><h3>{templates.length?l("没有匹配的模板"):l("把有效的协作流程留在这里")}</h3><p>{templates.length?l("试试其他关键词或标签。"):l("在流程画布点击「保存为模板」，提炼一次，以后直接套用。")}</p>{templates.length ? <button onClick={()=>{setSearch('');setTag('')}}>{l("清除筛选")}</button> : onBack ? <button onClick={onBack}>{l("返回流程")}</button> : null}</div>:<div className={css.cards}>{filtered.map(item=><article className={css.card} key={item.id}><button className={css.cardPreview} data-template-choice={'view:' + item.id} onClick={()=>choose(item)} aria-label={l("查看 {0}", item.name)}><MiniFlow template={item}/><h3>{item.name}</h3><p>{item.description||l("个人流程模板")}</p></button><div className={css.tags}>{item.tags.map(t=><span key={t}>{t}</span>)}</div><small>{item.members.length} {l(" 个角色 · ")}{item.tasks.length} {l(" 个节点 · ")}{item.tasks.filter(t=>t.checkpoint).length} {l(" 个人工检查点")}</small><footer><small>{isBuiltinTemplate(item.id)?l("内置"):l("个人")} · v{item.version} · {new Date(item.updatedAt).toLocaleDateString(l.language==='en'?'en-US':'zh-CN')}</small><button className={css.primary} data-template-choice={'use:' + item.id} onClick={()=>choose(item,true)}>{team ? l("查看模板") : l("使用模板")}</button></footer></article>)}</div>}</>}
  </section>
}
