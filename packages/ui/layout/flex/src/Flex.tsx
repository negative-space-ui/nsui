import React, { forwardRef } from 'react'
import clsx from 'clsx'
import { useNSUI } from '@negative-space/provider'

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
    { as, direction, wrap, alignItems, justify, className, children, ...props }: FlexProps<E>,
    ref: React.Ref<FlexDomMap[E]>
  ) => {
    const { global, components } = useNSUI()
    const prefix = global.prefixCls

    const Component = as ?? (components.flex?.typeElement as React.ElementType)

    const Direction = direction ?? components.flex?.direction
    const Wrap = wrap ?? components.flex?.wrap
    const AlignItems = alignItems ?? components.flex?.alignItems
    const Justify = justify ?? components.flex?.justify

    return (
      <Component
        {...props}
        ref={ref}
        className={clsx(
          `${prefix}-flex`,
          Direction && `${prefix}-flex-${Direction}`,
          Wrap && `${prefix}-flex-${Wrap}`,
          AlignItems && `${prefix}-flex-align-${AlignItems}`,
          Justify && `${prefix}-flex-justify-${Justify}`,
          className
        )}
      >
        {children}
      </Component>
    )
  }
)

Flex.displayName = 'Flex'
