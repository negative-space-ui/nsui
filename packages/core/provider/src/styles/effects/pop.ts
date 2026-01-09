import { injectKeyframes, injectStyle } from '@negative-space/inject-css'
import { type GlobalConfig } from '../../types'

export const popKeyframe = (global: GlobalConfig) => {
  injectKeyframes(`${global.prefixCls}-pop`, {
    '0%': { transform: 'scale(0)' },
    '70%': { transform: 'scale(1.2)' },
    '100%': { transform: 'scale(1)' }
  })
}

export const popStyle = (global: GlobalConfig, popDuration: number) => {
  injectStyle(`.${global.prefixCls}-pop`, {
    animation: `${global.prefixCls}-pop ${popDuration}ms forwards ease-in-out`,
    transform: 'scale(0)'
  })
}
