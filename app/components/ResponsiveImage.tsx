"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  quality?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  unoptimized?: boolean;
}

const ResponsiveImage = ({
  src,
  alt,
  className = '',
  priority = false,
  sizes = '100vw',
  fill = false,
  width,
  height,
  quality = 85,
  objectFit = 'cover',
  objectPosition = 'center',
  placeholder = 'empty',
  blurDataURL,
  unoptimized = false,
}: ResponsiveImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Use Intersection Observer to detect when image is in viewport
  useEffect(() => {
    if (!imgRef.current || priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px' } // Start loading images when they're 200px from viewport
    );

    observer.observe(imgRef.current);
    return () => {
      if (imgRef.current) observer.disconnect();
    };
  }, [priority]);

  // Generate a lower quality placeholder URLs for blurred loading
  const generatePlaceholderUrl = () => {
    if (blurDataURL) return blurDataURL;
    if (src.startsWith('/')) {
      // Handle local image placeholder
      return `${src}?quality=10&w=50`;
    }
    
    // Handle external image placeholder
    if (src.includes('?')) {
      return src + '&quality=10&w=50';
    } else {
      return src + '?quality=10&w=50';
    }
  };

  // Detect device pixel ratio for better resolution on high-DPI screens
  const [pixelRatio, setPixelRatio] = useState(1);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPixelRatio(window.devicePixelRatio || 1);
    }
  }, []);

  // Optimize quality based on connection type
  const [optimizedQuality, setOptimizedQuality] = useState(quality);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      
      if (connection) {
        // Reduce quality for slow connections
        if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
          setOptimizedQuality(60);
        } else if (connection.effectiveType === '3g') {
          setOptimizedQuality(75);
        }
      }
    }
  }, [quality]);

  return (
    <div 
      ref={imgRef} 
      className={`relative overflow-hidden ${className} ${isLoaded ? 'loaded' : 'loading'}`}
      style={{ 
        position: fill ? 'relative' : 'static',
        height: fill ? '100%' : 'auto' 
      }}
    >
      {isInView && (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          quality={optimizedQuality}
          priority={priority}
          sizes={sizes}
          className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{
            objectFit: objectFit,
            objectPosition: objectPosition,
          }}
          onLoad={() => setIsLoaded(true)}
          placeholder={placeholder}
          blurDataURL={placeholder === 'blur' ? generatePlaceholderUrl() : undefined}
          unoptimized={unoptimized}
        />
      )}
      
      {/* Show simple placeholder until loaded */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default ResponsiveImage; 