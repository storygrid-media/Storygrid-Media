"use client";

import React, { forwardRef, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { 
  FileText, 
  Database, 
  MessageSquare, 
  Zap, 
  Brain,
  MessageCircle,
  Share2
} from "lucide-react";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; label?: string }
>(({ className, children, label }, ref) => {
  return (
    <div className="flex flex-col items-center gap-2 z-10">
      <div
        ref={ref}
        className={cn(
          "flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-[#1A1A1A] p-3 shadow-2xl relative group",
          className
        )}
      >
        <div className="absolute inset-0 bg-[#FFC107] blur-[20px] opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full" />
        {children}
      </div>
      {label && <span className="text-[10px] uppercase font-bold tracking-widest text-[#9A9A9A]">{label}</span>}
    </div>
  );
});

Circle.displayName = "Circle";

export default function Workflow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 bg-[#080808] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-16 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-[#FFC107] font-semibold tracking-wider uppercase text-sm mb-4">The Content Engine</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Automated Pipeline for <br/> 
              <span className="text-white/40 italic">Maximum Leverage</span>
            </h2>
            <p className="text-[#9A9A9A] text-lg mb-8 leading-relaxed max-w-xl">
              We don't just edit videos. We build a proprietary systems-level engine that 
              takes your raw input and distributes synchronized, high-retention content 
              across your entire digital ecosystem.
            </p>
            
            <div className="space-y-4">
              {[
                "AI-Powered Hook Optimization",
                "Automated Multi-Platform Syncing",
                "Dynamic Viral Pacing Systems",
                "Cloud-Native Distribution Architecture"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFC107]" />
                  <span className="text-white/80 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div
            className="relative flex h-[450px] w-full items-center justify-center overflow-hidden rounded-3xl border border-white/5 bg-[#0F0F0F] p-6 shadow-3xl"
            ref={containerRef}
          >
            <div className="flex size-full flex-col items-stretch justify-center gap-8 max-w-sm">
              <div className="flex flex-row items-center justify-between">
                <Circle ref={div1Ref} label="Raw Media">
                  <Database className="w-6 h-6 text-[#FFC107]" />
                </Circle>
                <Circle ref={div5Ref} label="Strategy">
                  <FileText className="w-6 h-6 text-[#FFC107]" />
                </Circle>
              </div>
              <div className="flex flex-row items-center justify-between">
                <Circle ref={div2Ref} label="Notion">
                  <MessageSquare className="w-6 h-6 text-white" />
                </Circle>
                <Circle ref={div4Ref} className="size-20 border-[#FFC107]/50 shadow-[#FFC107]/10" label="StoryGrid Engine">
                  <Brain className="w-10 h-10 text-[#FFC107]" />
                </Circle>
                <Circle ref={div6Ref} label="Automations">
                  <Zap className="w-6 h-6 text-white" />
                </Circle>
              </div>
              <div className="flex flex-row items-center justify-between">
                <Circle ref={div3Ref} label="Feedbacks">
                  <MessageCircle className="w-6 h-6 text-[#FFC107]" />
                </Circle>
                <Circle ref={div7Ref} label="Publishing">
                  <Share2 className="w-6 h-6 text-[#FFC107]" />
                </Circle>
              </div>
            </div>

            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div1Ref}
              toRef={div4Ref}
              curvature={-50}
              duration={3}
              gradientStartColor="#FFC107"
              gradientStopColor="#FFD54F"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div2Ref}
              toRef={div4Ref}
              duration={3}
              gradientStartColor="#FFC107"
              gradientStopColor="#FFD54F"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div3Ref}
              toRef={div4Ref}
              curvature={50}
              duration={3}
              gradientStartColor="#FFC107"
              gradientStopColor="#FFD54F"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div5Ref}
              toRef={div4Ref}
              curvature={-50}
              duration={3}
              reverse
              gradientStartColor="#FFC107"
              gradientStopColor="#FFD54F"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div6Ref}
              toRef={div4Ref}
              duration={3}
              reverse
              gradientStartColor="#FFC107"
              gradientStopColor="#FFD54F"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div7Ref}
              toRef={div4Ref}
              curvature={50}
              duration={3}
              reverse
              gradientStartColor="#FFC107"
              gradientStopColor="#FFD54F"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
