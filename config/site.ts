/**
 * Configuração central do site: navegação, links externos e metadados.
 * Única fonte de verdade — nenhum link externo deve ser digitado direto no JSX.
 */

export const site = {
  nome: "Associação Atlética Juventude",
  nomeCurto: "AA Juventude",
  descricao:
    "Futsal em Santana de Parnaíba/SP: escolinha do Sub-8 ao Sub-18 e time de competição na FPFS. Da base ao time.",
  cidade: "Santana de Parnaíba/SP",
  endereco:
    "Estr. Rosemari Hidalgo dos Santos, 149 - Antigo número 81 - Refúgio dos Bandeirantes, Santana de Parnaíba - SP, 06506-001",
  url: "https://aajuventude.com.br", // TODO: conteúdo pendente — domínio a confirmar com o clube
} as const;

export const nav = [
  { href: "/", label: "Início" },
  { href: "/escolinha", label: "Escolinha" },
  { href: "/time", label: "Time" },
  { href: "/quem-somos", label: "Quem somos" },
  { href: "/canais", label: "Canais" },
  // "/apoie" fora do menu principal: a captação de apoio acontece pela seção
  // de patrocinadores na home e no footer (decisão de foco do menu nas 2 trilhas).
] as const;

/**
 * Links secundários que no desktop vivem no footer (Páginas extras + Market).
 * No mobile o footer mostra só os brasões, então eles migram para o menu
 * hambúrguer do header — fonte única para não divergirem.
 */
export const navExtra = [
  { href: "/apoie", label: "Apoie o clube" },
  { href: "/parceiros", label: "Parceiros e apoiadores" },
  { href: "/contato", label: "Contato" },
] as const;

/**
 * Links externos.
 * Contatos oficiais conforme o flyer "Estrutura Técnica" do clube:
 * WhatsApp 11 94112-6936 · Instagram @a.a_juventude · cfajuventude@gmail.com.
 */
export const links = {
  whatsappMatricula:
    "https://wa.me/5511941126936?text=" +
    encodeURIComponent("Olá! Quero matricular na escolinha da AA Juventude."),
  whatsappApoio:
    "https://wa.me/5511941126936?text=" + encodeURIComponent("Olá! Quero apoiar a AA Juventude."),
  youtube: "https://www.youtube.com/@C.F.AJuventude",
  instagram: "https://www.instagram.com/a.a_juventude",
  facebook: "https://www.facebook.com/profile.php?id=100063646510080",
  email: "cfajuventude@gmail.com",
  /** Link para o local no Google Maps (abre o app/site do Maps). */
  maps: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.endereco)}`,
  /** URL de embed do Google Maps para o iframe da página de contato (sem API key). */
  mapsEmbed: `https://www.google.com/maps?q=${encodeURIComponent(site.endereco)}&output=embed`,
} as const;

/**
 * Nomes de eventos do Plausible (analytics sem cookie).
 * Uso: classe CSS `plausible-event-name=<evento>` no link — zero JS próprio.
 * Métricas do projeto:
 *  - ctaMatricula: conversão principal (escolinha)
 *  - ponteBaseTime: cliques na "métrica da ponte" (navegação escolinha ↔ time)
 *  - saidaYoutube / saidaWhatsapp: saídas para canais externos
 */
export const eventos = {
  ctaMatricula: "plausible-event-name=cta_matricula",
  ctaAcompanharTime: "plausible-event-name=cta_acompanhar_time",
  ponteBaseTime: "plausible-event-name=ponte_base_time",
  saidaYoutube: "plausible-event-name=saida_youtube",
  saidaWhatsapp: "plausible-event-name=saida_whatsapp",
} as const;

/**
 * Canais oficiais do clube — fonte única usada pelo mega menu do header
 * e pela página /canais (nada de canal hardcoded no JSX).
 */
export const canais = [
  {
    nome: "YouTube",
    descricao: "Jogos completos, amistosos e melhores momentos da base.",
    href: links.youtube,
    acao: "Inscrever-se no canal",
    evento: eventos.saidaYoutube,
  },
  {
    nome: "Instagram",
    descricao: "Bastidores, avisos de treino e o dia a dia do clube.",
    href: links.instagram,
    acao: "Seguir o clube",
    evento: "", // sem métrica dedicada por enquanto
  },
  {
    nome: "Facebook",
    descricao: "Notícias, fotos dos jogos e a comunidade do clube.",
    href: links.facebook,
    acao: "Curtir a página",
    evento: "", // sem métrica dedicada por enquanto
  },
  {
    nome: "WhatsApp",
    descricao: "Canal direto para matrículas, dúvidas e apoio.",
    href: links.whatsappMatricula,
    acao: "Chamar no WhatsApp",
    evento: eventos.saidaWhatsapp,
  },
] as const;
