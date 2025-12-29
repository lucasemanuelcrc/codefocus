interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = "", onClick }: CardProps) {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-slate-900/60 backdrop-blur-md 
        border border-slate-800/60 
        rounded-xl p-6 shadow-xl 
        transition-all duration-300
        ${onClick ? 'cursor-pointer hover:border-cyan-500/30 hover:shadow-cyan-900/10' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}