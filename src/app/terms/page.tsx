import { Header, Footer } from "@/components";
import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="container mx-auto px-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="mb-6 font-serif text-4xl lowercase tracking-tight heading-gradient md:text-5xl lg:text-6xl">
              terms of service.
            </h1>
            <p className="font-lexend text-lg text-subtle">
              last updated 29 may 2025
            </p>
          </div>

          {/* Content */}
          <div className="card-elevated rounded-2xl p-8 md:p-12">
            <div className="prose prose-invert max-w-none">
              <p className="font-lexend text-lg text-subtle mb-8">
                <strong className="text-white/90">Welcome to Sonic Flow!</strong> These Terms govern your use of the Sonic Flow website, desktop applications, and any related services (collectively, the &quot;<strong>Service</strong>&quot;). By using the Service you agree to these Terms. If you do not agree, do not use the Service.
              </p>

              <div className="space-y-8">
                <section>
                  <h2 className="font-serif text-2xl lowercase tracking-tight heading-gradient mb-4">
                    1. who we are
                  </h2>
                  <p className="font-lexend text-subtle leading-relaxed">
                    Sonic Flow is operated by <strong className="text-white/90">Sonic Flow, Hyderabad, Telangana, India</strong> (&quot;<strong>we</strong>&quot;, &quot;<strong>our</strong>&quot;, &quot;<strong>us</strong>&quot;). Contact — <strong><a href="mailto:sandheep@sonicflow.app" className="text-white/90 hover:text-white transition-colors">sandheep@sonicflow.app</a></strong>.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl lowercase tracking-tight heading-gradient mb-4">
                    2. eligibility
                  </h2>
                  <p className="font-lexend text-subtle leading-relaxed">
                    You must be at least 16 years old (or the age of digital consent in your country if higher). By using the Service you represent that you meet this requirement.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl lowercase tracking-tight heading-gradient mb-4">
                    3. your account
                  </h2>
                  <p className="font-lexend text-subtle leading-relaxed">
                    You must provide accurate information (name, email). You&apos;re responsible for activity that happens under your login. Keep your password secure.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl lowercase tracking-tight heading-gradient mb-4">
                    4. subscriptions & billing
                  </h2>
                  <ul className="font-lexend text-subtle leading-relaxed space-y-3 list-disc list-inside">
                    <li><strong className="text-white/90">Free trial</strong>: 7 days, no card required.</li>
                    <li><strong className="text-white/90">Paid plan</strong>: Billed via <strong className="text-white/90">Paddle</strong> after the trial.</li>
                    <li><strong className="text-white/90">Refunds</strong>: 30-day money-back guarantee, no questions asked. Email us to claim.</li>
                  </ul>
                  <p className="font-lexend text-subtle leading-relaxed mt-3">
                    Prices may change; we&apos;ll give at least 30 days&apos; notice.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl lowercase tracking-tight heading-gradient mb-4">
                    5. acceptable use
                  </h2>
                  <p className="font-lexend text-subtle leading-relaxed mb-3">Do not:</p>
                  <ul className="font-lexend text-subtle leading-relaxed space-y-2 list-disc list-inside">
                    <li>use Sonic Flow to violate law, record someone without consent, or transmit harmful content;</li>
                    <li>reverse-engineer or resell the Service;</li>
                    <li>overload or disrupt our infrastructure.</li>
                  </ul>
                  <p className="font-lexend text-subtle leading-relaxed mt-3">
                    We may suspend or terminate accounts breaching these rules.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl lowercase tracking-tight heading-gradient mb-4">
                    6. intellectual property
                  </h2>
                  <p className="font-lexend text-subtle leading-relaxed">
                    We own the Sonic Flow software, brand and site. You own the audio you feed into the app and the resulting transcripts. You grant us a licence to process that content to provide the Service.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl lowercase tracking-tight heading-gradient mb-4">
                    7. third-party services
                  </h2>
                  <p className="font-lexend text-subtle leading-relaxed">
                    Sonic Flow pipes data to <strong className="text-white/90">Groq</strong>, <strong className="text-white/90">Google Gemini</strong>, <strong className="text-white/90">Supabase</strong>, and <strong className="text-white/90">Paddle</strong> to deliver features like cloud transcription, authentication and billing. Their terms apply to you when their services are triggered.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl lowercase tracking-tight heading-gradient mb-4">
                    8. disclaimer
                  </h2>
                  <p className="font-lexend text-subtle leading-relaxed">
                    Sonic Flow is provided &quot;as is&quot;. We do not promise it will be error-free or fit for any particular purpose. To the maximum extent allowed by law we disclaim all warranties.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl lowercase tracking-tight heading-gradient mb-4">
                    9. limitation of liability
                  </h2>
                  <p className="font-lexend text-subtle leading-relaxed">
                    To the fullest extent permitted, our total liability for any claim is limited to the fees you paid us in the 12 months before the event giving rise to the claim.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl lowercase tracking-tight heading-gradient mb-4">
                    10. governing law & disputes
                  </h2>
                  <p className="font-lexend text-subtle leading-relaxed">
                    These Terms are governed by the laws of <strong className="text-white/90">India</strong>. Courts in <strong className="text-white/90">Hyderabad, Telangana</strong> have exclusive jurisdiction. We may choose to offer arbitration but are not obliged to.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl lowercase tracking-tight heading-gradient mb-4">
                    11. changes
                  </h2>
                  <p className="font-lexend text-subtle leading-relaxed">
                    We can update these Terms. If we make material changes we&apos;ll email you or post a notice 14 days in advance. Continued use after that means you accept the new Terms.
                  </p>
                </section>
              </div>

              {/* Navigation */}
              <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4 sm:justify-between">
                <Link href="/privacy" className="btn-secondary rounded-full px-6 py-3 text-center font-lexend text-sm font-medium">
                  privacy policy
                </Link>
                <Link href="/" className="btn-primary rounded-full px-6 py-3 text-center font-lexend text-sm font-medium">
                  back to home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 