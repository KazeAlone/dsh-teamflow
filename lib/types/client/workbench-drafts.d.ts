import { type GalleryAccess } from "../gallery-access.ts";
import { type WorkflowText } from './workflow-text.ts';
import type { TeamState } from '../types.ts';
import type { WorkflowOperation } from '../workflow-types.ts';
import { type EditorDraft, type EditorTarget } from './workbench-selection.ts';
export declare function draftTarget(key: string, teamId: string): EditorTarget | undefined;
export declare function draftChanged(entry: EditorDraft, baseline: Record<string, string>): boolean;
export declare function pendingDrafts(team: TeamState | undefined, drafts: Record<string, EditorDraft>, l?: WorkflowText): {
    key: string;
    entry: EditorDraft;
    target: EditorTarget;
    label: string;
}[];
export declare function decodeDrafts(raw: string | null, teamId: string): Record<string, EditorDraft>;
export declare const draftStorageKey: (sessionId: string, teamId: string) => string;
export declare function draftGalleryAccess(draft: Record<string, string>): GalleryAccess;
/** Bulk save changes configuration only; execution decisions require their own button. */
export declare function propertyOperation(team: TeamState, target: EditorTarget, entry: EditorDraft): WorkflowOperation;
/** Editing a composer while its old message sends must never lose the new text. */
export declare const remainingMessage: (current: string, submitted: string) => string;
