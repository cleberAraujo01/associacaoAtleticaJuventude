import type { Metadata } from "next";
import Image from "next/image";
import { CtaLink } from "@/components/ui/CtaLink";
import { eventos, links } from "@/config/site";
import { getParceiros } from "@/lib/content";

export const metadata: Metadata = {
  title: "Parceiros e apoiadores",
  description:
    "Conheça as empresas e pessoas que patrocinam e apoiam a AA Juventude, da escolinha ao time.",
};

/**
 * /parceiros — vitrine de patrocinadores e apoiadores (SSG).
 * Dados vêm da data layer (getParceiros): patrocinadores primeiro.
 */
export default function ParceirosPage() {
  const parceiros = getParceiros();

  return (
    <>
      {/* Vinho: fundo secundário da paleta para cabeçalhos de páginas de apoio */}
      <section className="bg-wine text-paper">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h1 className="font-display max-w-2xl text-4xl uppercase leading-tight sm:text-6xl">
            Parceiros e apoiadores
          </h1>
          <p className="mt-4 max-w-xl text-lg text-paper/85">
            Quem veste essa camisa com a gente e sustenta o futsal de Santana de Parnaíba, da base
            ao time.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {parceiros.map((parceiro) => {
            const conteudo = (
              <>
                <Image
                  src={parceiro.logo}
                  alt={parceiro.nome}
                  width={166}
                  height={100}
                  className="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <span className="text-sm font-bold uppercase tracking-widest text-ink">
                  {parceiro.nome}
                </span>
                {parceiro.descricao && (
                  <span className="text-xs text-ink/60">{parceiro.descricao}</span>
                )}
              </>
            );
            const classeCard =
              "group flex h-48 flex-col items-center justify-center gap-2 border-2 border-ink/10 bg-white p-6 text-center transition-colors hover:border-red";

            return (
              <li key={parceiro.id}>
                {parceiro.url ? (
                  <a
                    href={parceiro.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classeCard}
                  >
                    {conteudo}
                    <span className="sr-only">Visitar site de {parceiro.nome}</span>
                  </a>
                ) : (
                  <div className={classeCard}>{conteudo}</div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-10">
          <CtaLink
            href={links.whatsappApoio}
            variante="vermelho"
            evento={eventos.saidaWhatsapp}
            externo
          >
            Quero ser parceiro — WhatsApp
          </CtaLink>
        </div>
      </section>
    </>
  );
}
