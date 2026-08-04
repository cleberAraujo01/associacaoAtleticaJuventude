/**
 * Data layer — ÚNICA porta de acesso ao conteúdo.
 * Componentes de UI nunca importam `content/` diretamente; só estas funções.
 * Motivo: se o clube migrar para um CMS headless no futuro, basta reescrever
 * este arquivo (mesmas assinaturas, mesmos tipos) — zero mudança na UI.
 */
import { atletas } from "@/content/atletas";
import { depoimentos } from "@/content/depoimentos";
import { jogos } from "@/content/jogos";
import { parceiros } from "@/content/parceiros";
import { professores } from "@/content/professores";
import { turmas } from "@/content/turmas";
import { videos } from "@/content/videos";
import type { Atleta, Depoimento, Jogo, Parceiro, Professor, Turma, Video } from "@/types";

export function getTurmas(): Turma[] {
  return turmas;
}

export function getProfessores(): Professor[] {
  return professores;
}

export function getAtletas(): Atleta[] {
  return atletas;
}

/** Patrocinadores primeiro, depois parceiros e por fim apoiadores. */
export function getParceiros(): Parceiro[] {
  const ordem: Record<Parceiro["tipo"], number> = { patrocinador: 0, parceiro: 1, apoiador: 2 };
  return [...parceiros].sort((a, b) => ordem[a.tipo] - ordem[b.tipo]);
}

/** Atletas que subiram da base ao time — prova social da "ponte". */
export function getAtletasDaBase(): Atleta[] {
  return atletas.filter((a) => a.veioDaBase);
}

export function getVideos(): Video[] {
  return videos;
}

export function getDepoimentos(): Depoimento[] {
  return depoimentos;
}

/** Depoimentos que contam a travessia base → time primeiro (mais valiosos). */
export function getDepoimentosDaPonte(): Depoimento[] {
  return [...depoimentos].sort((a, b) => Number(b.contaAPonte) - Number(a.contaAPonte));
}

/** Rodada já disputada = tem placar geral OU placares por categoria. */
function temResultado(jogo: Jogo): boolean {
  return jogo.placar !== undefined || (jogo.placares !== undefined && jogo.placares.length > 0);
}

/** Jogos futuros, do mais próximo ao mais distante. */
export function getProximosJogos(): Jogo[] {
  const hoje = new Date().toISOString().slice(0, 10);
  return jogos
    .filter((j) => !temResultado(j) && j.data >= hoje)
    .sort((a, b) => a.data.localeCompare(b.data));
}

/** Resultados já disputados, do mais recente ao mais antigo. */
export function getResultados(): Jogo[] {
  return jogos.filter(temResultado).sort((a, b) => b.data.localeCompare(a.data));
}

/** Próximo jogo do time (destaque no ticker e na página do time). */
export function getProximoJogo(): Jogo | undefined {
  return getProximosJogos()[0];
}

/** Formata "2026-08-08" → "8 de agosto" (pt-BR), sem depender de lib externa. */
export function formatarData(dataISO: string): string {
  const [ano, mes, dia] = dataISO.split("-").map(Number);
  if (!ano || !mes || !dia) return dataISO;
  const data = new Date(ano, mes - 1, dia);
  return data.toLocaleDateString("pt-BR", { day: "numeric", month: "long" });
}
