export const galleryAccessKeys = ['gallerySkill', 'galleryMcp'];
export function parseGalleryAccess(value) {
    const access = {};
    for (const key of galleryAccessKeys) {
        const flag = value[key];
        if (flag === undefined)
            continue;
        if (typeof flag !== 'boolean')
            throw new Error(`${key} 必须是布尔值`);
        access[key] = flag;
    }
    return access;
}
