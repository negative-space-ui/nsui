import { createContext, useContext } from 'react'

export type NSUIContextProps = {
  transitionDuration: number
}

export const NSUIContext = createContext<NSUIContextProps | undefined>(undefined)

export const useNSUI = () => {
  const context = useContext(NSUIContext)
  if (!context) {
    throw new Error('useNSUI must be used within a NSUIProvider')
  }
  return context
}
