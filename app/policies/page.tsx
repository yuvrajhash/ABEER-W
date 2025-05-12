"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, FileText, Truck, CreditCard } from "lucide-react";

export default function PoliciesPage() {
  const [activeTab, setActiveTab] = useState("privacy");

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const tabs = [
    {
      id: "privacy",
      label: "Privacy Policy",
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: "terms",
      label: "Terms of Service",
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: "shipping",
      label: "Shipping Policy",
      icon: <Truck className="w-5 h-5" />
    },
    {
      id: "payment",
      label: "Payment Policy",
      icon: <CreditCard className="w-5 h-5" />
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Refined */} 
      <section className="relative py-20 bg-blue-700">
        <div className="container mx-auto px-4 text-white">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h1 
              variants={fadeIn}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Our Policies
            </motion.h1>
            <motion.p 
              variants={fadeIn}
              className="text-xl text-white"
            >
              Important information about how we operate
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Policies Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Tabs */}
            <div className="flex flex-wrap mb-8 border-b">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                    activeTab === tab.id
                      ? "text-blue-700 border-b-2 border-blue-700"
                      : "text-gray-700 hover:text-blue-700"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
            
            {/* Tab Content */} 
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              {activeTab === "privacy" && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Privacy Policy</h2>
                  
                  <div className="space-y-6 text-gray-700">
                    <p>
                      Last Updated: March 15, 2025
                    </p>
                    
                    <h3 className="text-xl font-semibold text-gray-800">1. Introduction</h3>
                    <p>
                      At AIPL Group, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make purchases from us.
                    </p>
                    
                    <h3 className="text-xl font-semibold text-gray-800">2. Information We Collect</h3>
                    <p>
                      We collect several types of information from and about users of our website, including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Personal identifiers such as name, postal address, email address, telephone number, and payment information.</li>
                      <li>Information about your internet connection, the equipment you use to access our website, and usage details.</li>
                      <li>Health information that you voluntarily provide when consulting with our pharmacists or when filling prescriptions.</li>
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}