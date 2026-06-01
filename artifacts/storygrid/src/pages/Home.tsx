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
import { useSeo } from "@/hooks/useSeo";
import SchemaMarkup from "@/components/SchemaMarkup";

export default function Home() {
  useSeo({
    title: "StoryGrid Media | High-Performance Content Systems",
    description: "StoryGrid Media builds structured content systems. Expert podcast production, YouTube channel management, and viral short-form distribution.",
    canonicalUrl: "https://storygridmedia.in/"
  });

  return (
    <>
      <SchemaMarkup />
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
