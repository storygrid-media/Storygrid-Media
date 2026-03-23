import { motion } from "framer-motion";
import { Mic, User, Youtube, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

function ServiceCard({ service, index }: { service: any; index: number }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col bg-[#111111] rounded-2xl p-8 border border-white/5 overflow-hidden group"
      data-testid={`card-service-${index}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,193,7,.1), transparent 40%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center text-white mb-8 group-hover:from-[#FFC107]/20 group-hover:to-transparent group-hover:text-[#FFC107] transition-all duration-500 shadow-lg border border-white/5 group-hover:border-[#FFC107]/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#FFC107] blur-[30px] opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
          <div className="relative z-10">{service.icon}</div>
        </div>

        <h3 className="font-display text-2xl font-bold mb-4 text-white group-hover:text-[#FFC107] transition-colors duration-300">
          {service.title}
        </h3>
        
        <ul className="space-y-4 mb-10 flex-grow">
          {service.features.map((feature: string, idx: number) => (
            <li key={idx} className="flex items-start gap-3 text-[#9A9A9A]">
              <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#FFC107] mt-2.5 shrink-0 transition-colors duration-300" />
              <span className="leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6 border-t border-white/5 group-hover:border-white/10 transition-colors duration-300">
          <Button
            variant="ghost"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="w-full justify-between hover:bg-white/5 text-white/70 hover:text-white px-0"
          >
            <span className="font-semibold text-base">{service.cta}</span>
            <ArrowRight className="w-5 h-5 opacity-50 group-hover flex-shrink-0 group-hover:opacity-100 group-hover:text-[#FFC107] group-hover:translate-x-1 transition-all duration-300" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const services = [
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Podcast Growth System",
      cta: "Launch Your Show",
      features: [
        "End-to-end studio setup guidance",
        "Multi-cam video editing",
        "Pro audio mixing & mastering",
        "Thumbnail design & packaging",
        "Distribution across all platforms",
      ],
    },
    {
      icon: <Youtube className="w-8 h-8" />,
      title: "YouTube Channel Management",
      cta: "Scale Your Channel",
      features: [
        "Channel strategy & positioning",
        "Ideation & script structuring",
        "High-retention video editing",
        "A/B testing thumbnails & titles",
        "Analytics review & optimization",
      ],
    },
    {
      icon: <User className="w-8 h-8" />,
      title: "Founder Brand Engine",
      cta: "Build Your Brand",
      features: [
        "Viral hook scripting",
        "Dynamic pacing & visual hooks",
        "Repurposing from long-form",
        "Platform-native formatting",
        "Daily publishing systems",
      ],
    },
  ];

  return (
    <section id="services" className="py-12 md:py-20 bg-[#080808] relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFC107]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-16 lg:px-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-10"
        >
          <div className="text-[#FFC107] font-semibold tracking-wider uppercase text-sm mb-4">Our Services</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Your Content Engine,<br/>Built to <span className="text-white/40 italic">Compound</span>
          </h2>
          <p className="text-[#9A9A9A] text-lg max-w-2xl mx-auto leading-relaxed">
            We don't just edit videos. We build complete actionable content machines that
            turn your expertise into scalable media assets.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
