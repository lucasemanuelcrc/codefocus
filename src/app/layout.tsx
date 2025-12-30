import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google"; // 1. Importando a fonte mono
import "./globals.css";
import { NotesProvider } from "@/context/NotesContext";

// 2. Configurando Inter como variável CSS
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans", 
  display: "swap",
});

// 3. Configurando JetBrains Mono como variável CSS (para códigos)
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
    // 4. suppressHydrationWarning resolve o erro de atributos extras do navegador/extensões
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-[#020617] text-slate-200 antialiased selection:bg-cyan-500/30 selection:text-cyan-100`}>
        <NotesProvider>
          {children}
        </NotesProvider>
      </body>
    </html>
  );
}