import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Eye } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SHORTFORM_PROJECTS = [
  { id: 1, title: "The Hook Framework", category: "Hooks", views: "1.2M", videoId: "6HBxWrmI8OU", end: 60 },
  { id: 2, title: "Storytelling Secrets", category: "Storytelling", views: "850K", videoId: "6HBxWrmI8OU", end: 60 },
  { id: 3, title: "Visual Retentions", category: "Viral Formats", views: "2.1M", videoId: "6HBxWrmI8OU", end: 60 },
  { id: 4, title: "Editing Breakdown", category: "Hooks", views: "400K", videoId: "6HBxWrmI8OU", end: 60 },
  { id: 5, title: "Pacing Techniques", category: "Viral Formats", views: "3.5M", videoId: "6HBxWrmI8OU", end: 60 },
  { id: 6, title: "Founder Advice", category: "Storytelling", views: "900K", videoId: "6HBxWrmI8OU", end: 60 },
];

const CATEGORIES = ["All", "Hooks", "Storytelling", "Viral Formats"];

function ShortVideoLoop({ videoId, title, start = 0, end = 60 }: { videoId: string; title: string; start?: number; end?: number }) {
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
      className="relative w-full h-full bg-[#0F0F0F] flex items-center justify-center overflow-hidden rounded-2xl cursor-default group/vid"
    >
      {/* High-res Thumbnail */}
      <img
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        className={`absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-1000 ${
          isReady ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{ objectPosition: 'center 20%' }}
      />

      {/* Tuned scale to hide YT UI while staying framed nicely in portrait */}
      <div className="absolute inset-0 z-10 scale-[1.3] pointer-events-none flex items-center justify-center">
        <div className="w-full aspect-video">
           <iframe
             ref={iframeRef}
             src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&start=${start}&end=${end}&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&playsinline=1&enablejsapi=1`}
             className="w-full h-full"
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
             onLoad={() => {
               setTimeout(() => setIsReady(true), 2000);
             }}
             title={title}
           />
        </div>
      </div>

      <div className="absolute inset-0 z-30 opacity-0 group-hover/vid:opacity-100 transition-opacity duration-300">
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

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-25 pointer-events-none" />
    </div>
  );
}

export default function PortfolioShortform() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects =
    activeTab === "All"
      ? SHORTFORM_PROJECTS
      : SHORTFORM_PROJECTS.filter((p) => p.category === activeTab);

  return (
    <section className="py-16 md:py-24 bg-[#0B0B0B] relative overflow-hidden">
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
            <span className="text-[#9A9A9A] text-sm tracking-widest uppercase">The Hook</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">
                Shorts & Reels
              </h2>
              <p className="text-[#9A9A9A] text-lg max-w-xl leading-relaxed">
                High-velocity content engineered for algorithmic scale and immediate attention capture.
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
            <CarouselContent className="-ml-4 md:-ml-6 py-4">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <CarouselItem
                    key={project.id}
                    className="pl-4 md:pl-6 basis-[80%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-4"
                    >
                      <div className="relative rounded-2xl overflow-hidden bg-[#141414] border border-white/10 aspect-[9/16] shadow-lg group/card">
                        <ShortVideoLoop 
                          videoId={project.videoId} 
                          title={project.title} 
                          end={project.end}
                        />
                        
                        <div className="absolute top-3 left-3 z-30 pointer-events-none">
                           <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full">
                             <Eye className="w-3.5 h-3.5 text-[#FFC107]" />
                             <span className="text-white text-[11px] font-bold">{project.views}</span>
                           </div>
                        </div>
                      </div>

                      <div className="px-1">
                        <div className="text-[#FFC107] text-[11px] font-bold uppercase tracking-widest mb-1.5 opacity-90">
                          {project.category}
                        </div>
                        <h3 className="text-lg font-bold text-white leading-tight group-hover/card:text-[#FFC107] transition-colors">
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
