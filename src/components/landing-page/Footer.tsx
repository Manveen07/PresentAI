import { Sparkles } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-20 px-8 border-t border-white/[0.04] bg-black/40">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex flex-col items-center md:items-start gap-4">
           <div className="flex items-center gap-2 group cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
              <div className="w-5 h-5 rounded flex items-center justify-center bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                 <Sparkles className="w-3.5 h-3.5 text-white/90" />
              </div>
              <span className="text-sm font-bold tracking-tighter uppercase opacity-90">PresentAI</span>
           </div>
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-800">The future of visual storytelling.</p>
        </div>
        <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
           <a href="#" className="hover:text-white transition-colors">Twitter</a>
           <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
           <a href="#" className="hover:text-white transition-colors">Legal</a>
           <a href="#" className="hover:text-white transition-colors">Privacy</a>
        </div>
        <div className="text-[10px] font-medium opacity-30 tracking-widest text-slate-500 uppercase">
           © 2026 PRESENTAI INC. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};
