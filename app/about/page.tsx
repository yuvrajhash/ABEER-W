"use client";

import React, { useEffect, useState } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Leaf,
  FlaskConical,
  Star,
  Microscope,
  Users,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const FLOATING_WORDS = [
  "CoQ10", "Ashwagandha", "Curcumin", "D3", "Brahmi", "Magnesium",
  "Neem", "Glutathione", "Amla", "Tulsi",
];

const testimonials = [
  {
    name: "Adesh R.",
    title: "MD, Plenus Life Sciences Pvt Ltd. ",
    quote:
      "AIPL consistently delivers high-quality, innovative ingredients that meet the strictest regulatory standards.",
    imageUrl: "https://source.unsplash.com/100x100/?woman,doctor",
  },
  {
    name: "Karthik S Lyer",
    title: "CEO, Truhealhy Group",
    quote:
      "Their commitment to sustainability and quality assurance makes them a trusted partner in pharmaceutical manufacturing.",
    imageUrl: "https://source.unsplash.com/100x100/?man,business",
  },
];

const storyImages = [
  "/images/pexels-jonathanborba-17820720.jpg",
  "/images/mortar.webp",
  "/images/Untitled.jpg",
  "/images/pexels-jonathanborba-17820708.jpg",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
  }),
};

type ExpertiseItem = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const expertiseItems: ExpertiseItem[] = [
  {
    icon: <Microscope size={48} className="text-green-600" />,
    title: "Research & Development",
    description:
      "Pioneering research blending traditional herbal wisdom with cutting-edge scientific methodologies.",
  },
  {
    icon: <Leaf size={48} className="text-green-600" />,
    title: "Quality Sourcing",
    description:
      "Ethically sourcing the finest raw materials to ensure optimal potency and efficacy.",
  },
  {
    icon: <FlaskConical size={48} className="text-green-600" />,
    title: "Advanced Formulation",
    description:
      "Creating innovative, stable, and bioavailable formulations for maximum therapeutic benefit.",
  },
  {
    icon: <ShieldCheck size={48} className="text-green-600" />,
    title: "Quality Assurance",
    description:
      "Rigorous quality control processes that exceed global regulatory standards.",
  },
  {
    icon: <Users size={48} className="text-green-600" />,
    title: "Collaborative Partnerships",
    description:
      "Building lasting relationships with clients and partners for mutual growth.",
  },
  {
    icon: <Star size={48} className="text-green-600" />,
    title: "Global Compliance",
    description:
      "Meeting international regulatory requirements across diverse markets.",
  },
];

