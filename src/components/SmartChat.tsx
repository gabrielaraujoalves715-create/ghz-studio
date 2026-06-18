import React, { useState } from "react";
import { X, MessageSquare } from "lucide-react";
import { getWhatsAppLink } from "../data";

interface ChatMessage {
  id: string;
  type: "bot" | "user";
  text: string;
}

type AnswerKey = "canal" | "site" | "objetivo" | "segmento";

const steps: {
  key: AnswerKey;
  question: string;
  options: string[];
}[] = [
  {
    key: "canal",
    question:
      "Oi, tudo bem? Antes de te indicar qualquer solução, quero entender rapidamente o cenário da sua empresa.\n\nHoje a maioria dos seus clientes encontra sua empresa por onde?",
    options: ["Instagram e WhatsApp", "Google", "Indicação"],
  },
  {
    key: "site",
    question:
      "Entendi. E quando alguém encontra sua empresa, consegue visualizar facilmente seus serviços, informações e uma forma rápida de entrar em contato?",
    options: ["Sim", "Mais ou menos", "Não"],
  },
  {
    key: "objetivo",
    question:
      "Perfeito. Pensando no momento atual da sua empresa, qual seria a principal prioridade?",
    options: [
     "Atrair mais clientes",
      "Passar mais credibilidade",
      "Receber mais contatos",
      "Facilitar agendamentos",
      "Melhorar a experiência do cliente",
      "Mostrar melhor meus serviços",
      "Criar página para anúncios",
    ],
  },
  {
    key: "segmento",
    question:
      "Para eu direcionar melhor a análise, qual é o segmento da sua empresa?",
    options: ["Clínica", "Barbearia", "Restaurante", "Loja", "Outro"],
  },
];

export default function SmartChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<AnswerKey, string>>({
    canal: "",
    site: "",
    objetivo: "",
    segmento: "",
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-message",
      type: "bot",
      text: steps[0].question,
    },
  ]);

  const isFinished = step >= steps.length;

  const handleOptionClick = (option: string) => {
    const currentStep = steps[step];

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: "user",
      text: option,
    };

    const updatedAnswers = {
      ...answers,
      [currentStep.key]: option,
    };

    setAnswers(updatedAnswers);

    const nextStep = step + 1;

    if (nextStep < steps.length) {
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        type: "bot",
        text: steps[nextStep].question,
      };

      setMessages((prev) => [...prev, userMessage, botMessage]);
      setStep(nextStep);
      return;
    }

    const finalMessage: ChatMessage = {
      id: `bot-final-${Date.now()}`,
      type: "bot",
      text:
         "Pelo que você me contou, identifiquei algumas oportunidades para melhorar a forma como sua empresa é encontrada e percebida online.\n\n" +
    "Em uma análise rápida, conseguimos te mostrar pontos de melhoria específicos para o seu negócio.\n\n" +
    "A análise é feita pela GHZ Studio e não gera nenhum compromisso de contratação.\n\n" +
    "Clique abaixo para continuar.",
};
    setMessages((prev) => [...prev, userMessage, finalMessage]);
    setStep(nextStep);
  };

  const handleWhatsAppClick = () => {
  const message =
    `Olá, vim pelo site da GHZ Studio.\n\n` +
    `Resumo da minha empresa:\n\n` +
    `• Principal canal: ${answers.canal}\n` +
    `• Clareza das informações online: ${answers.site}\n` +
    `• Principal objetivo: ${answers.objetivo}\n` +
    `• Segmento: ${answers.segmento}\n\n` +
    `Gostaria de receber uma análise da minha presença digital.`;

  window.open(getWhatsAppLink(message), "_blank");
  setIsOpen(false);
};

  const resetChat = () => {
    setStep(0);
    setAnswers({
      canal: "",
      site: "",
      objetivo: "",
      segmento: "",
    });
    setMessages([
      {
        id: "initial-message",
        type: "bot",
        text: steps[0].question,
      },
    ]);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-brand-teal hover:bg-brand-teal-dark text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          title="Abrir atendimento"
        >
          <MessageSquare size={28} />
        </button>
      )}

      {isOpen && (
        <div
          className="fixed bottom-6 right-6 z-50 w-full max-w-md h-96 md:h-[32rem] bg-white rounded-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300"
          style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)" }}
        >
          <div className="bg-white border-b border-gray-200 p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center">
                <MessageSquare size={20} className="text-brand-teal" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-charcoal">
                  GHZ Studio
                </h3>
                <p className="text-xs text-gray-500">Atendimento consultivo</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-charcoal hover:bg-gray-100 p-2 rounded-lg transition-colors"
              title="Fechar chat"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.type === "bot" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.type === "bot"
                      ? "bg-white text-charcoal border border-gray-200 rounded-bl-none"
                      : "bg-brand-teal text-white rounded-br-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {!isFinished && (
              <div className="grid grid-cols-1 gap-2">
                {steps[step].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionClick(option)}
                    className="w-full text-left px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-charcoal hover:border-brand-teal hover:text-brand-teal transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {isFinished && (
              <div className="mt-4 space-y-3 border-t border-gray-200 pt-4">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full py-3 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-lg font-semibold text-sm transition-colors"
                >
                  Continuar pelo WhatsApp
                </button>

                <button
                  onClick={resetChat}
                  className="w-full py-2 text-sm text-gray-500 hover:text-brand-teal transition-colors"
                >
                  Refazer respostas
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Você será direcionado para continuar com a GHZ Studio pelo
                  WhatsApp.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}