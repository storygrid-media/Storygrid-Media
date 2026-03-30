import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";



function RotatingText() {
  const words = ["Podcasts", "YouTube", "Shorts", "Authority"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="relative inline-block align-top perspective-[1000px] h-[1.2em] mb-[-0.2em]">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ rotateX: 90, opacity: 0, y: 10 }}
          animate={{ rotateX: 0, opacity: 1, y: 0 }}
          exit={{ rotateX: -90, opacity: 0, y: -10 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.23, 1, 0.32, 1] // Custom cubic-bezier for snappy mechanical feel
          }}
          className="relative z-10 text-black px-3 md:px-4 py-0.5 bg-[#FFC107] [box-decoration-break:clone] [-webkit-box-decoration-break:clone] inline-block font-black tracking-tighter"
          style={{ transformOrigin: "center center" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

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
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 400]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };



  return (
    <section className="relative flex items-center justify-center overflow-hidden min-h-screen lg:min-h-[100dvh]">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <iframe
          src={`https://www.youtube.com/embed/6HBxWrmI8OU?autoplay=1&mute=1&loop=1&playlist=6HBxWrmI8OU&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=0`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-125 md:scale-115"
          style={{ 
            width: "max(100vw, 177.77vh)", 
            height: "max(56.25vw, 100vh)",
            minHeight: "100%",
            minWidth: "100%"
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          tabIndex={-1}
          title="Background video"
          loading="eager"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/95 via-transparent to-[#0B0B0B] z-[1]" />
      <div className="absolute inset-0 bg-[#0B0B0B]/40 backdrop-brightness-[0.8] radial-vignette z-[1]" />

      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] mix-blend-overlay z-[2]" aria-hidden="true">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>


      <div className="relative z-10 container mx-auto px-6 md:px-16 lg:px-24 text-center flex flex-col items-center gap-10 md:gap-16 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center gap-6 md:gap-8 max-w-5xl"
        >
          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl leading-[1.1] md:leading-[1.05] font-black tracking-tighter">
            Scale Your Influence
            <br />
            With{" "}
            <RotatingText />
          </h1>

          <p className="text-base md:text-lg text-[#9A9A9A] max-w-xl leading-relaxed">
            Stop guessing. We help you engineer high-performance media systems
            designed to capture attention, build authority, and drive serious growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-1 md:pt-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <Button
                variant="luxury"
                size="lg"
                className="w-full sm:w-auto shadow-xl shadow-[#FFC107]/10"
                onClick={scrollToContact}
                data-testid="button-hero-cta-primary"
              >
                Book Your Strategy Session
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            <Button
              size="lg"
              variant="outline"
              className="border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 text-white w-full sm:w-auto transition-all"
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
          className="w-full max-w-4xl mt-2 md:mt-3 pt-3 md:pt-4 border-t border-white/10"
        >
          <div className="grid grid-cols-3 gap-2 sm:gap-6 md:gap-8">
            <div className="text-center px-2">
              <CountUp target={20} suffix="M+" display={(n) => `${n}`} duration={1500} />
              <div className="text-xs sm:text-sm text-[#9A9A9A] mt-1 font-medium">Audience Reached</div>
            </div>
            <div className="text-center px-2">
              <CountUp target={100} suffix="M+" display={(n) => `${n}`} duration={1800} />
              <div className="text-xs sm:text-sm text-[#9A9A9A] mt-1 font-medium">Views Generated</div>
            </div>
            <div className="text-center px-2">
              <CountUp target={750} suffix="K+" display={(n) => `${n}`} duration={2200} />
              <div className="text-xs sm:text-sm text-[#9A9A9A] mt-1 font-medium">Subscriber Growth</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
