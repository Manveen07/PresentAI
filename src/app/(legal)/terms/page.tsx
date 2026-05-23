import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | PresentAI",
  description: "The terms that govern your use of PresentAI.",
};

export default function TermsPage() {
  return (
    <article className="prose prose-invert max-w-none space-y-6 text-slate-300">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 mb-3">
          Legal
        </p>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-500 mt-3">Last updated: May 23, 2026</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">1. Acceptance</h2>
        <p className="text-sm leading-relaxed">
          By creating an account or using PresentAI you agree to these Terms.
          If you do not agree, do not use the service.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">2. The service</h2>
        <p className="text-sm leading-relaxed">
          PresentAI provides AI-assisted tools to generate, edit, and export
          presentation slides. The free tier includes a limited monthly quota.
          The Pro tier unlocks unlimited generations and additional features
          listed on the pricing page.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">3. Your content</h2>
        <p className="text-sm leading-relaxed">
          You retain ownership of the prompts you submit and the presentations
          you generate. You grant us a limited license to store and process
          your content so we can render it back to you and operate the
          service.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">4. Acceptable use</h2>
        <p className="text-sm leading-relaxed">
          You may not use PresentAI to generate unlawful, infringing,
          defamatory, or harmful content, to attempt to reverse-engineer the
          service, or to interfere with its operation. We may suspend accounts
          that violate this policy.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">5. Billing & refunds</h2>
        <p className="text-sm leading-relaxed">
          Paid subscriptions are billed by Lemon Squeezy on the cadence shown
          at checkout. You can cancel at any time from your account settings;
          cancellation takes effect at the end of the current billing period.
          Refund requests are reviewed on a case-by-case basis within 14 days
          of payment.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">6. AI output</h2>
        <p className="text-sm leading-relaxed">
          AI-generated content may be inaccurate or incomplete. You are
          responsible for reviewing output before relying on it for any
          professional purpose.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">7. Disclaimer</h2>
        <p className="text-sm leading-relaxed">
          The service is provided &ldquo;as is&rdquo; without warranties of any
          kind. To the extent permitted by law, our liability is limited to
          the amount you paid us in the prior twelve months.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">8. Changes</h2>
        <p className="text-sm leading-relaxed">
          We may update these Terms from time to time. Material changes will
          be announced via email or in-product notice. Continued use after
          changes take effect constitutes acceptance.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">9. Contact</h2>
        <p className="text-sm leading-relaxed">
          Questions about these Terms?{" "}
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
