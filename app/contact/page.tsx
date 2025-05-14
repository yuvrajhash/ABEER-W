"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"; // Added social icons
import dynamic from "next/dynamic";
import { submitContactForm } from "../actions/contact"; // Import the server action

const MapSection = dynamic(() => import("../components/MapSection"), { 
  ssr: false,
  loading: () => (
    <div className="rounded-lg overflow-hidden shadow-lg h-[400px] relative bg-gray-200 flex items-center justify-center"> {/* Adjusted background */} 
      <p className="text-gray-600">Loading Map...</p>
    </div>
  )
});

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    ip: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Get client IP on component load
  useEffect(() => {
    // Try to get IP from an IP lookup service
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        if (data.ip) {
          setFormData(prev => ({ ...prev, ip: data.ip }));
        }
      })
      .catch(error => {
        console.log('Could not get client IP:', error);
        // Set a placeholder IP if fetching fails
        setFormData(prev => ({ ...prev, ip: 'Client IP unavailable' }));
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false); // Reset success state on new submission
    
    try {
      // Call the server action instead of simulating an API call
      console.log("Submitting form data:", formData);
      const result = await submitContactForm(formData);
      console.log("Server response:", result);
      
      if (result.success) {
        setSubmitSuccess(true);
        setFormData({ // Reset form on success
          name: "",
          email: "",
          subject: "",
          message: "",
          ip: ""
        });
        setTimeout(() => setSubmitSuccess(false), 5000); // Hide success message after 5 seconds
      } else {
        setSubmitError(result.message || "There was an error submitting your message. Please try again later.");
      }
    } catch (error: unknown) {
      console.error("Form submission error:", error instanceof Error ? error.message : String(error));
      setSubmitError("There was an error submitting your message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" } // Added ease
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15 // Slightly faster stagger
      }
    }
  };

  return (
    <div className="overflow-x-hidden"> {/* Prevent horizontal overflow */} 
     {/* Hero Section - Refined */} 
<section className="relative py-20 md:py-24 bg-gradient-to-r from-orange-500 to-orange-700"> {/* Changed gradient to orange */} 
  <div className="container mx-auto px-6 text-white">
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="max-w-3xl mx-auto text-center"
    >
      <motion.h1 
        variants={fadeIn}
        className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4"
      >
        Contact Us
      </motion.h1>
      <motion.p 
        variants={fadeIn}
        className="text-lg md:text-xl text-orange-100" // Adjusted text color to suit orange theme
      >
        We&apos;re here to help with any questions you may have.
      </motion.p>
    </motion.div>
  </div>
</section>


      {/* Contact Information & Form Section */} 
      <section className="py-16 md:py-24 bg-gray-50"> {/* Adjusted padding and background */} 
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16"> {/* Increased gap */} 
            {/* Contact Info Column */} 
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="lg:col-span-1"
            >
              <motion.h2 
                variants={fadeIn}
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-800" // Adjusted size
              >
                Get in Touch
              </motion.h2>
              <motion.p 
                variants={fadeIn}
                className="text-gray-600 mb-8 text-lg leading-relaxed" // Adjusted size and leading
              >
                Have questions about our products or services? Our team is ready to assist you. Reach out through any of the channels below.
              </motion.p>
              
              <div className="space-y-6">
                {[ // Data array for contact details
                  { icon: MapPin, title: "Our Location", lines: ["156, Bahadarpur,Selaqui,Dehradun-248197,Uttrakhand"] },
                  { icon: Phone, title: "Phone Number", lines: ["+91 87911 40933", "+91 98184 22865", "+91 89792 91134"] },
                  { icon: Mail, title: "Email Address", lines: ["pratik@aipl.org.in", "parendra@aipl.org.in"] },
                  { icon: Clock, title: "Business Hours", lines: ["Mon - Fri: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 4:00 PM", "Sunday: Closed"] }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    variants={fadeIn}
                    className="flex items-start gap-4"
                  >
                    <div className="bg-blue-100 p-3 rounded-full flex-shrink-0"> {/* Added flex-shrink-0 */} 
                      <item.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                      {item.lines.map((line, lineIndex) => (
                        <p key={lineIndex} className="text-gray-600 text-sm">{line}</p> // Adjusted text size
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Social Media Links */} 
              <motion.div 
                variants={fadeIn}
                className="mt-10 pt-6 border-t border-gray-200" // Added top border
              >
                <h3 className="font-semibold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {[ // Data array for social links
                    { icon: Facebook, href: "#", label: "Facebook" },
                    { icon: Twitter, href: "#", label: "Twitter" },
                    { icon: Linkedin, href: "#", label: "LinkedIn" },
                    { icon: Instagram, href: "#", label: "Instagram" }
                  ].map((social, index) => (
                    <a 
                      key={index}
                      href={social.href} 
                      aria-label={social.label}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-600 transition-colors duration-300"
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
            
            {/* Contact Form Column */} 
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn} // Apply fadeIn to the whole form container
              className="lg:col-span-2 bg-white p-8 rounded-lg shadow-lg" // Added shadow
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form Fields */} 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      id="name" 
                      value={formData.name}
                      onChange={handleChange}
                      required 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      id="email" 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input 
                    type="text" 
                    name="subject" 
                    id="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    required 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="How can we help?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    name="message" 
                    id="message" 
                    rows={5} 
                    value={formData.message}
                    onChange={handleChange}
                    required 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none" // Disabled resize
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                
                {/* Submission Button & Status */} 
                <div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white transition duration-300 ease-in-out shadow-md ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </div>
                
                {/* Submission Status Messages */} 
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-green-100 border border-green-300 text-green-800 rounded-md text-sm"
                  >
                    Message sent successfully! We&apos;ll get back to you soon. If you don&apos;t see a confirmation email, please check your spam/junk folder.
                  </motion.div>
                )}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded-md text-sm"
                  >
                    {submitError}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-24"> {/* Adjusted padding */}
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 md:mb-12 text-gray-800">Find Us on the Map</h2> {/* Adjusted size and margin */}
            <MapSection />
          </motion.div>
        </div>
      </section>

      {/* Section removed */}
    </div>
  );
}