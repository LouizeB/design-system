import type { Preview, Decorator } from '@storybook/react'

/**
 * Tokens CSS são importados do dist/ já compilado.
 * Rode `pnpm build:tokens` antes de abrir o Storybook.
 *
 * base.css      → tokens primitivos (:root)
 * brand-a.css   → Brand A iFood (:root + [data-brand="brand-a"])
 * brand-b.css   → Brand B POS Verde ([data-brand="brand-b"])
 * brand-c.css   → Brand C POS Azul ([data-brand="brand-c"])
 * brand-d.css   → Brand D POS Roxo ([data-brand="brand-d"])
 * wireframe.css → Wireframe ([data-brand="wireframe"])
 */
import '../packages/tokens/dist/base.css'
import '../packages/tokens/dist/brand-a.css'
import '../packages/tokens/dist/brand-b.css'
import '../packages/tokens/dist/brand-c.css'
import '../packages/tokens/dist/brand-d.css'
import '../packages/tokens/dist/wireframe.css'
import '../packages/ui/src/styles/global.css'

// ── Brand switcher na toolbar ─────────────────────────────────────────────

export const globalTypes = {
  brand: {
    name: 'Marca',
    description: 'Trocar entre as marcas do design system',
    defaultValue: 'brand-a',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'brand-a', title: 'Brand A (iFood)' },
        { value: 'brand-b', title: 'Brand B (POS Verde)' },
        { value: 'brand-c', title: 'Brand C (POS Azul)' },
        { value: 'brand-d', title: 'Brand D (POS Roxo)' },
        { value: 'wireframe', title: 'Wireframe' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
}

// ── Decorator: seta data-brand no <html> ao trocar na toolbar ─────────────

const withBrandTheme: Decorator = (StoryFn, context) => {
  const { brand } = context.globals
  document.documentElement.setAttribute('data-brand', brand)
  return StoryFn()
}

const preview: Preview = {
  decorators: [withBrandTheme],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
}

export default preview
