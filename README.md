# Design System — White Lotus 💮 - Platfm=form White Label

Design system multibrand para plataformas de pagamento, construido com React, Storybook e Style Dictionary.
O Figma e a unica fonte de verdade — qualquer alteracao de token feita la se propaga automaticamente ate o Storybook e o produto.

### Marcas configuradas

| Modo | Identidade | Cor Primaria | Tema |
|---|---|---|---|
| Wireframe | Cinza | #999999 | Neutro |
| Brand A — iFood | Vermelho | #E00C2C | Claro |
| Brand B — POS Verde | Verde | #228B22 | Escuro |
| Brand C — POS Azul | Azul | #0066CC | Claro |
| Brand D — POS Roxo | Roxo | #6A0DAD | Escuro |

**Storybook publicado →** `https://<seu-usuario>.github.io/design-system`

---

## Fluxo

```
Figma Variables  →  pnpm sync-figma  →  Style Dictionary  →  CSS/JS tokens
                                                                    ↓
Produto / Next.js  ←  @ds/ui (componentes React)  ←  Storybook
```

Você só altera tokens no Figma. O restante da cadeia é automático.

---

## Estrutura do projeto

```
design-system/
├── .github/
│   └── workflows/
│       ├── ci.yml                  ← typecheck + build em todo PR
│       └── deploy-storybook.yml    ← deploy automático no push para main
│
├── packages/
│   ├── tokens/                     ← @ds/tokens
│   │   ├── src/
│   │   │   ├── base/               ← tokens primitivos (paleta, espaçamento, tipografia)
│   │   │   └── brands/
│   │   │       ├── wireframe/      ← tokens wireframe (cinza)
│   │   │       ├── brand-a/        ← Brand A — iFood (vermelho)
│   │   │       ├── brand-b/        ← Brand B — POS Verde (verde, tema escuro)
│   │   │       ├── brand-c/        ← Brand C — POS Azul (azul)
│   │   │       └── brand-d/        ← Brand D — POS Roxo (roxo, tema escuro)
│   │   ├── dist/                   ← gerado por `pnpm build:tokens`
│   │   │   ├── base.css
│   │   │   ├── wireframe.css
│   │   │   ├── brand-a.css
│   │   │   ├── brand-b.css
│   │   │   ├── brand-c.css
│   │   │   └── brand-d.css
│   │   └── sd.config.mjs           ← Style Dictionary config
│   │
│   └── ui/                         ← @ds/ui
│       └── src/
│           ├── components/
│           │   └── Button/         ← Button.tsx + .module.css + .stories.tsx
│           └── styles/
│               └── global.css
│
├── .storybook/
│   ├── main.ts                     ← config do Storybook (addons, stories glob)
│   └── preview.ts                  ← imports CSS + brand switcher na toolbar
│
└── scripts/
    ├── sync-figma-tokens.mjs       ← puxa Variables do Figma → JSON
    └── setup-figma-variables.mjs   ← cria Variables no Figma via API
```

---

## Começando

### Pré-requisitos

- Node.js v18+
- pnpm v10+

```bash
# Instalar pnpm (caso não tenha)
curl -fsSL https://get.pnpm.io/install.sh | sh -
source ~/.zshrc
```

### Instalação

```bash
pnpm install
```

### Rodar o Storybook localmente

```bash
pnpm storybook
# Acesse http://localhost:6006
```

---

## Scripts disponíveis

| Comando | O que faz |
|---|---|
| `pnpm storybook` | Abre o Storybook em modo desenvolvimento |
| `pnpm build:tokens` | Gera os CSS tokens em `packages/tokens/dist/` |
| `pnpm build-storybook` | Gera o Storybook estático em `storybook-static/` |
| `pnpm sync-figma` | Puxa Variables do Figma e rebuilda os tokens |
| `pnpm setup-figma` | Cria a estrutura de Variables no Figma via API |
| `pnpm typecheck` | Roda a verificação de tipos TypeScript |

---

## Sistema de tokens (3 camadas)

### Camada 1 — Base (primitivos)
Valores brutos que existem independente de marca. Nunca usados diretamente em componentes.

```
color/neutral/0      → #ffffff
color/wireframe/400  → #999999
color/red/500        → #E00C2C  (iFood)
color/green/500      → #228B22  (POS Verde)
color/blue/500       → #0066CC  (POS Azul)
color/purple/500     → #6A0DAD  (POS Roxo)
spacing/4            → 16px
```

