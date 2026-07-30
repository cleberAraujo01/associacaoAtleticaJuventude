import type { Atleta } from "@/types";

/**
 * TODO: conteúdo pendente
 * ⚠️ CONTEÚDO A COLETAR — todos os atletas abaixo são PLACEHOLDERS.
 * Substituir por elenco real fornecido pelo clube (nome, posição, trajetória, foto).
 *
 * Como adicionar um atleta: copie um bloco, troque os dados e salve.
 * Se `veioDaBase: true`, preencha `anoBase` e `anoSubida` — esses atletas
 * aparecem em destaque na seção "da base ao time" (prova social).
 */
export const atletas: Atleta[] = [
  {
    id: "atleta-exemplo-1",
    nome: "[Nome do atleta — a coletar]",
    posicao: "Ala",
    veioDaBase: true,
    anoBase: 2019,
    anoSubida: 2024,
  },
  {
    id: "atleta-exemplo-2",
    nome: "[Nome do atleta — a coletar]",
    posicao: "Pivô",
    veioDaBase: true,
    anoBase: 2018,
    anoSubida: 2023,
  },
  {
    id: "atleta-exemplo-3",
    nome: "[Nome do atleta — a coletar]",
    posicao: "Goleiro",
    veioDaBase: false,
  },
  {
    id: "atleta-exemplo-4",
    nome: "[Nome do atleta — a coletar]",
    posicao: "Fixo",
    veioDaBase: false,
  },
];
