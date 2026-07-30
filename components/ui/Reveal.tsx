"use client";

import { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  /** Atraso em ms antes de revelar (para escalonar itens irmãos). */
  atraso?: number;
}

/**
 * Revela o conteúdo com fade + deslize quando entra na viewport.
 * Anima uma única vez (não re-esconde ao rolar de volta).
 * prefers-reduced-motion desativa a transição (globals.css) — o conteúdo
 * permanece sempre visível para quem usa essa preferência.
 */
export function Reveal({ children, atraso = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisivel(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visivel ? "reveal-visivel" : ""}`}
      style={atraso ? { transitionDelay: `${atraso}ms` } : undefined}
    >
      {children}
    </div>
  );
}
