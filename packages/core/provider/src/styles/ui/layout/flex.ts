import { injectStyle } from '@negative-space/inject-css'
import type { GlobalConfigRequired } from '../../../types'

export const flexStyles = (global: GlobalConfigRequired) => {
  injectStyle(`.${global.prefixCls}-flex`, {
    display: 'flex',
    gap: '0.5rem',
    transitionProperty: 'background-color, color, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${global.motionDurations.color}ms, ${global.motionDurations.color}ms, ${global.motionDurations.scale}ms`
  })

  const direction = ['row', 'column', 'row-reverse', 'column-reverse']
  direction.forEach((direction) => {
    injectStyle(`.${global.prefixCls}-flex-${direction}`, {
      flexDirection: direction
    })
  })

  const wrapOptions = ['wrap', 'nowrap', 'wrap-reverse']
  wrapOptions.forEach((wrap) => {
    injectStyle(`.${global.prefixCls}-flex-${wrap}`, {
      flexWrap: wrap
    })
  })

  const alignItems = ['start', 'center', 'end', 'stretch']
  alignItems.forEach((align) => {
    injectStyle(`.${global.prefixCls}-flex-align-${align}`, {
      alignItems: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : align
    })

    const justifyOptions = ['start', 'center', 'end', 'between', 'around', 'evenly']
    justifyOptions.forEach((justify) => {
      injectStyle(`.${global.prefixCls}-flex-justify-${justify}`, {
        justifyContent:
          justify === 'start' ? 'flex-start' : justify === 'end' ? 'flex-end' : justify
      })
    })
  })
}
