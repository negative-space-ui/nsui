import { injectStyle } from '@negative-space/inject-css'
import { GlobalConfig, RadioConfig } from '@negative-space/types'

export const radioStyle = (config: GlobalConfig, radio: RadioConfig) => {
  injectStyle(`.${config.prefixCls}-radio`, {
    cursor: 'pointer',
    '&[data-disabled="true"]': { cursor: 'not-allowed' },
    accentColor: radio.accentColor!,
    transitionProperty: 'color, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${config.colorTransitionDuration}ms, ${config.scaleTransitionDuration}ms`
  })

  injectStyle(`.${config.prefixCls}-radio-label`, {
    cursor: 'pointer',
    '&[data-disabled="true"]': { cursor: 'not-allowed' },
    userSelect: 'none',
    transitionProperty: 'color, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${config.colorTransitionDuration}ms, ${config.scaleTransitionDuration}ms`
  })
}
