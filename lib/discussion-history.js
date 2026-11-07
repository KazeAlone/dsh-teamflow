import { sessionOwnEvents } from "./harness-compat.js";
const history = new WeakMap();
/** The host's append-only seq is the log length, not a time or token count.
 * Keep only the displayed tail; do not retain another complete transcript.
 * Legacy hosts without that contract always read fresh events.
 */
export function discussionHistory(session) {
    const seq = session.seq;
    const cached = history.get(session);
    if (typeof seq === 'number' && cached?.seq === seq)
        return cached.messages;
    const events = sessionOwnEvents(session), messages = [];
    for (let i = events.length - 1; i >= 0 && messages.length < 100; i--) {
        const event = events[i];
        const message = event.type === 'user/message' ? event.data : event.type === 'assistant/message' ? event.data.message : undefined;
        if (!message || (event.type === 'user/message' && message.source.kind !== 'user'))
            continue;
        const text = message.content.filter(block => block.type === 'text').map(block => block.text).join('\n').trim();
        if (text)
            messages.push({ id: String(event.seq), role: event.type === 'user/message' ? 'user' : 'assistant', text });
    }
    messages.reverse();
    // Oversized messages remain readable, but are not duplicated in a cache.
    if (typeof seq === 'number' && messages.reduce((size, m) => size + m.text.length, 0) <= 262144)
        history.set(session, { seq, messages });
    else
        history.delete(session);
    return messages;
}
