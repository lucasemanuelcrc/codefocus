"use client";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Tema VS Code
import { toast } from "sonner";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = "tsx", className = "" }: CodeBlockProps) {
  if (!code) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success("Código copiado!", {
      duration: 2000,
    });
  };

  return (
    <div className={`rounded-xl overflow-hidden border border-slate-800 bg-[#1e1e1e] shadow-2xl ${className}`}>
      {/* Header do Terminal */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-white/5 select-none">
        
        {/* Bolinhas estilo Mac (Coloridas fica mais profissional) */}
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" /> {/* Red */}
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" /> {/* Yellow */}
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" /> {/* Green */}
        </div>
        
        <div className="flex items-center gap-2">
          {/* Label da Linguagem */}
          <span className="text-[10px] text-slate-500 font-mono uppercase font-bold tracking-wider">
            {language}
          </span>
          
          {/* Botão de Copiar Integrado */}
          <button
            onClick={handleCopy}
            className="group flex items-center justify-center p-1.5 rounded hover:bg-white/10 transition-colors"
            title="Copiar código"
          >
             <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
             </svg>
          </button>
        </div>
      </div>
      
      {/* Conteúdo com Syntax Highlighting */}
      <div className="text-xs md:text-sm font-mono">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            background: 'transparent', // Remove o fundo padrão para usar o nosso
            fontSize: 'inherit',
            lineHeight: '1.6',
          }}
          showLineNumbers={true}
          lineNumberStyle={{ 
            minWidth: "2.5em", 
            paddingRight: "1em", 
            color: "#6e7681", 
            textAlign: "right",
            userSelect: "none"
          }}
          wrapLines={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}