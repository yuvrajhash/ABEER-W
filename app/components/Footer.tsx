"use client";

import Link from "next/link";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-darker-green text-white pt-12 pb-8 overflow-hidden">
      {/* Curved gradient at the top */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary via-secondary to-accent"></div>
      
      {/* Main footer content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Information */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-auto bg-white p-1.5 shadow-sm">
                <img
                  src="/images/Abeer Logo Colour Percentage-02.png" 
                  alt="Abeer Pharmaceuticals Logo"
                  className="h-full w-auto object-contain"
                />
              </div>
              <h3 className="font-bold text-white">AIPL Group</h3>
            </div>
            <p className="text-off-white mb-6 text-sm leading-relaxed">
              Your trusted partner in healthcare, providing premium herbal and nutraceutical
              products for humans and animals with a focus on quality and innovation.
            </p>
            <div className="flex items-center space-x-1 text-accent">
              <Heart size={14} className="animate-pulse" />
              <span className="text-sm">Made with care in India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 relative">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-accent"></span>
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-off-white hover:text-accent transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-off-white hover:text-accent transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products/herbal-extracts-manufacturer" className="text-off-white hover:text-accent transition-colors duration-200">
                  Herbal Extracts
                </Link>
              </li>
              <li>
                <Link href="/products/nutraceutical-ingredients-supplier" className="text-off-white hover:text-accent transition-colors duration-200">
                  Nutraceutical Ingredients
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-off-white hover:text-accent transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-white mb-4 relative">
              Our Products
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-accent"></span>
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products/herbal-extracts-manufacturer" className="text-off-white hover:text-accent transition-colors duration-200">
                  Herbal Extracts
                </Link>
              </li>
              <li>
                <Link href="/products/nutraceutical-ingredients-supplier" className="text-off-white hover:text-accent transition-colors duration-200">
                  Nutraceutical Ingredients
                </Link>
              </li>
           
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-bold text-white mb-4 relative">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-accent"></span>
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-off-white">
                156, Bahadarpur,Selaqui,Dehradun-248197,Uttrakhand
                </span>
              </li>
              <li className="flex items-start space-x-3">
  <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
  <a href="tel:+918791140933,+919818422865,+918979291134" className="text-off-white hover:text-accent transition-colors duration-200 space-y-1">
    <div>+91 87911 40933</div>
    <div>+91 98184 22865</div>
    <div>+91 89792 91134</div>
  </a>
</li>

              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a href="mailto:info@aiplgroup.com" className="text-off-white hover:text-accent transition-colors duration-200">
                 <div>pratik@aipl.org.in</div>
                  <div>parendra@aipl.org.in</div>
                </a>
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