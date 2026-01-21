import { injectKeyframes } from '@negative-space/inject-css'
import type { GlobalConfigRequired } from '../../types'

export const spinKeyframes = (global: GlobalConfigRequired) => {
  injectKeyframes(`${global.prefixCls}-spin`, {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  })
}
