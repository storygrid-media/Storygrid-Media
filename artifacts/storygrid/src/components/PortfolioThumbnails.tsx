import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface ThumbnailItem {
  id: string;
  image: string;
  title: string;
  ctr: string;
  tag: string;
}

const ALL_THUMBNAILS: ThumbnailItem[] = [
  {
    id: "thumb-1",
    image: "/assets/thumbnails/How Ram Mandir Changed Ayodhya, India & Our Identity_converted.avif",
    title: "How Ram Mandir Changed Ayodhya & Our Identity",
    ctr: "14.5%",
    tag: "VIRAL LAYOUT"
  },
  {
    id: "thumb-2",
    image: "/assets/thumbnails/Akash Gupta, Co-Founder of Zypp (₹450 Cr Revenue $3B Val.) on Building India’s EV Logistics Backbone_converted.avif",
    title: "Building India's EV Logistics Backbone: Akash Gupta",
    ctr: "13.8%",
    tag: "PERFORMANCE ENGINEERED"
  },
  {
    id: "thumb-3",
    image: "/assets/thumbnails/India is Fighting a SILENT WAR and NO ones talking about it!_converted.avif",
    title: "India's Silent War: What No One is Talking About",
    ctr: "15.2%",
    tag: "RETENTION FOCUSED"
  },
  {
    id: "thumb-4",
    image: "/assets/thumbnails/Dr. Amit - Everything You Know About Plastic Surgery Is Wrong_converted.avif",
    title: "Everything You Know About Plastic Surgery Is Wrong",
    ctr: "12.9%",
    tag: "A/B TESTED"
  },
  {
    id: "thumb-5",
    image: "/assets/thumbnails/Anshita Mehrotra, Fix My Curls - How She Built a Multi-Crore D2C Beauty Brand from Scratch at 26_converted.avif",
    title: "Building Fix My Curls: The Multi-Crore D2C Journey",
    ctr: "13.1%",
    tag: "HIGH-CTR SCRIPT"
  },
  {
    id: "thumb-6",
    image: "/assets/thumbnails/Shankar Singh - Why India Is Still Dirty, Bureaucracy Problems & Clean-Up Missions_converted.avif",
    title: "Why India is Still Dirty: Bureaucracy & Clean-Up",
    ctr: "11.8%",
    tag: "ALGORITHM OPTIMIZED"
  },
  {
    id: "thumb-7",
    image: "/assets/thumbnails/How to Stand Out for Y Combinator_converted.avif",
    title: "How to Actually Stand Out for Y Combinator",
    ctr: "12.4%",
    tag: "A/B TESTED"
  },
  {
    id: "thumb-8",
    image: "/assets/thumbnails/Aakriti Rawal - How She Built a Multi-Crore Modern Fashion Empire from Indian Craft_converted.avif",
    title: "Building a Multi-Crore Fashion Empire from Craft",
    ctr: "13.5%",
    tag: "PERFORMANCE ENGINEERED"
  },
  {
    id: "thumb-9",
    image: "/assets/thumbnails/Sikandar Ali - How to Start a Clothing Brand in 2025 (Full guide)_converted.avif",
    title: "The 2025 Clothing Brand Guide: Sikandar Ali",
    ctr: "14.2%",
    tag: "VIRAL LAYOUT"
  },
  {
    id: "thumb-10",
    image: "/assets/thumbnails/Kashish Anand on Content Creation, Marriage Showoffs, Relationships & Real Life_converted.avif",
    title: "Content Creation vs Real Life: Kashish Anand",
    ctr: "12.1%",
    tag: "RETENTION FOCUSED"
  },
  {
    id: "thumb-11",
    image: "/assets/thumbnails/Inside WearDuds Factory - How Sikandar Ali Built a Clothing Brand from Scratch_converted.avif",
    title: "Inside the Factory: Building WearDuds from Scratch",
    ctr: "11.5%",
    tag: "ALGORITHM OPTIMIZED"
  },
  {
    id: "thumb-12",
    image: "/assets/thumbnails/My First Q&A - My Life, Business, Content Creation & Future Goals!_converted.avif",
    title: "My Journey: Life, Business & Future Goals",
    ctr: "10.9%",
    tag: "PERFORMANCE ENGINEERED"
  }
];



function ThumbnailCard({ item }: { item: ThumbnailItem }) {
  return (
    <div className="group/card flex flex-col gap-5">
      {/* Image Container */}
      <div className="relative rounded-2xl overflow-hidden bg-[#141414] border border-white/5 w-full aspect-video shadow-xl group/card">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Info Container - Placed BELOW the image */}
      <div className="px-1 space-y-3">
        <div className="flex items-center gap-3">
           <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded-lg border border-white/10 group-hover/card:border-[#FFC107]/50 transition-colors">
              <span className="text-[#FFC107] text-[11px] font-black">{item.ctr}</span>
              <span className="text-white/40 text-[9px] font-bold uppercase tracking-tight">CTR</span>
           </div>
           <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FFC107] rounded-lg">
              <Zap className="w-3 h-3 text-black fill-black" />
              <span className="text-black text-[9px] font-black uppercase tracking-wider">{item.tag}</span>
           </div>
        </div>
        <h3 className="text-lg md:text-xl font-bold text-white group-hover/card:text-[#FFC107] transition-colors line-clamp-3 leading-snug">
          {item.title}
        </h3>
      </div>
    </div>
  );
}

export default function PortfolioThumbnails() {
  const [api, setApi] = useState<CarouselApi>();

  // Autoplay Effect
  useEffect(() => {
    if (!api) return;
    
    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [api]);

  return (
    <section id="work-thumbnails" className="py-16 md:py-24 bg-[#080808] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-16 lg:px-24 mb-2">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, ease: "easeOut" }}
           viewport={{ once: true, margin: "-100px" }}
           className="mb-8"
        >
          <div className="flex flex-col items-center text-center pb-6">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
               Engineered for <span className="text-[#FFC107]">the Click.</span>
            </h2>
            <p className="text-[#9A9A9A] text-lg max-w-2xl leading-relaxed">
               High-converting thumbnails rigorously tested to secure 12%+ CTRs and maximum reach through proprietary A/B optimization.
            </p>
          </div>
        </motion.div>
      </div>
      
      <div className="container mx-auto px-6 md:px-16 lg:px-24">
        <div className="relative group/carousel">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-8">
              {ALL_THUMBNAILS.map((item) => (
                <CarouselItem key={item.id} className="pl-4 md:pl-8 basis-[90%] sm:basis-1/2 lg:basis-1/3">
                  <ThumbnailCard item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
