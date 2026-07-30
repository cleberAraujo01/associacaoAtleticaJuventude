import type { Metadata } from "next";
import { CtaLink } from "@/components/ui/CtaLink";
import { eventos, links } from "@/config/site";

export const metadata: Metadata = {
  title: "Apoie o clube",
  description:
    "Patrocine ou apoie a AA Juventude: sua ajuda sustenta a escolinha e leva o time mais longe na FPFS.",
};

/**
 * /apoie — ESQUELETO navegável (SSG).
 * TODO: conteúdo pendente — cotas de patrocínio, contrapartidas e formas de doação reais.
 */
export default function ApoiePage() {
  return (
    <>
      {/* Vinho: fundo secundário da paleta para cabeçalhos de páginas de apoio */}
      <section className="bg-wine text-paper">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h1 className="font-display max-w-2xl text-4xl uppercase leading-tight sm:text-6xl">
            Apoie a jornada
          </h1>
          <p className="mt-4 max-w-xl text-lg text-paper/85">
            Empresas e comunidade sustentam a escolinha e fortalecem o time na FPFS. Vamos conversar
            sobre como você pode participar.
          </p>
          <div className="mt-8">
            <CtaLink
              href={links.whatsappApoio}
              variante="vermelho"
              evento={eventos.saidaWhatsapp}
              externo
            >
              Quero apoiar — WhatsApp
            </CtaLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        {/* TODO: conteúdo pendente — cotas de patrocínio, contrapartidas (uniforme, placas, redes sociais) */}
        <p className="max-w-xl text-ink/70">
          [Conteúdo a coletar com a diretoria: cotas de patrocínio, contrapartidas e formas de
          doação. Esta página será expandida com essas informações.]
        </p>
      </section>
    </>
  );
}
