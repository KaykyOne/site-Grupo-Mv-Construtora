# Handoff — site MV Construtora

Contexto para continuar o trabalho. Última atualização: 03/09/2026.

---

## O projeto

Site institucional da **MV Construtora** (terraplenagem, obras civis e locação de
máquinas pesadas), sede em Pindaré-Mirim, Maranhão. Domínio:
`https://www.grupomvconstrutora.com.br`.

Stack: **TanStack Start** (React 19 + SSR) · Tailwind v4 · framer-motion · Vite ·
deploy na Vercel · projeto conectado ao **Lovable**.

### Objetivo do trabalho

1. Vencer as **outras empresas chamadas "MV Construtora"** no Google — a chave é
   ancorar a entidade no Maranhão (antes o site não citava o estado nenhuma vez).
2. Ser **legível por IA** (Gemini / AI Overviews): SSR + JSON-LD + perguntas
   respondidas de forma direta.
3. Performance: o site carregava **15,4 MB** com **LCP de 35,5 s** no mobile.

---

## Convenções já estabelecidas — siga

- **Código e comentários em português.** Comentário explica *por quê*, não *o quê*.
- **Fontes únicas de dados** em `src/data/`. Nada de segunda lista para divergir:
  - `servicos.ts` — 10 categorias de serviço
  - `frota.ts` — 6 máquinas; cada uma declara em `servicos: []` onde atua, e as
    páginas de serviço fazem a busca inversa com `maquinasDoServico()`
  - `videos.ts` — vídeos do YouTube
- **Config** em `src/config/` (`empresa.ts`, `navegacao.ts`).
- **Layout compartilhado** em `src/components/layout/` (`SiteLayout` aplicado no
  `__root.tsx`) e `src/components/site/` (blocos reutilizáveis).
- **`CTAButton` usa `variante="primaria" | "escura" | "clara"`.** Nunca sobrescreva
  cor por `className`: base e sobrescrita têm a mesma especificidade e quem vence é
  a ordem do CSS gerado pelo Tailwind. Isso já causou um botão branco no branco.
- **Cada página** precisa de H1 único, canonical próprio e JSON-LD
  (`Service`/`FAQPage`/`BreadcrumbList`).
- **Conteúdo não pode ser duplicado entre páginas** — canibalização faz nenhuma
  ranquear. Cada serviço/máquina tem `intro` e `faqs` próprios.
- **Nunca inventar dado.** Nada de `AggregateRating` falso, número de obras
  estimado ou cidade onde a empresa não atende.

---

## Estado atual: 20 rotas

```
/                                  home (mantém as âncoras de seção)
/servicos                          índice
/servicos/$slug                    10 serviços
/frota                             índice com filtro por categoria
/frota/$slug                       6 máquinas
/politica-de-privacidade           LGPD
```

Slug inválido devolve 404 real (`notFound()` no loader).

### Já feito

| Item | Resultado |
|---|---|
| Imagens | 29 convertidas para WebP: **63,89 MB → 3,56 MB** (−94,4%). Script: `scripts/otimizar-imagens.mjs` |
| Carregamento inicial | imagens **12.966 KB → 137 KB**; vídeo **2.531 KB → 0 KB** |
| Vídeos | migrados para o YouTube (@GrupoMVConstrutora) com player *facade* — zero request antes do clique |
| SEO local | "Maranhão" **0 → 42** ocorrências; título, H1, endereço, FAQ, alt texts |
| JSON-LD | `GeneralContractor` + `WebSite` + `FAQPage` + `ItemList/VideoObject` na home; `Service` + `FAQPage` + `BreadcrumbList` nas internas |
| robots.txt / sitemap.xml | criados; sitemap com 20 URLs |
| Redes | Instagram e YouTube no `sameAs` e no rodapé |
| Refatoração | `index.tsx` **1.696 → ~1.030 linhas** |
| og-image | `public/og-image.jpg` (1200×630) — gerada por `scripts/gerar-og-image.mjs` |
| Formulário | trocado por **form → WhatsApp**: monta a mensagem e abre a conversa. Sem endpoint aberto, sem Resend |
| Headers | `vercel.json` com `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy` |
| "Quem somos" | reestruturado em H3 + `<p>` + `<ul>` (era tudo um `<p>` só com `<br>` e `*`) |

---

## O que falta

### 12 — Acessibilidade (parcial, **continue daqui**)

Feito: `src/hooks/use-reduced-motion.ts`, `revealSemMovimento` em
`src/components/site/animacoes.ts`, `SectionTitle` e `index.tsx` usando
`useReveal()`, e o slideshow do hero parando sob `prefers-reduced-motion`.

