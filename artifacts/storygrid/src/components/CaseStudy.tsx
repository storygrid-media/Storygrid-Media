import { motion } from "framer-motion";
import { AlertCircle, Target, Trophy } from "lucide-react";

export default function CaseStudy() {
  return (
    <section id="case-studies" className="py-10 bg-[#0B0B0B] relative">
      <div className="container mx-auto px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-8"
        >
          <div className="text-[#FFC107] font-semibold tracking-wider uppercase text-sm mb-3">Featured Case Study</div>
          <h2 className="font-display text-2xl md:text-4xl font-bold">
            Startup Seekho: From Zero to Authority
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-[#141414] border border-white/5 rounded-2xl p-6 md:p-10"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center mb-10 border-b border-white/5 pb-10">
            <div>
              <div className="text-5xl md:text-7xl font-display font-bold text-[#FFC107] leading-none mb-3">
                0 <span className="text-white/20">→</span> 3,500
              </div>
              <p className="text-xl text-white font-medium mb-2">Subscribers in 6 months</p>
              <p className="text-[#9A9A9A] text-sm md:text-base">
                From scratch to an engaged community of founders and builders
                through consistent, high-leverage content.
              </p>
            </div>
            <div className="aspect-video bg-[#1F1F1F] rounded-xl overflow-hidden relative border border-white/10">
              <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#FFC107]/20 to-transparent" />
              <svg className="absolute bottom-0 w-full h-full opacity-50" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,100 L0,80 C20,80 30,90 50,60 C70,30 80,40 100,10 L100,100 Z" fill="rgba(255, 193, 7, 0.2)" />
                <path d="M0,80 C20,80 30,90 50,60 C70,30 80,40 100,10" fill="none" stroke="#FFC107" strokeWidth="2" />
              </svg>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-black/50 p-6 rounded-xl border border-white/5">
              <div className="w-10 h-10 bg-red-500/10 text-red-500 rounded-lg flex items-center justify-center mb-4">
                <AlertCircle size={20} />
              </div>
              <h3 className="text-lg font-bold mb-2">The Problem</h3>
              <p className="text-[#9A9A9A] text-sm leading-relaxed">
                Inconsistent uploads, zero discoverability, and no system to
                repurpose long-form conversations into viral short-form assets.
              </p>
            </div>

            <div className="bg-black/50 p-6 rounded-xl border border-white/5">
              <div className="w-10 h-10 bg-[#FFC107]/10 text-[#FFC107] rounded-lg flex items-center justify-center mb-4">
                <Target size={20} />
              </div>
              <h3 className="text-lg font-bold mb-2">The System</h3>
              <p className="text-[#9A9A9A] text-sm leading-relaxed">
                A predictable content calendar, high-end production
                workflow, and a dedicated clipping engine for Shorts.
              </p>
            </div>

            <div className="bg-black/50 p-6 rounded-xl border border-[#FFC107]/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFC107]/5 rounded-full blur-[30px]" />
              <div className="w-10 h-10 bg-green-500/10 text-green-500 rounded-lg flex items-center justify-center mb-4 relative z-10">
                <Trophy size={20} />
              </div>
              <h3 className="text-lg font-bold mb-2 relative z-10">The Results</h3>
              <ul className="text-[#9A9A9A] text-sm space-y-2 relative z-10">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFC107]" />
                  3 long-form eps / mo
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFC107]" />
                  12 viral clips / mo
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFC107]" />
                  250K+ views
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
