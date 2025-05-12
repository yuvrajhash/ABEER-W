"use client";

import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isSafari: boolean;
  isChrome: boolean;
  isFirefox: boolean;
  isEdge: boolean;
  isIE: boolean;
  isTouchDevice: boolean;
  hasReducedMotion: boolean;
  hasLowData: boolean;
  hasFastConnection: boolean;
  hasHighDensityScreen: boolean;
  supportsWebP: boolean;
  devicePixelRatio: number;
  supportsIntersectionObserver: boolean;
  viewportWidth: number;
  viewportHeight: number;
}

export function useDeviceDetect(): DeviceInfo {
  const defaultDeviceInfo: DeviceInfo = {
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isIOS: false,
    isAndroid: false,
    isSafari: false,
    isChrome: false,
    isFirefox: false,
    isEdge: false,
    isIE: false,
    isTouchDevice: false,
    hasReducedMotion: false,
    hasLowData: false,
    hasFastConnection: true,
    hasHighDensityScreen: false,
    supportsWebP: false,
    devicePixelRatio: 1,
    supportsIntersectionObserver: false,
    viewportWidth: 0,
    viewportHeight: 0,
  };

  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(defaultDeviceInfo);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;
    
    // Device detection
    const ua = window.navigator.userAgent.toLowerCase();
    const isMobile = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua) && window.innerWidth < 768;
    const isTablet = (/ipad|android/.test(ua) && !/mobile/.test(ua)) || (window.innerWidth >= 768 && window.innerWidth < 1024);
    const isDesktop = !isMobile && !isTablet;
    
    // Operating system detection
    const isIOS = /iphone|ipad|ipod/.test(ua) && !(window as any).MSStream;
    const isAndroid = /android/.test(ua);
    
    // Browser detection
    const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
    const isChrome = /chrome/.test(ua) && !/edge|edg/.test(ua);
    const isFirefox = /firefox/.test(ua);
    const isEdge = /edge|edg/.test(ua);
    const isIE = /msie|trident/.test(ua);
    
    // Feature detection
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Connection detection
    let hasLowData = false;
    let hasFastConnection = true;
    
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      
      if (connection) {
        hasLowData = connection.saveData === true;
        hasFastConnection = !(
          connection.effectiveType === 'slow-2g' || 
          connection.effectiveType === '2g' || 
          connection.effectiveType === '3g'
        );
      }
    }
    
    // Screen detection
    const hasHighDensityScreen = window.devicePixelRatio > 1.5;
    const devicePixelRatio = window.devicePixelRatio || 1;
    
    // Feature support
    const supportsIntersectionObserver = 'IntersectionObserver' in window;
    
    // WebP support detection
    let supportsWebP = false;
    const webP = new Image();
    webP.onload = function() {
      supportsWebP = (webP.height === 1);
      // Update state after WebP detection
      setDeviceInfo(prevInfo => ({
        ...prevInfo,
        supportsWebP,
      }));
    };
    webP.onerror = function() {
      // WebP not supported
      setDeviceInfo(prevInfo => ({
        ...prevInfo,
        supportsWebP: false,
      }));
    };
    webP.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Set device info
    setDeviceInfo({
      isMobile,
      isTablet,
      isDesktop,
      isIOS,
      isAndroid,
      isSafari,
      isChrome,
      isFirefox,
      isEdge,
      isIE,
      isTouchDevice,
      hasReducedMotion,
      hasLowData,
      hasFastConnection,
      hasHighDensityScreen,
      supportsWebP,
      devicePixelRatio,
      supportsIntersectionObserver,
      viewportWidth,
      viewportHeight,
    });
    
    setIsInitialized(true);
    
    // Handle resize for responsive detection
    const handleResize = () => {
      setDeviceInfo(prevInfo => ({
        ...prevInfo,
        isMobile: window.innerWidth < 768,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
        isDesktop: window.innerWidth >= 1024,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
      }));
    };
    
    // Add event listener for resize
    window.addEventListener('resize', handleResize);
    
    // Add event listener for orientation change
    window.addEventListener('orientationchange', handleResize);
    
    // Track connection changes if available
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      
      if (connection) {
        const updateConnectionInfo = () => {
          setDeviceInfo(prevInfo => ({
            ...prevInfo,
            hasLowData: connection.saveData === true,
            hasFastConnection: !(
              connection.effectiveType === 'slow-2g' || 
              connection.effectiveType === '2g' || 
              connection.effectiveType === '3g'
            ),
          }));
        };
        
        connection.addEventListener('change', updateConnectionInfo);
        
        return () => {
          connection.removeEventListener('change', updateConnectionInfo);
        };
      }
    }
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return deviceInfo;
}

export default useDeviceDetect; 