/** Optional flags preserve legacy behavior when absent. */
export interface GalleryAccess {
  gallerySkill?: boolean
  galleryMcp?: boolean
}

export const galleryAccessKeys = ['gallerySkill', 'galleryMcp'] as const

export function parseGalleryAccess(value: Record<string, unknown>): GalleryAccess {
  const access: GalleryAccess = {}
  for (const key of galleryAccessKeys) {
    const flag = value[key]
    if (flag === undefined) continue
    if (typeof flag !== 'boolean') throw new Error(`${key} 必须是布尔值`)
    access[key] = flag
  }
  return access
}