export default function AboutPage() {
  const [floatingWords, setFloatingWords] = useState<
    {
      word: string;
      left: string;
      top: string;
      size: number;
      rotate: number;
      delay: number;
      color: string;
    }[]
  >([]);

  useEffect(() => {
    setFloatingWords(
      FLOATING_WORDS.map((word) => ({
        word,
        left: `${Math.random() * 90}%`,
        top: `${Math.random() * 80}%`,
        size: 60 + Math.random() * 40,
        rotate: Math.random() * 360,
        delay: Math.random() * 10,
        color: Math.random() > 0.5 ? "#22c55e" : "#fb923c",
      }))
    );
  }, []);

  return (
    <ParallaxProvider>
      <div className="relative min-h-screen bg-gradient-to-tr from-[#f0fdfa] via-white to-[#f0fdfa] overflow-x-hidden font-sans pt-24 pb-24">
        {/* Floating Words Background */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          {floatingWords.map(({ word, left, top, size, rotate, delay, color }, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.15, rotate }}
              animate={{
                y: [0, 15, 0],
                opacity: [0.15, 0.3, 0.15],
                rotate: [rotate, rotate + 360],
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                repeatType: "loop",
                delay,
                ease: "easeInOut",
              }}
              className="absolute font-extrabold select-none pointer-events-none"
              style={{
                left,
                top,
                fontSize: size,
                color,
                filter: "blur(0.4px)",
                userSelect: "none",
                whiteSpace: "nowrap",
                textShadow: "0 0 6px rgba(0,0,0,0.05)",
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Hero Section */}
        <section className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40, letterSpacing: "-0.1em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.05em" }}
            transition={{ duration: 1.2 }}
            className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-green-600 via-teal-500 to-blue-600 bg-clip-text text-transparent drop-shadow-lg"
          >
            About AIPL Group
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-green-800 text-2xl mt-6 max-w-3xl mx-auto font-light"
          >
            Pioneering Excellence in Herbal & Nutraceutical Science
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "7rem" }}
            transition={{ delay: 1, duration: 1 }}
            className="mx-auto h-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mt-8"
          />
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex justify-center mt-12"
          >
            <ChevronDown size={36} className="text-green-600 animate-bounce" />
          </motion.div>
        </section>

        {/* Content Sections */}
        <section className="container mx-auto max-w-7xl px-6 space-y-32 mt-24 relative z-10">

          {/* Company Overview */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="bg-white rounded-3xl shadow-xl p-14"
          >
            <h2 className="text-4xl font-extrabold text-green-700 flex items-center gap-4 mb-8">
              <Leaf size={44} /> Company Overview
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto">
              With over six years of expertise, AIPL is a vertically integrated herbaceutical and nutraceutical enterprise from India - rooted in tradition and powered by science. We specialize in natural ingredients, custom formulations, manufacturing, and branding, delivering safe, effective, and customizable wellness solutions for human and animal health across global markets, backed by full regulatory and quality compliance.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto mt-6">
              Our core focus is on innovation, quality, and sustainability, ensuring that our products meet global regulatory standards and improve health outcomes worldwide.
            </p>
          </motion.div>

          {/* Mission & Vision */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="grid grid-cols-1 md:grid-cols-2 gap-14"
          >
            {/* Mission */}
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(34,197,94,0.3)" }}
              className="bg-gradient-to-tr from-green-100 to-white rounded-3xl p-12 shadow-lg cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-6">
                <FlaskConical size={40} className="text-green-600" />
                <h3 className="text-3xl font-bold text-green-700">Our Mission</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Empowering a healthier world through the potential of nature. We aim to revolutionize the nutraceutical industry through continuous research and development of breakthrough herbal extracts. Leveraging innovation to deliver a constant flow of clinically supported herbal medicines to patients globally.
              </p>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "70px" }}
                transition={{ duration: 1 }}
                className="h-1 bg-gradient-to-r from-green-500 to-green-700 rounded-full mt-8"
              />
            </motion.div>

            {/* Vision */}
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(251,146,60,0.3)" }}
              className="bg-gradient-to-tr from-orange-100 to-white rounded-3xl p-12 shadow-lg cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-6">
                <Star size={40} className="text-orange-500" />
                <h3 className="text-3xl font-bold text-orange-600">Our Vision</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                We are committed to become the world’s leading manufacturer of high-quality, sustainable herbal extracts and set the industry standard for excellence in quality-driven, environmentally conscious herbal extract manufacturing.
              </p>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "70px" }}
                transition={{ duration: 1 }}
                className="h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mt-8"
              />
            </motion.div>
          </motion.div>

          {/* Story */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            className="bg-white rounded-3xl shadow-xl p-14"
          >
            <h2 className="text-4xl font-extrabold text-blue-800 mb-10 flex items-center gap-4">
              <Users size={44} className="text-teal-500" /> Our Story
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-blue-900 text-lg leading-relaxed space-y-6 max-w-xl">
                <p>
                  AIPL Group began its journey in 2021 with a bold and purposeful vision - to bridge the ancient wisdom of Indian herbal medicine with the evolving demands of modern nutraceutical science. Drawing on the deep legacy of Ayurveda and the healing power of nature, we set out to create wellness solutions that are not only effective and safe, but also globally relevant.
                </p>
                <p>
                  Over the years, we have built a fully integrated ecosystem, offering everything from raw herbal materials to finished, branded consumer products. Our capabilities span custom formulation, private label manufacturing, branding, labeling, packaging, and regulatory compliance - making us a true one-stop solution for wellness businesses around the world.
                </p>
                <p>
                  Headquartered in Uttrakhand, India - the birthplace of Ayurveda - AIPL Group operates with a unique blend of traditional knowledge and cutting-edge technology. Our state-of-the-art manufacturing units and advanced R&D infrastructure are supported by a team of dedicated scientists, quality experts, and industry professionals, all united by a commitment to excellence.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {storyImages.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.15 }}
                    className="relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  >
                    <Image
                      src={src}
                      alt={`Story image ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover"
                      priority={i < 2}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Expertise */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
            className="text-center"
          >
            <h2 className="text-4xl font-extrabold text-green-800 mb-6">
              Our Expertise
            </h2>
            <div className="mx-auto h-1 w-24 bg-gradient-to-r from-green-600 to-teal-500 rounded-full mb-12"></div>
            <p className="text-gray-700 max-w-3xl mx-auto mb-14 text-lg">
              We combine scientific innovation with traditional knowledge to create exceptional pharmaceutical products.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {expertiseItems.map(({ icon, title, description }) => (
                <motion.div
                  key={title}
                  whileHover={{ scale: 1.06, y: -8, boxShadow: "0 12px 40px rgba(34,197,94,0.15)" }}
                  className="bg-gradient-to-br from-green-50 via-white to-green-100 rounded-3xl p-8 shadow-lg cursor-pointer transition-transform"
                >
                  <div className="mb-6">{icon}</div>
                  <h3 className="text-2xl font-bold text-green-700 mb-3">{title}</h3>
                  <p className="text-gray-700">{description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={5}
            className="text-center max-w-6xl mx-auto"
          >
            <h2 className="text-4xl font-extrabold text-green-800 mb-6">
              What Our Partners Say
            </h2>
            <div className="mx-auto h-1 w-24 bg-gradient-to-r from-green-600 to-teal-500 rounded-full mb-12"></div>
            <div className="flex flex-col md:flex-row gap-12 justify-center">
              {testimonials.map(({ name, title, quote, imageUrl }, i) => (
                <motion.div
                  key={name}
                  whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(251,146,60,0.15)" }}
                  className="bg-white rounded-3xl shadow-lg p-8 max-w-md mx-auto cursor-pointer"
                >
                  <div className="flex items-center gap-5 mb-6">
                    <Image
                      src={imageUrl}
                      alt={name}
                      width={64}
                      height={64}
                      className="rounded-full object-cover border-2 border-green-600"
                      priority={i === 0}
                    />
                    <div className="text-left">
                      <h4 className="text-xl font-bold text-green-700">{name}</h4>
                      <p className="text-green-500 text-sm">{title}</p>
                    </div>
                  </div>
                  <p className="italic text-gray-700">"{quote}"</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={6}
            className="relative flex justify-center mt-20"
          >
            {/* Glowing background */}
            <motion.div
              initial={{ opacity: 0.15, scale: 0.9 }}
              animate={{ opacity: [0.15, 0.3, 0.15], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 6, repeat: Infinity, repeatType: "loop" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[240px] bg-gradient-to-tr from-green-400 via-teal-300 to-blue-400 rounded-3xl blur-3xl z-0"
            />
            <div className="relative z-10 w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-14 flex flex-col items-center">
              <h3 className="text-4xl font-extrabold text-green-700 mb-4 text-center">
                Ready to Partner with AIPL Group?
              </h3>
              <p className="text-green-600 text-lg max-w-xl mb-8 text-center font-medium">
                Join us in shaping the future of herbal and nutraceutical science. Collaborate with a global leader committed to quality, innovation, and sustainability.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
              >
                <PhoneCall size={24} />
                Contact Us
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </ParallaxProvider>
  );
}
