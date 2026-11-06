import type { GalleryAccess } from "./gallery-access.ts"
/** Persistent human-controlled workflow and isolated discussion contracts. */
export type WorkflowOperation =
  | (GalleryAccess & { action: 'add_member'; name: string; summary: string; role?: string; executionPrompt?: string; specificPrompt?: string; provider?: string; model?: string; reasoningEffort?: string })
  | (GalleryAccess & { action: 'update_member'; name: string; summary?: string; role?: string; executionPrompt?: string; specificPrompt?: string; provider?: string; model?: string; reasoningEffort?: string })
  | { action: 'remove_member'; name: string }
  | { action: 'add_task'; id?: string; subject: string; description?: string; adaptationIssue?: string; assignee?: string; dependencies: string[]; checkpoint?: boolean; configurationPending?: boolean }
  | { action: 'update_task'; id: string; subject?: string; description?: string; adaptationIssue?: string; assignee?: string; dependencies?: string[]; confirmConfiguration?: boolean }
  | { action: 'remove_task'; id: string }
  | { action: 'rerun_task'; id: string; instructions?: string; subject?: string; description?: string; adaptationIssue?: string; assignee?: string }
  | { action: 'rework'; id: string; taskIds: string[]; instructions: string }

export interface Checkpoint {
  decision?: 'approve' | 'reject'
  decidedAt?: number
  note?: string
  evidence?: string
  round: number
  history: { round: number; decision: string; at: number; note: string; evidence: string; /** Exact approved/rejected snapshot; absent in legacy records. */ materials?: string }[]
}
export interface WorkflowProposal {
  id: string
  base: string
  title: string
  operations: WorkflowOperation[]
  /** Original model suggestion when the human edited it during approval. */
  suggestedOperations?: WorkflowOperation[]
  status: 'pending' | 'applied' | 'dismissed'
  createdAt: number
}
export interface DiscussionMessage { role: 'user' | 'assistant'; text: string; at: number }
export interface WorkflowDiscussion {
  templateDraft?: { base: string; definition: import('./templates.ts').TemplateDefinition }
  key: string
  native?: { sessionId: string; label: string; reviewEvidence?: string }
  contextBase?: string
  messages: DiscussionMessage[]
  proposal?: WorkflowProposal
  /** Exact inputs and response retained separately from the human-readable reply. */
  calls: { system: string; input: string; provider: string; model: string; output?: string; error?: string; at: number }[]
  materials?: string
  evidence?: string
  materialsRound?: number
}
export interface WorkflowState {
  templateDefinition?: import('./templates.ts').TemplateDefinition
  templateSource?: import('./templates.ts').TemplateSource
  /** Accepted for old saved teams; no longer controls behavior. */
  mode?: 'manual' | 'assisted'
  positions: Record<string, { x: number; y: number }>
  discussions: Record<string, WorkflowDiscussion>
  history: WorkflowProposal[]
}
