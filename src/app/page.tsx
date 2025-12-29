import Link from "next/link";
import { FeatureCard } from "@/components/landing/FeatureCard";

// Ícones SVG inline para evitar dependências externas desnecessárias nesta etapa
const Icons = {
  Bug: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0a2 2 0 002 2v0a2 2 0 00-2 2H6a2 2 0 00-2-2v0a2 2 0 002-2m2-11l-3-1m3 1h6m-6 0a2 2 0 002 2v0a2 2 0 00-2 2m-2-4h.01M17 16l3-1m-17 0l-3-1m3 1h1m16 0h1m-16 0h.01M6 16v0" />
    </svg>
  ),
  Layers: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  Brain: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  ArrowRight: (
    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  )
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 relative overflow-hidden flex flex-col">
      
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        {/* Glow Superior Esquerdo (Cyan) */}
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[120px] opacity-60" />
        {/* Glow Inferior Direito (Blue) */}
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] opacity-50" />
      </div>

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-10 flex-grow flex flex-col justify-center items-center px-6 py-20">
        
        {/* 1. HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto mb-20 space-y-8 animate-fade-in-up">
          
          {/* Badge / Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-cyan-400 mb-4 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
            v1.0 Public Beta
          </div>

          {/* Título Principal */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
            Code<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Focus</span>
          </h1>

          {/* Subtítulo */}
          <h2 className="text-xl md:text-2xl text-slate-300 font-medium">
            Organize erros. Documente soluções. <br className="hidden md:block" />
            Evolua como programador.
          </h2>

          {/* Descrição */}
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
            Pare de perder tempo procurando a mesma solução no StackOverflow repetidamente. 
            O CodeFocus é o seu painel pessoal de inteligência técnica para registrar, 
            categorizar e resolver problemas de código.
          </p>

          {/* CTA Principal */}
          <div className="pt-4 flex justify-center">
            <Link 
              href="/dashboard"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-105 active:scale-95"
            >
              Começar Agora
              {Icons.ArrowRight}
            </Link>
          </div>
        </section>

        {/* 2. BENEFITS SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
          <FeatureCard 
            icon={Icons.Bug}
            title="Registro de Erros"
            description="Documente bugs, stack traces e comportamentos inesperados de forma estruturada e rápida."
          />
          <FeatureCard 
            icon={Icons.Layers}
            title="Organização por Stack"
            description="Categorize suas anotações por linguagem (TS, Python, Java) e mantenha seu conhecimento limpo."
          />
          <FeatureCard 
            icon={Icons.Brain}
            title="Base de Conhecimento"
            description="Transforme erros passados em aprendizado. Construa sua própria biblioteca de soluções."
          />
        </section>

      </div>

      {/* 3. FOOTER DISCRETO */}
      <footer className="relative z-10 py-6 text-center border-t border-slate-900/50 bg-[#020617]/50 backdrop-blur-sm">
        <p className="text-xs text-slate-600 uppercase tracking-widest font-semibold">
          By Finneo Corporation
        </p>
      </footer>

    </main>
  );
}