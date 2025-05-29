import { Header, Footer } from "@/components";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="container mx-auto px-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="mb-6 font-serif text-4xl lowercase tracking-tight heading-gradient md:text-5xl lg:text-6xl">
              privacy policy.
            </h1>
            <p className="font-lexend text-lg text-subtle">
              last updated 29 may 2025
            </p>
          </div>

          {/* Content */}
          <div className="card-elevated rounded-2xl p-8 md:p-12">
            <div className="prose prose-invert max-w-none">
              <p className="font-lexend text-lg text-subtle mb-8">
                This Policy explains how Sonic Flow ("<strong>we</strong>", "<strong>our</strong>") collects, uses and shares your information when you visit <strong className="text-white/90">sonicflow.app</strong>, install our desktop application or otherwise interact with the Service.
              </p>

              <div className="space-y-8">
                <section>
                  <h2 className="font-serif text-2xl lowercase tracking-tight heading-gradient mb-6">
                    1. information we collect
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left font-lexend font-medium text-white/90 pb-3 pr-6">Category</th>
                          <th className="text-left font-lexend font-medium text-white/90 pb-3 pr-6">Examples</th>
                          <th className="text-left font-lexend font-medium text-white/90 pb-3">Purpose</th>
                        </tr>
                      </thead>
                      <tbody className="font-lexend text-subtle text-sm">
                        <tr className="border-b border-white/5">
                          <td className="py-4 pr-6 font-medium text-white/90">Account Data</td>
                          <td className="py-4 pr-6">Name, email</td>
                          <td className="py-4">Create your account, communicate with you</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-4 pr-6 font-medium text-white/90">Payment Data</td>
                          <td className="py-4 pr-6">Card / UPI details handled by Paddle; we only store billing tokens</td>
                          <td className="py-4">Process subscriptions, detect fraud</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-4 pr-6 font-medium text-white/90">Audio & Transcripts</td>
                          <td className="py-4 pr-6">Microphone input, transcripts</td>
                          <td className="py-4">Operate the dictation feature</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-4 pr-6 font-medium text-white/90">Usage Analytics</td>
                          <td className="py-4 pr-6">Feature usage, crash logs</td>
                          <td className="py-4">Improve performance and stability</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-6 font-medium text-white/90">Device Data</td>
                          <td className="py-4 pr-6">OS, app version, IP address</td>
                          <td className="py-4">Debugging, security</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                <section>
                  <h2 className="font-serif text-2xl lowercase tracking-tight heading-gradient mb-4">
                    2. how we collect it
                  </h2>
                  <ul className="font-lexend text-subtle leading-relaxed space-y-2 list-disc list-inside">
                    <li>Directly from you when you sign up or interact with the app.</li>
                    <li>Automatically via the app (crash logs, usage events).</li>
                    <li>Via third parties (e.g., payment processor).</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-serif text-2xl lowercase tracking-tight heading-gradient mb-6">
                    3. why we process your data
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left font-lexend font-medium text-white/90 pb-3 pr-6">Legal basis (GDPR)</th>
                          <th className="text-left font-lexend font-medium text-white/90 pb-3">Example</th>
                        </tr>
                      </thead>
                      <tbody className="font-lexend text-subtle text-sm">
                        <tr className="border-b border-white/5">
                          <td className="py-4 pr-6 font-medium text-white/90">Contract</td>
                          <td className="py-4">We need your audio to return a transcript you requested.</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-4 pr-6 font-medium text-white/90">Legitimate interests</td>
                          <td className="py-4">Debugging crashes, preventing abuse.</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-4 pr-6 font-medium text-white/90">Consent</td>
                          <td className="py-4">If you opt-in to marketing emails.</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-6 font-medium text-white/90">Legal obligation</td>
                          <td className="py-4">Tax and accounting records.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                <section>
                  <h2 className="font-serif text-2xl lowercase tracking-tight heading-gradient mb-4">
                    4. where your data goes
                  </h2>
                  <ul className="font-lexend text-subtle leading-relaxed space-y-3 list-disc list-inside">
                    <li><strong className="text-white/90">Supabase</strong> – authentication, database & storage (EU-Central).</li>
                    <li><strong className="text-white/90">Groq & Google Gemini</strong> – optional cloud transcription (US). Audio and transcripts are sent only if you enable those engines.</li>
                    <li><strong className="text-white/90">Paddle</strong> – billing (UK/EU/US).</li>
                  </ul>
                  <p className="font-lexend text-subtle leading-relaxed mt-3">
                    We never sell your data.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl lowercase tracking-tight heading-gradient mb-4">
                    5. retention
                  </h2>
                  <ul className="font-lexend text-subtle leading-relaxed space-y-2 list-disc list-inside">
                    <li>Account data – while your account is active plus 12 months.</li>
                    <li>Audio files – deleted automatically after transcription unless you elect to store them.</li>
                    <li>Transcripts – kept in your account until you delete them.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-serif text-2xl lowercase tracking-tight heading-gradient mb-4">
                    6. your rights
                  </h2>
                  <p className="font-lexend text-subtle leading-relaxed">
                    Depending on where you live, you can: access, correct, delete, download or object to processing of your data. Email <strong><a href="mailto:privacy@sonicflow.app" className="text-white/90 hover:text-white transition-colors">privacy@sonicflow.app</a></strong> to action these rights.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl lowercase tracking-tight heading-gradient mb-4">
                    7. security
                  </h2>
                  <p className="font-lexend text-subtle leading-relaxed">
                    We use encryption in transit and at rest, role-based access control, and regular security reviews. No system is 100% secure—use the Service at your own risk.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl lowercase tracking-tight heading-gradient mb-4">
                    8. children
                  </h2>
                  <p className="font-lexend text-subtle leading-relaxed">
                    Sonic Flow is not directed to children under 16. If we learn we hold data from a minor we will delete it.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl lowercase tracking-tight heading-gradient mb-4">
                    9. changes
                  </h2>
                  <p className="font-lexend text-subtle leading-relaxed">
                    We'll post any privacy updates here and, if major, notify you by email.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl lowercase tracking-tight heading-gradient mb-4">
                    10. contact
                  </h2>
                  <p className="font-lexend text-subtle leading-relaxed">
                    Questions? <strong><a href="mailto:sandheep@sonicflow.app" className="text-white/90 hover:text-white transition-colors">sandheep@sonicflow.app</a></strong>
                  </p>
                </section>
              </div>

              {/* Navigation */}
              <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4 sm:justify-between">
                <Link href="/terms" className="btn-secondary rounded-full px-6 py-3 text-center font-lexend text-sm font-medium">
                  terms of service
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