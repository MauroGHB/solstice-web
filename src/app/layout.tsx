import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import BackgroundEffects from "@/components/BackgroundEffects";

export const metadata: Metadata = {
  title: "SolStice AI - Orientación Empresarial Inteligente",
  description: "Inteligencia artificial de gestión y orientación empresarial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <BackgroundEffects />
        <LanguageProvider>
          <Navbar />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
