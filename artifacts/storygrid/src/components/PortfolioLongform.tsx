import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, ExternalLink } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const LONGFORM_PROJECTS = [
  // Podcasts First
  { 
    id: 1, 
    title: "The Future of AI", 
    channelName: "FutureTech", 
    category: "Podcast",
    videoId: "sDbufh727Rc",
    start: 0,
    end: 60 
  },
  { 
    id: 4, 
    title: "Building a Multi-Crore Fashion Empire", 
    channelName: "FashionInsider", 
    category: "Podcast",
    videoId: "vxnc3ee-Y20",
    start: 0,
    end: 60 
  },
  { 
    id: 5, 
    title: "Clothing Brand Guide (2025)", 
    channelName: "MarketGrowth", 
    category: "Podcast",
    videoId: "cUYNkC96vHo",
    start: 0,
    end: 60 
  },
  { 
    id: 6, 
    title: "Beauty Brand from Scratch", 
    channelName: "BrandBuilder", 
    category: "Podcast",
    videoId: "aTWUBaab0Zk",
    start: 0,
    end: 60 
  },
  { 
    id: 7, 
    title: "Ayodhya & Indian Identity", 
    channelName: "IdentitySeries", 
    category: "Podcast",
    videoId: "qKCHicakDmY",
    start: 0,
    end: 60 
  },
  { 
    id: 8, 
    title: "Job Market Reality & Recruitment", 
    channelName: "CareerLogic", 
    category: "Podcast",
    videoId: "EcinScx3q40",
    start: 0,
    end: 60 
  },
  { 
    id: 9, 
    title: "Delhi Development & Elections", 
    channelName: "RegionalGrowth", 
    category: "Podcast",
    videoId: "O46GhLcvGkM",
    start: 0,
    end: 60 
  },
  { 
    id: 10, 
    title: "Building a ₹40 Cr Fashion Brand", 
    channelName: "FashionInsider", 
    category: "Podcast",
    videoId: "xG2DsoNr9R8",
    start: 0,
    end: 60 
  },
  { 
    id: 11, 
    title: "The Textile Business Explained", 
    channelName: "BusinessBasics", 
    category: "Podcast",
    videoId: "DwXzDIq7RQY",
    start: 0,
    end: 60 
  },
  { 
    id: 12, 
    title: "Y Combinator Founder Tips", 
    channelName: "FounderLogic", 
    category: "Podcast",
    videoId: "EgIv8k17kRE",
    start: 0,
    end: 60 
  },
  // Talking Heads
  { 
    id: 2, 
    title: "Why Startups Fail in 2024", 
    channelName: "FounderBrand", 
    category: "Talking Head",
    videoId: "kPCUxqwADiU",
    start: 30, 
    end: 90 
  },
  { 
    id: 13, 
    title: "Gold & Silver Buying Guide (2026)", 
    channelName: "FinanceWeekly", 
    category: "Talking Head",
    videoId: "SHsb2snNbdg",
    start: 0, 
    end: 60 
  },
  { 
    id: 14, 
    title: "SAFE Funding & 100% Ownership", 
    channelName: "StartupFund", 
    category: "Talking Head",
    videoId: "oWn-84Fk4tM",
    start: 0, 
    end: 60 
  },
  { 
    id: 15, 
    title: "Startup Funding Rounds Explained", 
    channelName: "StartupFund", 
    category: "Talking Head",
    videoId: "xM5RTXM9kCA",
    start: 0, 
    end: 60 
  },
  { 
    id: 16, 
    title: "Equity & Dilution for Founders", 
    channelName: "StartupFund", 
    category: "Talking Head",
    videoId: "bzvHF34rgQQ",
    start: 0, 
    end: 60 
  },
];

const CATEGORIES = ["All", "Podcast", "Talking Head"];

interface VideoLoopProps {
  videoId: string;
  title: string;
  start?: number;
  end?: number;
}

