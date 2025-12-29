import Link from "next/link";
import { FeatureCard } from "@/components/landing/FeatureCard";

// Ícones Abstratos e Geométricos
const Icons = {
  // Logo Conceitual
  LogoMark: (
    <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth={1.5} className="text-cyan-500/50" />
      <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" className="text-cyan-400" stroke="none" />
    </svg>
  ),
  Grid: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  Layers: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  Node: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /> 
      <circle cx="18" cy="5" r="3" strokeWidth={1.5} />
      <circle cx="6" cy="12" r="3" strokeWidth={1.5} />
      <circle cx="18" cy="19" r="3" strokeWidth={1.5} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.59 13.51l6.83 3.98m-.01-10.98l-6.82 3.98" />
    </svg>
  ),
  ArrowRight: (
    <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  )
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 relative overflow-hidden flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-100">
      
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[120px] animate-pulse duration-[10000ms]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-blue-900/05 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
      </div>

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-10 flex-grow flex flex-col justify-center items-center px-6 py-20">
        
        {/* 1. HERO SECTION */}
        <section className="text-center max-w-3xl mx-auto mb-24 space-y-8 animate-fade-in-up">
          
          {/* Logo Abstrata & Título */}
          <div className="flex flex-col items-center gap-6">
            <div className="w-12 h-12 relative flex items-center justify-center">
               <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full"></div>
               {Icons.LogoMark}
            </div>
            
            <div className="space-y-2">
              {/* RESTAURAÇÃO DO VISUAL: Code (Branco) + Focus (Azul/Gradiente) */}
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-xl relative inline-block">
                Code<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Focus</span>
                {/* Glow sutil atrás do texto */}
                <div className="absolute -inset-4 bg-cyan-500/10 blur-2xl -z-10 rounded-full opacity-50"></div>
              </h1>
              
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mx-auto mt-6 mb-6"></div>
            </div>
          </div>

          {/* Subtítulo (H2) */}
          <h2 className="text-xl md:text-2xl text-cyan-50 font-medium tracking-tight">
            Seu painel pessoal para registrar e resolver erros de código.
          </h2>

          {/* Descrição Curta */}
          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Centralize bugs, anotações técnicas e soluções em um só lugar. <br className="hidden md:block" />
            Menos retrabalho. Mais clareza. Evolução contínua.
          </p>

          {/* CTA Principal */}
          <div className="pt-8">
            <Link 
              href="/dashboard"
              className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 bg-cyan-600 rounded-lg hover:bg-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:-translate-y-px active:translate-y-0 border border-cyan-500/20"
            >
              Iniciar Workspace
              {Icons.ArrowRight}
            </Link>
          </div>
        </section>

        {/* 2. BENEFITS SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto w-full">
          <FeatureCard 
            icon={Icons.Grid}
            title="Registro de Erros"
            description="Documente falhas, comportamentos inesperados e aprendizados técnicos."
          />
          <FeatureCard 
            icon={Icons.Layers}
            title="Organização por Stack"
            description="Classifique anotações por linguagem e mantenha tudo acessível."
          />
          <FeatureCard 
            icon={Icons.Node}
            title="Base de Conhecimento"
            description="Transforme erros recorrentes em soluções reutilizáveis."
          />
        </section>

      </div>

      {/* 3. FOOTER */}
      <footer className="relative z-10 py-8 text-center border-t border-white/5">
        <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
          By Finneo Corporation
        </p>
      </footer>

    </main>
  );
}