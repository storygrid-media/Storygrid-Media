import { motion } from "framer-motion";
import { Mic, User, Youtube } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Podcast Production",
      features: [
        "End-to-end studio setup guidance",
        "Multi-cam video editing",
        "Pro audio mixing & mastering",
        "Thumbnail design & packaging",
        "Distribution across all platforms"
      ]
    },
    {
      icon: <Youtube className="w-8 h-8" />,
      title: "YouTube Management",
      features: [
        "Channel strategy & positioning",
        "Ideation & script structuring",
        "High-retention video editing",
        "A/B testing thumbnails & titles",
        "Analytics review & optimization"
      ]
    },
    {
      icon: <User className="w-8 h-8" />,
      title: "Short-Form Content",
      features: [
        "Viral hook scripting",
        "Dynamic pacing & visual hooks",
        "Repurposing from long-form",
        "Platform-native formatting",
        "Daily publishing systems"
      ]
    }
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">What We Build</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We don't just edit videos. We build complete content engines that turn your expertise into scalable media assets.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-[#141414] border border-white/10 hover:border-[#FFC107]/30 rounded-xl p-8 transition-colors group"
              data-testid={`card-service-${i}`}
            >
              <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center text-white mb-8 group-hover:bg-[#FFC107]/10 group-hover:text-[#FFC107] transition-colors">
                {service.icon}
              </div>
              <h3 className="font-display text-2xl font-bold mb-6">{service.title}</h3>
              <ul className="space-y-4">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-muted-foreground group-hover:text-white/80 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFC107] mt-2 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
