"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Floating ingredient names for animated background
const FLOATING_COMPOUNDS = [
  "CoQ10", "L-Glutathione", "Vitamin C", "Magnesium", "Zinc", "D3", "Curcumin", "Alpha Lipoic Acid", "Calcium", "Iron"
];

// Categorized Ingredients Portfolio
const INGREDIENTS_PORTFOLIO = [
  {
    category: "Calcium Compounds",
    items: [
      "Algal Calcium", "Calcium Acetate", "Calcium Amino Acid Chelate", "Calcium Ascorbate",
      "Calcium Aspartate", "Calcium Asparto Glycinate", "Calcium Bisglycinate",
      "Calcium Borogluconate", "Calcium Citrate", "Calcium Citrate Malate", "Calcium D-Saccharate",
      "Calcium Fructoborate®", "Calcium Gluconate (Inj)", "Calcium Glycinate", "Calcium Lactate",
      "Calcium Lactate Gluconate", "Calcium Orotate", "Calcium Pyruvate", "Calcium Undecyclinate",
      "Coral Calcium"
    ]
  },
  {
    category: "Magnesium Compounds",
    items: [
      "Magnesium Absorbate", "Magnesium Acetate", "Magnesium Ascorbate", "Magnesium Aspartate",
      "Magnesium Bisglycinate", "Magnesium Citrate", "Magnesium Gluconate", "Magnesium Glycinate",
      "Magnesium Malate", "Magnesium Propionate"
    ]
  },
  {
    category: "Zinc Compounds",
    items: [
      "Zinc Acetate", "Zinc Arginate", "Zinc Ascorbate", "Zinc Aspartate", "Zinc Bisglycinate",
      "Zinc Citrate", "Zinc Gluconate", "Zinc Glycinate", "Zinc Monomethionine", "Zinc Picolinate",
      "Zinc Propionate"
    ]
  },
  {
    category: "Copper Compounds",
    items: [
      "Copper Acetate", "Copper Bisglycinate", "Copper Citrate", "Copper Gluconate", "Copper Glycinate",
      "Copper Glycine Sulphate", "Copper Oleate", "Copper Propionate"
    ]
  },
  {
    category: "Iron Compounds",
    items: [
      "Ferric Ammonium Citrate", "Ferric Carboxymaltose", "Ferric Citrate", "Ferric Derisomatose",
      "Ferric Maltol®", "Ferric Orthophosphate", "Ferric Pyrophosphate", "Ferric Pyrophosphate Citrate",
      "Ferrous Ascorbate", "Ferrous Asparto Glycinate", "Ferrous Bisglycinate", "Iron III Hydroxide Polymaltose",
      "Iron Isomatoside", "Iron Sucrose"
    ]
  },
  {
    category: "Potassium Compounds",
    items: [
      "Potassium Acetate", "Potassium Aspartate", "Potassium Citrate", "Potassium Glycinate",
      "Potassium Mag. Citrate", "Potassium Orotate", "Potassium Propionate"
    ]
  },
  {
    category: "Other Minerals & Chelates",
    items: [
      "Chromium Glycinate", "Lithium Chromate", "Manganese Glycinate", "Vanadyl Sulfate"
    ]
  },
  {
    category: "Vitamins & Derivatives",
    items: [
      "Alpha Lipoic Acid", "Ascorbic acid (Coated)", "Ascorbyl Palmitate", "Benfohiamine",
      "Biotin", "D-Calcium Pantothenate (Vit B5)®", "Hydroxocobalamin (Vit B12)", "Methylcobalamin (Vit B12)®",
      "Niacin (Vit B3)", "Pyridoxal 5 phosphate", "Riboflavin 5 Phosphate (Vit B12)", "Vitamin A Palmitate",
      "Vitamin D3 (Veg)", "Vitamin K1 (Veg)", "Tocotrienols (Veg - Vitamin-E)", "Tocopherol (veg - Vitamin E)"
    ]
  },
  {
    category: "Amino Acids & Derivatives",
    items: [
      "Dimethyl Glycine", "L-carnosine", "L-Glutamine", "L-glutathione", "L-Pyroglutamic Acid", "L-Theanine",
      "L-a-Glycerophosphorylcholine", "N-acetyl Cysteine", "N-acetyl Tyrosine", "D-Chiro Inositol®"
    ]
  },
  {
    category: "Other Actives & Enzymes",
    items: [
      "Benfohiamine", "Benzyl Nicotinate", "Betaine Anhydrous", "Betaine Hydrochloride",
      "Cytidine Monophosphate", "Co-Enzyme Q10®", "DHA (Vegetarian from Algae)®", "Fermented Taurine®",
      "Methyl Nicotinate", "Methyl-6-methyl Nicotinate", "Palmitoylethanolamide (all grades)", "Papain Enzyme",
      "Sodium Ascorbyl Phosphate", "Sodium Copper Chlorophyllin", "Sodium Lauroyl Glycinate"
    ]
  }
];

