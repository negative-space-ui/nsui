import { injectStyle } from '@negative-space/inject-css'
import type { GlobalConfigRequired } from '../../../types'

export const listboxStyle = (global: GlobalConfigRequired) => {
  injectStyle(`.${global.prefixCls}-listbox`, {
    '&[data-disabled="true"]': { cursor: 'not-allowed' },
    transitionProperty: 'color, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${global.motionDurations.color}ms, ${global.motionDurations.scale}ms`
  })

  injectStyle(`.${global.prefixCls}-listbox-option`, {
    cursor: 'pointer',
    padding: '0.3rem',
    '&[data-disabled="true"]': { cursor: 'not-allowed' },
    transitionProperty: 'color, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${global.motionDurations.color}ms, ${global.motionDurations.scale}ms`
  })
}
