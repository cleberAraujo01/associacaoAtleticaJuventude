import Link from "next/link";

type Variante = "vermelho" | "contorno" | "claro";

interface CtaLinkProps {
  href: string;
  children: React.ReactNode;
  variante?: Variante;
  /** Classe de evento do Plausible (config/site.ts → eventos). */
  evento?: string;
  /** Links externos (WhatsApp/YouTube) abrem em nova aba. */
  externo?: boolean;
}

const estilos: Record<Variante, string> = {
  // Botão primário: vermelho sólido com texto branco. shadow-md dá separação
  // quando o botão aparece sobre seções vermelhas/vinho; outline-ink no foco
  // porque o outline vermelho global sumiria colado no fundo vermelho.
  vermelho: "bg-red text-paper shadow-md hover:bg-red-ink hover:shadow-lg focus-visible:outline-ink",
  contorno: "border-2 border-ink text-ink hover:bg-ink hover:text-paper hover:shadow-lg",
  // Para uso sobre fundos escuros/vermelhos (contraste AA com texto claro);
  // outline-paper no foco — o outline vermelho global sumiria nesses fundos.
  claro: "border-2 border-paper text-paper hover:bg-paper hover:text-red-ink hover:shadow-lg focus-visible:outline-paper",
};

/**
 * CTA padrão do site — alvo de toque generoso (mobile-first).
 * Feedback: hover muda preenchimento/sombra; foco de teclado usa o outline
 * vermelho global (globals.css → :focus-visible) ou o override da variante.
 */
export function CtaLink({ href, children, variante = "vermelho", evento, externo }: CtaLinkProps) {
  const className = `inline-flex items-center justify-center gap-2 px-6 py-3.5 text-center text-sm font-bold uppercase tracking-widest transition-all ${estilos[variante]} ${evento ?? ""}`;

  if (externo) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
