import { About } from "@/components/About";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Jurisdictions } from "@/components/Jurisdictions";
import { Press } from "@/components/Press";
import { Quote } from "@/components/Quote";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Services } from "@/components/Services";
import { safeHttpUrl } from "@/lib/links";

export default function Home() {
  return (
    <div id="top">
      <ScrollReveal />
      <Header />
      <main id="content">
        <Hero />
        <Services />
        <Jurisdictions />
        <Quote />
        <About />
        <Press />
        <ContactForm bookingUrl={safeHttpUrl(process.env.BOOKING_URL)} />
      </main>
      <Footer privacyUrl={safeHttpUrl(process.env.PRIVACY_POLICY_URL)} />
    </div>
  );
}
