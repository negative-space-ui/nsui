import { ReactNode, createElement } from 'react'
import { NSUIContext, type NSUIContextProps } from './ProviderContext'
import type { GlobalConfig, ComponentsConfig } from '@negative-space/types'
import { styles } from '@negative-space/style'

export type NSUIProviderProps = {
  children: ReactNode
  global?: GlobalConfig
  components?: ComponentsConfig
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
        accentColor: components?.radio?.accentColor ?? 'black',
        direction: components?.radio?.direction ?? 'vertical'
      },
      spinner: {
        animationDuration: components?.spinner?.animationDuration ?? 1.2
      },
      text: {
        typeElement: components?.text?.typeElement ?? 'span'
      }
    }
  }

  styles(contextValue.global, contextValue.components)

  return createElement(NSUIContext.Provider, { value: contextValue }, children)
}
