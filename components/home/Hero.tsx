import Image from "next/image";
import { ChannelIcon } from "@/components/ui/ChannelIcon";
import { CtaLink } from "@/components/ui/CtaLink";
import { eventos, links, site } from "@/config/site";

/**
 * Hero da home: banner de textura vermelha (sem ponto focal — bg-center serve
 * em qualquer largura). bg-red é o fallback enquanto a imagem carrega.
 * O LCP segue sendo o h1.
 */
export function Hero() {
  return (
    <section className="relative flex items-center overflow-hidden bg-red bg-[url('/banner-hero-2.webp')] bg-cover bg-center text-paper lg:aspect-[1920/634]">
      {/* Mascote estático com profundidade via drop-shadow. Decorativo (alt vazio);
          no mobile fica atrás do texto, com opacidade reduzida. */}
      <Image
        src="/mascote.webp"
        alt=""
        width={515}
        height={484}
        priority
        className="pointer-events-none absolute bottom-16 right-0 w-[24rem] opacity-40 drop-shadow-[0_28px_36px_rgba(0,0,0,0.55)] sm:w-[27rem] sm:opacity-60 md:bottom-20 md:right-4 md:opacity-100 lg:bottom-8 lg:right-16 lg:w-[38rem] xl:right-28"
      />
      <div className="relative mx-auto w-full max-w-[96rem] px-4 py-16 sm:py-24 lg:py-10">
        {/* Sombra suave em todo o bloco de texto — legibilidade sobre a textura do banner */}
        <div className="max-w-3xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] lg:pl-20">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-paper/90">
            Futsal · {site.cidade}
          </p>
          <h1 className="font-display text-5xl uppercase leading-[0.95] sm:text-7xl">
            Da base ao time.{" "}
            {/* Segunda linha em serigrafia (contorno paper) — assinatura visual do
                site; vermelho ou preto chapado sumiriam sobre o banner vermelho */}
            <span className="block text-transparent [-webkit-text-stroke:2px_var(--color-paper)]">
              Uma só jornada.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper">
            Escolinha do Sub-8 ao Sub-16 e time adulto na quadra da Federação Paulista de Futsal. Do
            primeiro treino ao jogo grande, a mesma camisa.
          </p>
        </div>
        {/* CTA primário (conversão principal do negócio = matrícula/mensalidade)
            e secundário (engajamento com o time) — direto, sem pergunta de template */}
        <div className="mt-9 lg:pl-20">
          <div className="flex flex-col gap-3 sm:flex-row">
            <CtaLink
              href={links.whatsappMatricula}
              variante="vermelho"
              evento={`${eventos.ctaMatricula} ${eventos.saidaWhatsapp}`}
              externo
            >
              <ChannelIcon canal="WhatsApp" />
              Matricular na escolinha
            </CtaLink>
            {/* "claro" (contorno paper) — o contorno ink sumia sobre o fundo vermelho */}
            <CtaLink href="/time" variante="claro" evento={eventos.ctaAcompanharTime}>
              Acompanhar o time na FPFS
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
