/**
 * cloudinary.js — Enhanced for Lighthouse 95+
 *
 * Injects Cloudinary performance transformations into any Cloudinary URL.
 * - q_auto  → auto compress quality
 * - f_auto  → serve WebP / AVIF to supporting browsers
 * - Explicit format override: f_avif, f_webp for <picture> sources
 *
 * Works safely on non-Cloudinary URLs (returns them unchanged).
 */

/**
 * Optimise a Cloudinary image URL.
 * @param {string} url       The raw image URL from the database / API.
 * @param {number} width     Optional target width in pixels.
 * @param {string} format    Optional format override: 'avif', 'webp', or undefined (uses f_auto).
 * @returns {string}         The optimised URL.
 */
export function cloudinaryOptimize(url, width, format) {
  if (!url || typeof url !== 'string') return url;
  if (!url.includes('res.cloudinary.com')) return url;

  try {
    const UPLOAD_SEGMENT = '/upload/';
    const idx = url.indexOf(UPLOAD_SEGMENT);
    if (idx === -1) return url;

    const before = url.slice(0, idx + UPLOAD_SEGMENT.length);
    const rest = url.slice(idx + UPLOAD_SEGMENT.length);

    // Avoid duplicating transformations if already present
    if (rest.startsWith('q_auto') || rest.startsWith('f_auto') || rest.startsWith('f_avif') || rest.startsWith('f_webp') || rest.startsWith('w_')) {
      return url;
    }

    // Build transformations string
    // Use explicit format if provided, otherwise f_auto (auto WebP/AVIF)
    const formatTransform = format ? `f_${format}` : 'f_auto';
    let transforms = `${formatTransform},q_auto`;

    if (width) {
      transforms += `,w_${width},c_limit`;
    }

    return `${before}${transforms}/${rest}`;
  } catch {
    return url;
  }
}

/**
 * Generate a srcset string for Cloudinary images.
 * @param {string} url      The raw image URL.
 * @param {number[]} widths Array of widths to generate.
 * @param {string} format   Optional explicit format: 'avif', 'webp'.
 * @returns {string}        The srcset string.
 */
export function cloudinarySrcSet(url, widths = [400, 800, 1200, 1920], format) {
  if (!url || typeof url !== 'string' || !url.includes('res.cloudinary.com')) return '';

  return widths
    .map(w => `${cloudinaryOptimize(url, w, format)} ${w}w`)
    .join(', ');
}
