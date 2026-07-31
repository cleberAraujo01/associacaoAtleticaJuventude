import type { Professor } from "@/types";

/**
 * Comissão técnica da escolinha — nomes e turmas conforme a tabela oficial
 * "Horários CFA/A.A Juventude" (fevereiro/2026).
 *
 * TODO: conteúdo pendente — CREF, formação e minibiografia de cada um
 * (coletar com a coordenação). A foto vai em /public; sem foto, o card
 * mostra as iniciais.
 */
export const professores: Professor[] = [
  {
    id: "claytinho",
    nome: "Claytinho",
    credenciais: ["Treinador do Sub-10 e do Sub-14", "Comanda o Sub-16 nas terças"],
    descricao:
      "Referência da quadra nas noites de terça, sexta e sábado. Trabalha o fundamento sem abrir mão do jogo.",
    foto: "/professor-cleitinho.webp",
  },
  {
    id: "gabriel-davanzo",
    nome: "Gabriel Davanzo",
    credenciais: ["Treinador do Sub-12 e do Sub-16", "Responsável pelos treinos personal"],
    descricao:
      "Acompanha o atleta da iniciação ao grupo que disputa a FPFS, além dos horários de personal.",
  },
  {
    id: "romanelli",
    nome: "Romanelli",
    credenciais: ["Treinador do Sub-8", "Auxiliar no Sub-12"],
    descricao:
      "Cuida da porta de entrada da escolinha: as primeiras turmas, onde a base do futsal é construída.",
  },
  {
    id: "leandro",
    nome: "Leandro",
    credenciais: ["Estagiário da comissão", "Apoia todas as categorias"],
    descricao:
      "Presente nos treinos de todas as turmas, do Sub-8 ao Sub-16, apoiando os treinadores em quadra.",
  },
];
