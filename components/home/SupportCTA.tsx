import Image from "next/image";
import Link from "next/link";
import { ChannelIcon } from "@/components/ui/ChannelIcon";
import { CtaLink } from "@/components/ui/CtaLink";
import { eventos, links } from "@/config/site";
import type { Parceiro } from "@/types";

interface SupportCTAProps {
  parceiros: Parceiro[];
}

/**
 * Seção "Patrocinadores" da home em duas partes: logos à esquerda (wrap,
 * escala conforme a lista cresce) e card "Seja um parceiro" à direita —
 * preenche o espaço enquanto há poucos parceiros e converte a visibilidade
 * da faixa em captação de novos apoios.
 * O primeiro item só ganha destaque de principal se for do tipo "patrocinador".
 */
export function SupportCTA({ parceiros }: SupportCTAProps) {
  const temPrincipal = parceiros[0]?.tipo === "patrocinador";
  const principal = temPrincipal ? parceiros[0] : undefined;
  const demais = temPrincipal ? parceiros.slice(1) : parceiros;

  return (
    <section className="border-t-2 border-red bg-white" aria-labelledby="patrocinadores-titulo">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2
          id="patrocinadores-titulo"
          className="text-center font-display text-2xl uppercase tracking-[0.3em] text-ink"
        >
          Patrocinadores e apoiadores
        </h2>

        <div className="mt-8 grid items-stretch gap-8 lg:grid-cols-[1fr_minmax(20rem,24rem)]">
          {/* Logos — centralizadas no espaço disponível, com wrap */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
            {principal && <LogoParceiro parceiro={principal} principal />}
            {demais.map((parceiro) => (
              <LogoParceiro key={parceiro.id} parceiro={parceiro} />
            ))}
          </div>

          {/* Card de captação — preenche o espaço e converte visibilidade em apoio */}
          {/* Fundo vinho (secundário da paleta) destaca o card sobre a faixa branca;
              brasão em marca d'água no canto — mesma linguagem editorial da
              faixa de redes sociais */}
          <div className="relative flex flex-col justify-center overflow-hidden bg-wine p-8 text-paper">
            <Image
              src="/brasao.webp"
              alt=""
              width={515}
              height={515}
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-16 -right-16 w-56 opacity-[0.07] brightness-0 invert"
            />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-paper/80">
                Sua marca no jogo
              </p>
              <h3 className="mt-2 font-display text-3xl uppercase">Seja um parceiro</h3>
              <p className="mt-3 text-sm leading-relaxed text-paper/80">
                Apoie a formação de atletas em Santana de Parnaíba e apareça na camisa, na quadra e
                nos canais do clube.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <CtaLink
                  href={links.whatsappApoio}
                  variante="vermelho"
                  evento={eventos.saidaWhatsapp}
                  externo
                >
                  <ChannelIcon canal="WhatsApp" />
                  Quero apoiar o clube
                </CtaLink>
                <Link
                  href="/apoie"
                  className="group text-center text-sm font-bold uppercase tracking-widest text-paper/90 transition-colors hover:text-paper"
                >
                  Como funciona o apoio{" "}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Logo individual da faixa; vira link quando o parceiro tem site. */
function LogoParceiro({ parceiro, principal }: { parceiro: Parceiro; principal?: boolean }) {
  const imagem = (
    <Image
      src={parceiro.logo}
      alt={`${parceiro.nome}${parceiro.descricao ? ` — ${parceiro.descricao}` : ""}`}
      width={principal ? 400 : 320}
      height={principal ? 240 : 200}
      className={`w-auto object-contain transition-transform duration-300 group-hover:scale-105 ${
        principal ? "h-44 sm:h-56" : "h-36 sm:h-44"
      }`}
    />
  );

  if (parceiro.url) {
    return (
      <a
        href={parceiro.url}
        target="_blank"
        rel="noopener noreferrer"
        title={parceiro.nome}
        className="group flex items-center justify-center"
      >
        {imagem}
        <span className="sr-only">Visitar site de {parceiro.nome}</span>
      </a>
    );
  }

  return <div className="group flex items-center justify-center">{imagem}</div>;
}
