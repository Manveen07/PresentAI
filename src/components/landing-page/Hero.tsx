"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Layout, MousePointer2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export const Hero = () => {
  const router = useRouter();
  const [displayText, setDisplayText] = useState("");
  const fullText = "The future of remote work and digital collaboration...";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
         setTimeout(() => { index = 0; }, 2000);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Minimalist Reveal Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl md:text-8xl font-black tracking-tightest mb-6 leading-[0.85] text-white">
            From one sentence <br/>
            <span className="text-slate-500 font-medium">to a full presentation.</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg text-slate-500 mb-10 font-medium leading-relaxed">
            Generate structures, narratives, and professional layouts in seconds. 
            The most direct path from prompt to pitch.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
                onClick={() => router.push("/sign-up")} 
                size="lg"
                className="h-12 px-8 bg-white text-black hover:bg-slate-200 rounded-full font-bold shadow-2xl transition-all group"
            >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
                variant="ghost" 
                onClick={() => router.push("/sign-up")} 
                className="text-slate-400 hover:text-white font-bold"
            >
                Try for free
            </Button>
          </div>
        </motion.div>

        {/* Product Showcase - CSS Based Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="relative w-full max-w-5xl group"
        >
           <div className="absolute inset-0 bg-white/[0.02] blur-3xl rounded-full opacity-50 -z-10" />
           <div className="bg-[#05060A] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl relative">
              {/* Editor Bar */}
              <div className="h-10 border-b border-white/[0.04] bg-white/[0.01] flex items-center justify-between px-4">
                 <div className="flex gap-1.5 grayscale opacity-30">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                 </div>
                 <div className="flex items-center gap-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                    <span>Draft v1.4</span>
                    <div className="h-3 w-px bg-white/5" />
                    <span>Auto-Layout</span>
                 </div>
                 <div className="flex gap-4 opacity-50">
                    <Layout className="w-3 h-3 text-white" />
                    <Sparkles className="w-3 h-3 text-white" />
                 </div>
              </div>

              {/* Editor Canvas Area */}
              <div className="aspect-video flex items-center justify-center bg-black/40 relative overflow-hidden p-8 sm:p-16 lg:p-24">
                 
                 {/* CSS Slide Mockup */}
                 <div className="relative w-full h-full bg-[#0A0B0E] rounded-xl border border-white/[0.05] p-12 flex flex-col justify-end gap-6 overflow-hidden group/canvas">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, delay: 2 }}
                        className="absolute inset-x-0 bottom-0 h-1.5 bg-white/5"
                    />
                    <div className="space-y-4 relative z-10">
                        <motion.div 
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: 2.2 }}
                           className="h-3 w-1/4 bg-white/10 rounded-full" 
                        />
                        <motion.div 
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: 2.4 }}
                           className="h-8 md:h-12 w-full max-w-lg bg-white/[0.02] border-l-2 border-white/10 pl-6 flex items-center text-lg md:text-2xl font-bold italic text-slate-400"
                        >
                           Modernizing the workspace.
                        </motion.div>
                        <motion.div 
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: 2.6 }}
                           className="h-3 w-3/4 bg-white/5 rounded-full" 
                        />
                    </div>
                    {/* Animated "Prompt" Overlay */}
                    <div className="absolute top-8 left-8 right-8">
                       <div className="bg-black/80 backdrop-blur-md border border-white/5 rounded-full px-6 py-2.5 flex items-center gap-3 w-fit shadow-2xl shadow-black">
                          <Sparkles className="w-3.5 h-3.5 text-white/50" />
                          <span className="text-[11px] font-bold tracking-tight text-white/80 h-4">
                             {displayText}
                             <span className="w-0.5 h-3.5 bg-white ml-0.5 inline-block animate-pulse align-middle" />
                          </span>
                       </div>
                    </div>
                    
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/[0.015] rounded-full blur-3xl pointer-events-none" 
                    />
                 </div>
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};
