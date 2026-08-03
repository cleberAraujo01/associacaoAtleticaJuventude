import { AthletePath } from "@/components/home/AthletePath";
import { ChannelIcon } from "@/components/ui/ChannelIcon";
import { CtaLink } from "@/components/ui/CtaLink";
import { FeatureStrip } from "@/components/home/FeatureStrip";
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

      {/* Faixa própria dos 4 selos (antes dentro da hero): respiro claro entre
          o banner escuro e a seção vinho do trajeto */}
      <FeatureStrip />

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
        {/* py-24: mais respiro entre as faixas escuras vizinhas (redes/lema) */}
        <section className="mx-auto max-w-6xl px-4 py-24" aria-label="Vídeos do clube">
          {/* Cabeçalho em duas colunas: título + apoio à esquerda, CTA do canal à direita */}
          <div className="flex flex-wrap items-end justify-center gap-x-8 gap-y-4 md:justify-between">
            <div>
              <SectionHeading rotulo="Na quadra">Vídeos do clube</SectionHeading>
              <p className="-mt-4 mb-8 max-w-xl text-center text-ink/70 md:text-left">
                Amistosos, festivais e o dia a dia da escolinha, direto do nosso canal.
              </p>
            </div>
            <a
              href={links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className={`group mb-8 inline-flex items-center gap-2.5 rounded-full bg-red px-6 py-3 text-xs font-bold uppercase tracking-widest text-paper transition-colors hover:bg-red-ink ${eventos.saidaYoutube}`}
            >
              <ChannelIcon canal="YouTube" className="h-4 w-4" />
              Ver todos no YouTube
              <span
                aria-hidden="true"
                className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
              >
                →
              </span>
            </a>
          </div>
          <VideoGrid videos={videos} />
        </section>
      </Reveal>

      {/* Respiro visual antes dos patrocinadores: arte do atleta de costas com
          a camisa AA Juventude — ilustra o lema ("nome e camisa") ao pé da letra.
          SEM <Reveal>: o transform da animação criaria um containing block e
          quebraria o background-attachment: fixed (a foto voltaria a rolar). */}
      <section
        aria-label="Lema do clube"
        className="bg-wine bg-[url('/lema-camisa.webp')] bg-cover bg-center bg-fixed text-paper"
      >
        {/* bg-fixed: a foto fica parada enquanto a página rola — efeito de
            "janela" para a quadra, em todos os tamanhos. Exceção: iOS Safari
            ignora background-attachment: fixed e rola normalmente. */}
        <div className="flex min-h-72 items-center sm:min-h-96">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-paper/80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              Santana de Parnaíba/SP
            </p>
            {/* "essa camisa" com sublinhado vermelho (não texto vermelho): red
                sobre a foto escura não alcança contraste AA — o acento fica no
                traço, o texto segue paper */}
            <p className="mt-3 font-display text-3xl uppercase leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-5xl">
              O futsal daqui tem nome.
              <span className="block">
                E veste{" "}
                <span className="underline decoration-red decoration-4 underline-offset-8">
                  essa camisa
                </span>
                .
              </span>
            </p>
            {/* A faixa agora tem função: convite direto para a escolinha
                (o convite de parceria mora na seção logo abaixo) */}
            <div className="mt-8 flex justify-center">
              <CtaLink href="/escolinha" variante="claro">
                Conheça a escolinha
              </CtaLink>
            </div>
          </div>
        </div>
      </section>

      <Reveal>
        <SupportCTA parceiros={parceiros} />
      </Reveal>
    </>
  );
}
