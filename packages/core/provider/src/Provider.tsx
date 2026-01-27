import { ReactNode, createElement } from 'react'
import { NSUIContext, type NSUIContextProps } from './ProviderContext'
import type { ComponentsConfig, GlobalConfig } from './types'
import { styles } from './styles'

export type NSUIProviderProps = {
  children: ReactNode
  components?: ComponentsConfig
  global?: GlobalConfig
}

/** NSUIProvider wraps your app and provides global configuration for the NSUI components library. */
export const NSUIProvider = ({ children, components, global }: NSUIProviderProps) => {
  const contextValue: NSUIContextProps = {
    global: {
      motionDurations: {
        fade: global?.motionDurations?.fade ?? 300,
        pop: global?.motionDurations?.pop ?? 600,
        ripple: global?.motionDurations?.ripple ?? 600
      },
      prefixCls: global?.prefixCls ?? 'nsui'
    },
    components: {
      button: {
        isRippleDisabled: components?.button?.isRippleDisabled ?? false
      },
      checkbox: {
        isPopDisabled: components?.checkbox?.isPopDisabled ?? false
      },
      checkmark: {
        isPopDisabled: components?.checkmark?.isPopDisabled ?? false
      },
      heading: {
        typeElement: components?.heading?.typeElement ?? 'h1'
      },
      link: {
        underline: components?.link?.underline ?? false
      },
      list: {
        typeElement: components?.list?.typeElement ?? 'ol',
        olMarker: components?.list?.olMarker ?? 'none',
        ulMarker: components?.list?.ulMarker ?? 'none'
      },
      radio: {
        isPopDisabled: components?.radio?.isPopDisabled ?? false
      },
      spinner: {
        animationDuration: components?.spinner?.animationDuration ?? 1.2
      },
      text: {
        typeElement: components?.text?.typeElement ?? 'span'
      }
    }
  }

  styles(contextValue.components, contextValue.global)

  return createElement(NSUIContext.Provider, { value: contextValue }, children)
}
