import { createContext, useContext } from 'react'

import type { ComponentsConfigRequired } from './types/components'
import type { GlobalConfigRequired } from './types/global'

export type NSUIContextProps = {
  components: ComponentsConfigRequired
  global: GlobalConfigRequired
}

export const NSUIContext = createContext<NSUIContextProps | undefined>(undefined)

export const useNSUI = () => {
  const context = useContext(NSUIContext)
  if (!context) {
    throw new Error(
      'useNSUI must be used within an NSUIProvider. Wrap your app with <NSUIProvider />'
    )
  }
  return context
}
