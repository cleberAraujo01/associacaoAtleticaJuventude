import type { Parceiro } from "@/types";

/**
 * Patrocinadores e parceiros do clube.
 * Como adicionar: coloque o logo (PNG com fundo transparente) em /public/parceiros,
 * copie um bloco abaixo e ajuste. Aparece automaticamente na home e no footer.
 */
export const parceiros: Parceiro[] = [
  {
    id: "araujo-servicos",
    nome: "Araujo Serviços",
    descricao: "Tecnologia da Informação",
    logo: "/parceiros/araujo-servicos.png",
    // url: "https://...", // TODO: conteúdo pendente — site/perfil da empresa, se houver
    tipo: "apoiador",
  },
];
