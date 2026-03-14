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
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />

          <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 rounded-full bg-[#FFC107] text-black flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_30px_rgba(255,193,7,0.3)]">
              <Play className="w-6 h-6 ml-1" fill="currentColor" />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
            <div className="text-[#FFC107] text-xs font-semibold uppercase tracking-wider mb-2">
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
    { title: "Startup Seekho", category: "Podcast Production", videoId: "6HBxWrmI8OU" },
    { title: "Brand Growth", category: "YouTube Strategy", videoId: "6HBxWrmI8OU" },
    { title: "Founder Stories", category: "Short-form Content", videoId: "6HBxWrmI8OU" },
    { title: "Tech Insights", category: "Video Editing", videoId: "6HBxWrmI8OU" },
    { title: "Scale Up", category: "Full Channel Management", videoId: "6HBxWrmI8OU" },
    { title: "Creator Spotlight", category: "Documentary Style", videoId: "6HBxWrmI8OU" },
  ];

  return (
    <section id="work" className="py-16 md:py-20 bg-[#080808]">
      <div className="container mx-auto px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-10"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Proof Over Promises
          </h2>
          <p className="text-[#9A9A9A] text-lg max-w-2xl">
            We've built systems that drive millions of views. Here's what happens
            when strategy meets relentless execution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
