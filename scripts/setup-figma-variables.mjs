#!/usr/bin/env node
/**
 * setup-figma-variables.mjs
 *
 * Cria toda a estrutura de Variables no Figma espelhando os tokens do projeto:
 *
 *   Colecao "Primitives" → tokens primitivos (paleta, wireframe, espacamento, tipografia)
 *   Colecao "Semantic"   → tokens semanticos com 5 modos:
 *                           Wireframe, Brand A (iFood), Brand B (POS Verde),
 *                           Brand C (POS Azul), Brand D (POS Roxo)
 *
 * Uso:
 *   1. Preencha o .env com FIGMA_ACCESS_TOKEN e FIGMA_FILE_KEY
 *   2. node scripts/setup-figma-variables.mjs
 *
 * Ou via npm script:
 *   pnpm setup-figma
 */

import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ── Carregar .env ─────────────────────────────────────────────────────────
try {
  const env = readFileSync(join(__dirname, '../.env'), 'utf-8')
  for (const line of env.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const [key, ...rest] = trimmed.split('=')
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim()
  }
} catch {
  // sem .env — usa variaveis de ambiente do sistema
}

const TOKEN    = process.env.FIGMA_ACCESS_TOKEN
const FILE_KEY = process.env.FIGMA_FILE_KEY

if (!TOKEN || !FILE_KEY) {
  console.error('Preencha FIGMA_ACCESS_TOKEN e FIGMA_FILE_KEY no arquivo .env')
  console.error('   Veja o .env.example para referencia.')
  process.exit(1)
}

// ── Helpers ───────────────────────────────────────────────────────────────

/** Converte hex (#rrggbb) para objeto RGBA float (0-1) que a API do Figma usa */
function hex(h) {
  return {
    r: +(parseInt(h.slice(1, 3), 16) / 255).toFixed(5),
    g: +(parseInt(h.slice(3, 5), 16) / 255).toFixed(5),
    b: +(parseInt(h.slice(5, 7), 16) / 255).toFixed(5),
    a: 1,
  }
}

/** Cria um valor de alias (referencia a outra variable) */
function alias(tempId) {
  return { type: 'VARIABLE_ALIAS', id: tempId }
}

// ── IDs temporarios das colecoes e modos ──────────────────────────────────

const COL = {
  primitives: {
    id: 'temp:col_primitives',
    modeId: 'temp:mode_primitives',
    name: 'Primitives',
  },
  semantic: {
    id: 'temp:col_semantic',
    modeId: 'temp:mode_wireframe',
    name: 'Semantic',
  },
}

// Modos adicionais para a colecao Semantic
const SEMANTIC_MODES = {
  wireframe:  'temp:mode_wireframe',
  brand_a:    'temp:mode_brand_a',
  brand_b:    'temp:mode_brand_b',
  brand_c:    'temp:mode_brand_c',
  brand_d:    'temp:mode_brand_d',
}

// ── Tokens primitivos ───────────────────────────────────────────────────

