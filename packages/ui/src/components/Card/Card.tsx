import React from 'react'
import styles from './Card.module.css'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Conteúdo do card */
  children: React.ReactNode
  /** Adiciona sombra ao card */
  elevated?: boolean
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const Card = ({ children, elevated = false, className, ...props }: CardProps) => {
  const classes = [styles.card, elevated ? styles.elevated : '', className ?? '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export const CardHeader = ({ children, className, ...props }: CardHeaderProps) => (
  <div className={[styles.header, className ?? ''].filter(Boolean).join(' ')} {...props}>
    {children}
  </div>
)

export const CardBody = ({ children, className, ...props }: CardBodyProps) => (
  <div className={[styles.body, className ?? ''].filter(Boolean).join(' ')} {...props}>
    {children}
  </div>
)

export const CardFooter = ({ children, className, ...props }: CardFooterProps) => (
  <div className={[styles.footer, className ?? ''].filter(Boolean).join(' ')} {...props}>
    {children}
  </div>
)

Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardBody.displayName = 'CardBody'
CardFooter.displayName = 'CardFooter'
