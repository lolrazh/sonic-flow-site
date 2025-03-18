import { 
  Benefits, 
  FAQ,
  Footer, 
  Header
} from "~/app/_components/landing";

import {
  Hero,
  UserPersonas,
  CompatibleApps
} from "~/components/landing";

import { Pricing } from "~/app/_components/landing";

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
