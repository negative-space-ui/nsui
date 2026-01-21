import { injectStyle } from '@negative-space/inject-css'
import type { GlobalConfigRequired } from '../../../types'

export const dividerStyles = (global: GlobalConfigRequired) => {
  injectStyle(`.${global.prefixCls}-divider`, {
    transitionProperty: 'color, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${global.motionDurations.color}ms, ${global.motionDurations.scale}ms`
  })
}
