import { injectStyle } from '@negative-space/inject-css'
import type { GlobalConfigRequired, SpinnerConfig } from '../../../types'

export const spinnerStyles = (global: GlobalConfigRequired, spinner: SpinnerConfig) =>
  injectStyle(`.${global.prefixCls}-spinner`, {
    display: 'block',
    borderRadius: '50%',
    transitionProperty: 'border, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${global.motionDurations.color}ms, ${global.motionDurations.scale}ms`,
    animation: `${global.prefixCls}-spin ${spinner.animationDuration!}s linear infinite`
  })
