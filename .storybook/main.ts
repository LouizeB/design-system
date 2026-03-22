import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  // Busca stories em todos os componentes do pacote @ds/ui
  stories: ['../packages/ui/src/**/*.stories.@(ts|tsx)'],

  addons: [
    '@storybook/addon-essentials',   // docs, controls, actions, viewport
    '@storybook/addon-a11y',          // auditoria de acessibilidade por story
    '@storybook/addon-interactions',  // testes de interação
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  docs: {
    // Gera documentação automática para components com tag 'autodocs'
    autodocs: 'tag',
  },
}

export default config
