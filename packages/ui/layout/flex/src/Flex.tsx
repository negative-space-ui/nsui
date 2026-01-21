import React, { forwardRef } from 'react'
import { cn, useNSUI } from '@negative-space/system'

type FlexElement =
  | 'div'
  | 'aside'
  | 'header'
  | 'footer'
  | 'main'
  | 'section'
  | 'nav'
  | 'article'
  | 'label'
  | 'fieldset'
  | 'ol'
  | 'ul'
  | 'li'
  | 'dl'
  | 'dt'
  | 'dd'
  | 'button'
  | 'form'

type FlexDomMap = {
  div: HTMLDivElement
  aside: HTMLElement
  header: HTMLElement
  footer: HTMLElement
  main: HTMLElement
  section: HTMLElement
  nav: HTMLElement
  article: HTMLElement
  label: HTMLLabelElement
  fieldset: HTMLFieldSetElement
  ol: HTMLOListElement
  ul: HTMLUListElement
  li: HTMLLIElement
  dl: HTMLDListElement
  dt: HTMLElement
  dd: HTMLElement
  button: HTMLButtonElement
  form: HTMLFormElement
}

export type FlexProps<E extends FlexElement = 'div'> = {
  as?: E
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  alignItems?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
} & React.ComponentPropsWithoutRef<E>

export const Flex = forwardRef(
  <E extends FlexElement = 'div'>(
    {
      as,
      alignItems = 'start',
      direction = 'row',
      justify = 'start',
      wrap = 'nowrap',
      className,
      children,
      ...props
    }: FlexProps<E>,
    ref: React.Ref<FlexDomMap[E]>
  ) => {
    const Component = as ?? ('div' as React.ElementType)
    const { global } = useNSUI()

    return (
      <Component
        {...props}
        ref={ref}
        className={cn(
          `${global.prefixCls}-flex`,
          `${global.prefixCls}-flex-${direction}`,
          `${global.prefixCls}-flex-${wrap}`,
          `${global.prefixCls}-flex-align-${alignItems}`,
          `${global.prefixCls}-flex-justify-${justify}`,
          className
        )}
      >
        {children}
      </Component>
    )
  }
)

Flex.displayName = 'Flex'
