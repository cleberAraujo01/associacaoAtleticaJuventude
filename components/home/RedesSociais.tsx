import Image from "next/image";
import { ChannelIcon } from "@/components/ui/ChannelIcon";
import { canais, site } from "@/config/site";

/**
 * Faixa "Siga o Juventude nas redes" — padrão de site de clube: título curto e
 * ícones circulares das redes lado a lado. A lista vem de config/site.ts
 * (mesma fonte do mega menu e da página /canais); saídas rastreadas no Plausible.
 * Fundo vinho com o brasão real como marca d'água (brightness-0 + invert vira
 * silhueta branca; opacidade baixa) — visual editorial de manual de marca.
 */
export function RedesSociais() {
  return (
    <section
      aria-label={`Redes sociais da ${site.nomeCurto}`}
      className="relative overflow-hidden bg-wine py-10 text-paper"
    >
      {/* Marca d'água: brasão gigante sangrando nas bordas (decorativo) */}
      <Image
        src="/brasao.webp"
        alt=""
        width={515}
        height={515}
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/2 w-80 -translate-y-1/2 opacity-[0.06] brightness-0 invert sm:w-96"
      />
      <Image
        src="/brasao.webp"
        alt=""
        width={515}
        height={515}
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-1/2 w-80 -translate-y-1/2 opacity-[0.06] brightness-0 invert sm:w-96"
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-4">
        <h2 className="flex flex-wrap items-center justify-center gap-3 text-center font-display text-2xl uppercase sm:text-3xl">
          {/* Monograma AJA real (decorativo — o nome já está no texto) */}
          <Image
            src="/monograma.webp"
            alt=""
            width={80}
            height={80}
            aria-hidden="true"
            className="h-10 w-10 sm:h-12 sm:w-12"
          />
          <span>
            Siga o{" "}
            <span className="underline decoration-red decoration-4 underline-offset-8">
              Juventude
            </span>{" "}
            nas redes
          </span>
        </h2>
        <ul className="flex flex-wrap items-center justify-center gap-4">
          {canais.map((canal) => (
            <li key={canal.nome}>
              {/* Anel duplo — eco dos círculos concêntricos do brasão */}
              <a
                href={canal.href}
                target="_blank"
                rel="noopener noreferrer"
                title={canal.nome}
                className={`group flex h-14 w-14 items-center justify-center rounded-full border-2 border-paper p-1 text-paper transition-colors hover:bg-paper hover:text-red-ink focus-visible:outline-paper ${canal.evento}`}
              >
                <span className="flex h-full w-full items-center justify-center rounded-full border border-paper/60 transition-colors group-hover:border-red-ink/40">
                  <ChannelIcon canal={canal.nome} className="h-5 w-5" />
                </span>
                <span className="sr-only">{canal.nome}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
