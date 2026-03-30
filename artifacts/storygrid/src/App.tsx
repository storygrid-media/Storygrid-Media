import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PortfolioLongform from "@/components/PortfolioLongform";
import PortfolioShortform from "@/components/PortfolioShortform";
import PortfolioThumbnails from "@/components/PortfolioThumbnails";
import CaseStudy from "@/components/CaseStudy";
import Services from "@/components/Services";
import Positioning from "@/components/Positioning";
import PathSwitcher from "@/components/PathSwitcher";
import Testimonials from "@/components/Testimonials";
import Workflow from "@/components/Workflow";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";

function App() {
  return (
    <TooltipProvider>
      <div className="relative min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans overflow-x-hidden">
        {/* Cinematic Grain Overlay */}
        <div className="fixed inset-0 min-h-screen w-full z-[100] pointer-events-none opacity-[0.02] mix-blend-overlay">
           <svg className="w-full h-full">
             <filter id="global-noise">
               <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
               <feColorMatrix type="saturate" values="0" />
             </filter>
             <rect width="100%" height="100%" filter="url(#global-noise)" />
           </svg>
        </div>

        <Navbar />
        <main className="relative z-10">
          <Hero />
          <SectionDivider />
          <PortfolioLongform />
          <PortfolioShortform />
          <PortfolioThumbnails />
          <SectionDivider />
          <Services />
          <SectionDivider />
          <Workflow />
          <SectionDivider />
          <Positioning />
          <SectionDivider />
          <Testimonials />
          <ContactForm />
        </main>
        <SectionDivider />
        <Footer />
      </div>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
