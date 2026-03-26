# Prompt AI-Ready: Design System White Label — Plataforma de Pagamentos

> **Versao:** 2.0 — Otimizado para uso com AI (Claude, GPT, Devin, Copilot)
> **Objetivo:** Criar um Design System multibrand no Figma usando **Variables e Modes**, pronto para uma plataforma de pagamentos White Label.

---

## Contexto

Voce e um especialista em Design Systems e Figma, com foco em **variaveis, colecoes de variaveis e modes**.

O objetivo e **implementar no Figma** uma estrutura de White Label com:

- **1 modo Wireframe** (escala de cinza para prototipagem rapida)
- **4 modos de marca** (Brand A — iFood, Brand B — POS Verde, Brand C — POS Azul, Brand D — POS Roxo)

### Arquitetura de Tokens (3 camadas)

```
Camada 1: Primitivos (Base)
  Valores brutos — paleta de cores, espacamento, tipografia, raio.
  Nunca usados diretamente em componentes.

Camada 2: Semanticos (por marca/modo)
  Dao significado aos primitivos.
  Sao os tokens que os componentes realmente usam.
  Mesma estrutura para todos os modos; so os valores mudam.

Camada 3: Componentes
  Tokens especificos de componente (button height, card padding, etc.).
  Referenciam primitivos.
```

---

## 1. Colecao `Primitives` (tokens base)

**Tipo:** Colecao unica, 1 modo (Default)

### 1.1 Cores Neutras

| Variavel | HEX | Descricao |
|---|---|---|
| `color/neutral/0` | `#FFFFFF` | Branco puro |
| `color/neutral/50` | `#FAFAFA` | Fundo sutil |
| `color/neutral/100` | `#F5F5F5` | Fundo secundario |
| `color/neutral/200` | `#E5E5E5` | Borda leve |
| `color/neutral/300` | `#D4D4D4` | Borda padrao |
| `color/neutral/400` | `#A3A3A3` | Texto desabilitado |
| `color/neutral/500` | `#737373` | Texto secundario |
| `color/neutral/600` | `#525252` | Texto medio |
| `color/neutral/700` | `#404040` | Texto forte |
| `color/neutral/800` | `#262626` | Texto primario |
| `color/neutral/900` | `#171717` | Texto maximo |

### 1.2 Paletas de Marca

| Variavel | HEX | Uso |
|---|---|---|
| `color/red/500` | `#E00C2C` | iFood primary |
| `color/red/600` | `#B8091F` | iFood hover |
| `color/red/50` | `#FFF0F0` | iFood sutil |
| `color/orange/500` | `#FF6B1F` | iFood accent |
| `color/green/500` | `#228B22` | POS Verde primary |
| `color/green/600` | `#1A6B1A` | POS Verde hover |
| `color/green/50` | `#F0FFF0` | POS Verde sutil |
| `color/yellow/500` | `#FFD700` | POS Verde accent |
| `color/blue/500` | `#0066CC` | POS Azul primary |
| `color/blue/600` | `#0052A3` | POS Azul hover |
| `color/blue/50` | `#F0F7FF` | POS Azul sutil |
| `color/amber/500` | `#FFCC00` | POS Azul accent |
| `color/purple/500` | `#6A0DAD` | POS Roxo primary |
| `color/purple/600` | `#550A8A` | POS Roxo hover |
| `color/purple/50` | `#F5F0FF` | POS Roxo sutil |
| `color/orange-dark/500` | `#FF6600` | POS Roxo accent |

### 1.3 Feedback

| Variavel | HEX |
|---|---|
| `color/feedback/success` | `#22C55E` |
| `color/feedback/warning` | `#F59E0B` |
| `color/feedback/error` | `#EF4444` |
| `color/feedback/info` | `#3B82F6` |

### 1.4 Wireframe Grays

| Variavel | HEX |
|---|---|
| `color/wireframe/100` | `#F2F2F2` |
| `color/wireframe/200` | `#E5E5E5` |
| `color/wireframe/300` | `#CCCCCC` |
| `color/wireframe/400` | `#999999` |
| `color/wireframe/500` | `#666666` |

### 1.5 Espacamento

| Variavel | Valor |
|---|---|
| `spacing/1` | 4px |
| `spacing/2` | 8px |
| `spacing/3` | 12px |
| `spacing/4` | 16px |
| `spacing/5` | 20px |
| `spacing/6` | 24px |
| `spacing/8` | 32px |
| `spacing/10` | 40px |
| `spacing/12` | 48px |
| `spacing/16` | 64px |

### 1.6 Raio (Border Radius)

| Variavel | Valor |
|---|---|
| `radius/sm` | 4px |
| `radius/md` | 8px |
| `radius/lg` | 12px |
| `radius/xl` | 16px |
| `radius/full` | 9999px |

### 1.7 Tipografia

