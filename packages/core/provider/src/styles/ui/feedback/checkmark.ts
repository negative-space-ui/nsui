import { injectStyle } from '@negative-space/inject-css'
import type { GlobalConfigRequired } from '../../../types'

export const checkmarkStyles = (global: GlobalConfigRequired) =>
  injectStyle(`.${global.prefixCls}-checkmark`, {
    width: '1rem',
    height: '1rem',
    display: 'block',
    strokeWidth: 2,
    transitionProperty: 'color, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${global.motionDurations.color}ms, ${global.motionDurations.scale}ms`
  })
