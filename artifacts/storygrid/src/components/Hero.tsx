import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

function CountUp({ target, suffix = "", display, duration = 2000 }: { target: number; suffix?: string; display: (n: number) => string; duration?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setCount(current);
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return (
    <div ref={ref} className="text-3xl md:text-4xl font-display font-bold text-[#FFC107]">
      {display(count)}{count >= target ? suffix : ""}
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"], layoutEffect: false });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="min-h-[100svh] pt-32 pb-20 flex items-center relative overflow-hidden" style={{ position: 'relative' }}>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFC107]/5 rounded-full blur-[120px]" />
      </motion.div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] mix-blend-overlay" aria-hidden="true">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
      
      <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-8"
        >
          <h1 className="font-display text-5xl sm:text-6xl lg:text-[80px] leading-[1.1] font-bold tracking-tight">
            We Build Content Systems That <br />
            <span className="text-[#FFC107]">Scale Founders</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
            Stop guessing with your content. We engineer end-to-end media systems for creators and founders designed to capture attention and drive serious growth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button 
              size="lg" 
              className="bg-[#FFC107] text-black hover:bg-[#FFC107]/90 font-semibold text-lg h-14 px-8"
              onClick={scrollToContact}
              data-testid="button-hero-cta-primary"
            >
              Book a Growth Call
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 hover:bg-white/5 text-white h-14 px-8 text-lg"
              onClick={scrollToWork}
              data-testid="button-hero-cta-secondary"
            >
              See Our Work
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/10 mt-4">
            <div>
              <CountUp target={2} suffix="M+" display={(n) => `${n}`} duration={1500} />
              <div className="text-sm text-muted-foreground mt-1">Audience Reached</div>
            </div>
            <div>
              <CountUp target={1} suffix="M+" display={(n) => `${n}`} duration={1800} />
              <div className="text-sm text-muted-foreground mt-1">Views Generated</div>
            </div>
            <div>
              <CountUp target={3500} suffix="" display={(n) => n === 0 ? "0" : n >= 3500 ? "3.5K" : `${(n / 1000).toFixed(1)}K`} duration={2200} />
              <div className="text-sm text-muted-foreground mt-1">Subscriber Growth</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="grid grid-cols-2 gap-4"
        >
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className={`relative rounded-2xl bg-[#141414] border border-white/5 aspect-[4/5] overflow-hidden group ${i % 2 === 0 ? 'translate-y-8' : ''}`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-[#FFC107] group-hover:text-black text-white cursor-pointer">
                  <Play className="w-5 h-5 ml-1" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 z-20">
                <div className="text-xs font-medium px-2 py-1 rounded-md bg-white/10 backdrop-blur-md text-white inline-block">
                  {i === 1 ? 'Podcast' : i === 2 ? 'Shorts' : i === 3 ? 'YouTube' : 'Reels'}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
