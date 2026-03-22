import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  // Gera documentação automática com a aba "Docs"
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'Estilo visual do botão',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do botão',
    },
    isLoading: {
      control: 'boolean',
      description: 'Exibe spinner e bloqueia interação',
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ── Stories individuais ────────────────────────────────────────────────────

export const Primary: Story = {
  args: {
    children: 'Confirmar',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Cancelar',
    variant: 'secondary',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Ver mais',
    variant: 'ghost',
  },
}

// ── Showcase de tamanhos ───────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Tamanhos',
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button size="sm">Pequeno</Button>
      <Button size="md">Médio</Button>
      <Button size="lg">Grande</Button>
    </div>
  ),
}

// ── Showcase de variantes ──────────────────────────────────────────────────

export const Variants: Story = {
  name: 'Variantes',
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
}

// ── Estados ────────────────────────────────────────────────────────────────

export const Loading: Story = {
  name: 'Carregando',
  args: {
    children: 'Salvando...',
    isLoading: true,
  },
}

export const Disabled: Story = {
  name: 'Desabilitado',
  args: {
    children: 'Indisponível',
    disabled: true,
  },
}
