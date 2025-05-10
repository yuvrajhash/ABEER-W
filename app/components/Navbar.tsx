"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setScrolled(window.scrollY > 10);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

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

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className="fixed top-0 left-0 w-full z-50 bg-dark-green shadow-md transition-all duration-500"
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
            <div className="relative h-14 w-auto flex items-center justify-center bg-white p-2 shadow-sm">
              <img
                src="/images/Abeer Logo Colour Percentage-02.png"
                alt="Abeer Pharmaceuticals Logo"
                className="h-full w-auto object-contain"
                style={{ filter: 'contrast(1.05) brightness(1.02)' }}
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
            >
              <Link href={link.href} className="relative text-white font-medium text-base tracking-wide group nav-link">
                {link.name}
              </Link>
            </motion.div>
          ))}

          <motion.div
            custom={navLinks.length}
            variants={linkVariants}
            className="relative"
            onHoverStart={() => setProductsOpen(true)}
            onHoverEnd={() => setProductsOpen(false)}
          >
            <div className="flex items-center gap-1.5 text-white font-medium text-base tracking-wide cursor-pointer group nav-link">
              Products
              <motion.div animate={productsOpen ? { rotate: 180 } : { rotate: 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </div>

            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-72 bg-white rounded-xl shadow-xl overflow-hidden z-50 border border-gray-100"
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
                          className="px-5 py-3.5 text-gray-700 transition-colors flex items-center gap-2 font-medium text-sm"
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
          >
            <Link
              href={contactLink.href}
              className="relative text-white font-medium text-base tracking-wide group nav-link"
            >
              {contactLink.name}
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="block md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center p-2 rounded-md text-white hover:text-orange-light focus:outline-none"
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
            className="md:hidden bg-dark-green/90 backdrop-blur-sm border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="px-4 py-2 text-white hover:text-orange-light hover:bg-primary-dark/30 rounded-md font-medium transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="relative">
                  <button
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    className="flex items-center justify-between w-full px-4 py-2 text-white hover:text-orange-light hover:bg-primary-dark/30 rounded-md font-medium transition-colors"
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
                        className="mt-1 ml-4 border-l-2 border-accent pl-4"
                      >
                        {productCategories.map((category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            className="block px-4 py-2 text-white/90 hover:text-accent hover:bg-primary-dark/30 rounded-md text-sm transition-colors"
                            onClick={() => setIsOpen(false)}
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
                  className="px-4 py-2 text-white hover:text-orange-light hover:bg-primary-dark/30 rounded-md font-medium transition-colors"
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
