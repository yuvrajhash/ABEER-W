"use client";

import { useEffect } from 'react';

/**
 * This component handles various responsive behaviors and compatibility fixes
 * for different browsers and devices
 */
export default function ResponsiveHandler() {
  useEffect(() => {
    // Fix for iOS 100vh issue
    const setVhProperty = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    // Detect browser/device for conditional fixes
    const addBrowserClasses = () => {
      const html = document.documentElement;
      
      // Detect iOS
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      if (isIOS) html.classList.add('is-ios');
      
      // Detect Safari
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      if (isSafari) html.classList.add('is-safari');
      
      // Detect Firefox
      const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
      if (isFirefox) html.classList.add('is-firefox');
      
      // Detect Edge
      const isEdge = /Edge\/\d./i.test(navigator.userAgent);
      if (isEdge) html.classList.add('is-edge');
      
      // Detect touch device
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      if (isTouch) html.classList.add('is-touch-device');
      
      // Detect mobile device
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) html.classList.add('is-mobile');
    };
    
    // Fix for keyboard focus outline
    const handleFirstTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
      }
    };
    
    // Fix for smooth scrolling to anchors
    const handleSmoothScroll = () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e: Event) => {
          const anchorElement = anchor as HTMLAnchorElement;
          const href = anchorElement.getAttribute('href');
          if (href && href !== '#') {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({
                behavior: 'smooth'
              });
              // Update URL without reload
              window.history.pushState(null, '', href);
            }
          }
        });
      });
    };

    // Fix for viewport height on mobile devices with address bar
    const fixViewportHeight = () => {
      const vhFixElements = document.querySelectorAll('[data-vh-fix]');
      vhFixElements.forEach(el => {
        (el as HTMLElement).style.height = `${window.innerHeight}px`;
      });
    };

    // Initialize all fixes
    setVhProperty();
    addBrowserClasses();
    window.addEventListener('keydown', handleFirstTab);
    handleSmoothScroll();
    fixViewportHeight();
    
    // Apply fixes on resize
    window.addEventListener('resize', () => {
      setVhProperty();
      fixViewportHeight();
    });
    
    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleFirstTab);
      window.removeEventListener('resize', setVhProperty);
      window.removeEventListener('resize', fixViewportHeight);
    };
  }, []);

  return null; // This component doesn't render anything
}