import express, { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({ path: ".env.local" });

const app = express();
const PORT = process.env.API_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini (if API key is available and valid)
let genAI: GoogleGenerativeAI | null = null;

if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "your_gemini_api_key_here") {
  try {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log("✅ Gemini API initialized successfully");
  } catch (error) {
    console.warn("⚠️  Failed to initialize Gemini API.");
  }
} else {
  console.warn(
    "⚠️  GEMINI_API_KEY not configured or is invalid. Configure GEMINI_API_KEY in .env.local."
  );
  console.warn("📝 Add a valid GEMINI_API_KEY to .env.local to enable AI responses");
}

// Store conversation history per session
interface ConversationMetadata {
  businessType?: string;
  siteStatus?: "has_site" | "no_site";
  mainChannel?: string;
  mainObjective?: string;
  channels?: string[];
  wantsContact?: boolean;
}

interface ConversationSession {
  history: Array<{ role: string; parts: Array<{ text: string }> }>;
  metadata: ConversationMetadata;
  messageCount: number;
}

const sessions: Map<string, ConversationSession> = new Map();

// System prompt for the AI agent
const SYSTEM_PROMPT = `Você é um assistente consultivo da GHZ Studio.
Seu papel é entender o cenário do cliente antes de direcionar para o WhatsApp.
A GHZ Studio ajuda empresas a organizarem sua presença digital com sites, landing pages, integração com WhatsApp, posicionamento digital e melhoria da primeira impressão online.

Regras MUITO IMPORTANTES:
- Responda de forma humana, simples e consultiva.
- Faça uma pergunta por vez.
- Não use frases genéricas de marketing como "Perfeito! Vamos conversar mais sobre suas necessidades".
- Não conduza para WhatsApp no primeiro contato.
- Não ofereça todos os serviços de uma vez.
- Não prometa vendas garantidas.
- Não invente preço.
- Não invente prazo.
- NUNCA encerre com oferecimento genérico de WhatsApp.
- Se o usuário apenas cumprimentar ("oi", "olá", "bom dia", "boa tarde", etc), cumprimente de volta e faça uma pergunta consultiva clara.
- Se o usuário disser algo específico, responda diretamente ao que ele mencionou.
- Só sugira WhatsApp quando: cliente pediu orçamento/análise/contato, ou você coletou info sobre tipo de negócio + presença digital + canal principal + objetivo.
- Não sugira WhatsApp apenas porque o cliente respondeu uma pergunta normal.

Exemplos:

1. Para "oiii":
"Oi, tudo bem? Antes de te direcionar para qualquer solução, quero entender melhor o seu negócio.

Hoje sua empresa já tem site ou usa mais Instagram, Google e WhatsApp para receber clientes?"

2. Para "tenho uma clínica":
"Entendi. Clínicas têm dinâmicas especiais de presença digital.

Você já tem site ou usa mais Instagram, Google e indicação para trazer pacientes?"

3. Para "quero orçamento":
"Claro. Para te passar algo coerente, preciso entender rapidamente o que sua empresa precisa.

Você quer criar um site do zero, melhorar um site atual ou fazer uma landing page para anúncios?"`;

