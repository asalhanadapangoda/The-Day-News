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
 * Optimise a Cloudinary image URL by appending q_auto,f_auto and optional dimensions.
 * @param {string} url    The raw image URL from the database / API.
 * @param {number} width  Optional. The target width (pixels).
 * @returns {string}      The optimised URL (or the original URL if not Cloudinary).
 */
export function cloudinaryOptimize(url, width) {
  if (!url || typeof url !== 'string') return url;

  // Only transform Cloudinary URLs
  if (!url.includes('res.cloudinary.com')) return url;

  try {
    // Cloudinary URL structure:
    // https://res.cloudinary.com/<cloud>/<resource_type>/upload/<transformations>/<public_id>
    const UPLOAD_SEGMENT = '/upload/';
    const idx = url.indexOf(UPLOAD_SEGMENT);
    if (idx === -1) return url;

    const before = url.slice(0, idx + UPLOAD_SEGMENT.length);
    const rest = url.slice(idx + UPLOAD_SEGMENT.length);

    // Build transformations string
    // f_auto: Format auto (WebP/AVIF)
    // q_auto: Quality auto (automatic compression)
    let transforms = 'f_auto,q_auto';

    // If a width is provided, add scaling. 
    // c_limit ensures we never scale UP (which damages quality)
    if (width) {
      transforms += `,w_${width},c_limit`;
    }

    // Avoid duplicating transformations if already present
    if (rest.startsWith('q_auto') || rest.startsWith('f_auto') || rest.startsWith('w_')) {
      return url;
    }

    return `${before}${transforms}/${rest}`;
  } catch {
    return url;
  }
}

/**
 * Generate a srcset string for Cloudinary images.
 * @param {string} url      The raw image URL.
 * @param {number[]} widths Array of widths to generate (e.g. [400, 800, 1200]).
 * @returns {string}        The srcset string (or empty if not Cloudinary).
 */
export function cloudinarySrcSet(url, widths = [400, 800, 1200, 1920]) {
  if (!url || typeof url !== 'string' || !url.includes('res.cloudinary.com')) return '';
  
  return widths
    .map(w => `${cloudinaryOptimize(url, w)} ${w}w`)
    .join(', ');
}
