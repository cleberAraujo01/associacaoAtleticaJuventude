import type { Depoimento } from "@/types";

/**
 * TODO: conteúdo pendente
 * ⚠️ CONTEÚDO A COLETAR — os depoimentos abaixo são PLACEHOLDERS (nomes e
 * falas fictícios, apenas para validar o layout). Antes de publicar:
 *  - coletar depoimentos reais COM autorização de uso de nome e imagem
 *  - prioridade 1: atletas que subiram da base ao time (contaAPonte: true)
 *  - prioridade 2: famílias de alunos da escolinha (alimentam o carrossel
 *    "Palavra de família" da página /escolinha)
 *  - `foto`: retrato da pessoa/família (vertical, em /public)
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
    id: "dep-familia-1",
    autor: "Juliana Silva",
    papel: "Mãe do Lucas · Sub-10",
    texto:
      "Desde que entrou na escolinha, nosso filho ficou mais disciplinado, confiante e apaixonado pelo futsal. Aqui ele é cuidado como atleta e como pessoa.",
    contaAPonte: false,
  },
  {
    id: "dep-familia-2",
    autor: "[Nome — a coletar]",
    papel: "Pai de atleta do Sub-12",
    texto:
      "[Depoimento real a coletar: experiência da família com os treinos e a evolução do filho.]",
    contaAPonte: false,
  },
  {
    id: "dep-familia-3",
    autor: "[Nome — a coletar]",
    papel: "Responsável por atleta do Sub-8",
    texto: "[Depoimento real a coletar: primeira experiência da criança com o futsal no clube.]",
    contaAPonte: false,
  },
];
