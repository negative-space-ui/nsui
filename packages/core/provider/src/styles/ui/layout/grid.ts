import { injectStyle } from '@negative-space/inject-css'
import { GlobalConfig } from '../../../types'

export const gridStyles = (global: GlobalConfig) => {
  injectStyle(`.${global.prefixCls}-grid`, {
    display: 'grid',
    gap: '0.5rem',
    transitionProperty: 'background-color, color, scale',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: `${global.colorTransitionDuration}ms, ${global.colorTransitionDuration}ms, ${global.scaleTransitionDuration}ms`
  })

  const gridColumns = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  gridColumns.forEach((col) => {
    injectStyle(`.${global.prefixCls}-grid-cols-${col}`, {
      gridTemplateColumns: `repeat(${col}, minmax(0, 1fr))`
    })
  })

  const gridRows = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'auto']
  gridRows.forEach((row) => {
    injectStyle(`.${global.prefixCls}-grid-rows-${row}`, {
      gridTemplateRows: row === 'auto' ? 'auto' : `repeat(${row}, minmax(0, 1fr))`
    })
  })

  const alignItemsOptions = ['start', 'center', 'end', 'stretch']
  alignItemsOptions.forEach((option) => {
    injectStyle(`.${global.prefixCls}-grid-align-items-${option}`, {
      alignItems: option
    })
  })

  const justifyItemsOptions = ['start', 'center', 'end', 'stretch']
  justifyItemsOptions.forEach((option) => {
    injectStyle(`.${global.prefixCls}-grid-justify-items-${option}`, {
      justifyItems: option
    })
  })

  const alignContentOptions = ['start', 'center', 'end', 'stretch', 'between', 'around', 'evenly']
  alignContentOptions.forEach((option) => {
    const value =
      option === 'between'
        ? 'space-between'
        : option === 'around'
          ? 'space-around'
          : option === 'evenly'
            ? 'space-evenly'
            : option
    injectStyle(`.${global.prefixCls}-grid-align-content-${option}`, {
      alignContent: value
    })
  })

  const justifyContentOptions = ['start', 'center', 'end', 'stretch', 'between', 'around', 'evenly']
  justifyContentOptions.forEach((option) => {
    const value =
      option === 'between'
        ? 'space-between'
        : option === 'around'
          ? 'space-around'
          : option === 'evenly'
            ? 'space-evenly'
            : option
    injectStyle(`.${global.prefixCls}-grid-justify-content-${option}`, {
      justifyContent: value
    })
  })
}
