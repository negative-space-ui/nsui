import { injectStyle } from '@negative-space/inject-css'
import { GlobalConfig, SpinnerConfig } from '../../../types'

export const spinnerStyles = (global: GlobalConfig, spinner: SpinnerConfig) =>
  injectStyle(`.${global.prefixCls}-spinner`, {
    display: 'block',
    borderRadius: '50%',
    transitionProperty: 'border, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${global.colorTransitionDuration}ms, ${global.scaleTransitionDuration}ms`,
    animation: `${global.prefixCls}-spin ${spinner.animationDuration!}s linear infinite`
  })
