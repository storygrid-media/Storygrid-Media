import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ThumbnailItem {
  id: string | number;
  image: string;
  title: string;
  channelName: string;
  views: string;
  category: string;
  ctr?: string;
}

interface CurvedSliderProps {
  items: ThumbnailItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function CurvedSlider({ 
  items, 
  autoPlay = true, 
  autoPlayInterval = 4000 
}: CurvedSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const length = items.length;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % length);
  }, [length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  }, [length]);

  useEffect(() => {
    if (autoPlay && !isHovered) {
      const interval = setInterval(handleNext, autoPlayInterval);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [autoPlay, autoPlayInterval, isHovered, handleNext]);

  // Helper to get relative position for circular loop
  const getRelativeIndex = (index: number): number | null => {
    if (index === currentIndex) return 0;
    
    // Right neighbor (including wrap-around)
    if (index === (currentIndex + 1) % length) return 1;
    
    // Left neighbor (including wrap-around)
    if (index === (currentIndex - 1 + length) % length) return -1;
    
    return null;
  };

  return (
    <div 
      className="relative w-full h-[350px] md:h-[480px] flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,193,7,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* Navigation Arrows */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-8 z-50 pointer-events-none">
        <button
          onClick={handlePrev}
          className="w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white hover:bg-[#FFC107] hover:text-black hover:border-[#FFC107] transition-all duration-300 pointer-events-auto backdrop-blur-md group shadow-2xl"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button
          onClick={handleNext}
          className="w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white hover:bg-[#FFC107] hover:text-black hover:border-[#FFC107] transition-all duration-300 pointer-events-auto backdrop-blur-md group shadow-2xl"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Cards Container */}
      <div className="relative w-full h-full flex items-center justify-center perspective-[1200px]">
        <AnimatePresence initial={false} mode="popLayout">
          {items.map((item, index) => {
            const relIndex = getRelativeIndex(index);
            if (relIndex === null) return null;

            const isCenter = relIndex === 0;
            const isLeft = relIndex === -1;
            const isRight = relIndex === 1;

            return (
              <motion.div
                key={item.id}
                initial={{ 
                  opacity: 0, 
                  scale: 0.8, 
                  x: isLeft ? "-100%" : isRight ? "100%" : 0,
                  rotateY: isLeft ? 45 : isRight ? -45 : 0,
                }}
                animate={{
                  opacity: isCenter ? 1 : 0.5,
                  scale: isCenter ? 1 : 0.75,
                  x: isCenter ? "0%" : isLeft ? "-95%" : "95%",
                  rotateY: isCenter ? 0 : isLeft ? 35 : -35,
                  rotateZ: isCenter ? 0 : isLeft ? -10 : 10,
                  zIndex: isCenter ? 40 : 20,
                  filter: isCenter ? "grayscale(0%)" : "grayscale(80%)",
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.5,
                  transition: { duration: 0.4 }
                }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 24,
                  mass: 1.2,
                }}
                className={cn(
                  "absolute w-[280px] sm:w-[400px] md:w-[500px] aspect-video rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl border border-white/5 bg-[#111111] group/card",
                  isCenter ? "shadow-[#FFC107]/20 ring-1 ring-[#FFC107]/30" : "pointer-events-none"
                )}
              >
                {/* Scanner/Glow Effect for Center Card */}
                {isCenter && (
                   <motion.div 
                      className="absolute inset-0 z-40 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                   >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFC107]/10 to-transparent w-[200%] h-full -translate-x-full animate-[shimmer_3s_infinite]" />
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFC107] to-transparent opacity-50 shadow-[0_0_15px_rgba(255,193,7,0.5)]" />
                   </motion.div>
                )}
                {/* Image */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Overlays */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent transition-opacity duration-700",
                  isCenter ? "opacity-100" : "opacity-60"
                )} />

                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                   <motion.div
                      animate={{ 
                        y: isCenter ? 0 : 40, 
                        opacity: isCenter ? 1 : 0,
                        transition: { delay: 0.1 }
                      }}
                   >
                      <div className="flex items-center gap-3 mb-3">
                         <span className="bg-[#FFC107] text-black text-[9px] font-black uppercase px-2 py-0.5 rounded-sm tracking-[0.1em]">
                            Performance Optimized
                         </span>
                         <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/10 rounded-sm border border-white/5">
                            <span className="text-[#FFC107] text-[10px] font-black">{item.ctr || "12.4%"}</span>
                            <span className="text-white/40 text-[8px] font-bold uppercase tracking-tighter">CTR</span>
                         </div>
                         <span className="text-white/40 text-xs font-semibold uppercase tracking-widest ml-auto">
                            {item.channelName}
                         </span>
                      </div>
                      
                      <h3 className="text-xl md:text-3xl font-display font-bold text-white mb-3 line-clamp-1">
                         {item.title}
                      </h3>

                      <div className="flex items-center gap-5">
                         <div className="flex items-center gap-2 text-white font-bold text-sm">
                            <Eye className="w-4 h-4 text-[#FFC107]" />
                            <span>{item.views} Views</span>
                         </div>
                         <div className="h-4 w-px bg-white/10" />
                         <span className="text-[#9A9A9A] text-xs font-medium uppercase tracking-widest">
                            {item.category}
                         </span>
                      </div>
                   </motion.div>
                </div>

                {/* Interaction Overlay */}
                {isCenter && (
                   <motion.div 
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 transition-opacity duration-300 group"
                   >
                      <button className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2">
                         View Breakdown
                         <ChevronRight className="w-4 h-4" />
                      </button>
                   </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Progress Line */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">0{(currentIndex % length) + 1}</span>
        <div className="w-24 md:w-32 h-1 bg-white/5 rounded-full overflow-hidden">
           <motion.div 
              className="h-full bg-[#FFC107]"
              initial={false}
              animate={{ width: `${((currentIndex + 1) / length) * 100}%` }}
           />
        </div>
        <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">0{length}</span>
      </div>
    </div>
  );
}
