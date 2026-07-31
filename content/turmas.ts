import type { Turma } from "@/types";

/**
 * Turmas e horários: fonte: tabela oficial "Horários CFA/A.A Juventude"
 * (fevereiro/2026). Horários podem mudar mês a mês: confirmar com a
 * coordenação antes de cada ciclo.
 *
 * TODO: conteúdo pendente: local dos treinos (endereço do ginásio).
 */
export const turmas: Turma[] = [
  {
    id: "sub-8",
    nome: "Sub-8",
    faixaEtaria: "Nascidos em 2018 e 2019",
    treinos: [
      { dia: "Quarta", horario: "20h às 21h" },
      { dia: "Sexta", horario: "20h às 21h" },
      { dia: "Sábado", horario: "15h às 16h" },
    ],
    comissao: ["Treinador: Romanelli", "Auxiliar: Gabriel", "Estagiário: Leandro"],
    local: "[local a confirmar]",
  },
  {
    id: "sub-10",
    nome: "Sub-10",
    faixaEtaria: "Nascidos em 2016 e 2017",
    treinos: [
      { dia: "Terça", horario: "20h às 21h" },
      { dia: "Sexta", horario: "19h às 20h" },
      { dia: "Sábado", horario: "13h às 14h" },
    ],
    comissao: ["Treinador: Claytinho", "Auxiliar: Gabriel", "Estagiário: Leandro"],
    local: "[local a confirmar]",
  },
  {
    id: "sub-12",
    nome: "Sub-12",
    faixaEtaria: "Nascidos em 2014 e 2015",
    treinos: [
      { dia: "Quarta", horario: "19h às 20h" },
      { dia: "Sexta", horario: "18h às 19h" },
      { dia: "Sábado", horario: "16h às 17h" },
    ],
    comissao: ["Treinador: Gabriel", "Auxiliar: Romanelli", "Estagiário: Leandro"],
    local: "[local a confirmar]",
  },
  {
    id: "sub-14",
    nome: "Sub-14",
    faixaEtaria: "Nascidos em 2012 e 2013",
    treinos: [
      { dia: "Terça", horario: "19h às 20h" },
      { dia: "Sexta", horario: "21h às 22h" },
      { dia: "Sábado", horario: "14h às 15h" },
    ],
    comissao: ["Treinador: Claytinho", "Auxiliar: Gabriel", "Estagiário: Leandro"],
    local: "[local a confirmar]",
  },
  {
    id: "sub-16",
    nome: "Sub-16",
    faixaEtaria: "Nascidos em 2010 e 2011",
    treinos: [
      { dia: "Terça", horario: "21h às 22h" },
      { dia: "Quarta", horario: "21h às 22h" },
      { dia: "Sábado", horario: "17h às 18h" },
    ],
    comissao: ["Treinadores: Gabriel e Claytinho", "Estagiário: Leandro"],
    local: "[local a confirmar]",
  },
];
