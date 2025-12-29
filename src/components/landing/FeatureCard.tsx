import { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="group p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm hover:bg-slate-800/60 hover:border-cyan-500/30 transition-all duration-300">
      <div className="w-12 h-12 mb-4 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-100 mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}