import React, { forwardRef } from 'react'
import clsx from 'clsx'
import { useNSUI } from '@negative-space/provider'

type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span'

export type HeadingProps<E extends HeadingElement = 'h1'> = {
  as?: E
} & React.ComponentPropsWithoutRef<E>

export const Heading = forwardRef(
  <E extends HeadingElement = 'h1'>(
    { as, children, className, ...props }: HeadingProps<E>,
    ref: React.Ref<HTMLElement>
  ) => {
    const Component = (as ?? 'h1') as React.ElementType
    const { global } = useNSUI()

    return (
      <Component {...props} ref={ref} className={clsx(`${global.prefixCls}-heading`, className)}>
        {children}
      </Component>
    )
  }
)

Heading.displayName = 'Heading'
