import { ReactNode, createElement } from 'react'
import { NSUIContext, type NSUIContextProps } from './ProviderContext'
import type { GlobalConfig, NSUIComponentsConfig } from './types'

export type NSUIProviderProps = {
  children: ReactNode
  global?: GlobalConfig
  components?: NSUIComponentsConfig
}

/** NSUIProvider wraps your app and provides global configuration for the NSUI components library. */
export const NSUIProvider = ({ children, global, components }: NSUIProviderProps) => {
  const contextValue: NSUIContextProps = {
    global: {
      prefixCls: global?.prefixCls ?? 'nsui',
      colorTransitionDuration: global?.colorTransitionDuration ?? 300,
      scaleTransitionDuration: global?.scaleTransitionDuration ?? 300
    },
    components: {
      button: {
        isRippleDisabled: components?.button?.isRippleDisabled ?? false
      },
      spinner: {
        animationDuration: components?.spinner?.animationDuration ?? 1.2
      }
    }
  }

  return createElement(NSUIContext.Provider, { value: contextValue }, children)
}
