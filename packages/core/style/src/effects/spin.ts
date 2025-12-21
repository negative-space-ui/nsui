import { injectKeyframes } from '@negative-space/core/utils/inject-css'
import type { GlobalConfig } from '@negative-space/types'

export const spinKeyframes = (global: GlobalConfig) => {
  injectKeyframes(`${global.prefixCls}-spin`, {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  })
}
