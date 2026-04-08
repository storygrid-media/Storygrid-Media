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
  // Intermixed for Client Diversity
  {
    id: 1,
    title: "Decoding the Multi-Billion Dollar AI Economy",
    channelName: "Startup Seekho",
    category: "Podcast",
    videoId: "sDbufh727Rc",
    start: 0,
    end: 60
  },
  {
    id: 8,
    title: "The Untold Story of Ram Mandir & Ayodhya",
    channelName: "AKHIL KOTHARI",
    category: "Podcast",
    videoId: "qKCHicakDmY",
    start: 0,
    end: 60
  },
  {
    id: 11,
    title: "Is Gold Still a Safe Investment in 2026?",
    channelName: "Asad Siddiqui: Finance Insider",
    category: "Talking Head",
    videoId: "SHsb2snNbdg",
    start: 0,
    end: 60
  },
  {
    id: 2,
    title: "Inside a ₹450 Crore D2C Fashion Playbook",
    channelName: "Startup Seekho",
    category: "Podcast",
    videoId: "vxnc3ee-Y20",
    start: 0,
    end: 60
  },
  {
    id: 16,
    title: "Inside Google: A tour of the Gurgaon HQ",
    channelName: "Shivangi Tiwari",
    category: "Talking Head",
    videoId: "QaRJlrGeh5s",
    start: 0,
    end: 60
  },
  {
    id: 9,
    title: "The Future of Delhi: A Candid Conversation",
    channelName: "AKHIL KOTHARI",
    category: "Podcast",
    videoId: "O46GhLcvGkM",
    start: 0,
    end: 60
  },
  {
    id: 18,
    title: "The Complete 2024 Coding Roadmap",
    channelName: "Priyansh Agarwal",
    category: "Talking Head",
    videoId: "n-Xkbqcfi9w",
    start: 0,
    end: 60
  },
  {
    id: 3,
    title: "The 2025 Strategy for Clothing Brands",
    channelName: "Startup Seekho",
    category: "Podcast",
    videoId: "cUYNkC96vHo",
    start: 0,
    end: 60
  },
  {
    id: 12,
    title: "Warning: Don't Lose Control of Your Equity",
    channelName: "Asad Siddiqui: Finance Insider",
    category: "Talking Head",
    videoId: "oWn-84Fk4tM",
    start: 0,
    end: 60
  },
  {
    id: 17,
    title: "10 High-Paying Remote Jobs (No Degree)",
    channelName: "Shivangi Tiwari",
    category: "Talking Head",
    videoId: "ZiFqX6AwOrc",
    start: 0,
    end: 60
  },
  {
    id: 4,
    title: "Building a Multi-Crore Beauty Brand from Zero",
    channelName: "Startup Seekho",
    category: "Podcast",
    videoId: "aTWUBaab0Zk",
    start: 0,
    end: 60
  },
  {
    id: 19,
    title: "Logic Mastery for Faster Problem Solving",
    channelName: "Priyansh Agarwal",
    category: "Talking Head",
    videoId: "qrexfVoXCDo",
    start: 30,
    end: 90
  },
  {
    id: 13,
    title: "Startup Funding: From Seed to Series C",
    channelName: "Asad Siddiqui: Finance Insider",
    category: "Talking Head",
    videoId: "xM5RTXM9kCA",
    start: 0,
    end: 60
  },
  {
    id: 5,
    title: "Why Textile is India's Most Underrated Business",
    channelName: "Startup Seekho",
    category: "Podcast",
    videoId: "DwXzDIq7RQY",
    start: 0,
    end: 60
  },
  {
    id: 20,
    title: "How I Mastered the Amazon SDE-2 Interview",
    channelName: "Priyansh Agarwal",
    category: "Talking Head",
    videoId: "ce5eZnut9go",
    start: 0,
    end: 60
  },
  {
    id: 6,
    title: "How to Actually Stand Out for Y Combinator",
    channelName: "Startup Seekho",
    category: "Podcast",
    videoId: "EgIv8k17kRE",
    start: 0,
    end: 60
  },
  {
    id: 14,
    title: "The Truth About Equity Dilution",
    channelName: "Asad Siddiqui: Finance Insider",
    category: "Talking Head",
    videoId: "bzvHF34rgQQ",
    start: 0,
    end: 60
  },
  {
    id: 7,
    title: "Building a ₹40 Cr Heritage Label in 2 Years",
    channelName: "Startup Seekho",
    category: "Podcast",
    videoId: "xG2DsoNr9R8",
    start: 0,
    end: 60
  },
  {
    id: 15,
    title: "The Reality of India's Startup Job Market",
    channelName: "Asad Siddiqui: Finance Insider",
    category: "Talking Head",
    videoId: "EcinScx3q40",
    start: 0,
    end: 60
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}


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
            className="mt-1 flex items-center gap-1.5 px-3 py-1.5 bg-[#FFC107] text-black border border-[#FFC107] rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-white hover:border-white transition-all shadow-lg shrink-0 group/yt"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Watch ${project.title} on YouTube`}
          >
            <span className="hidden sm:inline">Watch on</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover/yt:rotate-12 transition-transform" />
            YT
          </a>
        </div>
      </motion.div>
    </CarouselItem>
  );
}

export default function PortfolioLongform() {
  const [activeTab, setActiveTab] = useState("All");
  const [shuffledProjects, setShuffledProjects] = useState(LONGFORM_PROJECTS);
  const [api, setApi] = useState<any>();

  // Randomize on Mount
  useEffect(() => {
    setShuffledProjects(shuffleArray(LONGFORM_PROJECTS));
  }, []);

  // Autoplay Effect
  useEffect(() => {
    if (!api) return;

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 8000); // Scroll every 8 seconds

    return () => clearInterval(intervalId);
  }, [api]);

  const filteredProjects =
    activeTab === "All"
      ? shuffledProjects
      : shuffledProjects.filter((p) => p.category === activeTab);

  return (
    <section id="work" className="py-10 md:py-16 bg-[#080808] relative overflow-hidden">
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
              duration: 50, // Slower slide transition
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => (
                  <LongPortfolioItem key={`${project.id}-${project.videoId}-${idx}`} project={project} />
                ))}
              </AnimatePresence>
            </CarouselContent>

            <div className="flex justify-center gap-6 mt-8">
              <CarouselPrevious aria-label="Previous Project" className="static translate-y-0 h-14 w-14 border-white/10 bg-white/5 hover:bg-[#FFC107] hover:text-black text-white transition-all duration-300 shadow-xl" />
              <CarouselNext aria-label="Next Project" className="static translate-y-0 h-14 w-14 border-white/10 bg-white/5 hover:bg-[#FFC107] hover:text-black text-white transition-all duration-300 shadow-xl" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