const primitiveTokens = [
  // Neutros
  { id: 'temp:n0',   name: 'color/neutral/0',   type: 'COLOR', value: hex('#ffffff') },
  { id: 'temp:n50',  name: 'color/neutral/50',  type: 'COLOR', value: hex('#fafafa') },
  { id: 'temp:n100', name: 'color/neutral/100', type: 'COLOR', value: hex('#f5f5f5') },
  { id: 'temp:n200', name: 'color/neutral/200', type: 'COLOR', value: hex('#e5e5e5') },
  { id: 'temp:n300', name: 'color/neutral/300', type: 'COLOR', value: hex('#d4d4d4') },
  { id: 'temp:n400', name: 'color/neutral/400', type: 'COLOR', value: hex('#a3a3a3') },
  { id: 'temp:n500', name: 'color/neutral/500', type: 'COLOR', value: hex('#737373') },
  { id: 'temp:n600', name: 'color/neutral/600', type: 'COLOR', value: hex('#525252') },
  { id: 'temp:n700', name: 'color/neutral/700', type: 'COLOR', value: hex('#404040') },
  { id: 'temp:n800', name: 'color/neutral/800', type: 'COLOR', value: hex('#262626') },
  { id: 'temp:n900', name: 'color/neutral/900', type: 'COLOR', value: hex('#171717') },

  // Wireframe grays
  { id: 'temp:w100', name: 'color/wireframe/100', type: 'COLOR', value: hex('#F2F2F2') },
  { id: 'temp:w200', name: 'color/wireframe/200', type: 'COLOR', value: hex('#E5E5E5') },
  { id: 'temp:w300', name: 'color/wireframe/300', type: 'COLOR', value: hex('#CCCCCC') },
  { id: 'temp:w400', name: 'color/wireframe/400', type: 'COLOR', value: hex('#999999') },
  { id: 'temp:w500', name: 'color/wireframe/500', type: 'COLOR', value: hex('#666666') },

  // Red (iFood)
  { id: 'temp:red50',  name: 'color/red/50',  type: 'COLOR', value: hex('#FFF0F0') },
  { id: 'temp:red500', name: 'color/red/500', type: 'COLOR', value: hex('#E00C2C') },
  { id: 'temp:red600', name: 'color/red/600', type: 'COLOR', value: hex('#B8091F') },

  // Orange
  { id: 'temp:orange500', name: 'color/orange/500', type: 'COLOR', value: hex('#FF6B1F') },

  // Green (POS Verde)
  { id: 'temp:green50',  name: 'color/green/50',  type: 'COLOR', value: hex('#F0FFF0') },
  { id: 'temp:green500', name: 'color/green/500', type: 'COLOR', value: hex('#228B22') },
  { id: 'temp:green600', name: 'color/green/600', type: 'COLOR', value: hex('#1A6B1A') },

  // Yellow
  { id: 'temp:yellow500', name: 'color/yellow/500', type: 'COLOR', value: hex('#FFD700') },

  // Blue (POS Azul)
  { id: 'temp:blue50',  name: 'color/blue/50',  type: 'COLOR', value: hex('#F0F7FF') },
  { id: 'temp:blue500', name: 'color/blue/500', type: 'COLOR', value: hex('#0066CC') },
  { id: 'temp:blue600', name: 'color/blue/600', type: 'COLOR', value: hex('#0052A3') },

  // Amber
  { id: 'temp:amber500', name: 'color/amber/500', type: 'COLOR', value: hex('#FFCC00') },

  // Purple (POS Roxo)
  { id: 'temp:purple50',  name: 'color/purple/50',  type: 'COLOR', value: hex('#F5F0FF') },
  { id: 'temp:purple500', name: 'color/purple/500', type: 'COLOR', value: hex('#6A0DAD') },
  { id: 'temp:purple600', name: 'color/purple/600', type: 'COLOR', value: hex('#550A8A') },

  // Feedback
  { id: 'temp:fb_success', name: 'color/palette/feedback/success', type: 'COLOR', value: hex('#22C55E') },
  { id: 'temp:fb_warning', name: 'color/palette/feedback/warning', type: 'COLOR', value: hex('#F59E0B') },
  { id: 'temp:fb_error',   name: 'color/palette/feedback/error',   type: 'COLOR', value: hex('#EF4444') },
  { id: 'temp:fb_info',    name: 'color/palette/feedback/info',    type: 'COLOR', value: hex('#3B82F6') },

  // Espacamento
  { id: 'temp:sp1',  name: 'spacing/1',  type: 'FLOAT', value: 4  },
  { id: 'temp:sp2',  name: 'spacing/2',  type: 'FLOAT', value: 8  },
  { id: 'temp:sp3',  name: 'spacing/3',  type: 'FLOAT', value: 12 },
  { id: 'temp:sp4',  name: 'spacing/4',  type: 'FLOAT', value: 16 },
  { id: 'temp:sp5',  name: 'spacing/5',  type: 'FLOAT', value: 20 },
  { id: 'temp:sp6',  name: 'spacing/6',  type: 'FLOAT', value: 24 },
  { id: 'temp:sp8',  name: 'spacing/8',  type: 'FLOAT', value: 32 },
  { id: 'temp:sp10', name: 'spacing/10', type: 'FLOAT', value: 40 },
  { id: 'temp:sp12', name: 'spacing/12', type: 'FLOAT', value: 48 },
  { id: 'temp:sp16', name: 'spacing/16', type: 'FLOAT', value: 64 },

  // Raio
  { id: 'temp:radsm',   name: 'radius/sm',   type: 'FLOAT', value: 4    },
  { id: 'temp:radmd',   name: 'radius/md',   type: 'FLOAT', value: 8    },
  { id: 'temp:radlg',   name: 'radius/lg',   type: 'FLOAT', value: 12   },
  { id: 'temp:radxl',   name: 'radius/xl',   type: 'FLOAT', value: 16   },
  { id: 'temp:radfull', name: 'radius/full', type: 'FLOAT', value: 9999 },

  // Tipografia — familias
  { id: 'temp:ffsans', name: 'font/family/sans', type: 'STRING', value: 'Inter, system-ui, sans-serif' },
  { id: 'temp:ffmono', name: 'font/family/mono', type: 'STRING', value: 'JetBrains Mono, monospace'   },

  // Tipografia — tamanhos
  { id: 'temp:fsxs',  name: 'font/size/xs',  type: 'FLOAT', value: 12 },
  { id: 'temp:fssm',  name: 'font/size/sm',  type: 'FLOAT', value: 14 },
  { id: 'temp:fsmd',  name: 'font/size/md',  type: 'FLOAT', value: 16 },
  { id: 'temp:fslg',  name: 'font/size/lg',  type: 'FLOAT', value: 18 },
  { id: 'temp:fsxl',  name: 'font/size/xl',  type: 'FLOAT', value: 20 },
  { id: 'temp:fs2xl', name: 'font/size/2xl', type: 'FLOAT', value: 24 },
  { id: 'temp:fs3xl', name: 'font/size/3xl', type: 'FLOAT', value: 30 },
  { id: 'temp:fs4xl', name: 'font/size/4xl', type: 'FLOAT', value: 36 },

  // Tipografia — pesos
  { id: 'temp:fwreg', name: 'font/weight/regular',  type: 'FLOAT', value: 400 },
  { id: 'temp:fwmed', name: 'font/weight/medium',   type: 'FLOAT', value: 500 },
  { id: 'temp:fwsem', name: 'font/weight/semibold', type: 'FLOAT', value: 600 },
  { id: 'temp:fwbol', name: 'font/weight/bold',     type: 'FLOAT', value: 700 },

  // Tipografia — entrelinha
  { id: 'temp:lht', name: 'font/lineHeight/tight',   type: 'FLOAT', value: 1.25 },
  { id: 'temp:lhn', name: 'font/lineHeight/normal',  type: 'FLOAT', value: 1.5  },
  { id: 'temp:lhr', name: 'font/lineHeight/relaxed', type: 'FLOAT', value: 1.75 },
]

