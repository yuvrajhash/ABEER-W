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
            // Lower quality images on slow connections
            if (img.hasAttribute('data-quality-src') && img.hasAttribute('src')) {
              img.setAttribute('src', img.getAttribute('data-quality-src') || '');
            }
          });
          
          // Remove non-critical CSS on slow connections
          const nonCriticalCSS = document.querySelectorAll('link[data-critical="false"]');
          nonCriticalCSS.forEach(link => {
            (link as HTMLElement).setAttribute('media', 'print');
            setTimeout(() => (link as HTMLElement).setAttribute('media', 'all'), 2000);
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
      
      // Add font-display: swap to ensure text remains visible during font loading
      const style = document.createElement('style');
      style.textContent = `
        @font-face {
          font-display: swap !important;
        }
      `;
      document.head.appendChild(style);
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
        rootMargin: '100px 0px', // Increased margin for earlier loading
        threshold: 0.01
      });
      
      // Find all images with data-src attribute
      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach(img => {
        imageObserver.observe(img);
      });
      
      // Also lazy load iframes
      const lazyIframes = document.querySelectorAll('iframe[data-src]');
      lazyIframes.forEach(iframe => {
        imageObserver.observe(iframe);
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
  
  // Implement priority hints for critical resources
  const implementPriorityHints = useCallback(() => {
    // Add priority hints to critical above-the-fold images
    const criticalImages = document.querySelectorAll('img[data-critical="true"]');
    criticalImages.forEach(img => {
      img.setAttribute('fetchpriority', 'high');
      img.setAttribute('loading', 'eager');
    });
    
    // Defer non-critical scripts
    const nonCriticalScripts = document.querySelectorAll('script[data-critical="false"]');
    nonCriticalScripts.forEach(script => {
      script.setAttribute('defer', '');
    });
    
    // Add preload for critical resources
    const preloadUrls: string[] = [
      // Add critical resources URLs here if needed
    ];
    
    preloadUrls.forEach(url => {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.href = url;
      preloadLink.as = url.endsWith('.css') ? 'style' : 
                     url.endsWith('.js') ? 'script' : 
                     url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? 'image' : 
                     'fetch';
      document.head.appendChild(preloadLink);
    });
  }, []);
  
  // Cache resources for offline use with Service Worker API if available
  const setupServiceWorker = useCallback(() => {
    if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
      window.addEventListener('load', () => {
        // Register service worker with a delay to improve initial page load
        setTimeout(() => {
          navigator.serviceWorker.register('/sw.js').catch(err => {
            console.warn('Service worker registration failed:', err);
          });
        }, 3000);
      });
    }
  }, []);

  // Apply all optimizations on component mount
  useEffect(() => {
    // Apply performance optimizations on client-side only
    handleSlowConnection();
    optimizeFonts();
    const cleanupReduceMotion = handleReduceMotion();
    
    // Add priority hints for critical resources
    implementPriorityHints();
    
    // Optimize resource loading after initial render
    const timeoutId = setTimeout(() => {
      optimizeResourceLoading();
    }, 0);
    
    // Setup service worker with delay to not impact initial load
    const swTimeoutId = setTimeout(() => {
      setupServiceWorker();
    }, 5000);
    
    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(swTimeoutId);
      cleanupReduceMotion();
    };
  }, [handleSlowConnection, optimizeFonts, handleReduceMotion, optimizeResourceLoading, implementPriorityHints, setupServiceWorker]);

  // This component doesn't render anything
  return null;
};

export default PerformanceOptimizer; 