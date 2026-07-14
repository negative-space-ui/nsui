import { createContext } from 'react'

import type { ComponentSettings } from './types/components'
import type { GlobalSettings } from './types/global'

export type NSUIContextProps = {
  components: Required<ComponentSettings>
  global: Required<GlobalSettings>
}

export const NSUIContext = createContext<NSUIContextProps | undefined>(undefined)
