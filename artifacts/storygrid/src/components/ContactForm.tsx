import { motion, AnimatePresence } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2, X } from "lucide-react";
import { useState, useEffect, type FormEvent } from "react";
import type { FieldValues, SubmissionError } from "@formspree/core";

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || "";

function ConfiguredForm({ onSuccess }: { onSuccess: () => void }) {
  const [state, handleSubmit] = useForm(FORMSPREE_ID);

  useEffect(() => {
    if (state.succeeded) onSuccess();
  }, [state.succeeded]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    await handleSubmit(e);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6" data-testid="form-contact">
      <FormFields submitting={state.submitting} errors={state.errors} disabled={false} />
    </form>
  );
}

function UnconfiguredForm() {
  return (
    <div>
      <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
        Contact form is not configured. Set the VITE_FORMSPREE_ID environment variable to enable submissions.
      </div>
      <form className="space-y-6" data-testid="form-contact" onSubmit={(e) => e.preventDefault()}>
        <FormFields submitting={false} errors={null} disabled={true} />
      </form>
    </div>
  );
}

function FormFields({ submitting, errors, disabled }: { submitting: boolean; errors: SubmissionError<FieldValues> | null; disabled: boolean }) {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
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
          {errors && <ValidationError prefix="Name" field="name" errors={errors} className="text-red-500 text-sm" />}
        </div>

        <div className="space-y-2">
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
          {errors && <ValidationError prefix="Email" field="email" errors={errors} className="text-red-500 text-sm" />}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="channel" className="text-white/80">YouTube / Instagram Link</Label>
        <Input
          id="channel"
          type="url"
          name="channel"
          placeholder="https://youtube.com/@yourchannel"
          className="bg-black/50 border-white/10 focus-visible:ring-[#FFC107] h-12"
          data-testid="input-channel"
        />
        {errors && <ValidationError prefix="Channel" field="channel" errors={errors} className="text-red-500 text-sm" />}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-white/80">Tell us about your goals</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="What are you trying to achieve in the next 6 months?"
          required
          className="bg-black/50 border-white/10 focus-visible:ring-[#FFC107] min-h-[120px] resize-none"
          data-testid="input-message"
        />
        {errors && <ValidationError prefix="Message" field="message" errors={errors} className="text-red-500 text-sm" />}
      </div>

      <Button
        type="submit"
        disabled={submitting || disabled}
        className="w-full bg-[#FFC107] text-black hover:bg-[#FFC107]/90 font-bold h-14 text-lg mt-4 disabled:opacity-50"
        data-testid="button-submit-contact"
      >
        {submitting ? "Sending..." : "Let's Build Your Engine"}
      </Button>
    </>
  );
}

export default function ContactForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const isConfigured = Boolean(FORMSPREE_ID);

  return (
    <section id="contact" className="py-16 md:py-20 bg-[#080808] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFC107]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FFC107]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-16 lg:px-24 relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Your Audience Won't Wait.
            <br />
            <span className="text-[#FFC107]">Neither Should You.</span>
          </h2>
          <p className="text-[#9A9A9A] text-lg max-w-2xl mx-auto">
            Drop us your details and channel link. We'll review your current
            setup and reach out to schedule a growth mapping call.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-[#141414] border border-white/5 rounded-2xl p-8 md:p-12 shadow-2xl"
        >
          {isConfigured ? (
            <ConfiguredForm onSuccess={() => setShowSuccess(true)} />
          ) : (
            <UnconfiguredForm />
          )}
        </motion.div>
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
