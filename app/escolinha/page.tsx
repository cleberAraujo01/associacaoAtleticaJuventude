import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaLink } from "@/components/ui/CtaLink";
import { DepoimentoCard } from "@/components/ui/DepoimentoCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { eventos, links } from "@/config/site";
import { getDepoimentos, getProfessores, getTurmas } from "@/lib/content";

export const metadata: Metadata = {
  title: "Escolinha de futsal",
  description:
    "Escolinha de futsal da AA Juventude em Santana de Parnaíba: turmas por idade e caminho real até o time competitivo. Matricule pelo WhatsApp.",
};

/**
 * /escolinha — SSG. Página da trilha de iniciação.
 * Conversão principal do site: CTA de matrícula via WhatsApp (rastreado).
 */
export default function EscolinhaPage() {
  const turmas = getTurmas();
  const professores = getProfessores();
  const depoimentoFamilia = getDepoimentos().find((d) => !d.contaAPonte);

  return (
    <>
      {/* Cabeçalho da trilha */}
      <section className="bg-red text-paper">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-paper/80">
            Estágio 01 · Iniciação
          </p>
          <h1 className="font-display max-w-2xl text-4xl uppercase leading-tight sm:text-6xl">
            Escolinha: onde a jornada começa
          </h1>
          <p className="mt-4 max-w-xl text-lg text-paper/90">
            Turmas por faixa etária, fundamento, disciplina e alegria de jogar — com um caminho real
            até o time que disputa a FPFS.
          </p>
          <div className="mt-8">
            <CtaLink
              href={links.whatsappMatricula}
              variante="vermelho"
              evento={`${eventos.ctaMatricula} ${eventos.saidaWhatsapp}`}
              externo
            >
              Matricular pelo WhatsApp
            </CtaLink>
          </div>
        </div>
      </section>

      {/* Turmas e horários */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading rotulo="Turmas e horários">Encontre a turma certa</SectionHeading>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {turmas.map((turma) => (
            <li key={turma.id} className="border-2 border-ink/10 bg-white p-5">
              <h3 className="font-display text-2xl uppercase">{turma.nome}</h3>
              <p className="text-sm font-semibold text-red-ink">{turma.faixaEtaria}</p>
              <dl className="mt-3 space-y-1 text-sm text-ink/80">
                <div>
                  <dt className="inline font-bold">Dias: </dt>
                  <dd className="inline">{turma.dias}</dd>
                </div>
                <div>
                  <dt className="inline font-bold">Horário: </dt>
                  <dd className="inline">{turma.horario}</dd>
                </div>
                <div>
                  <dt className="inline font-bold">Local: </dt>
                  <dd className="inline">{turma.local}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </section>

      {/* Professores credenciados — confiança para pais/responsáveis */}
      <section className="bg-wine py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading rotulo="Comissão técnica" escuro>
            Professores credenciados
          </SectionHeading>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {professores.map((professor) => (
              <li key={professor.id} className="border-t-4 border-red bg-paper/5 p-6">
                <div className="flex items-center gap-4">
                  {professor.foto ? (
                    <Image
                      src={professor.foto}
                      alt={`Foto de ${professor.nome}`}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    // Sem foto ainda: círculo com iniciais (mesma convenção do elenco)
                    <span
                      aria-hidden="true"
                      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-red font-display text-xl uppercase text-paper"
                    >
                      {professor.nome.replace(/[[\]]/g, "").slice(0, 2)}
                    </span>
                  )}
                  <div>
                    <h3 className="font-display text-xl uppercase text-paper">{professor.nome}</h3>
                    {professor.cref && (
                      <p className="mt-1 inline-block bg-red px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-paper">
                        {professor.cref}
                      </p>
                    )}
                  </div>
                </div>
                <ul className="mt-4 space-y-1.5">
                  {professor.credenciais.map((credencial) => (
                    <li
                      key={credencial}
                      className="border-l-2 border-red pl-3 text-sm text-paper/80"
                    >
                      {credencial}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-relaxed text-paper/70">{professor.descricao}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Depoimento de família (prova social da trilha) */}
      {depoimentoFamilia && (
        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="max-w-2xl">
            <DepoimentoCard depoimento={depoimentoFamilia} />
          </div>
        </section>
      )}

      {/* Ponte para o time (métrica da ponte) */}
      <section className="bg-wine py-14">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading rotulo="E depois da escolinha?" escuro>
            O caminho continua no time
          </SectionHeading>
          <p className="max-w-xl text-paper/80">
            Os destaques da base sobem para o elenco competitivo. Veja quem representa o clube na
            FPFS hoje.
          </p>
          <div className="mt-6">
            <Link
              href="/time"
              className={`text-sm font-bold uppercase tracking-widest text-paper underline underline-offset-4 hover:no-underline ${eventos.ponteBaseTime}`}
            >
              Conhecer o time →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
