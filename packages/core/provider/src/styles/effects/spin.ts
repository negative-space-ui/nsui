import { injectKeyframes, injectStyle } from '@negative-space/inject-css'
import type { GlobalConfigRequired, SpinnerConfig } from '../../types'

export const spinKeyframes = (global: GlobalConfigRequired, spinner: SpinnerConfig) => {
  injectKeyframes(`${global.prefixCls}-spin`, {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  })

  injectStyle(`.${global.prefixCls}-spinner`, {
    borderRadius: '50%',
    animation: `${global.prefixCls}-spin ${spinner.animationDuration}s infinite linear`
  })
}
