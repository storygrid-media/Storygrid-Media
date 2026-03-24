import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
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
  { 
    id: 1, 
    title: "The Future of AI - Expert Panel", 
    category: "Podcast", 
    videoId: "sDbufh727Rc",
    start: 0,
    end: 60 
  },
  { 
    id: 2, 
    title: "Why Startups Fail in 2024", 
    category: "Talking Head", 
    videoId: "kPCUxqwADiU",
    start: 30, 
    end: 90 
  },
  { 
    id: 3, 
    title: "Scaling Modern Media Engines", 
    category: "Podcast", 
    videoId: "q5DQ9dbXn0g",
    start: 10,
    end: 70 
  },
  { 
    id: 4, 
    title: "The Architecture of Virality", 
    category: "Talking Head", 
    videoId: "dQw4w9WgXcQ",
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
  const isInView = useInView(containerRef, { amount: 0.1, once: false });

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
              setTimeout(() => setIsReady(true), 500);
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

        <div className="px-1">
          <div className="text-[#FFC107] text-[11px] font-bold uppercase tracking-widest mb-1.5 opacity-90">
            {project.category}
          </div>
          <h3 className="text-xl font-bold text-white group-hover/card:text-[#FFC107] transition-colors line-clamp-1">
            {project.title}
          </h3>
        </div>
      </motion.div>
    </CarouselItem>
  );
}

export default function PortfolioLongform() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects =
    activeTab === "All"
      ? LONGFORM_PROJECTS
      : LONGFORM_PROJECTS.filter((p) => p.category === activeTab);

  return (
    <section id="work" className="py-12 md:py-16 bg-[#080808] relative overflow-hidden">
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
                Longform & Podcasts
              </h2>
              <p className="text-[#9A9A9A] text-lg max-w-2xl leading-relaxed">
                <span className="text-white font-medium">Podcasts:</span> Scalable authority through high-retention longform conversations. 
                <br />
                <span className="text-white font-medium">Talking Heads:</span> Expert-led content designed to establish immediate market leadership.
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
                  <LongPortfolioItem key={`${project.id}-${project.videoId}`} project={project} />
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
