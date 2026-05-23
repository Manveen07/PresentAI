import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | PresentAI",
  description: "How PresentAI collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <article className="prose prose-invert max-w-none space-y-6 text-slate-300">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 mb-3">
          Legal
        </p>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500 mt-3">Last updated: May 23, 2026</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">1. Information we collect</h2>
        <p className="text-sm leading-relaxed">
          When you create an account on PresentAI we collect your name, email
          address, and authentication identifiers provided by our auth provider
          (Clerk). When you generate presentations we store the prompts you
          submit and the resulting slide content so we can render them back to
          you. We do not sell personal data.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">2. How we use information</h2>
        <p className="text-sm leading-relaxed">
          We use your information to operate the service, authenticate your
          account, process subscription payments through Lemon Squeezy,
          generate AI content using third-party model providers, and to debug
          and improve the product.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">3. Third-party services</h2>
        <p className="text-sm leading-relaxed">
          We use Clerk for authentication, Lemon Squeezy for payment
          processing, and AI model providers (such as Google Gemini and
          OpenAI) for content generation. Each provider handles your data
          according to its own privacy policy.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">4. Data retention</h2>
        <p className="text-sm leading-relaxed">
          Presentation content is retained while your account is active. You
          may delete individual presentations at any time. If you delete your
          account, we remove your data within 30 days, except where retention
          is required for legal or accounting purposes.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">5. Your rights</h2>
        <p className="text-sm leading-relaxed">
          You may access, correct, export, or delete your personal data by
          contacting us at the address below. If you are in the EEA or UK, you
          have additional rights under GDPR; if you are in California, you
          have rights under the CCPA.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">6. Contact</h2>
        <p className="text-sm leading-relaxed">
          For privacy questions, email{" "}
          <a
            href="mailto:support@presentai.app"
            className="text-white underline decoration-white/30 hover:decoration-white"
          >
            support@presentai.app
          </a>
          .
        </p>
      </section>
    </article>
  );
}
