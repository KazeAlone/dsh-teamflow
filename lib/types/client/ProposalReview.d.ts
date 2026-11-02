import type { TeamState } from '../types.ts';
import type { WorkflowOperation, WorkflowProposal } from '../workflow-types.ts';
export type ProposalReviewDraft = {
    operations: WorkflowOperation[];
    included: boolean[];
};
export declare function ProposalReview({ team, proposal, base, busy, onApply, onDismiss, draft, onChange, fixedStructure }: {
    fixedStructure?: boolean;
    team: TeamState;
    proposal: WorkflowProposal;
    base: string;
    busy: boolean;
    onApply: (operations: WorkflowOperation[]) => void;
    onDismiss: () => void;
    draft?: ProposalReviewDraft;
    onChange: (draft: ProposalReviewDraft) => void;
}): import("react").JSX.Element;
