import Link from "next/link";
import { eventos, links } from "@/config/site";

/** Seta em círculo no fim dos CTAs em pílula (linguagem da referência). */
function SetaCirculo() {
  return (
    <span
      aria-hidden="true"
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-current text-xs transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
    >
      →
    </span>
  );
}

/**
 * Hero da home: banner com o mascote em quadra (arte já traz o urso à direita —
 * sem mascote sobreposto). bg-red é o fallback enquanto a imagem carrega.
 * Enxuta de propósito: UMA headline (o slogan em duas linhas), UMA linha de
 * apoio curta e dois CTAs — primário cheio (matrícula) e secundário outline.
 * As frases institucionais moram nas seções ("O trajeto do atleta" e footer) e
 * os 4 selos viraram faixa própria abaixo da hero (FeatureStrip).
 * No mobile o bg-cover corta para o miolo; o texto segue legível sobre a
 * arquibancada escura. O LCP segue sendo o h1.
 */
export function Hero() {
  return (
    // -mt-24/pt-24: a hero sobe para trás do header (transparente no topo da
    // home) — a mesma imagem preenche as duas áreas, sem segunda arte.
    // min-h-svh: hero em tela cheia — ocupa toda a altura do viewport
    // (incluindo a faixa atrás do header transparente).
    <section className="relative -mt-24 flex min-h-svh items-center overflow-hidden bg-red pt-24 text-paper">
      {/* Banner em camada própria: o zoom-out de abertura (hero-zoom) anima só
          a imagem, sem mexer no texto. No mobile entra a arte vertical do
          mascote (banner-hero-mobile); do md pra cima, o banner largo. */}
      <div
        aria-hidden="true"
        className="hero-zoom absolute inset-0 bg-[url('/banner-hero-mobile-2.webp')] bg-cover bg-center md:bg-[url('/banner-hero-4.webp')]"
      />
      {/* Overlay de legibilidade sobre o banner: mais forte no mobile (urso ao
          centro da arte vertical), mais leve no md+, onde o banner largo já
          reserva a área escura para o texto */}
      <div aria-hidden="true" className="absolute inset-0 bg-ink/55 md:bg-ink/35" />
      <div className="relative mx-auto w-full max-w-[96rem] px-4 py-12 sm:py-16 lg:py-10">
        {/* Sombra suave em todo o bloco de texto — legibilidade sobre a textura do banner */}
        <div className="max-w-3xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] lg:pl-20">
          {/* Título em 2 linhas: linha branca + linha em destaque. Display
              gigante — o vermelho sobre o overlay escuro cumpre o 3:1 de texto
              grande (AA) com a ajuda do drop-shadow do bloco */}
          <h1 className="font-display uppercase">
            <span className="block text-5xl leading-[0.95] sm:text-7xl">Da base ao time.</span>
            <span className="block text-5xl leading-[0.95] text-red sm:text-7xl">
              Uma só jornada.
            </span>
          </h1>
          {/* Linha de apoio única e curta — o resto da história mora nas seções.
              Sub-16, não Sub-18: a escolinha treina até o Sub-16 (o Sub-18 é o
              time competitivo da FPFS) */}
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/90">
            Escolinha de futsal em Santana de Parnaíba, do Sub-8 ao Sub-16.
          </p>

          {/* CTAs em pílula com seta em círculo: primário vermelho cheio
              (conversão = matrícula) e secundário de contorno discreto (time) */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={links.whatsappMatricula}
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center justify-center gap-3 rounded-full bg-red px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-md transition-all hover:bg-red-ink hover:shadow-lg focus-visible:outline-paper ${eventos.ctaMatricula} ${eventos.saidaWhatsapp}`}
            >
              Garanta sua vaga
              <SetaCirculo />
            </a>
            <Link
              href="/time"
              className={`group inline-flex items-center justify-center gap-3 rounded-full border-2 border-paper/80 px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-paper transition-all hover:bg-paper hover:text-red-ink hover:shadow-lg focus-visible:outline-paper ${eventos.ctaAcompanharTime}`}
            >
              Acompanhar o time na FPFS
              <SetaCirculo />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
