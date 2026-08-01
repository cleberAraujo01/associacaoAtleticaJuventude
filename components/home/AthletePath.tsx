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
    // Cone de treino
    icone: "M12 4l4 14H8L12 4zM6 18h12M9.5 12h5",
  },
  {
    numero: "02",
    rotulo: "Formação",
    titulo: "Cresce jogando",
    texto: "Evolui de turma em turma, disputa festivais e amistosos, vira atleta.",
    destaque: false,
    href: "/da-base-ao-time",
    cta: "Acompanhar o processo",
    evento: "",
    // Prancheta tática
    icone: "M5 4h14v16H5V4zM9 4v3h6V4M9 12l3 3 4-5",
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
    // Camisa do clube
    icone: "M8 4l4 2 4-2 4 3-2 4-2-1v10H8V10l-2 1-2-4 4-3z",
  },
] as const;

export function AthletePath() {
  return (
    <section aria-label="O trajeto do atleta" className="relative overflow-hidden bg-wine py-16">
      {/* Brasão em marca d'água no canto superior direito (referência do flyer) */}
      <Image
        src="/brasao.webp"
        alt=""
        width={515}
        height={515}
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 w-80 opacity-[0.08] brightness-0 invert"
      />

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Cabeçalho no padrão do flyer: eyebrow bicolor, título e régua vermelha */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em]">
            <span className="text-red">Nossa</span>{" "}
            <span className="text-paper">jornada</span>
          </p>
          <h2 className="mt-2 font-display text-4xl uppercase leading-tight text-paper sm:text-5xl">
            O trajeto do atleta
          </h2>
          <span aria-hidden="true" className="mt-4 block h-1 w-12 bg-red" />
          <p className="mt-4 max-w-md text-paper/80">
            Mais que formar jogadores, formamos pessoas para a vida.
          </p>
        </div>

        <ol className="grid gap-5 md:grid-cols-3">
          {passos.map((passo) => {
            const conteudo = (
              <>
                {/* Número gigante em vermelho translúcido, cortado na borda */}
                <span
                  aria-hidden="true"
                  className="font-display pointer-events-none absolute -bottom-8 right-2 text-[8rem] leading-none text-red/20"
                >
                  {passo.numero}
                </span>
                {/* Ícone de linha do estágio (cone / prancheta / camisa) */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-red)"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                  className="pointer-events-none absolute bottom-5 left-6 h-12 w-12 opacity-40"
                >
                  <path d={passo.icone} />
                </svg>
                <div className="relative">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-paper/80">
                      <span className="text-red">Estágio</span> {passo.numero} · {passo.rotulo}
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
                  className={`group relative flex-1 overflow-hidden rounded-2xl border border-paper/15 bg-ink/35 p-6 pb-24 transition-colors hover:border-red/60 hover:bg-ink/45 ${passo.evento}`}
                >
                  {conteudo}
                </Link>
              </li>
            );
          })}
        </ol>

        {/* Barra de fechamento: convite para as histórias reais da ponte base→time */}
        <div className="mt-8 flex flex-wrap items-center gap-5 rounded-2xl border border-paper/15 bg-ink/40 p-6 sm:p-7">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-red bg-red/20 text-paper">
            {/* Grupo de pessoas */}
            <svg
              width="26"
              height="26"
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
          <div className="min-w-52 flex-1">
            <h3 className="font-display text-2xl uppercase leading-tight text-paper">
              Conheça quem já fez esse caminho
            </h3>
            <p className="mt-1 text-sm text-paper/70">
              Histórias reais de dedicação, superação e conquistas.
            </p>
          </div>
          <Link
            href="/da-base-ao-time"
            className={`group inline-flex items-center gap-2.5 rounded-full bg-red px-6 py-3 text-xs font-bold uppercase tracking-widest text-paper transition-colors hover:bg-red-ink focus-visible:outline-paper ${eventos.ponteBaseTime}`}
          >
            Ver histórias de atletas
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
