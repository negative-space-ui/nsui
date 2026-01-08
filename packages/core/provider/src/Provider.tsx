import { ReactNode, createElement } from 'react'
import { NSUIContext, type NSUIContextProps } from './ProviderContext'
import type { AnimationsConfig, ComponentsConfig, GlobalConfig } from './types'
import { styles } from './styles'

export type NSUIProviderProps = {
  children: ReactNode
  animations?: AnimationsConfig
  components?: ComponentsConfig
  global?: GlobalConfig
}

/** NSUIProvider wraps your app and provides global configuration for the NSUI components library. */
export const NSUIProvider = ({ children, animations, components, global }: NSUIProviderProps) => {
  const contextValue: NSUIContextProps = {
    global: {
      prefixCls: global?.prefixCls ?? 'nsui',
      colorTransitionDuration: global?.colorTransitionDuration ?? 300,
      scaleTransitionDuration: global?.scaleTransitionDuration ?? 300
    },
    animations: {
      popDuration: animations?.popDuration ?? 600,
      rippleDuration: animations?.rippleDuration ?? 600
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
      flex: {
        typeElement: components?.flex?.typeElement ?? 'div',
        direction: components?.flex?.direction ?? 'row',
        wrap: components?.flex?.wrap ?? 'nowrap',
        alignItems: components?.flex?.alignItems ?? 'start',
        justify: components?.flex?.justify ?? 'start'
      },
      grid: {
        typeElement: components?.grid?.typeElement ?? 'div',
        alignItems: components?.grid?.alignItems ?? 'start',
        justifyItems: components?.grid?.justifyItems ?? 'start',
        alignContent: components?.grid?.alignContent ?? 'start',
        justifyContent: components?.grid?.justifyContent ?? 'start'
      },
      heading: {
        typeElement: components?.heading?.typeElement ?? 'h1'
      },
      link: {
        underline: components?.link?.underline ?? false
      },
      list: {
        direction: components?.list?.direction ?? 'vertical',
        typeElement: components?.list?.typeElement ?? 'ol',
        olMarker: components?.list?.olMarker ?? 'none',
        ulMarker: components?.list?.ulMarker ?? 'none'
      },
      radio: {
        direction: components?.radio?.direction ?? 'vertical',
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

  styles(contextValue.animations, contextValue.components, contextValue.global)

  return createElement(NSUIContext.Provider, { value: contextValue }, children)
}