function VideoLoop({ videoId, title, start = 0, end = 60 }: VideoLoopProps) {
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [thumbUrl, setThumbUrl] = useState(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "300px", once: false });

  // Re-sync isReady when coming back into view
  useEffect(() => {
    if (!isInView) {
      setIsReady(false);
    }
  }, [isInView]);

  // Force play when ready and in view
  useEffect(() => {
    if (isReady && isInView && iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: "playVideo", args: "" }),
        "*"
      );
    }
  }, [isReady, isInView]);

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
    <div ref={containerRef} className="relative w-full h-full bg-[#0F0F0F] flex items-center justify-center overflow-hidden rounded-xl cursor-default group/vid">
      {/* High-res Thumbnail with fallback */}
      <img
        src={thumbUrl}
        alt={title}
        onError={handleThumbError}
        className={cn(
          "absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-700",
          (isReady && isInView) ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      />

      {/* Conditional Iframe Loading - Based on InView */}
      {isInView && (
        <div className="absolute inset-0 z-30 scale-[1.05] pointer-events-none origin-center">
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&start=${start}&end=${end}&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&playsinline=1&enablejsapi=1`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            onLoad={() => {
              setIsReady(true);
            }}
            title={title}
          />
        </div>
      )}

      {/* Controls Overlay - only visible if in view */}
      {isInView && (
        <div className="absolute inset-0 z-40 opacity-0 group-hover/vid:opacity-100 transition-opacity duration-300">
          <div 
            className="absolute inset-0 flex items-center justify-center cursor-pointer" 
            onClick={togglePlay}
          >
            <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white scale-90 hover:scale-100 transition-transform">
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" fill="currentColor" />}
            </div>
          </div>

          <div className="absolute bottom-4 right-4 flex items-center gap-2">
             <button 
               onClick={toggleMute}
               className="w-10 h-10 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#FFC107] hover:text-black transition-colors"
             >
               {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
             </button>
          </div>
        </div>
      )}
    </div>
  );
}

function LongPortfolioItem({ project }: { project: typeof LONGFORM_PROJECTS[0] }) {
  return (
    <CarouselItem className="pl-4 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3">
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="group/card flex flex-col gap-4"
      >
        <div className="relative rounded-xl overflow-hidden bg-[#141414] border border-white/10 w-full aspect-video shadow-lg group/card">
          <VideoLoop 
            videoId={project.videoId} 
            title={project.title} 
            start={project.start}
            end={project.end}
          />
        </div>

        <div className="px-1 flex items-start justify-between gap-4">
          <div className="flex-grow">
            <div className="text-[#FFC107] text-[11px] font-bold uppercase tracking-widest mb-1.5 opacity-90">
              {project.channelName}
            </div>
            <h3 className="text-xl font-bold text-white group-hover/card:text-[#FFC107] transition-colors line-clamp-3">
              {project.title}
            </h3>
          </div>
          <a 
            href={`https://youtube.com/watch?v=${project.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 flex items-center gap-1.5 px-2 py-1 bg-white/5 text-[#9A9A9A] border border-white/10 rounded-lg text-[9px] font-black uppercase tracking-wider hover:bg-[#FFC107] hover:text-black transition-all shadow-lg shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-3 h-3" />
            YT
          </a>
        </div>
      </motion.div>
    </CarouselItem>
  );
}

export default function PortfolioLongform() {
  const [activeTab, setActiveTab] = useState("Podcast");
  const [api, setApi] = useState<any>();

  // Autoplay Effect
  useEffect(() => {
    if (!api) return;
    
    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 4000); // Scroll every 4 seconds

    return () => clearInterval(intervalId);
  }, [api]);

  const filteredProjects =
    activeTab === "All"
      ? LONGFORM_PROJECTS
      : LONGFORM_PROJECTS.filter((p) => p.category === activeTab);

  return (
    <section id="work" className="py-16 md:py-24 bg-[#080808] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-8"
        >
          <div className="flex flex-col items-center text-center pb-6">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">
              Longform & Podcasts
            </h2>
            <p className="text-[#9A9A9A] text-lg max-w-2xl leading-relaxed">
              High-retention conversations and expert-led content designed to establish immediate market leadership through authority and scale.
            </p>
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
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <LongPortfolioItem key={`${project.id}-${project.videoId}`} project={project} />
                ))}
              </AnimatePresence>
            </CarouselContent>
            
            <div className="flex justify-center gap-6 mt-16">
               <CarouselPrevious className="static translate-y-0 h-14 w-14 border-white/10 bg-white/5 hover:bg-[#FFC107] hover:bg-[#FFC107] hover:text-black text-white transition-all duration-300 shadow-xl" />
               <CarouselNext className="static translate-y-0 h-14 w-14 border-white/10 bg-white/5 hover:bg-[#FFC107] hover:bg-[#FFC107] hover:text-black text-white transition-all duration-300 shadow-xl" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
