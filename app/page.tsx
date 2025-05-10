"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Truck, HeartPulse, Mail, Leaf, Factory, TestTube2, Tags } from "lucide-react";

export default function Home() {
  // --- Animation Variants ---
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };
  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } }
  };
  const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };
  const slideInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  const staggerSlow = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.25, delayChildren: 0.2 } }
  };
  const floatAnimation = {
    initial: { y: 0 },
    animate: {
      y: ["-8px", "8px", "-8px"],
      transition: { duration: 5, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }
    }
  };
  const pulseAnimation = {
    initial: { scale: 1, opacity: 0.8 },
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: { duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }
    }
  };

  // --- Services Data for ServicesHero Section ---
  const services = [
    {
      title: "Sourcing & Supply of Raw Materials",
      icon: <Leaf className="w-6 h-6 text-green-600" />,
      description: "High-purity herbal extracts, powders, and nutraceutical ingredients derived from nature under stringent quality control."
    },
    {
      title: "Private Labeling & Branding Solutions",
      icon: <Tags className="w-6 h-6 text-blue-600" />,
      description: "Complete brand building support from product development to market positioning tailored to your brand's identity."
    },
    {
      title: "Product Manufacturing",
      icon: <Factory className="w-6 h-6 text-orange-600" />,
      description: "Custom formulations including capsules, tablets, powders and topical applications manufactured in GMP-certified facilities."
    },
    {
      title: "Quality & Regulatory Compliance",
      icon: <TestTube2 className="w-6 h-6 text-purple-600" />,
      description: "Rigorous testing adhering to AYUSH, FSSAI and WHO-GMP standards."
    }
  ];

  return (
    <div className="overflow-hidden font-sans">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/main2.jpg"
            alt="Pharmaceutical laboratory"
            fill
            className="object-cover brightness-[0.65] scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/70"></div>
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/30 blur-3xl"
            initial={pulseAnimation.initial}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8],
              transition: { duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }
            }}
          ></motion.div>
          <motion.div
            className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-indigo-500/30 blur-3xl"
            initial={pulseAnimation.initial}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8],
              transition: { duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }
            }}
          ></motion.div>
          {/* DNA Helix Animation */}
          <div className="absolute left-10 top-1/4 bottom-1/4 w-16 opacity-30">
            <motion.div
              className="absolute top-0 w-4 h-4 rounded-full bg-blue-400"
              initial={{ y: 0 }}
              animate={{ y: [0, 200, 400, 600, 400, 200, 0], x: [0, 8, 0, 8, 0, 8, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute top-0 w-3 h-3 rounded-full bg-purple-400"
              initial={{ y: 150 }}
              animate={{ y: [150, 350, 550, 350, 150, -50, 150], x: [8, 0, 8, 0, 8, 0, 8] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute top-0 w-2 h-2 rounded-full bg-indigo-400"
              initial={{ y: 300 }}
              animate={{ y: [300, 500, 300, 100, -100, 100, 300], x: [0, 8, 0, 8, 0, 8, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </div>
          {/* Floating Medical Icons */}
          <motion.div
            className="absolute top-20 right-20 text-white/30"
            initial={{ y: 0 }}
            animate={{ 
              y: [0, -20, 0],
              transition: { duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }
            }}
          >
            <HeartPulse size={48} />
          </motion.div>
          <motion.div
            className="absolute bottom-40 left-40 text-white/30"
            initial={{ y: 0 }}
            animate={{ 
              y: [0, -20, 0],
              transition: { duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19.25 4.75H4.75V19.25H19.25V4.75Z" />
              <path d="M9.75 8.75V15.25" />
              <path d="M14.25 8.75V15.25" />
              <path d="M7.75 12H16.25" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute top-40 right-1/3 text-white/30"
            initial={{ y: 0 }}
            animate={{ 
              y: [0, -20, 0],
              transition: { duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }
            }}
            style={{ animationDelay: "2s" }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="7" />
              <path d="M12 9V15" />
              <path d="M9 12H15" />
            </svg>
          </motion.div>
        </div>
        <div className="container mx-auto px-6 z-10 text-white">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-block mb-5 px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-base font-semibold tracking-wide"
            >
              Pure Ingredients Powerful Results
            </motion.span>
            <motion.h1
  variants={{
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  }}
  className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight text-shadow-sm"
>
  <span className="text-green-500">Rooted In Nature,</span> <br />
  Growing With{" "}
  <span className="relative inline-block text-white">
    You
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{ delay: 1, duration: 1.2 }}
      className="absolute -bottom-2 left-0 h-1 bg-blue-400 rounded-full opacity-80"
    />
  </span>
</motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.2 } }
              }}
              className="text-xl md:text-2xl mb-8 max-w-xl text-white leading-relaxed font-light"
            >
              Pioneering healthcare solutions with cutting-edge research, natural ingredients, and scientific innovation.
            </motion.p>
            {/* Medical Icons Row */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.6 } }
              }}
              className="flex flex-wrap gap-6 mb-12"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <span className="text-base font-medium">Clinically Tested</span>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-base font-medium">Advanced Formulas</span>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
                    <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
                  </svg>
                </div>
                <span className="text-base font-medium">Natural Ingredients</span>
              </motion.div>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.8 } }
              }}
              className="flex flex-wrap gap-5"
            >
              <Link
                href="/products/herbal-extracts-manufacturer"
                className="bg-white/15 backdrop-blur-md hover:bg-white/25 text-white px-8 py-4 rounded-full font-semibold inline-flex items-center gap-3 transition-all border border-white/30 hover:translate-y-[-5px] shadow-lg relative overflow-hidden group text-base"
              >
                <span>Herbal Extracts Ingredients</span>
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </Link>
              <Link
                href="/products/nutraceutical-ingredients-supplier"
                className="bg-white/15 backdrop-blur-md hover:bg-white/25 text-white px-8 py-4 rounded-full font-semibold inline-flex items-center gap-3 transition-all border border-white/30 hover:translate-y-[-5px] shadow-lg relative overflow-hidden group text-base"
              >
                <span className="relative z-10">Nutraceutical Ingredients</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/20 group-hover:via-indigo-500/20 group-hover:to-purple-500/20 transition-all duration-700"></div>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  className="absolute -right-2 -top-2 w-16 h-16 bg-blue-500/20 rounded-full blur-xl"
                />
              </Link>
            </motion.div>
            {/* Medical-themed scroll indicator */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            >
              <span className="text-base text-white mb-3 font-medium">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-8 h-12 rounded-full border-2 border-white/40 flex items-center justify-center"
              >
                <motion.div
                  animate={{ height: ["20%", "40%", "20%"] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 bg-white/80 rounded-full"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- SERVICES HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/fabio-oyXis2kALVg-unsplash.jpg"
            alt="Pharmaceutical Manufacturing Facility"
            fill
            className="object-cover opacity-20"
            priority
          />
         <div className="absolute inset-0 bg-white" />
        </div>
        {/* Content Container */}
        <div className="container mx-auto px-4 py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content Section */}
              <div className="space-y-8">
                {/* Section Header */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    Solutions That<br />
                    <span className="text-green-600">We Deliver</span>
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    End-to-end services across the herbaceutical and nutraceutical value chain
                  </p>
                </motion.div>
                {/* Services List */}
                <div className="space-y-8">
                  {services.map((service, index) => (
                    <motion.div
                      key={index}
                      initial="hidden"
                      animate="visible"
                      variants={fadeIn}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-opacity-20 backdrop-blur-sm">
                          {service.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                          <p className="text-gray-600">{service.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative h-96 rounded-3xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="/images/dna-163466_1920.jpg"
                  alt="Quality Control Laboratory"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- WHAT SETS US APART SECTION --- */}
      <section className="relative min-h-[60vh] flex items-center">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/main.jpg"
            alt="Lab Equipment"
            fill
            className="object-cover opacity-10"
            priority
          />
          <div className="absolute inset-0 bg-white/90" />
        </div>
        {/* Content Container */}
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              What Sets <span className="text-green-600">Us Apart?</span>
            </h2>
            <p className="text-lg text-gray-600 mb-10 max-w-3xl">
              Discover the unique strengths that make us a trusted partner for herbal and nutraceutical solutions.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-start gap-4"
              >
                <ShieldCheck className="w-10 h-10 text-blue-500 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">Uncompromising Quality</h3>
                  <p className="text-gray-600">
                    Every product is crafted under stringent quality control, using premium raw materials and validated processes.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-start gap-4"
              >
                <TestTube2 className="w-10 h-10 text-purple-500 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">Innovative R&D</h3>
                  <p className="text-gray-600">
                    Our dedicated research team continually develops new formulations, blending ancient knowledge with modern science.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-start gap-4"
              >
                <Truck className="w-10 h-10 text-orange-500 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">Reliable Global Supply</h3>
                  <p className="text-gray-600">
                    We ensure timely delivery and consistent supply to clients worldwide, supported by robust logistics.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-start gap-4"
              >
                <HeartPulse className="w-10 h-10 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">Customer-Centric Approach</h3>
                  <p className="text-gray-600">
                    Your success is our mission. We offer tailored solutions and dedicated support at every step.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
