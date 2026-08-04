import type { Metadata } from "next";
import Image from "next/image";
import { PageBanner } from "@/components/layout/PageBanner";
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
  // Só depoimentos de família REAIS: placeholders da data layer começam com
  // "[" (regra do projeto: nunca expor colchetes ao público). Com um único
  // depoimento, o carrossel esconde os dots automaticamente.
  const depoimentosFamilia = getDepoimentos().filter(
    (d) => !d.contaAPonte && !d.texto.trim().startsWith("[") && !d.autor.trim().startsWith("["),
  );

  return (
    <>
      {/* Banner padrão das páginas internas, na variante de CONVERSÃO: além do
          título, mantém a linha de apoio e o CTA de matrícula acima da dobra.
          Sub-16, não Sub-18: a escolinha treina até o Sub-16 — o Sub-18 é o
          time competitivo (Estágio 03) e só é citado naquele contexto. */}
      <PageBanner
        rotulo="Estágio 01 · Iniciação"
        titulo="Aqui o seu filho vira atleta"
        imagens={[
          "/banner-escolinha-1.webp",
          "/banner-escolinha-2.webp",
          "/banner-escolinha-3.webp",
        ]}
      >
        <p className="text-lg text-paper">
          Do Sub-8 ao Sub-16, três treinos por semana com quem forma jogador de verdade.
        </p>
        <div className="mt-6">
          <CtaLink
            href={links.whatsappMatricula}
            variante="vermelho"
            evento={`${eventos.ctaMatricula} ${eventos.saidaWhatsapp}`}
            externo
          >
            Matricular pelo WhatsApp
          </CtaLink>
        </div>
      </PageBanner>

      {/* Turmas e horários — py maior: respiro antes e depois do título */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-4 py-20 lg:py-24">
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
                className="relative w-[82%] shrink-0 snap-center overflow-hidden bg-white p-6 pb-9 shadow-sm sm:w-auto sm:shrink"
              >
                {/* Número da categoria em contorno vermelho, estilo número de
                  camisa serigrafado — cortado na borda, sem preencher */}
                <span
                  aria-hidden="true"
                  className="font-display pointer-events-none absolute -bottom-8 -right-1 text-[8.5rem] leading-none text-transparent [-webkit-text-stroke:2px_var(--color-red)] opacity-[0.35]"
                >
                  {turma.nome.replace("Sub-", "")}
                </span>
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
                  {/* Só o treinador principal — a ficha completa da comissão
                    mora na seção "Comissão técnica" logo abaixo (sem duplicar) */}
                  <p className="mt-4 border-t border-ink/10 pt-3 text-xs font-semibold text-ink/70">
                    {turma.comissao[0]}
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
        {/* border-t-2 red: divisória fina na entrada da seção escura (assinatura
            do site) — suaviza o corte paper → wine. Seção deliberadamente
            COMPACTA: py contido, cabeçalho enxuto e cards de uma fileira. */}
        <section className="relative overflow-hidden border-t-2 border-red bg-wine py-14 lg:py-16">
          {/* Marca d'água gigante atrás dos cards (monograma tipográfico) */}
          <span
            aria-hidden="true"
            className="font-display pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[28rem] leading-none text-paper opacity-[0.04]"
          >
            AA
          </span>
          <div className="relative mx-auto max-w-6xl px-4">
            {/* Cabeçalho enxuto: título menor à esquerda, linha de apoio ao
                lado no desktop (em vez de empilhada) — menos altura */}
            <div className="mb-7 flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
              <div>
                {/* Eyebrow em paper puro: red sobre wine fica ~2.3:1 (reprova o
                    WCAG AA) — o acento vermelho fica na régua abaixo do título */}
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-paper">
                  Comissão técnica
                </p>
                <h2 className="mt-1.5 font-display text-3xl uppercase leading-tight text-paper sm:text-4xl">
                  Quem forma os campeões de amanhã
                </h2>
                <span aria-hidden="true" className="mt-3 block h-1 w-12 bg-red" />
              </div>
              {/* Apoio em uma linha só — curto e direto */}
              <p className="max-w-xs pb-1 text-sm text-paper/80">
                Uma equipe apaixonada por formar atletas, dentro e fora da quadra.
              </p>
            </div>

            {/* Faixa de estatísticas ENXUTA — número e rótulo lado a lado numa
                linha compacta, bloco separado dos cards. Profissionais e turmas
                derivados da data layer para nunca divergirem da grade exibida
                (a escolinha vai até o Sub-16; Sub-18 é o time competitivo). */}
            <dl className="mb-8 grid grid-cols-3 divide-x divide-paper/15 border-y border-paper/15 lg:mb-10">
              {[
                {
                  numero: String(professores.length).padStart(2, "0"),
                  rotulo: "Profissionais em quadra",
                },
                {
                  numero: String(turmas.length).padStart(2, "0"),
                  rotulo: "Turmas ativas, do Sub-8 ao Sub-16",
                },
                { numero: "03", rotulo: "Certificações: CREF, CBFS e FPFS" },
              ].map((stat) => (
                <div
                  key={stat.rotulo}
                  className="flex flex-col items-center justify-center gap-x-3 gap-y-0.5 px-2 py-3 text-center sm:flex-row sm:text-left"
                >
                  <dt className="sr-only">{stat.rotulo}</dt>
                  <dd className="contents">
                    <span className="font-display block text-2xl text-paper sm:text-3xl">
                      {stat.numero}
                    </span>
                    {/* paper/75 (não /60): 11px sobre wine precisa de 4.5:1 */}
                    <span className="block max-w-40 text-[11px] font-bold uppercase tracking-widest text-paper/75">
                      {stat.rotulo}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            {/* Cards COMPACTOS e uniformes: só a foto com nome + categorias na
                base; citação e funções vivem num overlay que aparece no hover
                (e no foco/toque, via tabIndex + group-focus). Uma fileira de 5
                no desktop — fração da altura do layout antigo de cards altos.
                Mobile: carrossel horizontal com snap, sem empilhar. */}
            <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5">
              {professores.map((professor) => (
                <li
                  key={professor.id}
                  tabIndex={0}
                  className="group relative aspect-[3/4] w-[58%] shrink-0 snap-center overflow-hidden rounded-2xl border border-paper/15 bg-ink/25 transition-[border-color] duration-300 hover:border-red/60 focus-visible:outline-paper motion-reduce:transition-none sm:w-auto sm:shrink"
                >
                  {professor.foto ? (
                    // Enquadramento original (nenhum corte: em várias fotos a
                    // cabeça encosta no topo do quadro) — o logo de patrocinador
                    // do fundo é tratado na própria imagem (desfoque)
                    <Image
                      src={professor.foto}
                      alt={`Foto de ${professor.nome}`}
                      width={640}
                      height={854}
                      className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                  ) : (
                    // Sem foto: iniciais em contorno vazado centralizadas
                    <span
                      aria-hidden="true"
                      className="font-display absolute inset-0 flex items-center justify-center text-[5rem] uppercase leading-none text-transparent opacity-20 [-webkit-text-stroke:2px_var(--color-paper)]"
                    >
                      {professor.nome.slice(0, 2)}
                    </span>
                  )}
                  {/* Véu escuro no topo — uniformiza o alto das fotos */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-ink/70 to-transparent"
                  />
                  {/* Gradiente ink na base — ancora nome e categorias */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    {/* paper/90, não red: contraste AA sobre o gradiente escuro */}
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-paper/90">
                      {professor.cref ?? professor.categorias}
                    </p>
                    <h3 className="mt-0.5 font-display text-2xl uppercase leading-none text-paper">
                      {professor.nome}
                    </h3>
                  </div>
                  {/* Overlay de detalhes — hover/foco: citação + funções */}
                  <div className="absolute inset-0 flex flex-col justify-end gap-3 bg-wine/95 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 group-focus:opacity-100 motion-reduce:transition-none">
                    <h3 className="font-display text-2xl uppercase leading-none text-paper">
                      {professor.nome}
                    </h3>
                    <blockquote className="border-l-2 border-red pl-3 text-sm italic leading-snug text-paper/90">
                      &ldquo;{professor.frase}&rdquo;
                    </blockquote>
                    <ul className="space-y-1">
                      {professor.credenciais.map((credencial) => (
                        <li
                          key={credencial}
                          className="flex items-baseline gap-2 text-xs font-semibold text-paper/80"
                        >
                          <span
                            aria-hidden="true"
                            className="h-1 w-1 shrink-0 rounded-full bg-red"
                          />
                          {credencial}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
            {/* Pista de interação: deslize no mobile, hover/toque nos cards */}
            <p className="mt-2 text-[11px] font-bold uppercase tracking-widest text-paper/50">
              <span className="sm:hidden">Deslize e toque num card para os detalhes →</span>
              <span className="hidden sm:inline">
                Passe o mouse sobre um card para ver os detalhes
              </span>
            </p>
          </div>
        </section>
      </Reveal>

      {/* Descanso visual entre os dois blocos escuros (comissão → Estágio 03):
          faixa clara de "quebra de capítulo" com o brasão entre dois traços —
          o respiro que padding sozinho não cria entre fundos da mesma cor */}
      <div aria-hidden="true" className="flex items-center justify-center gap-5 bg-paper py-10 sm:py-12">
        <span className="h-px w-14 bg-red/50 sm:w-20" />
        <Image src="/brasao.webp" alt="" width={515} height={515} className="h-12 w-12 sm:h-14 sm:w-14" />
        <span className="h-px w-14 bg-red/50 sm:w-20" />
      </div>

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
        {/* Degradê começa no MESMO wine da comissão acima: a divisória vermelha
            fica entre dois tons contínuos — transição suave, não corte seco */}
        <section className="relative overflow-hidden border-t-2 border-red bg-gradient-to-br from-wine via-red-ink to-ink">
          {/* Luz vermelha radial atrás da foto */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_90%_at_85%_50%,rgba(228,20,27,0.35),transparent_65%)]"
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:py-28 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="inline-block bg-red px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-md">
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
          <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:py-20">
            <h2 className="font-display mx-auto max-w-2xl text-3xl uppercase leading-tight sm:text-4xl">
              Seu filho também pode começar essa história.
            </h2>
            <p className="mt-3 text-white">Matrículas abertas para as categorias de base.</p>
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
