import { Metadata } from "next";
import { Navbar } from "@/components/landing-page/Navbar";
import { Hero } from "@/components/landing-page/Hero";
import { HowItWorks } from "@/components/landing-page/HowItWorks";
import { SocialProof } from "@/components/landing-page/SocialProof";
import { Pricing } from "@/components/landing-page/Pricing";
import { FAQ } from "@/components/landing-page/FAQ";
import { Footer } from "@/components/landing-page/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000"
  ),
  title: "PresentAI | From one sentence to a full presentation.",
  description:
    "Generate structured, professional presentations from a simple prompt. No more slide-filling—just effortless storytelling.",
  openGraph: {
    title: "PresentAI | AI Presentation Generator",
    description: "Build beautiful decks in seconds with our AI-powered editor.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PresentAI | AI Presentation Generator",
    description: "Build beautiful decks in seconds with our AI-powered editor.",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#02040A] text-slate-100 selection:bg-white/10 font-sans tracking-tight overflow-x-hidden antialiased">
      
      {/* Modest Backdrop - Subtle Radial Blur */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)] blur-[100px]" />
      </div>

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <HowItWorks />
        <SocialProof />
        <Pricing />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
