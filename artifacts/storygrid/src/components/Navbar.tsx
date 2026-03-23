import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import logoUrl from "@assets/logo_(1)_1773492679483.avif";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-6 left-0 w-full z-50 pointer-events-none">
      <div className="container mx-auto px-6 flex justify-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`pointer-events-auto flex items-center justify-between gap-8 md:gap-12 px-6 md:px-8 py-2 md:py-3 rounded-full border transition-all duration-500 w-full max-w-[95%] md:max-w-2xl ${
            scrolled 
              ? "bg-black/40 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" 
              : "bg-white/5 backdrop-blur-md border-white/5"
          }`}
        >
          <a 
            href="#"
            className="flex items-center gap-2 group shrink-0"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            aria-label="StoryGrid Media - Home"
          >
            <img src={logoUrl} alt="" className="h-6 md:h-7 w-auto transition-transform group-hover:scale-110" aria-hidden="true" />
            <span className="text-sm md:text-base font-bold font-display">
              StoryGrid <span className="text-[#FFC107]">Media</span>
            </span>
          </a>

          <div className="flex items-center gap-3 md:gap-8 shrink-0">
            <button
              onClick={() => scrollTo("work")}
              className="text-[10px] md:text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              Work
            </button>
            <button
              onClick={() => scrollTo("services")}
              className="text-[10px] md:text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              Services
            </button>
            <AnimatePresence mode="popLayout">
              {scrolled && (
                <motion.div
                  initial={{ x: 10, opacity: 0, scale: 0.9 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  exit={{ x: 10, opacity: 0, scale: 0.9 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                    opacity: { duration: 0.2 }
                  }}
                  className="shrink-0"
                >
                  <Button 
                    variant="luxury"
                    size="sm"
                    className="font-bold rounded-xl px-3 md:px-6 h-8 md:h-10 text-[10px] md:text-sm shadow-lg shadow-[#FFC107]/20"
                    onClick={() => scrollTo("contact")}
                  >
                    Book Call
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}

