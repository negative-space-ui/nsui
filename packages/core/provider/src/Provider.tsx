import { ReactNode, createElement } from 'react'
import { NSUIContext, type NSUIContextProps } from './ProviderContext'

export type NSUIProviderProps = {
  children: ReactNode
  config?: {
    /** Duration in milliseconds for transitions and animations of all components. */
    transitionDuration?: number
  }
}

/** NSUIProvider wraps your app and provides global configuration for the NSUI components library. */
export const NSUIProvider = ({ children, config }: NSUIProviderProps) => {
  const contextValue: NSUIContextProps = { transitionDuration: config?.transitionDuration ?? 300 }

  return createElement(NSUIContext.Provider, { value: contextValue }, children)
}
