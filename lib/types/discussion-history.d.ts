import type { Session } from '@deepseek-ai/dsh-session';
type Message = {
    id: string;
    role: string;
    text: string;
};
/** The host's append-only seq is the log length, not a time or token count.
 * Keep only the displayed tail; do not retain another complete transcript.
 * Legacy hosts without that contract always read fresh events.
 */
export declare function discussionHistory(session: Session): Message[];
export {};
