import { parentPort } from 'node:worker_threads'
import { auditTeamWorkspace } from './workspace-audit.ts'
import type { TeamState } from './types.ts'

parentPort?.on('message', ({ id, workspace, team }: { id: number; workspace: string; team: TeamState }) => {
  try { parentPort!.postMessage({ id, audit: auditTeamWorkspace(workspace, team) }) }
  catch (error) { parentPort!.postMessage({ id, error: String(error) }) }
})
