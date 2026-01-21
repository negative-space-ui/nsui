import { injectStyle } from '@negative-space/inject-css'
import type { GlobalConfigRequired } from '../../../types'

export const listStyles = (global: GlobalConfigRequired) => {
  injectStyle(`.${global.prefixCls}-list`, {
    transitionProperty: 'color, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${global.motionDurations.color}ms, ${global.motionDurations.scale}ms`
  })

  injectStyle(`.${global.prefixCls}-list li`, {
    transitionProperty: 'color, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${global.motionDurations.color}ms, ${global.motionDurations.scale}ms`
  })

  const unorderedMarkers = ['disc', 'circle', 'square', 'none']
  unorderedMarkers.forEach((marker) => {
    injectStyle(`ul.${global.prefixCls}-list.${global.prefixCls}-marker-${marker}`, {
      listStyleType: marker === 'none' ? 'none' : marker,
      paddingLeft: marker === 'none' ? 0 : '1rem'
    })
  })

  const orderedMarkers = [
    'decimal',
    'decimal-leading-zero',
    'lower-alpha',
    'upper-alpha',
    'lower-roman',
    'upper-roman',
    'none'
  ] as const

  orderedMarkers.forEach((marker) => {
    injectStyle(`ol.${global.prefixCls}-list.${global.prefixCls}-marker-${marker}`, {
      listStyleType: marker === 'none' ? 'none' : marker,
      paddingLeft: marker === 'none' ? 0 : '1rem'
    })
  })
}
