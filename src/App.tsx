import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Clients from "./components/Clients";
import Services from "./components/Services";
import ContactForm from "./components/ContactForm";
import FAQ from "./components/FAQ";
import CTASection from "./components/CTASection";
import WhyChoose from "./components/WhyChoose";
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
        <Clients />

        {/* Minimalist Grid Services section */}
        <Services />
        <WhyChoose />
        {/* Lead qualification contact form */}
        <ContactForm />

        {/* Fully Interactive FAQ Section */}
        <FAQ />

        {/* Strong Final CTA conversion box */}
        <CTASection />
      </main>
    </div>
  );
}
