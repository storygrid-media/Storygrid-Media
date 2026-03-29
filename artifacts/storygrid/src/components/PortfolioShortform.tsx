import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Eye, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const SHORTFORM_PROJECTS = [
  { id: 0, title: "High-Tier Growth Breakdown", views: "184.3K", videoId: "z58LBmp6-Io" },
  { id: 1, title: "Performance Hooks", views: "124.6K", videoId: "9w9-LGDtzj4" },
  { id: 2, title: "Viral Pacing", views: "42.1K", videoId: "NJXGLzF7ig4" },
  { id: 3, title: "Retention Strategy", views: "156.8K", videoId: "N8H9PbA8BJ0" },
  { id: 4, title: "Algorithm Scale", views: "89.2K", videoId: "kBg0bdCyOkE" },
  { id: 5, title: "Engagement Flow", views: "31.4K", videoId: "Fu1AtrAYMFs" },
  { id: 6, title: "Market Influence", views: "94.7K", videoId: "VIeyoYx0ATs" },
  { id: 7, title: "Storyselling Logic", views: "67.1K", videoId: "bQKkOdT3K-w" },
  { id: 8, title: "Revenue Conversion", views: "142.5K", videoId: "cj4bdMtIbSY" },
  { id: 9, title: "Brand Synergy", views: "78.9K", videoId: "HUO17-EocXQ" },
  { id: 10, title: "Growth Architecture", views: "56.4K", videoId: "hd-EV2I7PJ8" },
  { id: 11, title: "Strategic Pacing", views: "112.3K", videoId: "pj7Stteb1M0" },
  { id: 12, title: "Authority Design", views: "164.2K", videoId: "bx_Ndv0dAFU" },
  { id: 13, title: "Scale Operations", views: "28.5K", videoId: "J_hmHVG_r-8" },
  { id: 14, title: "Audience Lifecycle", views: "91.7K", videoId: "t1s4jibhX2E" },
  { id: 15, title: "Leveraged Editing", views: "108.4K", videoId: "9GmEoBlXHSo" },
];

interface ShortVideoLoopProps {
  videoId: string;
  title: string;
}

function ShortVideoLoop({ videoId, title }: ShortVideoLoopProps) {
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "300px", once: false });

  const thumbUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div ref={containerRef} className="relative w-full h-full bg-black overflow-hidden rounded-2xl sm:rounded-3xl">
      {/* Loading/Fallback Thumbnail */}
      <img
        src={thumbUrl}
        alt={title}
        className={cn(
          "absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-700",
          (isReady && isInView) ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      />

      {isInView && (
        <div className={cn(
          "absolute inset-0 z-10 flex items-center justify-center overflow-hidden",
          "scale-[1.12]"
        )}>
          <div className="w-full h-full pt-[2px]">
             <iframe
               src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&playsinline=1&enablejsapi=1`}
               className="w-full h-full"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               onLoad={() => setIsReady(true)}
               title={title}
             />
          </div>
        </div>
      )}

    </div>
  );
}

function ShortPortfolioItem({ project }: { project: typeof SHORTFORM_PROJECTS[0] }) {
  return (
    <CarouselItem className="pl-6 md:pl-10 basis-[85%] sm:basis-1/3 lg:basis-1/4 xl:basis-1/5">
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="group/card flex flex-col gap-4"
      >
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#141414] border border-white/10 w-full aspect-[9/16] shadow-xl transition-transform duration-500 group-hover/card:scale-[1.02]">
          <div className="absolute top-3 right-3 z-30">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
              <Eye className="w-3.5 h-3.5 text-[#FFC107]" />
              <span className="text-white text-[11px] font-black">{project.views}</span>
            </div>
          </div>

          <ShortVideoLoop 
            videoId={project.videoId} 
            title={project.title} 
          />
        </div>

        <div className="px-1 flex items-center justify-between gap-3">
          <h3 className="text-lg md:text-xl font-bold text-white group-hover/card:text-[#FFC107] transition-colors line-clamp-3 leading-tight flex-grow">
            {project.title}
          </h3>
          <a 
            href={`https://youtube.com/shorts/${project.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 text-[#9A9A9A] border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-[#FFC107] hover:text-black transition-all shadow-lg shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            YT
          </a>
        </div>
      </motion.div>
    </CarouselItem>
  );
}

export default function PortfolioShortform() {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;
    
    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 7000);

    return () => clearInterval(intervalId);
  }, [api]);

  return (
    <section id="work-shorts" className="py-16 md:py-24 bg-[#0B0B0B] relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFC107]/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex flex-col items-center text-center pb-8 border-b border-white/5">
            <h2 className="font-display text-4xl md:text-5xl font-black mb-6 text-white tracking-tight">
              Shorts & <span className="text-[#FFC107]">Reels.</span>
            </h2>
            <p className="text-[#9A9A9A] text-xl max-w-2xl leading-relaxed font-medium">
              High-velocity content engineered for algorithmic scale and seamless auto-looping engagement.
            </p>
          </div>
        </motion.div>


        <div className="relative">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-6 md:-ml-10">
              {SHORTFORM_PROJECTS.map((project) => (
                <ShortPortfolioItem key={`${project.id}-${project.videoId}`} project={project} />
              ))}
            </CarouselContent>
            
          </Carousel>
        </div>
      </div>
    </section>
  );
}
