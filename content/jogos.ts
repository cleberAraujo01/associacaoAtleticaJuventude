import type { Jogo } from "@/types";

/**
 * TODO: conteúdo pendente
 * ⚠️ CONTEÚDO A COLETAR — jogos abaixo são PLACEHOLDERS (adversários e datas fictícios).
 * Substituir pela tabela real da FPFS.
 *
 * Como adicionar um jogo: copie um bloco, ajuste e salve.
 * Após o jogo, adicione o campo `placar` para que apareça como resultado.
 */
export const jogos: Jogo[] = [
  {
    id: "jogo-exemplo-1",
    campeonato: "[Campeonato FPFS — a confirmar]",
    adversario: "[Adversário — a coletar]",
    data: "2026-08-08",
    horario: "19h",
    local: "[Ginásio — a confirmar]",
    mandante: true,
  },
  {
    id: "jogo-exemplo-2",
    campeonato: "[Campeonato FPFS — a confirmar]",
    adversario: "[Adversário — a coletar]",
    data: "2026-08-15",
    horario: "20h",
    local: "[Ginásio — a confirmar]",
    mandante: false,
  },
  {
    id: "jogo-exemplo-0",
    campeonato: "[Campeonato FPFS — a confirmar]",
    adversario: "[Adversário — a coletar]",
    data: "2026-07-25",
    local: "[Ginásio — a confirmar]",
    mandante: true,
    placar: { juventude: 0, adversario: 0 }, // placar fictício — substituir
  },
];
