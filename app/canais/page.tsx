import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoGrid } from "@/components/video/VideoGrid";
import { canais, eventos, links, site } from "@/config/site";
import { getVideos } from "@/lib/content";

export const metadata: Metadata = {
  title: "Canais",
  description:
    "Acompanhe a AA Juventude nos canais oficiais: vídeos no YouTube, bastidores no Instagram e contato direto pelo WhatsApp.",
};

/**
 * /canais — SSG. Hub dos canais oficiais do clube.
 * 🧩 Soluções: o público já vive no Instagram/YouTube; esta página organiza as
 * saídas (todas rastreadas no Plausible) e concentra os vídeos do canal.
 * A lista de canais vem de config/site.ts (mesma fonte do mega menu do header).
 */
export default function CanaisPage() {
  const videos = getVideos();

  return (
    <>
      {/* Banner padrão das páginas internas (arte compartilhada do PageBanner) */}
      <PageBanner rotulo="Onde o clube acontece todo dia" titulo="Nossos canais">
        <p className="text-lg text-paper">
          A {site.nomeCurto} vive além da quadra: acompanhe os jogos, os bastidores e fale com a
          gente.
        </p>
      </PageBanner>

      {/* Cartões dos canais */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <ul className="grid gap-4 md:grid-cols-3">
          {canais.map((canal) => (
            <li key={canal.nome}>
              <a
                href={canal.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex h-full min-h-44 flex-col justify-between border-2 border-ink/10 bg-white p-6 transition-colors hover:border-red ${canal.evento}`}
              >
                <div>
                  <h2 className="font-display text-2xl uppercase">{canal.nome}</h2>
                  <p className="mt-2 text-sm text-ink/70">{canal.descricao}</p>
                </div>
                <p className="mt-4 text-sm font-bold uppercase tracking-widest text-red-ink underline underline-offset-4 group-hover:no-underline">
                  {canal.acao} →
                </p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Todos os vídeos do canal */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <SectionHeading rotulo="Direto do YouTube">Últimos vídeos</SectionHeading>
        <VideoGrid videos={videos} />
        <div className="mt-6">
          <a
            href={links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm font-bold uppercase tracking-widest text-red-ink underline underline-offset-4 hover:no-underline ${eventos.saidaYoutube}`}
          >
            Ver o canal completo →
          </a>
        </div>
      </section>

      {/* Ponte para a página de contato (o conteúdo completo vive em /contato) */}
      <section className="bg-red py-14 text-paper">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-display text-3xl uppercase md:text-left">
            Fale com a gente
          </h2>
          <p className="mt-2 max-w-xl text-white">
            WhatsApp para matrículas e apoio, e-mail para imprensa: tudo na página de contato.
          </p>
          <div className="mt-6">
            <CtaLink href="/contato" variante="claro">
              Ir para o contato
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
