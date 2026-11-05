import type { TeamState } from '../types.ts';
import type { TemplateVersion } from '../templates.ts';
export declare function TemplateGallery({ sessionId, team, archived, mode, onApply, onBack }: {
    sessionId?: string;
    team?: TeamState;
    archived?: boolean;
    mode?: 'browse' | 'save';
    onApply: (template: TemplateVersion, name: string, goal: string) => Promise<void>;
    onBack?: () => void;
}): import("react").JSX.Element;
