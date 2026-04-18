import React from 'react';
import { cloudinaryOptimize, cloudinarySrcSet } from '../utils/cloudinary';

/**
 * OptimizedImage Component
 * 
 * Automatically handles:
 * - Responsive srcset for different screen sizes
 * - Quality/Format optimization via Cloudinary
 * - Native lazy loading
 * - Fetch priority for heroes
 * - Width/Height for CLS prevention
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
        width={width}
        height={height}
        style={baseImgStyle}
      />
    );
  }

  return (
    <img
      src={cloudinaryOptimize(src, widths[1] || 800)} // Fallback src
      srcSet={cloudinarySrcSet(src, widths)}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={loading}
      fetchpriority={fetchpriority}
      width={width}
      height={height}
      style={baseImgStyle}
    />
  );
};

export default OptimizedImage;
