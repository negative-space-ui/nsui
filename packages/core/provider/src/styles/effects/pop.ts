import { injectKeyframes, injectStyle } from '@negative-space/inject-css'
import type { GlobalConfigRequired } from '../../types'

export const popKeyframe = (global: GlobalConfigRequired) => {
  injectKeyframes(`${global.prefixCls}-pop`, {
    '0%': { transform: 'scale(0)' },
    '70%': { transform: 'scale(1.2)' },
    '100%': { transform: 'scale(1)' }
  })
}

export const popStyle = (global: GlobalConfigRequired) => {
  injectStyle(`.${global.prefixCls}-pop`, {
    animation: `${global.prefixCls}-pop ${global.motionDurations.pop}ms forwards ease-in-out`,
    transform: 'scale(0)'
  })
}
