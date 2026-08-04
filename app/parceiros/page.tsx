import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageBanner } from "@/components/layout/PageBanner";
import { ChannelIcon } from "@/components/ui/ChannelIcon";
import { CtaLink } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { eventos, links } from "@/config/site";
import { getParceiros } from "@/lib/content";
import type { Parceiro } from "@/types";

export const metadata: Metadata = {
  title: "Parceiros e apoiadores",
  description:
    "Conheça as empresas e pessoas que patrocinam e apoiam a AA Juventude — e veja como colocar sua marca em quadra com o clube.",
};

/** Selo de cota exibido no card do mural — espelha Parceiro["tipo"]. */
const tipoRotulo: Record<Parceiro["tipo"], string> = {
  patrocinador: "Patrocinador oficial",
  parceiro: "Parceiro",
  apoiador: "Apoiador",
};

/**
 * Onde a marca do parceiro aparece — a vitrine que o clube oferece.
 * Ícones em stroke 24×24, mesma linguagem da seção de patrocinadores da home.
 */
const vitrine = [
  {
    titulo: "Na camisa",
    texto: "No uniforme de jogo do time e das turmas da base, em cada partida e festival.",
    // Camisa
    icone: "M8 4l4 2 4-2 4 3-2 4-2-1v10H8V10l-2 1-2-4 4-3z",
  },
  {
    titulo: "Na quadra",
    texto: "Em dia de jogo em casa, diante da torcida e das famílias na arquibancada.",
    // Placa/banner de quadra
    icone: "M3 6h18v9H3V6zM3 18h18M8 9h8M8 12h5",
  },
  {
    titulo: "Nos canais do clube",
    texto: "No YouTube, com jogos completos, e no dia a dia do Instagram e do Facebook.",
    // Megafone
    icone: "M4 10v4h3l7 4V6l-7 4H4zM17 9a4 4 0 0 1 0 6M19.5 7a7 7 0 0 1 0 10",
  },
] as const;

/**
 * As três formas de entrar em quadra — espelham os tipos do modelo de dados.
 * Sem cotas nem valores: contrapartidas detalhadas são conteúdo pendente
 * da diretoria e se combinam na conversa.
 */
const formas = [
  {
    tipo: "Patrocinador",
    texto:
      "Investe no projeto e leva a marca para o lugar mais visível do clube: o uniforme de jogo, da base ao time.",
  },
  {
    tipo: "Parceiro",
    texto:
      "Soma com produtos e serviços que fazem o clube funcionar: material esportivo, transporte, saúde, o que o jogo pedir.",
  },
  {
    tipo: "Apoiador",
    texto:
      "Pessoas e negócios da cidade que ajudam a manter a escolinha e o time em atividade, cada um do seu jeito.",
  },
] as const;

/**
 * /parceiros — mural de patrocinadores e apoiadores + captação (SSG).
 * Dados vêm da data layer (getParceiros): patrocinadores primeiro, com selo
 * de cota no card. Cada logo é clicável e leva ao site do parceiro (quando
 * ele tem url); o último card do mural é a captação ("Sua marca aqui").
 * Conversão de apoio via formulário de /contato (mesma decisão da home);
 * o WhatsApp fica como canal secundário na faixa final.
 */
