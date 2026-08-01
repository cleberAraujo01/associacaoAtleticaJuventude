import { NextResponse } from "next/server";
import { Resend } from "resend";
import { links } from "@/config/site";

/**
 * POST /api/contato — envia a mensagem do formulário de contato por e-mail
 * via Resend (integração Vercel Marketplace; RESEND_API_KEY e
 * RESEND_EMAIL_DOMAIN são provisionadas pela integração).
 * O reply-to é o e-mail do visitante, para o clube responder direto.
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

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: `AA Juventude — Site <site@${process.env.RESEND_EMAIL_DOMAIN}>`,
    to: links.email,
    replyTo: email,
    subject: `[Site] ${assunto} — ${nome}`,
    text: `${mensagem}\n\n—\nNome: ${nome}\nE-mail: ${email}\nAssunto: ${assunto}`,
  });

  if (error) {
    console.error("Falha ao enviar contato via Resend:", error);
    return NextResponse.json(
      { erro: "Não foi possível enviar agora. Tente novamente ou use o e-mail direto." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
