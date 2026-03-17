import { createContext } from 'react'

import type { ResolvedMode, ThemeMode } from './types'

export interface ThemeContextValue {
  mode: ThemeMode
  resolvedMode: ResolvedMode
  toggleTheme: () => void
  toggleLightDark: () => void
  setTheme: (theme: ThemeMode) => void
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)
