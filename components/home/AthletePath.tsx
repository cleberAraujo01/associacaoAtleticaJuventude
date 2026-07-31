import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { eventos } from "@/config/site";

/**
 * Seção-assinatura do site: o trajeto do atleta em três estágios (01→02→03),
 * consolidando a antiga dupla de cartões-porta com a linha do tempo — uma só
 * narrativa, com os CTAs embutidos nos estágios correspondentes.
 * O estágio de federação é sinalizado pelo brasão da FPFS (única marca que
 * mantém cores próprias) e por texto em destaque — sem cor de apoio extra.
 * Estágios com destino são cards inteiramente clicáveis (link único, sem aninhamento).
 */
const passos = [
  {
    numero: "01",
    rotulo: "Iniciação",
    titulo: "Entra na escolinha",
    texto: "Iniciação por faixa etária, com fundamento, disciplina e alegria de jogar.",
    destaque: false,
    href: "/escolinha",
    cta: "Conhecer a escolinha →",
    evento: "",
  },
  {
    numero: "02",
    rotulo: "Formação",
    titulo: "Cresce jogando",
    texto: "Evolui de turma em turma, disputa festivais e amistosos, vira atleta.",
    destaque: false,
    href: null,
    cta: null,
    evento: "",
  },
  {
    numero: "03",
    rotulo: "Competição · FPFS",
    titulo: "Veste a camisa do time",
    texto: "Os destaques da base sobem para o elenco que disputa a FPFS.",
    destaque: true,
    href: "/time",
    cta: "Acompanhar o time →",
    evento: eventos.ctaAcompanharTime,
  },
] as const;

export function AthletePath() {
  return (
    <section aria-label="O trajeto do atleta" className="bg-wine py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading rotulo="Nossa jornada" escuro>
          O trajeto do atleta
        </SectionHeading>
        <ol className="grid gap-4 md:grid-cols-3">
          {passos.map((passo) => {
            const conteudo = (
              <>
                {/* Número gigante ao fundo, cortado na borda — âncora visual do
                    card no lugar da antiga barra vermelha superior */}
                <span
                  aria-hidden="true"
                  className="font-display pointer-events-none absolute -bottom-7 right-1 text-[7.5rem] leading-none text-paper/10"
                >
                  {passo.numero}
                </span>
                <div className="relative">
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className={`text-xs font-bold uppercase tracking-[0.2em] ${
                        passo.destaque ? "text-paper" : "text-paper/60"
                      }`}
                    >
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
                  <p className="mt-2 text-sm leading-relaxed text-paper/70">{passo.texto}</p>
                  {passo.cta && (
                    <p className="mt-5 text-sm font-bold uppercase tracking-widest text-paper">
                      {passo.cta.replace(" →", "")}{" "}
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </p>
                  )}
                </div>
              </>
            );

            return (
              <li key={passo.numero} className="flex">
                {passo.href ? (
                  <Link
                    href={passo.href}
                    className={`group relative flex-1 overflow-hidden bg-paper/5 p-6 pb-8 transition-colors hover:bg-paper/10 ${passo.evento}`}
                  >
                    {conteudo}
                  </Link>
                ) : (
                  <div className="relative flex-1 overflow-hidden bg-paper/5 p-6 pb-8">
                    {conteudo}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
        <div className="mt-10">
          <Link
            href="/da-base-ao-time"
            className={`text-sm font-bold uppercase tracking-widest text-paper underline underline-offset-4 hover:no-underline ${eventos.ponteBaseTime}`}
          >
            Conheça quem já fez esse caminho →
          </Link>
        </div>
      </div>
    </section>
  );
}
