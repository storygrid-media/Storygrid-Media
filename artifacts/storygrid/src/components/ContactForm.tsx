import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const formId = import.meta.env.VITE_FORMSPREE_ID || "xrgvknqj";
  const [state, handleSubmit] = useForm(formId);

  return (
    <section id="contact" className="py-24 bg-[#0F0F0F] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFC107]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FFC107]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">Ready to Scale Your Content?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Drop us your details and channel link. We'll review your current setup and reach out to schedule a growth mapping call.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-[#141414] border border-white/5 rounded-2xl p-8 md:p-12 shadow-2xl"
        >
          {state.succeeded ? (
            <div className="flex flex-col items-center justify-center py-12 text-center" data-testid="form-success">
              <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Thanks!</h3>
              <p className="text-muted-foreground max-w-sm">
                Our team is reviewing your channel and will reach out shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-contact">
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
                  <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-sm" />
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
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="channel" className="text-white/80">YouTube / Instagram Link</Label>
                <Input 
                  id="channel" 
                  type="url" 
                  name="channel" 
                  placeholder="https://youtube.com/@yourchannel" 
                  required 
                  className="bg-black/50 border-white/10 focus-visible:ring-[#FFC107] h-12"
                  data-testid="input-channel"
                />
                <ValidationError prefix="Channel" field="channel" errors={state.errors} className="text-red-500 text-sm" />
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
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-sm" />
              </div>

              <Button 
                type="submit" 
                disabled={state.submitting}
                className="w-full bg-[#FFC107] text-black hover:bg-[#FFC107]/90 font-bold h-14 text-lg mt-4"
                data-testid="button-submit-contact"
              >
                {state.submitting ? "Sending..." : "Let's Talk"}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
