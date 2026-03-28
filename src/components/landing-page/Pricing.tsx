import { CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24 px-6 md:py-40">
      <div className="max-w-6xl mx-auto text-center mb-16 underline decoration-white/5">
         <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">Perfectly <span className="text-slate-500 italic">balanced.</span></h2>
         <p className="text-slate-500 font-medium">No hidden fees, no complexity. Just high-end output.</p>
      </div>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Free Tier */}
        <div className="p-10 rounded-[40px] border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] transition-colors flex flex-col justify-between group">
           <div className="space-y-4">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-600">Free</div>
              <div className="text-4xl font-black text-white">$0</div>
              <ul className="pt-8 space-y-4 text-sm font-medium text-slate-500 text-left">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white/20" /> 3 AI Presentations / month</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white/20" /> Public sharing links</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white/20" /> Community slide presets</li>
              </ul>
           </div>
           <Button variant="outline" asChild className="mt-12 h-11 border-white/5 hover:bg-white hover:text-black rounded-full font-bold">
              <Link href="/sign-up">Start Free</Link>
           </Button>
        </div>

        {/* Pro Tier */}
        <div className="p-10 rounded-[40px] border border-white/[0.08] bg-black shadow-2xl relative overflow-hidden flex flex-col justify-between group">
           <div className="absolute top-0 right-0 p-6 flex flex-col items-end">
              <div className="bg-white text-black text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-tighter">Recommended</div>
           </div>
           <div className="space-y-4 relative z-10">
              <div className="text-[10px] font-black uppercase tracking-widest text-white/60">Pro Caliber</div>
              <div className="text-4xl font-black text-white">$19<span className="text-sm font-medium text-slate-600 ml-1">/mo</span></div>
              <p className="text-[10px] text-slate-600 font-bold italic">Billed annually</p>
              <ul className="pt-8 space-y-4 text-sm font-medium text-white/70 text-left">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white shadow-lg" /> Unlimited AI Presentations</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white" /> Professional Brand Kits</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white" /> High-fidelity PDF & PPTX export</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white" /> Selective gen-rank priority</li>
              </ul>
           </div>
           <Button asChild className="mt-12 h-11 bg-white text-black hover:bg-slate-200 rounded-full font-black uppercase tracking-widest transition-all">
              <Link href="/sign-up">Get Pro Now</Link>
           </Button>
        </div>
      </div>
    </section>
  );
};
