/** Bounded tab-local view memory. Cached data never authorizes a mutation. */
export function createWorkflowCache<T>(limit = 4, maxBytes = 8 * 1024 * 1024, ttlMs = 300_000) {
  const entries = new Map<string, { value: T; bytes: number; at: number }>()
  let bytes = 0
  const remove = (key: string) => { const old=entries.get(key);if(old)bytes-=old.bytes;entries.delete(key) }
  return {
    get(key: string): T | undefined {
      const entry=entries.get(key)
      if(!entry)return
      if(Date.now()-entry.at>ttlMs){remove(key);return}
      entries.delete(key);entries.set(key,entry);return entry.value
    },
    set(key: string,value: T) {
      const size=JSON.stringify(value).length*2;remove(key)
      if(size>maxBytes)return
      entries.set(key,{value,bytes:size,at:Date.now()});bytes+=size
      while(entries.size>limit||bytes>maxBytes)remove(entries.keys().next().value!)
    },
    remove,
  }
}
export const workflowCacheKey=(session:string,team:string,archived:boolean)=>JSON.stringify([session,team,archived])
