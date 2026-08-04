import { links, site } from "@/config/site";

/**
 * Templates dos e-mails do formulário de contato.
 * O HTML segue as regras de e-mail (tabelas + estilos inline, fontes de
 * sistema): nada de Tailwind ou fontes do site aqui. Cores da identidade:
 * red #E4141B · wine #7A1016 · ink #0E0E10 · paper #F3F0EA.
 * O brasão entra por CID ("cid:brasao"), anexado no envio pela rota.
 */

interface DadosContato {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
}

/** Escapa conteúdo digitado pelo visitante antes de entrar no HTML do e-mail. */
function escaparHtml(texto: string): string {
  return texto
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Corpo (texto puro) do e-mail que avisa o clube sobre a nova mensagem. */
export function textoNotificacaoClube({ nome, email, assunto, mensagem }: DadosContato): string {
  return `${mensagem}\n\n—\nNome: ${nome}\nE-mail: ${email}\nAssunto: ${assunto}`;
}

/**
 * HTML do e-mail de confirmação para o visitante: brasão no topo, recado de
 * que a mensagem chegou e cópia do que foi enviado. Layout de card único
 * (600px) sobre fundo paper, com faixa vermelha de clube no cabeçalho.
 */
export function htmlConfirmacaoVisitante({ nome, assunto, mensagem }: DadosContato): string {
  const nomeSeguro = escaparHtml(nome.trim());
  const assuntoSeguro = escaparHtml(assunto.trim());
  const mensagemSegura = escaparHtml(mensagem.trim()).replaceAll("\n", "<br />");

  return `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Recebemos sua mensagem</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f3f0ea;">
    <!-- Pré-header: resumo que aparece na lista de e-mails, sem poluir o corpo -->
    <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
      Sua mensagem chegou na AA Juventude. Em breve alguém da equipe fala com você.
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f0ea;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;">
            <!-- Cabeçalho: faixa vermelha com o brasão -->
            <tr>
              <td align="center" style="background-color:#e4141b;padding:32px 24px 28px;">
                <img src="cid:brasao" width="96" height="96" alt="Brasão da ${escaparHtml(site.nome)}" style="display:block;width:96px;height:auto;" />
                <p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;color:#ffffff;">
                  ${escaparHtml(site.nome)}
                </p>
                <p style="margin:4px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#f3f0ea;">
                  ${escaparHtml(site.cidade)}
                </p>
              </td>
            </tr>
            <!-- Corpo -->
            <tr>
              <td style="padding:32px 28px 8px;">
                <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:22px;line-height:1.3;text-transform:uppercase;color:#0e0e10;">
                  Recebemos sua mensagem, ${nomeSeguro}!
                </h1>
                <p style="margin:14px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#3d3d40;">
                  Obrigado por escrever para a AA Juventude. Sua mensagem chegou direitinho
                  e em breve alguém da nossa equipe vai entrar em contato com você por este e-mail.
                </p>
              </td>
            </tr>
            <!-- Cópia da mensagem enviada -->
            <tr>
              <td style="padding:20px 28px 4px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f0ea;border-left:4px solid #e4141b;border-radius:0 12px 12px 0;">
                  <tr>
                    <td style="padding:16px 18px;">
                      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:#b00e14;">
                        Sua mensagem · ${assuntoSeguro}
                      </p>
                      <p style="margin:10px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#3d3d40;">
                        ${mensagemSegura}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Canais enquanto espera -->
            <tr>
              <td style="padding:20px 28px 32px;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#3d3d40;">
                  Enquanto isso, acompanhe o clube:
                  <a href="${links.youtube}" style="color:#b00e14;font-weight:bold;">YouTube</a> ·
                  <a href="${links.instagram}" style="color:#b00e14;font-weight:bold;">Instagram</a> ·
                  <a href="${links.facebook}" style="color:#b00e14;font-weight:bold;">Facebook</a>
                </p>
              </td>
            </tr>
            <!-- Rodapé ink com a assinatura do clube -->
            <tr>
              <td align="center" style="background-color:#0e0e10;padding:22px 24px;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:#f3f0ea;">
                  É aqui que as grandes histórias começam.
                </p>
                <p style="margin:10px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.6;color:#8f8f93;">
                  ${escaparHtml(site.endereco)}
                </p>
              </td>
            </tr>
          </table>
          <p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#8f8f93;">
            Você recebeu este e-mail porque preencheu o formulário de contato do site da AA Juventude.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
