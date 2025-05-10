'use client';

import { useEffect } from 'react';

export default function ThemeAnimations() {
  useEffect(() => {
    // Scroll reveal animations
    const handleScrollReveal = () => {
      const elements = document.querySelectorAll('.scroll-reveal');
      
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };
    
    // Button hover effects
    const setupButtonEffects = () => {
      const buttons = document.querySelectorAll('.btn, button:not(.no-animation), a.btn');
      
      buttons.forEach((button) => {
        button.addEventListener('mousedown', () => {
          button.classList.add('scale-95');
          setTimeout(() => {
            button.classList.remove('scale-95');
          }, 200);
        });
      });
    };
    
    // Card hover effects
    const setupCardEffects = () => {
      const cards = document.querySelectorAll('.card, .dashboard-card');
      
      cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          card.classList.add('hover-lift');
        });
        
        card.addEventListener('mouseleave', () => {
          card.classList.remove('hover-lift');
        });
      });
    };

    // Form focus effects
    const setupFormEffects = () => {
      const formElements = document.querySelectorAll('input, select, textarea');
      
      formElements.forEach((element) => {
        element.addEventListener('focus', () => {
          const parent = element.parentElement;
          if (parent) {
            parent.classList.add('form-element-focused');
          }
        });
        
        element.addEventListener('blur', () => {
          const parent = element.parentElement;
          if (parent) {
            parent.classList.remove('form-element-focused');
          }
        });
      });
    };
    
    // Initialize animations
    handleScrollReveal();
    setupButtonEffects();
    setupCardEffects();
    setupFormEffects();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollReveal);
    
    // Cleanup event listeners
    return () => {
      window.removeEventListener('scroll', handleScrollReveal);
    };
  }, []);
  
  return null;
} 