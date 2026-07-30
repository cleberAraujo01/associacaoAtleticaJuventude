import type { Depoimento } from "@/types";

/**
 * Cartão de depoimento — usado na home, em /da-base-ao-time e /escolinha.
 * Identidade editorial (sem barra lateral genérica): aspas grandes na fonte
 * display abrem a fala; a assinatura fecha em caixa alta.
 */
export function DepoimentoCard({ depoimento }: { depoimento: Depoimento }) {
  return (
    <figure className="flex h-full flex-col bg-white p-7 shadow-sm sm:p-8">
      <span aria-hidden="true" className="font-display block text-7xl leading-[0.55] text-red">
        “
      </span>
      <blockquote className="mt-4 flex-1 text-base leading-relaxed text-ink/90">
        {depoimento.texto}
      </blockquote>
      <figcaption className="mt-6 text-sm">
        <span className="font-bold uppercase tracking-wide">{depoimento.autor}</span>
        <span className="text-ink/60"> · {depoimento.papel}</span>
      </figcaption>
    </figure>
  );
}
