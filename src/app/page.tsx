import { 
  Benefits, 
  CompatibleApps, 
  Footer, 
  Hero, 
  HowItWorks, 
  Pricing, 
  UserPersonas 
} from "~/app/_components/landing";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <UserPersonas />
      <CompatibleApps />
      <HowItWorks />
      <Pricing />
      <Benefits />
      <Footer />
    </main>
  );
}
