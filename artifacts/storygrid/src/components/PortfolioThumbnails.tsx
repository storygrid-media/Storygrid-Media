import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CurvedSlider, { ThumbnailItem } from "./CurvedSlider";
import { cn } from "@/lib/utils";

const ALL_THUMBNAILS: ThumbnailItem[] = [
  {
    id: "fin-1",
    category: "Finance",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=60",
    title: "10X Your Portfolio with These 3 Assets",
    channelName: "WealthWise",
    views: "1.2M+"
  },
  {
    id: "fin-2",
    category: "Finance",
    image: "https://images.unsplash.com/photo-1611974717525-58a36190d605?w=800&auto=format&fit=crop&q=60",
    title: "The Stock Market Crash No One Sees Coming",
    channelName: "FinanceDaily",
    views: "2.1M+"
  },
  {
    id: "tech-1",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60",
    title: "iPhone 16: Everything We Know So Far",
    channelName: "TechInsider",
    views: "4.5M+"
  },
  {
    id: "tech-2",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60",
    title: "Why AI is Actually GOOD for Your Career",
    channelName: "FutureTech",
    views: "920K+"
  },
  {
    id: "story-1",
    category: "Storytelling",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=60",
    title: "How StoryGrid Crafts Billion-Dollar Stories",
    channelName: "StoryGrid Originals",
    views: "3.1M+"
  },
  {
    id: "story-2",
    category: "Storytelling",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=60",
    title: "Mastering the Art of the YouTube Hook",
    channelName: "CreatorAcademy",
    views: "1.8M+"
  }
];

const CATEGORIES = ["All", "Finance", "Tech", "Storytelling"];

export default function PortfolioThumbnails() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredItems = useMemo(() => {
    if (activeTab === "All") return ALL_THUMBNAILS;
    return ALL_THUMBNAILS.filter(item => item.category === activeTab);
  }, [activeTab]);

  return (
    <section id="work" className="py-12 md:py-16 bg-[#080808] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-16 lg:px-24 mb-6">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, ease: "easeOut" }}
           viewport={{ once: true, margin: "-100px" }}
           className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#FFC107]" />
            <span className="text-[#9A9A9A] text-sm tracking-widest uppercase">The Performance</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                 Engineered for <span className="text-[#FFC107]">the Click.</span>
              </h2>
              <p className="text-[#9A9A9A] text-lg max-w-xl leading-relaxed">
                 High-converting thumbnails rigorously tested through our internal proprietary 
                 A/B testing engine to secure 12%+ CTRs as a standard.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="container mx-auto px-6 md:px-16 lg:px-24">
        {/* Categories Tab - Improved for Mobile */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                "px-5 py-2.5 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-300 border mb-2",
                activeTab === cat
                  ? "bg-[#FFC107] text-black border-[#FFC107] shadow-lg shadow-[#FFC107]/20"
                  : "bg-white/5 text-white/60 border-white/10 hover:border-white/20 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <CurvedSlider items={filteredItems} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Background Stats */}
      <div className="container mx-auto px-6 md:px-16 lg:px-24 mt-8">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-4 border-t border-white/5">
            <div className="flex flex-col">
               <span className="text-[#FFC107] text-2xl font-bold font-display">14.2%</span>
               <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Avg CTR</span>
            </div>
            <div className="flex flex-col">
               <span className="text-white text-2xl font-bold font-display">25M+</span>
               <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Impressions</span>
            </div>
            <div className="flex flex-col">
               <span className="text-[#FFC107] text-2xl font-bold font-display">3.2min</span>
               <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Avg Watch Time</span>
            </div>
            <div className="flex flex-col">
               <span className="text-white text-2xl font-bold font-display">120+</span>
               <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Projects Done</span>
            </div>
         </div>
      </div>
    </section>
  );
}
