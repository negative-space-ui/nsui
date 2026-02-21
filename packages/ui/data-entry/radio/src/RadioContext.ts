import { createContext } from 'react'

export interface RadioContextValue {
  name: string
  disabled?: boolean
  selectedValue?: string
  onChange?: (value: string) => void
}

export const RadioContext = createContext<RadioContextValue | null>(null)
