"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Floating herbal names for animated background
const FLOATING_COMPOUNDS = [
  "Ashwagandha", "Brahmi", "Neem", "Amla", "Tulsi", "Kalmegh", "Shatavari", "Haldi", "Gokhru", "Punarnava"
];

// Portfolio Data (as in your previous message)
const portfolioSections = [
  {
    title: "Dry Leaves Extracts",
    data: [
      ["Adhatoda Vasica", "Vasaka", "Leaf", "Alkaloids 0.5% & 1%"],
      ["Aegle Marmelos", "Bel", "Leaf", "Tannins >7%"],
      ["Aloe Vera", "Ghritkumari", "Leaf", "Aloin 1.5%"],
      ["Azadirachita Indica", "Neem", "Leaf", "Bitter >2.5%"],
      ["Camellia Sinensis", "Chai", "Leaf", "Polyphenols 40%, Tannins 25%"],
      ["Cassia Angustifolia", "Sonamukhi", "Leaf", "Sennoside 10%, 20%"],
      ["Centella Asiatica", "Brahmi", "Leaf", "Triterpenoids 10%, 20%"],
      ["Gymnema Sylvestre", "Gurmar", "Leaf", "Gymnemic Acid 25%, 50%, 75%"],
      ["Lawsonia Alba", "Mehendi", "Leaf", "Tannin 5%"],
      ["Cissus Quadragularis", "Hadjod", "Leaf", "Ketoslerones 10%, 20%"],
      ["Moringa Oleifera", "Shevgan", "Leaf", "Alkaloids >0.1%"],
      ["Ocimum Sanctum", "Tulsi", "Leaf", "Tannins >5%"],
      ["Ricinus Communis", "Erand", "Leaf", "Alkaloids 2.5%"],
      ["Sphaeranthus Indicus", "Gorakhmundi", "Leaf", "Alkaloids 0.4%"],
      ["Trichosanthes Kirilowii", "Parwal", "Leaf", "Saponins"],
      ["Tylophora Indica", "Dambel", "Leaf", "Tylophorine"]
    ]
  },
  {
    title: "Dry Fruits Extracts",
    data: [
      ["Aegle marmelos", "Bel", "Fruit", "Mucilage >15%, Tannins 5%"],
      ["Anethum Graveolens", "Suunf", "Fruit", "Volatile Oil 3%"],
      ["Apium leptophyllum", "Ajmod", "Fruit", "Volatile Oil 1%"],
      ["Allium Sativum", "Lehsun", "Fruit", "Allin 1-2.5%"],
      ["Cassia fistula", "Amaltas", "Fruit", "Mucilage 20%"],
      ["Citrullus colocynthis", "Indrayan", "Fruit", "Bitter 4.5%"],
      ["Punica Granatum", "Anar Dana", "Fruit", "Tannins 5-15%"],
      ["Coriandrum sativum", "Dhania", "Fruit", "Volatile Oil 1%"],
      ["Cuminum cyminum", "Jeera", "Fruit", "Volatile Oil >1%"],
      ["Emblica officinalis", "Amla", "Fruit", "Tannins >20%"],
      ["Foeniculum vulgare", "Saunf", "Fruit", "Volatile Oil >1%"],
      ["Gloriosa Superba", "Kalihari", "Fruit", "Alkaloids 0.5%"],
      ["Helicteres isora", "Murdasingi", "Fruit", "Tannins"],
      ["Melia azadarach", "Bakayan", "Fruit", "Bitter >4%"],
      ["Mesua ferrea", "Nagkesar", "Fruit & Flower", "Bitter >2.5%"],
      ["Momordica charantia", "Karela", "Fruit", "Bitter >2.5%"],
      ["Terminalia Belerica", "Bahera", "Fruit", "Tannins >10%"],
      ["Garcinia Combogia", "Kokum", "Fruit", "HCA >50%"],
      ["Terminalia Chebula", "Haritaki", "Fruit", "Tannins 20-40%"]
    ]
  },
  {
    title: "Dry Herb Extracts",
    data: [
      ["Andrographis Paniculata", "Kalmegh", "Herb", "Andrographolides >10%"],
      ["Bacopa Monnieri", "Brahmi", "Herb", "Bacosides A& B 20%, 30%, Alkaloids"],
      ["Enicostema Littorale", "Chota chirayata", "Herb", "Bitter >3%"],
      ["Ephedra Vulgaris", "Somlata", "Herb", "Alkaloids 0.5%"],
      ["Evolvulus", "Shankhapushpi", "Herb", "Bitter 2.5%"],
      ["Fumaria Officinalis", "Pitpapra", "Herb", "Bitter >1%"],
      ["Gymnema Balsamicum", "Gurmar", "Herb", "Saponins >15%"],
      ["Hyoscyamus Niger", "Khubzi", "Herb", "Alkaloids 0.2%, 0.3%"],
      ["Phyllanthus Niruri", "Bhumiamalaki", "Herb", "Bitter >2.5%"],
      ["Wedelia Calendulacea", "Zashak", "Herb", "Tannins 5%, Saponins 2%"],
      ["Argemone Mexicana", "Kantaki", "Whole Herb", "Alkaloids 0.3%"],
      ["Tribulus Terrestris", "Gokhru", "Whole Herb", "Saponins 10-20%"],
      ["Morinda Citrifolia", "Noni", "Fruit", "Morindin Glycoside 10%"]
    ]
  },
  {
    title: "Dry Bark Extracts",
    data: [
      ["Acacia arabica", "Babul", "Bark", "Tannins 40%"],
      ["Acacia Catechu", "Khair", "Bark", "Tannins >6%"],
      ["Albizzia lebbeck", "Siris", "Bark", "Tannins >5%"],
      ["Alstoria scholaris", "Saptaparni", "Bark", "Alkaloids 0.3%"],
      ["Amoora rohituka", "Rudraksh", "Bark", "Tannins 10%"],
      ["Azadirachta indica", "Neem", "Bark", "Bitter 1%"],
      ["Bauhinia variegata", "Kanchan", "Bark", "Tannins 5%"],
      ["Cinnamomum zeylanicum", "Dalchini", "Bark", "Volatile Oil 2%"],
      ["Crataeva nurvala", "Varun", "Bark", "Saponins >2.5%"],
      ["Ficus bengalensis", "Bargad", "Bark", "Tannins 5%"],
      ["Ficus lacor", "Plaksha", "Bark", "Tannins >5%"],
      ["Ficus religiosa", "Peepal", "Bark", "Tannins >7%"],
      ["Ficus racemosa", "Gular", "Bark", "Tannins 10%"],
      ["Holarrhena antidysentrica", "Kutaja", "Bark", "Alkaloids >4%"],
      ["Moringa Oleifera", "Sahjan", "Bark", "Tannins >5%"],
      ["Myrica nagi", "Kaiphal", "Bark", "Tannins 25%"],
      ["Saraca indica", "Ashok", "Bark", "Tannins 4%"]
    ]
  },
  {
    title: "Dry Root/Rhizome/Seed Extracts",
    data: [
      ["Withania Somnifera", "Ashwagandha", "Root", "Withanoloids 1-3%"],
      ["Curcuma Longa", "Haldi", "Root", "Curcuminoids 95%"],
      ["Mucuna Pruriens", "Kuchua", "Seed", "L-Dopa >10%"],
      ["Nigella Sativa", "Kalongi", "Seed", "Saponins 15%"],
      ["Magnifera Indica", "Aam", "Seed", "Tannins 10%"],
      ["Trigonella Foenum", "Methi", "Seed", "Saponins 15-40%"],
      ["Bergenia Ligulata", "Pansukh", "Root", "Tannins 10%"],
      ["Boerhaavia Diffusa", "Punarnava", "Root", "Alkaloids 0.02-0.1%"],
      ["Rheum Emodin", "Rewand Chini", "Root", "Oxymethyl Anthraquinones"],
      ["Asparagus Adcendens", "Satavari", "Root", "Saponins 10-40%"],
      ["Asparagus Racemosa", "Shatavari", "Root", "Saponins 10-20%"],
      ["Hedychium Spicatum", "Kapur Kachli", "Rhizome", "Vol. Oil"],
      ["Asphaltum", "Shilajit", "Stone", "Fulvic Acid 2-10%"],
      ["Zingiber Officinale", "Adrak", "Root", "Gingerol 2-6%"],
      ["Triticum Sativum", "Gehun", "Seed", "Vit. E 0.2-0.6%"]
    ]
  }
];

