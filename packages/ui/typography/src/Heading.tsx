import React, { forwardRef } from 'react'
import { useNSUI } from '@negative-space/provider'

type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type HeadingProps<E extends HeadingElement = 'h1'> = {
  as?: E
} & React.ComponentPropsWithoutRef<E>

export const Heading = forwardRef(
  <E extends HeadingElement = 'h1'>(
    { as, children, style, className, ...rest }: HeadingProps<E>,
    ref: React.Ref<HTMLElement>
  ) => {
    const Component = (as ?? 'h1') as React.ElementType
    const { global } = useNSUI()

    return (
      <Component
        ref={ref}
        className={`${global.prefixCls}-heading${className ? ` ${className}` : ''}`}
        style={{
          transition: `color ${global.colorTransitionDuration}ms ease-in-out`,
          ...style
        }}
        {...rest}
      >
        {children}
      </Component>
    )
  }
)

Heading.displayName = 'Heading'
