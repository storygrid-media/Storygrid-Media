import { motion } from "framer-motion";
import { User } from "lucide-react";

export default function Founder() {
  return (
    <section id="about" className="py-24 bg-[#0B0B0B] border-y border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-[1fr_2fr] gap-12 lg:gap-24 items-center"
        >
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-[#FFC107] rounded-full blur-[80px] opacity-20"></div>
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-[#1F1F1F] border border-white/10 relative z-10 flex items-center justify-center overflow-hidden">
                <User className="w-20 h-20 text-white/20" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h2 className="font-display text-4xl font-bold mb-2">The Story Behind StoryGrid</h2>
              <div className="text-[#FFC107] font-medium">Founder & Head of Strategy</div>
            </div>

            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                After spending years navigating the chaotic world of digital media and seeing founders burn out trying to "be creators," I realized something was fundamentally broken.
              </p>
              <p>
                Content shouldn't be a random act of hope. It should be a predictable system. That's why StoryGrid Media was born—to bring engineering precision to creative output.
              </p>
            </div>

            <blockquote className="mt-4 border-l-4 border-[#FFC107] pl-6 py-2">
              <p className="text-xl text-white font-serif italic mb-2">
                "Attention is the new oil. If you don't have a system to capture and retain it, you're leaving your biggest growth lever on the table."
              </p>
            </blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
