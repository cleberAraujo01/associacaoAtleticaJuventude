/**
 * Contratos do domínio do clube.
 * Camada de tipos: todo conteúdo em `content/` DEVE satisfazer estes tipos —
 * o build falha se um dado obrigatório faltar (validação em tempo de compilação).
 */

/** Estágio da jornada "da base ao time" — espinha dorsal do site. */
export type Estagio = "escolinha" | "time";

export interface Atleta {
  id: string;
  nome: string;
  posicao: string;
  /** Atleta formado na base que subiu ao time — a prova social mais valiosa. */
  veioDaBase: boolean;
  /** Ano em que entrou na escolinha (se veio da base). */
  anoBase?: number;
  /** Ano em que subiu ao time (se veio da base). */
  anoSubida?: number;
  /** Caminho da foto em /public (opcional até o clube coletar as fotos). */
  foto?: string;
}

/** Um horário de treino da turma. */
export interface Treino {
  dia: string;
  horario: string;
}

export interface Turma {
  id: string;
  nome: string;
  faixaEtaria: string;
  treinos: Treino[];
  /** Comissão técnica da turma (ex.: "Treinador — Romanelli"). */
  comissao: string[];
  local: string;
}

export type ResultadoJogo = "vitoria" | "empate" | "derrota";

export interface Jogo {
  id: string;
  campeonato: string;
  adversario: string;
  /** Data ISO (AAAA-MM-DD) — formatada na UI. */
  data: string;
  horario?: string;
  local: string;
  mandante: boolean;
  /** Preenchido apenas após o jogo. */
  placar?: {
    juventude: number;
    adversario: number;
  };
}

export interface Depoimento {
  id: string;
  autor: string;
  /** Ex.: "Mãe de atleta da escolinha", "Atleta do time principal". */
  papel: string;
  texto: string;
  /** Depoimento que conta a travessia base → time (prioridade na home). */
  contaAPonte: boolean;
}

export interface Video {
  id: string;
  /** ID do vídeo no YouTube (trecho após watch?v=). */
  youtubeId: string;
  titulo: string;
  /** A qual estágio da jornada o vídeo pertence (guia o selo visual). */
  estagio: Estagio;
}

export interface Parceiro {
  id: string;
  nome: string;
  /** Descrição curta (ex.: ramo de atuação). */
  descricao?: string;
  /** Caminho do logo em /public (fundo transparente de preferência). */
  logo: string;
  /** Site ou perfil do parceiro (opcional). */
  url?: string;
  tipo: "patrocinador" | "parceiro" | "apoiador";
}

export interface Professor {
  id: string;
  nome: string;
  /** Registro profissional (ex.: "CREF 000000-G/SP"). */
  cref?: string;
  /** Cursos, formações e experiências relevantes. */
  credenciais: string[];
  /** Breve descrição do trabalho com as turmas. */
  descricao: string;
  /** Caminho da foto em /public (opcional até o clube coletar as fotos). */
  foto?: string;
}
