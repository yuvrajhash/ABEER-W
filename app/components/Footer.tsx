"use client";

import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <footer className="relative bg-darker-green text-white pt-12 pb-8 overflow-hidden">
      {/* Curved gradient at the top */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary via-secondary to-accent"></div>
      
      {/* Main footer content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
          {/* Company Information */}
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-auto bg-white p-1.5 shadow-sm rounded-sm">
                <img
                  src="/images/Abeer Logo Colour Percentage-02.png" 
                  alt="Abeer Pharmaceuticals Logo"
                  className="h-full w-auto object-contain"
                  loading="lazy"
                />
              </div>
              <h3 className="font-bold text-white text-lg">AIPL Group</h3>
            </div>
            <p className="text-off-white mb-6 text-sm md:text-base leading-relaxed max-w-xs">
              Your trusted partner in healthcare, providing premium herbal and nutraceutical
              products for humans and animals with a focus on quality and innovation.
            </p>
            <div className="flex items-center space-x-1 text-accent">
              <Heart size={14} className="animate-pulse" />
              <span className="text-sm">Made with care in India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-6 md:mb-0">
            <h4 className="font-bold text-white mb-4 text-lg relative">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-accent"></span>
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/" 
                  className="text-off-white hover:text-accent active:text-accent transition-colors duration-200 block py-2 px-1 -mx-1 rounded"
                  onClick={(e) => {
                    // For client-side navigation while ensuring the link works
                    if (window.location.pathname === "/") {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="/about" 
                  className="text-off-white hover:text-accent active:text-accent transition-colors duration-200 block py-2 px-1 -mx-1 rounded"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="/products/herbal-extracts-manufacturer" 
                  className="text-off-white hover:text-accent active:text-accent transition-colors duration-200 block py-2 px-1 -mx-1 rounded"
                >
                  Herbal Extracts
                </a>
              </li>
              <li>
                <a 
                  href="/products/nutraceutical-ingredients-supplier" 
                  className="text-off-white hover:text-accent active:text-accent transition-colors duration-200 block py-2 px-1 -mx-1 rounded"
                >
                  Nutraceutical Ingredients
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  className="text-off-white hover:text-accent active:text-accent transition-colors duration-200 block py-2 px-1 -mx-1 rounded"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div className="mb-6 md:mb-0">
            <h4 className="font-bold text-white mb-4 text-lg relative">
              Our Products
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-accent"></span>
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/products/herbal-extracts-manufacturer" 
                  className="text-off-white hover:text-accent active:text-accent transition-colors duration-200 block py-2 px-1 -mx-1 rounded"
                >
                  Herbal Extracts
                </a>
              </li>
              <li>
                <a 
                  href="/products/nutraceutical-ingredients-supplier" 
                  className="text-off-white hover:text-accent active:text-accent transition-colors duration-200 block py-2 px-1 -mx-1 rounded"
                >
                  Nutraceutical Ingredients
                </a>
              </li>
           
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg relative">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-accent"></span>
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-off-white text-sm md:text-base">
                  156, Bahadarpur, Selaqui, Dehradun-248197, Uttrakhand
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div className="text-off-white">
                  <a 
                    href="tel:+918791140933" 
                    className="block hover:text-accent text-white active:text-accent transition-colors duration-200 py-1.5 text-sm md:text-base"
                  >
                    +91 87911 40933
                  </a>
                  <a 
                    href="tel:+919818422865" 
                    className="block hover:text-accent text-white active:text-accent transition-colors duration-200 py-1.5 text-sm md:text-base"
                  >
                    +91 98184 22865
                  </a>
                  <a 
                    href="tel:+918979291134" 
                    className="block hover:text-accent text-white active:text-accent transition-colors duration-200 py-1.5 text-sm md:text-base"
                  >
                    +91 89792 91134
                  </a>
                </div>
              </li>

              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div className="text-off-white">
                  <a 
                    href="mailto:pratik@aipl.org.in" 
                    className="block hover:text-accent text-white active:text-accent transition-colors duration-200 py-1.5 text-sm md:text-base break-words"
                  >
                    pratik@aipl.org.in
                  </a>
                  <a 
                    href="mailto:parendra@aipl.org.in" 
                    className="block hover:text-accent text-white active:text-accent transition-colors duration-200 py-1.5 text-sm md:text-base break-words"
                  >
                    parendra@aipl.org.in
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Bottom Links */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-off-white text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} AIPL Group. All rights reserved.
          </p>
          
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-5">
        <div className="absolute top-1/4 -left-24 w-64 h-64 rounded-full bg-orange"></div>
        <div className="absolute top-3/4 -right-32 w-80 h-80 rounded-full bg-primary"></div>
      </div>
    </footer>
  );
};

export default Footer;