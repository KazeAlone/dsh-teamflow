const record = (value) => !!value && typeof value === 'object' && !Array.isArray(value);
const text = (value) => typeof value === 'string' ? value : '';
const records = (value) => Array.isArray(value) ? value.filter(record) : [];
export function parseReviewMaterial(raw) {
    if (!raw)
        return;
    try {
        const value = JSON.parse(raw);
        if (!record(value) || !record(value.check) || !Array.isArray(value.results) || typeof value.check.id !== 'string' || !Number.isInteger(value.check.round))
            return;
        const files = record(value.files) ? value.files : {};
        return {
            check: { id: value.check.id, subject: text(value.check.subject), description: text(value.check.description), round: value.check.round, ...(Array.isArray(value.check.acceptance) ? { acceptance: value.check.acceptance.filter((v) => typeof v === 'string') } : {}) },
            results: records(value.results).map(result => ({ id: text(result.id), subject: text(result.subject), output: text(result.output), status: text(result.status), attemptId: text(result.attemptId),
                acceptanceResults: records(result.acceptanceResults).filter(r => typeof r.criterion === 'string' && (r.status === 'passed' || r.status === 'failed')).map(r => ({ criterion: r.criterion, status: r.status, evidence: text(r.evidence) })),
                commandsRun: records(result.commandsRun).filter(r => typeof r.command === 'string' && (r.status === 'passed' || r.status === 'failed')).map(r => ({ command: r.command, status: r.status, evidence: text(r.evidence), exitCode: typeof r.exitCode === 'number' ? r.exitCode : undefined })),
            })),
            files: records(files.artifacts).filter(f => typeof f.path === 'string').map(f => ({ path: f.path, present: f.present === true, unreadable: f.unreadable === true, sha256: text(f.sha256), reason: text(f.reason) })),
            gaps: records(files.gaps).map(g => ({ pattern: text(g.pattern), reason: text(g.reason) })), limitation: text(value.limitation),
        };
    }
    catch {
        return;
    }
}
/** Only explicit structured criteria are matched, by exact trimmed text. Prose stays intact. */
export function reviewItems(task, material) {
    const criteria = [...new Set((material?.check.acceptance ?? task.acceptance ?? []).map(s => s.trim()).filter(Boolean))];
    const items = criteria.map((criterion, i) => ({ id: `criterion:${i}`, title: criterion, kind: 'requirement', reports: material?.results.flatMap(r => r.acceptanceResults.filter(a => a.criterion.trim() === criterion).map(a => ({ ...a, source: r.subject }))) ?? [] }));
    for (const result of material?.results ?? [])
        result.acceptanceResults.forEach((report, i) => {
            if (!criteria.includes(report.criterion.trim()))
                items.push({ id: `${result.id}:${i}`, title: report.criterion, source: result.subject, kind: 'report', reports: [report] });
        });
    return items;
}
/** Compare snapshot content, not volatile timestamps; an unavailable snapshot is never reconstructed. */
export function reviewChanges(previous, current) {
    const ids = [...new Set([...previous.results.map(r => r.id), ...current.results.map(r => r.id)])];
    const results = ids.map(id => ({ id, before: previous.results.find(r => r.id === id), after: current.results.find(r => r.id === id) }))
        .filter(r => JSON.stringify(r.before) !== JSON.stringify(r.after));
    const paths = [...new Set([...previous.files.map(f => f.path), ...current.files.map(f => f.path)])];
    const files = paths.map(path => ({ path, before: previous.files.find(f => f.path === path), after: current.files.find(f => f.path === path) }))
        .filter(f => JSON.stringify(f.before) !== JSON.stringify(f.after));
    return { results, files, requirementsChanged: previous.check.description !== current.check.description || JSON.stringify(previous.check.acceptance) !== JSON.stringify(current.check.acceptance), gapsChanged: JSON.stringify(previous.gaps) !== JSON.stringify(current.gaps) };
}
