import type { Jogo } from "@/types";

/**
 * TODO: conteúdo pendente
 * ⚠️ CONTEÚDO A COLETAR — jogos abaixo são PLACEHOLDERS (adversários e datas fictícios).
 * Substituir pela tabela real da FPFS.
 *
 * Como adicionar uma rodada: copie um bloco, ajuste e salve. Todas as
 * categorias (Sub-08 a Sub-16) jogam no mesmo dia e no mesmo ginásio, cada
 * uma no seu horário — preencha `categorias` com os horários; se omitido,
 * a UI assume todas, sem horários individuais. O `horario` geral é o do
 * primeiro jogo da rodada.
 * Após a rodada, adicione `placares` (um placar por categoria) para aparecer
 * como resultado; `placar` (geral/destaque) segue alimentando o ticker.
 */
export const jogos: Jogo[] = [
  {
    id: "jogo-exemplo-1",
    campeonato: "[Campeonato FPFS a confirmar]",
    adversario: "[Adversário a coletar]",
    data: "2026-08-08",
    horario: "14h",
    local: "[Ginásio a confirmar]",
    mandante: true,
    // horários fictícios — substituir pelos reais da tabela da FPFS
    categorias: [
      { categoria: "Sub-08", horario: "14h" },
      { categoria: "Sub-10", horario: "15h" },
      { categoria: "Sub-12", horario: "16h" },
      { categoria: "Sub-14", horario: "17h" },
      { categoria: "Sub-16", horario: "18h" },
    ],
  },
  {
    id: "jogo-exemplo-2",
    campeonato: "[Campeonato FPFS a confirmar]",
    adversario: "[Adversário a coletar]",
    data: "2026-08-15",
    horario: "20h",
    local: "[Ginásio a confirmar]",
    mandante: false,
  },
  {
    id: "jogo-exemplo-0",
    campeonato: "[Campeonato FPFS a confirmar]",
    adversario: "[Adversário a coletar]",
    data: "2026-07-25",
    local: "[Ginásio a confirmar]",
    mandante: true,
    placar: { juventude: 0, adversario: 0 }, // placar fictício — substituir
    // placares fictícios por categoria — substituir pelos reais da rodada
    placares: [
      { categoria: "Sub-08", juventude: 0, adversario: 0 },
      { categoria: "Sub-10", juventude: 0, adversario: 0 },
      { categoria: "Sub-12", juventude: 0, adversario: 0 },
      { categoria: "Sub-14", juventude: 0, adversario: 0 },
      { categoria: "Sub-16", juventude: 0, adversario: 0 },
    ],
  },
];
