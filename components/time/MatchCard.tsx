import Image from "next/image";
import type { Jogo } from "@/types";

interface MatchCardProps {
  jogo: Jogo;
  /** true = resultado disputado (mostra placar); false = jogo futuro (mostra data/hora). */
  passado?: boolean;
}

/** Placeholders da data layer começam com "[" — nunca expor colchetes ao público. */
function ehPlaceholder(texto: string | undefined): boolean {
  return !texto || texto.trim().startsWith("[");
}

/** Todas as categorias entram em quadra na mesma rodada da FPFS. */
const TODAS_CATEGORIAS = ["Sub-08", "Sub-10", "Sub-12", "Sub-14", "Sub-16"].map((categoria) => ({
  categoria,
  horario: undefined as string | undefined,
}));

/** "2026-08-08" → { dia: "08", mes: "AGO" } */
function partesDaData(dataISO: string): { dia: string; mes: string } {
  const [ano, mes, dia] = dataISO.split("-").map(Number);
  if (!ano || !mes || !dia) return { dia: "--", mes: "---" };
  const abreviacao = new Date(ano, mes - 1, dia)
    .toLocaleDateString("pt-BR", { month: "short" })
    .replace(".", "")
    .toUpperCase();
  return { dia: String(dia).padStart(2, "0"), mes: abreviacao };
}

/** Infere vitória/derrota/empate — a cor nunca fica sozinha (tem rótulo + sr-only). */
function inferirResultado(juventude: number, adversario: number) {
  const rotulo =
    juventude > adversario ? "vitória" : juventude < adversario ? "derrota" : "empate";
  const srTexto =
    rotulo === "vitória"
      ? `Vitória do Juventude por ${juventude} a ${adversario}`
      : rotulo === "derrota"
        ? `Derrota do Juventude por ${adversario} a ${juventude}`
        : `Empate em ${juventude} a ${adversario}`;
  return { rotulo, srTexto };
}

/** Cor do placar sobre fundo claro (base do cartão). */
const COR_CLARO: Record<string, string> = {
  vitória: "text-emerald-600",
  derrota: "text-red-ink",
  empate: "text-ink/50",
};

/**
 * Cartão de confronto em formato de INGRESSO DE MATCHDAY: topo escuro estilo
 * pôster (grafismo diagonal vermelho, marca d'água da FPFS, escudos e "VS"
 * gigante em contorno), selo de data com o corte diagonal do clube, separador
 * perfurado de ticket e, na base clara, a tabela da rodada — todas as
 * categorias jogam no mesmo dia e ginásio, cada uma no seu horário (futuro)
 * ou com seu placar (resultado). Placeholders ("[...]") viram estados neutros.
 */
