import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function Founder() {
  return (
    <section id="about" className="py-20 bg-[#0B0B0B] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#FF3B30]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-16 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 bg-[#141414] relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
                alt="Founder of StoryGrid Media"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute bottom-8 left-8 z-20">
                <div className="text-2xl font-bold text-white">The Founder</div>
                <div className="text-[#FFC107] font-medium">Content Systems Architect</div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#FFC107] rounded-2xl -z-10 opacity-20 blur-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="text-[#FFC107] font-semibold tracking-wider uppercase text-sm mb-4">Our Story</div>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 leading-tight">
              From Freelance Chaos to <br />
              <span className="text-white">Structured Growth</span>
            </h2>
            <div className="space-y-6 text-[#9A9A9A] text-lg leading-relaxed mb-8">
              <p>
                StoryGrid Media wasn't born in a boardroom. It was born in the trenches of content creation, where we saw brilliant creators burnt out by the constant pressure of "going viral."
              </p>
              <p>
                We realized that growth isn't about luck; it's about systems. By combining high-end storytelling with structured content pipelines, we help founders and creators build authority that lasts.
              </p>
            </div>
            
            <ul className="space-y-4 mb-10">
              {[
                "Selective collaboration with elite creators",
                "Data-driven content engineering",
                "Long-term authority building vs. short-term trends",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/90 font-medium">
                  <div className="bg-[#FFC107]/10 p-1 rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-[#FFC107]" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
