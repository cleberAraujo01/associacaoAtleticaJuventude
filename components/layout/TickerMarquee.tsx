"use client";

import { useState } from "react";

interface TickerMarqueeProps {
  /** Texto do letreiro sem o local (ex.: "Juventude x Rival · 08/08 · 19h · "). */
  prefixo: string;
  /** Nome do ginásio/local do jogo. */
  local: string;
  /** Link para o local no mapa (ausente enquanto o endereço for placeholder). */
  mapaUrl?: string;
  /** Mensagens adicionais no giro (ex.: último resultado). */
  extras?: string[];
}

/**
 * Letreiro de "matchday" no padrão de placar esportivo: selo vermelho fixo
 * "Próximo jogo" com ponto pulsante (linguagem de transmissão ao vivo) e o
 * confronto rolando ao lado, com "///" como separador gráfico.
 * Controle de pausa (WCAG 2.2.2) na ponta direita; hover também pausa, o que
 * torna o link do mapa clicável. prefers-reduced-motion desativa animações.
 */
export function TickerMarquee({ prefixo, local, mapaUrl, extras = [] }: TickerMarqueeProps) {
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

  // Sequência completa de um "giro": confronto + mensagens extras
  const texto = `${prefixo}${local}`;
  const giro = [texto, ...extras];

  // Separador gráfico entre as repetições — grafismo de placar, não pontuação
  const separador = (
    <span aria-hidden="true" className="px-6 font-display text-red">
      {"///"}
    </span>
  );

  return (
    <aside aria-label="Próximo jogo do time" className="flex items-stretch bg-ink text-paper">
      {/* Selo fixo — não rola junto: quem bate o olho sabe do que se trata.
          bg-red-ink (não red): texto de 10px sobre red puro fica abaixo do
          contraste AA de 4.5:1 — o vermelho-tinta passa com folga. */}
      <p className="z-10 flex shrink-0 items-center gap-2 bg-red-ink px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-paper">
        {/* Ponto pulsante, linguagem de "ao vivo" (some com reduced-motion) */}
        <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-paper opacity-75 motion-reduce:hidden" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-paper" />
        </span>
        Próximo jogo
      </p>

      {/* Máscara de esmaecimento nas bordas — o texto "nasce" e "morre" em
          fade, em vez de cortar seco no selo e no botão */}
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_1.5rem,black_calc(100%-1.5rem),transparent)]">
        <div
          className={`animate-ticker flex w-max items-center whitespace-nowrap py-1.5 text-xs font-semibold uppercase tracking-widest hover:[animation-play-state:paused] ${
            pausado ? "[animation-play-state:paused]" : ""
          }`}
        >
          {/* Primeira cópia é a acessível (contém o link real do mapa) */}
          <span className="pl-6">
            {prefixo}
            {conteudoLocal}
          </span>
          {extras.map((extra) => (
            <span key={extra} className="flex items-center">
              {separador}
              <span>{extra}</span>
            </span>
          ))}
          {separador}
          {/* Cópias decorativas para o loop contínuo */}
          {[1, 2, 3].map((copia) => (
            <span key={copia} aria-hidden="true" className="flex items-center">
              {giro.map((mensagem) => (
                <span key={mensagem} className="flex items-center">
                  <span>{mensagem}</span>
                  {separador}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Controle de pausa — área de toque mínima de 44px na horizontal */}
      <button
        type="button"
        onClick={() => setPausado((p) => !p)}
        aria-pressed={pausado}
        aria-label={pausado ? "Retomar letreiro" : "Pausar letreiro"}
        className="z-10 ml-auto min-w-11 shrink-0 bg-ink px-3 text-xs text-paper/60 transition-colors hover:text-paper"
      >
        <span aria-hidden="true">{pausado ? "▶" : "⏸"}</span>
      </button>
    </aside>
  );
}
