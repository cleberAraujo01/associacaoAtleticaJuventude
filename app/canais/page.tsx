import type { Metadata } from "next";
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
      <section className="bg-wine text-paper">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-paper/80">
            Onde o clube acontece todo dia
          </p>
          <h1 className="font-display max-w-2xl text-4xl uppercase leading-tight sm:text-6xl">
            Nossos canais
          </h1>
          <p className="mt-4 max-w-xl text-lg text-paper/80">
            A {site.nomeCurto} vive além da quadra: acompanhe os jogos, os bastidores e fale com a
            gente.
          </p>
        </div>
      </section>

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

      {/* Contato e endereço (absorvido da antiga página /contato) */}
      <section className="bg-red py-14 text-paper">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl uppercase">Fale com a gente</h2>
          <p className="mt-2 max-w-xl text-paper/90">
            O jeito mais rápido é o WhatsApp — respondemos matrículas, apoio e imprensa.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <CtaLink
              href={links.whatsappMatricula}
              variante="vermelho"
              evento={`${eventos.ctaMatricula} ${eventos.saidaWhatsapp}`}
              externo
            >
              Matrícula — WhatsApp
            </CtaLink>
            <CtaLink
              href={links.whatsappApoio}
              variante="claro"
              evento={eventos.saidaWhatsapp}
              externo
            >
              Outros assuntos
            </CtaLink>
          </div>
          {/* TODO: conteúdo pendente — endereço do ginásio/sede e horários de atendimento */}
          <p className="mt-8 text-sm text-paper/80">
            <strong className="font-bold uppercase tracking-wide">Onde estamos: </strong>
            [Endereço e horários a coletar com o clube] — {site.cidade}.
          </p>
        </div>
      </section>
    </>
  );
}
