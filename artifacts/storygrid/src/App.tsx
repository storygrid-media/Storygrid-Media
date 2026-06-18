import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { lazy, Suspense } from "react";
import Home from "@/pages/Home";
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
import SectionDivider from "@/components/SectionDivider";

function App() {
  return (
    <TooltipProvider>
      <div className="relative min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans overflow-x-hidden">
        {/* Cinematic Grain Overlay */}
        <div className="fixed inset-0 min-h-screen w-full z-[100] pointer-events-none opacity-[0.02] mix-blend-overlay">
           <svg className="w-full h-full">
             <filter id="global-noise">
               <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
               <feColorMatrix type="saturate" values="0" />
             </filter>
             <rect width="100%" height="100%" filter="url(#global-noise)" />
           </svg>
        </div>

        <Navbar />
        <main className="relative z-10">
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[#FFC107] font-display">Loading...</div>}>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/privacy" component={PrivacyPolicy} />
              <Route path="/terms" component={TermsOfService} />
              {/* Catch-all route to home */}
              <Route>
                <Home />
              </Route>
            </Switch>
          </Suspense>
        </main>
        <SectionDivider />
        <Footer />
      </div>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
