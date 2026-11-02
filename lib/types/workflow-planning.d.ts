import { type TaskBrief } from './task-layers.ts';
import type { TeamState, TeamTask } from './types.ts';
import type { WorkflowOperation, GeneralPlanDraft } from './workflow-types.ts';
export interface SpecificTaskInput extends TaskBrief {
    id: string;
    blocker?: string;
}
export declare const briefFields: {
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
export declare const generalPlanParameters: {
    readonly base: {
        readonly type: "string";
        readonly required: true;
        readonly description: "Copy the latest context base.";
    };
    readonly title: {
        readonly type: "string";
        readonly required: true;
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
                };
                readonly executionPrompt: {
                    readonly type: "string";
                };
                readonly provider: {
                    readonly type: "string";
                };
                readonly model: {
                    readonly type: "string";
                };
                readonly reasoningEffort: {
                    readonly type: "string";
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
                readonly id: {
                    readonly type: "string";
                    readonly required: true;
                };
                readonly subject: {
                    readonly type: "string";
                    readonly required: true;
                };
                readonly assignee: {
                    readonly type: "string";
                    readonly required: true;
                    readonly description: "Exact member name for execution tasks. Human checkpoints use the empty string \"\". Never use null.";
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
                };
            };
        };
    };
};
export declare const specificPlanParameters: {
    readonly draftId: {
        readonly type: "string";
        readonly required: true;
        readonly description: "Copy draftId from the general-plan result or template context.";
    };
    readonly tasks: {
        readonly type: "array";
        readonly required: true;
        readonly description: "All listed task IDs exactly once. Only instance text; never return general, layers or configuration flags.";
        readonly items: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly properties: {
                readonly blocker: {
                    readonly type: "string";
                    readonly description: "Only a genuine unresolved blocker. Omit when ready; never put normal explanations or success notes here.";
                };
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
                readonly id: {
                    readonly type: "string";
                    readonly required: true;
                };
            };
        };
    };
};
export declare function createGeneralDraft(team: TeamState, title: string, members: {
    name: string;
    summary: string;
    role?: string;
    executionPrompt?: string;
    provider?: string;
    model?: string;
    reasoningEffort?: string;
}[], tasks: (TaskBrief & {
    id: string;
    subject: string;
    assignee?: string;
    dependencies: string[];
    checkpoint?: boolean;
})[], maxMembers: number): GeneralPlanDraft;
export declare function generalDraftContext(team: TeamState, draft: GeneralPlanDraft, maxMembers: number): TeamTask[];
export declare function specificOperations(tasks: Pick<TeamTask, 'id' | 'layers'>[], inputs: SpecificTaskInput[]): WorkflowOperation[];
export declare const SPECIFIC_INSTRUCTIONS = "\u8C03\u7528 agent_teams_plan_specific\uFF0CdraftId \u539F\u6837\u590D\u5236\u3002tasks \u5FC5\u987B\u8986\u76D6\u5217\u51FA\u7684\u5168\u90E8\u8282\u70B9\uFF0C\u6BCF\u9879\u53EA\u586B\u5199 id\u3001requirements\u3001deliverables\u3001acceptance \u56DB\u4E2A\u5B57\u7B26\u4E32\u3002\u5C06\u8BE5\u8282\u70B9\u901A\u7528\u65B9\u6CD5\u3001\u4EA4\u4ED8\u8981\u6C42\u548C\u9A8C\u6536\u7EA6\u675F\u7ED3\u5408\u5F53\u524D\u76EE\u6807\u5B8C\u6574\u5177\u4F53\u5316\uFF1B\u6267\u884C Agent \u53EA\u8BFB\u672C\u6B21\u63CF\u8FF0\uFF0C\u4E0D\u80FD\u53EA\u5199\u5DEE\u5F02\u6216\u5F15\u7528\u901A\u7528\u5C42\u3002\u4E0D\u8981\u8FD4\u56DE general\u3001layers\u3001\u4F9D\u8D56\u6216\u914D\u7F6E\u72B6\u6001\u3002\u53EA\u6709\u771F\u6B63\u7F3A\u5C11\u5FC5\u8981\u4FE1\u606F\u6216\u4E0D\u9002\u7528\u65F6\u624D\u586B\u5199 blocker\uFF1B\u6B63\u5E38\u8BF4\u660E\u4E0D\u653E\u5728 blocker\u3002\u7528\u6237\u6700\u540E\u7EDF\u4E00\u786E\u8BA4\uFF0C\u63D0\u4EA4\u672C\u8EAB\u4E0D\u6267\u884C\u4EFB\u52A1\u3002";
