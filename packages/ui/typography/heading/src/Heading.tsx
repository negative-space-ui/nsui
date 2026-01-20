import React, { forwardRef } from 'react'
import { cn, useNSUI } from '@negative-space/system'

type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span'

type HeadingDomMap = {
  h1: HTMLHeadingElement
  h2: HTMLHeadingElement
  h3: HTMLHeadingElement
  h4: HTMLHeadingElement
  h5: HTMLHeadingElement
  h6: HTMLHeadingElement
  span: HTMLSpanElement
}

export type HeadingProps<E extends HeadingElement = 'h1'> = {
  as?: E
} & React.ComponentPropsWithoutRef<E>

export const Heading = forwardRef(
  <E extends HeadingElement = 'h1'>(
    { as, children, className, ...props }: HeadingProps<E>,
    ref: React.Ref<HeadingDomMap[E]>
  ) => {
    const { global, components } = useNSUI()
    const Component = as ?? (components.heading.typeElement as React.ElementType)

    return (
      <Component {...props} ref={ref} className={cn(`${global.prefixCls}-heading`, className)}>
        {children}
      </Component>
    )
  }
)

Heading.displayName = 'Heading'
