"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// --- ÍCONES VISUAIS ---
const Icons = {
  LogoMark: (
    <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth={1.5} className="text-cyan-500/50" />
      <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" className="text-cyan-400" stroke="none" />
    </svg>
  ),
  ArrowRight: (
    <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  )
};

// --- COMPONENTE: TERMINAL PREVIEW ---
function TerminalPreview() {
  return (
    <div className="relative mx-auto max-w-2xl mt-16 perspective-1000 animate-fade-in-up delay-200 group">
      <style jsx>{`
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blink {
          50% { border-color: transparent; }
        }
        .typewriter-effect {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          border-right: 3px solid #06b6d4;
          width: 0;
          animation: 
            typing 3.5s steps(60, end) 1s forwards,
            blink .75s step-end infinite;
        }
      `}</style>

      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
      
      <div className="relative rounded-xl bg-[#0B1121] border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-sm">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800/50 bg-slate-900/50">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
          </div>
          <div className="ml-4 text-[10px] text-slate-500 font-mono tracking-wide flex items-center gap-2">
            <span className="text-cyan-500">⚛</span> hydration-fix.tsx
          </div>
        </div>
        
        <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto text-left">
          <div className="flex gap-4 opacity-50 hover:opacity-100 transition-opacity">
            <div className="text-slate-700 select-none text-right w-4">1</div>
            <div className="text-slate-400">
              <span className="text-purple-400">const</span> <span className="text-blue-400">error</span> = <span className="text-amber-300">"Hydration failed..."</span>;
            </div>
          </div>
          
          <div className="flex gap-4 mt-1">
            <div className="text-slate-700 select-none text-right w-4">2</div>
            <div className="text-slate-500 italic">
              // TODO: Check server/client date mismatch
            </div>
          </div>

          <div className="flex gap-4 mt-3 bg-cyan-950/20 -mx-6 px-6 py-1 border-l-2 border-cyan-500">
            <div className="text-slate-700 select-none text-right w-4">3</div>
            <div className="typewriter-effect">
               <span className="text-cyan-100">
                  <span className="text-purple-400">return</span> <span className="text-yellow-300">dynamic</span>(() ={'>'} <span className="text-blue-400">import</span>(...), {'{'} ssr: <span className="text-red-400">false</span> {'}'});
               </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- PÁGINA PRINCIPAL ---
export default function LandingPage() {
  // Lógica do Spotlight (rastreamento do mouse)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 relative overflow-hidden flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-100">
      
      {/* 1. EFEITO SPOTLIGHT (CAMADA DINÂMICA) */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.07), transparent 80%)`
        }}
      />

      {/* 2. BACKGROUND FIXO (AMBIÊNCIA) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[120px] animate-pulse duration-[10000ms]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-blue-900/05 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
      </div>

      {/* 3. CONTEÚDO PRINCIPAL */}
      <div className="relative z-10 flex-grow flex flex-col justify-center items-center px-6 py-20">
        
        <section className="text-center max-w-4xl mx-auto space-y-8 animate-fade-in-up w-full">
          
          <div className="flex flex-col items-center gap-6">
            <div className="w-12 h-12 relative flex items-center justify-center">
               <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full"></div>
               {Icons.LogoMark}
            </div>
            
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-xl relative inline-block">
                Code<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Focus</span>
                <div className="absolute -inset-4 bg-cyan-500/10 blur-2xl -z-10 rounded-full opacity-50"></div>
              </h1>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mx-auto mt-6 mb-6"></div>
            </div>
          </div>

          <h2 className="text-xl md:text-2xl text-cyan-50 font-medium tracking-tight">
            Seu painel pessoal para registrar e resolver erros de código.
          </h2>

          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto px-4">
            Centralize bugs, anotações técnicas e soluções em um só lugar. <br className="hidden md:block" />
            Menos retrabalho. Mais clareza. Evolução contínua.
          </p>

          {/* CTA com SHINE EFFECT */}
          <div className="pt-8">
            <style jsx>{`
              @keyframes shine {
                from { transform: translateX(-100%); }
                to { transform: translateX(100%); }
              }
              .shine-element {
                animation: shine 3s infinite;
              }
            `}</style>
            
            <Link 
              href="/dashboard"
              className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 bg-cyan-600 rounded-lg hover:bg-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:-translate-y-px active:translate-y-0 border border-cyan-500/20 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Iniciar Workspace
                {Icons.ArrowRight}
              </span>
              <div className="absolute inset-0 -translate-x-full shine-element bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
            </Link>
          </div>

          <TerminalPreview />

        </section>
      </div>
    </main>
  );
}