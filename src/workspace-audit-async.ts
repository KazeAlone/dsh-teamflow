/** Keep UI polling's byte hashing off the HTTP/session event loop. */
import { Worker } from 'node:worker_threads'
import { createHash } from 'node:crypto'
import type { TeamState } from './types.ts'
import type { DeliveryAudit } from './quality-gates.ts'
import { deliveryArtifactPaths, deliveryScopePatterns } from './quality-gates.ts'

export function createWorkspaceAuditor() {
  let worker: Worker | undefined, sequence = 0, closed = false
  const pending = new Map<number, { resolve: (audit: DeliveryAudit) => void; reject: (error: Error) => void }>()
  const shared = new Map<string, Promise<DeliveryAudit>>()
  const fail = (error: Error) => { for (const job of pending.values()) job.reject(error); pending.clear(); shared.clear() }
  const getWorker = () => {
    if (worker) return worker
    const current = new Worker(new URL('./workspace-audit-worker.js', import.meta.url))
    worker = current
    current.on('message', ({id,audit,error}: {id:number;audit:DeliveryAudit;error?:string}) => {
      const job = pending.get(id)
      if (!job) return
      pending.delete(id)
      if (error) job.reject(new Error(error)); else job.resolve(audit)
      if (!pending.size) current.unref()
    })
    current.on('error', error => { if(worker===current){worker=undefined;fail(error)} })
    current.on('exit', code => { if(worker===current){worker=undefined;fail(new Error(`Workspace audit worker exited (${code})`))} })
    return current
  }
  return {
    audit(workspace: string, team: TeamState): Promise<DeliveryAudit> {
      if (closed) return Promise.reject(new Error('Workspace auditor disposed'))
      if (!deliveryArtifactPaths(team).length && !deliveryScopePatterns(team).length) return Promise.resolve({artifacts:[],expandedScope:[]})
      const key = createHash('sha256').update(workspace).update('\0').update(JSON.stringify(team)).digest('hex')
      const existing = shared.get(key)
      if (existing) return existing
      if (pending.size >= 32) return Promise.reject(new Error('Workspace audit busy; retry on the next poll'))
      const id = ++sequence
      const result = new Promise<DeliveryAudit>((resolve,reject) => {
        const active = getWorker(); active.ref(); pending.set(id,{resolve,reject})
        try { active.postMessage({id,workspace,team}) }
        catch(error){pending.delete(id);if(!pending.size)active.unref();reject(error)}
      }).finally(() => { if(shared.get(key)===result)shared.delete(key) })
      shared.set(key,result)
      return result
    },
    async dispose() { closed=true;fail(new Error('Workspace auditor disposed'));const active=worker;worker=undefined;if(active)await active.terminate() },
  }
}
