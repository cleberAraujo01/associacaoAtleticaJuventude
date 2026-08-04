import type { Metadata } from "next";
import Image from "next/image";
import { PageBanner } from "@/components/layout/PageBanner";
import { CtaLink } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { eventos, links } from "@/config/site";

export const metadata: Metadata = {
  title: "Quem somos",
  description:
    "A AA Juventude é uma escola de futsal em Santana de Parnaíba/SP que forma atletas e constrói caráter, do Sub-8 ao Sub-16, com um caminho real até o time da FPFS.",
};

/** Destaques da seção "Quem somos" — resumo do clube em três batidas. */
const destaques = [
  {
    titulo: "Do Sub-8 ao Sub-16",
    texto:
      "Turmas divididas por faixa etária, com treinos regulares durante a semana e evolução de categoria em categoria.",
  },
  {
    titulo: "Comissão qualificada",
    texto:
      "Profissionais apaixonados por formar atletas, com certificações CREF, CBFS e FPFS, dentro e fora da quadra.",
  },
  {
    titulo: "Da base ao time",
    texto:
      "Quem se destaca na base tem um caminho real até o time competitivo que representa o Juventude na FPFS.",
  },
] as const;

/** Os três pilares do trabalho do clube (esportivo, social e formativo). */
const pilares = [
  {
    numero: "01",
    rotulo: "Esportivo",
    texto:
      "Buscamos excelência técnica e tática. Ensinamos fundamento, disciplina de treino e a paixão por competir, preparando cada atleta para evoluir de turma em turma até o alto rendimento.",
  },
  {
    numero: "02",
    rotulo: "Social",
    texto:
      "Acreditamos no futsal como ferramenta de convivência. Aqui, o aluno aprende a trabalhar em equipe, a respeitar o próximo e a se relacionar em grupo. São habilidades que valem para a vida toda, dentro e fora da quadra.",
  },
  {
    numero: "03",
    rotulo: "Formativo",
    texto:
      "Formamos atleta formando primeiro a pessoa. Valores como respeito, foco, responsabilidade e superação são o coração do nosso trabalho. É isso que faz o Juventude ser mais que uma escolinha.",
  },
] as const;

/**
 * /quem-somos — SSG. Página institucional: história, missão e pilares.
 * Mesma linguagem da /escolinha: hero com banner + overlay ink, seções
 * alternando paper/wine com filete vermelho e faixa final de conversão.
 */
