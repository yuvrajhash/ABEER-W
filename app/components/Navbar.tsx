"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const productsDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Set initial viewport width
      setViewportWidth(window.innerWidth);
      
      const handleScroll = () => {
        setScrolled(window.scrollY > 10);
      };

      const handleResize = () => {
        setViewportWidth(window.innerWidth);
        
        // Close mobile menu when resizing to desktop
        if (window.innerWidth >= 768) {
          setIsOpen(false);
        }
      };

      // Close dropdown when clicking outside
      const handleClickOutside = (event: MouseEvent) => {
        if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target as Node)) {
          setProductsOpen(false);
        }
      };

      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);
      document.addEventListener("mousedown", handleClickOutside);
      
      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    if (isOpen) {
      // Add class to prevent body scrolling when mobile menu is open
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
  ];

  const contactLink = { name: "Contact", href: "/contact" };

  const productCategories = [
    { name: "Herbal Extracts Ingredients", href: "/products/herbal-extracts-manufacturer" },
    { name: "Nutraceutical Ingredients", href: "/products/nutraceutical-ingredients-supplier" },
  ];

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  const linkVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.1 * custom, duration: 0.5, ease: "easeOut" }
    }),
    hover: {
      y: -2,
      color: "#FFA67E",
      transition: { duration: 0.2 }
    }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: { duration: 0.3, staggerChildren: 0.05, when: "beforeChildren" }
    },
    exit: {
      opacity: 0,
      y: -5,
      height: 0,
      transition: { duration: 0.2, when: "afterChildren", staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  const dropdownItemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.2 } },
    exit: { x: -10, opacity: 0, transition: { duration: 0.1 } },
    hover: {
      x: 5,
      color: "#FF7F41",
      transition: { duration: 0.2 }
    }
  };

  // Toggle products dropdown
  const handleProductsClick = () => {
    if (viewportWidth < 768) {
      setMobileProductsOpen(!mobileProductsOpen);
    } else {
      setProductsOpen(!productsOpen);
    }
  };

  // Add safe area insets for iOS devices
  const safeAreaClass = "env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)";

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`fixed top-0 left-0 w-full z-50 ${scrolled ? 'bg-dark-green shadow-lg' : 'bg-dark-green'} transition-all duration-500`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      {/* Sparkle animation elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="sparkle-1 absolute w-1.5 h-1.5 rounded-full bg-accent opacity-70 animate-pulse"></div>
        <div className="sparkle-2 absolute w-2 h-2 rounded-full bg-white opacity-60 animate-ping"></div>
        <div className="sparkle-3 absolute w-1.5 h-1.5 rounded-full bg-orange-light opacity-70 animate-pulse"></div>
        <div className="sparkle-4 absolute w-2.5 h-2.5 rounded-full bg-light-green opacity-50 animate-ping"></div>
        <div className="sparkle-5 absolute w-1.5 h-1.5 rounded-full bg-secondary opacity-60 animate-pulse"></div>
        <div className="sparkle-6 absolute w-2 h-2 rounded-full bg-accent opacity-65 animate-ping"></div>
        <div className="sparkle-7 absolute w-1.5 h-1.5 rounded-full bg-white opacity-55 animate-pulse"></div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-dark-green via-light-green to-orange opacity-90"></div>

      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center">
        {/* Logo */}
        <motion.div variants={logoVariants} className="mr-auto">
          <Link href="/" className="flex items-center">
            <div className="relative h-10 sm:h-14 w-auto flex items-center justify-center bg-white p-2 shadow-sm rounded-sm">
              <img
                src="/images/Abeer Logo Colour Percentage-02.png"
                alt="Abeer Pharmaceuticals Logo"
                className="h-full w-auto object-contain"
                style={{ filter: 'contrast(1.05) brightness(1.02)' }}
                loading="eager"
              />
            </div>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              custom={index}
              variants={linkVariants}
              whileHover="hover"
              className="flex items-center"
            >
              <Link href={link.href} className="relative text-white font-medium text-base tracking-wide group nav-link py-2 px-3 rounded-md hover:bg-white/10 transition-colors">
                {link.name}
              </Link>
            </motion.div>
          ))}

          <motion.div
            custom={navLinks.length}
            variants={linkVariants}
            className="relative flex items-center"
            ref={productsDropdownRef}
          >
            <button 
              className="flex items-center gap-1.5 text-white font-medium text-base tracking-wide cursor-pointer group nav-link py-2 px-3 rounded-md hover:bg-white/10 transition-colors"
              aria-expanded={productsOpen}
              aria-haspopup="true"
              onClick={handleProductsClick}
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              Products
              <motion.div animate={productsOpen ? { rotate: 180 } : { rotate: 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>

            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full right-0 md:left-1/2 md:-translate-x-1/2 mt-2 w-56 sm:w-64 md:w-72 max-w-[90vw] bg-white rounded-xl shadow-xl overflow-hidden z-50 border border-gray-100"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                  style={{
                    maxHeight: 'calc(100vh - 150px)',
                    overflowY: 'auto'
                  }}
                >
                  <div className="grid grid-cols-1 divide-y divide-gray-100">
                    {productCategories.map((category) => (
                      <motion.div
                        key={category.name}
                        variants={dropdownItemVariants}
                        whileHover="hover"
                      >
                        <Link
                          href={category.href}
                          className="px-5 py-4 text-gray-700 transition-colors flex items-center gap-2 font-medium text-sm hover:bg-gray-50"
                          onClick={() => setProductsOpen(false)}
                        >
                          {category.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            custom={navLinks.length + 1}
            variants={linkVariants}
            whileHover="hover"
            className="flex items-center"
          >
            <Link
              href={contactLink.href}
              className="relative text-white font-medium text-base tracking-wide group nav-link py-2 px-3 rounded-md hover:bg-white/10 transition-colors"
            >
              {contactLink.name}
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="block md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center p-2 rounded-md text-white hover:text-orange-light focus:outline-none active:bg-white/10"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-dark-green/95 backdrop-blur-sm border-t border-white/10 max-h-[80vh] overflow-y-auto"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="px-4 py-3 text-white hover:text-orange-light hover:bg-primary-dark/30 active:bg-primary-dark/50 rounded-md font-medium transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="relative">
                  <button
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    className="flex items-center justify-between w-full px-4 py-3 text-white hover:text-orange-light hover:bg-primary-dark/30 active:bg-primary-dark/50 rounded-md font-medium transition-colors"
                    aria-expanded={mobileProductsOpen}
                  >
                    <span>Products</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileProductsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-4 mt-1 border-l-2 border-l-primary-color/30 ml-4"
                      >
                        {productCategories.map((category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            className="block px-4 py-3 text-white hover:text-orange-light hover:bg-primary-dark/30 active:bg-primary-dark/50 rounded-md font-medium transition-colors text-sm"
                            onClick={() => {
                              setMobileProductsOpen(false);
                              setIsOpen(false);
                            }}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  href={contactLink.href}
                  className="px-4 py-3 text-white hover:text-orange-light hover:bg-primary-dark/30 active:bg-primary-dark/50 rounded-md font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {contactLink.name}
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
