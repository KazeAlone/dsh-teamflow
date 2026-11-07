import type { Session } from '@deepseek-ai/dsh-session'
import { sessionOwnEvents } from './harness-compat.ts'

type Message = { id: string; role: string; text: string }
const history = new WeakMap<Session, {seq:number; messages:Message[]}>()

/** The host's append-only seq is the log length, not a time or token count.
 * Keep only the displayed tail; do not retain another complete transcript.
 * Legacy hosts without that contract always read fresh events.
 */
export function discussionHistory(session: Session): Message[] {
  const seq=(session as unknown as {seq?:number}).seq
  const cached=history.get(session)
  if(typeof seq==='number' && cached?.seq===seq)return cached.messages
  const events=sessionOwnEvents(session), messages:Message[]=[]
  for(let i=events.length-1;i>=0 && messages.length<100;i--) {
    const event=events[i]!
    const message=event.type==='user/message'?event.data:event.type==='assistant/message'?event.data.message:undefined
    if(!message || (event.type==='user/message' && message.source.kind!=='user'))continue
    const text=message.content.filter(block=>block.type==='text').map(block=>block.text).join('\n').trim()
    if(text)messages.push({id:String(event.seq),role:event.type==='user/message'?'user':'assistant',text})
  }
  messages.reverse()
  // Oversized messages remain readable, but are not duplicated in a cache.
  if(typeof seq==='number' && messages.reduce((size,m)=>size+m.text.length,0)<=262144)history.set(session,{seq,messages})
  else history.delete(session)
  return messages
}
