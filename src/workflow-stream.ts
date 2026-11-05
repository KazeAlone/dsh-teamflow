import type { AssistantStreamFrame } from '@deepseek-ai/dsh-agent'

/** Transient public reply text only. Durable session events replace it on settlement. */
export class DiscussionStreams {
  private entries = new Map<string, { attempt: string; revision: number; index: number; blocks: Map<number, {text:string; closed:boolean}> }>()
  accept(agent: {id:string}, frame: AssistantStreamFrame): void {
    if (frame.type === 'start') {
      this.entries.set(agent.id, {attempt:frame.attemptId,revision:frame.revision,index:-1,blocks:new Map()})
      return
    }
    const entry = this.entries.get(agent.id)
    if (!entry || entry.attempt !== frame.attemptId || frame.revision <= entry.revision) return
    entry.revision = frame.revision
    if (frame.type === 'end') { this.entries.delete(agent.id); return }
    if (frame.index <= entry.index) return
    entry.index = frame.index
    const chunk = frame.chunk
    if (chunk.type === 'text-delta') {
      const block = entry.blocks.get(chunk.index) ?? {text:'',closed:false}
      if (!block.closed) block.text += chunk.text
      entry.blocks.set(chunk.index,block)
    } else if (chunk.type === 'block-end' && chunk.block.type === 'text' && !entry.blocks.get(chunk.index)?.closed) {
      entry.blocks.set(chunk.index,{text:chunk.block.text,closed:true})
    }
  }
  clear(agent: {id:string}): void { this.entries.delete(agent.id) }
  read(agent: {id:string}): {id:string;role:'assistant';text:string;streaming:true} | undefined {
    const entry=this.entries.get(agent.id)
    if (!entry) return
    const text=[...entry.blocks.values()].map(block=>block.text).join('\n')
    return text ? {id:`stream:${entry.attempt}`,role:'assistant',text,streaming:true} : undefined
  }
}
