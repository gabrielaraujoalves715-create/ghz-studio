import { Service, Differential, Project } from "./types";

// Dynamic exact paths for our beautifully generated high-end mockups
export const ASSETS = {
  heroMockup: "/src/assets/images/ghz_hero_site_1779923345912.png",
  projectLaw: "/src/assets/images/project_law_firm_1779923361800.png",
  projectMedical: "/src/assets/images/project_medical_1779923375824.png",
  projectRealEstate: "/src/assets/images/project_real_estate_1779923393158.png"
};

export const INSTAGRAM_LINK = "https://instagram.com/ghz.studio";
export const EMAIL_ADDRESS = "contato@ghzstudio.com";
export const AGENCY_PHONE = "5511953412519";

export const getWhatsAppLink = (message: string) => {
  return `https://wa.me/${AGENCY_PHONE}?text=${encodeURIComponent(message)}`;
};

export const SERVICES: Service[] = [
  {
    id: "landing-pages",
    title: "Landing Pages de Alta Conversão",
    description: "Páginas únicas focadas 100% em vendas. Estruturadas e carregamento de alto nível e arquitetura focada em conversão.",
    benefits: [
      "Ideal para tráfego pago (Google Ads / Meta Ads)",
      "Redução drástica no custo de aquisição por cliente (CAC)",
      "Carregamento mobile otimizado e veloz",
      "Experiência limpa e objetiva sem distrações"
    ],
    iconName: "Layout"
  },
  {
    id: "sites-institucionais",
    title: "Sites Profissionais",
    description: "Criamos sites modernos e profissionais que fortalecem a presença digital da sua empresa e transmitem mais credibilidade. Cada página é desenvolvida para apresentar sua marca com clareza, sofisticação e autoridade.",
    benefits: [
      "Layouts exclusivos sob medida para sua identidade",
      "Painel administrativo intuitivo opcional",
      "SEO técnico estruturado de fábrica",
      "Seções para apresentação de diferenciais e equipe"
    ],
    iconName: "Globe"
  },
  {
    id: "seo-local",
    title: "SEO Local & Google Meu Negócio",
    description: "Destaque sua empresa nas pesquisas do Google e seja encontrado por clientes que já estão procurando pelo seu serviço. Posicionamos seu negócio á frente da concorrência no Google e nos resultados locais para aumentar sua visibilidade e gerar mais oportunidades de venda.",
    benefits: [
      "Otimização completa do Google Perfil de Empresa",
      "Pesquisas orgânicas geolocalizadas na sua cidade",
      "Criação de autoridade local em buscadores",
      "Aumento real e contínuo de ligações e rotas"
    ],
    iconName: "MapPin"
  },
  {
    id: "hospedagem",
    title: "Hospedagem & Performance",
    description: "Seu site hospedado com estabilidade, segurança e alta performance. Cuidamos da parte técnica para garantir carregamento rápido, proteção e funcionamento contínuo da sua estrutura digital.",
    benefits: [
      "Integração com Cloudflare Enterprise CDN",
      "Certificado de segurança SSL gratuito",
      "Backups diários automatizados e restauração",
      "Uptime garantido de 99.9% com suporte ágil"
    ],
    iconName: "Server"
  },
  {
    id: "integracao-whatsapp",
    title: "Integração Inteligente com WhatsApp",
    description: "Facilitamos o contato entre sua empresa e seus clientes com integrações rápidas e estratégicas no WhatsApp. Botões inteligentes, direcionamento de atendimento e captura de leads para transformar visitas em conversas reais.",
    benefits: [
      "Botão flutuante inteligente e humanizado",
      "Disparadores personalizados e dinâmicos",
      "Trackamento de cliques e eventos reais",
      "Redirecionamentos organizados para sua equipe"
    ],
    iconName: "MessageSquareText"
  },
  {
    id: "pixel-gtm",
    title: "Pixel & GTM",
    description: "Estruture suas campanhas com rastreamento preciso e dados confiáveis. Configuramos Google Tag Manager, Pixel da Meta e Google Analytics 4 para acompanhar conversões, medir resultados e otimizar seus anúncios com mais eficiência.",
    benefits: [
      "Monitoramento de cliques, formulários e compras",
      "Configuração do ecossistema de APIs de Conversão",
      "Organização completa de contêineres de GTM",
      "Base de dados limpa para Inteligência de Tráfego"
    ],
    iconName: "LineChart"
  }
];

