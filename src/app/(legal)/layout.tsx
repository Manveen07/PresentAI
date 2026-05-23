import { Footer } from "@/components/landing-page/Footer";
import { Navbar } from "@/components/landing-page/Navbar";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#02040A] text-slate-100 font-sans antialiased">
      <Navbar />
      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-24">
        {children}
      </main>
      <Footer />
    </div>
  );
}
