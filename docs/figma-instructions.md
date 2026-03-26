# Guia Passo a Passo: Variables no Figma

> Como implementar o Design System White Label no Figma usando o painel de Variables.
> Resultado: 1 wireframe + 4 marcas, alternando instantaneamente.

---

## Visao Geral

```
Colecao "Primitives"  →  ~40 variaveis (cores, spacing, radius, tipografia)
                          1 modo: Default

Colecao "Semantic"    →  16 variaveis semanticas
                          5 modos: Wireframe | Brand A (iFood) | Brand B (POS Verde) |
                                   Brand C (POS Azul) | Brand D (POS Roxo)
```

---

## Opcao A: Automatico (API ou Plugin)

### Via API (recomendado)

```bash
# 1. Configure o .env na raiz do projeto
echo "FIGMA_ACCESS_TOKEN=seu-token-aqui" >> .env
echo "FIGMA_FILE_KEY=ySzjmjmWWEuodyJjcLXKSi" >> .env

# 2. Execute o script
pnpm setup-figma
```

Isso cria todas as colecoes, variaveis e modos automaticamente.

### Via Plugin do Figma

1. No Figma, va em **Plugins > Development > Import plugin from manifest**
2. Selecione `figma-plugin/manifest.json` do repositorio
3. Execute o plugin
4. Clique em **"Criar Variables"**
5. Aguarde a confirmacao

---

## Opcao B: Manual (Passo a Passo)

### Passo 1: Criar a Colecao "Primitives"

1. Abra o arquivo Figma
2. Clique no icone **"Variables"** na barra lateral direita (ou use o atalho `Ctrl/Cmd + Shift + V`)
3. Clique em **"Create collection"**
4. Nomeie: `Primitives`

#### 1.1 Cores Neutras

Para cada cor, clique em **"+ New variable" > Color** e preencha:

| Nome (copiar) | Valor HEX |
|---|---|
| `color/neutral/0` | `#FFFFFF` |
| `color/neutral/50` | `#FAFAFA` |
| `color/neutral/100` | `#F5F5F5` |
| `color/neutral/200` | `#E5E5E5` |
| `color/neutral/300` | `#D4D4D4` |
| `color/neutral/400` | `#A3A3A3` |
| `color/neutral/500` | `#737373` |
| `color/neutral/600` | `#525252` |
| `color/neutral/700` | `#404040` |
| `color/neutral/800` | `#262626` |
| `color/neutral/900` | `#171717` |

#### 1.2 Wireframe Grays

| Nome (copiar) | Valor HEX |
|---|---|
| `color/wireframe/100` | `#F2F2F2` |
| `color/wireframe/200` | `#E5E5E5` |
| `color/wireframe/300` | `#CCCCCC` |
| `color/wireframe/400` | `#999999` |
| `color/wireframe/500` | `#666666` |

#### 1.3 Paletas de Marca

| Nome (copiar) | Valor HEX | Marca |
|---|---|---|
| `color/red/50` | `#FFF0F0` | iFood sutil |
| `color/red/500` | `#E00C2C` | iFood primary |
| `color/red/600` | `#B8091F` | iFood hover |
| `color/orange/500` | `#FF6B1F` | iFood accent |
| `color/green/50` | `#F0FFF0` | POS Verde sutil |
| `color/green/500` | `#228B22` | POS Verde primary |
| `color/green/600` | `#1A6B1A` | POS Verde hover |
| `color/yellow/500` | `#FFD700` | POS Verde accent |
| `color/blue/50` | `#F0F7FF` | POS Azul sutil |
| `color/blue/500` | `#0066CC` | POS Azul primary |
| `color/blue/600` | `#0052A3` | POS Azul hover |
| `color/amber/500` | `#FFCC00` | POS Azul accent |
| `color/purple/50` | `#F5F0FF` | POS Roxo sutil |
| `color/purple/500` | `#6A0DAD` | POS Roxo primary |
| `color/purple/600` | `#550A8A` | POS Roxo hover |

#### 1.4 Feedback

| Nome (copiar) | Valor HEX |
|---|---|
| `color/feedback/success` | `#22C55E` |
| `color/feedback/warning` | `#F59E0B` |
| `color/feedback/error` | `#EF4444` |
| `color/feedback/info` | `#3B82F6` |

#### 1.5 Spacing (tipo Number)

Para cada token, use **"+ New variable" > Number**:

| Nome (copiar) | Valor |
|---|---|
| `spacing/1` | `4` |
| `spacing/2` | `8` |
| `spacing/3` | `12` |
| `spacing/4` | `16` |
| `spacing/5` | `20` |
| `spacing/6` | `24` |
| `spacing/8` | `32` |
| `spacing/10` | `40` |
| `spacing/12` | `48` |
| `spacing/16` | `64` |

#### 1.6 Radius (tipo Number)

| Nome (copiar) | Valor |
|---|---|
| `radius/sm` | `4` |
| `radius/md` | `8` |
| `radius/lg` | `12` |
| `radius/xl` | `16` |
| `radius/full` | `9999` |

---

