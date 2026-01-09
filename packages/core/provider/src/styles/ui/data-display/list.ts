import { injectStyle } from '@negative-space/inject-css'
import { GlobalConfig } from '../../../types'

export const listStyles = (global: GlobalConfig) => {
  injectStyle(`.${global.prefixCls}-list`, {
    transitionProperty: 'color, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${global.colorTransitionDuration}ms, ${global.scaleTransitionDuration}ms`
  })

  injectStyle(`.${global.prefixCls}-list li`, {
    transitionProperty: 'color, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${global.colorTransitionDuration}ms, ${global.scaleTransitionDuration}ms`
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
