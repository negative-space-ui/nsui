import React, { useEffect, useState } from 'react'

import type { ThemeStorage } from './storage'
import { ThemeContext } from './themeContext'
import type { ResolvedMode, ThemeMode } from './types'

export interface ThemeProviderProps {
  children: React.ReactNode
  storage?: ThemeStorage
  forcedTheme?: ResolvedMode
}

function getSystemResolved(): ResolvedMode {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function resolveMode(theme: ThemeMode): ResolvedMode {
  return theme === 'system' ? getSystemResolved() : theme
}

function applyThemeToDom(resolved: ResolvedMode) {
  document.documentElement.classList.toggle('dark', resolved === 'dark')
}

export function ThemeProvider({ children, storage, forcedTheme }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>('system')
  const [resolvedMode, setResolvedMode] = useState<ResolvedMode>('light')
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const initial: ThemeMode = forcedTheme ?? storage?.get() ?? 'system'
    const resolved: ResolvedMode = forcedTheme ?? resolveMode(initial)

    setMode(initial)
    setResolvedMode(resolved)
    applyThemeToDom(resolved)
    setHydrated(true)
  }, [forcedTheme, storage])

  const updateTheme = (theme: ThemeMode) => {
    if (forcedTheme) return

    const resolved = resolveMode(theme)

    setMode(theme)
    setResolvedMode(resolved)
    applyThemeToDom(resolved)
    storage?.set(theme)
  }

  const toggleTheme = () => {
    const next: ThemeMode = mode === 'light' ? 'dark' : mode === 'dark' ? 'system' : 'light'
    updateTheme(next)
  }

  const toggleLightDark = () => {
    updateTheme(resolvedMode === 'dark' ? 'light' : 'dark')
  }

  if (!hydrated) return null

  return (
    <ThemeContext.Provider
      value={{ mode, resolvedMode, toggleTheme, toggleLightDark, setTheme: updateTheme }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
