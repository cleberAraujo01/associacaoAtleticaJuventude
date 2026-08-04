import type { Video } from "@/types";
import { YouTubeFacade } from "./YouTubeFacade";

interface VideoGridProps {
  videos: Video[];
}

/**
 * Mosaico de vídeos (Server Component), no padrão de galeria de clube:
 * o primeiro vídeo em destaque (2x2) e os demais empilhados na coluna ao lado —
 * como todos os tiles são 16:9, as alturas fecham exatas (2 colunas = 2 linhas).
 * Título e selo ficam sobrepostos à thumbnail (somem quando o player carrega).
 * Selo: branco = time/federação, vermelho = escolinha (paleta sem dourado).
 */
export function VideoGrid({ videos }: VideoGridProps) {
  return (
    <ul className="grid gap-2 sm:grid-cols-3">
      {videos.map((video, indice) => {
        const destaque = indice === 0;
        return (
          <li key={video.id} className={destaque ? "sm:col-span-2 sm:row-span-2" : ""}>
            <YouTubeFacade
              youtubeId={video.youtubeId}
              titulo={video.titulo}
              overlay={
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-ink/90 to-transparent p-3 pt-10 text-left"
                >
                  <span
                    className={`font-semibold text-paper ${destaque ? "text-base sm:text-lg" : "text-sm"}`}
                  >
                    {video.titulo}
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${
                      video.estagio === "time" ? "bg-paper text-ink" : "bg-red text-white"
                    }`}
                  >
                    {video.estagio === "time" ? "Time" : "Escolinha"}
                  </span>
                </span>
              }
            />
          </li>
        );
      })}
    </ul>
  );
}
