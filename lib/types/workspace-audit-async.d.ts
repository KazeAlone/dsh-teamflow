import type { TeamState } from './types.ts';
import type { DeliveryAudit } from './quality-gates.ts';
export declare function createWorkspaceAuditor(): {
    audit(workspace: string, team: TeamState): Promise<DeliveryAudit>;
    dispose(): Promise<void>;
};
