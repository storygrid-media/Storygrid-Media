import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2, X, ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";

function FormFields({ 
  submitting, 
  disabled, 
  placeholder 
}: { 
  submitting: boolean; 
  disabled: boolean;
  placeholder?: string;
}) {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Name and Email inputs remain same */}
        <div className="space-y-2 text-left">
          <Label htmlFor="name" className="text-white/80">Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            placeholder="John Doe"
            required
            className="bg-black/50 border-white/10 focus-visible:ring-[#FFC107] h-12"
            data-testid="input-name"
          />
        </div>

        <div className="space-y-2 text-left">
          <Label htmlFor="email" className="text-white/80">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="john@example.com"
            required
            className="bg-black/50 border-white/10 focus-visible:ring-[#FFC107] h-12"
            data-testid="input-email"
          />
        </div>
      </div>

      <div className="space-y-2 text-left">
        <Label htmlFor="channel" className="text-white/80">YouTube / Instagram Link</Label>
        <Input
          id="channel"
          type="url"
          name="channel"
          placeholder="https://youtube.com/@yourchannel"
          className="bg-black/50 border-white/10 focus-visible:ring-[#FFC107] h-12"
          data-testid="input-channel"
        />
      </div>

      <div className="space-y-2 text-left">
        <Label htmlFor="message" className="text-white/80">Tell us about your goals</Label>
        <Textarea
          id="message"
          name="message"
          placeholder={placeholder || "What are you trying to achieve in the next 6 months?"}
          required
          className="bg-black/50 border-white/10 focus-visible:ring-[#FFC107] min-h-[120px] resize-none"
          data-testid="input-message"
        />
      </div>

      <Button
        type="submit"
        variant="luxury"
        size="lg"
        disabled={submitting || disabled}
        className="w-full mt-4 disabled:opacity-50"
        data-testid="button-submit-contact"
      >
        {submitting ? "Processing..." : (
          <>
            {placeholder ? "Apply Now" : "Launch Your Show"}
            <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </>
        )}
      </Button>
    </>
  );
}

export default function ContactForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // ... logic remains same
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const contentType = response.headers.get("content-type");
      let result: any = {};
      
      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      }

      if (!response.ok) {
        throw new Error(result.error || `Server responded with ${response.status}.`);
      }

      setShowSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-24 bg-[#080808] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFC107]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FFC107]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-16 lg:px-24 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-left lg:col-span-2 pt-6"
          >
            <h2 className="font-display text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-[1.1] tracking-tight text-white">
              Your Audience Won't Wait.
              <br />
              <span className="text-[#FFC107]">Neither Should You.</span>
            </h2>
            
            <div className="space-y-6 mb-10">
              <p className="text-[#9A9A9A] text-lg leading-relaxed">
                Submit your link to receive:
              </p>
              <ul className="space-y-4">
                {[
                  "Manual channel performance audit",
                  "Custom growth blueprint within 24 hours",
                  "Direct link to book your strategy mapping",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/90 font-medium">
                    <div className="bg-[#FFC107]/10 p-1 rounded-full">
                      <CheckCircle2 className="w-5 h-5 text-[#FFC107]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-[#141414] border border-white/5 rounded-2xl p-8 md:p-10 lg:p-12 shadow-2xl w-full lg:col-span-3 relative group"
          >
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-contact">
              <FormFields submitting={isSubmitting} disabled={false} />
            </form>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowSuccess(false)}
            data-testid="form-success-overlay"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-[#141414] border border-white/10 rounded-2xl p-10 max-w-md w-full text-center relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              data-testid="form-success"
            >
              <button
                onClick={() => setShowSuccess(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Thanks!</h3>
              <p className="text-[#9A9A9A]">
                Our team is reviewing your channel and will reach out shortly.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
