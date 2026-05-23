"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/[0.04] bg-black/30 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 group"
        >
          <div className="w-6 h-6 rounded flex items-center justify-center bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-white/90" />
          </div>
          <span className="text-sm font-bold tracking-tighter uppercase opacity-90">
            PresentAI
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={() => router.push("/sign-in")}
            className="text-[11px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest"
          >
            Log In
          </button>
          <Button
            onClick={() => router.push("/sign-up")}
            size="sm"
            className="h-8 px-5 bg-white text-black hover:bg-slate-200 transition-colors rounded-full text-[10px] font-black uppercase tracking-widest"
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};
