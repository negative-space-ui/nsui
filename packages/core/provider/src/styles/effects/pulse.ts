import { injectKeyframes, injectStyle } from '@negative-space/inject-css'

import type { SkeletonSettings } from '../../types/components'
import type { GlobalSettings } from '../../types/global'

export const pulse = (global: Required<GlobalSettings>, skeleton: SkeletonSettings) => {
  injectKeyframes(`${global.prefixCls}-pulse`, {
    '0%, 100%': { opacity: 0.5 },
    '50%': { opacity: 1 }
  })

  injectStyle(`.${global.prefixCls}-pulse`, {
    animation: `${global.prefixCls}-pulse ${skeleton.animationDuration}s ease-in-out infinite`
  })
}
