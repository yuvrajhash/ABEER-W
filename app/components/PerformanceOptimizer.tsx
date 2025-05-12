"use client";

import { useEffect, useCallback } from 'react';

/**
 * PerformanceOptimizer improves website performance across all devices
 * by implementing various optimizations and performance tweaks.
 */
const PerformanceOptimizer = () => {
  // Detect slow connections and apply optimizations
  const handleSlowConnection = useCallback(() => {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      
      if (connection) {
        // Check if on a slow connection
        const isSlowConnection = 
          connection.effectiveType === '2g' || 
          connection.effectiveType === 'slow-2g' || 
          connection.saveData === true;
        
        if (isSlowConnection) {
          // Add class to enable low-data mode
          document.documentElement.classList.add('low-data-mode');
          
          // Disable animations on slow connections
          document.documentElement.classList.add('reduce-motion');
          
          // Hint to the browser to use lower resolution images where possible
          const imgElements = document.querySelectorAll('img:not([loading="eager"])');
          imgElements.forEach(img => {
            if (!img.hasAttribute('fetchpriority')) {
              img.setAttribute('fetchpriority', 'low');
            }
            if (!img.hasAttribute('loading')) {
              img.setAttribute('loading', 'lazy');
            }
          });
        }
      }
    }
  }, []);

  // Optimize font loading
  const optimizeFonts = useCallback(() => {
    // Check if the browser supports the Font Loading API
    if ('fonts' in document) {
      // Identify critical fonts
      const criticalFonts = [
        { family: 'Poppins', weight: '400', style: 'normal' },
        { family: 'Poppins', weight: '600', style: 'normal' },
      ];
      
      // Try to preload critical fonts
      try {
        criticalFonts.forEach(font => {
          (document as any).fonts.load(`${font.weight} ${font.style} 1em ${font.family}`);
        });
      } catch (e) {
        console.warn('Font preloading not supported');
      }
    }
  }, []);

  // Reduce motion based on user preference
  const handleReduceMotion = useCallback(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    }
    
    // Listen for changes to the prefers-reduced-motion media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionPreferenceChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.classList.add('reduce-motion');
      } else {
        document.documentElement.classList.remove('reduce-motion');
      }
    };
    
    mediaQuery.addEventListener('change', handleMotionPreferenceChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleMotionPreferenceChange);
    };
  }, []);

  // Optimize resource loading priority
  const optimizeResourceLoading = useCallback(() => {
    // Function to handle Intersection Observer for images
    const handleImageIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          
          // Set src attribute from data-src to load the image
          if (img.dataset.src) {
            img.src = img.dataset.src;
            delete img.dataset.src;
          }
          
          // Set srcset attribute from data-srcset if available
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            delete img.dataset.srcset;
          }
          
          observer.unobserve(img);
        }
      });
    };
    
    // Set up Intersection Observer for images if the browser supports it
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(handleImageIntersection, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });
      
      // Find all images with data-src attribute
      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach(img => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for browsers that don't support Intersection Observer
      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach(img => {
        const imgElement = img as HTMLImageElement;
        if (imgElement.dataset.src) {
          imgElement.src = imgElement.dataset.src;
        }
      });
    }
  }, []);

  // Apply all optimizations on component mount
  useEffect(() => {
    // Apply performance optimizations on client-side only
    handleSlowConnection();
    optimizeFonts();
    const cleanupReduceMotion = handleReduceMotion();
    
    // Optimize resource loading after initial render
    const timeoutId = setTimeout(() => {
      optimizeResourceLoading();
    }, 0);
    
    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      cleanupReduceMotion();
    };
  }, [handleSlowConnection, optimizeFonts, handleReduceMotion, optimizeResourceLoading]);

  // This component doesn't render anything
  return null;
};

export default PerformanceOptimizer; 