import type { Video } from "@/types";

/**
 * Vídeos reais do canal do clube (youtube.com/@C.F.AJuventude), coletados em 29/07/2026.
 * Como adicionar um vídeo: copie o trecho depois de "watch?v=" da URL do YouTube
 * (ex.: youtube.com/watch?v=ABC123 → youtubeId: "ABC123"), dê um título e salve.
 * `estagio` define o selo: "escolinha" (vermelho) ou "time" (branco).
 *
 * NOTA: o canal também tem Shorts com títulos só de hashtags — omitidos aqui
 * (títulos sem hashtag funcionam melhor no site). Nenhum vídeo do time
 * principal identificado ainda; quando houver, marcar estagio: "time".
 */
export const videos: Video[] = [
  {
    id: "raca-gigante",
    youtubeId: "KESCMw4ZEy8",
    titulo: "O placar é detalhe, a raça é gigante! ⚽",
    estagio: "escolinha",
  },
  {
    id: "amistoso-sub10-nacional",
    youtubeId: "9Ildt9R0SSc",
    titulo: "Amistoso Sub-10 — CFA Juventude x Nacional Academy",
    estagio: "escolinha",
  },
  {
    id: "amistoso-sub9-nacional",
    youtubeId: "CpjmZ-tGIR8",
    titulo: "Amistoso Sub-9 — CFA Juventude x Nacional Academy",
    estagio: "escolinha",
  },
  {
    id: "amistoso-sub8-nacional",
    youtubeId: "juy_atkZqtE",
    titulo: "Amistoso Sub-8 — CFA Juventude x Nacional Academy",
    estagio: "escolinha",
  },
  {
    id: "amistoso-sub7-nacional",
    youtubeId: "WQ0cvisoJAk",
    titulo: "Amistoso Sub-7 — CFA Juventude x Nacional Academy",
    estagio: "escolinha",
  },
  {
    id: "coordenacao-diversao",
    youtubeId: "VfVGa34O10Y",
    titulo: "Coordenação e diversão em cada passo",
    estagio: "escolinha",
  },
];
