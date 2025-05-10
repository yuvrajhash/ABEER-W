'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ThemeNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/theme-demo" className="flex items-center space-x-2">
            <div className="h-12 w-auto bg-white p-2 shadow-sm">
              <img 
                src="/images/Abeer Logo Colour Percentage-02.png" 
                alt="Abeer Pharmaceuticals Logo" 
                className="h-full w-auto object-contain"
              />
            </div>
            <span className="text-white font-bold text-xl">Medical Platform</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/theme-demo" className="nav-link">
              Home
            </Link>
            <Link href="/theme-demo" className="nav-link">
              Services
            </Link>
            <Link href="/theme-demo" className="nav-link">
              About
            </Link>
            <Link href="/theme-demo" className="nav-link">
              Contact
            </Link>
            <Link href="/theme-demo" className="btn btn-primary py-2 px-4">
              Get Started
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-primary py-4">
            <div className="container mx-auto flex flex-col space-y-4">
              <Link href="/theme-demo" className="text-white py-2 px-4 hover:bg-primary-dark hover:bg-opacity-20 rounded">
                Home
              </Link>
              <Link href="/theme-demo" className="text-white py-2 px-4 hover:bg-primary-dark hover:bg-opacity-20 rounded">
                Services
              </Link>
              <Link href="/theme-demo" className="text-white py-2 px-4 hover:bg-primary-dark hover:bg-opacity-20 rounded">
                About
              </Link>
              <Link href="/theme-demo" className="text-white py-2 px-4 hover:bg-primary-dark hover:bg-opacity-20 rounded">
                Contact
              </Link>
              <Link href="/theme-demo" className="btn btn-primary mx-4">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 