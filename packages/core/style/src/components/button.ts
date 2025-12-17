import { injectStyle } from '@negative-space/inject-css'
import { GlobalConfig } from '@negative-space/core/types'

export const buttonStyles = (global: GlobalConfig) => {
  return {
    button: injectStyle(`${global.prefixCls}-btn`, {
      display: 'flex',
      position: 'relative',
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.5rem',
      gap: '0.5rem',
      cursor: 'pointer',
      '&[disabled]': { cursor: 'not-allowed' },
      transitionProperty: 'background-color, color, scale',
      transitionTimingFunction: 'ease-in-out',
      transitionDuration: `${global.colorTransitionDuration}ms, ${global.colorTransitionDuration}ms, ${global.scaleTransitionDuration}ms`
    }),

    buttonLeft: injectStyle(`${global.prefixCls}-btn-left`, {
      display: 'inline-flex',
      overflow: 'hidden',
      alignItems: 'center',
      flex: '1 1 0'
    }),

    buttonContent: injectStyle(`${global.prefixCls}-btn-content`, {
      display: 'inline-flex',
      overflow: 'hidden',
      alignItems: 'center',
      flex: '1 1 0'
    }),

    buttonRight: injectStyle(`${global.prefixCls}-btn-right`, {
      display: 'inline-flex',
      overflow: 'hidden',
      alignItems: 'center',
      flex: '1 1 0'
    })
  }
}
