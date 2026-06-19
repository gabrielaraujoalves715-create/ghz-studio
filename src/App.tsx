import Header from "./components/Header";
import Hero from "./components/Hero";
import Clients from "./components/Clients";
import Services from "./components/Services";
import ContactForm from "./components/ContactForm";
import FAQ from "./components/FAQ";
import CTASection from "./components/CTASection";
import WhyChoose from "./components/WhyChoose";
import SmartChat from "./components/SmartChat";
import ScrollReveal from "./components/ScrollReveal";

export default function App() {
  return (
    <div className="relative min-h-screen bg-brand-bg text-charcoal">
      {/* Premium Minimal Navigation Header */}
      <Header />

      {/* Main Container */}
      <main>
        {/* Dynamic & Persuasive Hero Section */}
        <Hero />

        {/* Some of our beautiful clients carousel */}
        <ScrollReveal>
          <Clients />
        </ScrollReveal>

        {/* Minimalist Grid Services section */}
        <ScrollReveal>
          <Services />
        </ScrollReveal>

        <ScrollReveal>
          <WhyChoose />
        </ScrollReveal>

        {/* Lead qualification contact form */}
        <ScrollReveal>
          <ContactForm />
        </ScrollReveal>

        {/* Fully Interactive FAQ Section */}
        <ScrollReveal>
          <FAQ />
        </ScrollReveal>

        {/* Strong Final CTA conversion box */}
        <ScrollReveal>
          <CTASection />
        </ScrollReveal>
      </main>

      {/* Smart Chat Floating Button */}
      <SmartChat />
    </div>
  );
}
