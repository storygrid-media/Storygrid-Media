import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";

function VideoTestimonial({ title, client, videoId, index }: { title: string; client: string; videoId: string; index: number }) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-[#141414] border border-white/5 rounded-2xl aspect-video relative group cursor-pointer overflow-hidden"
      data-testid={`video-testimonial-${index}`}
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
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-[#FFC107] group-hover:text-black text-white">
              <Play className="w-6 h-6 ml-1" fill="currentColor" />
            </div>
          </div>
          <div className="absolute bottom-6 left-6 z-20">
            <div className="text-white font-bold text-lg">{title}</div>
            <div className="text-[#FFC107] text-sm">{client}</div>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default function Testimonials() {
  const testimonials = [
    {
      name: "Alex M.",
      role: "Tech Founder",
      content: "StoryGrid took our messy podcast process and turned it into a machine. We've seen a 3x increase in inbound leads strictly from YouTube.",
    },
    {
      name: "Sarah J.",
      role: "Creator",
      content: "The shorts strategy alone paid for itself in week 2. They just understand pacing and retention better than anyone else I've worked with.",
    },
    {
      name: "David K.",
      role: "Agency Owner",
      content: "Finally, an agency that doesn't just edit, but actually strategizes. They're a core part of our growth team now.",
    },
  ];

  const videoTestimonials = [
    {
      title: "How We Grew 3x in 6 Months",
      client: "Alex M. - Tech Founder",
      videoId: "6HBxWrmI8OU",
    },
    {
      title: "From Zero to 10K Subscribers",
      client: "Sarah J. - Creator",
      videoId: "6HBxWrmI8OU",
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-[#0F0F0F]">
      <div className="container mx-auto px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Don't Take Our Word For It
          </h2>
          <p className="text-[#9A9A9A] text-lg max-w-2xl mx-auto">
            Hear directly from founders and creators who trusted us to build
            their content engines.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-[#141414] border border-white/5 rounded-2xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#1F1F1F] flex items-center justify-center font-bold text-[#FFC107] text-lg">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-xs text-[#9A9A9A]">{t.role}</div>
                </div>
              </div>
              <p className="text-white/80 leading-relaxed">{t.content}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {videoTestimonials.map((video, i) => (
            <VideoTestimonial
              key={i}
              title={video.title}
              client={video.client}
              videoId={video.videoId}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
