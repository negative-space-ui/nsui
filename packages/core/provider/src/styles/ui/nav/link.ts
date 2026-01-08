import { injectStyle } from '@negative-space/inject-css'
import { GlobalConfig } from '@negative-space/types'

export function linkStyle(config: GlobalConfig) {
  injectStyle(`.${config.prefixCls}-link`, {
    cursor: 'pointer',
    '&[data-disabled="true"]': { cursor: 'not-allowed' },
    transitionProperty: 'color, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${config.colorTransitionDuration}ms, ${config.scaleTransitionDuration}ms`
  })

  injectStyle(`.${config.prefixCls}-link-underline`, {
    textDecoration: 'underline',
    textUnderlineOffset: '0.156em'
  })
}
