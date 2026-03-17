import type { ThemeMode } from './types'

export interface ThemeStorage {
  get: () => ThemeMode | null
  set: (theme: ThemeMode) => void
}
