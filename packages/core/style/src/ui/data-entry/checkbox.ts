import { injectStyle } from '@negative-space/inject-css'
import { GlobalConfig } from '@negative-space/types'

export const checkboxStyle = (config: GlobalConfig) => {
  injectStyle(`.${config.prefixCls}-checkbox`, {
    cursor: 'pointer',
    '&[data-disabled="true"]': { cursor: 'not-allowed' },
    transitionProperty: 'background-color, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${config.colorTransitionDuration}ms, ${config.scaleTransitionDuration}ms`
  })

  injectStyle(`.${config.prefixCls}-checkbox-label`, {
    cursor: 'pointer',
    '&[data-disabled="true"]': { cursor: 'not-allowed' },
    userSelect: 'none',
    transitionProperty: 'color, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${config.colorTransitionDuration}ms, ${config.scaleTransitionDuration}ms`
  })
}
