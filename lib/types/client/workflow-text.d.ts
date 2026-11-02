import { type AgentTeamsTranslate } from './locales.ts';
export type WorkflowText = ((source: string, ...values: unknown[]) => string) & {
    language: 'zh' | 'en';
};
export declare const sourceText: WorkflowText;
export declare function workflowText(t?: AgentTeamsTranslate): WorkflowText;
/** Localize plugin-owned feedback at render time, including feedback saved before a locale switch. */
export declare function workflowMessage(text: string, l: WorkflowText): string;
export declare function briefDisplay(value: import('../template-brief.ts').TaskBrief, l: WorkflowText): string;
