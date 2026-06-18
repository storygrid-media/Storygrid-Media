import { lazy, Suspense } from "react";
import Hero from "@/components/Hero";
const PortfolioLongform = lazy(() => import("@/components/PortfolioLongform"));
const PortfolioShortform = lazy(() => import("@/components/PortfolioShortform"));
const PortfolioThumbnails = lazy(() => import("@/components/PortfolioThumbnails"));
const Services = lazy(() => import("@/components/Services"));
const Workflow = lazy(() => import("@/components/Workflow"));
const Positioning = lazy(() => import("@/components/Positioning"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const ContactForm = lazy(() => import("@/components/ContactForm"));
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
      <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center text-white/10 font-medium font-display uppercase tracking-widest text-xs">Loading Experience...</div>}>
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
      </Suspense>
    </>
  );
}
