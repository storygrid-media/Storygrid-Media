import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function PathSwitcher() {
  const [formMode, setFormMode] = useState<"client" | "hiring">("client");

  return (
    <section id="path-switcher" className="py-12 md:py-16 bg-[#0A0A0A] border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-[#FFC107]/10 rounded-full blur-[140px] pointer-events-none opacity-40" />
      
      <div className="container mx-auto px-6 md:px-16 lg:px-24 relative z-10 flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center font-display text-4xl md:text-5xl font-bold mb-12 text-white"
          >
            Choose Your <span className="text-[#FFC107]">Next Step</span>
          </motion.h2>

          <div className="flex p-1 bg-white/5 rounded-xl border border-white/10 w-full max-w-sm mb-12 shadow-2xl relative">
            <LayoutGroup>
              <button
                type="button"
                onClick={() => setFormMode("client")}
                className={cn(
                  "flex-1 py-3 text-sm font-bold rounded-lg transition-colors duration-300 relative z-10",
                  formMode === "client" ? "text-black" : "text-white/60 hover:text-white"
                )}
              >
                Grow My Brand
                {formMode === "client" && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-[#FFC107] rounded-lg -z-10 shadow-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
              <button
                type="button"
                onClick={() => setFormMode("hiring")}
                className={cn(
                  "flex-1 py-3 text-sm font-bold rounded-lg transition-colors duration-300 relative z-10",
                  formMode === "hiring" ? "text-black" : "text-white/60 hover:text-white"
                )}
              >
                Join the Team
                {formMode === "hiring" && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-[#FFC107] rounded-lg -z-10 shadow-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            </LayoutGroup>
          </div>

          <div className="w-full overflow-hidden min-h-[300px] lg:min-h-0 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={formMode}
                initial={{ opacity: 0, x: formMode === "client" ? -50 : 50, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: formMode === "client" ? 50 : -50, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col items-center text-center space-y-8"
              >
                <div className="space-y-6 max-w-2xl">
                  <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight font-display">
                    {formMode === "client" ? "Direct Client Access" : "The Creator Core"}
                  </h3>
                  <p className="text-[#9A9A9A] text-lg md:text-xl leading-relaxed">
                    {formMode === "client" 
                      ? "At StoryGrid Media, we believe in selective excellence. Skip the noise - apply for an immediate strategy alignment with our lead specialists."
                      : "At StoryGrid Media, we believe in world-class creators. We're currently scouting for elite talent to join our high-performance network."}
                  </p>
                </div>
                
                <div className="group/btn relative">
                  <Button
                    variant="luxury"
                    className="h-16 px-12 text-lg shadow-[0_20px_50px_rgba(255,193,7,0.15)] min-w-[280px]"
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    {formMode === "client" ? "Start Your Audit" : "Apply for Intake"}
                    <ArrowRight className="w-6 h-6 ml-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
      </div>
    </section>
  );
}
