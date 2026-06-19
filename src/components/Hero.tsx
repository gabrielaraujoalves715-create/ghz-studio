import React from "react";
import { getWhatsAppLink } from "../data";
import { FloatingPaths } from "@/components/ui/background-paths";
import { ShinyButton } from "@/components/ui/shiny-button";

export default function Hero() {
  return (
    <section className="relative pt-28 md:pt-36 pb-16 flex items-center justify-center overflow-hidden bg-brand-bg">
      {/* Background decoration with floating animated paths */}
      <div className="absolute inset-0 opacity-50 md:opacity-30 dark:opacity-40 pointer-events-none select-none z-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-5 relative z-10 w-full">
        {/* Text Content */}
        <div className="flex flex-col items-center text-center gap-4 z-20">
          
          {/* Main Title / Headline */}
          <div className="space-y-3 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-extrabold tracking-tight text-charcoal leading-[1.08]">
            Sua empresa merece uma presença digital que transmite{" "}
              <span className="text-brand-teal">
              confiança e profissionalismo
              </span>
              .
            </h1>
            
            {/* Subhead */}
            <p className="text-lg sm:text-xl text-zinc-600 leading-relaxed max-w-2xl mx-auto font-light">
              Criamos landing pages rápidas, estratégicas e preparadas para conversão. Transforme visitas em faturamento real.
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-4 flex flex-col items-center gap-3 w-full">
            <div className="bg-white border border-zinc-100 px-8 py-5 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] max-w-2xl mx-auto mb-2">
              <p className="text-base sm:text-lg text-zinc-800 font-bold leading-relaxed">
                Solicite seu orçamento e receba um plano personalizado para a necessidade do seu negócio
              </p>
            </div>
            <ShinyButton
              href={getWhatsAppLink(
                "Olá! Gostaria de solicitar um orçamento para entender como podemos estruturar o site de alta conversão da minha empresa."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-xs py-6 md:py-7 px-6 md:px-8 font-display font-bold tracking-wide text-sm md:text-base"

              colors={{
                bg: "#0E4D54",
                bgSubtle: "#093438",
                fg: "#ffffff",
                highlight: "#2dd4bf",
                highlightSubtle: "#5eead4",
              }}
            >
              Solicitar orçamento
            </ShinyButton>
          </div>

        </div>

      </div>
    </section>
  );
}
