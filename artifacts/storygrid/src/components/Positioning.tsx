import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

export default function Positioning() {
  const typical = [
    "Promise viral hits overnight",
    "One-size-fits-all templates",
    "Chase fleeting trends",
    "Focus on vanity metrics",
    "Disjointed one-off videos",
    "You manage the process"
  ];

  const storygrid = [
    "Build compounding systems",
    "Custom workflows for your voice",
    "Establish long-term authority",
    "Focus on audience & conversion",
    "Unified content ecosystem",
    "We own the execution"
  ];

  return (
    <section className="py-24 bg-[#080808]">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">We're Not Another Agency</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Most agencies are transactional. We are your fractional media team, building assets that increase in value over time.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Typical Agency */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-[#141414] border border-red-500/20 rounded-2xl p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[60px] pointer-events-none"></div>
            <h3 className="text-2xl font-bold text-white/80 mb-8 flex items-center gap-3">
              Typical Agency
            </h3>
            <ul className="space-y-6">
              {typical.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1 bg-red-500/10 text-red-500 rounded-full p-1 shrink-0">
                    <X size={16} />
                  </div>
                  <span className="text-muted-foreground text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* StoryGrid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-[#141414] border border-[#FFC107]/30 rounded-2xl p-8 md:p-10 relative overflow-hidden shadow-[0_0_40px_rgba(255,193,7,0.05)]"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFC107]/10 rounded-full blur-[60px] pointer-events-none"></div>
            <h3 className="text-2xl font-bold text-[#FFC107] mb-8 flex items-center gap-3">
              StoryGrid Media
            </h3>
            <ul className="space-y-6">
              {storygrid.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1 bg-[#FFC107]/10 text-[#FFC107] rounded-full p-1 shrink-0">
                    <Check size={16} />
                  </div>
                  <span className="text-white text-lg font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
