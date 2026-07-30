import { TickerMarquee } from "@/components/layout/TickerMarquee";
import { site } from "@/config/site";
import { getProximoJogo, formatarData } from "@/lib/content";

/**
 * Letreiro fino acima do header com o próximo jogo do time.
 * Server Component: lê o dado da data layer em build e delega a animação
 * (com controle de pausa e link do mapa) ao TickerMarquee (client).
 */
export function Ticker() {
  const jogo = getProximoJogo();
  if (!jogo) return null;

  const confronto = jogo.mandante
    ? `Juventude x ${jogo.adversario}`
    : `${jogo.adversario} x Juventude`;
  const prefixo = `Próximo jogo — ${confronto} · ${formatarData(jogo.data)}${jogo.horario ? ` · ${jogo.horario}` : ""} · `;

  // Link do mapa gerado a partir do nome do local; omitido enquanto o
  // conteúdo for placeholder ("[Ginásio — a confirmar]").
  // TODO: conteúdo pendente — confirmar nome/endereço real do ginásio (content/jogos.ts)
  const localEhPlaceholder = jogo.local.startsWith("[");
  const mapaUrl = localEhPlaceholder
    ? undefined
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${jogo.local}, ${site.cidade}`)}`;

  return <TickerMarquee prefixo={prefixo} local={jogo.local} mapaUrl={mapaUrl} />;
}
