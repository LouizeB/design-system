# Design System Foundations — White Label Payment Platform

> Documento de referencia para a arquitetura de tokens, tipografia, espacamento e componentes do Design System multibrand.

---

## 1. Arquitetura de Tokens (3 Camadas)

```
┌─────────────────────────────────────────────────────────┐
│  Camada 1: PRIMITIVOS (Base)                            │
│  Valores brutos — nunca usados diretamente em UI        │
│  Exemplos: color/neutral/500, spacing/4, radius/md      │
├─────────────────────────────────────────────────────────┤
│  Camada 2: SEMANTICOS (por marca)                       │
│  Dao significado aos primitivos                         │
│  Mesma estrutura em todos os modos; so os valores mudam │
│  Exemplos: color/action/primary, color/text/primary     │
├─────────────────────────────────────────────────────────┤
│  Camada 3: COMPONENTES                                  │
│  Tokens especificos de componente                       │
│  Exemplos: button-border-radius, card-padding           │
└─────────────────────────────────────────────────────────┘
```

### Fluxo de dados

```
Figma Variables ──> pnpm sync-figma ──> Style Dictionary ──> CSS Custom Properties
     (source)         (extract)          (transform)          (output)
```

---

## 2. Primitivos (Base Tokens)

### 2.1 Paleta de Cores

#### Neutros (neutral/0 a neutral/900)
Escala de 11 tons de branco a quase-preto. Base para backgrounds, textos e bordas.

| Token | HEX | Uso tipico |
|---|---|---|
| `neutral/0` | #FFFFFF | Branco puro, fundo claro |
| `neutral/50` | #FAFAFA | Fundo sutil |
| `neutral/100` | #F5F5F5 | Fundo secundario |
| `neutral/200` | #E5E5E5 | Bordas leves |
| `neutral/300` | #D4D4D4 | Bordas padrao |
| `neutral/400` | #A3A3A3 | Texto desabilitado |
| `neutral/500` | #737373 | Texto secundario |
| `neutral/600` | #525252 | Texto medio |
| `neutral/700` | #404040 | Bordas em temas escuros |
| `neutral/800` | #262626 | Fundo em temas escuros |
| `neutral/900` | #171717 | Texto primario / fundo escuro |

#### Wireframe Grays (wireframe/100 a wireframe/500)
Escala de 5 tons para prototipagem rapida em modo wireframe.

| Token | HEX |
|---|---|
| `wireframe/100` | #F2F2F2 |
| `wireframe/200` | #E5E5E5 |
| `wireframe/300` | #CCCCCC |
| `wireframe/400` | #999999 |
| `wireframe/500` | #666666 |

#### Paletas de Marca

| Paleta | Tokens | Uso |
|---|---|---|
| Red | red/50, red/500, red/600 | Brand A (iFood) |
| Green | green/50, green/500, green/600 | Brand B (POS Verde) |
| Blue | blue/50, blue/500, blue/600 | Brand C (POS Azul) |
| Purple | purple/50, purple/500, purple/600 | Brand D (POS Roxo) |
| Orange | orange/500 | Accent iFood |
| Yellow | yellow/500 | Accent POS Verde |
| Amber | amber/500 | Accent POS Azul |

#### Feedback

| Token | HEX | Uso |
|---|---|---|
| `feedback/success` | #22C55E | Transacao aprovada, status OK |
| `feedback/warning` | #F59E0B | Pedido pendente, atencao |
| `feedback/error` | #EF4444 | Erro, transacao recusada |
| `feedback/info` | #3B82F6 | Informacao, novo pedido |

### 2.2 Espacamento

Escala baseada em multiplos de 4px (4-point grid).

| Token | Valor | Uso tipico |
|---|---|---|
| `spacing/1` | 4px | Micro gap (icon-text) |
| `spacing/2` | 8px | Padding interno compacto |
| `spacing/3` | 12px | Gap entre itens de lista |
| `spacing/4` | 16px | Padding padrao |
| `spacing/5` | 20px | Gap medio |
| `spacing/6` | 24px | Padding de card |
| `spacing/8` | 32px | Separacao de secoes |
| `spacing/10` | 40px | Margem de pagina |
| `spacing/12` | 48px | Espacamento largo |
| `spacing/16` | 64px | Espacamento extra largo |

### 2.3 Raio (Border Radius)

| Token | Valor | Uso tipico |
|---|---|---|
| `radius/sm` | 4px | Badges, tags |
| `radius/md` | 8px | Botoes, inputs |
| `radius/lg` | 12px | Cards |
| `radius/xl` | 16px | Modais, sheets |
| `radius/full` | 9999px | Avatares, pills |

---

## 3. Tipografia

### 3.1 Familias

