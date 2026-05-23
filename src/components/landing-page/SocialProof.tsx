import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "I used to spend two evenings before every pitch wrestling with slide layouts. PresentAI gave me a polished deck in under five minutes. It feels unfair.",
    name: "Maya Chen",
    role: "Founder, Northbound",
  },
  {
    quote:
      "Our consulting team ships three client decks a week. The narrative scaffolding alone is worth the subscription — the editor on top is the cherry.",
    name: "Daniel Okafor",
    role: "Principal, Atlas Strategy",
  },
  {
    quote:
      "The exports actually look like something a senior designer would hand back. No more death by gradient.",
    name: "Priya Subramanian",
    role: "Head of Marketing, Lumen Labs",
  },
];

const logos = [
  "Northbound",
  "Atlas Strategy",
  "Lumen Labs",
  "Vertex Bio",
  "Helix Capital",
  "Forge AI",
];

export const SocialProof = () => {
  return (
    <section className="py-24 px-6 md:py-32 border-t border-white/[0.03]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 mb-4">
            Trusted by teams shipping fast
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-50">
            {logos.map((logo) => (
              <span
                key={logo}
                className="text-sm font-black uppercase tracking-tight text-slate-400"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="p-8 rounded-[28px] border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] transition-colors flex flex-col gap-6"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="w-3.5 h-3.5 fill-white/80 text-white/80"
                  />
                ))}
              </div>
              <blockquote className="text-sm text-slate-300 font-medium leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto">
                <div className="text-sm font-bold text-white">{t.name}</div>
                <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mt-1">
                  {t.role}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