// ── Tokens semanticos (mapeamento por modo) ──────────────────────────────

const semanticTokens = [
  {
    name: 'color/action/primary',
    wireframe: 'temp:w400', brandA: 'temp:red500',    brandB: 'temp:green500',
    brandC: 'temp:blue500',   brandD: 'temp:purple500',
  },
  {
    name: 'color/action/primary-hover',
    wireframe: 'temp:w500', brandA: 'temp:red600',    brandB: 'temp:green600',
    brandC: 'temp:blue600',   brandD: 'temp:purple600',
  },
  {
    name: 'color/action/primary-subtle',
    wireframe: 'temp:w100', brandA: 'temp:red50',     brandB: 'temp:green50',
    brandC: 'temp:blue50',    brandD: 'temp:purple50',
  },
  {
    name: 'color/action/primary-foreground',
    wireframe: 'temp:n0',  brandA: 'temp:n0',        brandB: 'temp:n0',
    brandC: 'temp:n0',       brandD: 'temp:n0',
  },
  {
    name: 'color/action/secondary-foreground',
    wireframe: 'temp:w500', brandA: 'temp:red500',    brandB: 'temp:green500',
    brandC: 'temp:blue500',   brandD: 'temp:purple500',
  },
  {
    name: 'color/background/default',
    wireframe: 'temp:n0',  brandA: 'temp:n0',        brandB: 'temp:n900',
    brandC: 'temp:n0',       brandD: 'temp:n900',
  },
  {
    name: 'color/background/surface',
    wireframe: 'temp:w100', brandA: 'temp:n50',       brandB: 'temp:n800',
    brandC: 'temp:n50',      brandD: 'temp:n800',
  },
  {
    name: 'color/background/hover',
    wireframe: 'temp:w200', brandA: 'temp:n100',      brandB: 'temp:n700',
    brandC: 'temp:n100',     brandD: 'temp:n700',
  },
  {
    name: 'color/text/primary',
    wireframe: 'temp:w500', brandA: 'temp:n900',      brandB: 'temp:n0',
    brandC: 'temp:n900',     brandD: 'temp:n0',
  },
  {
    name: 'color/text/secondary',
    wireframe: 'temp:w400', brandA: 'temp:n500',      brandB: 'temp:n400',
    brandC: 'temp:n500',     brandD: 'temp:n400',
  },
  {
    name: 'color/text/inverse',
    wireframe: 'temp:n0',  brandA: 'temp:n0',        brandB: 'temp:n900',
    brandC: 'temp:n0',       brandD: 'temp:n900',
  },
  {
    name: 'color/border/default',
    wireframe: 'temp:w200', brandA: 'temp:n200',      brandB: 'temp:n700',
    brandC: 'temp:n200',     brandD: 'temp:n700',
  },
  {
    name: 'color/feedback/success',
    wireframe: 'temp:w300', brandA: 'temp:fb_success', brandB: 'temp:fb_success',
    brandC: 'temp:fb_success', brandD: 'temp:fb_success',
  },
  {
    name: 'color/feedback/warning',
    wireframe: 'temp:w300', brandA: 'temp:fb_warning', brandB: 'temp:fb_warning',
    brandC: 'temp:fb_warning', brandD: 'temp:fb_warning',
  },
  {
    name: 'color/feedback/error',
    wireframe: 'temp:w300', brandA: 'temp:fb_error',   brandB: 'temp:fb_error',
    brandC: 'temp:fb_error',   brandD: 'temp:fb_error',
  },
  {
    name: 'color/feedback/info',
    wireframe: 'temp:w300', brandA: 'temp:fb_info',    brandB: 'temp:fb_info',
    brandC: 'temp:fb_info',    brandD: 'temp:fb_info',
  },
]

