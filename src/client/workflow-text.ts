import { workflowEnglish } from './workflow-messages.ts'
import { zh, en, type AgentTeamsTranslate } from './locales.ts'
const legacyMessages = Object.fromEntries(Object.entries(zh).map(([key, value]) => [value, en[key as keyof typeof en]]))
export type WorkflowText = ((source: string, ...values: unknown[]) => string) & { language: 'zh' | 'en' }
const format = (text: string, values: unknown[]) => text.replace(/\{(\d+)\}/g, (token, index: string) => Number(index) < values.length ? String(values[Number(index)]) : token)
export const sourceText: WorkflowText = Object.assign((source: string, ...values: unknown[]) => format(source, values), {language:'zh' as const})
export function workflowText(t?: AgentTeamsTranslate): WorkflowText {
  return t?.('language.code') === 'en' ? Object.assign((source: string, ...values: unknown[]) => format(workflowEnglish[source] ?? legacyMessages[source] ?? source, values), {language:'en' as const}) : sourceText
}

/** Localize plugin-owned feedback at render time, including feedback saved before a locale switch. */
export function workflowMessage(text: string, l: WorkflowText): string {
  for (const [source, english] of Object.entries(workflowEnglish)) {
    if (text === source || text === english) return l(source)
    if (!source.includes('{0}')) continue
    for (const pattern of [source, english]) {
      const parts = pattern.split(/(\{\d+\})/g), order: number[] = []
      const expression = parts.map(part => {
        if (/^\{\d+\}$/.test(part)) { order.push(Number(part.slice(1,-1))); return '(.*?)' }
        return part.replace(/[.*+?^$()|[\]\\]/g,'\\$&')
      }).join('')
      const match = new RegExp('^'+expression+'$', 's').exec(text)
      if (match) { const values: string[]=[]; order.forEach((index,i)=>{values[index]=match[i+1]!}); return l(source,...values) }
    }
  }
  return text
}
export function briefDisplay(value: import('../template-brief.ts').TaskBrief, l: WorkflowText): string {
  return [value.requirements, value.deliverables && l('交付物：')+'\n'+value.deliverables, value.acceptance && l('验收要求：')+'\n'+value.acceptance].filter(Boolean).join('\n\n')
}
