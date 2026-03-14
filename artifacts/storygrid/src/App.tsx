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

function App() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans">
        <Navbar />
        <main>
          <Hero />
          <WorkShowcase />
          <CaseStudy />
          <Services />
          <Positioning />
          <Testimonials />
          <Founder />
          <ContactForm />
        </main>
        <Footer />
      </div>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
