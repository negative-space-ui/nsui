import { injectStyle } from '@negative-space/inject-css'
import { GlobalConfig } from '@negative-space/types'

export const listboxStyle = (global: GlobalConfig) => {
  injectStyle(`.${global.prefixCls}-listbox`, {
    gap: '0px !important',
    '&[data-disabled="true"]': { cursor: 'not-allowed' },
    transitionProperty: 'color, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${global.colorTransitionDuration}ms, ${global.scaleTransitionDuration}ms`
  })

  injectStyle(`.${global.prefixCls}-listbox-option`, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    padding: '0.3rem',
    '&[data-disabled="true"]': { cursor: 'not-allowed' },
    transitionProperty: 'color, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${global.colorTransitionDuration}ms, ${global.scaleTransitionDuration}ms`
  })

  injectStyle(`.${global.prefixCls}-listbox-label`, {
    paddingRight: '0.5rem'
  })
}
