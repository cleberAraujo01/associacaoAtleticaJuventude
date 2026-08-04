import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { links, site } from "@/config/site";
import { htmlConfirmacaoVisitante, textoNotificacaoClube } from "@/lib/emails";

/**
 * POST /api/contato — solução própria de envio, sem serviço externo pago:
 * SMTP do Gmail do clube via nodemailer (GMAIL_USER + GMAIL_APP_PASSWORD,
 * senha de app gerada na conta Google com verificação em 2 etapas).
 * Dois e-mails por mensagem:
 *  1. Notificação para o clube, com reply-to do visitante (responder direto).
 *  2. Confirmação estilizada para o visitante (lib/emails.ts), com o brasão
 *     anexado por CID — a imagem é buscada no próprio site (origin da request),
 *     o que funciona igual em dev e em produção.
 */
export async function POST(req: Request) {
  let dados: unknown;
  try {
    dados = await req.json();
  } catch {
    return NextResponse.json({ erro: "Requisição inválida." }, { status: 400 });
  }

  const { nome, email, assunto, mensagem } = (dados ?? {}) as Record<string, unknown>;

  // Validação de fronteira: campos obrigatórios + limites de tamanho
  if (
    typeof nome !== "string" ||
    typeof email !== "string" ||
    typeof assunto !== "string" ||
    typeof mensagem !== "string" ||
    !nome.trim() ||
    !email.trim() ||
    !mensagem.trim() ||
    nome.length > 200 ||
    email.length > 200 ||
    assunto.length > 100 ||
    mensagem.length > 5000 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return NextResponse.json(
      { erro: "Preencha nome, e-mail válido e mensagem." },
      { status: 400 },
    );
  }

  const usuario = process.env.GMAIL_USER;
  const senhaApp = process.env.GMAIL_APP_PASSWORD;
  if (!usuario || !senhaApp) {
    console.error("Contato: GMAIL_USER/GMAIL_APP_PASSWORD ausentes no ambiente.");
    return NextResponse.json(
      { erro: "Não foi possível enviar agora. Tente novamente ou use o e-mail direto." },
      { status: 502 },
    );
  }

  const transporte = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: usuario, pass: senhaApp },
  });

  const contato = { nome, email, assunto, mensagem };

  // 1) Notificação para o clube — se esta falhar, o envio falhou de verdade
  try {
    await transporte.sendMail({
      from: `"${site.nomeCurto} (site)" <${usuario}>`,
      to: links.email,
      replyTo: email,
      subject: `[Site] ${assunto}: ${nome}`,
      text: textoNotificacaoClube(contato),
    });
  } catch (erro) {
    console.error("Falha ao enviar contato via Gmail:", erro);
    return NextResponse.json(
      { erro: "Não foi possível enviar agora. Tente novamente ou use o e-mail direto." },
      { status: 502 },
    );
  }

  // 2) Confirmação para o visitante — falha aqui não derruba o sucesso acima
  try {
    await transporte.sendMail({
      from: `"${site.nomeCurto}" <${usuario}>`,
      to: email,
      subject: "Recebemos sua mensagem! AA Juventude",
      html: htmlConfirmacaoVisitante(contato),
      attachments: [
        {
          filename: "brasao.png",
          path: `${new URL(req.url).origin}/brasao-footer.png`,
          cid: "brasao",
        },
      ],
    });
  } catch (erro) {
    console.error("Contato enviado, mas a confirmação ao visitante falhou:", erro);
  }

  return NextResponse.json({ ok: true });
}
