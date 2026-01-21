import { injectStyle } from '@negative-space/inject-css'
import type { GlobalConfigRequired } from '../../../types'

export const buttonStyles = (global: GlobalConfigRequired) => {
  injectStyle(`.${global.prefixCls}-btn`, {
    overflow: 'hidden',
    padding: '0.5rem',
    cursor: 'pointer',
    '&[data-disabled="true"]': { cursor: 'not-allowed' },
    transitionProperty: 'background-color, color, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${global.motionDurations.color}ms, ${global.motionDurations.color}ms, ${global.motionDurations.scale}ms`
  })
}
