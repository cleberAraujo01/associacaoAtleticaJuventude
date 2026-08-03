"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/** Fotos oficiais das categorias que disputam a FPFS — /public/time-sub-*.webp */
const categorias = [
  { sub: "08", imagem: "/time-sub-08.webp" },
  { sub: "10", imagem: "/time-sub-10.webp" },
  { sub: "12", imagem: "/time-sub-12.webp" },
  { sub: "14", imagem: "/time-sub-14.webp" },
  { sub: "16", imagem: "/time-sub-16.webp" },
];

/**
 * Carrossel horizontal de largura cheia das categorias na Federação. O swipe é
 * o scroll nativo com snap (sem JS no gesto); um IntersectionObserver com
 * threshold alto marca o slide centralizado como ativo — escala/opacidade
 * cheias e o número gigante aceso — enquanto os vizinhos "espiam" nas laterais
 * menores e escurecidos. Setas (md:) e bolinhas fazem scrollIntoView suave.
 * Mantém a assinatura visual do clube: faixa vermelha com corte diagonal e
 * número de camisa em contorno.
 */
export function CarrosselCategorias() {
  const trilhoRef = useRef<HTMLUListElement>(null);
  const slidesRef = useRef<(HTMLLIElement | null)[]>([]);
  const [ativo, setAtivo] = useState(0);

  useEffect(() => {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    // Threshold alto: só o slide realmente centralizado (60%+ visível no
    // trilho) vira o ativo — os vizinhos que "espiam" não disparam.
    const observer = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            const indice = slidesRef.current.indexOf(entrada.target as HTMLLIElement);
            if (indice >= 0) setAtivo(indice);
          }
        }
      },
      { root: trilho, threshold: 0.6 },
    );
    for (const slide of slidesRef.current) {
      if (slide) observer.observe(slide);
    }
    return () => observer.disconnect();
  }, []);

  const irPara = (indice: number) => {
    const alvo = Math.min(Math.max(indice, 0), categorias.length - 1);
    slidesRef.current[alvo]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    // Sangria de largura cheia: escapa do max-w-6xl da página para o trilho
    // tocar as bordas da viewport — sensação de carrossel, não de card solto
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      <ul
        ref={trilhoRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-8"
      >
        {categorias.map((categoria, indice) => {
          const eAtivo = indice === ativo;
          return (
            <li
              key={categoria.sub}
              ref={(el) => {
                slidesRef.current[indice] = el;
              }}
              role="group"
              aria-label={`Sub-${categoria.sub}`}
              className={`group relative aspect-[16/10] w-[85%] shrink-0 snap-center overflow-hidden bg-ink transition-[transform,opacity] duration-500 ease-out lg:w-[60%] ${
                eAtivo ? "scale-100 opacity-100" : "scale-95 opacity-60"
              }`}
            >
              <Image
                src={categoria.imagem}
                alt={`Elenco Sub-${categoria.sub} da AA Juventude na Federação Paulista de Futsal`}
                fill
                sizes="(min-width: 1024px) 60vw, 85vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Vinheta de base: ancora o número e garante contraste da faixa */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent"
              />
              {/* Faixa vermelha com o corte diagonal do clube */}
              <div className="absolute left-0 top-4 bg-red py-1.5 pl-4 pr-8 [clip-path:polygon(0_0,100%_0,80%_100%,0_100%)] sm:top-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-paper">
                  Sub-{categoria.sub}
                </p>
              </div>
              {/* Número gigante em contorno — sempre presente em opacidade
                  baixa; acende no slide ativo (fonte principal no touch) e no
                  hover (reforço no desktop) */}
              <span
                aria-hidden="true"
                className={`font-display pointer-events-none absolute -bottom-5 right-1 text-[7rem] leading-none text-transparent transition-opacity duration-500 [-webkit-text-stroke:2px_var(--color-paper)] group-hover:opacity-100 sm:text-[9rem] ${
                  eAtivo ? "opacity-100" : "opacity-40"
                }`}
              >
                {categoria.sub}
              </span>
              {/* Barra vermelha de base — assina o slide ativo */}
              <span
                aria-hidden="true"
                className={`absolute bottom-0 left-0 h-1 w-full origin-left bg-red transition-transform duration-500 ease-out ${
                  eAtivo ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </li>
          );
        })}
      </ul>

      {/* Setas — só md: pra cima; no mobile o gesto é o swipe nativo */}
      <button
        type="button"
        aria-label="Categoria anterior"
        onClick={() => irPara(ativo - 1)}
        disabled={ativo === 0}
        className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg transition-all hover:bg-red hover:text-paper disabled:pointer-events-none disabled:opacity-0 md:flex"
      >
        <span aria-hidden="true" className="text-xl leading-none">
          ←
        </span>
      </button>
      <button
        type="button"
        aria-label="Próxima categoria"
        onClick={() => irPara(ativo + 1)}
        disabled={ativo === categorias.length - 1}
        className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg transition-all hover:bg-red hover:text-paper disabled:pointer-events-none disabled:opacity-0 md:flex"
      >
        <span aria-hidden="true" className="text-xl leading-none">
          →
        </span>
      </button>

      {/* Abas de categoria — no lugar das bolinhas: chips com o corte
          diagonal do clube, clicáveis, com o contador da rodada ao lado */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 px-4">
        {categorias.map((categoria, indice) => (
          <button
            key={categoria.sub}
            type="button"
            aria-label={`Ir para a categoria Sub-${categoria.sub}`}
            aria-current={indice === ativo}
            onClick={() => irPara(indice)}
            className={`px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 [clip-path:polygon(8%_0,100%_0,92%_100%,0_100%)] ${
              indice === ativo
                ? "bg-red text-paper"
                : "bg-ink/10 text-ink/60 hover:bg-ink/20 hover:text-ink"
            }`}
          >
            Sub-{categoria.sub}
          </button>
        ))}
        {/* Contador estilo placar — reforça a sensação de galeria */}
        <span aria-hidden="true" className="ml-2 font-display text-sm tracking-widest text-ink/40">
          {String(ativo + 1).padStart(2, "0")}/{String(categorias.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
