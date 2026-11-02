export const emptyBrief = () => ({ requirements: '', deliverables: '', acceptance: '' });
export function isTaskBrief(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value))
        return false;
    const v = value;
    return ['requirements', 'deliverables', 'acceptance'].every(key => typeof v[key] === 'string' && v[key].length <= 16000);
}
function valueType(value) {
    return value === null ? 'null' : Array.isArray(value) ? 'array' : typeof value;
}
function briefObject(value, path) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new Error(`${path} must be an object (received ${valueType(value)}). Pass a JSON object directly, not a JSON-encoded string, array or null.`);
    }
    return value;
}
export function parseBrief(value, path = 'taskBrief') {
    const brief = briefObject(value, path);
    for (const key of ['requirements', 'deliverables', 'acceptance']) {
        if (typeof brief[key] !== 'string')
            throw new Error(`${path}.${key} must be a string (received ${valueType(brief[key])}). Use plain text for lists, not arrays; all three text fields are required.`);
        if (brief[key].length > 16000)
            throw new Error(`${path}.${key} must contain at most 16000 characters.`);
    }
    return { requirements: brief['requirements'].trim(), deliverables: brief['deliverables'].trim(), acceptance: brief['acceptance'].trim() };
}
export function briefText(value) {
    return [value.requirements, value.deliverables && `交付物：\n${value.deliverables}`, value.acceptance && `验收要求：\n${value.acceptance}`].filter(Boolean).join('\n\n');
}
