import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CurvedSlider, { ThumbnailItem } from "./CurvedSlider";

const ALL_THUMBNAILS: ThumbnailItem[] = [
  {
    id: "fin-1",
    category: "Finance",
    image: "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=800&auto=format&fit=crop&q=60",
    title: "Mastering Market Volatility",
    channelName: "FinScale Elite",
    views: "1.2M+"
  },
  {
    id: "fin-2",
    category: "Finance",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60",
    title: "The Future of Digital Assets",
    channelName: "CryptoCore",
    views: "2.1M+"
  },
  {
    id: "fin-3",
    category: "Finance",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop&q=60",
    title: "Venture Capital Secrets",
    channelName: "EquityInsider",
    views: "850K+"
  },
  {
    id: "tech-1",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60",
    title: "AI Revolution 2026",
    channelName: "TechPulse",
    views: "3.4M+"
  },
  {
    id: "tech-2",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
    title: "Building Scalable Systems",
    channelName: "DevDirect",
    views: "920K+"
  },
  {
    id: "tech-3",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
    title: "Next-Gen Interfaces",
    channelName: "UI/UX Mastery",
    views: "1.1M+"
  },
  {
    id: "story-1",
    category: "Storytelling",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=60",
    title: "The Art of the Hook",
    channelName: "StoryGrid Originals",
    views: "4.2M+"
  },
  {
    id: "story-2",
    category: "Storytelling",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
    title: "Visual Pacing Guide",
    channelName: "CreatorCore",
    views: "1.8M+"
  },
  {
    id: "story-3",
    category: "Storytelling",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60",
    title: "Retention Engineering",
    channelName: "GrowthLabs",
    views: "2.7M+"
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
    <section id="work" className="py-16 md:py-24 bg-[#080808] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-16 lg:px-24 mb-6">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, ease: "easeOut" }}
           viewport={{ once: true, margin: "-100px" }}
           className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#FFC107]" />
            <span className="text-[#9A9A9A] text-sm tracking-widest uppercase">The Performance</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                Visual Packaging
              </h2>
              <p className="text-[#9A9A9A] text-lg max-w-xl leading-relaxed">
                High-converting thumbnails rigorously tested and optimized to secure the click.
              </p>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="bg-white/5 border border-white/10 p-1">
                {CATEGORIES.map((cat) => (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    className="data-[state=active]:bg-[#FFC107] data-[state=active]:text-black text-white/70"
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </motion.div>
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
      <div className="container mx-auto px-6 md:px-16 lg:px-24 mt-12">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-white/5">
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
