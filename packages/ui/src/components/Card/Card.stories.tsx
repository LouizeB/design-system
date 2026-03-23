import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardBody, CardFooter } from './Card'
import { Button } from '../Button'
import { Badge } from '../Badge'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    elevated: {
      control: 'boolean',
      description: 'Adiciona sombra ao card',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Card {...args} style={{ width: '360px' }}>
      <CardHeader>Título do Card</CardHeader>
      <CardBody>
        Este é um card básico com header, body e footer. Ele utiliza tokens
        semânticos e muda de visual automaticamente ao trocar de marca.
      </CardBody>
      <CardFooter>
        <Button variant="ghost" size="sm">Cancelar</Button>
        <Button variant="primary" size="sm">Confirmar</Button>
      </CardFooter>
    </Card>
  ),
}

export const Elevated: Story = {
  name: 'Com sombra',
  render: () => (
    <Card elevated style={{ width: '360px' }}>
      <CardHeader>Card elevado</CardHeader>
      <CardBody>
        Cards com a prop <code>elevated</code> têm box-shadow para dar destaque.
      </CardBody>
    </Card>
  ),
}

export const WithBadge: Story = {
  name: 'Com Badge',
  render: () => (
    <Card style={{ width: '360px' }}>
      <CardHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Pedido #1234</span>
          <Badge variant="success">Ativo</Badge>
        </div>
      </CardHeader>
      <CardBody>
        Exemplo combinando Card com Badge para indicar status.
      </CardBody>
      <CardFooter>
        <Button variant="secondary" size="sm">Ver detalhes</Button>
      </CardFooter>
    </Card>
  ),
}

export const BodyOnly: Story = {
  name: 'Apenas body',
  render: () => (
    <Card style={{ width: '360px' }}>
      <CardBody>
        Card simples sem header ou footer. Útil para conteúdos independentes.
      </CardBody>
    </Card>
  ),
}