| Variavel | Valor |
|---|---|
| `font/family/sans` | Inter, system-ui, sans-serif |
| `font/family/mono` | JetBrains Mono, monospace |
| `font/size/xs` | 12px |
| `font/size/sm` | 14px |
| `font/size/md` | 16px |
| `font/size/lg` | 18px |
| `font/size/xl` | 20px |
| `font/size/2xl` | 24px |
| `font/size/3xl` | 30px |
| `font/size/4xl` | 36px |
| `font/weight/regular` | 400 |
| `font/weight/medium` | 500 |
| `font/weight/semibold` | 600 |
| `font/weight/bold` | 700 |
| `font/lineHeight/tight` | 1.25 |
| `font/lineHeight/normal` | 1.5 |
| `font/lineHeight/relaxed` | 1.75 |

---

## 2. Colecao `Semantic` (tokens semanticos com modes)

**Tipo:** Colecao unica com **5 modos**:
- `Wireframe`
- `Brand A — iFood`
- `Brand B — POS Verde`
- `Brand C — POS Azul`
- `Brand D — POS Roxo`

### 2.1 Tabela de Mapeamento

| Token Semantico | Wireframe | Brand A (iFood) | Brand B (POS Verde) | Brand C (POS Azul) | Brand D (POS Roxo) |
|---|---|---|---|---|---|
| `color/action/primary` | `wireframe/400` | `red/500` | `green/500` | `blue/500` | `purple/500` |
| `color/action/primary-hover` | `wireframe/500` | `red/600` | `green/600` | `blue/600` | `purple/600` |
| `color/action/primary-subtle` | `wireframe/100` | `red/50` | `green/50` | `blue/50` | `purple/50` |
| `color/action/primary-foreground` | `neutral/0` | `neutral/0` | `neutral/0` | `neutral/0` | `neutral/0` |
| `color/action/secondary-foreground` | `wireframe/500` | `red/500` | `green/500` | `blue/500` | `purple/500` |
| `color/background/default` | `neutral/0` | `neutral/0` | `neutral/900` | `neutral/0` | `neutral/900` |
| `color/background/surface` | `wireframe/100` | `neutral/50` | `neutral/800` | `neutral/50` | `neutral/800` |
| `color/background/hover` | `wireframe/200` | `neutral/100` | `neutral/700` | `neutral/100` | `neutral/700` |
| `color/text/primary` | `wireframe/500` | `neutral/900` | `neutral/0` | `neutral/900` | `neutral/0` |
| `color/text/secondary` | `wireframe/400` | `neutral/500` | `neutral/400` | `neutral/500` | `neutral/400` |
| `color/text/inverse` | `neutral/0` | `neutral/0` | `neutral/900` | `neutral/0` | `neutral/900` |
| `color/border/default` | `wireframe/200` | `neutral/200` | `neutral/700` | `neutral/200` | `neutral/700` |
| `color/feedback/success` | `wireframe/300` | `feedback/success` | `feedback/success` | `feedback/success` | `feedback/success` |
| `color/feedback/warning` | `wireframe/300` | `feedback/warning` | `feedback/warning` | `feedback/warning` | `feedback/warning` |
| `color/feedback/error` | `wireframe/300` | `feedback/error` | `feedback/error` | `feedback/error` | `feedback/error` |
| `color/feedback/info` | `wireframe/300` | `feedback/info` | `feedback/info` | `feedback/info` | `feedback/info` |

---

## 3. Como Criar no Figma (Passo a Passo)

### 3.1 Criar Colecao Primitives

1. No Figma, clique no icone **"Variables"** (barra lateral direita ou atalho)
2. Clique em **"Create collection"**
3. Nomeie: `Primitives`
4. Clique em **"+ New variable"** > **Color**
5. Digite o nome: `color/neutral/0`
6. Cole o valor HEX: `#FFFFFF`
7. Repita para todas as variaveis da tabela acima
8. Para variaveis FLOAT (spacing, radius, font), selecione tipo **Number**

### 3.2 Criar Colecao Semantic

1. Crie uma nova colecao: `Semantic`
2. O primeiro modo ja vem criado; renomeie para `Wireframe`
3. Clique no **"+"** ao lado dos modos para adicionar:
   - `Brand A — iFood`
   - `Brand B — POS Verde`
   - `Brand C — POS Azul`
   - `Brand D — POS Roxo`
4. Adicione as variaveis semanticas (ex.: `color/action/primary`)
5. Para cada variavel, em cada modo, clique no valor e selecione **"Alias"**
6. Escolha a variavel primitiva correspondente da tabela de mapeamento

### 3.3 Aplicar em Componentes

1. Selecione um frame/componente (ex.: Botao Primario)
2. No painel de propriedades, clique no campo de **Fill**
3. Clique no icone de **variavel** (quadrado com ponto)
4. Selecione `Semantic > color/action/primary`
5. Agora, ao trocar o modo, a cor muda automaticamente

### 3.4 Alternar entre Modos

1. Selecione o frame pai (ex.: a tela inteira)
2. No painel de propriedades, em **"Layer"**, clique no seletor de modo
3. Escolha entre: `Wireframe`, `Brand A — iFood`, `Brand B — POS Verde`, etc.
4. Todos os componentes filhos mudam instantaneamente

