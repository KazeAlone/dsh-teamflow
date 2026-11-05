import type { UiWorkspace } from '@deepseek-ai/dsh-client-ui-workspace/client';
type Props = {
    workspace: Pick<UiWorkspace, 'listDirectory' | 'createDirectory'>;
    onPick: (path: string) => Promise<void>;
    onClose: () => void;
};
/** Uses the same host directory API and modal primitives as DSH's workspace browser. */
export declare function WorkspaceDirectoryPicker({ workspace, onPick, onClose }: Props): import("react").JSX.Element;
export {};
