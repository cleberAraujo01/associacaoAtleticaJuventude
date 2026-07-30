interface SectionHeadingProps {
  /** Rótulo pequeno acima do título (ex.: "Nossa jornada"). */
  rotulo?: string;
  children: React.ReactNode;
  /** Uso sobre fundo escuro inverte as cores. */
  escuro?: boolean;
}

/** Título de seção (h2) padronizado — garante hierarquia h1→h2 consistente. */
export function SectionHeading({ rotulo, children, escuro }: SectionHeadingProps) {
  return (
    <div className="mb-8">
      {rotulo && (
        <p
          className={`mb-1 text-xs font-bold uppercase tracking-[0.2em] ${
            escuro ? "text-paper/80" : "text-red-ink"
          }`}
        >
          {rotulo}
        </p>
      )}
      <h2
        className={`font-display text-3xl uppercase leading-tight sm:text-4xl ${
          escuro ? "text-paper" : "text-ink"
        }`}
      >
        {children}
      </h2>
    </div>
  );
}
