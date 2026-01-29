import { createContext } from 'react'
import type { useRovingFocus } from '@negative-space/roving-focus'

export interface RadioContextValue {
  name: string
  disabled?: boolean
  selectedValue?: string
  onChange?: (value: string) => void
  roving: ReturnType<typeof useRovingFocus>
}

export const RadioContext = createContext<RadioContextValue | null>(null)