const tabs = [
  { key: "portfolio", label: "Portfolio" },
  { key: "resources", label: "Resources" }
];

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
      FLOATING_COMPOUNDS.map((name, i) => ({
        name,
        style: {
          opacity: 0.18 + Math.random() * 0.2,
          x: Math.random() * window.innerWidth * 0.9,
          y: Math.random() * window.innerHeight * 0.8,
          scale: 0.9 + Math.random() * 0.8,
          rotate: Math.random() * 360,
          left: `${Math.random() * 90}%`,
          top: `${Math.random() * 80}%`,
          color: i % 2 === 0 ? "#05966955" : "#10b98155",
        }
      }))
    );
  }, []);
  
  // Randomize initial positions and animation delays
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {compounds.map((compound) => (
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
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }
  return children;
};

export default function HerbalExtractsPortfolioPage() {
  const [activeTab, setActiveTab] = useState("portfolio");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 350);
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <div className="relative min-h-screen pt-24 pb-16 bg-gradient-to-tr from-green-50 via-emerald-50 to-green-100 overflow-x-hidden">
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
                className="rounded-full bg-gradient-to-tr from-green-300/60 via-emerald-200/60 to-green-200/60 p-2 shadow-md"
              >
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="20" fill="#059669" fillOpacity="0.13"/>
                  <circle cx="24" cy="24" r="13" fill="#10b981" fillOpacity="0.13"/>
                  <circle cx="24" cy="24" r="7" fill="#059669" fillOpacity="0.18"/>
                </svg>
              </motion.div>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900 mb-3 drop-shadow">
              Herbal Extracts Portfolio
            </h1>
            <p className="text-emerald-800 text-lg md:text-xl mb-8 font-medium">
              Explore our comprehensive range of standardized herbal extracts, organized by plant part and marker compounds.
            </p>
            <div className="flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></div>
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
                  ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg"
                  : "bg-white/80 text-green-800 hover:bg-green-50 border border-green-100"
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
              <div className="w-12 h-12 border-4 border-green-200 border-t-green-500 rounded-full animate-spin"></div>
            </motion.div>
          )}

          <ErrorBoundary>
            {activeTab === "portfolio" && !isLoading && (
              <motion.div
                key="portfolio"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="space-y-12">
                  {portfolioSections.map((section, idx) => (
                    <motion.div
                      key={section.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      className="bg-white/90 rounded-2xl shadow-2xl p-6 md:p-10 ring-1 ring-green-100"
                    >
                      <h2 className="text-2xl font-bold text-emerald-800 mb-4">{section.title}</h2>
                      <div className="overflow-x-auto rounded-lg border border-green-100">
                        <table className="min-w-full divide-y divide-green-100">
                          <thead className="bg-green-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-emerald-900 font-semibold">Botanical Name</th>
                              <th className="px-4 py-2 text-left text-emerald-900 font-semibold">Common Name</th>
                              <th className="px-4 py-2 text-left text-emerald-900 font-semibold">Plant Part</th>
                              <th className="px-4 py-2 text-left text-emerald-900 font-semibold">Marker Compounds</th>
                            </tr>
                          </thead>
                          <tbody>
                            {section.data.map((row, i) => (
                              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-green-50"}>
                                {row.map((cell, j) => (
                                  <td key={j} className="px-4 py-2 text-green-800">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "resources" && !isLoading && (
              <motion.div
                key="resources"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-white/90 rounded-3xl shadow-2xl overflow-hidden mb-12 ring-1 ring-green-100 p-10">
                  <h2 className="text-3xl font-extrabold text-emerald-800 mb-4">Resources</h2>
                  <p className="text-emerald-800 text-lg mb-4">
                    Contact us for technical data sheets, regulatory support, and more. Our team is ready to assist you with any queries regarding our herbal extracts.
                  </p>
                  <div className="flex flex-col md:flex-row gap-4 mt-6">
                    <a
                      href="mailto:info@yourcompany.com"
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg font-semibold shadow hover:from-green-700 hover:to-emerald-600 transition"
                    >
                      Email Us
                    </a>
                    <a
  href="/brochures/AIPL-Brochure.pdf"  // Adjust path as per your project structure
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
