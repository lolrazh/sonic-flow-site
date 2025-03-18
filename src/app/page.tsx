import {
  Hero,
  UserPersonas,
  CompatibleApps,
  Pricing,
  Benefits,
  FAQ,
  Header,
  Footer
} from "~/components/landing";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <UserPersonas />
      <CompatibleApps />
      <Pricing />
      <Benefits />
      <FAQ />
      <Footer />
    </main>
  );
}
