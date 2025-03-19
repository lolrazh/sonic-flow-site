import {
  Hero,
  UserPersonas,
  CompatibleApps,
  Pricing,
  Benefits,
  FAQ,
  Header,
  Footer,
  ForVibeCoders
} from "~/components/landing";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ForVibeCoders />
      <UserPersonas />
      <CompatibleApps />
      <Pricing />
      <Benefits />
      <FAQ />
      <Footer />
    </main>
  );
}
