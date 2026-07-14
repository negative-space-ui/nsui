import { createElement, ReactNode } from 'react'

import { NSUIContext, type NSUIContextProps } from './ProviderContext'
import { styles } from './styles'
import type { ComponentSettings } from './types/components'
import type { GlobalSettings } from './types/global'

export type NSUIProviderProps = {
  children: ReactNode
  components?: ComponentSettings
  global?: GlobalSettings
}

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
      alert: {
        closable: components?.alert?.closable ?? true,
        closeTitle: components?.alert?.closeTitle ?? 'Close'
      },
      button: {
        animation: components?.button?.animation ?? 'ripple'
      },
      iconButton: {
        animation: components?.iconButton?.animation ?? 'none'
      },
      closeButton: {
        animation: components?.closeButton?.animation ?? 'none'
      },
      checkmark: {
        animation: components?.checkmark?.animation ?? 'pop'
      },
      form: {
        disableSubmitOnError: components?.form?.disableSubmitOnError ?? false,
        validationDelay: components?.form?.validationDelay ?? 0,
        validationMode: components?.form?.validationMode ?? 'onBlur'
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
      modal: {
        closeTitle: components?.modal?.closeTitle ?? 'Close'
      },
      popover: {
        animation: components?.popover?.animation ?? 'fade-scale'
      },
      radio: {
        animation: components?.radio?.animation ?? 'pop'
      },
      select: {
        animation: components?.select?.animation ?? 'none'
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
