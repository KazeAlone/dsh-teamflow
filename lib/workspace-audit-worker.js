import { parentPort } from 'node:worker_threads';
import { auditTeamWorkspace } from "./workspace-audit.js";
parentPort?.on('message', ({ id, workspace, team }) => {
    try {
        parentPort.postMessage({ id, audit: auditTeamWorkspace(workspace, team) });
    }
    catch (error) {
        parentPort.postMessage({ id, error: String(error) });
    }
});
