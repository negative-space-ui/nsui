import React from 'react'

export type ButtonContextValue = {
  disabled?: boolean
}

export const ButtonContext = React.createContext<ButtonContextValue | null>(null)
