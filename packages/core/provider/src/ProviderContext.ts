import { createContext, useContext } from 'react'
import type {
  AnimationsConfigRequired,
  ComponentsConfigRequired,
  GlobalConfigRequired
} from '@negative-space/types'

export type NSUIContextProps = {
  animations: AnimationsConfigRequired
  components: ComponentsConfigRequired
  global: GlobalConfigRequired
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
