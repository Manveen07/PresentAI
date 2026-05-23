"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How does PresentAI generate slides from a single prompt?",
    a: "We send your prompt to a large language model that drafts a slide-by-slide narrative, then our layout engine fits the content into professional templates and pulls relevant imagery automatically.",
  },
  {
    q: "Can I edit the slides after they are generated?",
    a: "Yes. Every slide is fully editable in our drag-and-drop editor. Tweak text, swap images, restyle blocks, or regenerate individual sections without touching the rest of the deck.",
  },
  {
    q: "What export formats do you support?",
    a: "Free users can share a public link to any presentation. Pro users can additionally export to high-fidelity PDF and PPTX, both ready for client delivery.",
  },
  {
    q: "What happens to my free quota each month?",
    a: "The free tier resets on the first of each calendar month. Unused generations do not roll over.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel from your account settings in one click. Your Pro features stay active until the end of the current billing period, then you drop back to the free tier with no charge.",
  },
  {
    q: "Do you offer refunds?",
    a: "We review refund requests within 14 days of payment on a case-by-case basis. Reach out to support@presentai.app and we will sort it out.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-24 px-6 md:py-32 border-t border-white/[0.03]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 mb-4">
            FAQ
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
            Answers, <span className="text-slate-500 italic">first.</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-white/[0.05]"
            >
              <AccordionTrigger className="text-left text-base font-bold text-white hover:text-white hover:no-underline py-6">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-slate-400 font-medium leading-relaxed pb-6">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
