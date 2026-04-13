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

const TESTIMONIALS = [
  {
    name: "CareerWithRishab",
    role: "Content Creator",
    content: "I’ve been working with Saumya for the last two years, and the experience has been amazing. What really stands out is the **thought process behind the editing**, it’s **not random transitions**, it’s built around the audience and emotion I want to convey. She’s also **extremely punctual**, and I’ve never faced any delays. If you’re looking for premium video editing, Saumya and her team are a great choice.",
    image: "/assets/testimonials/Rishab Bindal.jpg"
  },
  {
    name: "Asad Siddiqui",
    role: "Strategic Partner",
    content: "Working with StoryGrid Media doesn’t feel like a transaction, it feels like a **partnership**. They **don’t just edit, they think with you**, share insights, and help improve your content. The **editing quality is top-notch**, and the entire process is completely frictionless. If you’re serious about content, you don’t need just an editor, you need a partner.",
    image: "/assets/testimonials/Asad Siddiqui.jpg"
  },
  {
    name: "Akhil Kothari",
    role: "Podcast Host",
    content: "Podcast editing needs more than just cuts, it needs **structure and flow**, and that’s exactly what StoryGrid Media brings. They understand how to **keep conversations engaging** and turn them into high-quality content. Working with them has made my entire podcast process **much more effective**.",
    image: "/assets/testimonials/Akhil Kothari.jpg"
  },
  {
    name: "A2 Motivation",
    role: "Impact Creator",
    content: "I’ve worked with different editors before, but StoryGrid Media really stands out. They understand the vibe of my content and make sure **every video feels engaging and impactful**. The **consistency and quality** they deliver have made a huge difference in how my audience connects with my content.",
    image: "/assets/testimonials/A2 Moriviation.jpg"
  },
  {
    name: "Abhinav Mahajan",
    role: "Fitness Expert",
    content: "In fitness content, **clarity and impact** matter a lot, and StoryGrid Media nails both. The edits are **clean, sharp**, and actually **enhance the message** I’m trying to deliver. It feels like working with a team that understands your content, not just edits it.",
    image: "/assets/testimonials/Abhinav Mahajan.jpg"
  },
];

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  const renderContent = (content: string) => {
    const parts = content.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <span key={i} className="text-[#FFC107] font-bold">{part.slice(2, -2)}</span>;
      }
      return part;
    });
  };

  return (
    <div className="bg-[#141414] border border-white/5 rounded-2xl p-6 md:p-8 w-[280px] md:w-[350px] shadow-2xl flex flex-col shrink-0 whitespace-normal">
      <div className="mb-6">
        <p className="text-white/80 leading-relaxed text-sm md:text-base">"{renderContent(t.content)}"</p>
      </div>
      <div className="flex items-center gap-4 pt-6 border-t border-white/5 mt-auto">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1F1F1F] flex items-center justify-center font-bold text-[#FFC107] overflow-hidden shrink-0">
          {t.image ? (
            <img 
              src={t.image} 
              alt={t.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to initials if image fails to load
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).parentElement!.innerText = t.name.charAt(0);
              }}
            />
          ) : (
            <span className="text-base md:text-lg">{t.name.charAt(0)}</span>
          )}
        </div>
        <div className="min-w-0">
          <div className="font-bold text-white text-sm md:text-base truncate">{t.name}</div>
          <div className="text-[10px] text-[#9A9A9A] uppercase tracking-widest font-bold truncate">{t.role}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const videoTestimonials = [
    {
      title: "How We Grew 3x in 6 Months",
      client: "Alex M. - Tech Founder",
      videoId: "kPCUxqwADiU",
    },
    {
      title: "From Zero to 10K Subscribers",
      client: "Sarah J. - Creator",
      videoId: "q5DQ9dbXn0g",
    },
  ];

  // Marquee Row Component
  const MarqueeRow = ({ direction = "left" }: { direction?: "left" | "right" }) => {
    const marqueeItems = [...TESTIMONIALS, ...TESTIMONIALS]; // Duplicate for seamless loop
    
    return (
      <div className="flex overflow-hidden group/marquee py-10">
        <motion.div
          animate={{ x: direction === "left" ? [0, -1910] : [-1910, 0] }} // Adjusted for 5 + 5 items (5 * 382px)
          transition={{
            repeat: Infinity,
            duration: 40,
            ease: "linear",
          }}
          className="flex gap-6 md:gap-8"
        >
          {marqueeItems.map((t, i) => (
            <TestimonialCard key={`${i}-${t.name}`} t={t} />
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <section id="proof" className="pt-16 md:pt-24 pb-12 md:pb-16 bg-[#0F0F0F] relative overflow-hidden">
      {/* Side Fades for Marquee */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0F0F0F] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0F0F0F] to-transparent z-10 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-0 md:mb-8"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-white">
            Proof of <span className="text-[#FFC107]">Performance</span>
          </h2>
          <p className="text-[#9A9A9A] text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Helping the world's most ambitious creators and founders transform 
            raw attention into compounding authority.
          </p>
        </motion.div>
      </div>

      {/* Marquee Row */}
      <div className="w-full">
         <MarqueeRow />
      </div>

      {/* <div className="container mx-auto px-6 md:px-16 lg:px-24 mt-16">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
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
      </div> */}

    </section>
  );
}
