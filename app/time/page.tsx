import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoGrid } from "@/components/video/VideoGrid";
import { eventos, links } from "@/config/site";
import {
  formatarData,
  getAtletas,
  getProximosJogos,
  getResultados,
  getVideos,
} from "@/lib/content";

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
  const elenco = getAtletas();
  const videosDoTime = getVideos()
    .filter((v) => v.estagio === "time")
    .slice(0, 3);

  return (
    <>
      {/* Cabeçalho da trilha — fundo vinho (secundário da paleta) */}
      <section className="bg-wine text-paper">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-8 px-4 py-14">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-paper/80">
              Estágio 03 · Competição · FPFS
            </p>
            <h1 className="font-display max-w-2xl text-4xl uppercase leading-tight sm:text-6xl">
              O time de Santana de Parnaíba
            </h1>
            <p className="mt-4 max-w-xl text-lg text-paper/80">
              Elenco Sub-18 na Federação Paulista de Futsal, com atletas formados na nossa própria
              base.
            </p>
          </div>
          {/* Brasão da federação — reforço visual da afiliação citada no texto */}
          <div className="flex flex-col items-center gap-2">
            <Image
              src="/brasao-fpfs.webp"
              alt="Brasão da Federação Paulista de Futsal"
              width={140}
              height={140}
              className="h-auto w-24 drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)] sm:w-32"
            />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-paper/60">
              Filiado à FPFS
            </p>
          </div>
        </div>
      </section>

      {/* Agenda de jogos */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading rotulo="Agenda">Próximos jogos</SectionHeading>
        {proximos.length > 0 ? (
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {proximos.map((jogo) => (
              <li key={jogo.id} className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-4">
                <span className="font-display text-xl uppercase">
                  {jogo.mandante
                    ? `Juventude x ${jogo.adversario}`
                    : `${jogo.adversario} x Juventude`}
                </span>
                <span className="text-sm font-semibold text-red-ink">
                  {formatarData(jogo.data)}
                  {jogo.horario ? ` · ${jogo.horario}` : ""}
                </span>
                <span className="text-sm text-ink/60">
                  {jogo.local} · {jogo.campeonato}
                </span>
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
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {resultados.map((jogo) => (
              <li key={jogo.id} className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-4">
                <span className="font-display text-xl uppercase">
                  Juventude {jogo.placar?.juventude} x {jogo.placar?.adversario} {jogo.adversario}
                </span>
                <span className="text-sm text-ink/60">
                  {formatarData(jogo.data)} · {jogo.campeonato}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Elenco — selo vermelho destaca quem veio da base (prova da ponte) */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <SectionHeading rotulo="Elenco">Quem veste a camisa</SectionHeading>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {elenco.map((atleta) => (
            <li key={atleta.id} className="border-2 border-ink/10 bg-white p-5">
              <h3 className="font-display text-lg uppercase">{atleta.nome}</h3>
              <p className="text-sm text-ink/70">{atleta.posicao}</p>
              {atleta.veioDaBase && (
                <p className="mt-3 inline-block bg-red px-2 py-1 text-xs font-bold uppercase tracking-wide text-paper">
                  Formado na base
                </p>
              )}
            </li>
          ))}
        </ul>
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
          <p className="mt-2 max-w-xl text-paper/90">
            O nosso começa na escolinha. Matricule quem você ama e faça parte dessa jornada.
          </p>
          <div className="mt-6">
            <Link
              href="/escolinha"
              className={`text-sm font-bold uppercase tracking-widest underline underline-offset-4 hover:no-underline ${eventos.ponteBaseTime}`}
            >
              Conhecer a escolinha →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
