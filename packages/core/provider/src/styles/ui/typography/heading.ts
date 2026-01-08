import { injectStyle } from '@negative-space/inject-css'
import { GlobalConfig } from '@negative-space/types'

export const headingStyles = (global: GlobalConfig) => {
  injectStyle(`.${global.prefixCls}-heading`, {
    transitionProperty: 'color, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${global.colorTransitionDuration}ms, ${global.scaleTransitionDuration}ms`
  })
}
