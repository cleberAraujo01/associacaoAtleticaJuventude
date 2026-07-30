"use client";

import { useState } from "react";

interface TickerMarqueeProps {
  /** Texto do letreiro sem o local (ex.: "Próximo jogo — Juventude x Rival · 08/08 · 19h · "). */
  prefixo: string;
  /** Nome do ginásio/local do jogo. */
  local: string;
  /** Link para o local no mapa (ausente enquanto o endereço for placeholder). */
  mapaUrl?: string;
}

/**
 * Letreiro animado com controle de pausa (WCAG 2.2.2 — conteúdo em movimento
 * precisa de mecanismo de pausa). Também pausa ao hover, o que torna o link
 * do mapa clicável. prefers-reduced-motion desativa a animação (globals.css).
 */
export function TickerMarquee({ prefixo, local, mapaUrl }: TickerMarqueeProps) {
  const [pausado, setPausado] = useState(false);

  const conteudoLocal = mapaUrl ? (
    <a
      href={mapaUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-2 transition-opacity hover:opacity-75"
    >
      {local} ↗
    </a>
  ) : (
    local
  );

  const texto = `${prefixo}${local}`;

  return (
    <aside aria-label="Próximo jogo do time" className="flex items-stretch bg-ink text-paper">
      {/* Controle de pausa — área de toque mínima de 44px na horizontal */}
      <button
        type="button"
        onClick={() => setPausado((p) => !p)}
        aria-pressed={pausado}
        aria-label={pausado ? "Retomar letreiro" : "Pausar letreiro"}
        className="z-10 min-w-11 shrink-0 bg-ink px-3 text-xs text-paper/80 transition-colors hover:text-paper"
      >
        <span aria-hidden="true">{pausado ? "▶" : "⏸"}</span>
      </button>

      <div className="overflow-hidden">
        <div
          className={`animate-ticker flex w-max whitespace-nowrap py-1.5 text-xs font-semibold uppercase tracking-widest hover:[animation-play-state:paused] ${
            pausado ? "[animation-play-state:paused]" : ""
          }`}
        >
          {/* Primeira cópia é a acessível (contém o link real do mapa) */}
          <span className="px-8">
            {prefixo}
            {conteudoLocal}
          </span>
          {/* Cópias decorativas para o loop contínuo */}
          <span className="px-8" aria-hidden="true">
            {texto}
          </span>
          <span className="px-8" aria-hidden="true">
            {texto}
          </span>
          <span className="px-8" aria-hidden="true">
            {texto}
          </span>
        </div>
      </div>
    </aside>
  );
}
