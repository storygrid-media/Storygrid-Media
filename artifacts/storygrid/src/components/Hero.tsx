import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

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
    <div ref={ref} className="text-4xl md:text-5xl font-display font-bold text-[#FFC107]">
      {display(count)}{count >= target ? suffix : ""}
    </div>
  );
}

const YOUTUBE_VIDEO_ID = "6HBxWrmI8OU";

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 hidden md:block">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1&vq=hd1080`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ width: "120vw", height: "120vh", minWidth: "120vw", minHeight: "120vh" }}
          allow="autoplay; encrypted-media"
          tabIndex={-1}
          title="Background video"
          loading="eager"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/80 via-[#0B0B0B]/60 to-[#0B0B0B]/95 z-[1]" />
      <div className="absolute inset-0 md:hidden z-[0]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#111111] via-[#0B0B0B] to-[#080808]" />
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]" aria-hidden="true">
          <filter id="mobile-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#mobile-grain)" />
        </svg>
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04] mix-blend-overlay z-[2]" aria-hidden="true">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      <div className="relative z-10 container mx-auto px-6 md:px-16 lg:px-24 text-center flex flex-col items-center gap-10 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center gap-8 max-w-5xl"
        >
          <h1 className="font-display text-5xl sm:text-6xl lg:text-[88px] leading-[1.05] font-bold tracking-tight">
            We Build Content Systems
            <br />
            That{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-black px-4 py-1">Scale Founders</span>
              <span className="absolute inset-0 bg-[#FFC107] -skew-x-3 rounded-sm" />
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#9A9A9A] max-w-2xl leading-relaxed">
            Stop guessing with your content. We engineer end-to-end media systems
            for creators and founders — designed to capture attention and drive
            serious growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button
              size="lg"
              className="bg-[#FFC107] text-black hover:bg-[#FFC107]/90 font-semibold text-lg h-14 px-10"
              onClick={scrollToContact}
              data-testid="button-hero-cta-primary"
            >
              Book a Growth Call
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 hover:bg-white/5 text-white h-14 px-10 text-lg"
              onClick={scrollToWork}
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
          className="grid grid-cols-3 gap-8 md:gap-16 pt-10 border-t border-white/10 w-full max-w-3xl"
        >
          <div className="text-center">
            <CountUp target={2} suffix="M+" display={(n) => `${n}`} duration={1500} />
            <div className="text-sm text-[#9A9A9A] mt-2">Audience Reached</div>
          </div>
          <div className="text-center">
            <CountUp target={1} suffix="M+" display={(n) => `${n}`} duration={1800} />
            <div className="text-sm text-[#9A9A9A] mt-2">Views Generated</div>
          </div>
          <div className="text-center">
            <CountUp target={3500} suffix="" display={(n) => n === 0 ? "0" : n >= 3500 ? "3.5K" : `${(n / 1000).toFixed(1)}K`} duration={2200} />
            <div className="text-sm text-[#9A9A9A] mt-2">Subscriber Growth</div>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          onClick={scrollToWork}
          className="mt-8 text-white/40 hover:text-[#FFC107] transition-colors animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown size={32} />
        </motion.button>
      </div>
    </section>
  );
}
