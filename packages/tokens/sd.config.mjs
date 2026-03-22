import StyleDictionary from 'style-dictionary'
import { readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * Estratégia multibrand:
 *
 * 1. base.css  → tokens primitivos (:root)
 *    Paleta de cores, espaçamento, tipografia.
 *    Igual para todas as marcas.
 *
 * 2. brand-a.css → tokens semânticos da Brand A (:root + [data-brand="brand-a"])
 *    brand-b.css → tokens semânticos da Brand B ([data-brand="brand-b"])
 *
 * Componentes usam apenas tokens semânticos:
 *    var(--ds-color-action-primary) ← muda por marca
 *    var(--ds-spacing-4)            ← sempre igual (base)
 *
 * Para trocar de marca:
 *    <html data-brand="brand-b">
 */

// ── 1. Build base tokens ──────────────────────────────────────────────────

const sdBase = new StyleDictionary({
  source: ['src/base/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'ds',
      buildPath: 'dist/',
      files: [
        {
          destination: 'base.css',
          format: 'css/variables',
          options: { selector: ':root', outputReferences: false },
        },
      ],
    },
  },
})

await sdBase.buildAllPlatforms()
console.log('✅  base.css gerado')

// ── 2. Build por marca ────────────────────────────────────────────────────

const BRANDS = readdirSync(join(__dirname, 'src/brands'))
const DEFAULT_BRAND = BRANDS[0] // primeira marca é o fallback padrão em :root

for (const brand of BRANDS) {
  // A primeira marca também serve como fallback (:root) para quem não setar data-brand
  const selector =
    brand === DEFAULT_BRAND
      ? `:root, [data-brand="${brand}"]`
      : `[data-brand="${brand}"]`

  const sd = new StyleDictionary({
    // Inclui base para resolver aliases ({color.indigo.500})
    // mas filtramos a saída para conter apenas os tokens da marca
    source: [
      'src/base/**/*.json',
      `src/brands/${brand}/**/*.json`,
    ],
    platforms: {
      css: {
        transformGroup: 'css',
        prefix: 'ds',
        buildPath: 'dist/',
        files: [
          {
            destination: `${brand}.css`,
            format: 'css/variables',
            // Só exporta tokens definidos nos arquivos da marca (não os primitivos de base)
            filter: (token) =>
              token.filePath.replace(/\\/g, '/').includes(`brands/${brand}`),
            options: { selector, outputReferences: false },
          },
        ],
      },
    },
  })

  await sd.buildAllPlatforms()
  console.log(`✅  ${brand}.css gerado (selector: "${selector}")`)
}

console.log('\n🎨 Tokens multibrand gerados em packages/tokens/dist/')
console.log('   Uso: <html data-brand="brand-a"> ou <html data-brand="brand-b">')