### Passo 2: Criar a Colecao "Semantic" (com 5 modos)

1. Clique em **"Create collection"**
2. Nomeie: `Semantic`
3. O primeiro modo ja vem criado. Renomeie para **`Wireframe`**
4. Clique no **"+"** ao lado dos nomes de modo para adicionar:
   - `Brand A — iFood`
   - `Brand B — POS Verde`
   - `Brand C — POS Azul`
   - `Brand D — POS Roxo`

Agora voce tem 5 colunas (modos) na colecao Semantic.

#### 2.1 Adicionar variaveis semanticas

Para cada variavel, clique em **"+ New variable" > Color**.

Para cada modo/coluna, clique no valor e selecione **"Create alias"** (icone de losango), e selecione a variavel primitiva correspondente:

**color/action/primary**

| Modo | Alias para |
|---|---|
| Wireframe | `Primitives > color/wireframe/400` |
| Brand A — iFood | `Primitives > color/red/500` |
| Brand B — POS Verde | `Primitives > color/green/500` |
| Brand C — POS Azul | `Primitives > color/blue/500` |
| Brand D — POS Roxo | `Primitives > color/purple/500` |

**color/action/primary-hover**

| Modo | Alias para |
|---|---|
| Wireframe | `Primitives > color/wireframe/500` |
| Brand A — iFood | `Primitives > color/red/600` |
| Brand B — POS Verde | `Primitives > color/green/600` |
| Brand C — POS Azul | `Primitives > color/blue/600` |
| Brand D — POS Roxo | `Primitives > color/purple/600` |

**color/action/primary-subtle**

| Modo | Alias para |
|---|---|
| Wireframe | `Primitives > color/wireframe/100` |
| Brand A — iFood | `Primitives > color/red/50` |
| Brand B — POS Verde | `Primitives > color/green/50` |
| Brand C — POS Azul | `Primitives > color/blue/50` |
| Brand D — POS Roxo | `Primitives > color/purple/50` |

**color/action/primary-foreground**

| Modo | Alias para |
|---|---|
| Todos os modos | `Primitives > color/neutral/0` |

**color/action/secondary-foreground**

| Modo | Alias para |
|---|---|
| Wireframe | `Primitives > color/wireframe/500` |
| Brand A — iFood | `Primitives > color/red/500` |
| Brand B — POS Verde | `Primitives > color/green/500` |
| Brand C — POS Azul | `Primitives > color/blue/500` |
| Brand D — POS Roxo | `Primitives > color/purple/500` |

**color/background/default**

| Modo | Alias para |
|---|---|
| Wireframe | `Primitives > color/neutral/0` |
| Brand A — iFood | `Primitives > color/neutral/0` |
| Brand B — POS Verde | `Primitives > color/neutral/900` |
| Brand C — POS Azul | `Primitives > color/neutral/0` |
| Brand D — POS Roxo | `Primitives > color/neutral/900` |

**color/background/surface**

| Modo | Alias para |
|---|---|
| Wireframe | `Primitives > color/wireframe/100` |
| Brand A — iFood | `Primitives > color/neutral/50` |
| Brand B — POS Verde | `Primitives > color/neutral/800` |
| Brand C — POS Azul | `Primitives > color/neutral/50` |
| Brand D — POS Roxo | `Primitives > color/neutral/800` |

**color/background/hover**

| Modo | Alias para |
|---|---|
| Wireframe | `Primitives > color/wireframe/200` |
| Brand A — iFood | `Primitives > color/neutral/100` |
| Brand B — POS Verde | `Primitives > color/neutral/700` |
| Brand C — POS Azul | `Primitives > color/neutral/100` |
| Brand D — POS Roxo | `Primitives > color/neutral/700` |

**color/text/primary**

| Modo | Alias para |
|---|---|
| Wireframe | `Primitives > color/wireframe/500` |
| Brand A — iFood | `Primitives > color/neutral/900` |
| Brand B — POS Verde | `Primitives > color/neutral/0` |
| Brand C — POS Azul | `Primitives > color/neutral/900` |
| Brand D — POS Roxo | `Primitives > color/neutral/0` |

**color/text/secondary**

| Modo | Alias para |
|---|---|
| Wireframe | `Primitives > color/wireframe/400` |
| Brand A — iFood | `Primitives > color/neutral/500` |
| Brand B — POS Verde | `Primitives > color/neutral/400` |
| Brand C — POS Azul | `Primitives > color/neutral/500` |
| Brand D — POS Roxo | `Primitives > color/neutral/400` |

**color/text/inverse**

| Modo | Alias para |
|---|---|
| Wireframe | `Primitives > color/neutral/0` |
| Brand A — iFood | `Primitives > color/neutral/0` |
| Brand B — POS Verde | `Primitives > color/neutral/900` |
| Brand C — POS Azul | `Primitives > color/neutral/0` |
| Brand D — POS Roxo | `Primitives > color/neutral/900` |

**color/border/default**

