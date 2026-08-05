import Image from "next/image";
import type { ReactNode } from "react";
import { BannerSlides } from "@/components/layout/BannerSlides";

interface PageBannerProps {
  /** Rótulo pequeno acima do título (ex.: "Institucional"). */
  rotulo?: string;
  /** Título da página (vira o h1). */
  titulo: ReactNode;
  /** Imagem de fundo em /public — padrão: a arte oficial das páginas internas. */
  imagem?: string;
  /** Várias imagens: vira slideshow com crossfade (ignora `imagem`). */
  imagens?: string[];
  /** background-position do corte (ex.: "center 25%"). */
  posicao?: string;
  /** Conteúdo opcional abaixo da faixa (linha de apoio, CTA) — páginas de conversão. */
  children?: ReactNode;
}

/**
 * Banner de título das páginas internas — padrão "breadcrumb hero" de clube:
 * foto de fundo em faixa panorâmica, grafismo vermelho com corte diagonal
 * entrando da esquerda e o título subindo em fade (animações em globals.css;
 * prefers-reduced-motion as desativa). A home tem hero próprio e NÃO usa este
 * componente. A imagem vem por style (não por classe) para aceitar qualquer
 * arquivo sem gerar classes Tailwind dinâmicas.
 */
export function PageBanner({
  rotulo,
  titulo,
  imagem = "/banner-paginas.webp",
  imagens,
  posicao = "center",
  children,
}: PageBannerProps) {
  return (
    <section className="relative overflow-hidden bg-red text-paper">
      {/* Foto em camada própria, estática — é o LCP das páginas internas, por
          isso next/image com fill + priority (descoberta imediata no HTML,
          prioridade alta e variante redimensionada/comprimida por tela) em vez
          de background-image CSS, que o preload scanner não enxerga. O zoom
          lento (hero-zoom) ficou só na hero da home: nas internas ele segurava
          LCP e Speed Index. Com `imagens`, a camada vira slideshow. */}
      {imagens && imagens.length > 0 ? (
        <BannerSlides imagens={imagens} posicao={posicao} />
      ) : (
        <Image
          src={imagem}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={60}
          aria-hidden="true"
          className="object-cover"
          style={{ objectPosition: posicao }}
        />
      )}
      {/* Overlay em duas camadas: gradiente lateral (mais escuro atrás da
          faixa do título) + vinheta vertical que ancora topo e base — clima
          de transmissão noturna e contraste garantido em qualquer foto */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/45 to-ink/30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/45"
      />
      <div className="relative mx-auto flex min-h-64 max-w-6xl flex-col items-start justify-center px-4 py-14 sm:min-h-96 sm:py-20">
        {/* Faixa vermelha com corte diagonal — assinatura de clube em CSS puro.
            Tipografia contida (título menor, rótulo discreto): visual mais
            moderno e menos "gritado" que o display gigante */}
        <div className="banner-faixa relative bg-red/55 py-4 pl-6 pr-12 shadow-xl backdrop-blur-md [clip-path:polygon(0_0,100%_0,88%_100%,0_100%)] sm:py-5 sm:pl-8 sm:pr-20">
          {rotulo && (
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-paper/80">
              {rotulo}
            </p>
          )}
          <h1 className="banner-titulo font-display mt-1 text-2xl uppercase leading-none sm:text-4xl">
            {titulo}
          </h1>
        </div>
        {children && (
          <div className="banner-titulo mt-7 max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
