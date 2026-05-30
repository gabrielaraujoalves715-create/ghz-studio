import React from "react";
import { SERVICES } from "../data";
import { SparklesCore } from "@/components/ui/sparkles";
import { FloatingPathsBackground } from "@/components/ui/floating-paths";

export default function Services() {

  return (
    <section id="servicos" className="pt-6 pb-20 md:pt-8 md:pb-24 bg-white relative scroll-mt-10 overflow-hidden">
      {/* Background decoration with custom teal particles */}
      <div className="absolute inset-0 h-full w-full pointer-events-none z-0 opacity-50">
        <SparklesCore
          id="tsparticlesservices"
          background="transparent"
          minSize={0.6}
          maxSize={1.8}
          particleDensity={40}
          className="w-full h-full"
          particleColor="#0d9488"
          speed={0.8}
        />
      </div>

      <FloatingPathsBackground position={-1} className="w-full h-full">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-charcoal leading-tight">
            Serviços estratégicos pensados para fortalecer sua presença digital e gerar mais oportunidades para o seu negócio.
          </h2>
          <div className="w-20 h-[2px] bg-brand-teal mt-6"></div>
          <p className="text-zinc-500 font-light text-base md:text-lg mt-6 max-w-2xl leading-relaxed">
            Eliminamos o carregamento lento, as artes poluídas e os sistemas instáveis. Focamos no que realmente importa: "trazer leads qualificados prontos para fechar negócio".
          </p>
        </div>

        {/* Hand-drawn Circled "Serviços" Badge */}
        <div className="flex justify-center mb-14 select-none">
          <div className="relative inline-block mt-2">
            <span className="text-3xl md:text-4xl font-display font-extrabold text-charcoal tracking-tight block px-12 py-3.5 relative z-10">
              Serviços
            </span>
            <svg 
              className="absolute inset-0 w-full h-full text-[#3b82f6] pointer-events-none fill-none" 
              viewBox="0 0 220 70" 
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Overlapping double-layered organic-looking oval to perfectly simulate a handdrawn sketch */}
              <path 
                d="M 12 35 C 10 16, 50 8, 110 8 C 170 8, 208 16, 208 35 C 208 54, 170 62, 110 62 C 50 62, 12 54, 12 35 C 12 25, 30 14, 85 11 C 140 8, 195 12, 210 24" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            return (
              <div
                key={service.id}
                className="group bg-zinc-50/50 hover:bg-white border border-zinc-100 hover:border-zinc-200 p-8 transition-all duration-300 relative hover:shadow-xl hover:shadow-zinc-200/40"
              >
                {/* Visual Accent Top Line */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-zinc-200/20 group-hover:bg-brand-teal transition-all duration-300"></div>

                <div>
                  {/* Title */}
                  <h3 className="text-xl font-display font-extrabold text-charcoal mb-4 group-hover:text-brand-teal transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-zinc-600 leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </FloatingPathsBackground>
  </section>
  );
}
