'use client';

import React from 'react';
import Link from 'next/link';

export default function ThemeFooter() {
  return (
    <footer className="bg-darker-green text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="h-10 w-auto mr-2 bg-white p-1.5 shadow-sm">
                <img 
                  src="/images/Abeer Logo Colour Percentage-02.png" 
                  alt="Abeer Pharmaceuticals Logo" 
                  className="h-full w-auto object-contain"
                />
              </div>
              <h3 className="text-xl font-bold">Medical Platform</h3>
            </div>
            <p className="text-off-white mb-4">Your trusted partner in healthcare technology and services.</p>
            <div className="flex space-x-4">
              {/* Social Icons */}
              <a href="#" className="text-white hover:text-orange transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-orange transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.486 2 2 6.486 2 12c0 5.514 4.486 10 10 10 5.514 0 10-4.486 10-10 0-5.514-4.486-10-10-10zm4.2 13.631-2.445.123.104-1.771c-2.038 1.506-3.769-.148-3.769-.148.879-2.107 2.594-2.211 3.021-2.256.427-.044 1.428.084 1.976.456 0 0 .615-.588.527-1.147-.088-.561-.702-.702-.702-.702s-1.581-.351-3.467.175c-1.886.527-2.982 2.212-3.293 3.766-.312 1.554.395 3.38 2.719 3.662 2.323.281 4.33-1.076 4.33-1.076l-.001-1.082z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-orange transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 22 5.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.072 4.072 0 0 1 2.8 9.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.095 4.095 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 18.407a11.616 11.616 0 0 0 6.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-off-white hover:text-orange">About Us</Link></li>
              <li><Link href="#" className="text-off-white hover:text-orange">Careers</Link></li>
              <li><Link href="#" className="text-off-white hover:text-orange">Our Team</Link></li>
              <li><Link href="#" className="text-off-white hover:text-orange">News</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-off-white hover:text-orange">Blog</Link></li>
              <li><Link href="#" className="text-off-white hover:text-orange">Documentation</Link></li>
              <li><Link href="#" className="text-off-white hover:text-orange">Help Center</Link></li>
              <li><Link href="#" className="text-off-white hover:text-orange">Research</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-off-white">123 Medical Drive<br />Healthcare City, MD 12345</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-off-white">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-off-white">contact@medicalplatform.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-off-white text-sm">&copy; 2023 Medical Platform. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li><Link href="#" className="text-off-white hover:text-orange text-sm">Privacy Policy</Link></li>
              <li><Link href="#" className="text-off-white hover:text-orange text-sm">Terms of Service</Link></li>
              <li><Link href="#" className="text-off-white hover:text-orange text-sm">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
} 