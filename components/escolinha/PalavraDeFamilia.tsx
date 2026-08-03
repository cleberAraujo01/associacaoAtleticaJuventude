"use client";

import Image from "next/image";
import { useState } from "react";
import type { Depoimento } from "@/types";

interface PalavraDeFamiliaProps {
  depoimentos: Depoimento[];
}

/**
 * Prova social da escolinha: foto da família à esquerda (com selo de
 * confiança) e depoimento em corpo grande à direita, separados por um filete
 * vermelho vertical. Vários depoimentos giram por controles discretos (dots).
 * Client component apenas pela troca de depoimento — o resto é estático.
 */
export function PalavraDeFamilia({ depoimentos }: PalavraDeFamiliaProps) {
  const [indice, setIndice] = useState(0);
  const atual = depoimentos[indice];

  if (!atual) return null;

  return (
    // border-t-2 red: divisória fina (assinatura do site) suavizando a saída
    // do bloco escuro do Estágio 03 para esta seção clara
    <section
      className="relative overflow-hidden border-t-2 border-red bg-paper"
      aria-label="Depoimentos de famílias da escolinha"
    >
      {/* Marca d'água do brasão no canto inferior direito */}
      <Image
        src="/brasao.webp"
        alt=""
        width={515}
        height={515}
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-20 w-80 opacity-[0.05]"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(16rem,2fr)_3fr] lg:gap-0">
          {/* Foto + identidade da seção */}
          <div className="lg:border-r-2 lg:border-red lg:pr-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-ink">
              Quem vive a escolinha
            </p>
            <h2 className="mt-2 font-display text-4xl uppercase leading-none text-ink sm:text-5xl">
              Palavra de família
            </h2>
            <div className="mt-6 overflow-hidden rounded-2xl shadow-[0_10px_30px_rgba(14,14,16,0.1)]">
              {atual.foto ? (
                <Image
                  src={atual.foto}
                  alt={`Foto de ${atual.autor}`}
                  width={640}
                  height={720}
                  className="aspect-[8/9] w-full object-cover"
                />
              ) : (
                // Sem foto coletada ainda: bloco wine com o brasão como retrato provisório
                <div className="flex aspect-[8/9] w-full items-center justify-center bg-wine">
                  <Image
                    src="/brasao.webp"
                    alt=""
                    width={515}
                    height={515}
                    aria-hidden="true"
                    className="w-36 opacity-90"
                  />
                </div>
              )}
            </div>
            <p className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-ink/60">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-red" />
              Famílias que confiam no Juventude
            </p>
          </div>

          {/* Depoimento em destaque */}
          <figure className="relative lg:pl-12">
            <span
              aria-hidden="true"
              className="font-display pointer-events-none absolute -top-14 left-0 text-[11rem] leading-none text-red/10 lg:left-8"
            >
              “
            </span>
            <blockquote className="relative text-2xl leading-snug text-ink sm:text-3xl">
              {atual.texto}
            </blockquote>
            <figcaption className="relative mt-8">
              <p className="font-display text-xl uppercase tracking-wide text-ink">{atual.autor}</p>
              <p className="mt-1 text-sm text-ink/60">{atual.papel}</p>
            </figcaption>

            {/* Controles discretos para trocar o depoimento */}
            {depoimentos.length > 1 && (
              <div className="relative mt-8 flex gap-2.5" role="tablist" aria-label="Depoimentos">
                {depoimentos.map((depoimento, i) => (
                  <button
                    key={depoimento.id}
                    type="button"
                    role="tab"
                    aria-selected={i === indice}
                    aria-label={`Depoimento de ${depoimento.autor}`}
                    onClick={() => setIndice(i)}
                    className={`h-2.5 rounded-full transition-[width,background-color] duration-300 motion-reduce:transition-none ${
                      i === indice ? "w-7 bg-red" : "w-2.5 bg-ink/20 hover:bg-ink/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </figure>
        </div>
      </div>
    </section>
  );
}
