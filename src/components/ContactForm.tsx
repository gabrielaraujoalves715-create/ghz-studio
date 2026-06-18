import React, { useState } from "react";
import { Check, Send, AlertCircle, Sparkles, Building2 } from "lucide-react";
import { getWhatsAppLink } from "../data";
import { FloatingPaths } from "@/components/ui/background-paths";
import { ShinyButton } from "@/components/ui/shiny-button";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    revenue: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const revenueOptions = [
    { id: "below_10k", label: "Abaixo de 10mil" },
    { id: "10k_30m", label: "10 mil a 30 mil" },
    { id: "30k_70m", label: "30 mil por 70 mil" },
    { id: "70k_100m", label: "70 mil e 100 mil" },
    { id: "100k_300m", label: "100 mil e 300 mil" },
    { id: "300k_500m", label: "300 mil e 500 mil" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSelectRevenue = (label: string) => {
    setFormData((prev) => ({ ...prev, revenue: label }));
    if (errors.revenue) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.revenue;
        return updated;
      });
    }
  };

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = "Nome completo é obrigatório";
    if (!formData.email.trim()) {
      tempErrors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Insira um e-mail válido";
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = "Número de celular é obrigatório";
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      tempErrors.phone = "Insira um número celular válido com DDD";
    }
    if (!formData.revenue) tempErrors.revenue = "Selecione o faturamento da empresa";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handlePhoneKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Basic auto-formatter helper for Brazillian phone style (11) 99999-9999
    // Wait, let's let the user type, but we can also supply native masking gently
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
    if (errors.phone) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.phone;
        return updated;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate lead registration API post
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Create WhatsApp message based on fields to guarantee extreme seamless redirection
      const whatsappMsg = `Olá! Acabei de enviar o formulário e gostaria de fazer uma consultoria estratégica:\n\n*Nome:* ${formData.name}\n*E-mail:* ${formData.email}\n*WhatsApp:* ${formData.phone}\n*Faturamento Mensal:* ${formData.revenue}`;
      const url = getWhatsAppLink(whatsappMsg);
      
      // Gently redirect so the agent gets the response
      window.open(url, "_blank");
    }, 1200);
  };

  return (
    <section id="contato" className="py-20 bg-brand-bg relative scroll-mt-10 overflow-hidden border-t border-zinc-100 w-full">
      {/* Background decoration with floating animated paths matching the start of the site */}
      <div className="absolute inset-0 opacity-30 dark:opacity-40 pointer-events-none select-none z-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Intro header exactly like user's request screen description */}
        <div className="max-w-xl mx-auto text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider text-brand-teal bg-brand-teal/5 uppercase mb-4">
            <Building2 className="w-3.5 h-3.5" />
            Qualificação Comercial
          </span>
          <p className="text-xl md:text-2xl font-light text-zinc-700 leading-relaxed text-center">
            Preencha o formulário e nossa equipe entrará em contato com você em breve.
          </p>
        </div>

        <div className="bg-transparent rounded-3xl border border-zinc-100/50 p-6 md:p-10 max-w...">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-6">
              <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto text-brand-teal">
                <Check className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-display font-extrabold text-charcoal">
                  Formulário recebido com sucesso!
                </h3>
                <p className="text-zinc-500 font-light max-w-md mx-auto">
                  Obrigado pelas informações, {formData.name}. Estamos redirecionando você para o WhatsApp de nossa equipe de vendas para acelerar seu atendimento.
                </p>
              </div>
              <div className="pt-4">
                <button
                  id="btn-resubmit"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: "", email: "", phone: "", revenue: "" });
                  }}
                  className="text-sm text-brand-teal hover:underline font-medium"
                >
                  Preencher novamente
                </button>
              </div>
            </div>
          ) : (
            <form id="lead-qualification-form" onSubmit={handleSubmit} className="space-y-8">
              
              {/* Input grid */}
              <div className="space-y-6">
                
                {/* Field: Nome completo */}
                <div className="space-y-2 font-display">
                  <label htmlFor="input-name" className="block text-sm font-semibold text-zinc-700">
                    Nome completo
                  </label>
                  <input
                    id="input-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Seu nome"
                    className={`w-full px-5 py-4 rounded-xl border bg-zinc-50/50 text-zinc-900 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.name 
                        ? "border-red-500 focus:ring-red-500/20" 
                        : "border-zinc-200 focus:border-brand-teal focus:ring-brand-teal/20"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs font-medium text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Field: Seu e-mail */}
                <div className="space-y-2 font-display">
                  <label htmlFor="input-email" className="block text-sm font-semibold text-zinc-700">
                    Seu e-mail
                  </label>
                  <input
                    id="input-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="voce@empresa.com"
                    className={`w-full px-5 py-4 rounded-xl border bg-zinc-50/50 text-zinc-900 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.email 
                        ? "border-red-500 focus:ring-red-500/20" 
                        : "border-zinc-200 focus:border-brand-teal focus:ring-brand-teal/20"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs font-medium text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Field: Número de celular com DDD */}
                <div className="space-y-2 font-display">
                  <label htmlFor="input-phone" className="block text-sm font-semibold text-zinc-700">
                    Número de celular com DDD
                  </label>
                  <input
                    id="input-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    maxLength={15}
                    placeholder="(11) 99999-9999"
                    className={`w-full px-5 py-4 rounded-xl border bg-zinc-50/50 text-zinc-900 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.phone 
                        ? "border-red-500 focus:ring-red-500/20" 
                        : "border-zinc-200 focus:border-brand-teal focus:ring-brand-teal/20"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs font-medium text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Field: Faturamento mensal da empresa */}
                <div className="space-y-3 pt-2">
                  <label className="block text-sm font-semibold text-zinc-700 font-display">
                    Faturamento mensal da empresa
                  </label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {revenueOptions.map((option) => {
                      const isSelected = formData.revenue === option.label;
                      return (
                        <button
                          key={option.id}
                          id={`radio-revenue-${option.id}`}
                          type="button"
                          onClick={() => handleSelectRevenue(option.label)}
                          className={`flex items-center gap-4 px-5 py-4.5 text-left border rounded-xl transition-all duration-150 relative ${
                            isSelected 
                              ? "border-brand-teal bg-brand-teal/[0.04] text-brand-teal ring-1 ring-brand-teal shadow-md shadow-brand-teal/5" 
                              : "border-zinc-200 hover:border-zinc-300 text-zinc-600 bg-zinc-50/20 hover:bg-zinc-50/80"
                          }`}
                        >
                          <span 
                            className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-colors flex-shrink-0 ${
                              isSelected 
                                ? "border-brand-teal bg-brand-teal" 
                                : "border-zinc-300"
                            }`}
                          >
                            {isSelected && (
                              <span className="w-2 h-2 rounded-full bg-white block" />
                            )}
                          </span>
                          <span className="text-sm font-medium font-display leading-tight">{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.revenue && (
                    <p className="text-xs font-medium text-red-500 flex items-center gap-1 pt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.revenue}
                    </p>
                  )}
                </div>

              </div>

              {/* Submission CTA button */}
              <div className="pt-4">
                <ShinyButton
                  id="btn-submit-lead-form"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 md:py-7 px-6 md:px-8 font-display font-bold tracking-wide text-sm md:text-base flex items-center justify-center gap-3"
                  colors={{
                    bg: "#0E4D54",
                    bgSubtle: "#093438",
                    fg: "#ffffff",
                    highlight: "#2dd4bf",
                    highlightSubtle: "#5eead4",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processando informações...</span>
                    </>
                  ) : (
                    <span>Solicitar orçamento</span>
                  )}
                </ShinyButton>
                <p className="text-center text-xs text-zinc-400 font-display tracking-wide mt-3">
                  Ao enviar, você concorda com o envio imediato e seguro para análise comercial.
                </p>
              </div>

            </form>
          )}
        </div>
      </div>
    </section>
  );
}
