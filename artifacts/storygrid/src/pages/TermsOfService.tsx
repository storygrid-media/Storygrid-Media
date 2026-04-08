import { motion } from "framer-motion";
import { useEffect } from "react";

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 container mx-auto px-6 md:px-16 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="font-display text-4xl md:text-5xl font-black mb-12 text-white">
          Terms of <span className="text-[#FFC107]">Service.</span>
        </h1>

        <div className="space-y-8 text-[#9A9A9A] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the services provided by StoryGrid Media ("Services"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Description of Services</h2>
            <p>
              StoryGrid Media provides content strategy, video production, YouTube management, and media system design for creators and founders. The specific scope of work for each engagement will be detailed in a separate service agreement or work order.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Client Responsibilities</h2>
            <p>
              Clients must provide accurate information and necessary access to media assets or platforms required for the delivery of Services. Delays in providing materials may impact delivery timelines.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Intellectual Property</h2>
            <p>
              Unless otherwise agreed in writing, StoryGrid Media retains ownership of proprietary systems and workflows. Upon full payment, clients receive the necessary rights to use the delivered content for their designated business purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Payment Terms</h2>
            <p>
              Fees for Services are outlined in the individual client agreements. Payments are typically due as specified in the invoice. Late payments may result in a suspension of Services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">6. Limitation of Liability</h2>
            <p>
              StoryGrid Media shall not be liable for any indirect, incidental, or consequential damages resulting from the use of our Services or platform performance variations (e.g., algorithmic shifts on YouTube or Instagram).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">7. Governing Law</h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in India.
            </p>
          </section>

          <section className="pt-8 border-t border-white/10">
            <p className="text-sm">
              For any clarifications regarding these terms, please reach out to: 
              <a href="mailto:team@storygridmedia.in" className="text-[#FFC107] ml-2 hover:underline">team@storygridmedia.in</a>
            </p>
            <p className="text-sm mt-4 italic">Last Updated: April 08, 2026</p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
