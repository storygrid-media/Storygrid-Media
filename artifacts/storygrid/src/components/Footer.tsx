import { Instagram, Youtube, Linkedin, Twitter } from "lucide-react";
import logoUrl from "@assets/storygridmedia_logo_1773491928917.avif";

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#080808] border-t border-white/5 pt-12 pb-8">
      <div className="container mx-auto px-6 md:px-16 lg:px-24">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="flex flex-col gap-4">
            <a
              href="#"
              className="text-2xl font-bold font-display"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              aria-label="StoryGrid Media - Back to top"
            >
              <img src={logoUrl} alt="StoryGrid Media" className="h-8 w-auto" />
            </a>
            <p className="text-[#9A9A9A] max-w-xs">
              Building structured content systems for creators, founders, and companies that refuse to stay invisible.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:items-center">
            <h4 className="font-bold text-white mb-2">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <button onClick={() => scrollTo("work")} className="text-[#9A9A9A] hover:text-white transition-colors text-left md:text-center">Our Work</button>
              <button onClick={() => scrollTo("services")} className="text-[#9A9A9A] hover:text-white transition-colors text-left md:text-center">Services</button>
              <button onClick={() => scrollTo("about")} className="text-[#9A9A9A] hover:text-white transition-colors text-left md:text-center">About</button>
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
