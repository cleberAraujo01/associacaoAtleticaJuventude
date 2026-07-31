import type { Metadata } from "next";
import { Anton, Raleway } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SplashIntro } from "@/components/layout/SplashIntro";
import { Ticker } from "@/components/layout/Ticker";
import { site } from "@/config/site";
import "./globals.css";

// Fontes self-hosted via next/font: zero layout shift, sem request ao Google.
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nome} — Futsal em ${site.cidade}`,
    template: `%s | ${site.nomeCurto}`,
  },
  description: site.descricao,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${anton.variable} ${raleway.variable}`}>
      <head>
        {/* Decide ANTES do primeiro paint se o splash de abertura roda:
            só na primeira página da sessão e sem prefers-reduced-motion.
            Inline para não haver flash do conteúdo antes do overlay. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(!sessionStorage.getItem("aja-splash")&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.splash="1"}catch(e){}`,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <SplashIntro />
        {/* Alvo do "Voltar ao topo" do footer — precisa ser um elemento
            não-sticky no topo real do documento (o header sticky não serve:
            como está sempre visível, o navegador não rola até ele). */}
        <span id="topo" aria-hidden="true" />
        {/* Skip link: primeiro elemento focável (WCAG 2.4.1) */}
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Pular para o conteúdo
        </a>
        <Ticker />
        <Header />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer />
        {/*
          Plausible Analytics (sem cookie, ~1KB, dispensa banner de consentimento).
          `tagged-events` habilita eventos via classe CSS (config/site.ts → eventos).
          TODO: conteúdo pendente — ativar trocando data-domain pelo domínio real ao publicar.
        */}
        <Script
          defer
          data-domain="aajuventude.com.br"
          src="https://plausible.io/js/script.tagged-events.outbound-links.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