| Modo | Alias para |
|---|---|
| Wireframe | `Primitives > color/wireframe/200` |
| Brand A — iFood | `Primitives > color/neutral/200` |
| Brand B — POS Verde | `Primitives > color/neutral/700` |
| Brand C — POS Azul | `Primitives > color/neutral/200` |
| Brand D — POS Roxo | `Primitives > color/neutral/700` |

**color/feedback/success**

| Modo | Alias para |
|---|---|
| Wireframe | `Primitives > color/wireframe/300` |
| Demais modos | `Primitives > color/feedback/success` |

**color/feedback/warning**

| Modo | Alias para |
|---|---|
| Wireframe | `Primitives > color/wireframe/300` |
| Demais modos | `Primitives > color/feedback/warning` |

**color/feedback/error**

| Modo | Alias para |
|---|---|
| Wireframe | `Primitives > color/wireframe/300` |
| Demais modos | `Primitives > color/feedback/error` |

**color/feedback/info**

| Modo | Alias para |
|---|---|
| Wireframe | `Primitives > color/wireframe/300` |
| Demais modos | `Primitives > color/feedback/info` |

---

### Passo 3: Aplicar Variables em Componentes

#### 3.1 Botao Primario

1. Crie um frame (Auto Layout) com texto
2. Selecione o frame
3. No painel **Fill**, clique no icone de variavel (quadrado com ponto)
4. Selecione `Semantic > color/action/primary`
5. Selecione o texto
6. No painel **Fill** do texto, selecione `Semantic > color/action/primary-foreground`
7. No painel **Auto Layout** > padding, aplique `Primitives > spacing/2` (vertical) e `Primitives > spacing/4` (horizontal)
8. Em **Corner radius**, aplique `Primitives > radius/md`

#### 3.2 Card de Pedido

1. Crie um frame (Auto Layout vertical)
2. **Fill**: `Semantic > color/background/surface`
3. **Stroke**: `Semantic > color/border/default` (1px)
4. **Corner radius**: `Primitives > radius/lg`
5. **Padding**: `Primitives > spacing/6`
6. Adicione textos internos:
   - Titulo: fill = `Semantic > color/text/primary`
   - Subtitulo: fill = `Semantic > color/text/secondary`

#### 3.3 Badge de Status

1. Crie um frame (Auto Layout) com texto
2. **Fill**: `Semantic > color/feedback/warning` (ou success, error, info)
3. **Texto fill**: `Semantic > color/action/primary-foreground`
4. **Corner radius**: `Primitives > radius/full`
5. **Padding**: `Primitives > spacing/1` (vertical), `Primitives > spacing/2` (horizontal)

---

### Passo 4: Montar a Tela "Pedidos Pendentes"

1. Crie um frame de 375x812 (iPhone) ou 1024x768 (desktop)
2. **Fill do frame**: `Semantic > color/background/default`
3. Dentro, adicione:
   - **Header**: fundo `color/background/surface`, texto `color/text/primary`
   - **Card de pedido 1**: usando tokens conforme Passo 3.2
   - **Botao "Aceitar"**: usando tokens conforme Passo 3.1
   - **Badge "Pendente"**: usando `color/feedback/warning`
   - **Card de pedido 2**: repetir
   - **Badge "Novo"**: usando `color/feedback/info`

---

### Passo 5: Alternar entre Modos (Marcas)

1. Selecione o frame PAI (a tela inteira)
2. No painel de propriedades, em **"Layer"** (ou design panel), procure a secao de variables
3. Clique no seletor de **modo** da colecao Semantic
4. Escolha entre:
   - **Wireframe** → tudo cinza
   - **Brand A — iFood** → vermelho, fundo claro
   - **Brand B — POS Verde** → verde, fundo escuro
   - **Brand C — POS Azul** → azul, fundo claro
   - **Brand D — POS Roxo** → roxo, fundo escuro
5. Todos os componentes filhos mudam instantaneamente!

**Dica**: Duplique a tela 5 vezes e aplique um modo diferente em cada copia para ver todas as versoes lado a lado.

---

## Resumo Rapido

| Acao | Onde | Como |
|---|---|---|
| Criar colecao | Variables panel | Create collection |
| Adicionar variavel | Dentro da colecao | + New variable |
| Criar alias | Valor da variavel | Clique > Create alias |
| Adicionar modo | Colecao Semantic | + ao lado dos modos |
| Aplicar variavel | Propriedade de fill/stroke | Icone de variavel |
| Trocar modo | Frame pai | Layer > seletor de modo |

---

## Referencia de Nomes (para copiar)

### Colecoes
- `Primitives`
- `Semantic`

### Modos da colecao Semantic
- `Wireframe`
- `Brand A — iFood`
- `Brand B — POS Verde`
- `Brand C — POS Azul`
- `Brand D — POS Roxo`

### Variaveis Semanticas (16)
```
color/action/primary
color/action/primary-hover
color/action/primary-subtle
color/action/primary-foreground
color/action/secondary-foreground
color/background/default
color/background/surface
color/background/hover
color/text/primary
color/text/secondary
color/text/inverse
color/border/default
color/feedback/success
color/feedback/warning
color/feedback/error
color/feedback/info
```
