import React from 'react'

export type RadioContextValue = {
  name: string
  disabled?: boolean
  selectedValue?: string | number
  onChange?: (value: string | number) => void
}

export const RadioContext = React.createContext<RadioContextValue | null>(null)

export interface RadioProviderProps extends RadioContextValue {
  children: React.ReactNode
}

export const RadioProvider = ({ children, ...value }: RadioProviderProps) => {
  return <RadioContext.Provider value={value}>{children}</RadioContext.Provider>
}
