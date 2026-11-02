import type { ModelDirectory } from '@deepseek-ai/dsh-client-ui-model-selection/client';
import type { AgentTeamsTranslate } from './locales.ts';
declare function Workbench({ sessionId, teamId, archived, waitingCount, openExecution, nativeOnly, reviewEntryOnly, embeddedContext, onNativeContext, openContext, modelDirectory, t, entryTarget, onClose }: {
    entryTarget?: {
        taskId: string;
        review?: boolean;
        rerun?: boolean;
    };
    onClose?: () => void;
    archived?: boolean;
    modelDirectory?: ModelDirectory;
    t?: AgentTeamsTranslate;
    reviewEntryOnly?: boolean;
    embeddedContext?: boolean;
    onNativeContext?: (value: boolean) => void;
    openContext?: () => void;
    nativeOnly?: boolean;
    /** Compatibility prop for older callers; discussions now stay inside Workflow. */
    openConversation?: (id: string) => void | Promise<void>;
    sessionId: string;
    teamId?: string;
    waitingCount?: number;
    openExecution?: (memberId: string, parentId?: string) => void | Promise<void>;
}): import("react").JSX.Element;
export declare function WorkflowWorkbench(props: Parameters<typeof Workbench>[0]): import("react").JSX.Element;
export {};
