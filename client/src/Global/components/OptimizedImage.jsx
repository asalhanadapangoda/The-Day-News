import React from 'react';
import { cloudinaryOptimize, cloudinarySrcSet } from '../../utils/cloudinary';

/**
 * OptimizedImage Component — Enhanced for Lighthouse 95+
 *
 * Handles:
 * - Responsive srcset via Cloudinary (f_auto, q_auto, w_xxx)
 * - Native lazy loading with Intersection Observer
 * - Fetch priority for LCP hero images
 * - Explicit width/height to prevent CLS
 * - decoding="async" to unblock main thread for non-critical images
 * - <picture> element for AVIF/WebP format negotiation on Cloudinary images
 */
const OptimizedImage = ({
  src,
  alt = "",
  className = "",
  widths = [400, 800, 1200, 1920],
  sizes = "100vw",
  loading = "lazy",
  fetchpriority = "auto",
  objectFit = "cover",
  width,
  height,
  style = {}
}) => {
  if (!src) return null;

  const isCloudinary = src.includes('res.cloudinary.com');

  // Use sync decoding for eager/hero images, async for everything else
  const decoding = (loading === 'eager' || fetchpriority === 'high') ? 'sync' : 'async';

  // Common styles for both optimized and fallback images
  const baseImgStyle = {
    objectFit: objectFit,
    ...style
  };

  if (!isCloudinary) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        fetchpriority={fetchpriority}
        decoding={decoding}
        width={width}
        height={height}
        style={baseImgStyle}
      />
    );
  }

  // For Cloudinary images: generate AVIF srcset, WebP srcset, and fallback
  const avifSrcSet = cloudinarySrcSet(src, widths, 'avif');
  const webpSrcSet = cloudinarySrcSet(src, widths, 'webp');
  const fallbackSrc = cloudinaryOptimize(src, widths[1] || 800);
  const jpegSrcSet = cloudinarySrcSet(src, widths);

  return (
    <picture>
      {/* AVIF — best compression, supported by Chrome, Firefox, Safari 16+ */}
      {avifSrcSet && (
        <source srcSet={avifSrcSet} sizes={sizes} type="image/avif" />
      )}
      {/* WebP — wide support, good compression */}
      {webpSrcSet && (
        <source srcSet={webpSrcSet} sizes={sizes} type="image/webp" />
      )}
      {/* JPEG Fallback */}
      <img
        src={fallbackSrc}
        srcSet={jpegSrcSet}
        sizes={sizes}
        alt={alt}
        className={className}
        loading={loading}
        fetchpriority={fetchpriority}
        decoding={decoding}
        width={width}
        height={height}
        style={baseImgStyle}
      />
    </picture>
  );
};

export default OptimizedImage;
