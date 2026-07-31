import type { Metadata } from "next";
import Image from "next/image";
import { ChannelIcon } from "@/components/ui/ChannelIcon";
import { Reveal } from "@/components/ui/Reveal";
import { eventos, links } from "@/config/site";
import { getParceiros } from "@/lib/content";

export const metadata: Metadata = {
  title: "Parceiros e apoiadores",
  description:
    "Conheça as empresas e pessoas que patrocinam e apoiam a AA Juventude, da escolinha ao time.",
};

/**
 * /parceiros — mural de patrocinadores e apoiadores (SSG).
 * Dados vêm da data layer (getParceiros): patrocinadores primeiro.
 * Cada logo é clicável e leva ao site do parceiro (quando ele tem url);
 * o último card do mural é a captação ("Sua marca aqui") — o espaço vazio
 * do grid vira convite enquanto a lista é curta.
 */
export default function ParceirosPage() {
  const parceiros = getParceiros();

  return (
    <>
      {/* Vinho: fundo secundário da paleta para cabeçalhos de páginas de apoio.
          Brasão em marca d'água — mesma linguagem editorial da faixa de redes. */}
      <section className="relative overflow-hidden bg-wine text-paper">
        <Image
          src="/brasao.webp"
          alt=""
          width={515}
          height={515}
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -right-16 w-72 opacity-[0.07] brightness-0 invert"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-paper/70">
            Quem joga junto
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl uppercase leading-tight sm:text-6xl">
            Parceiros e{" "}
            <span className="underline decoration-red decoration-8 underline-offset-8">
              apoiadores
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-paper/85">
            Quem veste essa camisa com a gente e sustenta o futsal de Santana de Parnaíba, da base
            ao time.
          </p>
        </div>
      </section>

      <Reveal>
        <section className="mx-auto max-w-6xl px-4 py-16">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {parceiros.map((parceiro) => {
              const conteudo = (
                <>
                  {/* Logo em destaque — colorida no hover quando o card é link */}
                  <span className="flex flex-1 items-center justify-center p-8">
                    <Image
                      src={parceiro.logo}
                      alt={parceiro.nome}
                      width={332}
                      height={200}
                      className="h-24 w-auto object-contain sm:h-28"
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
                      className="group flex h-56 flex-col bg-white shadow-sm"
                    >
                      {conteudo}
                      <span className="sr-only">Visitar site de {parceiro.nome}</span>
                    </a>
                  ) : (
                    <div className="flex h-56 flex-col bg-white shadow-sm">{conteudo}</div>
                  )}
                </li>
              );
            })}

            {/* Card de captação — fecha o mural convidando a próxima marca */}
            <li>
              <a
                href={links.whatsappApoio}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex h-56 flex-col justify-end overflow-hidden bg-wine p-6 text-paper ${eventos.saidaWhatsapp}`}
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
                    <ChannelIcon canal="WhatsApp" className="h-4 w-4" />
                    Chamar no WhatsApp{" "}
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                    >
                      →
                    </span>
                  </span>
                </span>
              </a>
            </li>
          </ul>

          {/* Onde a marca aparece — fatos, sem discurso de vendas */}
          <div className="mt-12 border-t border-ink/10">
            <ul className="grid divide-y divide-ink/10 text-sm sm:grid-cols-3 sm:divide-y-0">
              {[
                "Na camisa do time e da base",
                "Na quadra, em dia de jogo",
                "Nos canais do clube",
              ].map((item, i) => (
                <li key={item} className="flex items-baseline gap-3 py-3.5 sm:pr-6">
                  <span className="font-display text-lg text-red" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <span className="font-semibold text-ink/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Reveal>
    </>
  );
}
