import React, { forwardRef } from 'react'
import clsx from 'clsx'
import { useNSUI } from '@negative-space/provider'

type TextElement = 'span' | 'p' | 'label' | 'small'

type TextDomMap = {
  p: HTMLParagraphElement
  span: HTMLSpanElement
  label: HTMLLabelElement
  small: HTMLElement
}

export type TextProps<E extends TextElement = 'span'> = {
  as?: E
} & React.ComponentPropsWithoutRef<E>

export const Text = forwardRef(
  <E extends TextElement = 'span'>(
    { as, children, className, ...props }: TextProps<E>,
    ref: React.Ref<TextDomMap[E]>
  ) => {
    const { global, components } = useNSUI()
    const Component = as ?? (components.text.typeElement as React.ElementType)

    return (
      <Component {...props} ref={ref} className={clsx(`${global.prefixCls}-text`, className)}>
        {children}
      </Component>
    )
  }
)

Text.displayName = 'Text'
