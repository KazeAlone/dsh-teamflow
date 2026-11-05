import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { WorkflowLauncher } from "./WorkflowLauncher.js";
import { BrandIcon } from "./BrandIcon.js";
import { ActivitySurface, WorkspaceActivity, createWorkspaceBridge, TEAM_TAB_ID, TEAM_TAB_KIND } from "./WorkspaceActivity.js";
import { BlankSessionTeamflowEntry } from "./BlankSessionTeamflowEntry.js";
import { TeamChatEntry, TeamTurnCard } from "./TeamChatEntry.js";
import { createWorkspaceState } from "./workspace-state.js";
import { AgentTeamsCard } from "./AgentTeamsCard.js";
import { agentTeamsCardDefinition } from "./agent-teams-card-definition.js";
import { installDiscussionSessionPresentation } from "./discussion-session-presentation.js";
import { AGENT_TEAMS_LOCALE_NAMESPACE, en, zh, } from "./locales.js";
import { openAgentTeamMember } from "./session-navigation.js";
/** Required services: conversation nodes, slots, sessions navigation, and locale. */
export const inject = ['uiConversation', 'slots', 'sessions', 'locale', 'modelDirectories', 'layout'];
const useLegacyPanelInfo = select => select({ activePanelId: null });
/** The replayed user message is the canonical transcript entry. */
function HiddenAgentTeamsCommand() {
    return null;
}
/**
 * Register the activity monitor in the shell's additive overlay and the
 * in-conversation team card. The card's activity button re-opens a folded
 * monitor via a window event — the recovery path for an old session.
 */
export function apply(ctx) {
    ctx.effect(() => installDiscussionSessionPresentation(ctx.sessions.list), 'teamflow: workflow-only discussions');
    // Refresh existing clients as well as initial/cold catalogs; no session opens.
    void ctx.sessions.refresh?.().catch(error => console.warn(`teamflow: discussion catalog refresh failed: ${String(error)}`));
    const bridge = createWorkspaceBridge();
    const state = createWorkspaceState();
    ctx.effect(() => ctx.locale.register(AGENT_TEAMS_LOCALE_NAMESPACE, { zh, en }), 'agent-teams: dictionaries');
    const openMember = async (parentId, childId) => {
        await openAgentTeamMember(ctx.sessions, parentId, childId, ctx.layout, ctx.get('uiWorkspace')).catch((error) => {
            console.warn(`agent-teams: failed to open member transcript ${childId}: ${String(error)}`);
            throw error;
        });
    };
    const Panel = ({ t, usePanelInfo }) => {
        // A host's standard hook set is fixed for this mounted plugin instance.
        const usePanel = usePanelInfo ?? useLegacyPanelInfo;
        const conversationVisible = usePanel(panel => panel.activePanelId === null);
        return (_jsxs(_Fragment, { children: [_jsx(BlankSessionTeamflowEntry, { sessionsList: ctx.sessions.list, modelDirectories: ctx.modelDirectories, openMember: openMember, t: t, conversationVisible: conversationVisible }), _jsx(ActivitySurface, { state: state, conversationVisible: conversationVisible, sessionsList: ctx.sessions.list, modelDirectories: ctx.modelDirectories, openMember: openMember, t: t })] }));
    };
    // A root panel has no Session binding: browsing templates precedes choosing a workspace.
    ctx.inject(['workspaces', 'uiWorkspace', 'remote.session'], native => {
        if (typeof native.sessions.retain !== 'function' || typeof native.sessions.create !== 'function' || !native.workspaces.list || typeof native.uiWorkspace.pickDirectory !== 'function')
            return;
        native.slots.inject('main', () => native.slots.register({
            name: 'main', key: 'dsh-teamflow-workflow', locale: AGENT_TEAMS_LOCALE_NAMESPACE,
            inject: () => ({ sessions: native.sessions, workspaces: native.workspaces, uiWorkspace: native.uiWorkspace, modelDirectories: native.modelDirectories, openMember }),
        }, WorkflowLauncher));
        native.slots.inject('sidebar.panellist', () => native.slots.register({
            name: 'sidebar.panellist', id: 'dsh-teamflow-workflow', order: 30, label: 'Workflow',
        }, ({ size }) => _jsx(BrandIcon, { size: size })));
    });
    // A conversation entry does not depend on the optional right sidebar.
    ctx.slots.inject('conversation.session.header.actions', () => ctx.slots.register({
        name: 'conversation.session.header.actions', id: 'agent-teams-entry', order: 50,
        locale: AGENT_TEAMS_LOCALE_NAMESPACE,
        inject: () => ({ openMember }),
    }, TeamChatEntry));
    // Optional service scope keeps legacy hosts working and removes every native
    // contribution when the host provider disappears (including HMR).
    ctx.inject(['sidebarRight', 'sidebarRightTabs'], (native) => {
        const t = native.locale.bind(AGENT_TEAMS_LOCALE_NAMESPACE);
        native.effect(() => native.sidebarRightTabs.register({
            id: TEAM_TAB_ID, kind: TEAM_TAB_KIND,
            title: () => t('workspace.title'),
        }));
        native.slots.inject('conversation.chat.turnTail', () => native.slots.register({
            name: 'conversation.chat.turnTail', id: 'agent-teams-summary', order: 50,
            locale: AGENT_TEAMS_LOCALE_NAMESPACE,
            inject: () => ({ openMember }),
        }, TeamTurnCard));
        native.slots.inject('sidebar.right.pane.tab', () => {
            const dispose = native.slots.register({
                name: 'sidebar.right.pane.tab', key: TEAM_TAB_ID,
                locale: AGENT_TEAMS_LOCALE_NAMESPACE,
                inject: () => ({ state, modelDirectories: native.modelDirectories, openMember, openContext: () => native.sidebarRight.openTab(TEAM_TAB_KIND) }),
            }, WorkspaceActivity);
            bridge.set(native.sidebarRight);
            return () => { bridge.set(undefined); dispose(); };
        });
    });
    ctx.slots.inject('shell.overlay', () => ctx.slots.register({
        name: 'shell.overlay',
        id: 'agent-teams-activity',
        order: 80,
        label: 'TeamFlow activity',
        locale: AGENT_TEAMS_LOCALE_NAMESPACE,
    }, Panel));
    // The host command is only the slash-menu/admission surface. Its input is
    // replayed as the visible user message, so the generic result row would be
    // a duplicate placed before that message by command lifecycle ordering.
    for (const command of ['teamflow', 'agent-teams'])
        ctx.slots.inject('conversation.chat.commandview', () => ctx.slots.register({
            name: 'conversation.chat.commandview',
            key: command,
        }, HiddenAgentTeamsCommand));
    ctx.uiConversation.events.register(agentTeamsCardDefinition);
    ctx.slots.inject('conversation.chat.node', () => ctx.slots.register({
        name: 'conversation.chat.node',
        key: 'agent-teams',
        locale: AGENT_TEAMS_LOCALE_NAMESPACE,
        inject: () => ({
            openMember, workspaceBridge: bridge,
        }),
    }, AgentTeamsCard));
}
