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

/** Selos rápidos sob os CTAs — o "porquê" da escolinha em quatro batidas. */
const selos = [
  {
    rotulo: "Professores qualificados",
    icone: (
      // Prancheta tática
      <path d="M9 3h6v3H9zM7 5H5v16h14V5h-2M9 11h6M9 15h4" />
    ),
  },
  {
    rotulo: "Competições e torneios",
    icone: (
      // Troféu
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4zM8 6H4c0 3 2 4 4 4M16 6h4c0 3-2 4-4 4M12 13v4M8 21h8M10 17h4v4" />
    ),
  },
  {
    rotulo: "Formação dentro e fora da quadra",
    icone: (
      // Escudo com estrela
      <path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3zM12 8l1.2 2.4 2.6.4-1.9 1.9.4 2.6L12 14l-2.3 1.3.4-2.6-1.9-1.9 2.6-.4L12 8z" />
    ),
  },
  {
    rotulo: "Disciplina, respeito e foco",
    icone: (
      // Alvo
      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM12 13a1 1 0 1 0 0-2" />
    ),
  },
] as const;

/** Ícone + rótulo de um selo do painel da hero. */
function SeloItem({ selo }: { selo: (typeof selos)[number] }) {
  return (
    <>
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-red)"
        strokeWidth="1.8"
        strokeLinejoin="round"
        aria-hidden="true"
        className="shrink-0"
      >
        {selo.icone}
      </svg>
      <span className="text-xs font-bold uppercase leading-snug tracking-wider text-paper">
        {selo.rotulo}
      </span>
    </>
  );
}

/**
 * Hero da home: banner com o mascote em quadra (arte já traz o urso à direita —
 * sem mascote sobreposto). bg-red é o fallback enquanto a imagem carrega.
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
          a imagem, sem mexer no texto. A seção mais enxuta (py menores) também
          reduz o corte/zoom do bg-cover. No mobile entra a arte vertical do
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
          {/* Eyebrow de propósito (referência do clube) — a cidade segue no
              parágrafo e no restante da página */}
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-paper/90">
            Formamos atletas. Construímos caráter.
          </p>
          {/* Título em 3 níveis, como na referência: linha branca, linha em
              destaque (red no lugar do verde) e fecho menor com acento parcial */}
          <h1 className="font-display uppercase">
            <span className="block text-5xl leading-[0.95] sm:text-7xl">Da base ao time.</span>
            <span className="block text-5xl leading-[0.95] text-red sm:text-7xl">
              Uma só jornada.
            </span>
            <span className="mt-2 block text-2xl leading-tight sm:text-4xl">
              É aqui que as <span className="text-red">grandes histórias</span> começam.
            </span>
          </h1>
          {/* Lead curto em destaque + parágrafo de apoio (estrutura da referência) */}
          <p className="mt-6 text-lg font-bold text-red">Aqui se joga muito mais que futsal.</p>
          <p className="mt-1 max-w-xl leading-relaxed text-paper/90">
            Do Sub-8 ao Sub-18, treinamos fundamento, disciplina e respeito dentro e fora da
            quadra. E levamos o nome de Santana de Parnaíba para as quadras da Federação Paulista
            de Futsal.
          </p>
        </div>

        <div className="lg:pl-20">
          {/* Painel de selos igual ao da referência: caixa arredondada de
              contorno fino, translúcida, com divisórias verticais entre os 4
              itens no desktop; no mobile vira grade 2×2 respirada */}
          <ul className="mt-8 grid max-w-3xl grid-cols-2 gap-4 rounded-2xl border border-paper/30 bg-ink/40 p-5 backdrop-blur-sm lg:flex lg:gap-0 lg:divide-x lg:divide-paper/25 lg:p-0">
            {selos.map((selo) => (
              <li key={selo.rotulo} className="flex items-center gap-3 lg:flex-1 lg:px-5 lg:py-4">
                <SeloItem selo={selo} />
              </li>
            ))}
          </ul>

          {/* CTAs em pílula com seta em círculo (referência): primário vermelho
              cheio (conversão = matrícula) e secundário de contorno (time) */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={links.whatsappMatricula}
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center justify-center gap-3 rounded-full bg-red px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-paper shadow-md transition-all hover:bg-red-ink hover:shadow-lg focus-visible:outline-paper ${eventos.ctaMatricula} ${eventos.saidaWhatsapp}`}
            >
              Garanta sua vaga
              <SetaCirculo />
            </a>
            <Link
              href="/time"
              className={`group inline-flex items-center justify-center gap-3 rounded-full border-2 border-paper px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-paper transition-all hover:bg-paper hover:text-red-ink hover:shadow-lg focus-visible:outline-paper ${eventos.ctaAcompanharTime}`}
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
