import {
  cn,
  type PolymorphicElement,
  type PolymorphicElementMap,
  useNSUI
} from '@negative-space/system'
import React, { CSSProperties, forwardRef } from 'react'

export type GridProps<E extends PolymorphicElement = 'div'> = {
  as?: E
  columns?: CSSProperties['gridTemplateColumns']
  rows?: CSSProperties['gridTemplateRows']
  gap?: CSSProperties['gap']
  alignItems?: CSSProperties['alignItems']
  justifyItems?: CSSProperties['justifyItems']
  alignContent?: CSSProperties['alignContent']
  justifyContent?: CSSProperties['justifyContent']
  style?: CSSProperties
} & React.ComponentPropsWithoutRef<E>

export const Grid = forwardRef(
  <E extends PolymorphicElement = 'div'>(
    {
      as,
      children,
      className,
      style,
      columns = 2,
      rows = 1,
      alignItems = 'start',
      justifyItems = 'start',
      alignContent = 'start',
      justifyContent = 'start',
      gap = '0rem',
      ...props
    }: GridProps<E>,
    ref: React.Ref<PolymorphicElementMap[E]>
  ) => {
    const Component = as ?? ('div' as React.ElementType)

    const { global } = useNSUI()

    return (
      <Component
        {...props}
        ref={ref}
        className={cn(`${global.prefixCls}-grid`, className)}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: rows === 'auto' ? 'auto' : `repeat(${rows}, 1fr)`,
          alignItems,
          justifyItems,
          alignContent,
          justifyContent,
          gap,
          ...style
        }}
      >
        {children}
      </Component>
    )
  }
)

Grid.displayName = 'Grid'
