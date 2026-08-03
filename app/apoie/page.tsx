import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
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
      {/* Banner padrão das páginas internas, na variante de conversão:
          o CTA de apoio é a ação principal da página */}
      <PageBanner rotulo="Sua marca no jogo" titulo="Apoie a jornada">
        <p className="text-lg text-paper">
          Empresas e comunidade sustentam a escolinha e fortalecem o time na FPFS. Vamos conversar
          sobre como você pode participar.
        </p>
        <div className="mt-6">
          <CtaLink
            href={links.whatsappApoio}
            variante="vermelho"
            evento={eventos.saidaWhatsapp}
            externo
          >
            Quero apoiar — WhatsApp
          </CtaLink>
        </div>
      </PageBanner>

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
