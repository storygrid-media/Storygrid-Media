import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoUrl from "@assets/logo_(1)_1773492679483.avif";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-6 left-0 w-full z-50 pointer-events-none">
      <div className="container mx-auto px-6 flex justify-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`pointer-events-auto flex items-center justify-between gap-8 md:gap-12 px-6 md:px-8 py-2 md:py-3 rounded-full border transition-all duration-500 w-full max-w-[95%] md:max-w-2xl ${
            scrolled || isMobileMenuOpen
              ? "bg-black/40 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" 
              : "bg-white/5 backdrop-blur-md border-white/5"
          }`}
        >
          {/* Scroll Progress Indicator */}
          <motion.div 
            className="absolute bottom-0 left-0 h-[2px] bg-[#FFC107] z-50 rounded-full"
            style={{ scaleX, transformOrigin: "left" }}
          />

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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 shrink-0">
            <button onClick={() => scrollTo("work")} className="text-sm font-medium text-white/70 hover:text-white transition-colors">Work</button>
            <button onClick={() => scrollTo("services")} className="text-sm font-medium text-white/70 hover:text-white transition-colors">Services</button>
            <AnimatePresence mode="popLayout">
              {scrolled && (
                <motion.div
                  initial={{ x: 10, opacity: 0, scale: 0.9 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  exit={{ x: 10, opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="shrink-0"
                >
                  <Button variant="luxury" size="sm" className="font-bold rounded-xl px-6 h-10 text-sm shadow-lg shadow-[#FFC107]/20" onClick={() => scrollTo("contact")}>
                    Book Call
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pointer-events-auto md:hidden overflow-hidden mt-4 mx-auto w-[90%] bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl"
          >
            <div className="flex flex-col p-6 space-y-4">
              <button onClick={() => scrollTo("work")} className="text-lg font-bold text-white/90 text-left py-2 border-b border-white/5">Work</button>
              <button onClick={() => scrollTo("services")} className="text-lg font-bold text-white/90 text-left py-2 border-b border-white/5">Services</button>
              <Button variant="luxury" size="lg" className="w-full font-bold h-14 text-lg" onClick={() => scrollTo("contact")}>
                Book a Call
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
