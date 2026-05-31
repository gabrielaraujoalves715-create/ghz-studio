import React from "react";

interface ClientCard {
  id: string;
  type: "image" | "brand";
  title: string;
  subtitle?: string;
  bgClass: string;
  imageUrl?: string;
  renderLogo?: () => React.ReactNode;
}

export default function Clients() {

  const clients: ClientCard[] = [
    {
      id: "exp-realty",
      type: "brand",
      title: "eXp Realty",
      bgClass: "bg-gradient-to-br from-[#0c1a30] to-[#050c18] border border-white/10",
      renderLogo: () => (
        <div className="flex flex-col items-center justify-center h-full text-white select-none">
          <div className="text-center">
            <span className="font-display font-[950] text-5xl sm:text-6xl tracking-tight block mb-1 text-white">
              eXp
            </span>
            <div className="w-16 h-[2.5px] bg-[#0d9488] mx-auto mb-2"></div>
            <span className="text-xs sm:text-sm font-mono tracking-[0.3em] text-zinc-200 uppercase block pl-[0.3em] font-bold">
              Realty
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "obba-doces",
      type: "brand",
      title: "Obba Doces",
      bgClass: "bg-[#fff5f6] border border-pink-100 shadow-sm",
      renderLogo: () => (
        <div className="flex flex-col items-center justify-center h-full text-center p-4 select-none relative overflow-hidden">
          {/* Heart decorative background icons */}
          <div className="absolute top-2 right-3 text-pink-200/60 text-xs">♥</div>
          <div className="absolute bottom-3 left-4 text-pink-200/60 text-[9px]">♥</div>
          
          <div className="w-[170px] h-[170px] xs:w-[190px] xs:h-[190px] sm:w-[215px] sm:h-[215px] rounded-full border border-dashed border-pink-200/50 p-2 flex flex-col items-center justify-center bg-white/60 relative">
            {/* Cute Cupcake with Rolling Pin and Floral Wreath Accents */}
            <div className="relative mb-2 flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16">
              <svg
                className="w-full h-full text-pink-400"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Cute rolling pin */}
                <rect x="18" y="52" width="64" height="6" rx="3" fill="#e8bc9d" />
                <rect x="10" y="53.5" width="8" height="3" rx="1.5" fill="#d09f7a" />
                <rect x="82" y="53.5" width="8" height="3" rx="1.5" fill="#d09f7a" />
                
                {/* Cupcake liner */}
                <path
                  d="M34 56 L40 82 C41 85, 59 85, 60 82 L66 56 Z"
                  fill="#fbcfe8"
                  stroke="#db2777"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <line x1="42" y1="58" x2="46" y2="79" stroke="#db2777" strokeWidth="2" strokeLinecap="round" />
                <line x1="50" y1="58" x2="50" y2="80" stroke="#db2777" strokeWidth="2" strokeLinecap="round" />
                <line x1="58" y1="58" x2="54" y2="79" stroke="#db2777" strokeWidth="2" strokeLinecap="round" />

                {/* Frosting / Cupcake top cream in soft turquoise */}
                <path
                  d="M30 56 C30 38, 70 38, 70 56 Z"
                  fill="#99f6e4"
                />
                {/* Second layer frosting */}
                <path
                  d="M35 48 C35 34, 65 34, 65 48 Z"
                  fill="#ccfbf1"
                />
                
                {/* Heart cherry topper */}
                <path
                  d="M50 32 C50 32, 45 26, 50 22 C55 26, 50 32, 50 32 Z"
                  fill="#f43f5e"
                />
                <circle cx="48" cy="24" r="3" fill="#f43f5e" />
                <circle cx="52" cy="24" r="3" fill="#f43f5e" />

                {/* Sprinkles */}
                <circle cx="40" cy="50" r="1.5" fill="#db2777" />
                <circle cx="48" cy="44" r="1.5" fill="#eab308" />
                <circle cx="58" cy="48" r="1.5" fill="#3b82f6" />
                <circle cx="50" cy="52" r="1.5" fill="#10b981" />
              </svg>
            </div>
            
            {/* Title written in serif-styled font */}
            <h4 className="font-serif font-extrabold text-xl md:text-2xl text-[#db2777] leading-none mb-0.5 tracking-wide">
              Obba
            </h4>
            <h4 className="font-serif font-extrabold text-xl md:text-2xl text-[#db2777] leading-none mb-1.5 tracking-wide">
              Doces
            </h4>
            
            {/* Subtitle */}
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]"></span>
              <p className="text-[8.5px] font-sans font-extrabold tracking-[0.1em] text-[#0d9488] uppercase">
                Confeitaria Artesanal
              </p>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]"></span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "dubriques",
      type: "image",
      title: "Dubriques",
      subtitle: "infoprodutor",
      bgClass: "bg-zinc-900",
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "peakhabit",
      type: "brand",
      title: "PeakHabit",
      bgClass: "bg-white border border-zinc-100 shadow-sm",
      renderLogo: () => (
        <div className="flex flex-col items-center justify-center h-full select-none p-4">
          {/* Cyan/Blue Stylized Minimalistic Penguin Logo */}
          <div className="mb-4 relative w-16 h-18 sm:w-18 sm:h-20 flex items-center justify-center">
            <svg
              className="w-full h-full text-[#0ea5e9]"
              viewBox="0 0 24 28"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer body */}
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 16.24 4.64 19.86 8.35 21.32C8.12 20.35 8 19.34 8 18.3C8 13.8 11.2 9.5 15.5 8.3C16.8 7.9 18.2 7.8 19.5 8.1C20.8 9.5 21.6 11.3 21.9 13.3C22 12.9 22 12.5 22 12C22 6.48 17.52 2 12 2Z"
                fill="url(#penguin-grad)"
              />
              {/* White belly of penguin */}
              <path
                d="M12.5 10C9.46 10 7 12.46 7 15.5C7 18.54 9.46 21 12.5 21C15.54 21 18 18.54 18 15.5C18 12.46 15.54 10 12.5 10Z"
                fill="#ffffff"
                opacity="0.95"
              />
              {/* Sleek penguin wing */}
              <path
                d="M12.5 12C11.12 12 10 13.12 10 14.5C10 15.88 11.12 17 12.5 17C13.88 17 15 15.88 15 14.5C15 13.12 13.88 12 12.5 12Z"
                fill="#0ea5e9"
              />
              {/* Little beak */}
              <path d="M5.5 10.5L7.5 11.5L6 13.5L5.5 10.5Z" fill="#ff9900" />
              <defs>
                <linearGradient id="penguin-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="font-display font-[950] text-base sm:text-lg tracking-[0.25em] text-[#0f172a] uppercase pl-[0.25em]">
            PeakHabit
          </span>
        </div>
      ),
    },
    {
      id: "angela-borba",
      type: "image",
      title: "Angela Borba",
      subtitle: "Corretora imobiliária",
      bgClass: "bg-zinc-800",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "pje-calc",
      type: "brand",
      title: "PJE-CALC",
      bgClass: "bg-black border border-white/5 shadow-md",
      renderLogo: () => (
        <div className="flex flex-col items-center justify-center h-full text-white px-4 text-center select-none">
          <span className="font-sans font-[950] text-4xl sm:text-5xl tracking-tight text-white uppercase block">
            Pje-calc
          </span>
          <div className="w-28 h-[2px] bg-[#0d9488] my-3"></div>
          <span className="text-xs font-mono tracking-[0.15em] text-zinc-300 uppercase block font-bold">
            cálculos trabalhistas
          </span>
        </div>
      ),
    },
    {
      id: "biscoitos-heloise",
      type: "brand",
      title: "Biscoitos Heloise",
      bgClass: "bg-white border border-zinc-100 shadow-sm",
      renderLogo: () => (
        <div className="flex flex-col items-center justify-center h-full text-center p-4 select-none">
          {/* Logo element with an elegant gold & emerald circular badge */}
          <div className="w-36 h-36 sm:w-42 sm:h-42 rounded-full border-2 border-amber-600/40 p-1 flex items-center justify-center relative">
            {/* Dashed outer detail */}
            <div className="absolute inset-0.5 rounded-full border border-dashed border-amber-600/25"></div>
            {/* Solid interior */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0c3127] to-[#031c15] p-3 flex flex-col items-center justify-center text-white relative shadow-inner">
              <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-[#d97706] uppercase font-bold">
                BISCOITOS
              </span>
              <span className="font-display italic text-amber-50 text-lg sm:text-xl font-bold leading-tight my-1 tracking-tight px-2 block border-b border-white/10 pb-1">
                Heloise
              </span>
              <span className="text-[7px] sm:text-[8px] font-sans font-bold tracking-widest text-[#d97706]/90 uppercase mt-0.5">
                DESDE 2017
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "mateus-ferraz",
      type: "image",
      title: "Mateus Ferraz",
      subtitle: "Corretor imobiliário",
      bgClass: "bg-zinc-800",
      imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const doubledClients = [...clients, ...clients, ...clients]; // Triple the array for extra padding on ultra-wide screens, making it completely bulletproof and seamless

  return (
    <section id="clientes" className="py-16 md:py-20 bg-white relative overflow-hidden border-b border-zinc-100 select-none pointer-events-none scroll-mt-20">
      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.3333%, 0, 0); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
          will-change: transform;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-display font-extrabold text-zinc-900 tracking-tight">
          Projetos desenvolvidos 
        </h2>
        <div className="w-16 h-[2.5px] mt-3 mx-auto bg-[#0d9488]" />
      </div>

      <div className="relative w-full overflow-hidden py-4 flex">
        <div className="flex gap-5 md:gap-6 shrink-0 animate-marquee">
          {doubledClients.map((client, index) => (
            <div
              key={`marquee-${client.id}-${index}`}
              className={`flex-none w-[190px] h-[190px] xs:w-[220px] xs:h-[220px] sm:w-[240px] sm:h-[240px] rounded-[24px] sm:rounded-[32px] overflow-hidden relative group shadow-md transition-all duration-300 ${client.bgClass}`}
            >
              {client.type === "image" ? (
                <>
                  <img
                    src={client.imageUrl}
                    alt={client.title}
                    className="w-full h-full object-cover transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end items-center p-5 select-none text-center">
                    <h3 className="text-white font-sans font-bold text-base md:text-lg tracking-tight leading-tight">
                      {client.title}
                    </h3>
                    <p className="text-white/80 font-sans font-medium text-xs tracking-normal mt-0.5">
                      {client.subtitle}
                    </p>
                  </div>
                </>
              ) : (
                client.renderLogo && client.renderLogo()
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
