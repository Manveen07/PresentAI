import { Layout, Sparkles, Wand2 } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      title: "1. Type a prompt",
      description: "Describe your presentation in a simple sentence. Be as specific or abstract as you want.",
      icon: <Sparkles className="w-5 h-5 text-slate-400" />
    },
    {
      title: "2. AI generates slides",
      description: "Our engine builds a professional narrative, generates images, and positions everything perfectly.",
      icon: <Wand2 className="w-5 h-5 text-slate-400" />
    },
    {
      title: "3. Customize & export",
      description: "Fine-tune with our intuitive editor, then export to PDF or PPTX for a perfect pitch.",
      icon: <Layout className="w-5 h-5 text-slate-400" />
    }
  ];

  return (
    <section className="py-24 px-6 border-y border-white/[0.03] bg-black/[0.02]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 md:gap-12">
           {steps.map((step, i) => (
             <div key={i} className="flex-1 space-y-4">
               <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                 {step.icon}
               </div>
               <h3 className="text-xl font-bold text-white tracking-tight">{step.title}</h3>
               <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xs">{step.description}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};
