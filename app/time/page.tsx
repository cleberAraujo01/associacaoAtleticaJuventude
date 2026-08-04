import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/layout/PageBanner";
import { CarrosselCategorias } from "@/components/time/CarrosselCategorias";
import { MatchCard } from "@/components/time/MatchCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoGrid } from "@/components/video/VideoGrid";
import { eventos, links } from "@/config/site";
import { getProximosJogos, getResultados, getVideos } from "@/lib/content";

export const metadata: Metadata = {
  title: "Time Sub-18",
  description:
    "O time Sub-18 da AA Juventude na FPFS: próximos jogos, resultados e o elenco, com atletas formados na própria base.",
};

/**
 * /time — SSG. Conteúdo vive no repo: atualizar um jogo = editar content/jogos.ts
 * e commitar → a Vercel rebuilda. (ISR só seria necessário com CMS externo;
 * a data layer abstraída deixa essa migração barata.)
 */
export default function TimePage() {
  const proximos = getProximosJogos();
  const resultados = getResultados();
  const videosDoTime = getVideos()
    .filter((v) => v.estagio === "time")
    .slice(0, 3);

  return (
    <>
      {/* Banner padrão das páginas internas (arte compartilhada do PageBanner) */}
      <PageBanner rotulo="Estágio 03 · Competição · FPFS" titulo="O time de Santana de Parnaíba">
        <p className="text-lg text-paper">
          Elenco Sub-18 na Federação Paulista de Futsal, com atletas formados na nossa própria
          base.
        </p>
      </PageBanner>

      {/* Agenda de jogos */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading rotulo="Agenda">Próximos jogos</SectionHeading>
        {proximos.length > 0 ? (
          <ul className="grid gap-4 md:grid-cols-2">
            {proximos.map((jogo) => (
              <li key={jogo.id}>
                <MatchCard jogo={jogo} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-ink/70">Agenda em atualização — acompanhe pelo Instagram.</p>
        )}
      </section>

      {/* Resultados */}
      {resultados.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <SectionHeading rotulo="Campanha">Últimos resultados</SectionHeading>
          <ul className="grid gap-4 md:grid-cols-2">
            {resultados.map((jogo) => (
              <li key={jogo.id}>
                <MatchCard jogo={jogo} passado />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Fotos oficiais das categorias que disputam a Federação — carrossel
          de largura cheia com snap nativo (o componente escapa do max-w-6xl) */}
      <section className="overflow-hidden pb-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading rotulo="Federação Paulista de Futsal">
            As categorias que vestem o manto
          </SectionHeading>
        </div>
        <CarrosselCategorias />
      </section>

      {/* Vídeos do time */}
      {videosDoTime.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <SectionHeading rotulo="Na quadra">Vídeos do time</SectionHeading>
          <VideoGrid videos={videosDoTime} />
          <div className="mt-6">
            <a
              href={links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-bold uppercase tracking-widest text-red-ink underline underline-offset-4 hover:no-underline ${eventos.saidaYoutube}`}
            >
              Ver todos no YouTube →
            </a>
          </div>
        </section>
      )}

      {/* Ponte de volta para a base */}
      <section className="bg-red py-14 text-paper">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-display text-3xl uppercase md:text-left">
            Todo elenco começa em algum lugar
          </h2>
          <p className="mt-2 max-w-xl text-white">
            O nosso começa na escolinha. Matricule quem você ama e faça parte dessa jornada.
          </p>
          <div className="mt-6">
            <Link
              href="/escolinha"
              className={`text-sm font-bold uppercase tracking-widest text-white underline underline-offset-4 hover:no-underline ${eventos.ponteBaseTime}`}
            >
              Conhecer a escolinha →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
