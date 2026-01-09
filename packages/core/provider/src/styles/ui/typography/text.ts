import { injectStyle } from '@negative-space/inject-css'
import { GlobalConfig } from '../../../types'

export const textStyles = (global: GlobalConfig) => {
  injectStyle(`.${global.prefixCls}-text`, {
    transitionProperty: 'color, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${global.colorTransitionDuration}ms, ${global.scaleTransitionDuration}ms`
  })
}