### Camada 2 — Semânticos (por marca)
Dão significado aos primitivos. São os tokens que os componentes usam.

```
color/action/primary   → wireframe/400 (Wireframe)
color/action/primary   → red/500       (Brand A — iFood)
color/action/primary   → green/500     (Brand B — POS Verde)
color/action/primary   → blue/500      (Brand C — POS Azul)
color/action/primary   → purple/500    (Brand D — POS Roxo)
```

### Camada 3 — CSS gerado
```css
/* dist/base.css — igual para todas as marcas */
:root {
  --ds-color-red-500: #E00C2C;
  --ds-color-green-500: #228B22;
  --ds-spacing-4: 16px;
}

/* dist/brand-a.css — iFood */
:root, [data-brand="brand-a"] {
  --ds-color-action-primary: #E00C2C;
}

/* dist/brand-b.css — POS Verde */
[data-brand="brand-b"] {
  --ds-color-action-primary: #228B22;
}

/* dist/brand-c.css — POS Azul */
[data-brand="brand-c"] {
  --ds-color-action-primary: #0066CC;
}

/* dist/brand-d.css — POS Roxo */
[data-brand="brand-d"] {
  --ds-color-action-primary: #6A0DAD;
}
```

Para trocar de marca em qualquer contexto:
```html
<html data-brand="brand-b">
```

---

## Trocar de marca no Storybook

Na toolbar do Storybook, clique em **Marca** e selecione entre as marcas disponiveis:
Wireframe, Brand A (iFood), Brand B (POS Verde), Brand C (POS Azul), Brand D (POS Roxo).
O componente muda de identidade visual instantaneamente sem recarregar.

---

## Adicionar uma nova marca

1. Crie `packages/tokens/src/brands/brand-x/tokens.json` com os tokens semanticos
2. Rode `pnpm build:tokens` — o Style Dictionary gera `dist/brand-x.css` automaticamente
3. Adicione `import '../packages/tokens/dist/brand-x.css'` em `.storybook/preview.ts`
4. Adicione a opcao no `globalTypes.brand.toolbar.items` do preview
5. Adicione `'brand-x'` ao tipo `Brand` em `packages/themes/src/ThemeProvider.tsx`

---

## Documentacao

| Documento | Descricao |
|---|---|
| [docs/foundations.md](docs/foundations.md) | Arquitetura de tokens, tipografia, espacamento, componentes |
| [docs/figma-instructions.md](docs/figma-instructions.md) | Guia passo a passo para criar variables no Figma |
| [docs/ai-ready-prompt.md](docs/ai-ready-prompt.md) | Prompt otimizado para AI criar a estrutura no Figma |

---

## Adicionar um novo componente

```bash
# Exemplo: criar o componente Input
mkdir packages/ui/src/components/Input
```

Crie os arquivos:
- `Input.tsx` — componente React usando tokens semânticos via CSS variables
- `Input.module.css` — estilos com `var(--ds-color-*)`, `var(--ds-spacing-*)`
- `Input.stories.tsx` — stories com `tags: ['autodocs']`
- `index.ts` — re-export

Adicione o export em `packages/ui/src/index.ts`.

---

## Sincronizar tokens do Figma

Configure o `.env` na raiz:

```env
FIGMA_ACCESS_TOKEN=seu_token_aqui
FIGMA_FILE_KEY=chave_do_arquivo
```

Rode:

```bash
pnpm sync-figma
```

O script puxa as Variables do Figma, salva em `packages/tokens/src/figma-variables.json`
e rebuilda os tokens CSS automaticamente.

---

## Deploy automático

A cada push para `main`, o GitHub Actions:
1. Instala dependências
2. Builda os tokens
3. Builda o Storybook
4. Publica em GitHub Pages

Configure o Pages em: **Repositório → Settings → Pages → Source → GitHub Actions**

---

## Tecnologias

| Ferramenta | Papel |
|---|---|
| [Figma Variables](https://help.figma.com/hc/en-us/articles/15339657135383) | Fonte de verdade dos tokens |
| [Style Dictionary](https://styledictionary.style) | Transforma tokens JSON em CSS/JS |
| [Storybook 8](https://storybook.js.org) | Documentação viva dos componentes |
| [Turborepo](https://turbo.build) | Orquestração do monorepo |
| [pnpm](https://pnpm.io) | Gerenciador de pacotes |