const LIPOSOMAL_RANGE = [
  "Curcumin", "Glutathione", "Vitamin C", "Vitamin D3", "Resveratrol", "Quercetin", "CoQ10",
  "Calcium", "Iron", "Magnesium", "Zinc"
];

const tabs = [
  { key: "offerings", label: "Offerings" },
  { key: "resources", label: "Resources" }
];

const bgGrad = "bg-gradient-to-tr from-blue-50 via-teal-50 to-green-100";

function FloatingCompounds() {
  // Define proper type for compound
  type Compound = {
    name: string;
    style: {
      opacity: number;
      x: number;
      y: number;
      scale: number;
      rotate: number;
      left: string;
      top: string;
      color: string;
    }
  };
  
  const [compounds, setCompounds] = useState<Compound[]>([]);
  
  useEffect(() => {
    // Initialize compounds with window dimensions after component mounts
    setCompounds(
      FLOATING_COMPOUNDS.map((name) => ({
        name,
        style: {
          opacity: 0.18 + Math.random() * 0.2,
          x: Math.random() * window.innerWidth * 0.9,
          y: Math.random() * window.innerHeight * 0.8,
          scale: 0.9 + Math.random() * 0.8,
          rotate: Math.random() * 360,
          left: `${Math.random() * 90}%`,
          top: `${Math.random() * 80}%`,
          color: Math.random() > 0.5 ? "#1e90ff55" : "#14b8a655",
        }
      }))
    );
  }, []);
  
  // Randomize initial positions and animation delays
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {compounds.map((compound, i) => (
        <motion.div
          key={compound.name}
          initial={{
            opacity: compound.style.opacity,
            x: compound.style.x,
            y: compound.style.y,
            scale: compound.style.scale,
            rotate: compound.style.rotate,
          }}
          animate={{
            y: ["0%", "20%", "0%"],
            x: ["0%", "10%", "0%"],
            opacity: [0.18 + Math.random() * 0.2, 0.3, 0.18 + Math.random() * 0.2],
            rotate: [0, 360],
          }}
          transition={{
            duration: 16 + Math.random() * 6,
            repeat: Infinity,
            repeatType: "loop",
            delay: Math.random() * 8,
            ease: "linear"
          }}
          className="absolute select-none font-bold text-[1.1rem] md:text-2xl uppercase tracking-widest"
          style={{
            color: compound.style.color,
            left: compound.style.left,
            top: compound.style.top,
            filter: "blur(0.5px)"
          }}
        >
          {compound.name}
        </motion.div>
      ))}
    </div>
  );
}

