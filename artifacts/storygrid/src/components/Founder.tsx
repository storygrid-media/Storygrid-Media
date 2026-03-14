import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

function StatCounter({ target, suffix, label, duration = 2000 }: { target: number; suffix: string; label: string; duration?: number }) {
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
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white">
        {target >= 1000000
          ? `${count >= target ? (target / 1000000) : (count / 1000000).toFixed(1)}M${suffix}`
          : `${count >= target ? target.toLocaleString() : count.toLocaleString()}${suffix}`}
      </div>
      <div className="text-xs sm:text-sm text-white/50 mt-1 font-medium">{label}</div>
    </div>
  );
}

export default function Founder() {
  return (
    <section id="about" className="bg-[#0B0B0B]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="grid lg:grid-cols-2 min-h-[700px]"
      >
        <div className="relative overflow-hidden min-h-[500px] lg:min-h-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] via-[#111111] to-[#0B0B0B]" />

          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30" />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[280px] h-[360px] sm:w-[320px] sm:h-[420px] md:w-[380px] md:h-[500px] bg-[#1F1F1F] rounded-lg border border-white/5 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white/[0.06] text-[120px] font-display font-bold select-none">SG</div>
            </div>
          </div>

          <div className="absolute top-8 left-8 z-10">
            <div className="text-xs uppercase tracking-[0.2em] text-[#FFC107] font-semibold">
              Founder & Head of Strategy
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-20 pb-8 px-6 sm:px-10">
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
                <StatCounter target={2000000} suffix="+" label="YouTube Views" duration={1800} />
                <StatCounter target={1000000} suffix="+" label="Subscribers" duration={2000} />
                <StatCounter target={3500} suffix="+" label="Clients Served" duration={2200} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#FFC107] flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-8"
          >
            <div>
              <div className="text-sm uppercase tracking-[0.3em] text-black/50 font-bold mb-4">Meet the Founder</div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold text-black leading-[1.1] uppercase">
                The Story Behind StoryGrid
              </h2>
            </div>

            <div className="space-y-4 text-black/80 text-lg leading-relaxed max-w-lg">
              <p>
                After spending years navigating the chaotic world of digital media
                and seeing founders burn out trying to "be creators," I realized
                something was fundamentally broken.
              </p>
              <p>
                Content shouldn't be a random act of hope. It should be a
                predictable system. That's why StoryGrid Media was born — to bring
                engineering precision to creative output.
              </p>
            </div>

            <blockquote className="border-l-4 border-black/30 pl-6 py-2 max-w-lg">
              <p className="text-xl text-black font-serif italic">
                "Attention is the new oil. If you don't have a system to capture
                and retain it, you're leaving your biggest growth lever on the
                table."
              </p>
            </blockquote>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
