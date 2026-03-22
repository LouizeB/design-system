#!/usr/bin/env node
/**
 * sync-figma-tokens.mjs
 *
 * Puxa Figma Variables da API REST e converte para o formato
 * W3C Design Tokens (DTCG) que o Style Dictionary v4 entende.
 *
 * Uso:
 *   1. Copie .env.example para .env e preencha as variáveis
 *   2. Execute: pnpm sync-figma
 *
 * O arquivo gerado é salvo em:
 *   packages/tokens/src/figma-variables.json
 *
 * Depois o Style Dictionary é rodado automaticamente pelo script
 * "sync-figma" no package.json raiz.
 *
 * Convenção de nomes no Figma:
 *   Use "/" como separador de path nos nomes das variables.
 *   Ex: "color/brand/primary" → token { color: { brand: { primary: ... } } }
 */

import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

// ── Config ──────────────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url))

// Carrega .env manualmente (sem dependências externas)
try {
  const { readFileSync } = await import('fs')
  const env = readFileSync(join(__dirname, '../.env'), 'utf-8')
  for (const line of env.split('\n')) {
    const [key, ...rest] = line.split('=')
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim()
  }
} catch {
  // .env não encontrado — usa variáveis de ambiente do sistema
}

const { FIGMA_FILE_KEY, FIGMA_ACCESS_TOKEN } = process.env

if (!FIGMA_FILE_KEY || !FIGMA_ACCESS_TOKEN) {
  console.error('❌  Faltam as variáveis FIGMA_FILE_KEY e FIGMA_ACCESS_TOKEN.')
  console.error('   Copie .env.example para .env e preencha os valores.')
  process.exit(1)
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function rgbToHex({ r, g, b }) {
  const toHex = (v) => Math.round(v * 255).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function rgbaToHex({ r, g, b, a }) {
  if (a === 1) return rgbToHex({ r, g, b })
  const toHex = (v) => Math.round(v * 255).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(a)}`
}

// Converte path "color/brand/primary" em objeto aninhado com o token no final
function setNestedValue(obj, pathStr, token) {
  const parts = pathStr.split('/').map((p) => p.toLowerCase().trim().replace(/\s+/g, '-'))
  let current = obj
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) current[parts[i]] = {}
    current = current[parts[i]]
  }
  current[parts[parts.length - 1]] = token
}

// ── Fetch Figma ──────────────────────────────────────────────────────────────

async function fetchVariables() {
  const url = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/variables/local`
  console.log('🔄  Buscando variables no Figma...')

  const res = await fetch(url, {
    headers: { 'X-Figma-Token': FIGMA_ACCESS_TOKEN },
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Figma API error ${res.status}: ${body}`)
  }

  return res.json()
}

// ── Transform ────────────────────────────────────────────────────────────────

function transform(data) {
  const { variables, variableCollections } = data.meta
  const tokens = {}

  for (const variable of Object.values(variables)) {
    const collection = variableCollections[variable.variableCollectionId]
    // Usa o modo padrão (primeiro modo) da coleção
    const defaultModeId = collection.defaultModeId
    const rawValue = variable.valuesByMode[defaultModeId]

    let value
    let type

    switch (variable.resolvedType) {
      case 'COLOR':
        value = rawValue.a !== undefined ? rgbaToHex(rawValue) : rgbToHex(rawValue)
        type = 'color'
        break
      case 'FLOAT':
        value = `${rawValue}px`
        type = 'dimension'
        break
      case 'STRING':
        value = rawValue
        type = 'string'
        break
      case 'BOOLEAN':
        value = rawValue
        type = 'other'
        break
      default:
        value = String(rawValue)
        type = 'other'
    }

    setNestedValue(tokens, variable.name, { $value: value, $type: type })
  }

  return tokens
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const data = await fetchVariables()
  const tokens = transform(data)

  const outputPath = join(__dirname, '../packages/tokens/src/figma-variables.json')
  writeFileSync(outputPath, JSON.stringify(tokens, null, 2))

  const count = Object.values(data.meta.variables).length
  console.log(`✅  ${count} variables sincronizadas → packages/tokens/src/figma-variables.json`)
  console.log('   Rodando Style Dictionary para rebuild dos tokens...')
}

main().catch((err) => {
  console.error('❌ ', err.message)
  process.exit(1)
})
