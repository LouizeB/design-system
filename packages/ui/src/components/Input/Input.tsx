import React from 'react'
import styles from './Input.module.css'

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Tamanho do input */
  size?: InputSize
  /** Label exibida acima do input */
  label?: string
  /** Texto de ajuda abaixo do input */
  helperText?: string
  /** Mensagem de erro (ativa estilo de erro) */
  error?: string
  /** Desabilita o input */
  disabled?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      label,
      helperText,
      error,
      disabled,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? `input-${React.useId()}`

    const inputClasses = [
      styles.input,
      styles[size],
      error ? styles.error : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {error && (
          <span id={`${inputId}-error`} className={styles.errorText} role="alert">
            {error}
          </span>
        )}
        {!error && helperText && (
          <span id={`${inputId}-helper`} className={styles.helperText}>
            {helperText}
          </span>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
