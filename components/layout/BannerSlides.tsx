"use client";

import { useEffect, useState } from "react";

interface BannerSlidesProps {
  /** Caminhos das imagens em /public, na ordem de exibição. */
  imagens: string[];
  /** background-position das imagens (ex.: "center 25%"). */
  posicao?: string;
  /** Tempo de cada slide em ms. */
  intervalo?: number;
}

/**
 * Camada de fundo do PageBanner em modo slideshow: as imagens ficam empilhadas
 * e trocam por crossfade lento (transição de opacity), mantendo o hero-zoom
 * apenas no slide ativo — mesma linguagem do banner estático. Com
 * prefers-reduced-motion, fica parado na primeira imagem.
 */
export function BannerSlides({ imagens, posicao = "center", intervalo = 6000 }: BannerSlidesProps) {
  const [ativo, setAtivo] = useState(0);

  useEffect(() => {
    if (imagens.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setAtivo((atual) => (atual + 1) % imagens.length);
    }, intervalo);
    return () => clearInterval(id);
  }, [imagens.length, intervalo]);

  return (
    <div aria-hidden="true" className="absolute inset-0">
      {imagens.map((imagem, indice) => (
        <div
          key={imagem}
          className={`absolute inset-0 bg-cover transition-opacity duration-[1500ms] ease-in-out ${
            indice === ativo ? "hero-zoom opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url('${imagem}')`, backgroundPosition: posicao }}
        />
      ))}
    </div>
  );
}
