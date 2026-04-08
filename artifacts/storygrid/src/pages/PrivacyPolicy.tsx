import { motion } from "framer-motion";
import { useEffect } from "react";

export default function PrivacyPolicy() {
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
          Privacy <span className="text-[#FFC107]">Policy.</span>
        </h1>

        <div className="space-y-8 text-[#9A9A9A] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Introduction</h2>
            <p>
              Welcome to StoryGrid Media. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. The Data We Collect</h2>
            <p>
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Contact Data:</strong> includes name, email address, and phone number provided via our contact forms.</li>
              <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
              <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. How We Use Your Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>To register you as a new client or contact.</li>
              <li>To provide and deliver the services you request.</li>
              <li>To manage our relationship with you.</li>
              <li>To improve our website, services, and customer relationships.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Your Legal Rights</h2>
            <p>
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, or to object to processing.
            </p>
          </section>

          <section className="pt-8 border-t border-white/10">
            <p className="text-sm">
              If you have any questions about this privacy policy or our privacy practices, please contact us at: 
              <a href="mailto:team@storygridmedia.in" className="text-[#FFC107] ml-2 hover:underline">team@storygridmedia.in</a>
            </p>
            <p className="text-sm mt-4 italic">Last Updated: April 08, 2026</p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
