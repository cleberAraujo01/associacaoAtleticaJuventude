"use client";

import { useState } from "react";
import { links } from "@/config/site";

const assuntos = ["Parcerias e patrocínio", "Imprensa", "Dúvidas gerais", "Outro"] as const;

type Status = "idle" | "enviando" | "sucesso" | "erro";

interface Erros {
  nome?: string;
  email?: string;
  mensagem?: string;
}

/**
 * Formulário de contato para imprensa e assuntos institucionais.
 * Envio real via POST /api/contato (SMTP do Gmail do clube via nodemailer);
 * o visitante recebe um e-mail de confirmação estilizado (lib/emails.ts).
 * Validação client-side com erros inline (noValidate: mensagens nossas, não as
 * do navegador). Fallbacks visíveis: mailto com a mensagem pronta e "copiar
 * e-mail" — cobrem indisponibilidade da API ou preferência do visitante.
 */
export function ContactForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [assunto, setAssunto] = useState<string>(assuntos[0]);
  const [mensagem, setMensagem] = useState("");
  const [erros, setErros] = useState<Erros>({});
  const [status, setStatus] = useState<Status>("idle");
  const [copiado, setCopiado] = useState(false);

  const rotuloClasse = "block text-xs font-bold uppercase tracking-widest text-ink";
  const campoClasse = (temErro: boolean) =>
    `mt-2 w-full rounded-xl border-2 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none ${
      temErro ? "border-red" : "border-ink/15 focus:border-red"
    }`;
  const erroClasse = "mt-1.5 text-xs font-semibold text-red-ink";

  const validar = (): Erros => {
    const novos: Erros = {};
    if (!nome.trim()) novos.nome = "Informe seu nome.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      novos.email = "Informe um e-mail válido para a resposta.";
    if (!mensagem.trim()) novos.mensagem = "Escreva a sua mensagem.";
    return novos;
  };

  const mailtoFallback = `mailto:${links.email}?subject=${encodeURIComponent(
    `[Site] ${assunto} — ${nome}`,
  )}&body=${encodeURIComponent(`${mensagem}\n\n— ${nome}`)}`;

  return (
    <form
      noValidate
      className="w-full"
      onSubmit={async (e) => {
        e.preventDefault();
        const novosErros = validar();
        setErros(novosErros);
        if (Object.keys(novosErros).length > 0) return;

        setStatus("enviando");
        try {
          const resposta = await fetch("/api/contato", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, assunto, mensagem }),
          });
          if (!resposta.ok) throw new Error("Falha no envio");
          setStatus("sucesso");
          setNome("");
          setEmail("");
          setMensagem("");
        } catch {
          setStatus("erro");
        }
      }}
    >
      <p className="text-xs text-ink/60">
        Campos com <span className="font-bold text-red-ink">*</span> são obrigatórios.
      </p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contato-nome" className={rotuloClasse}>
            Seu nome <span aria-hidden="true" className="text-red-ink">*</span>
          </label>
          <input
            id="contato-nome"
            name="nome"
            type="text"
            required
            autoComplete="name"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
              if (erros.nome) setErros((v) => ({ ...v, nome: undefined }));
            }}
            aria-invalid={erros.nome ? true : undefined}
            aria-describedby={erros.nome ? "contato-nome-erro" : undefined}
            className={campoClasse(Boolean(erros.nome))}
            placeholder="Como podemos te chamar?"
          />
          {erros.nome && (
            <p id="contato-nome-erro" className={erroClasse}>
              {erros.nome}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="contato-email" className={rotuloClasse}>
            Seu e-mail <span aria-hidden="true" className="text-red-ink">*</span>
          </label>
          <input
            id="contato-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (erros.email) setErros((v) => ({ ...v, email: undefined }));
            }}
            aria-invalid={erros.email ? true : undefined}
            aria-describedby={erros.email ? "contato-email-erro" : undefined}
            className={campoClasse(Boolean(erros.email))}
            placeholder="Para onde respondemos"
          />
          {erros.email && (
            <p id="contato-email-erro" className={erroClasse}>
              {erros.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contato-assunto" className={rotuloClasse}>
          Assunto
        </label>
        <select
          id="contato-assunto"
          name="assunto"
          value={assunto}
          onChange={(e) => setAssunto(e.target.value)}
          className={campoClasse(false)}
        >
          {assuntos.map((opcao) => (
            <option key={opcao} value={opcao}>
              {opcao}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="contato-mensagem" className={rotuloClasse}>
          Mensagem <span aria-hidden="true" className="text-red-ink">*</span>
        </label>
        <textarea
          id="contato-mensagem"
          name="mensagem"
          required
          rows={5}
          value={mensagem}
          onChange={(e) => {
            setMensagem(e.target.value);
            if (erros.mensagem) setErros((v) => ({ ...v, mensagem: undefined }));
          }}
          aria-invalid={erros.mensagem ? true : undefined}
          aria-describedby={erros.mensagem ? "contato-mensagem-erro" : undefined}
          className={campoClasse(Boolean(erros.mensagem))}
          placeholder="Escreva sua mensagem…"
        />
        {erros.mensagem && (
          <p id="contato-mensagem-erro" className={erroClasse}>
            {erros.mensagem}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "enviando"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-red px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-md transition-all hover:bg-red-ink hover:shadow-lg focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "enviando" ? "Enviando…" : "Enviar mensagem"}
      </button>

      {/* Feedback de sucesso/erro do envio */}
      <div aria-live="polite">
        {status === "sucesso" && (
          <p className="mt-4 rounded-xl border-2 border-green-700/30 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">
            Mensagem enviada! Você vai receber uma confirmação no seu e-mail e em breve a gente
            entra em contato.
          </p>
        )}
        {status === "erro" && (
          <p className="mt-4 rounded-xl border-2 border-red/30 bg-red/5 px-4 py-3 text-sm font-semibold text-red-ink">
            Não foi possível enviar agora. Tente de novo em instantes ou use o e-mail direto logo
            abaixo.
          </p>
        )}
      </div>

      {/* Fallbacks: app de e-mail próprio ou copiar o endereço */}
      <div className="mt-5 border-t-2 border-ink/10 pt-4 text-xs text-ink/60">
        <p>
          Prefere usar seu e-mail? Escreva para{" "}
          <strong className="font-bold text-ink">{links.email}</strong>
        </p>
        <p className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
          <a
            href={mailtoFallback}
            className="font-bold uppercase tracking-widest text-red-ink underline underline-offset-4 hover:no-underline"
          >
            Abrir no app de e-mail
          </a>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(links.email);
              setCopiado(true);
              setTimeout(() => setCopiado(false), 2000);
            }}
            className="font-bold uppercase tracking-widest text-red-ink underline underline-offset-4 hover:no-underline"
          >
            {copiado ? "Copiado!" : "Copiar e-mail"}
          </button>
        </p>
      </div>
    </form>
  );
}