// Chat endpoint
app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { message, sessionId } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!sessionId || typeof sessionId !== "string") {
      return res.status(400).json({ error: "Session ID is required" });
    }

    // Get or create session
    let session = sessions.get(sessionId);
    if (!session) {
      session = {
        history: [],
        metadata: {},
        messageCount: 0,
      };
      sessions.set(sessionId, session);
    }

    session.messageCount++;

    // Detect simple greeting and respond immediately without calling Gemini
    const normalizedMessage = message
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

    const greetingOnlyRegex = /^(oi+|ola|olá|bom dia|boa tarde|boa noite|opa|e ai|e aí|tudo bem)[!.?\s]*$/i;

    if (greetingOnlyRegex.test(normalizedMessage)) {
      // Store greeting in history
      session.history.push({
        role: "user",
        parts: [{ text: message }],
      });

      const greetingResponse =
        "Oi, tudo bem? Para eu te ajudar melhor, me conta uma coisa: sua empresa já tem site ou hoje você usa mais Instagram, Google e WhatsApp para receber clientes?";

      session.history.push({
        role: "model",
        parts: [{ text: greetingResponse }],
      });

      return res.json({
        reply: greetingResponse,
        shouldRedirectToWhatsApp: false,
        metadata: session.metadata,
        sessionId,
      });
    }

    let botMessage = "";

    if (!genAI) {
      console.error("Gemini API is not configured or failed to initialize.");
      return res.status(500).json({
        error:
          "Gemini API não está configurada. Defina GEMINI_API_KEY no arquivo .env.local e reinicie o servidor.",
      });
    }

    // Build the prior conversation history for Gemini.
    const formattedHistory = session.history.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: msg.parts,
    }));

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      generationConfig: {
        temperature: 0.35,
        topP: 0.9,
        maxOutputTokens: 512,
      },
    });

    const chat = model.startChat({
      history: formattedHistory,
    });

    const response = await chat.sendMessage(message);
    const responseCandidate = response?.response?.candidates?.[0];

    if (responseCandidate && responseCandidate.content?.parts) {
      botMessage = responseCandidate.content.parts
        .map((part: any) => part.text || "")
        .join("");
    } else if (typeof response?.response?.text === "function") {
      botMessage = response.response.text();
    } else {
      botMessage =
        "Desculpe, não foi possível gerar uma resposta no momento. Por favor, tente novamente.";
    }

    // Add user and bot responses to history
    session.history.push({
      role: "user",
      parts: [{ text: message }],
    });

    session.history.push({
      role: "model",
      parts: [{ text: botMessage }],
    });

    const lowerMessage = message.toLowerCase().trim();
    const isSimpleGreeting = [
      "oi",
      "oi!",
      "oi!!",
      "oi!!!",
      "oi tudo bem",
      "olá",
      "ola",
      "olá tudo bem",
      "ola tudo bem",
      "bom dia",
      "boa tarde",
      "boa noite",
      "e aí",
      "e ai",
      "opa",
      "opa tudo bem",
      "tudo bem?",
      "tudo bem",
      "opa, tudo bem?",
      "opa tudo bem?",
    ].includes(lowerMessage);

    const explicitWhatsAppIntent = [
      "contato humano",
      "falar com",
      "orçamento",
      "orcamento",
      "quero orçamento",
      "quero orcamento",
      "quero falar",
      "quero continuar",
      "análise",
      "analise",
      "continuar",
      "pegar contato",
      "falar no whatsapp",
      "falar pelo whatsapp",
      "falar por whatsapp",
      "atendimento humano",
    ].some((keyword) => lowerMessage.includes(keyword));

    if (!session.metadata.businessType && lowerMessage.length > 10) {
      const businessKeywords = [
        "consultoria",
        "marketing",
        "advocacia",
        "clínica",
        "clínica",
        "restaurante",
        "loja",
        "ecommerce",
        "imobiliária",
        "imobiliaria",
        "serviço",
        "servico",
      ];
      if (businessKeywords.some((keyword) => lowerMessage.includes(keyword))) {
        session.metadata.businessType = message;
      }
    }

    if (!session.metadata.siteStatus) {
      if (lowerMessage.includes("sem site") || lowerMessage.includes("não tem site") || lowerMessage.includes("nao tem site") || lowerMessage.includes("não possuo site") || lowerMessage.includes("nao possuo site")) {
        session.metadata.siteStatus = "no_site";
      } else if (lowerMessage.includes("site") || lowerMessage.includes("website") || lowerMessage.includes("site atual") || lowerMessage.includes("site novo")) {
        session.metadata.siteStatus = "has_site";
      }
    }

    if (!session.metadata.mainChannel) {
      if (lowerMessage.includes("instagram")) {
        session.metadata.mainChannel = "Instagram";
      } else if (lowerMessage.includes("google")) {
        session.metadata.mainChannel = "Google";
      } else if (lowerMessage.includes("whatsapp")) {
        session.metadata.mainChannel = "WhatsApp";
      } else if (lowerMessage.includes("indicação") || lowerMessage.includes("indicacao")) {
        session.metadata.mainChannel = "Indicação";
      }
    }

    if (!session.metadata.mainObjective) {
      if (lowerMessage.includes("credibilidade")) {
        session.metadata.mainObjective = "Mais credibilidade";
      } else if (lowerMessage.includes("mais contatos") || lowerMessage.includes("contatos")) {
        session.metadata.mainObjective = "Mais contatos";
      } else if (lowerMessage.includes("melhorar site") || lowerMessage.includes("site lento") || lowerMessage.includes("site ruim")) {
        session.metadata.mainObjective = "Melhorar site atual";
      } else if (lowerMessage.includes("landing page") || lowerMessage.includes("landingpage") || lowerMessage.includes("anúncios") || lowerMessage.includes("anuncios")) {
        session.metadata.mainObjective = "Landing page para anúncios";
      } else if (lowerMessage.includes("organizar") || lowerMessage.includes("presença digital") || lowerMessage.includes("presenca digital")) {
        session.metadata.mainObjective = "Organizar presença digital";
      }
    }

    const metaChannels: string[] = session.metadata.channels || [];
    ["instagram", "google", "whatsapp", "indicação", "indicacao"].forEach((keyword) => {
      if (lowerMessage.includes(keyword) && !metaChannels.includes(keyword)) {
        metaChannels.push(keyword);
      }
    });
    if (metaChannels.length > 0) {
      session.metadata.channels = metaChannels;
    }

    const minimalInfoCollected =
      !!session.metadata.businessType &&
      !!session.metadata.siteStatus &&
      !!session.metadata.mainChannel &&
      !!session.metadata.mainObjective;

    // Never redirect to WhatsApp on simple greetings or without explicit intent or minimal info
    const shouldRedirectToWhatsApp = Boolean(
      !isSimpleGreeting && (explicitWhatsAppIntent || minimalInfoCollected)
    );

    res.json({
      reply: botMessage,
      shouldRedirectToWhatsApp,
      metadata: session.metadata,
      sessionId,
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    res.status(500).json({
      error: "Failed to process message",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Health check
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    geminiConfigured: !!genAI,
    mode: genAI ? "production" : "not-configured",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📝 Chat API available at http://localhost:${PORT}/api/chat`);
  console.log(`💚 Health check: http://localhost:${PORT}/api/health\n`);
});

