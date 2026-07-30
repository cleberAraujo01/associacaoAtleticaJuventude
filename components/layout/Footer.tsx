import Image from "next/image";
import Link from "next/link";
import { ChannelIcon } from "@/components/ui/ChannelIcon";
import { canais, links, nav, site } from "@/config/site";

/**
 * Rodapé sobre fundo de polígonos vermelhos com overlay escuro (gradiente ink)
 * para garantir legibilidade. Estrutura: 4 colunas de menus, brasão centralizado
 * e barra de copyright. Links com hover (sublinhado + branco pleno) e foco visível.
 */
export function Footer() {
  const linkClasse =
    "inline-flex items-center gap-2 text-sm text-paper/90 transition-colors hover:text-paper hover:underline underline-offset-4";

  const tituloClasse = "text-sm font-bold uppercase tracking-widest text-paper";

  return (
    <footer className="relative border-t-4 border-red bg-red bg-[url('/fundo-footer.webp')] bg-cover bg-center text-paper">
      {/* Overlay — escurece o fundo e melhora o contraste do texto */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/70 to-ink/85"
      />

      {/* Conteúdo acima do overlay */}
      <div className="relative">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
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
              <li>
                <Link href="/apoie" className={linkClasse}>
                  Apoie o clube
                </Link>
              </li>
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
                <a href={`mailto:${links.email}`} className={linkClasse}>
                  {links.email}
                </a>
              </li>
              {/* TODO: conteúdo pendente — endereço do ginásio/sede */}
              <li className="text-sm text-paper/80">[Endereço a coletar] — {site.cidade}</li>
            </ul>
          </div>
        </div>

        {/* Brasões centralizados abaixo dos menus: clube + afiliação à FPFS */}
        <div className="flex flex-col items-center gap-3 px-4 pb-12">
          <div className="flex items-center justify-center gap-8 sm:gap-12">
            <Image
              src="/brasao-footer.png"
              alt={`Brasão da ${site.nome}`}
              width={180}
              height={180}
              className="h-auto w-36 drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)] sm:w-44"
            />
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/brasao-fpfs.webp"
                alt="Brasão da Federação Paulista de Futsal"
                width={140}
                height={140}
                className="h-auto w-32 drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)] sm:w-40"
              />
              <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-paper/70">
                Filiado à FPFS
              </p>
            </div>
          </div>
          <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-paper/70">
            Da base ao time. Uma só jornada.
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
              className="font-bold uppercase tracking-widest text-paper/90 transition-colors hover:text-paper hover:underline underline-offset-4"
            >
              Voltar ao topo ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
