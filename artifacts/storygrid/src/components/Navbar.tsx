import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import logoUrl from "@assets/logo_(1)_1773492679483.avif";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Services", id: "services" },
    { label: "Case Studies", id: "case-studies" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 md:px-16 lg:px-24 flex items-center justify-between">
        <a 
          href="#"
          className="flex items-center gap-2.5"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          data-testid="link-logo"
          aria-label="StoryGrid Media - Back to top"
        >
          <img src={logoUrl} alt="" className="h-8 w-auto" aria-hidden="true" />
          <span className="text-xl font-bold font-display">StoryGrid <span className="text-[#FFC107]">Media</span></span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
              data-testid={`link-nav-${link.id}`}
            >
              {link.label}
            </button>
          ))}
          <Button 
            className="bg-[#FFC107] text-black hover:bg-[#FFC107]/90 font-semibold"
            onClick={() => scrollTo("contact")}
            data-testid="button-nav-cta"
          >
            Book a Growth Call
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          data-testid="button-mobile-menu"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            id="mobile-nav"
            className="absolute top-full left-0 w-full bg-[#0B0B0B] border-b border-white/10 py-6 px-6 md:hidden flex flex-col gap-4 shadow-2xl"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-lg font-medium text-left text-muted-foreground hover:text-white py-2"
                data-testid={`link-mobile-nav-${link.id}`}
              >
                {link.label}
              </button>
            ))}
            <Button 
              className="bg-[#FFC107] text-black hover:bg-[#FFC107]/90 font-semibold mt-4 w-full"
              onClick={() => scrollTo("contact")}
              data-testid="button-mobile-cta"
            >
              Book a Growth Call
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
