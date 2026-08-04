import type { Metadata } from "next";
import { ContactForm } from "@/components/contato/ContactForm";
import { MapaLocal } from "@/components/contato/MapaLocal";
import { PageBanner } from "@/components/layout/PageBanner";
import { ChannelIcon } from "@/components/ui/ChannelIcon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { canais, eventos, links, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a AA Juventude: WhatsApp para matrículas e apoio, formulário para imprensa e onde encontrar o clube em Santana de Parnaíba/SP.",
};

/** Atalhos por assunto — cada papo no canal certo. */
const assuntos = [
  {
    titulo: "Matrículas",
    descricao:
      "Chame nossa equipe no WhatsApp e garanta a vaga do seu craque. O atendimento é rápido e estamos prontos para tirar todas as suas dúvidas.",
    href: links.whatsappMatricula,
    acao: "Chamar no WhatsApp",
    externo: true,
    evento: `${eventos.ctaMatricula} ${eventos.saidaWhatsapp}`,
    icone: "WhatsApp" as const,
  },
  {
    titulo: "Parcerias, patrocínio e imprensa",
    descricao:
      "Quer fazer parte desse projeto e incentivar o desenvolvimento de novos talentos? Envie sua proposta pelo formulário. Nossa equipe entrará em contato o mais breve possível.",
    href: "#formulario",
    acao: "Enviar pelo formulário",
    externo: false,
    evento: "",
    icone: null,
  },
];

/**
 * /contato — SSG. Página única de contato do clube.
 * Duas colunas no desktop: atalhos por assunto (WhatsApp domina) à esquerda,
 * formulário de e-mail (imprensa/institucional) à direita, mapa abaixo.
 * TODO: conteúdo pendente — horários de atendimento.
 */
export default function ContatoPage() {
  return (
    <>
      {/* Banner padrão das páginas internas (arte compartilhada do PageBanner) */}
      <PageBanner rotulo={`Fale com o Juventude · ${site.cidade}`} titulo="Contato">
        <p className="text-lg text-paper">
          Matrículas pelo WhatsApp. Parcerias, patrocínio e imprensa pelo formulário.
        </p>
        {/* Sem CTA aqui — os atalhos por assunto logo abaixo são a ação da página */}
        <a
          href="#assuntos"
          className="group mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-paper/90 transition-colors hover:text-paper focus-visible:outline-paper"
        >
          Escolher o assunto{" "}
          <span
            aria-hidden="true"
            className="inline-block transition-transform group-hover:translate-y-0.5 motion-reduce:transition-none"
          >
            ↓
          </span>
        </a>
      </PageBanner>

      {/* Atalhos por assunto + formulário lado a lado no desktop */}
      <section id="assuntos" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
          <Reveal>
            <SectionHeading rotulo="Por assunto">Direto ao ponto</SectionHeading>
            <ul className="space-y-4">
              {assuntos.map((item) => (
                <li key={item.titulo}>
                  <a
                    href={item.href}
                    {...(item.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`group flex items-center gap-4 rounded-2xl border-2 border-ink/10 bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-red/50 hover:shadow-[0_10px_30px_rgba(14,14,16,0.08)] motion-reduce:transition-none ${item.evento}`}
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red text-paper transition-colors group-hover:bg-red-ink">
                      {item.icone ? (
                        <ChannelIcon canal={item.icone} className="h-5 w-5" />
                      ) : (
                        <span aria-hidden="true" className="font-display text-xl leading-none">
                          @
                        </span>
                      )}
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-xl uppercase leading-tight decoration-red decoration-4 underline-offset-4 group-hover:underline">
                        {item.titulo}
                      </span>
                      <span className="mt-0.5 block text-sm text-ink/70">{item.descricao}</span>
                      <span className="mt-1.5 block text-xs font-bold uppercase tracking-widest text-red-ink">
                        {item.acao}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-red-ink transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                    >
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Redes — discos ink para diferenciar dos atalhos vermelhos */}
            <p className="mt-8 text-center text-xs font-bold uppercase tracking-widest text-ink/60 md:text-left">
              Siga o clube
            </p>
            <ul className="mt-3 flex justify-center gap-3 md:justify-start">
              {canais.map((canal) => (
                <li key={canal.nome}>
                  <a
                    href={canal.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Abrir ${canal.nome} da ${site.nomeCurto} em nova aba`}
                    className={`flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper transition-colors hover:bg-red ${canal.evento}`}
                  >
                    <ChannelIcon canal={canal.nome} className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Formulário em painel "súmula": barra vermelha no topo + borda ink */}
          <Reveal atraso={100}>
            <div id="formulario" className="scroll-mt-24">
              <div className="overflow-hidden rounded-2xl border-2 border-ink/10 bg-white">
                <div aria-hidden="true" className="h-2 bg-red" />
                <div className="p-6 sm:p-8">
                  <SectionHeading rotulo="Parcerias, patrocínio e imprensa">
                    Escreva para a gente
                  </SectionHeading>
                  <ContactForm />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Onde estamos — mapa em P&B (paleta do clube) com endereço acima */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <Reveal>
        <SectionHeading rotulo="Onde estamos">Vem pra quadra</SectionHeading>
        {/* TODO: conteúdo pendente — horários de atendimento */}
        <div className="flex flex-col gap-3 text-center sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:text-left">
          <p className="max-w-xl text-ink/70">{site.endereco}</p>
          <a
            href={links.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-sm font-bold uppercase tracking-widest text-red-ink underline underline-offset-4 hover:no-underline"
          >
            Abrir no Google Maps →
          </a>
        </div>
        {/* Fachada: o embed do Google Maps (~450 KB de JS) só carrega ao clique */}
        <div className="mt-6 overflow-hidden rounded-2xl border-2 border-ink/10 bg-white p-2">
          <MapaLocal />
        </div>
        </Reveal>
      </section>
    </>
  );
}
