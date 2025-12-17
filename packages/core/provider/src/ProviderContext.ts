import { createContext, useContext } from 'react'
import type { GlobalConfigRequired, ComponentsConfigRequired } from '@negative-space/types'

export type NSUIContextProps = {
  global: GlobalConfigRequired
  components: ComponentsConfigRequired
}

export const NSUIContext = createContext<NSUIContextProps | undefined>(undefined)

/** Returns the NSUI context. Throws an error if used outside of NSUIProvider. */
export const useNSUI = () => {
  const context = useContext(NSUIContext)
  if (!context) {
    throw new Error('useNSUI must be used within a NSUIProvider')
  }
  return context
}
