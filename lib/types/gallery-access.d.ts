/** Optional flags preserve legacy behavior when absent. */
export interface GalleryAccess {
    gallerySkill?: boolean;
    galleryMcp?: boolean;
}
export declare const galleryAccessKeys: readonly ["gallerySkill", "galleryMcp"];
export declare function parseGalleryAccess(value: Record<string, unknown>): GalleryAccess;
