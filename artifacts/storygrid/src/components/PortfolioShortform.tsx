import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Eye } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SHORTFORM_PROJECTS = [
  { 
    id: 1, 
    title: "The Hook Framework", 
    category: "Hooks", 
    views: "1.2M", 
    videoId: "z7e_S1_Xk2g", 
    platform: "youtube",
    start: 0, 
    end: 60 
  },
  { 
    id: 2, 
    title: "Instagram Storyselling", 
    category: "Storytelling", 
    views: "850K", 
    videoId: "C5_q5DQ9dbX", 
    platform: "instagram",
    start: 0, 
    end: 60 
  },
  { 
    id: 3, 
    title: "Visual Retentions", 
    category: "Viral Formats", 
    views: "2.1M", 
    videoId: "JfbnpYLe3Ms", 
    platform: "youtube",
    start: 0, 
    end: 60 
  },
  { 
    id: 4, 
    title: "Viral Reel Breakdown", 
    category: "Hooks", 
    views: "400K", 
    videoId: "C5_r5DQ9dbY", 
    platform: "instagram",
    start: 0, 
    end: 60 
  },
  { 
    id: 5, 
    title: "Pacing Techniques", 
    category: "Viral Formats", 
    views: "3.5M", 
    videoId: "6HBxWrmI8OU", 
    platform: "youtube",
    start: 0, 
    end: 60 
  },
];

const CATEGORIES = ["All", "Hooks", "Storytelling", "Viral Formats"];

interface ShortVideoLoopProps {
  videoId: string;
  title: string;
  platform: "youtube" | "instagram";
  start?: number;
  end?: number;
}

function ShortVideoLoop({ videoId, title, platform, start = 0, end = 60 }: ShortVideoLoopProps) {
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  
  // Dynamic Thumbnail Logic
  const initialThumb = platform === "youtube" 
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : `https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60`; // Premium Instagram Placeholder
    
  const [thumbUrl, setThumbUrl] = useState(initialThumb);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.1, once: false });

  // Re-sync isReady when coming back into view
  useEffect(() => {
    if (!isInView) {
      setIsReady(false);
    }
  }, [isInView]);

  // Force play when ready and in view
  useEffect(() => {
    if (isReady && isInView && iframeRef.current && platform === "youtube") {
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: "playVideo", args: "" }),
        "*"
      );
    }
  }, [isReady, isInView, platform]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!iframeRef.current) return;
    const command = isPlaying ? 'pauseVideo' : 'playVideo';
    iframeRef.current.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: command, args: '' }), '*');
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!iframeRef.current) return;
    const command = isMuted ? 'unMute' : 'mute';
    iframeRef.current.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: command, args: '' }), '*');
    setIsMuted(!isMuted);
  };

  const handleThumbError = () => {
    if (thumbUrl.includes('maxresdefault')) {
      setThumbUrl(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full bg-[#0F0F0F] flex items-center justify-center overflow-hidden rounded-2xl cursor-default group/vid">
      {/* High-res Thumbnail with fallback */}
      <img
        src={thumbUrl}
        alt={title}
        onError={handleThumbError}
        className={cn(
          "absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-700",
          (isReady && isInView) ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        style={{ objectPosition: 'center 20%' }}
      />

      {/* Conditional Iframe Loading - Based on InView */}
      {isInView && (
        <div className="absolute inset-0 z-30 scale-[1.3] pointer-events-none flex items-center justify-center">
          <div className="w-full aspect-video">
             {platform === "youtube" ? (
               <iframe
                 ref={iframeRef}
                 src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&start=${start}&end=${end}&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&playsinline=1&enablejsapi=1`}
                 className="w-full h-full"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                 onLoad={() => {
                   setTimeout(() => setIsReady(true), 500);
                 }}
                 title={title}
               />
             ) : (
               <iframe
                 src={`https://www.instagram.com/reels/${videoId}/embed/`}
                 className="w-full h-full border-none"
                 onLoad={() => {
                   setTimeout(() => setIsReady(true), 1200);
                 }}
                 title={title}
               />
             )}
          </div>
        </div>
      )}

      {/* Play/Pause/Mute Controls - only visible if in view */}
      {isInView && (
        <div className="absolute inset-0 z-40 opacity-0 group-hover/vid:opacity-100 transition-opacity duration-300">
          <div 
            className="absolute inset-0 flex items-center justify-center cursor-pointer" 
            onClick={togglePlay}
          >
            <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white scale-90 hover:scale-100 transition-transform">
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" fill="currentColor" />}
            </div>
          </div>

          <div className="absolute bottom-4 right-4 flex items-center gap-2">
             <button 
               onClick={toggleMute}
               className="w-9 h-9 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#FFC107] hover:text-black transition-colors"
             >
               {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
             </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ShortPortfolioItem({ project }: { project: typeof SHORTFORM_PROJECTS[0] }) {
  return (
    <CarouselItem className="pl-4 md:pl-6 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="group/card flex flex-col gap-4"
      >
        <div className="relative rounded-2xl overflow-hidden bg-[#141414] border border-white/10 w-full aspect-[9/16] shadow-lg group/card">
          <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10">
            <Eye className="w-3 h-3 text-[#FFC107]" />
            <span className="text-white text-[10px] font-bold">{project.views}</span>
          </div>

          <ShortVideoLoop 
            videoId={project.videoId} 
            title={project.title} 
            platform={project.platform as "youtube" | "instagram"}
            start={project.start}
            end={project.end}
          />
        </div>

        <div className="px-1">
          <div className="text-[#FFC107] text-[11px] font-bold uppercase tracking-widest mb-1.5 opacity-90">
            {project.category}
          </div>
          <h3 className="text-lg font-bold text-white group-hover/card:text-[#FFC107] transition-colors line-clamp-1">
            {project.title}
          </h3>
        </div>
      </motion.div>
    </CarouselItem>
  );
}

export default function PortfolioShortform() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects =
    activeTab === "All"
      ? SHORTFORM_PROJECTS
      : SHORTFORM_PROJECTS.filter((p) => p.category === activeTab);

  return (
    <section className="py-12 md:py-16 bg-[#0B0B0B] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">
                Shorts & Reels
              </h2>
              <p className="text-[#9A9A9A] text-lg max-w-2xl leading-relaxed">
                High-velocity content engineered for algorithmic scale and immediate attention capture.
              </p>
            </div>
          </div>
        </motion.div>

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

        <div className="relative group/carousel">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <ShortPortfolioItem key={`${project.id}-${project.videoId}`} project={project} />
                ))}
              </AnimatePresence>
            </CarouselContent>
            
            <div className="flex justify-end gap-3 mt-6 pr-4 md:pr-6">
               <CarouselPrevious className="relative left-0 top-0 translate-y-0 h-10 w-10 border-white/10 bg-white/5 hover:bg-[#FFC107] hover:text-black backdrop-blur-md text-white shadow-lg" />
               <CarouselNext className="relative right-0 top-0 translate-y-0 h-10 w-10 border-white/10 bg-white/5 hover:bg-[#FFC107] hover:text-black backdrop-blur-md text-white shadow-lg" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
