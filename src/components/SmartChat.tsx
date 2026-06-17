import React, { useState } from "react";
import { X, Send, MessageSquare } from "lucide-react";
import { getWhatsAppLink, AGENCY_PHONE } from "../data";

interface ChatMessage {
  id: string;
  type: "bot" | "user";
  text: string;
}

interface ConversationData {
  hasWebsite?: string;
  businessType?: string;
  currentChallenges?: string;
  goals?: string;
}

export default function SmartChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationStep, setConversationStep] = useState(0);
  const [conversationData, setConversationData] = useState<ConversationData>({});
  const [userInput, setUserInput] = useState("");
  const [isWaitingForInput, setIsWaitingForInput] = useState(false);

  const questions = [
    {
      id: "initial",
      text: "Oi, tudo bem? Antes de te direcionar para o WhatsApp, quero entender rapidamente o cenário da sua empresa. Hoje sua empresa já tem site ou usa mais Instagram, Google e WhatsApp para receber clientes?",
      dataKey: "hasWebsite",
      options: ["Já tenho site", "Uso Instagram, Google e WhatsApp", "Não tenho presença digital"],
    },
    {
      id: "business",
      text: "Legal! E qual é o seu tipo de negócio ou serviço?",
      dataKey: "businessType",
      options: null, // Free input
    },
    {
      id: "challenges",
      text: "Qual é o seu maior desafio no momento para capturar mais clientes?",
      dataKey: "currentChallenges",
      options: null, // Free input
    },
    {
      id: "goals",
      text: "E qual é o principal resultado que você espera alcançar nos próximos 3 meses?",
      dataKey: "goals",
      options: null, // Free input
    },
  ];

  const openChat = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      // Initialize with first message
      const initialMessage: ChatMessage = {
        id: "msg-0",
        type: "bot",
        text: questions[0].text,
      };
      setMessages([initialMessage]);
      setConversationStep(0);
      setIsWaitingForInput(true);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const handleOptionClick = (option: string) => {
    addUserMessage(option);
  };

  const handleSendMessage = () => {
    if (userInput.trim()) {
      addUserMessage(userInput);
      setUserInput("");
    }
  };

  const addUserMessage = (text: string) => {
    const newUserMessage: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      type: "user",
      text,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsWaitingForInput(false);

    // Save to conversation data
    const currentQuestion = questions[conversationStep];
    if (currentQuestion.dataKey) {
      setConversationData((prev) => ({
        ...prev,
        [currentQuestion.dataKey]: text,
      }));
    }

    // Check if we have more questions
    if (conversationStep < questions.length - 1) {
      // Next question
      setTimeout(() => {
        const nextQuestion = questions[conversationStep + 1];
        const botMessage: ChatMessage = {
          id: `msg-bot-${Date.now()}`,
          type: "bot",
          text: nextQuestion.text,
        };
        setMessages((prev) => [...prev, botMessage]);
        setConversationStep((prev) => prev + 1);
        setIsWaitingForInput(true);
      }, 500);
    } else {
      // Show WhatsApp button
      setTimeout(() => {
        const finalMessage: ChatMessage = {
          id: `msg-bot-${Date.now()}`,
          type: "bot",
          text: "Perfeito! Agora vou te direcionar para o WhatsApp para continuar esse atendimento com mais detalhes. Um dos nossos consultores vai responder em breve! 📱",
        };
        setMessages((prev) => [...prev, finalMessage]);
        setIsWaitingForInput(false);
      }, 500);
    }
  };

  const generateWhatsAppMessage = () => {
    const lines = [
      "Olá! Gostaria de conhecer mais sobre os serviços da GHZ Studio.",
      "",
      "Algumas informações sobre minha empresa:",
      `📱 Presença digital atual: ${conversationData.hasWebsite || "Não informado"}`,
      `🏢 Tipo de negócio: ${conversationData.businessType || "Não informado"}`,
      `📊 Desafios: ${conversationData.currentChallenges || "Não informado"}`,
      `🎯 Objetivos: ${conversationData.goals || "Não informado"}`,
    ];
    return lines.join("\n");
  };

  const handleWhatsAppClick = () => {
    const message = generateWhatsAppMessage();
    const whatsappLink = getWhatsAppLink(message);
    window.open(whatsappLink, "_blank");
    closeChat();
  };

  const isConversationComplete = conversationStep === questions.length - 1 && !isWaitingForInput;
  const currentQuestion = conversationStep < questions.length ? questions[conversationStep] : null;
  const hasOptions = currentQuestion?.options && currentQuestion.options.length > 0;

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={openChat}
          className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-brand-teal hover:bg-brand-teal-dark text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          title="Abrir atendimento"
        >
          <MessageSquare size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-md h-96 md:h-[32rem] bg-white rounded-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300" style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)' }}>
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center">
                <MessageSquare size={20} className="text-brand-teal" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-charcoal">GHZ Studio</h3>
                <p className="text-xs text-gray-500">Atendimento Inteligente</p>
              </div>
            </div>
            <button
              onClick={closeChat}
              className="text-charcoal hover:bg-gray-100 p-2 rounded-lg transition-colors"
              title="Fechar chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === "bot" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.type === "bot"
                      ? "bg-white text-charcoal border border-gray-200 rounded-bl-none"
                      : "bg-brand-teal text-white rounded-br-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Options or Input Area */}
            {isWaitingForInput && hasOptions && (
              <div className="space-y-2 mt-4">
                {currentQuestion!.options!.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(option)}
                    className="w-full p-3 text-left text-sm rounded-lg border border-gray-300 hover:border-brand-teal hover:bg-brand-teal/5 transition-colors text-charcoal font-medium"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {/* Final WhatsApp Button */}
            {isConversationComplete && (
              <div className="mt-4 space-y-3">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full py-3 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-lg font-semibold text-sm transition-colors"
                >
                  Continuar pelo WhatsApp
                </button>
                <p className="text-xs text-gray-500 text-center">
                  Você será redirecionado para o WhatsApp com suas informações.
                </p>
              </div>
            )}
          </div>

          {/* Input Area */}
          {isWaitingForInput && !hasOptions && (
            <div className="border-t border-gray-200 p-4 bg-white flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Digite sua resposta..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal text-sm"
                autoFocus
              />
              <button
                onClick={handleSendMessage}
                disabled={!userInput.trim()}
                className="p-2 bg-brand-teal hover:bg-brand-teal-dark disabled:opacity-50 text-white rounded-lg transition-colors"
                title="Enviar"
              >
                <Send size={18} />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
