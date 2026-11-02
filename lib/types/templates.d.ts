/** Runtime-independent template format. Only explicitly portable fields are exported. */
import type { TeamState } from './types.ts';
import type { WorkflowOperation } from './workflow-types.ts';
import { type TaskBrief } from './template-brief.ts';
export interface TemplateMember {
    name: string;
    summary: string;
    role: string;
    executionPrompt: string;
}
export interface TemplateTask {
    id: string;
    subject: string;
    assignee: string;
    dependencies: string[];
    checkpoint: boolean;
    general: TaskBrief;
}
export interface TemplateDefinition {
    name: string;
    description: string;
    tags: string[];
    inputs: string;
    members: TemplateMember[];
    tasks: TemplateTask[];
    positions: Record<string, {
        x: number;
        y: number;
    }>;
}
export interface TemplateVersion extends TemplateDefinition {
    id: string;
    version: number;
    createdAt: number;
    updatedAt: number;
}
export interface TemplateSource {
    id: string;
    version: number;
    name: string;
}
export declare function parseTemplate(value: unknown): TemplateDefinition;
/** A manual starting point; legacy descriptions are not silently promoted to generic instructions. */
export declare function templateSeed(team: TeamState): TemplateDefinition;
export declare function templateTopology(value: Pick<TemplateDefinition, 'members' | 'tasks'>): string;
export declare function extractedTemplate(team: TeamState, value: unknown): TemplateDefinition;
export declare function instantiateTemplate(template: TemplateVersion, id: string, captainSessionId: string, name: string, goal: string, now?: number): TeamState;
/** The adaptation agent may fill the instance, never alter the saved graph or template definition. */
export declare function validateAdaptation(team: TeamState, operations: WorkflowOperation[]): void;
export declare const isBuiltinTemplate: (id: string) => boolean;
