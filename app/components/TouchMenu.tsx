"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

interface MenuItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

interface TouchMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
}

const TouchMenu = ({ isOpen, onClose, items }: TouchMenuProps) => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Handle swipe gestures to close menu
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
      setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY === null || touchStartX === null) return;
      
      const currentY = e.touches[0].clientY;
      const currentX = e.touches[0].clientX;
      
      // Calculate distance moved
      const deltaY = touchStartY - currentY;
      const deltaX = touchStartX - currentX;
      
      // Detect swipe direction
      if (Math.abs(deltaX) > 50 && deltaX > 0 && Math.abs(deltaX) > Math.abs(deltaY)) {
        // Swipe left to close
        onClose();
        setTouchStartY(null);
        setTouchStartX(null);
      }
    };

    const element = menuRef.current;
    if (element) {
      element.addEventListener('touchstart', handleTouchStart);
      element.addEventListener('touchmove', handleTouchMove);
      
      return () => {
        element.removeEventListener('touchstart', handleTouchStart);
        element.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, [touchStartY, touchStartX, onClose]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close menu on navigation
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const menuVariants = {
    closed: {
      x: '100%',
      transition: { type: 'tween', duration: 0.25, ease: 'easeIn' }
    },
    open: {
      x: '0%',
      transition: { type: 'tween', duration: 0.35, ease: 'easeOut' }
    }
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: { duration: 0.25 }
    },
    open: {
      opacity: 1,
      transition: { duration: 0.35 }
    }
  };

  const itemVariants = {
    closed: { x: 20, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: 0.1 + i * 0.1, duration: 0.35 }
    })
  };

  const handleSubmenuToggle = (name: string) => {
    if (activeSubmenu === name) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(name);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background overlay */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 touch-none"
            onClick={onClose}
          />
          
          {/* Menu panel */}
          <motion.div
            ref={menuRef}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white shadow-xl z-50 overflow-hidden flex flex-col"
            style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            {/* Menu header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Menu</h2>
              <button 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18"></path>
                  <path d="M6 6L18 18"></path>
                </svg>
              </button>
            </div>
            
            {/* Menu items */}
            <div className="flex-1 overflow-y-auto momentum-scroll">
              <motion.ul className="py-2">
                {items.map((item, i) => (
                  <motion.li 
                    key={item.name}
                    custom={i}
                    variants={itemVariants}
                    className="relative"
                  >
                    {item.children ? (
                      <>
                        <button
                          onClick={() => handleSubmenuToggle(item.name)}
                          className="w-full flex items-center justify-between px-6 py-4 text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                          aria-expanded={activeSubmenu === item.name}
                        >
                          <span className="flex items-center gap-3">
                            {item.icon && <span className="text-primary">{item.icon}</span>}
                            <span className="font-medium">{item.name}</span>
                          </span>
                          <ChevronRight 
                            className={`w-5 h-5 transition-transform ${activeSubmenu === item.name ? 'rotate-90' : ''}`}
                          />
                        </button>
                        
                        <AnimatePresence>
                          {activeSubmenu === item.name && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="bg-gray-50 overflow-hidden"
                            >
                              {item.children.map((child) => (
                                <li key={child.name}>
                                  <Link
                                    href={child.href}
                                    className={`block pl-12 pr-6 py-3.5 ${pathname === child.href ? 'text-primary font-medium' : 'text-gray-600'} hover:bg-gray-100 active:bg-gray-200 transition-colors`}
                                  >
                                    {child.name}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-6 py-4 ${pathname === item.href ? 'text-primary font-medium' : 'text-gray-700'} hover:bg-gray-50 active:bg-gray-100 transition-colors`}
                      >
                        {item.icon && <span className="text-primary">{item.icon}</span>}
                        <span>{item.name}</span>
                      </Link>
                    )}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            
            {/* Menu footer */}
            <div className="border-t border-gray-100 px-6 py-4">
              <Link
                href="/contact"
                className="block w-full py-3 px-4 bg-primary text-white rounded-md text-center font-medium hover:bg-primary/90 active:bg-primary/80 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TouchMenu; 