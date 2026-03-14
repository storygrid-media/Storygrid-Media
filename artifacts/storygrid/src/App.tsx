import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorkShowcase from "@/components/WorkShowcase";
import CaseStudy from "@/components/CaseStudy";
import Services from "@/components/Services";
import Positioning from "@/components/Positioning";
import Testimonials from "@/components/Testimonials";
import Founder from "@/components/Founder";
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
          <WorkShowcase />
          <SectionDivider />
          <CaseStudy />
          <SectionDivider />
          <Services />
          <SectionDivider />
          <Positioning />
          <SectionDivider />
          <Testimonials />
          <SectionDivider />
          <Founder />
          <SectionDivider />
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
