import { injectKeyframes, injectStyle } from '@negative-space/core/utils/inject-css'
import type { GlobalConfig } from '@negative-space/types'

export const rippleKeyframe = (global: GlobalConfig) => {
  injectKeyframes(`${global.prefixCls}-ripple`, {
    to: {
      transform: 'scale(2)',
      opacity: 0
    }
  })
}

export const rippleStyle = (global: GlobalConfig) => {
  injectStyle(`.${global.prefixCls}-ripple`, {
    position: 'absolute',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'scale(0)',
    animation: `${global.prefixCls}-ripple 600ms ease-out`,
    pointerEvents: 'none',
    zIndex: 1
  })
}
