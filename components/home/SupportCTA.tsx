import Image from "next/image";
import Link from "next/link";
import { ChannelIcon } from "@/components/ui/ChannelIcon";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { eventos, links } from "@/config/site";
import type { Parceiro } from "@/types";

interface SupportCTAProps {
  parceiros: Parceiro[];
}

/** Onde a marca do parceiro aparece — a "vitrine" que o clube oferece. */
const beneficios = [
  {
    rotulo: "Na camisa do time",
    // Camisa
    icone: "M8 4l4 2 4-2 4 3-2 4-2-1v10H8V10l-2 1-2-4 4-3z",
  },
  {
    rotulo: "Na quadra, em jogos e festivais",
    // Placa/banner de quadra
    icone: "M3 6h18v9H3V6zM3 18h18M8 9h8M8 12h5",
  },
  {
    rotulo: "Nos canais e redes do clube",
    // Megafone
    icone: "M4 10v4h3l7 4V6l-7 4H4zM17 9a4 4 0 0 1 0 6M19.5 7a7 7 0 0 1 0 10",
  },
] as const;

/**
 * Seção "Patrocinadores" da home em duas partes: vitrine de marcas à esquerda
 * (cada parceiro em card próprio, com nome e área de atuação — a marca é
 * tratada como parte do elenco, não como rodapé de logos) e card "Seja um
 * parceiro" à direita, com a lista do que o clube oferece em troca do apoio.
 * O primeiro item só ganha selo de patrocinador oficial se for do tipo
 * "patrocinador".
 */
export function SupportCTA({ parceiros }: SupportCTAProps) {
  const temPrincipal = parceiros[0]?.tipo === "patrocinador";
  const principal = temPrincipal ? parceiros[0] : undefined;
  const demais = temPrincipal ? parceiros.slice(1) : parceiros;

  return (
    <section className="bg-white" aria-label="Patrocinadores e apoiadores">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading rotulo="Sua marca no jogo">Patrocinadores e apoiadores</SectionHeading>
        <p className="-mt-4 mb-10 max-w-2xl text-center text-ink/70 md:text-left">
          Quem apoia o Juventude entra em quadra com a gente. Cada marca aqui ajuda a manter a
          escolinha e o time Sub-18 em movimento.
        </p>

        <div className="grid items-stretch gap-8 lg:grid-cols-[1fr_minmax(20rem,24rem)]">
          {/* Vitrine de marcas — cada parceiro em card próprio, com nome e descrição */}
          <div className="flex flex-wrap content-center items-stretch justify-center gap-5">
            {principal && <CardParceiro parceiro={principal} principal />}
            {demais.map((parceiro) => (
              <CardParceiro key={parceiro.id} parceiro={parceiro} />
            ))}
          </div>

          {/* Card de captação — o que o clube oferece em troca do apoio */}
          <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl bg-wine p-8 text-paper">
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
                Apoie o clube
              </p>
              <h3 className="mt-2 font-display text-3xl uppercase">Seja um parceiro</h3>
              <p className="mt-3 text-sm leading-relaxed text-paper/80">
                Apoie a formação de atletas em Santana de Parnaíba e coloque sua marca onde a
                cidade vê:
              </p>
              <ul className="mt-4 space-y-2.5">
                {beneficios.map((beneficio) => (
                  <li key={beneficio.rotulo} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-paper/40">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d={beneficio.icone} />
                      </svg>
                    </span>
                    <span className="text-sm font-semibold text-paper/90">{beneficio.rotulo}</span>
                  </li>
                ))}
              </ul>
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
                    className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
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

/**
 * Card individual do parceiro: logo grande + nome + área de atuação.
 * Tratamento de vitrine (borda, hover e crédito por escrito) — mostra ao
 * parceiro que a marca dele é valorizada, não só empilhada numa faixa.
 */
function CardParceiro({ parceiro, principal }: { parceiro: Parceiro; principal?: boolean }) {
  const conteudo = (
    <>
      {principal && (
        <span className="absolute right-4 top-4 rounded-full bg-red px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-paper">
          Patrocinador oficial
        </span>
      )}
      <Image
        src={parceiro.logo}
        alt={`Logo de ${parceiro.nome}`}
        width={principal ? 400 : 320}
        height={principal ? 240 : 200}
        className={`w-auto object-contain transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none ${
          principal ? "h-40 sm:h-48" : "h-32 sm:h-40"
        }`}
      />
      <span className="mt-4 block border-t border-ink/10 pt-3 text-center">
        <span className="block text-sm font-bold uppercase tracking-wider text-ink">
          {parceiro.nome}
        </span>
        {parceiro.descricao && (
          <span className="mt-0.5 block text-xs text-ink/60">{parceiro.descricao}</span>
        )}
      </span>
    </>
  );

  const estilo =
    "group relative flex flex-col justify-center rounded-2xl border-2 border-ink/10 bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-red/50 hover:shadow-[0_10px_30px_rgba(14,14,16,0.08)] motion-reduce:transition-none";

  if (parceiro.url) {
    return (
      <a
        href={parceiro.url}
        target="_blank"
        rel="noopener noreferrer"
        title={`Visitar site de ${parceiro.nome}`}
        className={estilo}
      >
        {conteudo}
      </a>
    );
  }

  return <div className={estilo}>{conteudo}</div>;
}
