#!/usr/bin/env node
/**
 * setup-figma-variables.mjs
 *
 * Cria toda a estrutura de Variables no Figma espelhando os tokens do projeto:
 *
 *   Coleção "Base"    → tokens primitivos (paleta de cores, espaçamento, tipografia)
 *   Coleção "Brand A" → tokens semânticos com identidade Indigo
 *   Coleção "Brand B" → tokens semânticos com identidade Rose
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
  // sem .env — usa variáveis de ambiente do sistema
}

const TOKEN    = process.env.FIGMA_ACCESS_TOKEN
const FILE_KEY = process.env.FIGMA_FILE_KEY

if (!TOKEN || !FILE_KEY) {
  console.error('❌  Preencha FIGMA_ACCESS_TOKEN e FIGMA_FILE_KEY no arquivo .env')
  console.error('   Veja o .env.example para referência.')
  process.exit(1)
}

// ── Helpers ───────────────────────────────────────────────────────────────

/** Converte hex (#rrggbb) para objeto RGBA float (0–1) que a API do Figma usa */
function hex(h) {
  return {
    r: +(parseInt(h.slice(1, 3), 16) / 255).toFixed(5),
    g: +(parseInt(h.slice(3, 5), 16) / 255).toFixed(5),
    b: +(parseInt(h.slice(5, 7), 16) / 255).toFixed(5),
    a: 1,
  }
}

/** Cria um valor de alias (referência a outra variable) */
function alias(tempId) {
  return { type: 'VARIABLE_ALIAS', id: tempId }
}

// ── IDs temporários das coleções e modos ──────────────────────────────────
// O Figma resolve os IDs "temp:..." em IDs reais após o request

const COL = {
  base:    { id: 'temp:col_base',    modeId: 'temp:mode_base',    name: 'Base'    },
  brand_a: { id: 'temp:col_brand_a', modeId: 'temp:mode_brand_a', name: 'Brand A' },
  brand_b: { id: 'temp:col_brand_b', modeId: 'temp:mode_brand_b', name: 'Brand B' },
}

// ── Tokens primitivos (Base) ──────────────────────────────────────────────

