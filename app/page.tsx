import { AthletePath } from "@/components/home/AthletePath";
import { Hero } from "@/components/home/Hero";
import { ProofGrid } from "@/components/home/ProofGrid";
import { SupportCTA } from "@/components/home/SupportCTA";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoGrid } from "@/components/video/VideoGrid";
import { eventos, links } from "@/config/site";
import { getAtletasDaBase, getDepoimentosDaPonte, getParceiros, getVideos } from "@/lib/content";

/**
 * HOME — página estática (SSG). A composição segue a jornada do projeto de UX:
 * Hero (tese) → trajeto 01→02→03 (com CTAs por estágio) → prova social → vídeos → apoio.
 * Todos os dados vêm da data layer (lib/content) — nada hardcoded na UI.
 */
export default function HomePage() {
  const atletasDaBase = getAtletasDaBase();
  const depoimentos = getDepoimentosDaPonte().slice(0, 2);
  const videos = getVideos().slice(0, 3);
  const parceiros = getParceiros();

  return (
    <>
      <Hero />

      {/* Reveal: cada seção surge com fade + deslize ao entrar na viewport */}
      <Reveal>
        <AthletePath />
      </Reveal>

      <Reveal>
        <ProofGrid atletasDaBase={atletasDaBase} depoimentos={depoimentos} />
      </Reveal>

      {/* Vídeos do canal (facade — iframe só carrega no clique) */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <SectionHeading rotulo="Na quadra">Vídeos do clube</SectionHeading>
          <VideoGrid videos={videos} />
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
      </Reveal>

      <Reveal>
        <SupportCTA parceiros={parceiros} />
      </Reveal>
    </>
  );
}