// ── Montar payload ─────────────────────────────────────────────────────────

// Colecoes
const variableCollections = [
  {
    action: 'CREATE',
    id: COL.primitives.id,
    name: COL.primitives.name,
    initialModeId: COL.primitives.modeId,
  },
  {
    action: 'CREATE',
    id: COL.semantic.id,
    name: COL.semantic.name,
    initialModeId: SEMANTIC_MODES.wireframe,
  },
]

// Modos adicionais para Semantic (wireframe ja e o initialMode)
const variableModes = [
  { action: 'CREATE', id: SEMANTIC_MODES.brand_a, name: 'Brand A — iFood',     variableCollectionId: COL.semantic.id },
  { action: 'CREATE', id: SEMANTIC_MODES.brand_b, name: 'Brand B — POS Verde',  variableCollectionId: COL.semantic.id },
  { action: 'CREATE', id: SEMANTIC_MODES.brand_c, name: 'Brand C — POS Azul',   variableCollectionId: COL.semantic.id },
  { action: 'CREATE', id: SEMANTIC_MODES.brand_d, name: 'Brand D — POS Roxo',   variableCollectionId: COL.semantic.id },
]

// Renomear o modo default para "Wireframe"
const variableModeUpdates = [
  { action: 'UPDATE', id: SEMANTIC_MODES.wireframe, name: 'Wireframe', variableCollectionId: COL.semantic.id },
]

const variables      = []
const variableValues = []

// Primitives
for (const t of primitiveTokens) {
  variables.push({
    action: 'CREATE',
    id: t.id,
    name: t.name,
    variableCollectionId: COL.primitives.id,
    resolvedType: t.type,
  })
  variableValues.push({
    variableId: t.id,
    modeId: COL.primitives.modeId,
    value: t.value,
  })
}

// Semantic
for (let i = 0; i < semanticTokens.length; i++) {
  const t = semanticTokens[i]
  const id = `temp:sem_${i}`

  variables.push({
    action: 'CREATE',
    id,
    name: t.name,
    variableCollectionId: COL.semantic.id,
    resolvedType: 'COLOR',
  })

  // Valor por modo (alias para primitivo)
  variableValues.push(
    { variableId: id, modeId: SEMANTIC_MODES.wireframe, value: alias(t.wireframe) },
    { variableId: id, modeId: SEMANTIC_MODES.brand_a,   value: alias(t.brandA)    },
    { variableId: id, modeId: SEMANTIC_MODES.brand_b,   value: alias(t.brandB)    },
    { variableId: id, modeId: SEMANTIC_MODES.brand_c,   value: alias(t.brandC)    },
    { variableId: id, modeId: SEMANTIC_MODES.brand_d,   value: alias(t.brandD)    },
  )
}

// ── Enviar para o Figma ────────────────────────────────────────────────────

const totalVars = variables.length
console.log(`Criando ${totalVars} variables em 2 colecoes no Figma...`)
console.log(`   Primitives: ${primitiveTokens.length} | Semantic: ${semanticTokens.length} x 5 modos`)

const payload = {
  variableCollections,
  variableModes: [...variableModeUpdates, ...variableModes],
  variables,
  variableValues,
}

const res = await fetch(`https://api.figma.com/v1/files/${FILE_KEY}/variables`, {
  method: 'POST',
  headers: {
    'X-Figma-Token': TOKEN,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
})

const result = await res.json()

if (!res.ok || result.error) {
  console.error('\nErro da API Figma:')
  console.error(JSON.stringify(result, null, 2))
  process.exit(1)
}

console.log('\nVariables criadas com sucesso!')
console.log('   Abra o Figma > Local Variables')
console.log('   Voce vera as colecoes: Primitives, Semantic')
console.log('   Na colecao Semantic, alterne entre os modos:')
console.log('     Wireframe | Brand A (iFood) | Brand B (POS Verde) | Brand C (POS Azul) | Brand D (POS Roxo)\n')
