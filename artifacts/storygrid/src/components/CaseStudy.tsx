import { motion } from "framer-motion";
import { AlertCircle, Target, Trophy } from "lucide-react";

export default function CaseStudy() {
  return (
    <section id="case-studies" className="py-32 md:py-40 bg-[#0B0B0B] relative">
      <div className="container mx-auto px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <div className="text-[#FFC107] font-semibold tracking-wider uppercase text-sm mb-3">Featured Case Study</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Startup Seekho: From Zero to Authority
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-[#141414] border border-white/5 rounded-2xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16 border-b border-white/5 pb-16">
            <div>
              <div className="text-7xl md:text-8xl font-display font-bold text-[#FFC107] leading-none mb-4">
                0 <span className="text-white/20">→</span> 3,500
              </div>
              <p className="text-2xl text-white font-medium mb-2">Subscribers in 6 months</p>
              <p className="text-[#9A9A9A]">
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

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/50 p-8 rounded-xl border border-white/5">
              <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-lg flex items-center justify-center mb-6">
                <AlertCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">The Problem</h3>
              <p className="text-[#9A9A9A] leading-relaxed">
                Inconsistent uploads, zero discoverability, and no system to
                repurpose long-form conversations into viral short-form assets.
              </p>
            </div>

            <div className="bg-black/50 p-8 rounded-xl border border-white/5">
              <div className="w-12 h-12 bg-[#FFC107]/10 text-[#FFC107] rounded-lg flex items-center justify-center mb-6">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">The System We Built</h3>
              <p className="text-[#9A9A9A] leading-relaxed">
                A predictable content calendar, high-end podcast production
                workflow, and a dedicated clipping engine for Shorts and Reels.
              </p>
            </div>

            <div className="bg-black/50 p-8 rounded-xl border border-[#FFC107]/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFC107]/5 rounded-full blur-[40px]" />
              <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-lg flex items-center justify-center mb-6 relative z-10">
                <Trophy size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10">The Results</h3>
              <ul className="text-[#9A9A9A] space-y-3 relative z-10">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFC107]" />
                  3 long-form episodes per month
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFC107]" />
                  12 viral short clips per month
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFC107]" />
                  1M+ total organic views
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
