import { injectStyle } from '@negative-space/inject-css'
import type { GlobalConfigRequired } from '../types'

export const baseStyle = (global: GlobalConfigRequired) => {
  injectStyle(`.${global.prefixCls}-clickable`, {
    cursor: 'pointer',
    '&[data-disabled="true"]': { cursor: 'not-allowed' }
  })

  injectStyle(`.${global.prefixCls}-underline`, {
    textDecoration: 'underline',
    textUnderlineOffset: '0.156em'
  })

  injectStyle(`.${global.prefixCls}-fade`, {
    opacity: 0,
    '&[data-visible="true"]': { opacity: 1 },
    transitionProperty: 'opacity',
    transitionTimingFunction: `ease-in-out`,
    transitionDuration: `${global.motionDurations.fade}ms`
  })
}
