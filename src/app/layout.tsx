import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { NotesProvider } from "@/context/NotesContext";
// 1. IMPORTAR O TOASTER
import { Toaster } from "sonner";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans", 
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-mono", 
  display: "swap",
});

export const metadata: Metadata = {
  title: "CodeFocus | Finneo Corp",
  description: "Gerenciador de erros de código e anotações técnicas.",
  icons: {
    icon: "/favicon.ico", 
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-[#020617] text-slate-200 antialiased selection:bg-cyan-500/30 selection:text-cyan-100`}>
        <NotesProvider>
          {children}
          
          {/* 2. ADICIONAR O COMPONENTE VISUAL */}
          <Toaster 
            richColors 
            theme="dark" 
            position="top-center" 
            closeButton
          />
        </NotesProvider>
      </body>
    </html>
  );
}