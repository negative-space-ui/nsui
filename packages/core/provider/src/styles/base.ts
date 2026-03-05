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
    transition: `opacity ${global.motionDurations.fade}ms ease-in-out`
  })

  injectStyle(`.${global.prefixCls}-fade[data-visible="false"]`, {
    opacity: 0
  })

  injectStyle(`.${global.prefixCls}-fade[data-visible="true"]`, {
    opacity: 1
  })

  injectStyle(`.${global.prefixCls}-fade-scale`, {
    transitionProperty: 'opacity, transform',
    transitionDuration: `${global.motionDurations.fadeScale}ms`,
    transitionTimingFunction: 'ease-in-out'
  })

  injectStyle(`.${global.prefixCls}-fade-scale[data-visible="false"]`, {
    transform: 'scale(0)',
    opacity: 0
  })

  injectStyle(`.${global.prefixCls}-fade-scale[data-visible="true"]`, {
    transform: 'scale(1)',
    opacity: 1
  })

  injectStyle(`.${global.prefixCls}-pop`, {
    transformOrigin: 'center',
    transitionProperty: 'opacity, transform',
    transitionDuration: `${global.motionDurations.pop}ms`,
    transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
  })

  injectStyle(`.${global.prefixCls}-pop[data-visible="false"]`, {
    transform: 'scale(0)',
    opacity: 0
  })

  injectStyle(`.${global.prefixCls}-pop[data-visible="true"]`, {
    transform: 'scale(1)',
    opacity: 1
  })
}
