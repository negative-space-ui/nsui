import React, { forwardRef } from 'react'
import { useNSUI } from '@negative-space/provider'

type TextElement = 'p' | 'span' | 'label' | 'small'

export type TextProps<E extends TextElement = 'span'> = {
  as?: E
} & React.ComponentPropsWithoutRef<E>

export const Text = forwardRef(
  <E extends TextElement = 'span'>(
    { as, children, style, className, ...rest }: TextProps<E>,
    ref: React.Ref<HTMLElement>
  ) => {
    const Component = (as ?? 'span') as React.ElementType
    const { global } = useNSUI()

    return (
      <Component
        ref={ref}
        className={`${global.prefixCls}-text${className ? ` ${className}` : ''}`}
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

Text.displayName = 'Text'