const baseTokens = [
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

  // Indigo
  { id: 'temp:i50',  name: 'color/indigo/50',  type: 'COLOR', value: hex('#eef2ff') },
  { id: 'temp:i100', name: 'color/indigo/100', type: 'COLOR', value: hex('#e0e7ff') },
  { id: 'temp:i400', name: 'color/indigo/400', type: 'COLOR', value: hex('#818cf8') },
  { id: 'temp:i500', name: 'color/indigo/500', type: 'COLOR', value: hex('#6366f1') },
  { id: 'temp:i600', name: 'color/indigo/600', type: 'COLOR', value: hex('#4f46e5') },
  { id: 'temp:i700', name: 'color/indigo/700', type: 'COLOR', value: hex('#4338ca') },

  // Rose
  { id: 'temp:r50',  name: 'color/rose/50',  type: 'COLOR', value: hex('#fff1f2') },
  { id: 'temp:r100', name: 'color/rose/100', type: 'COLOR', value: hex('#ffe4e6') },
  { id: 'temp:r400', name: 'color/rose/400', type: 'COLOR', value: hex('#fb7185') },
  { id: 'temp:r500', name: 'color/rose/500', type: 'COLOR', value: hex('#f43f5e') },
  { id: 'temp:r600', name: 'color/rose/600', type: 'COLOR', value: hex('#e11d48') },
  { id: 'temp:r700', name: 'color/rose/700', type: 'COLOR', value: hex('#be123c') },

  // Feedback
  { id: 'temp:green', name: 'color/green/500', type: 'COLOR', value: hex('#22c55e') },
  { id: 'temp:amber', name: 'color/amber/500', type: 'COLOR', value: hex('#f59e0b') },
  { id: 'temp:red',   name: 'color/red/500',   type: 'COLOR', value: hex('#ef4444') },
  { id: 'temp:blue',  name: 'color/blue/500',  type: 'COLOR', value: hex('#3b82f6') },

  // Espaçamento (valores em px sem a unidade)
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

  // Tipografia — famílias
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

// ── Tokens semânticos Brand A (Indigo) ────────────────────────────────────

const brandATokens = [
  { name: 'color/action/primary',              ref: 'temp:i500'  },
  { name: 'color/action/primary-hover',        ref: 'temp:i600'  },
  { name: 'color/action/primary-subtle',       ref: 'temp:i50'   },
  { name: 'color/action/primary-foreground',   ref: 'temp:n0'    },
  { name: 'color/action/secondary-foreground', ref: 'temp:i500'  },
  { name: 'color/background/default',          ref: 'temp:n0'    },
  { name: 'color/background/surface',          ref: 'temp:n50'   },
  { name: 'color/background/hover',            ref: 'temp:n100'  },
  { name: 'color/text/primary',                ref: 'temp:n900'  },
  { name: 'color/text/secondary',              ref: 'temp:n500'  },
  { name: 'color/text/inverse',                ref: 'temp:n0'    },
  { name: 'color/border/default',              ref: 'temp:n200'  },
  { name: 'color/feedback/success',            ref: 'temp:green' },
  { name: 'color/feedback/warning',            ref: 'temp:amber' },
  { name: 'color/feedback/error',              ref: 'temp:red'   },
  { name: 'color/feedback/info',               ref: 'temp:blue'  },
]

// ── Tokens semânticos Brand B (Rose) ──────────────────────────────────────

const brandBTokens = [
  { name: 'color/action/primary',              ref: 'temp:r500'  },  // ← diferente
  { name: 'color/action/primary-hover',        ref: 'temp:r600'  },  // ← diferente
  { name: 'color/action/primary-subtle',       ref: 'temp:r50'   },  // ← diferente
  { name: 'color/action/primary-foreground',   ref: 'temp:n0'    },
  { name: 'color/action/secondary-foreground', ref: 'temp:r500'  },  // ← diferente
  { name: 'color/background/default',          ref: 'temp:n0'    },
  { name: 'color/background/surface',          ref: 'temp:n50'   },
  { name: 'color/background/hover',            ref: 'temp:n100'  },
  { name: 'color/text/primary',                ref: 'temp:n900'  },
  { name: 'color/text/secondary',              ref: 'temp:n500'  },
  { name: 'color/text/inverse',                ref: 'temp:n0'    },
  { name: 'color/border/default',              ref: 'temp:n200'  },
  { name: 'color/feedback/success',            ref: 'temp:green' },
  { name: 'color/feedback/warning',            ref: 'temp:amber' },
  { name: 'color/feedback/error',              ref: 'temp:red'   },
  { name: 'color/feedback/info',               ref: 'temp:blue'  },
]

// ── Montar payload ─────────────────────────────────────────────────────────

const variableCollections = Object.values(COL).map(c => ({
  action: 'CREATE',
  id: c.id,
  name: c.name,
  initialModeId: c.modeId,
}))

const variables      = []
const variableValues = []

// Base
for (const t of baseTokens) {
  variables.push({
    action: 'CREATE',
    id: t.id,
    name: t.name,
    variableCollectionId: COL.base.id,
    resolvedType: t.type,
  })
  variableValues.push({
    variableId: t.id,
    modeId: COL.base.modeId,
    value: t.value,
  })
}

// Brand A
for (let i = 0; i < brandATokens.length; i++) {
  const t = brandATokens[i]
  const id = `temp:ba_${i}`
  variables.push({
    action: 'CREATE',
    id,
    name: t.name,
    variableCollectionId: COL.brand_a.id,
    resolvedType: 'COLOR',
  })
  variableValues.push({
    variableId: id,
    modeId: COL.brand_a.modeId,
    value: alias(t.ref),
  })
}

// Brand B
for (let i = 0; i < brandBTokens.length; i++) {
  const t = brandBTokens[i]
  const id = `temp:bb_${i}`
  variables.push({
    action: 'CREATE',
    id,
    name: t.name,
    variableCollectionId: COL.brand_b.id,
    resolvedType: 'COLOR',
  })
  variableValues.push({
    variableId: id,
    modeId: COL.brand_b.modeId,
    value: alias(t.ref),
  })
}

// ── Enviar para o Figma ────────────────────────────────────────────────────

const totalVars = variables.length
console.log(`🎨 Criando ${totalVars} variables em 3 coleções no Figma...`)
console.log(`   Base: ${baseTokens.length} | Brand A: ${brandATokens.length} | Brand B: ${brandBTokens.length}`)

const res = await fetch(`https://api.figma.com/v1/files/${FILE_KEY}/variables`, {
  method: 'POST',
  headers: {
    'X-Figma-Token': TOKEN,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ variableCollections, variables, variableValues }),
})

const result = await res.json()

if (!res.ok || result.error) {
  console.error('\n❌ Erro da API Figma:')
  console.error(JSON.stringify(result, null, 2))
  process.exit(1)
}

console.log('\n✅ Variables criadas com sucesso!')
console.log('   Abra o Figma → Assets (ícone de 4 quadrados) → Local Variables')
console.log('   Você verá as coleções: Base, Brand A, Brand B\n')
