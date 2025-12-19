import { injectStyle } from '@negative-space/inject-css'
import { GlobalConfig } from '@negative-space/types'

export const typographyStyles = (global: GlobalConfig) => {
  return {
    heading: injectStyle(`${global.prefixCls}-heading`, {
      transitionProperty: 'color, scale',
      transitionTimingFunction: 'ease-in-out',
      transitionDuration: `${global.colorTransitionDuration}ms, ${global.scaleTransitionDuration}ms`
    }),

    text: injectStyle(`${global.prefixCls}-text`, {
      transitionProperty: 'color, scale',
      transitionTimingFunction: 'ease-in-out',
      transitionDuration: `${global.colorTransitionDuration}ms, ${global.scaleTransitionDuration}ms`
    }),

    list: injectStyle(`${global.prefixCls}-list`, {
      paddingLeft: '1rem',
      transitionProperty: 'color, scale',
      transitionTimingFunction: 'ease-in-out',
      transitionDuration: `${global.colorTransitionDuration}ms, ${global.scaleTransitionDuration}ms`
    }),

    orderedList: injectStyle(`${global.prefixCls}-list ol li`, {
      listStyleType: 'decimal'
    }),

    unorderedList: injectStyle(`${global.prefixCls}-list ul li`, {
      listStyleType: 'disc'
    })
  }
}