export default function ParceirosPage() {
  const parceiros = getParceiros();

  return (
    <>
      {/* Banner padrão das páginas internas, na variante de conversão */}
      <PageBanner rotulo="Quem joga junto" titulo="Parceiros e apoiadores">
        <p className="text-lg text-paper">
          Quem veste essa camisa com a gente e sustenta o futsal de Santana de Parnaíba, da base
          ao time.
        </p>
        <div className="mt-6">
          <CtaLink href="/contato#formulario" variante="vermelho">
            Quero apoiar o clube
          </CtaLink>
        </div>
      </PageBanner>

      {/* MURAL — cada marca em card "ficha", com selo de cota */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
          <SectionHeading rotulo="Vestem a camisa">
            As marcas que jogam com a gente.
          </SectionHeading>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {parceiros.map((parceiro) => {
              const conteudo = (
                <>
                  {/* Selo de cota — patrocinador ganha o selo vermelho da home */}
                  <span
                    className={`absolute right-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
                      parceiro.tipo === "patrocinador"
                        ? "bg-red text-paper"
                        : "border border-ink/15 text-ink/60"
                    }`}
                  >
                    {tipoRotulo[parceiro.tipo]}
                  </span>
                  {/* Logo em destaque */}
                  <span className="flex flex-1 items-center justify-center p-8 pt-10">
                    <Image
                      src={parceiro.logo}
                      alt={parceiro.nome}
                      width={332}
                      height={200}
                      className="h-24 w-auto rounded-2xl object-contain sm:h-28"
                    />
                  </span>
                  {/* Rodapé do card: hairline, nome e ação — padrão de ficha do site */}
                  <span className="flex items-center justify-between gap-3 border-t border-ink/10 px-5 py-3.5">
                    <span>
                      <span className="block text-sm font-bold uppercase tracking-widest text-ink">
                        {parceiro.nome}
                      </span>
                      {parceiro.descricao && (
                        <span className="mt-0.5 block text-xs text-ink/60">
                          {parceiro.descricao}
                        </span>
                      )}
                    </span>
                    {parceiro.url && (
                      <span className="shrink-0 text-xs font-bold uppercase tracking-widest text-red-ink">
                        Visitar{" "}
                        <span
                          aria-hidden="true"
                          className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                        >
                          →
                        </span>
                      </span>
                    )}
                  </span>
                </>
              );

              return (
                <li key={parceiro.id}>
                  {parceiro.url ? (
                    <a
                      href={parceiro.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex h-60 flex-col overflow-hidden rounded-2xl border-2 border-ink/10 bg-white transition-[border-color,box-shadow] duration-300 hover:border-red/50 hover:shadow-[0_10px_30px_rgba(14,14,16,0.08)] motion-reduce:transition-none"
                    >
                      {conteudo}
                      <span className="sr-only">Visitar site de {parceiro.nome}</span>
                    </a>
                  ) : (
                    <div className="relative flex h-60 flex-col overflow-hidden rounded-2xl border-2 border-ink/10 bg-white">
                      {conteudo}
                    </div>
                  )}
                </li>
              );
            })}

            {/* Card de captação — fecha o mural convidando a próxima marca */}
            <li>
              <Link
                href="/contato#formulario"
                className="group relative flex h-60 flex-col justify-end overflow-hidden rounded-2xl bg-wine p-6 text-paper"
              >
                {/* Serigrafia "+" — mesma assinatura dos números de camisa */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-4 -top-14 font-display text-[11rem] leading-none text-transparent opacity-25 [-webkit-text-stroke:2px_var(--color-paper)]"
                >
                  +
                </span>
                <span className="relative">
                  <span className="block text-xs font-bold uppercase tracking-[0.2em] text-paper/70">
                    Este espaço é da sua marca
                  </span>
                  <span className="mt-1 block font-display text-2xl uppercase">
                    Seja um parceiro
                  </span>
                  <span className="mt-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-paper/90 transition-colors group-hover:text-paper">
                    Começar a conversa{" "}
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                    >
                      →
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          </ul>
        </section>
      </Reveal>

      {/* VITRINE — onde a marca aparece, bloco escuro com brasão em marca d'água */}
      <Reveal>
        <section className="relative overflow-hidden border-t-2 border-red bg-wine py-16 text-paper lg:py-20">
          <Image
            src="/brasao.webp"
            alt=""
            width={515}
            height={515}
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -right-16 w-80 opacity-[0.06] brightness-0 invert"
          />
          <div className="relative mx-auto max-w-6xl px-4">
            <SectionHeading rotulo="A vitrine" escuro>
              Onde sua marca aparece.
            </SectionHeading>
            <ul className="grid gap-8 sm:grid-cols-3">
              {vitrine.map((item) => (
                <li
                  key={item.titulo}
                  className="rounded-2xl border border-paper/15 bg-paper/5 p-6 text-center md:text-left"
                >
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-paper/40 md:mx-0">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d={item.icone} />
                    </svg>
                  </span>
                  <h3 className="mt-4 font-display text-2xl uppercase">{item.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper/80">{item.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Reveal>

      {/* FORMAS DE APOIAR — os três tipos do mural, explicados */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
          <SectionHeading rotulo="Formas de apoiar">
            Três jeitos de entrar em quadra.
          </SectionHeading>
          <ul className="grid gap-5 sm:grid-cols-3">
            {formas.map((forma) => (
              <li key={forma.tipo} className="rounded-2xl border-2 border-ink/10 bg-white p-6">
                <span aria-hidden="true" className="block h-1 w-10 bg-red" />
                <h3 className="mt-4 font-display text-2xl uppercase text-ink">{forma.tipo}</h3>
                <p className="mt-2 text-sm text-ink/70">{forma.texto}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-sm text-ink/60">
            As contrapartidas se combinam direto com a diretoria, no tamanho de cada apoio: do
            comércio do bairro à empresa que quer a marca no uniforme.
          </p>
        </section>
      </Reveal>

      {/* CTA FINAL — faixa de conversão, par da /quem-somos e /escolinha */}
      <Reveal>
        <section className="border-t-2 border-red bg-red text-paper">
          <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:py-20">
            <h2 className="font-display mx-auto max-w-2xl text-3xl uppercase leading-tight sm:text-4xl">
              Sua marca tem lugar nessa história.
            </h2>
            <p className="mt-3 text-paper/90">
              Conte o que sua empresa procura e a gente monta o caminho juntos.
            </p>
            <div className="mt-7 flex flex-col items-center gap-4">
              <CtaLink href="/contato#formulario" variante="claro">
                Enviar proposta pelo formulário
                <span aria-hidden="true">→</span>
              </CtaLink>
              <a
                href={links.whatsappApoio}
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-paper/90 transition-colors hover:text-paper focus-visible:outline-paper ${eventos.saidaWhatsapp}`}
              >
                <ChannelIcon canal="WhatsApp" className="h-4 w-4" />
                Prefere WhatsApp? Chama a gente{" "}
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                >
                  →
                </span>
              </a>
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}
