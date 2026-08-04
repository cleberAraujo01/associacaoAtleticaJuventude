"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Splash de abertura: brasão + lema sobre fundo ink, uma vez por sessão.
 *
 * Quem decide se o splash aparece é um script inline no <head> (app/layout.tsx),
 * que seta html[data-splash="1"] ANTES do primeiro paint quando:
 *  - é a primeira página da sessão (sessionStorage sem a marca), e
 *  - o usuário não pediu menos movimento (prefers-reduced-motion).
 * Sem o atributo, o CSS mantém o overlay com display:none — nada pisca.
 *
 * Este componente só cuida do fim: marca a sessão, espera a coreografia do CSS
 * terminar e desmonta o overlay. aria-hidden: é pura abertura visual, leitores
 * de tela vão direto ao conteúdo.
 */
export function SplashIntro() {
  const [ativo, setAtivo] = useState(true);

  useEffect(() => {
    if (document.documentElement.dataset.splash !== "1") {
      setAtivo(false);
      return;
    }
    try {
      sessionStorage.setItem("aja-splash", "1");
    } catch {
      // sessionStorage indisponível (modo privado antigo): splash roda mesmo assim
    }
    const timer = setTimeout(() => {
      delete document.documentElement.dataset.splash;
      setAtivo(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  if (!ativo) return null;

  return (
    <div aria-hidden="true" className="splash-intro">
      {/* Brasão do footer: versão preparada para fundo escuro */}
      <Image
        src="/brasao-footer.png"
        alt=""
        width={224}
        height={224}
        priority
        sizes="(min-width: 640px) 11rem, 9rem"
        className="splash-intro__brasao h-auto w-36 drop-shadow-[0_8px_32px_rgba(0,0,0,0.6)] sm:w-44"
      />
      {/* Traço vermelho que cresce — mesma assinatura do sublinhado do site */}
      <span className="splash-intro__linha" />
      <p className="splash-intro__frase text-xs font-bold uppercase tracking-[0.3em] text-paper/85">
        Da base ao time. Uma só jornada.
      </p>
    </div>
  );
}
