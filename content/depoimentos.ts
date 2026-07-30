import type { Depoimento } from "@/types";

/**
 * TODO: conteúdo pendente
 * ⚠️ CONTEÚDO A COLETAR — os depoimentos abaixo são PLACEHOLDERS.
 * Coletar depoimentos reais (com autorização de uso de nome/imagem):
 *  - prioridade 1: atletas que subiram da base ao time (contaAPonte: true)
 *  - prioridade 2: famílias de alunos da escolinha
 */
export const depoimentos: Depoimento[] = [
  {
    id: "dep-exemplo-1",
    autor: "[Nome — a coletar]",
    papel: "Atleta formado na base",
    texto: "[Depoimento real a coletar: trajetória da escolinha até o time competitivo.]",
    contaAPonte: true,
  },
  {
    id: "dep-exemplo-2",
    autor: "[Nome — a coletar]",
    papel: "Responsável por aluno da escolinha",
    texto: "[Depoimento real a coletar: experiência da família com a escolinha.]",
    contaAPonte: false,
  },
];
