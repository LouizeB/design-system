import type { Preview, Decorator } from '@storybook/react'

/**
 * Tokens CSS são importados do dist/ já compilado.
 * Rode `pnpm build:tokens` antes de abrir o Storybook.
 *
 * base.css   → tokens primitivos (:root)
 * brand-a.css → semânticos da Brand A (:root + [data-brand="brand-a"])
 * brand-b.css → semânticos da Brand B ([data-brand="brand-b"])
 */
import '../packages/tokens/dist/base.css'
import '../packages/tokens/dist/brand-a.css'
import '../packages/tokens/dist/brand-b.css'
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
        { value: 'brand-a', title: '🟣 Brand A (Indigo)' },
        { value: 'brand-b', title: '🌹 Brand B (Rose)' },
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
