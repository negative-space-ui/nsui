import { injectStyle } from '@negative-space/inject-css'
import type { GlobalConfigRequired } from '../../../types'

export function linkStyle(config: GlobalConfigRequired) {
  injectStyle(`.${config.prefixCls}-link`, {
    cursor: 'pointer',
    '&[data-disabled="true"]': { cursor: 'not-allowed' },
    transitionProperty: 'color, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${config.motionDurations.color}ms, ${config.motionDurations.scale}ms`
  })

  injectStyle(`.${config.prefixCls}-link-underline`, {
    textDecoration: 'underline',
    textUnderlineOffset: '0.156em'
  })
}
