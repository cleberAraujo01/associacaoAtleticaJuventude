import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaLink } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";
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
      {/* Cabeçalho da trilha — banner de quadra sobre textura vermelha
          (bg-red é o fallback enquanto a imagem carrega). Linguagem editorial:
          overlay ink para legibilidade, "01" gigante em marca d'água cortado na
          borda (eco dos cards do trajeto) e o mascote da escolinha em corpo
          inteiro, ancorado no chão do banner. */}
      <section className="relative overflow-hidden bg-red bg-[url('/banner-escolinha.webp')] bg-cover bg-center text-paper">
        {/* Overlay — escurece a esquerda (onde vive o texto) e o rodapé da faixa */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/40 to-ink/10"
        />
        <Image
          src="/mascote-aula.webp"
          alt=""
          width={534}
          height={720}
          aria-hidden="true"
          priority
          className="pointer-events-none absolute bottom-6 right-2 hidden w-60 drop-shadow-[0_28px_36px_rgba(0,0,0,0.65)] md:block md:right-16 md:w-72 lg:right-36 lg:w-80"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <p className="inline-block bg-red px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-paper shadow-md">
            Estágio 01 · Iniciação
          </p>
          <h1 className="font-display mt-5 max-w-2xl text-4xl uppercase leading-tight sm:text-6xl">
            Aqui o seu filho vira{" "}
            <span className="underline decoration-red decoration-8 underline-offset-8">atleta</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-paper/90">
            Do Sub-8 ao Sub-16, três treinos por semana com quem forma jogador de verdade. O caminho
            até o time da FPFS começa na primeira aula.
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
      <Reveal>
        <section className="mx-auto max-w-6xl px-4 py-16">
          <SectionHeading rotulo="Turmas e horários">Encontre a turma certa</SectionHeading>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {turmas.map((turma) => (
              // Mesma linguagem editorial dos cards do trajeto: sem borda genérica,
              // número da categoria gigante em marca d'água ancorando o card
              <li
                key={turma.id}
                tabIndex={0}
                className="group relative overflow-hidden bg-white p-6 pb-9 shadow-sm"
              >
                {/* Número da categoria em contorno vermelho, estilo número de
                  camisa serigrafado — cortado na borda, sem preencher */}
                <span
                  aria-hidden="true"
                  className="font-display pointer-events-none absolute -bottom-8 -right-1 text-[8.5rem] leading-none text-transparent [-webkit-text-stroke:2px_var(--color-red)] opacity-[0.35]"
                >
                  {turma.nome.replace("Sub-", "")}
                </span>
                {/* Painel da comissão — sobe de dentro do card no hover/foco,
                  como verso de ficha técnica (no toque, o foco também revela) */}
                <div className="absolute inset-0 z-10 flex translate-y-full flex-col justify-end bg-wine p-6 pb-8 transition-transform duration-300 ease-out group-hover:translate-y-0 group-focus-within:translate-y-0 group-focus:translate-y-0 motion-reduce:transition-none">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-paper/60">
                    Comissão da turma
                  </p>
                  <h4 className="mt-1 font-display text-2xl uppercase text-paper">{turma.nome}</h4>
                  <ul className="mt-4 space-y-2">
                    {turma.comissao.map((membro) => (
                      <li key={membro} className="text-sm text-paper/90">
                        {membro}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-paper/60">{turma.faixaEtaria}</p>
                </div>
                <div className="relative">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-ink">
                    {turma.faixaEtaria}
                  </p>
                  <h3 className="mt-2 font-display text-3xl uppercase">{turma.nome}</h3>
                  {/* Grade de treinos estilo tabela de jogos: dia à esquerda,
                    horário à direita, filetes finos entre as linhas */}
                  <ul className="mt-5 divide-y divide-ink/10 border-t border-ink/10">
                    {turma.treinos.map((treino) => (
                      <li
                        key={treino.dia}
                        className="flex items-baseline justify-between gap-4 py-2.5"
                      >
                        <span className="text-xs font-bold uppercase tracking-widest text-ink/50">
                          {treino.dia}
                        </span>
                        <span className="text-sm font-bold text-ink">{treino.horario}</span>
                      </li>
                    ))}
                  </ul>
                  {/* Pista do painel oculto — sem ela, ninguém descobre o hover
                    (no celular, o toque no card revela via foco) */}
                  <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-red-ink">
                    Comissão da turma +
                  </p>
                </div>
              </li>
            ))}
          </ul>
          {/* Aviso de vigência dos horários */}
          <p className="mt-6 text-xs text-ink/60">
            Horários do ciclo atual. Confirme pelo WhatsApp antes da primeira aula.
          </p>
          {/* Microcopy de apoio à decisão — reduz fricção de quem ficou na dúvida */}
          <p className="mt-8 text-sm text-ink/70">
            Não sabe qual é a turma certa?{" "}
            <a
              href={links.whatsappMatricula}
              target="_blank"
              rel="noopener noreferrer"
              className={`font-bold uppercase tracking-widest text-red-ink underline underline-offset-4 hover:no-underline ${eventos.saidaWhatsapp}`}
            >
              Chama no WhatsApp
            </a>{" "}
            que a gente indica pela idade.
          </p>
        </section>
      </Reveal>

      {/* Professores credenciados — confiança para pais/responsáveis */}
      <Reveal>
        <section className="bg-wine py-16">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeading rotulo="Comissão técnica" escuro>
              Quem comanda os treinos
            </SectionHeading>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {professores.map((professor) => (
                // Card editorial estilo "ficha técnica": foto grande no topo com o
                // nome sobreposto em gradiente ink, CREF como selo vermelho sobre
                // a foto — sem avatar redondo genérico
                <li key={professor.id} className="overflow-hidden bg-paper/5">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {professor.foto ? (
                      <Image
                        src={professor.foto}
                        alt={`Foto de ${professor.nome}`}
                        width={640}
                        height={480}
                        className="h-full w-full object-cover object-top"
                      />
                    ) : (
                      // Sem foto ainda: iniciais em contorno vazado cortadas na
                      // borda — mesma serigrafia dos números de camisa da página
                      <div className="relative h-full w-full bg-ink/20">
                        <span
                          aria-hidden="true"
                          className="font-display absolute -bottom-8 -right-2 text-[9rem] uppercase leading-none text-transparent [-webkit-text-stroke:2px_var(--color-paper)] opacity-25"
                        >
                          {professor.nome.slice(0, 2)}
                        </span>
                      </div>
                    )}
                    {/* Gradiente ink na base da foto — ancora o nome com contraste */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/90 to-transparent"
                    />
                    {professor.cref && (
                      <p className="absolute left-0 top-4 bg-red px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-paper shadow-md">
                        {professor.cref}
                      </p>
                    )}
                    <h3 className="absolute bottom-4 left-5 right-5 font-display text-2xl uppercase leading-tight text-paper">
                      {professor.nome}
                    </h3>
                  </div>
                  <div className="p-6">
                    {/* Credenciais com filetes finos — mesma grade tipográfica
                      da tabela de treinos dos cards de turma */}
                    <ul className="divide-y divide-paper/10 border-t border-paper/10">
                      {professor.credenciais.map((credencial) => (
                        <li key={credencial} className="py-2.5 text-sm text-paper/90">
                          {credencial}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm leading-relaxed text-paper/70">
                      {professor.descricao}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Reveal>

      {/* Depoimento de família (prova social da trilha) — citação editorial em
          página aberta, sem caixa: aspas gigantes ao fundo e a fala em corpo
          grande, como pull-quote de revista */}
      {depoimentoFamilia && (
        <Reveal>
          <section className="mx-auto max-w-6xl px-4 py-16">
            <div className="grid gap-8 lg:grid-cols-[minmax(14rem,1fr)_2fr] lg:gap-14">
              <SectionHeading rotulo="Quem vive a escolinha">Palavra de família</SectionHeading>
              <figure className="relative">
                <span
                  aria-hidden="true"
                  className="font-display pointer-events-none absolute -left-4 -top-12 text-[11rem] leading-none text-red/10 sm:-left-8"
                >
                  “
                </span>
                <blockquote className="relative text-2xl leading-snug text-ink sm:text-3xl">
                  {depoimentoFamilia.texto}
                </blockquote>
                <figcaption className="relative mt-8 text-sm">
                  <span className="font-bold uppercase tracking-wide">
                    {depoimentoFamilia.autor}
                  </span>
                  <span className="text-ink/60"> · {depoimentoFamilia.papel}</span>
                </figcaption>
              </figure>
            </div>
          </section>
        </Reveal>
      )}

      {/* Ponte para o time — fecha a narrativa aberta no hero: a página começa
          no "Estágio 01" e termina apontando o "Estágio 03". O número gigante
          em contorno (mesma serigrafia dos cards de turma) marca o destino;
          CTA em botão de verdade, não link escondido. */}
      <Reveal>
        <section className="relative overflow-hidden bg-wine py-16 sm:py-20">
          <span
            aria-hidden="true"
            className="font-display pointer-events-none absolute -bottom-10 -right-2 text-[14rem] leading-none text-transparent [-webkit-text-stroke:2px_var(--color-paper)] opacity-20 sm:text-[18rem]"
          >
            03
          </span>
          <div className="relative mx-auto max-w-6xl px-4">
            <p className="inline-block bg-red px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-paper shadow-md">
              Estágio 03 · Competição
            </p>
            <h2 className="font-display mt-5 max-w-2xl text-3xl uppercase leading-tight text-paper sm:text-5xl">
              Hoje, escolinha. Amanhã, a camisa do Juventude na FPFS.
            </h2>
            <p className="mt-4 max-w-xl text-paper/80">
              Quem se destaca na base treina e joga com o time de cima. Não é promessa: é o caminho
              que já levou atleta da nossa quadra pro campeonato paulista de futsal.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <CtaLink href="/time" variante="vermelho" evento={eventos.ponteBaseTime}>
                Conhecer o time
              </CtaLink>
              {/* Rota alternativa: as histórias de quem já fez a jornada */}
              <Link
                href="/da-base-ao-time"
                className={`group text-sm font-bold uppercase tracking-widest text-paper/90 transition-colors hover:text-paper ${eventos.ponteBaseTime}`}
              >
                Quem já fez esse caminho{" "}
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}
