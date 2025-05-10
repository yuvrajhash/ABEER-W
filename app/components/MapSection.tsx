"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Search, ZoomIn, ZoomOut } from "lucide-react";

const MapSection = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="rounded-lg overflow-hidden shadow-lg h-[400px] relative"
    >
      {/* This would be replaced with an actual map component in a real application */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center justify-center">
        {/* Map placeholder with grid lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-6">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-gray-200/30"></div>
            ))}
          </div>
          
          {/* Decorative elements */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-blue-500/20"
          ></motion.div>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
            className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full bg-indigo-500/20"
          ></motion.div>
          
          {/* Location pin */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, type: "spring" }}
          >
            <div className="relative">
              <MapPin size={40} className="text-blue-600" />
              <motion.div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-500/30 rounded-full -z-10"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Controls overlay */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md flex items-center gap-2">
            <Search size={18} className="text-gray-500" />
            <input 
              type="text" 
              placeholder="Search location..." 
              className="bg-transparent border-none outline-none text-sm w-40"
              readOnly
            />
          </div>
          <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md flex flex-col gap-2">
            <button className="hover:bg-gray-100 p-1 rounded">
              <ZoomIn size={18} className="text-gray-700" />
            </button>
            <button className="hover:bg-gray-100 p-1 rounded">
              <ZoomOut size={18} className="text-gray-700" />
            </button>
          </div>
        </div>
        
        <p className="text-gray-600 bg-white/80 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm z-10">
          Interactive Map Will Be Displayed Here
        </p>
      </div>
    </motion.div>
  );
};

export default MapSection; 