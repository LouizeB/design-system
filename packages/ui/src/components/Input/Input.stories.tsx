import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do input',
    },
    label: {
      control: 'text',
      description: 'Label exibida acima do input',
    },
    helperText: {
      control: 'text',
      description: 'Texto de ajuda abaixo do input',
    },
    error: {
      control: 'text',
      description: 'Mensagem de erro',
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Digite algo...',
  },
}

export const WithLabel: Story = {
  name: 'Com label',
  args: {
    label: 'E-mail',
    placeholder: 'seu@email.com',
  },
}

export const WithHelper: Story = {
  name: 'Com texto de ajuda',
  args: {
    label: 'Senha',
    type: 'password',
    placeholder: '••••••••',
    helperText: 'Mínimo de 8 caracteres',
  },
}

export const WithError: Story = {
  name: 'Com erro',
  args: {
    label: 'E-mail',
    value: 'email-invalido',
    error: 'Formato de e-mail inválido',
  },
}

export const Sizes: Story = {
  name: 'Tamanhos',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input size="sm" placeholder="Pequeno" label="Small" />
      <Input size="md" placeholder="Médio" label="Medium" />
      <Input size="lg" placeholder="Grande" label="Large" />
    </div>
  ),
}

export const Disabled: Story = {
  name: 'Desabilitado',
  args: {
    label: 'Campo desabilitado',
    value: 'Não editável',
    disabled: true,
  },
}
