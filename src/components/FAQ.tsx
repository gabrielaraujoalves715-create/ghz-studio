import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS, getWhatsAppLink } from "../data";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-zinc-50 border-t border-zinc-100 scroll-mt-10">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-charcoal">
            Dúvidas frequentes
          </h2>
          <p className="text-zinc-500 font-light mt-4 text-sm md:text-base leading-relaxed">
            Tudo o que você precisa saber sobre o processo de criação, entrega e suporte do seu projeto.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-white border border-zinc-200/60 overflow-hidden transition-all duration-300"
              >
                {/* Header click bar */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-6 sm:px-8 py-5 flex items-center justify-between gap-4 group focus:outline-hidden"
                >
                  <span className="font-display font-bold text-sm sm:text-base text-charcoal group-hover:text-brand-teal transition-colors">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-zinc-50 flex items-center justify-center transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-brand-teal-light text-brand-teal" : "text-zinc-400 group-hover:text-charcoal"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Collapsible Content */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100 border-t border-zinc-100" : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="px-6 sm:px-8 py-5 text-sm text-zinc-500 leading-relaxed font-light bg-zinc-50/30">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout box for other questions */}
        <div className="mt-16 bg-white border border-zinc-200/70 p-8 text-center space-y-5 shadow-xs max-w-2xl mx-auto">
          <p className="font-display font-bold text-charcoal text-base">
            Ainda tem alguma dúvida?
          </p>
          <p className="text-zinc-500 text-sm font-light max-w-md mx-auto leading-relaxed">
            Chame no WhatsApp e vamos conversar sobre o seu projeto.
          </p>
          <div className="pt-2">
            <a
              href={getWhatsAppLink("Olá GHZ Studio! Analisei o FAQ mas tenho uma dúvida diferente sobre os serviços de desenvolvimento.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3.5 bg-neutral-100 hover:bg-brand-teal hover:text-white transition-all duration-300 text-xs font-mono font-bold tracking-wider uppercase text-charcoal"
            >
              Conversar no WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
