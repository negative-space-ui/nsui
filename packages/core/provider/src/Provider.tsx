import { createElement,ReactNode } from 'react'

import { NSUIContext, type NSUIContextProps } from './ProviderContext'
import { styles } from './styles'
import type { ComponentsConfig, GlobalConfig } from './types'

export type NSUIProviderProps = {
  children: ReactNode
  components?: ComponentsConfig
  global?: GlobalConfig
}

/** NSUIProvider wraps your app and provides global configuration for the NSUI components library. */
export const NSUIProvider = ({ children, components, global }: NSUIProviderProps) => {
  const contextValue: NSUIContextProps = {
    global: {
      colors: global?.colors ?? { error: 'hsl(0, 85%, 55%)' },
      motionDurations: {
        fade: global?.motionDurations?.fade ?? 300,
        fadeScale: global?.motionDurations?.fadeScale ?? 400,
        pop: global?.motionDurations?.pop ?? 600,
        ripple: global?.motionDurations?.ripple ?? 600
      },
      prefixCls: global?.prefixCls ?? 'nsui',
      tooltip: global?.tooltip ?? true
    },
    components: {
      button: {
        animation: components?.button?.animation ?? 'ripple'
      },
      iconButton: {
        animation: components?.iconButton?.animation ?? 'ripple'
      },
      checkmark: {
        animation: components?.checkmark?.animation ?? 'pop'
      },
      heading: {
        typeElement: components?.heading?.typeElement ?? 'h1'
      },
      inputPassword: {
        textTitle: components?.inputPassword?.textTitle ?? 'Hide password',
        passwordTitle: components?.inputPassword?.passwordTitle ?? 'Show password'
      },
      link: {
        underline: components?.link?.underline ?? false
      },
      list: {
        typeElement: components?.list?.typeElement ?? 'ol',
        olMarker: components?.list?.olMarker ?? 'none',
        ulMarker: components?.list?.ulMarker ?? 'none'
      },
      popover: {
        animation: components?.popover?.animation ?? 'pop'
      },
      radio: {
        animation: components?.radio?.animation ?? 'pop'
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
