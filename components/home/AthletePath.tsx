import Image from "next/image";
import Link from "next/link";
import { eventos } from "@/config/site";

/**
 * Seção-assinatura do site: o trajeto do atleta em três estágios (01→02→03).
 * Layout inspirado no flyer do clube: fundo vinho texturizado com brasão em
 * marca d'água, cartões arredondados com número gigante e ícone de linha por
 * estágio, e barra final que leva às histórias reais (/da-base-ao-time).
 * O estágio de federação é sinalizado pelo brasão da FPFS (única marca que
 * mantém cores próprias). Cartões com destino são inteiramente clicáveis.
 */
const passos = [
  {
    numero: "01",
    rotulo: "Iniciação",
    titulo: "Entra na escolinha",
    texto: "Iniciação por faixa etária, com fundamento, disciplina e alegria de jogar.",
    destaque: false,
    href: "/escolinha",
    cta: "Conhecer a escolinha",
    evento: "",
    // Bola de futsal
    icone:
      "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7.5l-4.3 3.1 1.7 5h5.2l1.7-5L12 7.5zM12 3.2v4.3M3.4 10l4.3.6M20.6 10l-4.3.6M7.2 20l2.2-3.4M16.8 20l-2.2-3.4",
  },
  {
    numero: "02",
    rotulo: "Formação",
    titulo: "Cresce jogando",
    texto: "Evolui de turma em turma, disputa festivais e amistosos, vira atleta.",
    destaque: false,
    href: "/escolinha",
    cta: "Acompanhar o processo",
    evento: "",
    // Gráfico de evolução em alta
    icone: "M4 4v16h16M7 15l4-4 3 3 5-6M15 8h4v4",
  },
  {
    numero: "03",
    rotulo: "Competição · FPFS",
    titulo: "Veste a camisa do time",
    texto: "Os destaques da base chegam ao time Sub-18, que representa o clube na FPFS.",
    destaque: true,
    href: "/time",
    cta: "Acompanhar o time",
    evento: eventos.ctaAcompanharTime,
    // Troféu
    icone: "M8 4h8v5a4 4 0 0 1-8 0V4zM8 6H4c0 3 2 4 4 4M16 6h4c0 3-2 4-4 4M12 13v4M8 21h8M10 17h4v4",
  },
] as const;