Falta:

1. **`DiferenciaisSlideshow`** (`src/routes/index.tsx`, ~linha 306) ainda gira
   sozinho. Aplicar o mesmo padrão do `HeroBackgroundSlideshow`:
   ```ts
   const reduzirMovimento = useReducedMotion();
   useEffect(() => {
     if (reduzirMovimento) return;
     const timer = setInterval(...);
     return () => clearInterval(timer);
   }, [reduzirMovimento]);
   ```
2. **Foco visível global** em `src/styles.css` — o site usa muita classe
   utilitária sem `focus-visible:`, então quem navega por teclado não vê onde
   está. Adicionar `:focus-visible { outline: 3px solid #ef4444; outline-offset: 2px; }`
   e um bloco `@media (prefers-reduced-motion: reduce)` zerando durações.
3. **Rodar o Lighthouse** e confirmar Acessibilidade **100** (linha de base: 86).

As 3 falhas originais (contraste nos filtros da frota, link vazio no rodapé,
alvos de toque dos dots) **já foram corrigidas** — confirmar que não voltaram.

### 14 — Expandir o conteúdo das páginas

Hoje: ~350-500 palavras por página. **Meta: 800+.** Página fina não ranqueia e
ainda arrasta o site.

- O bloco **"Como funciona a contratação"** é a constante `etapas` em
  `src/routes/servicos/$slug.tsx` — **idêntico nas 10 páginas**. É o único
  conteúdo duplicado que restou. Mover para `src/data/servicos.ts` como campo
  `etapas` por serviço e escrever texto próprio para cada um.
- Ampliar `faqs` de 3 para 5-6 por serviço e por máquina.
- Sugestão de campos novos em `servicos.ts` para engordar com substância real:
  `contexto` (por que isso importa no Maranhão — chuva, tipo de solo, distância)
  e `erros` (erros comuns que encarecem a obra). São diferenciados por natureza.
- Falta imagem nas páginas de serviço.

### 17 — Blog + skill para gerar posts

**Não iniciado.** A pauta com 12 títulos já está escrita em
[16-conteudo-blog.md](16-conteudo-blog.md).

O pedido do cliente:

1. Criar `/blog` (listagem) e `/blog/$slug` (post), seguindo o padrão das rotas
   existentes: canonical próprio, `Article` no JSON-LD (`author`,
   `datePublished`, `dateModified`), breadcrumb, CTA no fim, links internos para
   as páginas de serviço.
2. Conteúdo em **Markdown com frontmatter** em `src/content/blog/`, lido no
   build. Não usar CMS — quem mantém é dev.
3. Incluir os posts no `sitemap.xml` (hoje ele é gerado por um script inline;
   vale extrair para `scripts/gerar-sitemap.mjs` e ler as fontes de `src/data/`
   e os arquivos de blog).
4. **Documentar uma skill** (`.claude/skills/novo-post-blog/SKILL.md` ou
   equivalente) para uma IA gerar posts padronizados depois. A skill precisa
   fixar: frontmatter obrigatório, 1.200-2.000 palavras, H1 = a pergunta que a
   pessoa digita no Google, resposta direta nos 2 primeiros parágrafos (é o que
   a IA extrai), tabelas e listas, links internos obrigatórios para serviços,
   proibição de inventar número, e o tom (direto, linguagem de obra, sem
   marketês).

### Itens do cliente (não dependem de código)

1. **Rotacionar a chave da Resend** — está exposta no histórico do repo público.
   Com o formulário indo para o WhatsApp, ela pode ser só revogada, sem
   substituição. Ver `src/lib/send-email.ts`, que ficou marcado como sem uso.
2. **Google Meu Negócio + Search Console** — sem a ficha verificada o site não
   entra no pacote local do mapa. O Search Console não tem dado retroativo:
   quanto antes, melhor.
3. **Coordenadas reais da base** — há um valor aproximado com `TODO` em
   `src/lib/schema.ts`.
4. **Lista de cidades** (`CIDADES_ATENDIDAS` em `src/data/servicos.ts`) — as 12
   atuais são estimativa pela região, precisam de confirmação.
5. **Números reais** — obras entregues, máquinas na frota, m³/dia. Hoje só há
   "+11 anos" e "100% compromisso com prazos" (essa segunda é alegação genérica
   que sistemas de IA descartam).
6. **Depoimentos** — zero no site.
7. **Fotos de caminhão Munck e basculante** — o Munck é o único serviço sem
   máquina vinculada.
