import { type GalleryAccess } from "./gallery-access.ts";
/** Runtime-independent template format. Only explicitly portable fields are exported. */
import type { TeamState } from './types.ts';
import type { WorkflowOperation } from './workflow-types.ts';
import { type TaskBrief } from './template-brief.ts';
export interface TemplateMember extends GalleryAccess {
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
export declare const templateDefinitionParameter: {
    readonly type: "object";
    readonly required: true;
    readonly additionalProperties: false;
    readonly description: "Submit the template object directly, not a JSON-encoded string. Copy node IDs, owners and dependencies from templateFormat; omit positions.";
    readonly properties: {
        readonly name: {
            readonly type: "string";
            readonly required: true;
        };
        readonly description: {
            readonly type: "string";
            readonly required: true;
        };
        readonly inputs: {
            readonly type: "string";
            readonly required: true;
        };
        readonly tags: {
            readonly type: "array";
            readonly required: true;
            readonly items: {
                readonly type: "string";
            };
        };
        readonly members: {
            readonly type: "array";
            readonly required: true;
            readonly items: {
                readonly type: "object";
                readonly additionalProperties: false;
                readonly properties: {
                    readonly name: {
                        readonly type: "string";
                        readonly required: true;
                    };
                    readonly summary: {
                        readonly type: "string";
                        readonly required: true;
                    };
                    readonly role: {
                        readonly type: "string";
                        readonly required: true;
                    };
                    readonly executionPrompt: {
                        readonly type: "string";
                        readonly required: true;
                    };
                };
            };
        };
        readonly tasks: {
            readonly type: "array";
            readonly required: true;
            readonly items: {
                readonly type: "object";
                readonly additionalProperties: false;
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly required: true;
                    };
                    readonly subject: {
                        readonly type: "string";
                        readonly required: true;
                    };
                    readonly assignee: {
                        readonly description: "Exact member name, or empty string for a human checkpoint. Never null.";
                        readonly type: "string";
                        readonly required: true;
                    };
                    readonly dependencies: {
                        readonly type: "array";
                        readonly required: true;
                        readonly items: {
                            readonly type: "string";
                        };
                    };
                    readonly checkpoint: {
                        readonly type: "boolean";
                        readonly required: true;
                    };
                    readonly general: {
                        readonly type: "object";
                        readonly required: true;
                        readonly additionalProperties: false;
                        readonly properties: {
                            readonly requirements: {
                                readonly type: "string";
                                readonly required: true;
                            };
                            readonly deliverables: {
                                readonly type: "string";
                                readonly required: true;
                            };
                            readonly acceptance: {
                                readonly type: "string";
                                readonly required: true;
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare function templateGenerationFormat(team: TeamState): Omit<TemplateDefinition, 'positions'>;
export declare function parseTemplate(value: unknown): TemplateDefinition;
/** A manual starting point; legacy descriptions are not silently promoted to generic instructions. */
export declare function templateSeed(team: TeamState): TemplateDefinition;
export declare function templateTopology(value: Pick<TemplateDefinition, 'members' | 'tasks'>): string;
export declare function extractedTemplate(team: TeamState, value: unknown): TemplateDefinition;
export declare function instantiateTemplate(template: TemplateVersion, id: string, captainSessionId: string, name: string, goal: string, now?: number): TeamState;
/** The adaptation agent may fill the instance, never alter the saved graph or template definition. */
export declare function validateAdaptation(team: TeamState, operations: WorkflowOperation[]): void;
export declare const isBuiltinTemplate: (id: string) => boolean;
