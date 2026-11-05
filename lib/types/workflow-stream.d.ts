import type { AssistantStreamFrame } from '@deepseek-ai/dsh-agent';
/** Transient public reply text only. Durable session events replace it on settlement. */
export declare class DiscussionStreams {
    private entries;
    accept(agent: {
        id: string;
    }, frame: AssistantStreamFrame): void;
    clear(agent: {
        id: string;
    }): void;
    read(agent: {
        id: string;
    }): {
        id: string;
        role: 'assistant';
        text: string;
        streaming: true;
    } | undefined;
}