export function MatchCard({ jogo, passado = false }: MatchCardProps) {
  const adversarioDefinido = !ehPlaceholder(jogo.adversario);
  const temLocal = !ehPlaceholder(jogo.local);
  const temCampeonato = !ehPlaceholder(jogo.campeonato);
  const { dia, mes } = partesDaData(jogo.data);
  const categorias = jogo.categorias ?? TODAS_CATEGORIAS;
  const temHorarios = !passado && categorias.some((c) => c.horario);
  const placares = jogo.placares;
  const placar = jogo.placar;
  const geral = placar ? inferirResultado(placar.juventude, placar.adversario) : undefined;
  // Placar geral no topo escuro: verde claro/vermelho vivo/creme apagado
  const corGeralNoEscuro =
    geral?.rotulo === "vitória"
      ? "text-emerald-400"
      : geral?.rotulo === "derrota"
        ? "text-red"
        : "text-paper/60";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden border border-ink/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl">
      {/* ===== TOPO: pôster de matchday ===== */}
      <div className="relative overflow-hidden bg-ink px-5 pb-7 pt-12 text-paper sm:px-6">
        {/* Grafismo: lâminas diagonais vermelhas atravessando o fundo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-y-6 left-1/2 w-40 -translate-x-1/2 -skew-x-[18deg] bg-red/15 transition-colors duration-500 group-hover:bg-red/25"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-y-6 left-1/2 ml-28 w-8 -translate-x-1/2 -skew-x-[18deg] bg-red/10"
        />
        {/* Marca d'água FPFS */}
        <Image
          src="/brasao-fpfs.webp"
          alt=""
          aria-hidden="true"
          width={224}
          height={224}
          className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 object-contain opacity-10"
        />
        {/* Selo da data — o corte diagonal assinatura do clube */}
        <div className="absolute left-0 top-0 flex items-baseline gap-1.5 bg-red py-2 pl-4 pr-7 [clip-path:polygon(0_0,100%_0,85%_100%,0_100%)]">
          <span className="font-display text-2xl leading-none">{dia}</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em]">{mes}</span>
        </div>
        {/* Rótulo da rodada */}
        <p className="absolute right-4 top-3 text-[9px] font-bold uppercase tracking-[0.3em] text-paper/50">
          Rodada FPFS
        </p>

        <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6">
          {/* Juventude */}
          <div className="flex flex-col items-center gap-2 text-center">
            <Image
              src="/brasao.webp"
              alt="Brasão da Associação Atlética Juventude"
              width={64}
              height={64}
              className="h-14 w-14 rounded-full bg-white p-1 ring-2 ring-paper/25 sm:h-16 sm:w-16"
            />
            <p className="font-display text-sm uppercase leading-tight sm:text-base">Juventude</p>
          </div>

          {/* Centro: selo FPFS + placar geral (resultado) ou VS gigante (futuro) */}
          <div className="flex flex-col items-center gap-1.5">
            <Image
              src="/brasao-fpfs.webp"
              alt="Filiado à Federação Paulista de Futsal"
              width={32}
              height={32}
              className="h-7 w-7 object-contain"
            />
            {passado && placar && geral ? (
              <>
                <p className={`font-display text-4xl leading-none sm:text-5xl ${corGeralNoEscuro}`}>
                  {placar.juventude}
                  <span className="mx-1.5 text-2xl text-paper/30 sm:text-3xl">x</span>
                  {placar.adversario}
                </p>
                <span className="sr-only">{geral.srTexto}</span>
                <p
                  aria-hidden="true"
                  className="text-[10px] font-bold uppercase tracking-[0.25em] text-paper/60"
                >
                  {geral.rotulo}
                </p>
              </>
            ) : (
              <>
                {/* VS em contorno — número de camisa do confronto */}
                <p
                  aria-hidden="true"
                  className="font-display text-4xl leading-none text-transparent [-webkit-text-stroke:2px_var(--color-paper)] sm:text-5xl"
                >
                  VS
                </p>
                <span className="sr-only">contra</span>
                {jogo.horario && (
                  <p className="text-xs font-semibold text-paper/70">
                    {temHorarios ? `a partir de ${jogo.horario}` : jogo.horario}
                  </p>
                )}
              </>
            )}
          </div>

          {/* Adversário — círculo tracejado neutro enquanto não definido */}
          <div className="flex flex-col items-center gap-2 text-center">
            {adversarioDefinido ? (
              <>
                <span
                  aria-hidden="true"
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-paper/10 font-display text-xl uppercase text-paper/70 ring-2 ring-paper/25 sm:h-16 sm:w-16"
                >
                  {jogo.adversario.trim().charAt(0)}
                </span>
                <p className="font-display text-sm uppercase leading-tight sm:text-base">
                  {jogo.adversario}
                </p>
              </>
            ) : (
              <>
                <span
                  aria-hidden="true"
                  className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-paper/30 text-xl font-bold text-paper/40 sm:h-16 sm:w-16"
                >
                  ?
                </span>
                <p className="text-xs font-semibold uppercase tracking-wide text-paper/50">
                  A confirmar
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ===== Separador perfurado de ingresso ===== */}
      <div aria-hidden="true" className="relative h-0">
        <span className="absolute -left-2.5 -top-2.5 h-5 w-5 rounded-full bg-paper" />
        <span className="absolute -right-2.5 -top-2.5 h-5 w-5 rounded-full bg-paper" />
      </div>

      {/* ===== BASE: tabela da rodada + badges ===== */}
      <div className="flex flex-1 flex-col border-t-2 border-dashed border-ink/15 bg-white px-5 pb-5 pt-4 sm:px-6">
        {passado && placares && placares.length > 0 ? (
          // Placar de cada categoria — cor + rótulo + texto de leitor de tela
          <ul className="divide-y divide-ink/10">
            {placares.map((p) => {
              const r = inferirResultado(p.juventude, p.adversario);
              return (
                <li key={p.categoria} className="flex items-center justify-between gap-3 py-2">
                  <span className="inline-flex items-center bg-red px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-paper [clip-path:polygon(0_0,100%_0,88%_100%,0_100%)]">
                    {p.categoria}
                  </span>
                  <span className="flex items-baseline gap-2">
                    <span
                      aria-hidden="true"
                      className={`font-display text-xl leading-none ${COR_CLARO[r.rotulo]}`}
                    >
                      {p.juventude}
                      <span className="mx-1 text-sm text-ink/30">x</span>
                      {p.adversario}
                    </span>
                    <span className="sr-only">{`${p.categoria}: ${r.srTexto}`}</span>
                    <span
                      aria-hidden="true"
                      className="w-14 text-right text-[10px] font-bold uppercase tracking-[0.15em] text-ink/40"
                    >
                      {r.rotulo}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        ) : temHorarios ? (
          // Mesmo ginásio, horários diferentes: tabela de quadra da rodada
          <ul className="divide-y divide-ink/10">
            {categorias.map((c) => (
              <li key={c.categoria} className="flex items-center justify-between gap-3 py-2">
                <span className="inline-flex items-center bg-red px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-paper [clip-path:polygon(0_0,100%_0,88%_100%,0_100%)]">
                  {c.categoria}
                </span>
                <span className="font-display text-lg leading-none text-red-ink">
                  {c.horario ?? "a definir"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          // Sem horários por categoria ainda: chips das subs da rodada
          <div className="flex flex-wrap justify-center gap-1.5">
            {categorias.map((c) => (
              <span
                key={c.categoria}
                className="inline-flex items-center bg-red px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-paper [clip-path:polygon(0_0,100%_0,92%_100%,0_100%)]"
              >
                {c.categoria}
              </span>
            ))}
          </div>
        )}

        {/* Badges de local e campeonato — só com dado real; senão, um único
            badge neutro */}
        <div className="mt-auto flex flex-wrap justify-center gap-2 pt-4">
          {temLocal && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/5 px-3 py-1 text-xs font-semibold text-ink/70">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5 text-red-ink"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {jogo.local}
              <span className="text-ink/40">· {jogo.mandante ? "em casa" : "fora"}</span>
            </span>
          )}
          {temCampeonato && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/5 px-3 py-1 text-xs font-semibold text-ink/70">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5 text-red-ink"
              >
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
              {jogo.campeonato}
            </span>
          )}
          {!temLocal && !temCampeonato && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/5 px-3 py-1 text-xs font-semibold text-ink/50">
              Local a definir
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
