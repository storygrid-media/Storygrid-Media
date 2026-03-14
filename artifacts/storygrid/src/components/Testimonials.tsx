import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Alex M.",
      role: "Tech Founder",
      content: "StoryGrid took our messy podcast process and turned it into a machine. We've seen a 3x increase in inbound leads strictly from YouTube.",
      time: "2h ago"
    },
    {
      name: "Sarah J.",
      role: "Creator",
      content: "The shorts strategy alone paid for itself in week 2. They just understand pacing and retention better than anyone else I've worked with.",
      time: "5h ago"
    },
    {
      name: "David K.",
      role: "Agency Owner",
      content: "Finally, an agency that doesn't just edit, but actually strategizes. They're a core part of our growth team now.",
      time: "1d ago"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">What Creators Say</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real feedback from founders and creators who trusted us to build their content systems.
          </p>
        </motion.div>

        {/* DM Style Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-[#141414] border border-white/5 rounded-2xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#1F1F1F] flex items-center justify-center font-bold text-[#FFC107]">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">{t.time}</div>
              </div>
              <div className="bg-[#1F1F1F]/50 rounded-2xl rounded-tl-sm p-4 text-sm text-white/90 leading-relaxed">
                {t.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Testimonials */}
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-[#141414] border border-white/5 rounded-2xl aspect-video relative group cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#1F1F1F] transition-transform duration-500 group-hover:scale-[1.02]"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-[#FFC107] group-hover:text-black text-white">
                  <Play className="w-6 h-6 ml-1" fill="currentColor" />
                </div>
              </div>

              <div className="absolute bottom-6 left-6 z-20">
                <div className="text-white font-bold text-lg">Client Success Story</div>
                <div className="text-[#FFC107] text-sm">Watch Video</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
