import { injectStyle } from '@negative-space/inject-css'
import { GlobalConfig } from '@negative-space/types'

export const buttonStyles = (global: GlobalConfig) => {
  injectStyle(`.${global.prefixCls}-btn`, {
    overflow: 'hidden',
    padding: '0.5rem',
    cursor: 'pointer',
    '&[disabled]': { cursor: 'not-allowed' },
    transitionProperty: 'background-color, color, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${global.colorTransitionDuration}ms, ${global.colorTransitionDuration}ms, ${global.scaleTransitionDuration}ms`
  })
}
