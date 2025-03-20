import {
  Hero,
  HowItWorks,
  Pricing,
  FAQ,
  Header,
  Footer,
  ForVibeCoders
} from "~/components/organisms/landing";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ForVibeCoders />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
