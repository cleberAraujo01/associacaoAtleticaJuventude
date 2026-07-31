import { TickerMarquee } from "@/components/layout/TickerMarquee";
import { site } from "@/config/site";
import { formatarData, getProximoJogo, getResultados } from "@/lib/content";

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
  // O rótulo "Próximo jogo" vive no selo fixo do TickerMarquee — aqui só o confronto
  const prefixo = `${confronto} · ${formatarData(jogo.data)}${jogo.horario ? ` · ${jogo.horario}` : ""} · `;

  // Link do mapa gerado a partir do nome do local; omitido enquanto o
  // conteúdo for placeholder ("[Ginásio — a confirmar]").
  // TODO: conteúdo pendente — confirmar nome/endereço real do ginásio (content/jogos.ts)
  const localEhPlaceholder = jogo.local.startsWith("[");
  const mapaUrl = localEhPlaceholder
    ? undefined
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${jogo.local}, ${site.cidade}`)}`;

  // Último resultado entra no letreiro como segunda mensagem (se existir):
  // o giro alterna "quem vem aí" e "como foi" — letreiro vivo, de clube.
  const ultimo = getResultados()[0];
  const extras: string[] = [];
  if (ultimo?.placar) {
    const placar = ultimo.mandante
      ? `Juventude ${ultimo.placar.juventude} x ${ultimo.placar.adversario} ${ultimo.adversario}`
      : `${ultimo.adversario} ${ultimo.placar.adversario} x ${ultimo.placar.juventude} Juventude`;
    extras.push(`Último jogo · ${placar}`);
  }

  return <TickerMarquee prefixo={prefixo} local={jogo.local} mapaUrl={mapaUrl} extras={extras} />;
}
