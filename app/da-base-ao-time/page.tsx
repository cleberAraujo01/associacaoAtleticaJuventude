import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { DepoimentoCard } from "@/components/ui/DepoimentoCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAtletasDaBase, getDepoimentosDaPonte } from "@/lib/content";

export const metadata: Metadata = {
  title: "Da base ao time",
  description:
    "Histórias de atletas que começaram na escolinha da AA Juventude e chegaram ao time Sub-18 que disputa a FPFS.",
};

/**
 * /da-base-ao-time — ESQUELETO navegável (SSG).
 * Página-tese do site: será expandida com as histórias reais coletadas
 * (fotos, linha do tempo por atleta, vídeos). Estrutura e dados já ligados.
 */
export default function DaBaseAoTimePage() {
  const atletas = getAtletasDaBase();
  const depoimentos = getDepoimentosDaPonte().filter((d) => d.contaAPonte);

  return (
    <>
      {/* Banner padrão das páginas internas (arte compartilhada do PageBanner) */}
      <PageBanner rotulo="A espinha dorsal do clube" titulo="Da base ao time">
        <p className="text-lg text-paper">
          Quem começou criança na escolinha e hoje veste a camisa na FPFS. Estas são as histórias
          que provam que o caminho existe.
        </p>
      </PageBanner>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading rotulo="Trajetórias">Quem já fez a travessia</SectionHeading>
        <ul className="grid gap-4 sm:grid-cols-2">
          {atletas.map((atleta) => (
            <li key={atleta.id} className="border-2 border-ink/10 bg-white p-6">
              <h3 className="font-display text-2xl uppercase">{atleta.nome}</h3>
              <p className="text-sm text-ink/70">{atleta.posicao}</p>
              {atleta.anoBase && atleta.anoSubida && (
                <p className="mt-3 inline-block bg-red px-2 py-1 text-xs font-bold uppercase tracking-wide text-paper">
                  Base {atleta.anoBase} → Time {atleta.anoSubida}
                </p>
              )}
              {/* TODO: conteúdo pendente — história completa, foto e vídeo de cada trajetória */}
              <p className="mt-3 text-sm italic text-ink/50">
                [História completa a coletar com o clube]
              </p>
            </li>
          ))}
        </ul>

        {depoimentos.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {depoimentos.map((dep) => (
              <DepoimentoCard key={dep.id} depoimento={dep} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
