import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NotesProvider } from "@/context/NotesContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeFocus | Finneo Corp",
  description: "Gerenciador de erros de código e anotações técnicas.",
  icons: {
    icon: "/favicon.ico", // Opcional: Adicione se tiver um ícone
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-[#020617] text-slate-200 antialiased selection:bg-cyan-500/30 selection:text-cyan-100`}>
        {/* O Provider DEVE estar aqui para funcionar no Dashboard e nas páginas internas */}
        <NotesProvider>
          {children}
        </NotesProvider>
      </body>
    </html>
  );
}