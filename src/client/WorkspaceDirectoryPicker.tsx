import { useEffect, useRef, useState } from 'react'
import { Button, Modal } from '@deepseek-ai/dsh-client-ui-primitives'
import type { UiWorkspace } from '@deepseek-ai/dsh-client-ui-workspace/client'
import { useWorkflowText } from './workflow-i18n.tsx'
import css from './WorkspaceDirectoryPicker.module.css'

type Listing = Awaited<ReturnType<UiWorkspace['listDirectory']>>
type Props = {
  workspace: Pick<UiWorkspace,'listDirectory'|'createDirectory'>
  onPick: (path:string)=>Promise<void>
  onClose: ()=>void
}

/** Uses the same host directory API and modal primitives as DSH's workspace browser. */
export function WorkspaceDirectoryPicker({workspace,onPick,onClose}:Props) {
  const l=useWorkflowText()
  const [listing,setListing]=useState<Listing>()
  const [target,setTarget]=useState<{path?:string}>({})
  const [loading,setLoading]=useState(true),[busy,setBusy]=useState(false),[error,setError]=useState('')
  const [hidden,setHidden]=useState(false),[editing,setEditing]=useState(false),[path,setPath]=useState('')
  const [creating,setCreating]=useState(false),[name,setName]=useState('')
  const alive=useRef(true),working=useRef(false)
  useEffect(()=>{alive.current=true;return()=>{alive.current=false}},[])
  useEffect(()=>{
    const abort=new AbortController()
    setLoading(true);setError('')
    void workspace.listDirectory(target.path,abort.signal).then(value=>{
      if(!abort.signal.aborted){setListing(value);setPath(value.path);setLoading(false)}
    }).catch(err=>{if(!abort.signal.aborted){setError(String(err instanceof Error?err.message:err));setLoading(false)}})
    return()=>abort.abort()
  },[workspace,target])
  function navigate(path?:string) {setEditing(false);setTarget({path})}
  async function perform(action:()=>Promise<void>) {
    if(working.current)return
    working.current=true;setBusy(true);setError('')
    try{await action()}catch(err){if(alive.current)setError(err instanceof Error?err.message:String(err))}
    finally{working.current=false;if(alive.current)setBusy(false)}
  }
  const blocked=loading||busy||creating
  return <Modal open title={l("选择工作区目录")} closeLabel={l("取消")} onClose={()=>{if(!busy)onClose()}} className={css.modal} contentClassName={css.content}
    footer={<div className={css.footer}>
      <Button variant="outline" disabled={blocked||!listing||!!error} onClick={()=>{setCreating(true);setName('')}}>{l("新建文件夹")}</Button>
      <Button aria-pressed={hidden} disabled={busy||creating} onClick={()=>setHidden(!hidden)}>{hidden?l("隐藏隐藏文件"):l("显示隐藏文件")}</Button>
      <span/>
      <Button variant="outline" disabled={busy} onClick={onClose}>{l("取消")}</Button>
      <Button variant="primary" disabled={blocked||!listing||!!error||editing} onClick={()=>void perform(()=>onPick(listing!.path))}>{busy?l("正在准备工作区与流程…"):l("打开")}</Button>
    </div>}>
    <div className={css.navigation}>
      <nav aria-label={l("目录路径")}>
        <Button size="sm" disabled={busy||creating} onClick={()=>navigate()}>{l("主目录")}</Button>
        {listing?.crumbs.map(crumb=><Button size="sm" key={crumb.path} disabled={busy||creating} title={crumb.path} onClick={()=>navigate(crumb.path)}>{crumb.name}</Button>)}
      </nav>
      <Button size="sm" disabled={busy||creating} onClick={()=>{setPath(target.path??listing?.path??'');setEditing(!editing)}}>{l("编辑路径")}</Button>
    </div>
    {editing&&<form className={css.path} onSubmit={event=>{event.preventDefault();if(path.trim())navigate(path.trim())}}>
      <input autoFocus aria-label={l("目录路径")} value={path} onChange={event=>setPath(event.target.value)}/>
      <Button type="submit" disabled={!path.trim()||busy}>{l("前往")}</Button>
    </form>}
    {error&&<div role="alert" className={css.error}>{error}<Button size="sm" disabled={busy} onClick={()=>setTarget({...target})}>{l("重试")}</Button></div>}
    {creating&&<form className={css.create} onSubmit={event=>{event.preventDefault();if(!name.trim()||!listing)return;void perform(async()=>{
      const created=await workspace.createDirectory(listing.path,name.trim())
      if(alive.current){setCreating(false);navigate(created)}
    })}}>
      <label>{l("文件夹名称")}<input autoFocus required pattern="[^\\/]+" value={name} disabled={busy} onChange={event=>setName(event.target.value)}/></label>
      <Button type="button" disabled={busy} onClick={()=>setCreating(false)}>{l("取消新建")}</Button>
      <Button type="submit" variant="primary" disabled={!name.trim()||busy}>{l("创建")}</Button>
    </form>}
    <div className={css.directories} aria-label={l("文件夹列表")} aria-busy={loading}>
      {loading?<p role="status">{l("正在读取文件夹…")}</p>:!error&&<>
        {listing?.entries.filter(entry=>hidden||!entry.hidden).map(entry=><button key={entry.path} type="button" disabled={busy||creating} onClick={()=>navigate(entry.path)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 7V5h6l2 2h10v13H3V7Z"/><path d="M3 10h18"/></svg><span>{entry.name}</span><span aria-hidden="true">›</span>
        </button>)}
        {!listing?.entries.some(entry=>hidden||!entry.hidden)&&<p>{l("此目录下没有可见的子文件夹，可直接打开当前目录。")}</p>}
        {listing?.truncated&&<p>{l("文件夹较多，仅显示部分内容；可编辑路径直接前往。")}</p>}
      </>}
    </div>
  </Modal>
}
