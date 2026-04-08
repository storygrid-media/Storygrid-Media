import { Instagram, Youtube, Linkedin, Twitter } from "lucide-react";
import logoUrl from "@assets/logo_(1)_1773492679483.avif";

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#080808] border-t border-white/5 pt-24 pb-12">
      {/* High-Impact CTA Banner */}
      <div className="container mx-auto px-6 md:px-16 lg:px-24 mb-24">
        <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#141414] to-black border border-white/10 p-12 md:p-20 flex flex-col items-center text-center">
           {/* Background Glow */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[#FFC107]/5 blur-[100px] pointer-events-none" />
           
           <h3 className="font-display text-4xl md:text-6xl font-black mb-8 leading-tight text-white relative z-10">
              Ready to <span className="text-[#FFC107]">Scale</span> Your Influence?
           </h3>
           <p className="text-[#9A9A9A] text-xl max-w-2xl mb-12 font-medium relative z-10">
              Join the world's most ambitious creators and founders. 
              Let's build your content system today.
           </p>
           <button 
              onClick={() => scrollTo("contact")}
              className="relative z-10 px-10 py-5 bg-[#FFC107] text-black font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-2xl shadow-[#FFC107]/20"
           >
              Book Your Growth Audit
           </button>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-16 lg:px-24">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="flex flex-col gap-4">
            <a
              href="#"
              className="text-2xl font-bold font-display"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              aria-label="StoryGrid Media - Back to top"
            >
              <span className="flex items-center gap-2.5">
                <img src={logoUrl} alt="" width="32" height="32" className="h-7 w-auto" aria-hidden="true" />
                <span className="text-xl font-bold font-display">StoryGrid <span className="text-[#FFC107]">Media</span></span>
              </span>
            </a>
            <p className="text-[#9A9A9A] max-w-xs">
              Powering growth-focused content systems for founders and creators who refuse to stay invisible.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:items-center">
            <h4 className="font-bold text-white mb-2">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <button onClick={() => scrollTo("work")} className="text-[#9A9A9A] hover:text-white transition-colors text-left md:text-center">Success Stories</button>
              <button onClick={() => scrollTo("services")} className="text-[#9A9A9A] hover:text-white transition-colors text-left md:text-center">Services</button>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <h4 className="font-bold text-white mb-2">Contact</h4>
            <a href="mailto:team@storygridmedia.in" className="text-[#9A9A9A] hover:text-[#FFC107] transition-colors">
              team@storygridmedia.in
            </a>
            <div className="flex gap-4 mt-4">
              <a href="https://instagram.com/storygridmedia" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-[#FFC107] hover:text-black transition-colors" data-testid="link-social-instagram" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://youtube.com/@storygridmedia" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-[#FFC107] hover:text-black transition-colors" data-testid="link-social-youtube" aria-label="YouTube">
                <Youtube size={18} />
              </a>
              <a href="https://linkedin.com/company/storygridmedia" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-[#FFC107] hover:text-black transition-colors" data-testid="link-social-linkedin" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="https://twitter.com/storygridmedia" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-[#FFC107] hover:text-black transition-colors" data-testid="link-social-twitter" aria-label="Twitter">
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[#9A9A9A] text-sm">
            &copy; 2026 StoryGrid Media. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-[#9A9A9A]">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