| Token | Valor | Uso |
|---|---|---|
| `font/family/sans` | Inter, system-ui, sans-serif | UI geral |
| `font/family/mono` | JetBrains Mono, monospace | Codigo, valores monetarios |

### 3.2 Escala de Tamanhos

| Token | Tamanho | Uso tipico |
|---|---|---|
| `font/size/xs` | 12px | Badges, labels minimos |
| `font/size/sm` | 14px | Texto secundario, metadados |
| `font/size/md` | 16px | Corpo de texto padrao |
| `font/size/lg` | 18px | Subtitulos |
| `font/size/xl` | 20px | Titulos de secao |
| `font/size/2xl` | 24px | Titulos de pagina |
| `font/size/3xl` | 30px | Headers principais |
| `font/size/4xl` | 36px | Valores monetarios em destaque |

### 3.3 Pesos

| Token | Valor | Uso |
|---|---|---|
| `font/weight/regular` | 400 | Corpo de texto |
| `font/weight/medium` | 500 | Labels, menus |
| `font/weight/semibold` | 600 | Botoes, titulos de card |
| `font/weight/bold` | 700 | Headers, destaque |

### 3.4 Entrelinha (Line Height)

| Token | Valor | Uso |
|---|---|---|
| `font/lineHeight/tight` | 1.25 | Titulos, headers |
| `font/lineHeight/normal` | 1.5 | Corpo de texto |
| `font/lineHeight/relaxed` | 1.75 | Texto longo, paragrafos |

---

## 4. Tokens Semanticos (por Marca)

Os tokens semanticos sao a interface entre os primitivos e os componentes.
**Componentes NUNCA referenciam primitivos diretamente — sempre usam tokens semanticos.**

### 4.1 Action (cores de acao)

| Token | Descricao | CSS Variable |
|---|---|---|
| `color/action/primary` | Cor principal de acao (botao, link) | `--ds-color-action-primary` |
| `color/action/primary-hover` | Estado hover da cor primaria | `--ds-color-action-primary-hover` |
| `color/action/primary-subtle` | Fundo sutil para elementos de acao | `--ds-color-action-primary-subtle` |
| `color/action/primary-foreground` | Texto sobre fundo primario | `--ds-color-action-primary-foreground` |
| `color/action/secondary-foreground` | Texto de acao secundaria | `--ds-color-action-secondary-foreground` |

### 4.2 Background

| Token | Descricao | CSS Variable |
|---|---|---|
| `color/background/default` | Fundo principal da pagina | `--ds-color-background-default` |
| `color/background/surface` | Fundo de cards e paineis | `--ds-color-background-surface` |
| `color/background/hover` | Fundo no estado hover | `--ds-color-background-hover` |

### 4.3 Text

| Token | Descricao | CSS Variable |
|---|---|---|
| `color/text/primary` | Texto principal (titulos, corpo) | `--ds-color-text-primary` |
| `color/text/secondary` | Texto secundario (meta, placeholder) | `--ds-color-text-secondary` |
| `color/text/inverse` | Texto sobre fundos invertidos | `--ds-color-text-inverse` |

### 4.4 Border

| Token | Descricao | CSS Variable |
|---|---|---|
| `color/border/default` | Borda padrao de cards e inputs | `--ds-color-border-default` |

### 4.5 Feedback

| Token | Descricao | CSS Variable |
|---|---|---|
| `color/feedback/success` | Status positivo (aprovado) | `--ds-color-feedback-success` |
| `color/feedback/warning` | Alerta (pendente) | `--ds-color-feedback-warning` |
| `color/feedback/error` | Erro (recusado) | `--ds-color-feedback-error` |
| `color/feedback/info` | Informativo (novo) | `--ds-color-feedback-info` |

---

## 5. Mapeamento por Marca

### Marcas configuradas

| Modo | Identidade | Fundo | Texto | Tema |
|---|---|---|---|---|
| **Wireframe** | Cinza | Branco | Cinza escuro | Neutro |
| **Brand A — iFood** | Vermelho #E00C2C | Branco | Escuro | Claro |
| **Brand B — POS Verde** | Verde #228B22 | Preto | Branco | Escuro |
| **Brand C — POS Azul** | Azul #0066CC | Branco | Escuro | Claro |
| **Brand D — POS Roxo** | Roxo #6A0DAD | Preto | Branco | Escuro |

### Tabela completa de mapeamento

