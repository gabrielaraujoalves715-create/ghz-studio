import React from "react";
import { getWhatsAppLink } from "../data";
import { ShinyButton } from "@/components/ui/shiny-button";

export default function CTASection() {
  const whatsappUrl = getWhatsAppLink(
    "Olá GHZ Studio! Gostaria de conversar sobre a presença digital da minha empresa e solicitar um orçamento."
  );

  return (
    <section className="py-24 md:py-32 bg-black text-white relative overflow-hidden border-t border-zinc-900">
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_60%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center justify-center gap-8 md:gap-10">

        {/* Dynamic & Strategic Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white leading-tight max-w-3xl">
          Pronto para construir uma presença digital mais profissional para sua empresa?
        </h2>

        <div className="w-full sm:w-auto flex justify-center">
          <ShinyButton
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-[420px] py-6 md:py-7 px-6 md:px-12 font-display font-bold tracking-wide text-sm md:text-base"
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

    </section>
  );
}


