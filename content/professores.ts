import type { Professor } from "@/types";

/**
 * Comissão técnica da escolinha — nomes e turmas conforme a tabela oficial
 * "Horários CFA/A.A Juventude" (fevereiro/2026).
 * Fotos oficiais (ensaio com uniforme do clube) em /public.
 *
 * `frase` é a citação pessoal que humaniza o card (aprovar com cada treinador).
 * TODO: conteúdo pendente — CREF, formação e anos de experiência de cada um
 * (coletar com a coordenação).
 */
export const professores: Professor[] = [
  {
    id: "claytinho",
    nome: "Claytinho",
    categorias: "Sub-10 · Sub-14 · Sub-16",
    frase: "Fundamento antes do resultado.",
    credenciais: ["Treinador do Sub-10 e do Sub-14", "Comanda o Sub-16 nas terças"],
    descricao:
      "Referência da quadra nas noites de terça, sexta e sábado. Trabalha o fundamento sem abrir mão do jogo.",
    foto: "/professor-cleitinho.webp",
  },
  {
    id: "gabriel-davanzo",
    nome: "Gabriel Davanzo",
    categorias: "Sub-12 · Sub-16 · Personal",
    frase: "Formar atleta é formar pessoa primeiro.",
    credenciais: ["Treinador do Sub-12 e do Sub-16", "Responsável pelos treinos personal"],
    descricao:
      "Acompanha o atleta da iniciação ao grupo que disputa a FPFS, além dos horários de personal.",
    foto: "/professor-gabriel.webp",
  },
  {
    id: "romanelli",
    nome: "Romanelli",
    categorias: "Sub-8 · Sub-12",
    frase: "É na primeira turma que nasce o amor pelo jogo.",
    credenciais: ["Treinador do Sub-8", "Auxiliar no Sub-12"],
    descricao:
      "Cuida da porta de entrada da escolinha: as primeiras turmas, onde a base do futsal é construída.",
    foto: "/professor-romanelli.webp",
  },
  {
    id: "luizao",
    nome: "Luizão",
    categorias: "Goleiros",
    frase: "Goleiro se constrói com técnica e confiança.",
    credenciais: ["Treinador de goleiros", "Atende todas as categorias"],
    descricao:
      "Cuida da posição mais solitária da quadra: técnica, posicionamento e confiança para os goleiros de todas as turmas.",
    foto: "/professor-luizao-2.webp",
  },
  {
    id: "leandro",
    nome: "Leandro",
    categorias: "Todas as turmas",
    frase: "Cada treino é uma chance de evoluir junto.",
    credenciais: ["Estagiário da comissão", "Apoia todas as categorias"],
    descricao:
      "Presente nos treinos de todas as turmas, do Sub-8 ao Sub-16, apoiando os treinadores em quadra.",
    foto: "/professor-leandro.webp",
  },
];