export default function QuemSomosPage() {
  return (
    <>
      {/* Banner padrão das páginas internas (arte compartilhada do PageBanner) */}
      <PageBanner rotulo="Institucional" titulo="Quem somos" />

      {/* QUEM SOMOS — história em dois parágrafos + três destaques */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-4 py-20 lg:py-24">
          <SectionHeading rotulo="Nossa história">
            O futsal daqui tem nome. E veste essa camisa.
          </SectionHeading>
          <div className="grid gap-6 md:grid-cols-2 md:gap-10">
            <p className="leading-relaxed text-ink/80">
              Nascida em Santana de Parnaíba, a AA Juventude é hoje uma das casas mais sérias na
              formação de jovens atletas de futsal da região. Trabalhamos com turmas divididas por
              faixa etária, do Sub-8 ao Sub-16, com treinos regulares durante a semana e uma
              comissão técnica apaixonada por ensinar o jogo do jeito certo: fundamento antes do
              resultado.
            </p>
            <p className="leading-relaxed text-ink/80">
              Mais do que ensinar a jogar bola, formamos pessoas. Cada treino é uma oportunidade de
              evoluir dentro e fora da quadra, com disciplina, respeito e espírito de equipe. E
              para quem se destaca, existe um caminho real: os melhores da base avançam para o time
              competitivo e vestem a camisa do Juventude na Federação Paulista de Futebol de Salão
              (FPFS).
            </p>
          </div>
          {/* Destaques em três cards com a régua vermelha de assinatura */}
          <ul className="mt-12 grid gap-5 sm:grid-cols-3">
            {destaques.map((destaque) => (
              <li key={destaque.titulo} className="bg-white p-6 shadow-sm">
                <span aria-hidden="true" className="block h-1 w-10 bg-red" />
                <h3 className="mt-4 font-display text-2xl uppercase text-ink">
                  {destaque.titulo}
                </h3>
                <p className="mt-2 text-sm text-ink/70">{destaque.texto}</p>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      {/* MISSÃO — bloco escuro com o brasão em marca d'água */}
      <Reveal>
        <section className="relative overflow-hidden border-t-2 border-red bg-wine py-20 text-paper lg:py-24">
          <Image
            src="/brasao.webp"
            alt=""
            width={515}
            height={515}
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -right-16 w-80 opacity-[0.06] brightness-0 invert"
          />
          <div className="relative mx-auto max-w-6xl px-4">
            <SectionHeading rotulo="Nossa missão" escuro>
              Formar atletas. Construir caráter.
            </SectionHeading>
            <div className="max-w-3xl space-y-5">
              <p className="leading-relaxed text-paper/85">
                Nossa missão é usar o esporte como ferramenta de socialização e de formação do
                caráter de cada aluno. Queremos que, por meio do futsal, as crianças e os jovens
                aprendam a ganhar e a perder, convivam em grupo de forma harmoniosa, pratiquem uma
                atividade prazerosa que faz bem à saúde, aprendam a respeitar regras e criem cada
                vez mais identidade com o clube.
              </p>
              <p className="leading-relaxed text-paper/85">
                E porque sabemos que muitos sonham em se tornar jogadores, oferecemos estrutura,
                orientação e espaço para que os talentos se desenvolvam, com a chance real de
                chegar ao time competitivo e representar o Juventude na FPFS.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* PILARES — três cards numerados, mesma linguagem dos cards de turma
          (número gigante em serigrafia vazada cortado na borda) */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-4 py-20 lg:py-24">
          <SectionHeading rotulo="Como trabalhamos">Três pilares, uma só jornada.</SectionHeading>
          <p className="-mt-4 mb-10 max-w-2xl text-center text-ink/70 md:text-left">
            Tudo o que fazemos se apoia em três pilares que caminham juntos em cada treino, cada
            aula e cada jogo:
          </p>
          <ol className="grid gap-5 md:grid-cols-3">
            {pilares.map((pilar) => (
              <li
                key={pilar.numero}
                className="relative overflow-hidden bg-white p-6 pb-12 shadow-sm"
              >
                <span
                  aria-hidden="true"
                  className="font-display pointer-events-none absolute -bottom-8 -right-1 text-[8.5rem] leading-none text-transparent [-webkit-text-stroke:2px_var(--color-red)] opacity-[0.35]"
                >
                  {pilar.numero}
                </span>
                <div className="relative">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-ink">
                    Pilar {pilar.numero} · {pilar.rotulo}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-ink/70">{pilar.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </Reveal>

      {/* CTA FINAL — faixa de conversão, par da /escolinha */}
      <Reveal>
        <section className="border-t-2 border-red bg-red text-paper">
          <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:py-20">
            <h2 className="font-display mx-auto max-w-2xl text-3xl uppercase leading-tight sm:text-4xl">
              Seu filho também pode começar essa história.
            </h2>
            <p className="mt-3 text-white">
              Matrículas abertas para as turmas do Sub-8 ao Sub-16.
            </p>
            <div className="mt-7 flex justify-center">
              <CtaLink
                href={links.whatsappMatricula}
                variante="claro"
                evento={`${eventos.ctaMatricula} ${eventos.saidaWhatsapp}`}
                externo
              >
                Matricular pelo WhatsApp
                <span aria-hidden="true">→</span>
              </CtaLink>
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}
