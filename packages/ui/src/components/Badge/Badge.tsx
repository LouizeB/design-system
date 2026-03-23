import React from 'react'
import styles from './Badge.module.css'

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info'

export interface BadgeProps {
  /** Variante visual do badge */
  variant?: BadgeVariant
  /** Conteúdo do badge */
  children: React.ReactNode
  className?: string
}

export const Badge = ({
  variant = 'default',
  children,
  className,
}: BadgeProps) => {
  const classes = [
    styles.badge,
    styles[variant],
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return <span className={classes}>{children}</span>
}

Badge.displayName = 'Badge'