---

## 4. Key Screens — Plataforma de Pagamentos

### 4.1 Tela: Pedidos Pendentes (POS)

```
+------------------------------------------+
|  [Logo]  Pedidos Pendentes    [Perfil]   |  <- bg: color/background/default
|------------------------------------------|
|  +------------------------------------+  |
|  | Pedido #1234                       |  |  <- bg: color/background/surface
|  | Cliente: Joao Silva               |  |  <- text: color/text/primary
|  | Total: R$ 45,90                   |  |  <- text: color/text/secondary
|  | Status: Aguardando                |  |  <- badge: color/feedback/warning
|  |                                    |  |
|  | [Aceitar Pedido]  [Recusar]       |  |  <- btn primary / btn ghost
|  +------------------------------------+  |  <- border: color/border/default
|                                          |
|  +------------------------------------+  |
|  | Pedido #1235                       |  |
|  | Cliente: Maria Santos             |  |
|  | Total: R$ 128,00                  |  |
|  | Status: Novo                      |  |  <- badge: color/feedback/info
|  |                                    |  |
|  | [Aceitar Pedido]  [Recusar]       |  |
|  +------------------------------------+  |
+------------------------------------------+
```

**Mapeamento de Variaveis:**

| Elemento | Token Semantico |
|---|---|
| Fundo da tela | `color/background/default` |
| Card de pedido | `color/background/surface` |
| Borda do card | `color/border/default` |
| Nome do cliente | `color/text/primary` |
| Valor do pedido | `color/text/secondary` |
| Botao "Aceitar" | `color/action/primary` (fill) + `color/action/primary-foreground` (text) |
| Botao "Recusar" | `color/text/primary` (text) + transparent (fill) |
| Badge "Aguardando" | `color/feedback/warning` |
| Badge "Novo" | `color/feedback/info` |

### 4.2 Tela: Pagamento (Checkout)

```
+------------------------------------------+
|  <- Voltar    Pagamento                  |  <- bg: color/background/default
|------------------------------------------|
|                                          |
|       R$ 45,90                           |  <- text: color/text/primary (4xl)
|       Pedido #1234                       |  <- text: color/text/secondary
|                                          |
|  +------------------------------------+  |
|  | Cartao de Credito                  |  |  <- bg: color/action/primary-subtle
|  | **** **** **** 1234               |  |
|  +------------------------------------+  |
|                                          |
|  +------------------------------------+  |
|  | PIX                                |  |  <- bg: color/background/surface
|  | Gerar QR Code                     |  |
|  +------------------------------------+  |
|                                          |
|  [       Confirmar Pagamento        ]    |  <- btn primary (full width)
|                                          |
+------------------------------------------+
```

### 4.3 Tela: Dashboard de Vendas

```
+------------------------------------------+
|  [Logo]  Dashboard    [Notif] [Perfil]   |
|------------------------------------------|
|                                          |
|  Vendas Hoje: R$ 3.450,00               |  <- text: color/text/primary
|  +12% vs ontem                           |  <- text: color/feedback/success
|                                          |
|  +----------+ +----------+ +----------+  |
|  | Vendas   | | Ticket   | | Pedidos  |  |  <- bg: color/background/surface
|  | 47       | | R$ 73    | | 3 pend.  |  |
|  +----------+ +----------+ +----------+  |
|                                          |
|  Ultimas Transacoes                      |
|  +------------------------------------+  |
|  | Joao Silva   R$ 45,90  Aprovado   |  |  <- badge: color/feedback/success
|  | Maria Santos R$ 128,00 Pendente   |  |  <- badge: color/feedback/warning
|  | Pedro Lima   R$ 32,50  Recusado   |  |  <- badge: color/feedback/error
|  +------------------------------------+  |
+------------------------------------------+
```

---

## 5. Resultado Esperado

Ao final, voce tera no Figma:

1. **Colecao Primitives** — ~60 variaveis (cores, spacing, radius, typography)
2. **Colecao Semantic** — 16 variaveis x 5 modos (Wireframe + 4 marcas)
3. **Componentes** usando apenas tokens semanticos
4. **Key Screens** que mudam de identidade visual ao trocar o modo

Para alternar entre marcas:
- Selecione o frame da tela
- Mude o modo da colecao Semantic
- A tela inteira muda instantaneamente

---

## 6. Notas Tecnicas

- **Formato DTCG (W3C):** Os tokens seguem o padrao `{ "$value": "...", "$type": "..." }`
- **Style Dictionary:** Transforma tokens JSON em CSS custom properties
- **Prefixo CSS:** `--ds-` (ex.: `--ds-color-action-primary`)
- **Atributo HTML:** `data-brand="brand-a"` para trocar marcas em runtime
- **Figma Plugin:** Use o plugin incluido para criar variaveis automaticamente
- **Figma REST API:** Use `pnpm setup-figma` para criar variaveis via API
