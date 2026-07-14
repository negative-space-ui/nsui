import {
  cn,
  type PolymorphicElement,
  type PolymorphicElementMap,
  useNSUI
} from '@negative-space/system'
import React, { CSSProperties, forwardRef } from 'react'

export type FlexProps<E extends PolymorphicElement = 'div'> = {
  as?: E
  direction?: CSSProperties['flexDirection']
  wrap?: CSSProperties['flexWrap']
  alignItems?: CSSProperties['alignItems']
  justifyContent?: CSSProperties['justifyContent']
  gap?: CSSProperties['gap']
  style?: CSSProperties
} & React.ComponentPropsWithoutRef<E>

export const Flex = forwardRef(
  <E extends PolymorphicElement = 'div'>(
    {
      as,
      children,
      className,
      style,
      direction = 'row',
      wrap = 'nowrap',
      alignItems = 'flex-start',
      justifyContent = 'flex-start',
      gap = '0',
      ...props
    }: FlexProps<E>,
    ref: React.Ref<PolymorphicElementMap[E]>
  ) => {
    const Component = as ?? ('div' as React.ElementType)

    const { global } = useNSUI()

    return (
      <Component
        {...props}
        ref={ref}
        className={cn(`${global.prefixCls}-flex`, className)}
        style={{
          display: 'flex',
          flexDirection: direction,
          flexWrap: wrap,
          alignItems,
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

Flex.displayName = 'Flex'
