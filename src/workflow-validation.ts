/** Validate saved workflow data before native recovery or browser rendering. */
import { isTaskLayers } from './legacy-task-description.ts'
import { parseTemplate } from './templates.ts'
const record = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === 'object' && !Array.isArray(value)
const string = (value: unknown): value is string => typeof value === 'string'
const optionalString = (value: unknown) => value === undefined || string(value)
const number = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value)
const positive = (value: unknown) => number(value) && Number.isSafeInteger(value) && value > 0
const strings = (value: unknown) => Array.isArray(value) && value.every(string)

function operation(value: unknown): boolean {
  if (!record(value)) return false
  if(value['layers']!==undefined && !isTaskLayers(value['layers']))return false
  if(!optionalString(value['specificPrompt']) || !optionalString(value['adaptationIssue']))return false
  if (['id', 'name', 'subject', 'summary', 'role', 'executionPrompt', 'description', 'assignee', 'provider', 'model', 'reasoningEffort', 'instructions'].some(key => !optionalString(value[key]))) return false
  if (value['dependencies'] !== undefined && !strings(value['dependencies'])) return false
  if (['configurationPending', 'confirmConfiguration'].some(key => value[key] !== undefined && typeof value[key] !== 'boolean')) return false
  switch (value['action']) {
    case 'add_member': return string(value['name']) && string(value['summary'])
    case 'update_member': case 'remove_member': return string(value['name'])
    case 'add_task': return string(value['subject']) && strings(value['dependencies']) && (value['checkpoint'] === undefined || typeof value['checkpoint'] === 'boolean')
    case 'update_task': case 'remove_task': return string(value['id'])
    case 'rerun_task': return string(value['id'])
    case 'rework': return string(value['id']) && strings(value['taskIds']) && string(value['instructions'])
    default: return false
  }
}
function proposal(value: unknown): boolean {
  return record(value) && ['id', 'base', 'title'].every(key => string(value[key])) && number(value['createdAt'])
    && ['pending', 'applied', 'dismissed'].includes(value['status'] as string)
    && Array.isArray(value['operations']) && value['operations'].every(operation)
    && (value['suggestedOperations'] === undefined || Array.isArray(value['suggestedOperations']) && value['suggestedOperations'].every(operation))
}
function discussion(value: unknown): boolean {
  if (!record(value) || !string(value['key'])) return false
  if (value['splitLayers'] !== undefined && typeof value['splitLayers'] !== 'boolean') return false
  if(value['templateDraft']!==undefined){const d=value['templateDraft'];if(!record(d)||!string(d['base']))return false;try{parseTemplate(d['definition'])}catch{return false}}
  if(value['generalDraft']!==undefined){const d=value['generalDraft'];if(!record(d)||!['id','base','title'].every(k=>string(d[k]))||!Array.isArray(d['operations'])||!d['operations'].length||!d['operations'].every(op=>operation(op)&&record(op)&&['add_member','add_task'].includes(op['action'] as string)))return false}
  if (!['contextBase', 'materials', 'evidence'].every(key => optionalString(value[key]))) return false
  if (value['materialsRound'] !== undefined && !positive(value['materialsRound'])) return false
  if (value['native'] !== undefined) {
    const native = value['native']
    if (!record(native) || !string(native['sessionId']) || !string(native['label']) || !optionalString(native['reviewEvidence'])) return false
  }
  return (value['proposal'] === undefined || proposal(value['proposal']))
    && Array.isArray(value['messages']) && value['messages'].every(item => record(item) && ['user', 'assistant'].includes(item['role'] as string) && string(item['text']) && number(item['at']))
    && Array.isArray(value['calls']) && value['calls'].every(item => record(item) && ['system', 'input', 'provider', 'model'].every(key => string(item[key])) && optionalString(item['output']) && optionalString(item['error']) && number(item['at']))
}
export function isWorkflowState(value: unknown): boolean {
  if(record(value) && value['templateDefinition']!==undefined){try{parseTemplate(value['templateDefinition'])}catch{return false}}
  if(record(value) && value['templateSource']!==undefined){const s=value['templateSource'];if(!record(s)||!string(s['id'])||!string(s['name'])||!positive(s['version']))return false}
  return record(value) && [undefined, 'manual', 'assisted'].includes(value['mode'] as string | undefined)
    && record(value['positions']) && Object.values(value['positions']).every(point => record(point) && number(point['x']) && number(point['y']))
    && record(value['discussions']) && Object.values(value['discussions']).every(discussion)
    && Array.isArray(value['history']) && value['history'].every(proposal)
}
export function isCheckpoint(value: unknown): boolean {
  return record(value) && positive(value['round']) && [undefined, 'approve', 'reject'].includes(value['decision'] as string | undefined)
    && optionalString(value['note']) && optionalString(value['evidence']) && (value['decidedAt'] === undefined || number(value['decidedAt']))
    && Array.isArray(value['history']) && value['history'].every(item => record(item) && positive(item['round'])
      && ['approve', 'reject'].includes(item['decision'] as string) && number(item['at']) && string(item['note']) && string(item['evidence']) && optionalString(item['materials']))
}
export function isStoppedAttempts(value: unknown): boolean {
  return Array.isArray(value) && value.every(item => record(item) && optionalString(item['attemptId']) && optionalString(item['output']) && number(item['at']))
}
export function isWorkflowRerunContext(value: unknown): boolean {
  return record(value) && string(value['instructions']) && (value['previousStatus']==='pending'||!!value['instructions'].trim())
    && ['completed','failed','cancelled','pending'].includes(value['previousStatus'] as string)
    && (value['continuation']===undefined||typeof value['continuation']==='boolean')
    && optionalString(value['previousOutput']) && optionalString(value['previousAttemptId']) && number(value['requestedAt'])
}