const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    const handleError = (error: Event) => {
      setHasError(true);
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);
  if (hasError) {
    return (
      <div className="p-6 bg-red-50 rounded-lg text-center">
        <h3 className="text-xl font-semibold text-red-700 mb-2">Something went wrong</h3>
        <p className="text-gray-600 mb-4">We're sorry, but there was an error loading this content.</p>
        <button
          onClick={() => setHasError(false)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }
  return children;
};

export default function NutraceuticalIngredientsSupplierPage() {
  const [activeTab, setActiveTab] = useState("offerings");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 350);
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <div className={`relative min-h-screen pt-24 pb-16 ${bgGrad} overflow-x-hidden`}>
      {/* Animated Floating Compounds */}
      <FloatingCompounds />

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-2">
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                className="rounded-full bg-gradient-to-tr from-blue-300/60 via-teal-200/60 to-green-200/60 p-2 shadow-md"
              >
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="20" fill="#38bdf8" fillOpacity="0.15"/>
                  <circle cx="24" cy="24" r="13" fill="#14b8a6" fillOpacity="0.15"/>
                  <circle cx="24" cy="24" r="7" fill="#38bdf8" fillOpacity="0.22"/>
                </svg>
              </motion.div>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-3 drop-shadow">
              Precision Nutraceutical Ingredients
            </h1>
            <p className="text-teal-800 text-lg md:text-xl mb-8 font-medium">
              Advanced nutritional compounds engineered for optimal bioavailability and efficacy
            </p>
            <div className="flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
          {tabs.map((tab) => (
            <motion.button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              whileTap={{ scale: 0.96 }}
              className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-200
                ${activeTab === tab.key
                  ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg"
                  : "bg-white/80 text-blue-800 hover:bg-blue-50 border border-blue-100"
                }`}
              aria-selected={activeTab === tab.key}
              role="tab"
              style={{ minWidth: 120 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Tab Content with AnimatePresence for smooth transitions */}
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-16"
            >
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
            </motion.div>
          )}

          <ErrorBoundary>
            {/* Offerings Tab */}
            {activeTab === "offerings" && !isLoading && (
              <motion.div
                key="offerings"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-white/90 rounded-3xl shadow-2xl overflow-hidden mb-12 ring-1 ring-blue-100">
                  <div className="p-6 md:p-10">
                    <h2 className="text-3xl font-extrabold text-blue-800 mb-4">Our Ingredient Offerings</h2>
                    <p className="text-teal-800 mb-8 text-lg">
                      Abeer Ingredients offers a comprehensive portfolio of nutraceutical ingredients and advanced liposomal actives. Explore our extensive range below, organized for clarity.
                    </p>

                    {/* INGREDIENTS PORTFOLIO */}
                    <div className="mb-12">
                      <h3 className="text-2xl font-bold text-blue-700 mb-4">Ingredients Portfolio</h3>
                      <div className="space-y-8 max-h-[32rem] overflow-y-auto border rounded-2xl p-4 md:p-8 bg-gradient-to-br from-blue-50 via-white to-teal-50 shadow-inner">
                        {INGREDIENTS_PORTFOLIO.map((section, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
                          >
                            <h4 className="font-semibold text-blue-700 mb-2 text-lg tracking-wide">{section.category}</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 list-disc list-inside text-gray-700 mb-2 text-base">
                              {section.items.map((item, j) => (
                                <motion.li
                                  key={j}
                                  initial={{ opacity: 0, x: -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.3, delay: j * 0.01 }}
                                  className="hover:text-teal-700 transition-colors duration-200"
                                >
                                  {item}
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* LIPOSOMAL RANGE */}
                    <div>
                      <h3 className="text-2xl font-bold text-blue-700 mb-4">Liposomal Range</h3>
                      <div className="max-h-48 overflow-y-auto border rounded-2xl p-4 bg-gradient-to-r from-blue-50 via-white to-teal-50 shadow-inner">
                        <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 list-disc list-inside text-gray-700 text-base">
                          {LIPOSOMAL_RANGE.map((item, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: idx * 0.02 }}
                              className="hover:text-blue-700 transition-colors duration-200"
                            >
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Resources Tab */}
            {activeTab === "resources" && !isLoading && (
              <motion.div
                key="resources"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-white/90 rounded-3xl shadow-2xl overflow-hidden mb-12 ring-1 ring-blue-100 p-10">
                  <h2 className="text-3xl font-extrabold text-blue-800 mb-4">Resources</h2>
                  <p className="text-teal-800 text-lg mb-4">
                    Contact us for technical data sheets, regulatory support, and more. Our team is ready to assist you with any queries regarding our nutraceutical ingredients.
                  </p>
                  <div className="flex flex-col md:flex-row gap-4 mt-6">
                    <a
                      href="mailto:info@aurorafarmabio.com"
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg font-semibold shadow hover:from-blue-700 hover:to-teal-600 transition"
                    >
                      Email Us
                    </a>
                    <a
  href="/brochures/Nutraceutical.pdf"  // Adjust path as per your project structure
  download
  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg font-semibold shadow hover:from-emerald-600 hover:to-green-700 transition"
>
  Download Brochure
</a>

                  </div>
                </div>
              </motion.div>
            )}
          </ErrorBoundary>
        </AnimatePresence>
      </div>
    </div>
  );
}
