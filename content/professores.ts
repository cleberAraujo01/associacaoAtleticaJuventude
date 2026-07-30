import type { Professor } from "@/types";

/**
 * TODO: conteúdo pendente
 * ⚠️ CONTEÚDO A COLETAR — os professores abaixo são PLACEHOLDERS.
 * Substituir por dados reais: nome, registro CREF, formações e foto.
 *
 * Como adicionar um professor: copie um bloco, ajuste e salve.
 * A foto (opcional) vai em /public/professores — sem foto, o card mostra as iniciais.
 */
export const professores: Professor[] = [
  {
    id: "professor-exemplo-1",
    nome: "[Nome do professor — a coletar]",
    cref: "[CREF — a coletar]",
    credenciais: [
      "[Formação — a coletar (ex.: Educação Física)]",
      "[Curso de futsal — a coletar]",
      "[Experiência — a coletar]",
    ],
    descricao: "[Descrição a coletar: turmas que atende e abordagem de trabalho.]",
  },
  {
    id: "professor-exemplo-2",
    nome: "[Nome do professor — a coletar]",
    cref: "[CREF — a coletar]",
    credenciais: ["[Formação — a coletar]", "[Experiência — a coletar]"],
    descricao: "[Descrição a coletar: turmas que atende e abordagem de trabalho.]",
  },
];
