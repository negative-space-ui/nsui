import { injectStyle } from '@negative-space/inject-css'
import { GlobalConfig } from '../../../types'

export const checkboxStyle = (config: GlobalConfig) => {
  injectStyle(`.${config.prefixCls}-checkbox-label`, {
    cursor: 'pointer',
    '&[data-disabled="true"]': { cursor: 'not-allowed' },
    userSelect: 'none',
    transitionProperty: 'color, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${config.colorTransitionDuration}ms, ${config.scaleTransitionDuration}ms`
  })

  injectStyle(`.${config.prefixCls}-checkbox`, {
    cursor: 'pointer',
    '&[data-disabled="true"]': { cursor: 'not-allowed' },
    display: 'inline-flex',
    position: 'relative',
    overflow: 'hidden',
    transitionProperty: 'background-color, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${config.colorTransitionDuration}ms, ${config.scaleTransitionDuration}ms`
  })

  injectStyle(`.${config.prefixCls}-checkbox-inner`, {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    '&[data-checked="true"]': { opacity: 1 },
    transitionProperty: 'opacity, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${config.colorTransitionDuration}ms, ${config.scaleTransitionDuration}ms`
  })

  injectStyle(`.${config.prefixCls}-checkbox .${config.prefixCls}-checkmark`, {
    width: '0.8em',
    height: '0.8em',
    opacity: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    transition: `opacity ${config.colorTransitionDuration}ms ease-in-out`
  })

  injectStyle(`.${config.prefixCls}-checkbox[data-checked="true"] .${config.prefixCls}-checkmark`, {
    opacity: 1
  })
}
