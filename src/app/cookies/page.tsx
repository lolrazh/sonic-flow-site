import { Header, Footer } from "@/components";
import Link from "next/link";

export default function CookiesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="container mx-auto px-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="mb-6 font-serif text-4xl lowercase tracking-tight heading-gradient md:text-5xl lg:text-6xl">
              cookie policy.
            </h1>
            <p className="font-lexend text-lg text-subtle">
              last updated 29 may 2025
            </p>
          </div>

          {/* Content */}
          <div className="card-elevated rounded-2xl p-8 md:p-12">
            <div className="prose prose-invert max-w-none">
              <p className="font-lexend text-lg text-subtle mb-8">
                Sonic Flow&apos;s marketing site currently sets <strong className="text-white/90">only essential cookies</strong> (session and CSRF tokens). We do <strong className="text-white/90">not</strong> use analytics, ads or behavioural tracking cookies at this time.
              </p>

              <div className="space-y-8">
                <section>
                  <h2 className="font-serif text-2xl lowercase tracking-tight heading-gradient mb-4">
                    what are cookies?
                  </h2>
                  <p className="font-lexend text-subtle leading-relaxed">
                    Cookies are small text files that websites place on your device to store information about your visit. They help websites remember your preferences and improve your browsing experience.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl lowercase tracking-tight heading-gradient mb-4">
                    cookies we use
                  </h2>
                  <div className="space-y-4">
                    <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
                      <h3 className="font-lexend font-medium text-white/90 mb-2">Essential Cookies</h3>
                      <p className="font-lexend text-subtle text-sm leading-relaxed mb-3">
                        These cookies are necessary for the website to function properly. They cannot be disabled.
                      </p>
                      <ul className="font-lexend text-subtle text-sm leading-relaxed space-y-1 list-disc list-inside ml-4">
                        <li><strong className="text-white/70">Session tokens</strong> - Keep you logged in during your visit</li>
                        <li><strong className="text-white/70">CSRF tokens</strong> - Protect against security threats</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="font-serif text-2xl lowercase tracking-tight heading-gradient mb-4">
                    what we don&apos;t use
                  </h2>
                  <p className="font-lexend text-subtle leading-relaxed mb-4">
                    Unlike many websites, we keep things simple and privacy-focused:
                  </p>
                  <ul className="font-lexend text-subtle leading-relaxed space-y-2 list-disc list-inside">
                    <li>No analytics cookies (Google Analytics, etc.)</li>
                    <li>No advertising cookies</li>
                    <li>No social media tracking cookies</li>
                    <li>No behavioral tracking or profiling</li>
                    <li>No third-party marketing cookies</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-serif text-2xl lowercase tracking-tight heading-gradient mb-4">
                    managing cookies
                  </h2>
                  <p className="font-lexend text-subtle leading-relaxed mb-4">
                    Since we only use essential cookies, there&apos;s nothing to manage or opt out of. However, you can always:
                  </p>
                  <ul className="font-lexend text-subtle leading-relaxed space-y-2 list-disc list-inside">
                    <li>Clear cookies through your browser settings</li>
                    <li>Block cookies entirely (though this may affect website functionality)</li>
                    <li>Use private/incognito browsing mode</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-serif text-2xl lowercase tracking-tight heading-gradient mb-4">
                    future changes
                  </h2>
                  <p className="font-lexend text-subtle leading-relaxed">
                    If we ever decide to add analytics or other cookies in the future, we&apos;ll update this policy and implement a proper cookie consent banner. For now, we&apos;re committed to keeping things minimal and privacy-first.
                  </p>
                </section>

                <section>
                  <h2 className="font-serif text-2xl lowercase tracking-tight heading-gradient mb-4">
                    questions?
                  </h2>
                  <p className="font-lexend text-subtle leading-relaxed">
                    If you have any questions about our cookie policy, feel free to reach out at <strong><a href="mailto:sandheep@sonicflow.app" className="text-white/90 hover:text-white transition-colors">sandheep@sonicflow.app</a></strong>.
                  </p>
                </section>
              </div>

              {/* Navigation */}
              <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4 sm:justify-between">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/terms" className="btn-secondary rounded-full px-6 py-3 text-center font-lexend text-sm font-medium">
                    terms of service
                  </Link>
                  <Link href="/privacy" className="btn-secondary rounded-full px-6 py-3 text-center font-lexend text-sm font-medium">
                    privacy policy
                  </Link>
                </div>
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