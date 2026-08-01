import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PalavraDeFamilia } from "@/components/escolinha/PalavraDeFamilia";
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
  const depoimentosFamilia = getDepoimentos().filter((d) => !d.contaAPonte);

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
          className="pointer-events-none absolute bottom-0 left-1/2 w-64 -translate-x-1/2 drop-shadow-[0_28px_36px_rgba(0,0,0,0.65)] md:bottom-6 md:left-auto md:right-16 md:w-72 md:translate-x-0 lg:right-36 lg:w-80"
        />
        {/* Overlay acima do mascote (só no mobile, onde ele fica atrás do
            texto) — garante a legibilidade sem apagar o urso */}
        <div aria-hidden="true" className="absolute inset-0 bg-ink/45 md:hidden" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <p className="inline-block bg-red px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-paper shadow-md">
            Estágio 01 · Iniciação
          </p>
          <h1 className="font-display mt-5 max-w-2xl text-4xl uppercase leading-tight sm:text-6xl">
            Aqui o seu filho vira{" "}
            <span className="underline decoration-red decoration-8 underline-offset-8">atleta</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-paper/90">
            Do Sub-8 ao Sub-18, três treinos por semana com quem forma jogador de verdade. O caminho
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
          {/* Mobile: carrossel horizontal com snap (o card seguinte "espia" na
              borda, convidando o deslize) — evita a coluna infinita de cards.
              -mx-4/px-4 sangra o trilho até a borda da tela. Desktop: grid. */}
          <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
            {turmas.map((turma) => (
              // Mesma linguagem editorial dos cards do trajeto: sem borda genérica,
              // número da categoria gigante em marca d'água ancorando o card
              <li
                key={turma.id}
                tabIndex={0}
                className="group relative w-[82%] shrink-0 snap-center overflow-hidden bg-white p-6 pb-9 shadow-sm sm:w-auto sm:shrink"
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
          {/* Pista de deslize — só no mobile, onde o carrossel existe */}
          <p
            aria-hidden="true"
            className="mt-1 text-[11px] font-bold uppercase tracking-widest text-ink/40 sm:hidden"
          >
            Deslize para ver as turmas →
          </p>
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

      {/* Comissão técnica em formato "academy" (Palmeiras/City): cabeçalho
          institucional, números da estrutura, cards com foto dominante, nome
          gigante e frase pessoal — confiança para pais/responsáveis */}
      <Reveal>
        <section className="relative overflow-hidden bg-wine py-16">
          {/* Marca d'água gigante atrás dos cards (monograma tipográfico) */}
          <span
            aria-hidden="true"
            className="font-display pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[28rem] leading-none text-paper opacity-[0.04]"
          >
            AA
          </span>
          <div className="relative mx-auto max-w-6xl px-4">
            {/* Cabeçalho institucional */}
            <div className="mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em]">
                <span className="text-red">Comissão</span>{" "}
                <span className="text-paper">técnica</span>
              </p>
              <h2 className="mt-2 max-w-2xl font-display text-4xl uppercase leading-tight text-paper sm:text-5xl">
                Quem forma os campeões de amanhã
              </h2>
              <span aria-hidden="true" className="mt-4 block h-1 w-12 bg-red" />
              <p className="mt-4 max-w-xl text-paper/80">
                Muito mais do que treinos. Uma equipe apaixonada por desenvolver atletas, cidadãos
                e vencedores dentro e fora da quadra.
              </p>
            </div>

            {/* Números da estrutura técnica (dados reais do flyer/tabela) */}
            <dl className="mb-12 grid grid-cols-3 divide-x divide-paper/15 border-y border-paper/15">
              {[
                { numero: "05", rotulo: "Profissionais em quadra" },
                { numero: "06", rotulo: "Categorias, do Sub-8 ao Sub-18" },
                { numero: "03", rotulo: "Certificações: CREF, CBFS e FPFS" },
              ].map((stat) => (
                <div key={stat.rotulo} className="px-2 py-5 text-center sm:px-4 sm:py-6">
                  <dt className="sr-only">{stat.rotulo}</dt>
                  <dd>
                    <span className="font-display block text-3xl text-paper sm:text-5xl">
                      {stat.numero}
                    </span>
                    <span className="mt-1 block text-[11px] font-bold uppercase tracking-widest text-paper/60">
                      {stat.rotulo}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            {/* Mobile: carrossel horizontal com snap (evita empilhar 5 cards
                de foto grande — a "salsicha"). Desktop: flex-wrap centrado —
                com 5 membros, a última fileira fica centralizada (grid
                deixaria um card órfão encostado à esquerda). */}
            <ul className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0">
              {professores.map((professor) => (
                // Card "academy": foto dominante (~70%), badge discreto de
                // categorias, nome gigante e frase pessoal no rodapé.
                // Hover: card sobe, foto aproxima, fundo clareia.
                <li
                  key={professor.id}
                  className="group w-[78%] shrink-0 snap-center overflow-hidden rounded-2xl border border-paper/15 bg-ink/25 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-3 hover:border-red/60 hover:bg-ink/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-[calc(50%-0.625rem)] sm:shrink lg:w-[calc(33.333%-0.9rem)]"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    {professor.foto ? (
                      <Image
                        src={professor.foto}
                        alt={`Foto de ${professor.nome}`}
                        width={640}
                        height={854}
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.08] motion-reduce:transition-none"
                      />
                    ) : (
                      // Sem foto: iniciais em contorno vazado centralizadas
                      <div className="relative h-full w-full bg-ink/20">
                        <span
                          aria-hidden="true"
                          className="font-display absolute inset-0 flex items-center justify-center text-[7rem] uppercase leading-none text-transparent opacity-20 [-webkit-text-stroke:2px_var(--color-paper)]"
                        >
                          {professor.nome.slice(0, 2)}
                        </span>
                      </div>
                    )}
                    {/* Gradiente ink na base da foto — ancora badge e nome */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent"
                    />
                    {/* Badge discreto de categorias (CREF entra aqui quando houver) */}
                    <p className="absolute left-5 bottom-16 text-[11px] font-bold uppercase tracking-[0.2em] text-red sm:bottom-[4.5rem]">
                      {professor.cref ?? professor.categorias}
                    </p>
                    {/* Nome gigante, estilo elenco profissional */}
                    <h3 className="absolute bottom-4 left-5 right-5 font-display text-4xl uppercase leading-none text-paper sm:text-[2.75rem]">
                      {professor.nome}
                    </h3>
                  </div>
                  <div className="p-6 pt-5">
                    {/* Frase pessoal — o lado humano do treinador */}
                    <blockquote className="border-l-2 border-red pl-4 text-sm italic leading-relaxed text-paper/90">
                      &ldquo;{professor.frase}&rdquo;
                    </blockquote>
                    <ul className="mt-4 space-y-1.5">
                      {professor.credenciais.map((credencial) => (
                        <li
                          key={credencial}
                          className="flex items-baseline gap-2 text-[13px] font-semibold text-paper/70"
                        >
                          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
                          {credencial}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
            {/* Pista de deslize — só no mobile, onde o carrossel existe */}
            <p
              aria-hidden="true"
              className="mt-1 text-[11px] font-bold uppercase tracking-widest text-paper/40 sm:hidden"
            >
              Deslize para conhecer a comissão →
            </p>
          </div>
        </section>
      </Reveal>

      {/* Ponte para o time — fecha a narrativa aberta no hero: a página começa
          no "Estágio 01" e aponta o "Estágio 03". Duas colunas: texto e CTAs à
          esquerda, imagem forte (a camisa do clube) à direita, com o "03"
          gigante em serigrafia sobre a foto. Ordem do fechamento da página:
          formação → oportunidade no time → confiança das famílias → matrícula. */}
      <Reveal>
        {/* Fundo em degradê da paleta: vermelho-tinta dominante (onde vive o
            texto) escurecendo até o ink só no canto da foto — clima de noite
            de jogo sem deixar o preto dominar. Diferencia da seção wine da
            comissão logo acima. */}
        <section className="relative overflow-hidden border-t-2 border-red bg-gradient-to-br from-red-ink via-wine to-ink">
          {/* Luz vermelha radial atrás da foto */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_90%_at_85%_50%,rgba(228,20,27,0.35),transparent_65%)]"
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="inline-block bg-red px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-paper shadow-md">
                Estágio 03 · Competição
              </p>
              {/* Título quebrado em três linhas, como no cartaz */}
              <h2 className="font-display mt-5 text-3xl uppercase leading-tight text-paper sm:text-5xl">
                Hoje, escolinha.
                <br />
                Amanhã, a camisa
                <br />
                do Juventude na FPFS.
              </h2>
              <p className="mt-4 max-w-xl text-paper/80">
                Quem se destaca na base pode avançar para o time competitivo e representar o
                Juventude na FPFS. Um caminho construído com treino, disciplina e oportunidade.
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
                  Ver histórias de atletas{" "}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Atleta em quadra escura com luz vermelha — a imagem-tese do
                Estágio 03 (competição) */}
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/atleta-competicao.webp"
                alt="Atleta da AA Juventude dominando a bola em quadra escura sob luz vermelha"
                width={1280}
                height={852}
                className="aspect-[4/3] w-full object-cover brightness-[0.85] lg:aspect-[5/4]"
              />
              {/* Vinheta ink na base + "03" gigante em contorno sobre a foto */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
              />
              <span
                aria-hidden="true"
                className="font-display pointer-events-none absolute -bottom-8 -right-2 text-[11rem] leading-none text-transparent [-webkit-text-stroke:2px_var(--color-paper)] opacity-40 sm:text-[13rem]"
              >
                03
              </span>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Prova social: depoimentos de famílias em carrossel (foto + citação) */}
      {depoimentosFamilia.length > 0 && (
        <Reveal>
          <PalavraDeFamilia depoimentos={depoimentosFamilia} />
        </Reveal>
      )}

      {/* Faixa final de conversão — depois da confiança das famílias, o convite */}
      <Reveal>
        <section className="border-t-2 border-red bg-red text-paper">
          <div className="mx-auto max-w-6xl px-4 py-14 text-center">
            <h2 className="font-display mx-auto max-w-2xl text-3xl uppercase leading-tight sm:text-4xl">
              Seu filho também pode começar essa história.
            </h2>
            <p className="mt-3 text-paper/90">Matrículas abertas para as categorias de base.</p>
            <div className="mt-7 flex justify-center">
              <CtaLink
                href={links.whatsappMatricula}
                variante="claro"
                evento={`${eventos.ctaMatricula} ${eventos.saidaWhatsapp}`}
                externo
              >
                Falar com a escolinha no WhatsApp
              </CtaLink>
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}
