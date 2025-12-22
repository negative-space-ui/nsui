import { injectStyle } from '@negative-space/core/utils/inject-css'
import { GlobalConfig, SpinnerConfig } from '@negative-space/types'

export const spinnerStyles = (global: GlobalConfig, spinner: SpinnerConfig) =>
  injectStyle(`.${global.prefixCls}-spinner`, {
    display: 'inline-block',
    borderRadius: '50%',
    transitionProperty: 'border, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${global.colorTransitionDuration}ms, ${global.scaleTransitionDuration}ms`,
    animation: `${global.prefixCls}-spin ${spinner.animationDuration}s linear infinite`
  })
