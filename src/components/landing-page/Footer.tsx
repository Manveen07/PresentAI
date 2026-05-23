import Link from "next/link";
import { Sparkles } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-20 px-8 border-t border-white/[0.04] bg-black/40">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link href="/" className="flex items-center gap-2 group opacity-80 hover:opacity-100 transition-opacity">
            <div className="w-5 h-5 rounded flex items-center justify-center bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-white/90" />
            </div>
            <span className="text-sm font-bold tracking-tighter uppercase opacity-90">
              PresentAI
            </span>
          </Link>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">
            The future of visual storytelling.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
          <Link href="/#pricing" className="hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="/#faq" className="hover:text-white transition-colors">
            FAQ
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <a
            href="mailto:support@presentai.app"
            className="hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>

        <div className="text-[10px] font-medium opacity-40 tracking-widest text-slate-500 uppercase">
          © {new Date().getFullYear()} PresentAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
