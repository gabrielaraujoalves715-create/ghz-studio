import React, { useState, useEffect } from "react";
import { ArrowUpRight, AlignRight, X } from "lucide-react";
import { getWhatsAppLink } from "../data";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Clientes", href: "#clientes" },
    { name: "Consultoria", href: "#contato" },
    { name: "Serviços", href: "#servicos" },
    { name: "Contato", href: "#contato" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-zinc-100/60 py-4 shadow-xs"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="font-display font-extrabold text-2xl tracking-tighter text-charcoal flex items-center">
            GHZ
            <span className="text-xs font-mono font-medium tracking-normal text-zinc-400 ml-1.5 uppercase">
              Studio
            </span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-600 hover:text-charcoal transition-colors duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-brand-teal after:transition-all hover:after:w-full"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Call to Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={getWhatsAppLink("Olá GHZ Studio! Acessei o site de vocês e gostaria de solicitar uma analise gratuito para meu negócio.")}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 bg-gradient-to-r from-[#090d18] via-[#0c1326] to-[#050812] border border-blue-900/40 hover:from-[#121c3b] hover:via-[#16254e] hover:to-[#0b1227] hover:border-blue-700/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] active:from-[#050810] active:to-[#020306] text-white font-medium text-xs font-display tracking-wide uppercase px-5 py-3 hover:scale-[1.02] active:scale-[0.97] transition-all duration-300 shadow-sm cursor-pointer select-none rounded"
          >
            Orçamento gratuito
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile menu hamburger button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex p-2 text-zinc-700 hover:text-charcoal transition-colors"
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <AlignRight className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-zinc-100 px-6 py-6 flex flex-col gap-5 shadow-lg animate-fadeIn">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-zinc-700 hover:text-charcoal transition-colors py-1"
              >
                {link.name}
              </a>
            ))}
          </div>

          <a
            href={getWhatsAppLink("Olá GHZ Studio! Acessei o site e gostaria de conversar com vocês sobre um orçamento gratuito para minha empresa.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#090d18] via-[#0c1326] to-[#050812] border border-blue-900/40 hover:from-[#121c3b] hover:via-[#16254e] hover:to-[#0b1227] hover:border-blue-700/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] active:from-[#050810] active:to-[#020306] text-white font-medium text-sm font-display tracking-wide uppercase py-4 hover:scale-[1.02] active:scale-[0.97] transition-all duration-300 shadow-sm cursor-pointer select-none rounded"
          >
            Orçamento gratuito
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
}
