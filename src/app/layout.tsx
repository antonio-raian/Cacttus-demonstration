import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/core/contexts/UserContext";
import { Toaster } from "@/components/ui/sonner";
import Warning from "@/components/Warning";

export const metadata: Metadata = {
  title: "Cacttus",
  description: "Job Application Controller Center ( Cacttus )",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`antialiased`}>
        <Warning
          title="Essa é uma versão demonstrativa."
          subtitle="Esta versão não é recomendada para uso em produção. Os dados são armazenados no navegador, o que pode ocasionar perda em caso de reinicialização."
          className="absolute flex items-center bottom-10 right-2 z-50 py-2 justify-between gap-4"
        >
          <div className="flex flex-col gap-2 text-sm">
            <p>Nesta versão é possível:</p>
            <ul className="list-disc pl-4">
              <li>Criar um usuário com seu nome e email</li>
              <li>Gerenciar suas candidaturas</li>
              <li>Controlar o status das candidaturas</li>
            </ul>
            <p>Porém, os dados poderão ser perdidos ao:</p>
            <ul className="list-disc pl-4">
              <li>Reinicializar o navegador</li>
              <li>Limpar os dados do navegador</li>
              <li>Limpar o cache do navegador</li>
              <li>Dentre outros</li>
            </ul>
            <br />
            <p>
              PS.: Caso não queira criar o seu usuário, pode usar o usuáio
              genérico: Joe Doe
            </p>
          </div>
        </Warning>

        <UserProvider>{children}</UserProvider>
        <Toaster richColors closeButton position="top-center" />
      </body>
    </html>
  );
}
