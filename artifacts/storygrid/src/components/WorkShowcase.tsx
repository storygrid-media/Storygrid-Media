import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function WorkShowcase() {
  const projects = [
    { title: "Startup Seekho", category: "Podcast Production" },
    { title: "Brand Growth", category: "YouTube Strategy" },
    { title: "Founder Stories", category: "Short-form Content" },
    { title: "Tech Insights", category: "Video Editing" },
    { title: "Scale Up", category: "Full Channel Management" },
    { title: "Creator Spotlight", category: "Documentary Style" },
  ];

  return (
    <section id="work" className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Our Work</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            We've built systems that drive millions of views. Here's a look at what happens when strategy meets execution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative rounded-xl overflow-hidden bg-[#141414] border border-white/5 aspect-video cursor-pointer hover:border-white/10 transition-colors"
              data-testid={`card-work-${i}`}
            >
              {/* Image placeholder */}
              <div className="absolute inset-0 bg-[#1F1F1F] transition-transform duration-500 group-hover:scale-[1.02]"></div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
              
              <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-[#FFC107] text-black flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_30px_rgba(255,193,7,0.3)]">
                  <Play className="w-6 h-6 ml-1" fill="currentColor" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 p-6 z-20 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="text-[#FFC107] text-xs font-semibold uppercase tracking-wider mb-2">
                  {project.category}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#FFC107] transition-colors">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
