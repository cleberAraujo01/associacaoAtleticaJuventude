import Image from "next/image";
import Link from "next/link";
import { ChannelIcon } from "@/components/ui/ChannelIcon";
import { canais, links, nav, site } from "@/config/site";

/**
 * Rodapé sobre fundo de polígonos vermelhos com overlay escuro (gradiente ink)
 * para garantir legibilidade. Estrutura: 4 colunas de menus, brasão centralizado
 * e barra de copyright. Links com hover (sublinhado + branco pleno) e foco visível.
 * No mobile os menus somem (migram para o menu hambúrguer do header) e o rodapé
 * mostra apenas os brasões do clube e da FPFS + barra de copyright.
 */
export function Footer() {
  const linkClasse =
    "inline-flex items-center gap-2 text-sm text-paper/90 transition-colors hover:text-paper hover:underline underline-offset-4";

  // Título de coluna com o sublinhado vermelho grosso — mesma assinatura do
  // nav ativo do header e do "Juventude" na faixa de redes
  const tituloClasse =
    "inline-block text-sm font-bold uppercase tracking-widest text-paper underline decoration-red decoration-4 underline-offset-8";

  return (
    <footer className="relative border-t-4 border-red bg-red bg-[url('/fundo-footer.webp')] bg-cover bg-center text-paper">
      {/* Overlay — escurece o fundo e melhora o contraste do texto */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/70 to-ink/85"
      />

      {/* Conteúdo acima do overlay */}
      <div className="relative">
        {/* Menus: escondidos no mobile (os links migram para o menu hambúrguer
            do header) — no mobile o footer mostra só os brasões */}
        <div className="mx-auto hidden max-w-6xl grid-cols-2 gap-8 px-4 py-12 md:grid lg:grid-cols-4 lg:gap-10">
          {/* Páginas */}
          <nav aria-label="Rodapé">
            <h2 className={tituloClasse}>Páginas</h2>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClasse}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Canais — ícone + texto (reconhecimento visual) */}
          <div>
            <h2 className={tituloClasse}>Canais</h2>
            <ul className="mt-4 space-y-2.5">
              {canais.map((canal) => (
                <li key={canal.nome}>
                  <a
                    href={canal.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkClasse} ${canal.evento}`}
                  >
                    <ChannelIcon canal={canal.nome} />
                    {canal.nome}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Market — parcerias e apoio */}
          <nav aria-label="Market">
            <h2 className={tituloClasse}>Market</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/parceiros" className={linkClasse}>
                  Parceiros e apoiadores
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contato institucional */}
          <div>
            <h2 className={tituloClasse}>Contato</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/contato" className={linkClasse}>
                  Fale com a gente
                </Link>
              </li>
              <li>
                <a href={`mailto:${links.email}`} className={`${linkClasse} break-all`}>
                  {links.email}
                </a>
              </li>
              <li>
                <a
                  href={links.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClasse}
                >
                  {site.endereco}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Brasão do clube centralizado abaixo dos menus (a afiliação à FPFS
            aparece no selo do header) */}
        <div className="flex flex-col items-center gap-3 px-4 pb-10 pt-10 md:pt-0 lg:pb-12">
          <Image
            src="/brasao-footer.png"
            alt={`Brasão da ${site.nome}`}
            width={224}
            height={224}
            className="h-auto w-32 drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)] sm:w-44"
          />
          {/* Frase de fechamento própria — o slogan "Da base ao time" já mora
              na hero e no splash; repetir aqui seria a 3ª vez */}
          <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-paper/70">
            É aqui que as grandes histórias começam.
          </p>
        </div>

        <div className="border-t border-paper/15">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs">
            <p className="text-paper/80">
              © {new Date().getFullYear()} {site.nome}
            </p>
            {/* Âncora para o topo (id="topo" no header) — navegação em páginas longas */}
            <a
              href="#topo"
              className="group font-bold uppercase tracking-widest text-paper/90 transition-colors hover:text-paper"
            >
              Voltar ao topo{" "}
              <span
                aria-hidden="true"
                className="inline-block transition-transform group-hover:-translate-y-0.5"
              >
                ↑
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