8. **`public/videos.zip`** (7 MB) — está em `public/`, vai virar download público
   no deploy.

---

## Armadilhas — leia antes de mexer

### 1. O deploy está quebrado e é a prioridade

Tudo está commitado e pushado, **mas a produção serve o site antigo**: título
antigo, 0 menções a "Maranhão", 0 JSON-LD, `/robots.txt` e `/servicos` em 404.
Não é cache (`Age: 0`, `X-Vercel-Cache: MISS`).

Verificar no painel da Vercel: aba Deployments (build falhando?) e Settings → Git
(Production Branch é `main`?).

### 2. Dois alvos de build

`vite.config.ts` foi alterado por alguém para GitHub Pages num subcaminho, o que
quebrava todo o SEO. Reconfigurei para atender aos dois:

```bash
npm run build        # PRODUÇÃO — Vercel, SSR, sem basePath
npm run build:pages  # PREVIEW  — GitHub Pages estático sob /site-Grupo-Mv-Construtora/
```

O preview sai com `noindex` de propósito (`E_PREVIEW` em `src/config/empresa.ts`
→ meta robots em `__root.tsx`, e `scripts/build-pages.mjs` escreve um robots.txt
bloqueando tudo). Sem isso a cópia do preview vira conteúdo duplicado e disputa
posição com a produção.

> **`npm run build:pages` nunca foi executado.** Testar antes de confiar.

### 3. `npm run lint` sempre falha — e não é culpa sua

`core.autocrlf=true` deixa o working tree em CRLF, e o prettier espera LF.
Resultado: ~7.000 erros `Delete ␍` em **todos** os arquivos, inclusive os que
ninguém tocou. **Não rode `prettier --write .`** para "consertar" — isso reescreve
o repositório inteiro. Filtre:

```bash
npm run lint 2>&1 | grep -v "prettier/prettier"
```

Use `npx tsc --noEmit` como verificação real.

### 4. O `rewrites` do `vercel.json` foi removido

Era `{"source": "/(.*)", "destination": "/"}` — fallback de SPA num projeto SSR,
configuração morta. **Validar em preview deploy** que as rotas continuam
funcionando antes de mandar para produção.

### 5. Lovable

`AGENTS.md` avisa: **não reescrever histórico** (force-push, rebase, amend de
commit já enviado) — quebra o histórico do lado do Lovable. Commits sincronizam,
então mantenha `main` sempre em estado funcional.

### 6. Servidor de dev

A porta varia (8080, 8081, 8082...). Descubra assim:

```bash
for p in 8080 8081 8082 8083; do
  c=$(curl -s -o /dev/null -w "%{http_code}" --max-time 3 "http://localhost:$p/")
  [ "$c" = "200" ] && echo "ATIVO=$p"
done
```

---

## Como verificar o que você fizer

```bash
npx tsc --noEmit                                    # verificação real
npm run build                                       # build de produção (SSR)

# rotas
for r in "" servicos servicos/terraplanagem frota frota/escavadeira-hidraulica \
         politica-de-privacidade servicos/inexistente; do
  printf "%-34s %s\n" "/$r" "$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:8080/$r")"
done   # a última deve dar 404

# JSON-LD válido
curl -s http://localhost:8080/servicos/drenagem > /tmp/p.html
grep -ao "application/ld+json" /tmp/p.html | wc -l   # esperado: 3

# matriz de vínculos serviço <-> máquina (nenhum slug inválido)
```

Depois do deploy, rodar o Lighthouse e comparar com a linha de base em
[BASELINE-2026-09-02.md](BASELINE-2026-09-02.md):

```bash
npx --yes lighthouse@12 https://www.grupomvconstrutora.com.br/ \
  --output=html --output-path=./lh-depois \
  --only-categories=performance,accessibility,best-practices,seo \
  --chrome-flags="--headless=old --disable-gpu --no-sandbox" --max-wait-for-load=120000
```

| Indicador | Antes | Meta |
|---|---|---|
| Performance mobile | 65 | 95+ |
| LCP mobile | 35,5 s | < 2,0 s |
| Peso da página | 15,4 MB | < 1,0 MB |
| Acessibilidade | 86 | 100 |
| Páginas indexáveis | 1 | 20 |

> O "SEO 100" do Lighthouse é um checklist raso (title, description, viewport).
> Ele não mede schema, sitemap, canonical nem conteúdo. Não use esse número
> isolado como prova de qualidade.

---

## Backlog completo

As 17 tasks detalhadas estão em [README.md](README.md), cada uma com contexto,
evidência medida, passos, critério de aceite e comando de validação.
