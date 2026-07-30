import { DepoimentoCard } from "@/components/ui/DepoimentoCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Atleta, Depoimento } from "@/types";

interface ProofGridProps {
  atletasDaBase: Atleta[];
  depoimentos: Depoimento[];
}

/**
 * Prova social: atletas formados na base + depoimentos.
 * Recebe os dados por props (vindos da data layer via página) — UI pura.
 */
export function ProofGrid({ atletasDaBase, depoimentos }: ProofGridProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading rotulo="Prova de que funciona">Formados aqui, jogando aqui</SectionHeading>

      {/* Atletas que subiram da base */}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {atletasDaBase.map((atleta) => (
          <li key={atleta.id} className="border-2 border-ink/10 bg-white p-5">
            <p className="font-display text-lg uppercase">{atleta.nome}</p>
            <p className="text-sm text-ink/70">{atleta.posicao}</p>
            {atleta.anoBase && atleta.anoSubida && (
              <p className="mt-3 inline-block bg-red px-2 py-1 text-xs font-bold uppercase tracking-wide text-paper">
                Base {atleta.anoBase} → Time {atleta.anoSubida}
              </p>
            )}
          </li>
        ))}
      </ul>

      {/* Depoimentos */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {depoimentos.map((dep) => (
          <DepoimentoCard key={dep.id} depoimento={dep} />
        ))}
      </div>
    </section>
  );
}
