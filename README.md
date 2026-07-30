# Associação Atlética Juventude — site oficial

Site do clube de futsal de Santana de Parnaíba/SP. Eixo: **da base ao time** — a escolinha
alimenta o time competitivo (FPFS).

Stack: Next.js (App Router) + TypeScript estrito + Tailwind CSS v4. Deploy: Vercel.

## Como rodar

```bash
npm install
npm run dev        # http://localhost:3000
```

Outros scripts: `npm run build` (produção), `npm run lint`, `npm run typecheck`, `npm run format`.

## Como atualizar o conteúdo (sem precisar de dev)

Todo o conteúdo vive na pasta **`content/`** em arquivos simples. Edite direto no GitHub
(botão do lápis), salve com "Commit changes" e o site atualiza sozinho em ~1 minuto (Vercel).

| O que atualizar            | Arquivo                  | Como                                                                                                                                   |
| -------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| Jogo novo / placar         | `content/jogos.ts`       | Copie um bloco `{ ... }`, ajuste adversário, data (AAAA-MM-DD), local. Após o jogo, adicione `placar: { juventude: X, adversario: Y }` |
| Atleta do elenco           | `content/atletas.ts`     | Copie um bloco e ajuste. Se veio da base: `veioDaBase: true` + `anoBase` e `anoSubida` (ganha selo dourado)                            |
| Turma da escolinha         | `content/turmas.ts`      | Ajuste dias, horários, faixa etária                                                                                                    |
| Vídeo do YouTube           | `content/videos.ts`      | Copie o código após `watch?v=` da URL do vídeo                                                                                         |
| Depoimento                 | `content/depoimentos.ts` | `contaAPonte: true` se conta a trajetória base→time                                                                                    |
| WhatsApp, redes, navegação | `config/site.ts`         | Links centralizados aqui                                                                                                               |

Se algum campo obrigatório faltar, o site **não publica** e avisa o erro — impossível ir ao ar quebrado.

## Antes do lançamento (pendências)

- [ ] Trocar número de WhatsApp e handles reais em `config/site.ts`
- [ ] Substituir todos os placeholders `[a coletar]` em `content/` por dados reais
- [ ] Confirmar domínio e ativar Plausible (`data-domain` em `app/layout.tsx`)
- [ ] Coletar fotos (atletas, escolinha) com autorização de uso de imagem

## Arquitetura (resumo)

```
config/     → links, navegação, eventos de analytics (fonte única)
types/      → contratos: Atleta, Turma, Jogo, Depoimento, Video
content/    → dados versionados (validados pelo TypeScript no build)
lib/        → data layer: única porta de acesso ao conteúdo (troca por CMS = só mexer aqui)
components/ → UI pura (recebe dados por props; nada hardcoded)
app/        → rotas — todas estáticas (SSG)
```

- **Renderização**: 100% SSG. Conteúdo muda por commit → Vercel rebuilda. Sem SSR/ISR.
- **YouTube**: facade (thumbnail + play); o iframe só carrega no clique — protege o LCP mobile.
- **Analytics**: Plausible (sem cookie, sem banner). Eventos: `cta_matricula`,
  `ponte_base_time`, `saida_youtube`, `saida_whatsapp` — via classe CSS, zero JS próprio.
- **Acessibilidade**: WCAG 2.2 AA — skip link, foco visível, um h1/página, hierarquia
  semântica, `prefers-reduced-motion`, contraste (vermelho de texto = `red-ink` #B00E14).

## Deploy

Projeto pronto para Vercel: importe o repositório em vercel.com → "Add New Project" →
defaults do Next.js. Cada push na `main` publica automaticamente.

## Checklist de qualidade (antes do "pronto")

- [ ] `npm run build` sem erros/avisos
- [ ] Lighthouse mobile ≥ 90 em Performance e 100 em Acessibilidade
- [ ] axe DevTools sem violações
- [ ] Navegação completa por teclado (Tab por toda a home)
- [ ] Testar em 3G no DevTools (público mobile)
