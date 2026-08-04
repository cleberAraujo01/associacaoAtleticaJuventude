"use client";

import { useState } from "react";
import { links, site } from "@/config/site";

/**
 * Mapa do clube com carregamento sob demanda (fachada): o embed do Google
 * Maps puxa ~450 KB de JS de terceiros, então o iframe só entra quando o
 * visitante pede. Antes disso, um cartão leve com a ação de carregar e o
 * atalho direto para o app do Maps.
 */
export function MapaLocal() {
  const [carregado, setCarregado] = useState(false);

  if (carregado) {
    return (
      <iframe
        src={links.mapsEmbed}
        title={`Mapa de ${site.nome}`}
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="h-80 w-full rounded-xl grayscale"
      />
    );
  }

  return (
    <div className="flex h-80 w-full flex-col items-center justify-center gap-4 rounded-xl bg-paper px-6 text-center">
      {/* Pino de mapa no disco vermelho — mesma linguagem dos atalhos da página */}
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red text-paper">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 21s-7-5.4-7-11a7 7 0 1 1 14 0c0 5.6-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      </span>
      <p className="max-w-xs text-sm text-ink/70">
        O mapa do Google carrega aqui quando você quiser ver a quadra de perto.
      </p>
      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={() => setCarregado(true)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-red px-6 py-3 text-sm font-bold uppercase tracking-widest text-white shadow-md transition-all hover:bg-red-ink hover:shadow-lg"
        >
          Carregar mapa
        </button>
        <a
          href={links.maps}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold uppercase tracking-widest text-red-ink underline underline-offset-4 hover:no-underline"
        >
          Abrir no app do Google Maps ↗
        </a>
      </div>
    </div>
  );
}
