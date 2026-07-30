"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { canais, nav, site } from "@/config/site";

/**
 * Client Component: interatividade do layout (menu mobile + mega menu Canais).
 *
 * Mega menu "Canais" (só desktop):
 *  - abre no hover E no foco de teclado (não é hover-only — WCAG 2.2);
 *  - fecha com Esc, ao sair com o mouse ou ao perder o foco;
 *  - o clique em "Canais" continua navegando para /canais (fallback touch/teclado).
 * No mobile o item permanece um link simples — hover não existe em touch.
 */
export function Header() {
  const [aberto, setAberto] = useState(false);
  const [canaisAberto, setCanaisAberto] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  // Fecha os menus ao trocar de rota (evita menu aberto "fantasma").
  useEffect(() => {
    setAberto(false);
    setCanaisAberto(false);
  }, [pathname]);

  // Fecha o menu mobile ao tocar/clicar fora do header.
  useEffect(() => {
    if (!aberto) return;
    const fecharSeFora = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setAberto(false);
      }
    };
    document.addEventListener("pointerdown", fecharSeFora);
    return () => document.removeEventListener("pointerdown", fecharSeFora);
  }, [aberto]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 border-b-2 border-red bg-red bg-[url('/fundo-poligonos.webp')] bg-cover bg-center text-paper"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setCanaisAberto(false);
          setAberto(false);
        }
      }}
      // Fecha ao sair do header inteiro — permite mover o mouse do item até o painel
      onMouseLeave={() => setCanaisAberto(false)}
    >
      {/* Overlay — escurece o fundo de polígonos e melhora o contraste (par do footer) */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-ink/35 to-ink/55" />

      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-6">
        <Link
          href="/"
          className="flex items-center gap-3 font-display text-xl uppercase leading-none tracking-wide text-paper transition-opacity hover:opacity-80"
        >
          {/* Brasão: posicionado absoluto para vazar a borda inferior do header
              (metade dentro, metade fora). O span reserva o espaço no fluxo. */}
          <Image
            src="/brasao.webp"
            alt=""
            width={120}
            height={120}
            priority
            className="absolute top-1 z-50 h-24 w-24 rounded-full bg-white p-1.5 drop-shadow-lg sm:h-32 sm:w-32"
          />
          <span aria-hidden="true" className="w-24 sm:w-32" />
          {site.nomeCurto}
        </Link>

        {/* Selo de afiliação à FPFS ao lado do logo */}
        <Image
          src="/brasao-fpfs.webp"
          alt="Filiado à Federação Paulista de Futsal"
          title="Filiado à FPFS"
          width={40}
          height={40}
          className="ml-2 mr-auto h-9 w-auto drop-shadow-md sm:h-10"
        />

        {/* Navegação desktop */}
        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex gap-6">
            {nav.map((item) => {
              const ativo = pathname === item.href;
              const ehCanais = item.href === "/canais";
              // Item ativo: sublinhado vermelho grosso (texto segue branco — contraste
              // sobre o header escuro); hover replica o mesmo sublinhado.
              const classe = `text-sm font-semibold uppercase tracking-wide text-paper decoration-red decoration-4 underline-offset-8 transition-colors hover:underline ${
                ativo ? "underline" : ""
              }`;

              // Item "Canais": gatilho do mega menu (hover + foco)
              if (ehCanais) {
                return (
                  <li key={item.href} onMouseEnter={() => setCanaisAberto(true)}>
                    <Link
                      href={item.href}
                      aria-current={ativo ? "page" : undefined}
                      aria-expanded={canaisAberto}
                      onFocus={() => setCanaisAberto(true)}
                      className={classe}
                    >
                      {item.label}
                      <span aria-hidden="true" className="ml-1 text-xs">
                        ▾
                      </span>
                    </Link>
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={ativo ? "page" : undefined}
                    className={classe}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Botão do menu mobile */}
        {/* min 44x44px de área de toque (WCAG 2.5.8); Enter/Espaço nativos do <button> */}
        <button
          type="button"
          className="flex min-h-11 min-w-11 items-center justify-center md:hidden"
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          onClick={() => setAberto((v) => !v)}
        >
          <span className="sr-only">{aberto ? "Fechar menu" : "Abrir menu"}</span>
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="none">
            {aberto ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.5" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mega menu Canais — painel na largura total do header (só desktop) */}
      {canaisAberto && (
        <div
          className="absolute inset-x-0 top-full hidden border-b-2 border-red bg-ink text-paper shadow-lg md:block"
          onBlur={(e) => {
            // Fecha quando o foco de teclado sai do painel
            if (!e.currentTarget.contains(e.relatedTarget)) setCanaisAberto(false);
          }}
        >
          {/* pl-56 desloca as colunas para a direita da zona do brasão (que vaza
              o header); py maior dá mais respiro ao painel */}
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3 md:pl-56">
            {canais.map((canal) => (
              <a
                key={canal.nome}
                href={canal.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group border-l-4 border-red pl-4 ${canal.evento}`}
              >
                <p className="font-display text-xl uppercase transition-opacity group-hover:opacity-80">
                  {canal.nome}
                </p>
                <p className="mt-1 text-sm text-paper/70">{canal.descricao}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-paper underline decoration-red decoration-2 underline-offset-4 group-hover:no-underline">
                  {canal.acao} →
                </p>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Navegação mobile */}
      {aberto && (
        <nav
          id="menu-mobile"
          aria-label="Principal"
          className="relative border-t border-paper/20 md:hidden"
        >
          <ul className="flex flex-col px-4 py-2">
            {nav.map((item) => {
              const ativo = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={ativo ? "page" : undefined}
                    className={`block py-3 text-base font-semibold uppercase tracking-wide text-paper decoration-red decoration-4 underline-offset-8 transition-colors hover:underline ${
                      ativo ? "underline" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
