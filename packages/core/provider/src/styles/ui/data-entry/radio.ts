import { injectStyle } from '@negative-space/inject-css'
import { GlobalConfig } from '../../../types'

export const radioStyle = (config: GlobalConfig) => {
  injectStyle(`.${config.prefixCls}-radio-label`, {
    cursor: 'pointer',
    '&[data-disabled="true"]': { cursor: 'not-allowed' },
    userSelect: 'none',
    transitionProperty: 'color, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${config.colorTransitionDuration}ms, ${config.scaleTransitionDuration}ms`
  })

  injectStyle(`.${config.prefixCls}-radio`, {
    cursor: 'pointer',
    '&[data-disabled="true"]': { cursor: 'not-allowed' },
    display: 'inline-flex',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '50%',
    transitionProperty: 'color, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${config.colorTransitionDuration}ms, ${config.scaleTransitionDuration}ms`
  })

  injectStyle(`.${config.prefixCls}-radio-inner`, {
    width: '100%',
    height: '100%',
    display: 'flex',
    borderRadius: '50%',
    opacity: 0,
    transition: `opacity ${config.colorTransitionDuration}ms ease-in-out`
  })

  injectStyle(`.${config.prefixCls}-radio[data-checked="true"] .${config.prefixCls}-radio-inner`, {
    opacity: 1
  })
}
