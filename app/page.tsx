import { AthletePath } from "@/components/home/AthletePath";
import { Hero } from "@/components/home/Hero";
import { ProofGrid } from "@/components/home/ProofGrid";
import { RedesSociais } from "@/components/home/RedesSociais";
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

      {/* Faixa das redes sociais — entre a prova social e os vídeos */}
      <Reveal>
        <RedesSociais />
      </Reveal>

      {/* Vídeos do canal (facade — iframe só carrega no clique) */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-4 py-16">
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

      {/* Respiro visual antes dos patrocinadores: foto real do time em quadra
          (faixa do clube ao fundo) sob overlay escuro e o lema. A foto é
          quadrada — bg-position em 32% mira o corte na altura dos rostos. */}
      <Reveal>
        <section
          aria-label="Lema do clube"
          className="border-y-2 border-red bg-wine bg-[url('/time-em-quadra.webp')] bg-cover bg-[position:center_32%] text-paper"
        >
          {/* Faixa mais alta que o padrão de "respiro" (min-h-72/96): a foto é
              quadrada, e altura extra revela mais dela — menos sensação de zoom */}
          {/* Overlay vinho uniforme (texto centralizado pede escurecimento
              simétrico): o "vermelho escuro" da paleta dá o tom do clube */}
          <div className="flex min-h-72 items-center bg-wine/75 sm:min-h-96">
            <div className="mx-auto w-full max-w-6xl px-4 py-10 text-center">
              <p className="font-display text-3xl uppercase leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] sm:text-4xl">
                O futsal de Santana de Parnaíba tem{" "}
                <span className="underline decoration-red decoration-8 underline-offset-8">
                  nome e camisa
                </span>
                .
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <SupportCTA parceiros={parceiros} />
      </Reveal>
    </>
  );
}
