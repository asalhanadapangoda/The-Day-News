/**
 * cloudinary.js
 *
 * Injects Cloudinary performance transformations into any Cloudinary URL.
 * - q_auto  → auto compress quality (smaller file sizes)
 * - f_auto  → serve WebP / AVIF to supporting browsers automatically
 *
 * Works safely on non-Cloudinary URLs (returns them unchanged).
 */

/**
 * Optimise a Cloudinary image URL by appending q_auto,f_auto.
 * @param {string} url  The raw image URL from the database / API.
 * @returns {string}    The optimised URL (or the original URL if not Cloudinary).
 */
export function cloudinaryOptimize(url) {
  if (!url || typeof url !== 'string') return url;

  // Only transform Cloudinary URLs
  if (!url.includes('res.cloudinary.com')) return url;

  try {
    // Cloudinary URL structure:
    // https://res.cloudinary.com/<cloud>/<resource_type>/upload/<transformations>/<public_id>
    // We inject our transforms right after /upload/
    const UPLOAD_SEGMENT = '/upload/';
    const idx = url.indexOf(UPLOAD_SEGMENT);
    if (idx === -1) return url; // Not a standard upload URL – return as-is

    const before = url.slice(0, idx + UPLOAD_SEGMENT.length); // includes /upload/
    const rest   = url.slice(idx + UPLOAD_SEGMENT.length);     // e.g. "v1234/folder/image.jpg"

    // Avoid adding duplicates if already present
    if (rest.startsWith('q_auto') || rest.startsWith('f_auto')) return url;

    // Also handle the case where other transformations already exist (e.g. "w_800/image.jpg")
    // We prepend our global quality/format transforms before any existing transforms.
    return `${before}q_auto,f_auto/${rest}`;
  } catch {
    return url;
  }
}
