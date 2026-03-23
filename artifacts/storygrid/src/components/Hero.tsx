import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";



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
    <div ref={ref} className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-[#FFC107]">
      {display(count)}{count >= target ? suffix : ""}
    </div>
  );
}

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };



  return (
    <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: "clamp(500px, 56.25vw, 100vh)" }}>
      <div className="absolute inset-0">
        <iframe
          src={`https://www.youtube.com/embed/s9xk77X4m5c?autoplay=1&mute=1&loop=1&playlist=s9xk77X4m5c&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=0`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-125 md:scale-110"
          style={{ width: "100vw", height: "56.25vw", minHeight: "100vh", minWidth: "177.77vh" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          tabIndex={-1}
          title="Background video"
          loading="eager"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/90 via-[#0B0B0B]/70 to-[#0B0B0B]/95 z-[1]" />

      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04] mix-blend-overlay z-[2]" aria-hidden="true">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>


      <div className="relative z-10 container mx-auto px-6 md:px-16 lg:px-24 text-center flex flex-col items-center gap-10 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center gap-8 max-w-5xl"
        >
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[64px] leading-[1.05] font-bold tracking-tight">
            We Build Content Systems
            <br />
            That{" "}
            <span className="relative inline-block mt-2">
              <span className="relative z-10 text-black px-4 py-1 block">
                Scale Founders
              </span>
              <span className="absolute inset-0 bg-[#FFC107]" />
            </span>
          </h1>

          <p className="text-base md:text-lg text-[#9A9A9A] max-w-xl leading-relaxed">
            Stop guessing with your content. We engineer end-to-end media systems
            for creators and founders - designed to capture attention and drive
            serious growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-[#FFC107] hover:bg-[#FFC107] text-black font-bold text-base h-14 px-8 w-full sm:w-auto flex items-center justify-center transition-all border border-transparent"
                onClick={scrollToContact}
                data-testid="button-hero-cta-primary"
              >
                {/* Slide-in background */}
                <span className="absolute inset-0 w-full h-full bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                
                {/* Content */}
                <span className="relative flex items-center gap-2 group-hover:text-[#FFC107] transition-colors duration-300">
                  Book a Growth Call
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>
            
            <Button
              size="lg"
              variant="outline"
              className="border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 text-white h-14 px-8 text-base font-medium w-full sm:w-auto transition-all"
              onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="button-hero-cta-secondary"
            >
              See Our Work
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="w-full max-w-4xl mt-8 pt-10 border-t border-white/10"
        >
          <div className="grid grid-cols-3 gap-2 sm:gap-6 md:gap-8">
            <div className="text-center px-2">
              <CountUp target={2} suffix="M+" display={(n) => `${n}`} duration={1500} />
              <div className="text-xs sm:text-sm text-[#9A9A9A] mt-2 font-medium">Audience Reached</div>
            </div>
            <div className="text-center px-2">
              <CountUp target={1} suffix="M+" display={(n) => `${n}`} duration={1800} />
              <div className="text-xs sm:text-sm text-[#9A9A9A] mt-2 font-medium">Views Generated</div>
            </div>
            <div className="text-center px-2">
              <CountUp target={3500} suffix="" display={(n) => n === 0 ? "0" : n >= 3500 ? "3.5K" : `${(n / 1000).toFixed(1)}K`} duration={2200} />
              <div className="text-xs sm:text-sm text-[#9A9A9A] mt-2 font-medium">Subscriber Growth</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
