/** Selos rápidos do clube — o "porquê" da escolinha em quatro batidas. */
const selos = [
  {
    rotulo: "Professores qualificados",
    icone: (
      // Prancheta tática
      <path d="M9 3h6v3H9zM7 5H5v16h14V5h-2M9 11h6M9 15h4" />
    ),
  },
  {
    rotulo: "Competições e torneios",
    icone: (
      // Troféu
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4zM8 6H4c0 3 2 4 4 4M16 6h4c0 3-2 4-4 4M12 13v4M8 21h8M10 17h4v4" />
    ),
  },
  {
    rotulo: "Formação dentro e fora da quadra",
    icone: (
      // Escudo com estrela
      <path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3zM12 8l1.2 2.4 2.6.4-1.9 1.9.4 2.6L12 14l-2.3 1.3.4-2.6-1.9-1.9 2.6-.4L12 8z" />
    ),
  },
  {
    rotulo: "Disciplina, respeito e foco",
    icone: (
      // Alvo
      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM12 13a1 1 0 1 0 0-2" />
    ),
  },
] as const;

/**
 * Faixa de selos logo abaixo da hero (antes eles moravam dentro dela).
 * Fundo branco de propósito: respiro claro entre a hero (banner escuro) e a
 * seção do trajeto (vinho) — quebra o "vermelho sobre vermelho" contínuo.
 * Mobile: grade 2×2; desktop: 4 itens lado a lado com divisórias verticais.
 */
export function FeatureStrip() {
  return (
    <section aria-label="Por que treinar no Juventude" className="border-b border-ink/10 bg-white">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-6 px-4 py-8 lg:flex lg:gap-0 lg:divide-x lg:divide-ink/10 lg:py-0">
        {selos.map((selo) => (
          <li key={selo.rotulo} className="flex items-center gap-3 lg:flex-1 lg:px-6 lg:py-7">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-red-ink)"
              strokeWidth="1.8"
              strokeLinejoin="round"
              aria-hidden="true"
              className="shrink-0"
            >
              {selo.icone}
            </svg>
            <span className="text-xs font-bold uppercase leading-snug tracking-wider text-ink">
              {selo.rotulo}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