export function AthletePath() {
  return (
    <section aria-label="O trajeto do atleta" className="relative overflow-hidden bg-wine py-24">
      {/* Brasão em marca d'água no canto superior direito (referência do flyer).
          Opacidade mínima: só aparece para quem observa com atenção. */}
      <Image
        src="/brasao.webp"
        alt=""
        width={515}
        height={515}
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 w-80 opacity-[0.04] brightness-0 invert"
      />
      {/* Textura sutil de quadra: círculo central + linha do meio, quase
          invisíveis (2% de opacidade) — tira a uniformidade do fundo sem poluir */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 600"
        fill="none"
        stroke="var(--color-paper)"
        strokeWidth="2"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.02]"
      >
        <circle cx="600" cy="300" r="160" />
        <circle cx="600" cy="300" r="6" />
        <path d="M600 0v600M0 40h1200M0 560h1200" />
        <path d="M0 140a260 260 0 0 1 0 320M1200 140a260 260 0 0 0 0 320" />
      </svg>

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Cabeçalho no padrão do flyer: eyebrow bicolor, título e régua
            vermelha — título maior e mais respiro antes dos cartões */}
        <div className="mb-14">
          {/* Eyebrow em paper puro: red (#E4141B) sobre wine fica ~2.3:1 —
              abaixo do AA. O acento vermelho fica na régua abaixo do título. */}
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-paper">Nossa jornada</p>
          <h2 className="mt-3 font-display text-5xl uppercase leading-[0.95] text-paper sm:text-6xl">
            O trajeto
            <span className="block">do atleta</span>
          </h2>
          <span aria-hidden="true" className="mt-5 block h-1 w-12 bg-red" />
          {/* Frase institucional que saiu da hero — aqui é a casa dela */}
          <p className="mt-5 max-w-md text-paper/80">
            Formamos atletas e construímos caráter, dentro e fora da quadra.
          </p>
        </div>

        {/* Trilha da jornada: ●────●────● conectando os três estágios (só no
            desktop, onde os cartões ficam lado a lado) */}
        <div aria-hidden="true" className="relative mb-6 hidden md:block">
          <span className="absolute left-[16.67%] right-[16.67%] top-1/2 h-px -translate-y-1/2 bg-red/30" />
          <div className="relative grid grid-cols-3">
            {passos.map((passo) => (
              <span
                key={passo.numero}
                className="mx-auto h-2.5 w-2.5 rounded-full border border-red/60 bg-red/80"
              />
            ))}
          </div>
        </div>

        <ol className="grid gap-5 md:grid-cols-3">
          {passos.map((passo) => {
            const conteudo = (
              <>
                {/* Número gigante em vermelho translúcido, quase saindo do cartão */}
                <span
                  aria-hidden="true"
                  className="font-display pointer-events-none absolute -bottom-12 -right-2 text-[11rem] leading-none text-red/20"
                >
                  {passo.numero}
                </span>
                {/* Ícone de linha do estágio (bola / evolução / troféu) */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-red)"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                  className="pointer-events-none absolute bottom-6 left-7 h-16 w-16 opacity-40"
                >
                  <path d={passo.icone} />
                </svg>
                <div className="relative">
                  <div className="flex items-start justify-between gap-2">
                    {/* Rótulo inteiro em paper/90: a palavra "Estágio" em red
                        sobre o cartão escuro (ink/35 + wine) fica ~3:1 — abaixo
                        do AA para texto de 12px */}
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-paper/90">
                      Estágio {passo.numero} · {passo.rotulo}
                    </p>
                    {/* Selo FPFS no estágio de federação — reforço visual da afiliação */}
                    {passo.destaque && (
                      <Image
                        src="/brasao-fpfs.webp"
                        alt="Federação Paulista de Futsal"
                        title="Filiado à FPFS"
                        width={48}
                        height={48}
                        className="h-12 w-auto shrink-0 drop-shadow-md"
                      />
                    )}
                  </div>
                  <h3 className="mt-5 font-display text-2xl uppercase text-paper">{passo.titulo}</h3>
                  <span aria-hidden="true" className="mt-3 block h-0.5 w-8 bg-red" />
                  <p className="mt-3 text-sm leading-relaxed text-paper/70">{passo.texto}</p>
                  <p className="mt-6 text-sm font-bold uppercase tracking-widest text-paper">
                    {passo.cta}{" "}
                    <span
                      aria-hidden="true"
                      className="inline-block text-red transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                    >
                      →
                    </span>
                  </p>
                </div>
              </>
            );

            return (
              <li key={passo.numero} className="flex">
                <Link
                  href={passo.href}
                  className={`group relative flex-1 overflow-hidden rounded-2xl border border-paper/15 bg-ink/35 p-7 pb-28 transition-all duration-300 hover:-translate-y-2.5 hover:border-red hover:bg-ink/45 hover:shadow-[0_16px_40px_-8px_rgba(228,20,27,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${passo.evento}`}
                >
                  {conteudo}
                </Link>
              </li>
            );
          })}
        </ol>

        {/* Card premium de fechamento: convite centrado para as histórias
            reais da ponte base→time — mais altura e respiro que uma barra */}
        <div className="mt-10 flex flex-col items-center gap-6 rounded-2xl border border-paper/15 bg-ink/40 px-6 py-12 text-center sm:py-14">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-red bg-red/20 text-paper">
            {/* Grupo de pessoas */}
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="9" cy="8" r="3" />
              <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 5.5a3 3 0 0 1 0 5M18.5 14.5c1.9 1 2.5 2.7 2.5 5.5" />
            </svg>
          </span>
          <div>
            <h3 className="font-display text-3xl uppercase leading-tight text-paper sm:text-4xl">
              Conheça quem já
              <span className="block">fez esse caminho</span>
            </h3>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-paper/70">
              Histórias reais de dedicação, superação e conquistas de quem começou exatamente
              assim.
            </p>
          </div>
          <Link
            href="/time"
            className={`group inline-flex items-center gap-2.5 rounded-full bg-red px-6 py-3 text-xs font-bold uppercase tracking-widest text-paper transition-colors hover:bg-red-ink focus-visible:outline-paper ${eventos.ponteBaseTime}`}
          >
            Acompanhar o time na FPFS
            <span
              aria-hidden="true"
              className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
