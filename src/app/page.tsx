import {
  Hero,
  HowItWorks,
  Pricing,
  FAQ,
  Header,
  Footer,
  Features
} from "@/components";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
