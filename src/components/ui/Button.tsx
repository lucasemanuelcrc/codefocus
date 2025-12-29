import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  className = '', 
  ...props 
}: ButtonProps) {
  
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950";
  
  const variants = {
    primary: "bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/20 focus:ring-cyan-500",
    secondary: "bg-slate-800 hover:bg-slate-700 text-slate-200 focus:ring-slate-500",
    outline: "bg-transparent border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 focus:ring-slate-500",
    ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-slate-800/50 focus:ring-slate-500",
    danger: "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-900/50 focus:ring-red-500"
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Carregando...
        </span>
      ) : children}
    </button>
  );
}