| Token | Wireframe | Brand A | Brand B | Brand C | Brand D |
|---|---|---|---|---|---|
| action/primary | wireframe/400 | red/500 | green/500 | blue/500 | purple/500 |
| action/primary-hover | wireframe/500 | red/600 | green/600 | blue/600 | purple/600 |
| action/primary-subtle | wireframe/100 | red/50 | green/50 | blue/50 | purple/50 |
| background/default | neutral/0 | neutral/0 | neutral/900 | neutral/0 | neutral/900 |
| background/surface | wireframe/100 | neutral/50 | neutral/800 | neutral/50 | neutral/800 |
| text/primary | wireframe/500 | neutral/900 | neutral/0 | neutral/900 | neutral/0 |
| text/secondary | wireframe/400 | neutral/500 | neutral/400 | neutral/500 | neutral/400 |
| border/default | wireframe/200 | neutral/200 | neutral/700 | neutral/200 | neutral/700 |

---

## 6. Tokens de Componente

### 6.1 Button

| Token | Valor | CSS Variable |
|---|---|---|
| border-radius | `{radius/md}` (8px) | `--ds-component-button-border-radius` |
| font-weight | `{font/weight/semibold}` (600) | `--ds-component-button-font-weight` |
| padding-y (sm) | `{spacing/1}` (4px) | — |
| padding-x (sm) | `{spacing/3}` (12px) | — |
| padding-y (md) | `{spacing/2}` (8px) | — |
| padding-x (md) | `{spacing/4}` (16px) | — |
| padding-y (lg) | `{spacing/3}` (12px) | — |
| padding-x (lg) | `{spacing/6}` (24px) | — |

### 6.2 Card

| Token | Valor |
|---|---|
| padding | `{spacing/6}` (24px) |
| border-radius | `{radius/lg}` (12px) |
| border-width | 1px |

### 6.3 Input

| Token | Valor |
|---|---|
| height | 40px |
| padding-x | `{spacing/3}` (12px) |
| border-radius | `{radius/md}` (8px) |
| border-width | 1px |

### 6.4 Badge

| Token | Valor |
|---|---|
| padding-y | `{spacing/1}` (4px) |
| padding-x | `{spacing/2}` (8px) |
| border-radius | `{radius/full}` (pill) |
| font-size | `{font/size/xs}` (12px) |

---

## 7. Global Styles

### 7.1 Sombras (Elevation)

| Nivel | Box Shadow | Uso |
|---|---|---|
| `shadow/sm` | 0 1px 2px rgba(0,0,0,0.05) | Botoes, badges |
| `shadow/md` | 0 4px 6px rgba(0,0,0,0.07) | Cards, dropdowns |
| `shadow/lg` | 0 10px 15px rgba(0,0,0,0.10) | Modais, sheets |

### 7.2 Transicoes

| Token | Valor | Uso |
|---|---|---|
| `transition/fast` | 150ms ease | Hover, focus |
| `transition/normal` | 200ms ease | Abertura de menus |
| `transition/slow` | 300ms ease | Modais, animacoes |

### 7.3 Z-Index

| Token | Valor | Uso |
|---|---|---|
| `z/dropdown` | 10 | Menus dropdown |
| `z/modal` | 50 | Modais, dialogs |
| `z/toast` | 100 | Toasts, notificacoes |

### 7.4 Breakpoints

| Token | Valor | Dispositivo |
|---|---|---|
| `breakpoint/sm` | 640px | Mobile |
| `breakpoint/md` | 768px | Tablet |
| `breakpoint/lg` | 1024px | Desktop |
| `breakpoint/xl` | 1280px | Desktop largo |

---

## 8. Uso em Componentes (Codigo)

### CSS (Custom Properties)

```css
.button-primary {
  background: var(--ds-color-action-primary);
  color: var(--ds-color-action-primary-foreground);
  border-radius: var(--ds-component-button-border-radius);
  padding: var(--ds-spacing-2) var(--ds-spacing-4);
  font-weight: var(--ds-component-button-font-weight);
  transition: background 150ms ease;
}

.button-primary:hover {
  background: var(--ds-color-action-primary-hover);
}
```

### Trocar marca via HTML

```html
<!-- Brand A: iFood (vermelho) -->
<html data-brand="brand-a">

<!-- Brand B: POS Verde -->
<html data-brand="brand-b">

<!-- Brand C: POS Azul -->
<html data-brand="brand-c">

<!-- Brand D: POS Roxo -->
<html data-brand="brand-d">

<!-- Wireframe -->
<html data-brand="wireframe">
```

### React (ThemeProvider)

```tsx
import { ThemeProvider, useTheme } from '@ds/themes'

function App() {
  return (
    <ThemeProvider defaultBrand="brand-a">
      <PaymentScreen />
    </ThemeProvider>
  )
}

function BrandSwitcher() {
  const { brand, setBrand, toggleBrand } = useTheme()
  return (
    <select value={brand} onChange={e => setBrand(e.target.value)}>
      <option value="brand-a">iFood</option>
      <option value="brand-b">POS Verde</option>
      <option value="brand-c">POS Azul</option>
      <option value="brand-d">POS Roxo</option>
      <option value="wireframe">Wireframe</option>
    </select>
  )
}
```
