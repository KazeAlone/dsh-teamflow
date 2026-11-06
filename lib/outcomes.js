export function outcomeFiles(task) {
    return [...new Set([...(task.deliverables ?? []), ...(task.changedPaths ?? [])])].map(path => ({ path,
        declared: task.deliverables?.includes(path) ?? false, changed: task.changedPaths?.includes(path) ?? false,
    }));
}
/** RFC-style quoted fields, including embedded delimiters/newlines; bounded display only. */
export function outcomeCsv(text, maxRows = 100, maxColumns = 50) {
    const rows = [];
    let row = [], field = '', quoted = false, truncated = false;
    const cell = () => { if (row.length < maxColumns)
        row.push(field);
    else
        truncated = true; field = ''; };
    const finish = () => { cell(); rows.push(row); row = []; };
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (c === '"') {
            if (quoted && text[i + 1] === '"') {
                field += '"';
                i++;
            }
            else if (quoted || !field)
                quoted = !quoted;
            else
                field += c;
        }
        else if (!quoted && c === ',')
            cell();
        else if (!quoted && (c === '\n' || c === '\r')) {
            if (c === '\r' && text[i + 1] === '\n')
                i++;
            finish();
            if (rows.length >= maxRows)
                return { rows, truncated: truncated || i < text.length - 1 };
        }
        else
            field += c;
    }
    if (field || row.length || (text.length > 0 && !/[\r\n]$/.test(text)))
        finish();
    return { rows, truncated };
}
