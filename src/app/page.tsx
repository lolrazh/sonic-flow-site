import { 
  Benefits, 
  CompatibleApps,
  FAQ,
  Footer, 
  Header,
  Hero, 
  HowItWorks, 
  Pricing, 
  UserPersonas 
} from "~/app/_components/landing";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <UserPersonas />
      <CompatibleApps />
      <HowItWorks />
      <Pricing />
      <Benefits />
      <FAQ />
      <Footer />
    </main>
  );
}
