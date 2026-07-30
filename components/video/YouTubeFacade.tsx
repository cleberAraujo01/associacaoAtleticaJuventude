"use client";

import Image from "next/image";
import { useState } from "react";

interface YouTubeFacadeProps {
  youtubeId: string;
  titulo: string;
  /** Conteúdo sobreposto à thumbnail (ex.: título/selo) — some quando o player carrega. */
  overlay?: React.ReactNode;
}

/**
 * Facade do YouTube: mostra só a thumbnail (via next/image) e um botão de play.
 * O iframe (~500KB de JS do player) só carrega quando o usuário clica.
 * Decisão de performance: protege o LCP num público majoritariamente mobile/3-4G.
 */
export function YouTubeFacade({ youtubeId, titulo, overlay }: YouTubeFacadeProps) {
  const [ativo, setAtivo] = useState(false);

  if (ativo) {
    return (
      <div className="relative aspect-video w-full bg-ink">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          title={titulo}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setAtivo(true)}
      className="group relative block aspect-video w-full overflow-hidden bg-ink"
      aria-label={`Assistir: ${titulo}`}
    >
      <Image
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt="" /* decorativa: o botão já tem aria-label com o título */
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
      />
      {/* Botão de play */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red text-paper transition-transform group-hover:scale-110"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M6 4l10 6-10 6V4z" />
        </svg>
      </span>
      {overlay}
    </button>
  );
}
