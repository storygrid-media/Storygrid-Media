import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    title: "Anomaly - Cinematic Ski", 
    category: "Intro", 
    videoId: "sDbufh727Rc",
    start: 0,
    end: 180 // 3 mins
  },
  { 
    id: 2, 
    title: "Production Breakdown", 
    category: "Podcast", 
    videoId: "kPCUxqwADiU",
    start: 30, // Skip 30s intro
    end: 210 // 3 mins later
  },
  { 
    id: 3, 
    title: "Strategy Mastery", 
    category: "Talking Head", 
    videoId: "q5DQ9dbXn0g",
    start: 10,
    end: 190 
  },
];

const CATEGORIES = ["All", "Podcast", "Talking Head", "Intro"];

function VideoLoop({ videoId, title, start = 0, end = 180 }: { videoId: string; title: string; start?: number; end?: number }) {
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  return (
    <div 
      className="relative w-full h-full bg-[#0F0F0F] flex items-center justify-center overflow-hidden rounded-xl cursor-default group/vid"
    >
      {/* High-res Thumbnail */}
      <img
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        className={`absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-1000 ${
          isReady ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />

      {/* The Stealth Iframe - Exact 1.05x scale as requested */}
      <div className="absolute inset-0 z-10 scale-[1.05] pointer-events-none origin-center">
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&start=${start}&end=${end}&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&playsinline=1&enablejsapi=1`}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          onLoad={() => {
            setTimeout(() => setIsReady(true), 1500);
          }}
          title={title}
        />
      </div>

      <div className="absolute inset-0 z-30 opacity-0 group-hover/vid:opacity-100 transition-opacity duration-300">
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

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-25 pointer-events-none" />
    </div>
  );
}

export default function PortfolioLongform() {
  const [activeTab, setActiveTab] = useState("All");

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
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#FFC107]" />
            <span className="text-[#9A9A9A] text-sm tracking-widest uppercase">The Core</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">
                Longform & Podcasts
              </h2>
              <p className="text-[#9A9A9A] text-lg max-w-xl leading-relaxed">
                High-retention storytelling designed to build deep authority and trust with your audience.
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
                  <CarouselItem
                    key={project.id}
                    className="pl-4 md:pl-6 basis-full md:basis-1/2 lg:basis-1/3"
                  >
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-4"
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
                ))}
              </AnimatePresence>
            </CarouselContent>
            
            <div className="flex justify-end gap-3 mt-8 pr-4 md:pr-6">
               <CarouselPrevious className="relative left-0 top-0 translate-y-0 h-10 w-10 border-white/10 bg-white/5 hover:bg-[#FFC107] hover:text-black backdrop-blur-md text-white shadow-lg" />
               <CarouselNext className="relative right-0 top-0 translate-y-0 h-10 w-10 border-white/10 bg-white/5 hover:bg-[#FFC107] hover:text-black backdrop-blur-md text-white shadow-lg" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
