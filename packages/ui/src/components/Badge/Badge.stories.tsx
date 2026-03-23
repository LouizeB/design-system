import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
      description: 'Variante visual do badge',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Rascunho',
    variant: 'default',
  },
}

export const Success: Story = {
  args: {
    children: 'Ativo',
    variant: 'success',
  },
}

export const Warning: Story = {
  args: {
    children: 'Pendente',
    variant: 'warning',
  },
}

export const Error: Story = {
  args: {
    children: 'Erro',
    variant: 'error',
  },
}

export const Info: Story = {
  args: {
    children: 'Novo',
    variant: 'info',
  },
}

export const AllVariants: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge variant="default">Rascunho</Badge>
      <Badge variant="success">Ativo</Badge>
      <Badge variant="warning">Pendente</Badge>
      <Badge variant="error">Erro</Badge>
      <Badge variant="info">Novo</Badge>
    </div>
  ),
}
