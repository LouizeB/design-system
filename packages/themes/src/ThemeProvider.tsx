import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

/** Supported brand identifiers — maps to data-brand attribute and CSS token files */
export type Brand = 'brand-a' | 'brand-b' | 'brand-c' | 'brand-d' | 'wireframe'

export interface ThemeContextValue {
  /** Current active brand */
  brand: Brand
  /** Switch to a different brand at runtime */
  setBrand: (brand: Brand) => void
  /** Toggle between brand-a and brand-b */
  toggleBrand: () => void
}

export interface ThemeProviderProps {
  /** Initial brand to use (default: 'brand-a') */
  defaultBrand?: Brand
  /** Persist brand selection to localStorage (default: true) */
  persist?: boolean
  /** localStorage key for persistence (default: 'ds-brand') */
  storageKey?: string
  children: React.ReactNode
}

const STORAGE_KEY_DEFAULT = 'ds-brand'
const BRANDS: Brand[] = ['brand-a', 'brand-b', 'brand-c', 'brand-d', 'wireframe']

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getInitialBrand(storageKey: string, fallback: Brand): Brand {
  if (typeof window === 'undefined') return fallback
  try {
    const stored = localStorage.getItem(storageKey)
    if (stored && BRANDS.includes(stored as Brand)) return stored as Brand
  } catch {
    // localStorage not available (SSR, privacy mode, etc.)
  }
  return fallback
}

export const ThemeProvider = ({
  defaultBrand = 'brand-a',
  persist = true,
  storageKey = STORAGE_KEY_DEFAULT,
  children,
}: ThemeProviderProps) => {
  const [brand, setBrandState] = useState<Brand>(() =>
    persist ? getInitialBrand(storageKey, defaultBrand) : defaultBrand,
  )

  const setBrand = useCallback(
    (next: Brand) => {
      setBrandState(next)
      if (persist) {
        try {
          localStorage.setItem(storageKey, next)
        } catch {
          // ignore
        }
      }
    },
    [persist, storageKey],
  )

  const toggleBrand = useCallback(() => {
    const idx = BRANDS.indexOf(brand)
    const next = BRANDS[(idx + 1) % BRANDS.length]
    setBrand(next)
  }, [brand, setBrand])

  // Sync data-brand attribute on <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-brand', brand)
  }, [brand])

  const value = useMemo<ThemeContextValue>(
    () => ({ brand, setBrand, toggleBrand }),
    [brand, setBrand, toggleBrand],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

ThemeProvider.displayName = 'ThemeProvider'

/**
 * Access the current theme context.
 * Must be used within a <ThemeProvider>.
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within a <ThemeProvider>')
  }
  return ctx
}
