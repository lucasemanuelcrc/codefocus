interface CodeBlockProps {
  code: string;
  language: string;
  className?: string;
}

export function CodeBlock({ code, language, className = "" }: CodeBlockProps) {
  if (!code) return null;

  return (
    <div className={`rounded-lg overflow-hidden border border-slate-800 bg-[#0d1117] ${className}`}>
      {/* Fake Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800/30 border-b border-slate-800/50">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
        </div>
        <span className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">
          {language}
        </span>
      </div>
      
      {/* Content */}
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-sm text-slate-300 leading-relaxed whitespace-pre">
          {code}
        </pre>
      </div>
    </div>
  );
}