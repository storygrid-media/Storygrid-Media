import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

export default function Positioning() {
  const withUs = [
    "A dedicated media team executing daily",
    "Custom strategy built around your voice",
    "Compounding content that builds authority",
    "Data-driven optimization every week",
  ];

  const stayStuck = [
    "Posting randomly and hoping for the best",
    "Copy-pasting templates that don't convert",
    "Chasing trends instead of building equity",
    "Zero systems, zero accountability",
  ];

  return (
    <section className="py-32 md:py-40 bg-[#080808] relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] mix-blend-overlay" aria-hidden="true">
        <filter id="grain-pos">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-pos)" />
      </svg>

      <div className="container mx-auto px-6 md:px-16 lg:px-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 uppercase tracking-tight">
            The Choice Is <span className="text-[#FFC107]">Yours</span>
          </h2>
          <p className="text-[#9A9A9A] text-lg max-w-2xl mx-auto">
            Every month you wait is another month your competitors are building
            the audience you should own.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-[#111111] border border-[#FFC107]/20 rounded-2xl p-10 md:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-[#FFC107]" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFC107]/5 rounded-full blur-[80px] pointer-events-none" />

            <h3 className="text-3xl md:text-4xl font-display font-bold text-[#FFC107] mb-3 uppercase tracking-tight">
              Work With Us
            </h3>
            <p className="text-[#9A9A9A] text-sm mb-10">What your next 90 days look like</p>

            <ul className="space-y-6">
              {withUs.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-0.5 bg-[#FFC107]/15 text-[#FFC107] rounded-full p-1.5 shrink-0">
                    <Check size={18} strokeWidth={3} />
                  </div>
                  <span className="text-white text-lg font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-10 w-full bg-[#FFC107] text-black font-bold py-4 rounded-xl text-lg hover:bg-[#FFC107]/90 transition-colors"
            >
              Join Now
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-[#111111] border border-red-500/15 rounded-2xl p-10 md:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-[#FF3B30]" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] pointer-events-none" />

            <h3 className="text-3xl md:text-4xl font-display font-bold text-[#FF3B30] mb-3 uppercase tracking-tight">
              Stay Stuck
            </h3>
            <p className="text-[#9A9A9A] text-sm mb-10">What happens if nothing changes</p>

            <ul className="space-y-6">
              {stayStuck.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-0.5 bg-red-500/10 text-[#FF3B30] rounded-full p-1.5 shrink-0">
                    <X size={18} strokeWidth={3} />
                  </div>
                  <span className="text-white/60 text-lg">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 w-full border border-white/10 text-white/30 font-bold py-4 rounded-xl text-lg text-center cursor-default">
              Keep Guessing
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
