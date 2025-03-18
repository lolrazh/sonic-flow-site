import { 
  Benefits, 
  CompatibleApps,
  FAQ,
  Footer, 
  Header,
  Hero, 
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
      <Pricing />
      <Benefits />
      <FAQ />
      <Footer />
    </main>
  );
}
