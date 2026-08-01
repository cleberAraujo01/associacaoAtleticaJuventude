"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChannelIcon } from "@/components/ui/ChannelIcon";
import { canais, nav, navExtra, site } from "@/config/site";

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

  // Na home o header começa transparente sobre o banner da hero (a mesma
  // imagem preenche header + hero) e ganha o fundo sólido ao rolar.
  const [rolou, setRolou] = useState(false);
  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 16);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // Sólido sempre que houver menu aberto (legibilidade) ou fora do topo da home
  const transparente = pathname === "/" && !rolou && !aberto && !canaisAberto;

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-40 border-b-2 text-paper transition-colors duration-300 ${
        transparente
          ? "border-transparent bg-transparent"
          : "border-red bg-red bg-[url('/fundo-poligonos.webp')] bg-cover bg-center"
      }`}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setCanaisAberto(false);
          setAberto(false);
        }
      }}
      // Fecha ao sair do header inteiro — permite mover o mouse do item até o painel
      onMouseLeave={() => setCanaisAberto(false)}
    >
      {/* Overlay — escurece o fundo de polígonos e melhora o contraste (par do footer);
          some junto com o fundo quando o header está transparente sobre a hero */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-gradient-to-b from-ink/35 to-ink/55 transition-opacity duration-300 ${
          transparente ? "opacity-0" : "opacity-100"
        }`}
      />

      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-6">
        <Link
          href="/"
          className="flex items-center gap-3 font-display text-2xl uppercase leading-none tracking-wide text-paper transition-opacity hover:opacity-80 sm:text-3xl"
        >
          {/* Brasão: posicionado absoluto para vazar a borda inferior do header
              (metade dentro, metade fora). O span reserva o espaço no fluxo. */}
          <Image
            src="/brasao.webp"
            alt=""
            width={120}
            height={120}
            priority
            className="absolute top-4 z-50 h-24 w-24 rounded-full bg-white p-1.5 drop-shadow-lg sm:h-32 sm:w-32"
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
          className="ml-3 mr-auto h-11 w-auto drop-shadow-md sm:h-12"
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
                      <span
                        aria-hidden="true"
                        className={`ml-1 inline-block text-xs transition-transform duration-200 motion-reduce:transition-none ${
                          canaisAberto ? "rotate-180" : ""
                        }`}
                      >
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
          className="menu-entrada absolute inset-x-0 top-full hidden border-b-2 border-red bg-white text-ink shadow-lg md:block"
          onBlur={(e) => {
            // Fecha quando o foco de teclado sai do painel
            if (!e.currentTarget.contains(e.relatedTarget)) setCanaisAberto(false);
          }}
        >
          {/* pl-56 desloca as colunas para a direita da zona do brasão (que vaza
              o header); py maior dá mais respiro ao painel */}
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-3 md:pl-56">
            {canais.map((canal) => (
              <a
                key={canal.nome}
                href={canal.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-start gap-4 ${canal.evento}`}
              >
                {/* Ícone em disco vermelho — assinatura visual, sem barra lateral */}
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red text-paper transition-colors group-hover:bg-red-ink">
                  <ChannelIcon canal={canal.nome} className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-base uppercase leading-tight">
                    {canal.nome}
                  </span>
                  <span className="mt-1 block text-sm text-ink/70">{canal.descricao}</span>
                  <span className="mt-2 block text-xs font-bold uppercase tracking-widest text-red-ink">
                    {canal.acao}{" "}
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                    >
                      →
                    </span>
                  </span>
                </span>
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
          className="menu-entrada relative border-t border-paper/20 md:hidden"
        >
          <ul className="flex flex-col divide-y divide-paper/10 px-4 py-2">
            {nav.map((item) => {
              const ativo = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={ativo ? "page" : undefined}
                    className={`block py-3.5 text-base font-semibold uppercase tracking-wide text-paper decoration-red decoration-4 underline-offset-8 transition-colors hover:underline ${
                      ativo ? "underline" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Links secundários (vindos do footer, escondido no mobile):
              apoio, parceiros e contato — estilo mais discreto que o nav principal */}
          <ul className="flex flex-col divide-y divide-paper/10 border-t border-paper/20 px-4 py-2">
            {navExtra.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="block py-3 text-sm font-semibold uppercase tracking-wide text-paper/85 transition-colors hover:text-paper"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Acesso direto às redes no mobile — ícones em disco, mesma
              assinatura do mega menu desktop */}
          <ul className="flex items-center gap-4 border-t border-paper/20 px-4 py-4">
            {canais.map((canal) => (
              <li key={canal.nome}>
                <a
                  href={canal.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Abrir ${canal.nome} da ${site.nomeCurto} em nova aba`}
                  className={`flex h-11 w-11 items-center justify-center rounded-full bg-paper/15 text-paper transition-colors hover:bg-red focus-visible:outline-paper ${canal.evento}`}
                >
                  <ChannelIcon canal={canal.nome} className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
