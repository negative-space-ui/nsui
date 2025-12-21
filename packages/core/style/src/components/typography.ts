import { injectStyle } from '@negative-space/core/utils/inject-css'
import { GlobalConfig } from '@negative-space/types'

export const typographyStyles = (global: GlobalConfig) => {
  injectStyle(`.${global.prefixCls}-heading`, {
    transitionProperty: 'color, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${global.colorTransitionDuration}ms, ${global.scaleTransitionDuration}ms`
  })

  injectStyle(`.${global.prefixCls}-text`, {
    transitionProperty: 'color, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${global.colorTransitionDuration}ms, ${global.scaleTransitionDuration}ms`
  })

  injectStyle(`.${global.prefixCls}-list`, {
    transitionProperty: 'color, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${global.colorTransitionDuration}ms, ${global.scaleTransitionDuration}ms`
  })

  injectStyle(`.${global.prefixCls}-list.${global.prefixCls}-list-vertical`, {
    paddingLeft: '1rem'
  })

  injectStyle(`.${global.prefixCls}-list.${global.prefixCls}-list-horizontal`, {
    display: 'flex',
    gap: '0.5rem'
  })

  const unorderedMarkers = ['disc', 'circle', 'square', 'none'] as const
  unorderedMarkers.forEach((marker) => {
    injectStyle(
      `ul.${global.prefixCls}-list.${global.prefixCls}-list-vertical.${global.prefixCls}-marker-${marker}`,
      {
        listStyleType: marker === 'none' ? 'none' : marker,
        paddingLeft: marker === 'none' ? 0 : '1rem'
      }
    )
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
    injectStyle(
      `ol.${global.prefixCls}-list.${global.prefixCls}-list-vertical.${global.prefixCls}-marker-${marker}`,
      {
        listStyleType: marker === 'none' ? 'none' : marker,
        paddingLeft: marker === 'none' ? 0 : '1rem'
      }
    )
  })
}
