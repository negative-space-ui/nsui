import { injectKeyframes, injectStyle } from '@negative-space/inject-css'

import type { SpinnerSettings } from '../../types/components'
import type { GlobalSettings } from '../../types/global'

export const spin = (global: Required<GlobalSettings>, spinner: SpinnerSettings) => {
  injectKeyframes(`${global.prefixCls}-spin`, {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  })

  injectStyle(`.${global.prefixCls}-spinner`, {
    borderRadius: '50%',
    animation: `${global.prefixCls}-spin ${spinner.animationDuration}s infinite linear`
  })
}
