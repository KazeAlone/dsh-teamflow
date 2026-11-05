import type { Context } from '@deepseek-ai/cordis';
import type { SessionId } from '@deepseek-ai/dsh-session/types';
import type { AgentTeamsTranslate } from './locales.ts';
type LauncherServices = Pick<Context, 'sessions' | 'workspaces' | 'uiWorkspace' | 'modelDirectories'>;
export interface WorkflowLauncherProps extends LauncherServices {
    t: AgentTeamsTranslate;
    openMember: (parentId: SessionId, childId: SessionId) => Promise<void>;
}
export declare function WorkflowLauncher(props: WorkflowLauncherProps): import("react").JSX.Element;
export {};
