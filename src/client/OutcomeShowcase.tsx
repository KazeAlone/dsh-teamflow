import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { TeamState } from '../types.ts'
import { outcomeCsv, outcomeFiles, type OutcomePreview } from '../outcomes.ts'
import { useWorkflowText } from './workflow-i18n.tsx'
import { workflowMessage } from './workflow-text.ts'
import { taskReadiness } from './task-readiness.ts'
import css from './OutcomeShowcase.module.css'

/** Small safe Markdown subset. React escapes all text; no HTML, embeds, or external resources. */
export function OutcomeMarkdown({ text }: { text: string }) {
  const blocks: ReactNode[] = []; let code: string[] | undefined, paragraph: string[] = []
  const flush = () => { if (paragraph.length) { blocks.push(<p key={blocks.length}>{paragraph.join('\n')}</p>); paragraph = [] } }
  for (const line of text.split(/\r?\n/)) {
    if (/^\s*```/.test(line)) { flush(); if (code) { blocks.push(<pre key={blocks.length}><code>{code.join('\n')}</code></pre>); code = undefined } else code = []; continue }
    if (code) { code.push(line); continue }
    const heading = /^(#{1,6})\s+(.+)$/.exec(line)
    if (heading) { flush(); blocks.push(<h3 key={blocks.length}>{heading[2]}</h3>) }
    else if (/^\s*[-*]\s+/.test(line)) { flush(); blocks.push(<p className={css.bullet} key={blocks.length}>• {line.replace(/^\s*[-*]\s+/, '')}</p>) }
    else if (!line.trim()) flush(); else paragraph.push(line)
  }
  flush(); if (code) blocks.push(<pre key={blocks.length}><code>{code.join('\n')}</code></pre>)
  return <div className={css.markdown}>{blocks}</div>
}

export function OutcomeShowcase({ team, sessionId, archived, onTask }: { team: TeamState; sessionId: string; archived: boolean; onTask: (id: string, review?: boolean) => void }) {
  const l = useWorkflowText()
  const tasks = team.tasks.filter(t => !t.checkpoint)
  const [taskId, setTaskId] = useState(tasks.find(t => t.output || outcomeFiles(t).length)?.id ?? tasks[0]?.id ?? '')
  const task = tasks.find(t => t.id === taskId) ?? tasks[0]
  const [file, setFile] = useState<string>()
  const [refresh, setRefresh] = useState(0)
  const [result, setResult] = useState<{ key: string; preview?: OutcomePreview; error?: string }>()
  const [raw, setRaw] = useState(false)
  const files = task ? outcomeFiles(task) : []
  const validFile = file !== undefined && files.some(f => f.path === file) ? file : undefined
  const key = JSON.stringify([sessionId, team.id, task?.id, validFile, archived, refresh])
  useEffect(() => {
    if (!task || validFile === undefined) return
    const controller = new AbortController()
    void (async () => {
      try {
        const response = await fetch('/plugins/dsh-agent-teams/workflow', { method:'POST', headers:{'content-type':'application/json'}, signal:controller.signal,
          body:JSON.stringify({action:'outcome_preview',sessionId,teamId:team.id,taskId:task.id,path:validFile,archived}) })
        const body = await response.json() as { preview?: OutcomePreview; error?: string }
        if (!response.ok || !body.preview) throw new Error(body.error ?? `HTTP ${response.status}`)
        if (!controller.signal.aborted) setResult({key,preview:body.preview})
      } catch (err) { if (!controller.signal.aborted) setResult({key,error:err instanceof Error ? err.message : String(err)}) }
    })()
    return () => controller.abort()
  }, [key, sessionId])
  const preview = result?.key === key ? result.preview : undefined
  const error = result?.key === key ? result.error : undefined
  const csv = useMemo(() => preview?.kind === 'csv' ? outcomeCsv(preview.text ?? '') : undefined, [preview])
  const gates = team.tasks.filter(g => g.checkpoint && g.dependencies.includes(task?.id ?? ''))
  const statusText = (status: OutcomePreview['status']) => l(({ready:'文件可预览',missing:'文件不存在或已被移除',blocked:'此路径不支持预览：仅允许工作区内明确声明的普通文件。',unsupported:'此文件类型或编码暂不支持预览。',too_large:'文件超过预览上限：文本 256 KiB，图片 4 MiB。',unreadable:'文件无法读取或读取期间已变化，请刷新重试。'} as const)[status])
  function selectTask(id: string) { setTaskId(id); setFile(undefined); setRaw(false) }
  return <section className={css.showcase} aria-label={l('交付内容')}>
    <header className={css.header}><div><h2>{l('交付内容')}</h2><p>{l('根据任务记录整理，不调用模型。')}</p></div><span>{l('{0} 个任务有提交说明 · {1} 个文件条目', tasks.filter(t => !!t.output).length, tasks.reduce((n,t) => n + outcomeFiles(t).length, 0))}</span></header>
    {!tasks.length ? <p className={css.empty}>{l('暂无执行任务成果。任务提交后会在这里显示。')}</p> : <div className={css.layout}>
      <nav className={css.tasks} aria-label={l('成果来源任务')}>{tasks.map(t => <button key={t.id} aria-pressed={task?.id === t.id} onClick={() => selectTask(t.id)}><strong>{t.subject}</strong><small>{taskReadiness(team,t,l).label} · {t.assignee || l('未分配')}</small><span>{t.output ? l('已提交说明') : l('暂无提交说明')} · {l('{0} 个文件条目', outcomeFiles(t).length)}</span></button>)}</nav>
      {task && <article className={css.detail}>
        <header className={css.taskHeader}><div><h3>{task.subject}</h3><p>{l('来源任务')} · {task.id} · {task.assignee || l('未分配')} · {l('第 {0} 次执行', task.attempt ?? 0)}</p></div><button onClick={() => onTask(task.id)}>{l('查看原任务')}</button></header>
        {(task.workflowRerunRequired || (task.workflowRerunContext && task.status !== 'completed') || task.status === 'in_progress' || task.status === 'claimed') && <p className={css.notice}>{l('任务正在更新或等待重跑；当前文件不代表本轮已完成交付。')}</p>}
        <div className={css.tabs}><button aria-pressed={validFile === undefined} onClick={() => setFile(undefined)}>{l('提交说明与验证')}</button><span>{l('文件来自约定交付或报告变更，是否存在需打开核对。')}</span></div>
        {!!files.length && <div className={css.files} aria-label={l('成果文件')}>{files.slice(0,200).map(f => <button key={f.path} aria-pressed={validFile === f.path} onClick={() => { setFile(f.path); setRaw(false) }}><strong>{f.path}</strong><small>{f.declared ? l('约定交付物') : l('报告变更')}{f.declared && f.changed ? ` · ${l('报告变更')}` : ''}</small></button>)}</div>}
        {files.length > 200 && <p>{l('仅展示前 200 个文件条目，其余请查看原任务。')}</p>}
        {validFile !== undefined ? <section className={css.preview} aria-live="polite"><header><strong>{validFile}</strong><button onClick={() => setRefresh(v => v+1)}>{l('刷新文件')}</button></header><p className={css.notice}>{l('当前工作区文件，不是历史快照；审批记录不代表此文件版本已验收。')}</p>
          {error ? <p role="alert">{workflowMessage(error,l)}</p> : !preview ? <p>{l('正在读取文件…')}</p> : <>
            <p className={css.meta}>{preview.size !== undefined && `${preview.size.toLocaleString()} bytes · `}{preview.modifiedAt !== undefined && new Date(preview.modifiedAt).toLocaleString()}</p>
            {preview.status !== 'ready' ? <p>{statusText(preview.status)}</p> : <>
              {preview.kind === 'image' ? <img src={preview.dataUrl} alt={validFile} onError={e => { e.currentTarget.alt = l('图片无法解码，请在工作区查看原文件。') }} /> : <>
                {(preview.kind === 'markdown' || preview.kind === 'csv') && <button aria-pressed={raw} onClick={() => setRaw(!raw)}>{raw ? l('预览') : l('查看原文')}</button>}
                {!raw && preview.kind === 'markdown' ? <OutcomeMarkdown text={preview.text ?? ''} /> : !raw && csv ? <><div className={css.tableScroll}><table><tbody>{csv.rows.map((row,i) => <tr key={i}>{row.map((cell,j) => i === 0 ? <th key={j}>{cell}</th> : <td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>{csv.truncated && <p>{l('仅预览前 100 行、50 列。')}</p>}</> : <pre>{preview.text || l('文件为空')}</pre>}
              </>}
              <details><summary>{l('当前文件指纹')}</summary><code>{preview.sha256}</code></details>
            </>}
          </>}
        </section> : <>
          <section className={css.report}><h4>{l('任务提交说明')}</h4>{task.output ? <OutcomeMarkdown text={task.output} /> : <p>{l('尚未提交结果。约定交付物和任务完成状态不能代替实际成果。')}</p>}</section>
          <section className={css.report}><h4>{l('验证记录')}</h4><p className={css.meta}>{l('以下为 Agent 提交记录，不代表独立测试或人工验收。')}</p>{!task.commandsRun?.length && !task.acceptanceResults?.length && <p>{l('暂无验证记录')}</p>}{task.commandsRun?.map((r,i) => <div key={`c${i}`}><strong>{r.status === 'passed' ? l('报告通过') : l('报告失败')}</strong> · <code>{r.command}</code><p>{r.evidence || l('未提交证据说明')}</p></div>)}{task.acceptanceResults?.map((r,i) => <div key={`a${i}`}><strong>{r.criterion}</strong> · {r.status === 'passed' ? l('报告通过') : l('报告失败')}<p>{r.evidence || l('未提交证据说明')}</p></div>)}</section>
          {!!gates.length && <section className={css.report}><h4>{l('下游人工检查点')}</h4>{gates.map(g => <button key={g.id} onClick={() => onTask(g.id,true)}>{g.subject} · {g.checkpoint?.decision === 'approve' ? l('已通过') : g.checkpoint?.decision === 'reject' ? l('已退回') : l('等待人工决定')}</button>)}</section>}
          {!!task.stoppedAttempts?.length && <details className={css.report}><summary>{l('历史提交说明')} · {task.stoppedAttempts.length}</summary><p className={css.meta}>{l('这里只保留历史文字记录，没有保存历史文件副本。')}</p>{[...task.stoppedAttempts].reverse().map((a,i) => <section key={i}><small>{new Date(a.at).toLocaleString()}</small><pre>{a.output || l('本次停止前未提交结果')}</pre></section>)}</details>}
        </>}
      </article>}
    </div>}
  </section>
}
