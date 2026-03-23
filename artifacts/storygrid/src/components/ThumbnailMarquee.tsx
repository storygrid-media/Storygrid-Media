import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState } from "react";

interface MarqueeProps {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
}

function MarqueeRow({ items, direction = "left", speed = 10 }: MarqueeProps) {
  const baseX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Create a triple-length array for seamless looping
  const duplicatedItems = [...items, ...items, ...items];

  useAnimationFrame((t, delta) => {
    if (isHovered) return;
    
    let moveBy = direction === "left" ? -speed : speed;
    // Adjust speed for delta to keep it consistent across high-refresh displays
    moveBy = moveBy * (delta / 1000) * 10; 
    
    let nextX = baseX.get() + moveBy;
    
    // Reset position for seamless loop
    // Since we have 3 copies, once we've moved past 1 full width, reset to middle
    if (direction === "left") {
      if (nextX < -100) nextX = 0;
    } else {
      if (nextX > 0) nextX = -100;
    }
    
    baseX.set(nextX);
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  return (
    <div 
      className="overflow-hidden whitespace-nowrap py-4 flex"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div style={{ x }} className="flex gap-4 sm:gap-6 pr-4 sm:pr-6">
        {duplicatedItems.map((src, i) => (
          <div 
            key={i} 
            className="flex-shrink-0 w-[240px] h-[135px] sm:w-[320px] sm:h-[180px] rounded-xl overflow-hidden border border-white/5 bg-[#141414] group relative"
          >
            <img 
              src={src} 
              alt="Thumbnail" 
              className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-[1.01] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

const THUMBNAILS_1 = [
  "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
];

const THUMBNAILS_2 = [
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60",
];

export default function ThumbnailMarquee() {
  return (
    <div className="w-full space-y-2 py-12">
      <div className="container mx-auto px-6 md:px-16 lg:px-24 mb-6">
        <h3 className="text-xl font-bold text-white/40 uppercase tracking-[0.2em] text-center mb-2">
          Content That Pops
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white">
          Visual Brand Identity
        </h2>
      </div>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#080808] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#080808] to-transparent z-10" />
        
        <MarqueeRow items={THUMBNAILS_1} direction="left" speed={25} />
        <MarqueeRow items={THUMBNAILS_2} direction="right" speed={20} />
      </div>
    </div>
  );
}
