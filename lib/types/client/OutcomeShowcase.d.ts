import type { TeamState } from '../types.ts';
/** Small safe Markdown subset. React escapes all text; no HTML, embeds, or external resources. */
export declare function OutcomeMarkdown({ text }: {
    text: string;
}): import("react").JSX.Element;
export declare function OutcomeShowcase({ team, sessionId, archived, onTask }: {
    team: TeamState;
    sessionId: string;
    archived: boolean;
    onTask: (id: string, review?: boolean) => void;
}): import("react").JSX.Element;
