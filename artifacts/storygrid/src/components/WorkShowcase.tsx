import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";

function VideoCard({ title, category, videoId, index }: { title: string; category: string; videoId: string; index: number }) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative rounded-xl overflow-hidden bg-[#141414] border border-white/5 aspect-video cursor-pointer hover:border-white/10 transition-colors"
      data-testid={`card-work-${index}`}
      onClick={() => !playing && setPlaying(true)}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title}
          loading="lazy"
        />
      ) : (
        <>
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent z-10" />

          <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 rounded-full bg-[#FFC107] text-black flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_30px_rgba(255,193,7,0.3)]">
              <Play className="w-6 h-6 ml-1" fill="currentColor" />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
            <div className="text-[#FFC107] text-[10px] font-bold uppercase tracking-widest mb-2">
              {category}
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-[#FFC107] transition-colors">
              {title}
            </h3>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default function WorkShowcase() {
  const projects = [
    { title: "The Art of Scaling", category: "Podcast Production", videoId: "6HBxWrmI8OU" },
    { title: "0 to 1M Views", category: "Viral Strategy", videoId: "6HBxWrmI8OU" },
    { title: "Founder Blueprint", category: "Brand Management", videoId: "6HBxWrmI8OU" },
    { title: "Modern Media", category: "Content Engine", videoId: "6HBxWrmI8OU" },
    { title: "YouTube Growth", category: "Channel Strategy", videoId: "6HBxWrmI8OU" },
    { title: "Retention Mastery", category: "Premium Editing", videoId: "6HBxWrmI8OU" },
  ];

  return (
    <section id="work" className="py-12 md:py-24 bg-[#080808] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-16 lg:px-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#FFC107]" />
            <span className="text-[#9A9A9A] text-sm tracking-widest uppercase">Portfolio</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Proof Over Promises
          </h2>
          <p className="text-[#9A9A9A] text-lg max-w-2xl leading-relaxed">
            We've built systems that drive millions of views. Here's what happens
            when strategy meets relentless execution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <VideoCard
              key={i}
              title={project.title}
              category={project.category}
              videoId={project.videoId}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
