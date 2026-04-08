import Hero from "@/components/Hero";
import PortfolioLongform from "@/components/PortfolioLongform";
import PortfolioShortform from "@/components/PortfolioShortform";
import PortfolioThumbnails from "@/components/PortfolioThumbnails";
import Services from "@/components/Services";
import Workflow from "@/components/Workflow";
import Positioning from "@/components/Positioning";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <>
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
    </>
  );
}
