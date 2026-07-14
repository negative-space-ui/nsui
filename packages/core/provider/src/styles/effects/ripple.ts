import { injectKeyframes, injectStyle } from '@negative-space/inject-css'

import type { GlobalSettings } from '../../types/global'

export const ripple = (global: Required<GlobalSettings>) => {
  injectKeyframes(`${global.prefixCls}-ripple`, {
    to: {
      transform: 'scale(2)',
      opacity: 0
    }
  })

  injectStyle(`.${global.prefixCls}-ripple`, {
    position: 'absolute',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'scale(0)',
    animation: `${global.prefixCls}-ripple ${global.motionDurations.ripple}ms ease-in-out`,
    pointerEvents: 'none',
    zIndex: 1
  })
}
