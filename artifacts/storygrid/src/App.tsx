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
      <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans">
        <Navbar />
        <main>
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
          <CaseStudy />
          <SectionDivider />
          <Positioning />
          <SectionDivider />
          <PathSwitcher />
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
