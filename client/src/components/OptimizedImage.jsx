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
 */
const OptimizedImage = ({ 
  src, 
  alt = "", 
  className = "", 
  widths = [400, 800, 1200, 1920],
  sizes = "100vw",
  loading = "lazy",
  fetchpriority = "auto",
  objectFit = "cover"
}) => {
  if (!src) return null;

  const isCloudinary = src.includes('res.cloudinary.com');

  if (!isCloudinary) {
    return (
      <img 
        src={src} 
        alt={alt} 
        className={className} 
        loading={loading}
      />
    );
  }

  return (
    <img
      src={cloudinaryOptimize(src, widths[1] || 800)} // Fallback src
      srcSet={cloudinarySrcSet(src, widths)}
      sizes={sizes}
      alt={alt}
      className={`${className} ${objectFit === 'cover' ? 'object-cover' : 'object-contain'}`}
      loading={loading}
      fetchPriority={fetchpriority}
    />
  );
};

export default OptimizedImage;