export const DIFFERENTIALS: Differential[] = [
  {
    id: "design-profissional",
    title: "Design sob Medida",
    description: "Criamos interfaces exclusivas e sofisticadas desenhadas pixel a pixel especificamente para o seu produto ou serviço. Sem templates prontos, sem aparência genérica.",
    iconName: "Compass"
  },
  {
    id: "estrutura-anuncios",
    title: "Preparados para Tráfego Pago",
    description: "Estrutura técnica rigorosamente pensada para garantir pontuação máxima de velocidade e aderência nos leilões do Google Ads, barateando seus custos por clique no leilão.",
    iconName: "Flame"
  },
  {
    id: "mobile-first",
    title: "Otimização Móvel Extrema",
    description: "Mais de 85% dos cliques vêm de celulares. Projetamos interfaces fluidas, confortáveis e rápidas construídas de baixo para cima pensando na melhor experiência touchscreen.",
    iconName: "Smartphone"
  },
  {
    id: "carregamento-rapido",
    title: "Performance de Elite",
    description: "Otimização de imagens, minificação de scripts e entrega de arquivos via redes de borda globais que fazem a página abrir instantaneamente em menos de 1.5 segundos.",
    iconName: "Zap"
  },
  {
    id: "foco-conversao",
    title: "Design com foco Comercial",
    description: "Utilizamos o estado da arte em experiência de usuário (UX) e técnicas de psicologia de consumo para guiar suavemente o olhar do usuário direto ao seu ponto de conversão.",
    iconName: "Target"
  },
  {
    id: "suporte-estrategico",
    title: "Suporte Pós-Entrega Ativo",
    description: "Aqui seu projeto não vira poeira digital após a entrega. Oferecemos acompanhamento contínuo e orientação de negócios com especialistas para escalar sua jornada.",
    iconName: "HeartHandshake"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "nexa",
    title: "Nexa Advocacia Corporativa",
    category: "Landing Page Premium",
    description: "Landing page corporativa para escritório boutique de direito societário e tributário. Estética sóbria, elegante, com tipografia nobre e contraste de alto padrão que impulsionou o volume de consultas corporativas.",
    imageUrl: ASSETS.projectLaw,
    tags: ["Direito Comercial", "Design Minimalista", "Alta Conversão"],
    features: ["Otimização de Carregamento", "Formulário Inteligente integrado ao WhatsApp", "Identidade Premium"]
  },
  {
    id: "aura",
    title: "Aura Clínica & Bem-Estar",
    category: "Site Institucional de Luxo",
    description: "Site institucional interativo para clínica de dermatologia de luxo e estética médica avançada. Atmosfera limpa, fresca, tons de cinza suave e verde petróleo, com agendamentos centralizados e depoimentos imersivos.",
    imageUrl: ASSETS.projectMedical,
    tags: ["Estética Médica", "UX Otimizada", "Google Analytics 4"],
    features: ["Seletor de Tratamentos", "Carregamento Instantâneo", "Fidelização Conversacional"]
  },
  {
    id: "ventana",
    title: "Ventana Imobiliária Boutique",
    category: "Landing Page de Lançamento",
    description: "Landing page imobiliária imersiva focada no lançamento de apartamentos residenciais de alto padrão frente-mar. Layout amplo, focado em imagens imponentes e captura estratégica de investidores.",
    imageUrl: ASSETS.projectRealEstate,
    tags: ["Imóveis de Luxo", "Foco em Lead Qualificado", "GTM Estruturado"],
    features: ["Brochura PDF Integrada", "Rastreamento Completo de Leads", "Performance Nota 100 Mobile"]
  }
];

export const FAQ_ITEMS = [
  {
    question: "Em quanto tempo meu site fica pronto?",
    answer: "O prazo pode variar conforme o projeto, mas landing pages normalmente são finalizadas entre 3 a 5 dias úteis, incluindo criação do design, estrutura da página e configuração técnica."
  },
  {
    question: "O serviço de hospedagem já vem incluso?",
    answer: "Sim. Podemos orientar todo o processo de contratação do domínio e hospedagem, além de oferecer uma solução própria para clientes que preferem deixar toda a parte técnica sob nossa gestão"
  },
  {
    question: "Como funciona a integração com o WhatsApp?",
    answer: "Seu site é conectado ao WhatsApp para que os visitantes entrem em contato com mais facilidade. Também podemos configurar rastreamento de cliques e mensagens automáticas para melhorar o atendimento e acompanhar os resultados."
  },
  {
    question: "O que preciso fornecer para darmos início ao projeto?",
    answer: "Antes de começar o projeto, precisamos alinhar algumas informações sobre sua empresa, serviços e identidade visual. Com isso, conseguimos desenvolver um site mais profissional e alinhado ao seu negócio."
  }
];
