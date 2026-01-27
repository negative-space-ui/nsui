import React, { forwardRef, CSSProperties } from 'react'
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
  direction?: CSSProperties['flexDirection']
  wrap?: CSSProperties['flexWrap']
  alignItems?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
  gap?: CSSProperties['gap']
} & Omit<React.ComponentPropsWithoutRef<E>, 'style'>

export const Flex = forwardRef(
  <E extends FlexElement = 'div'>(
    {
      as,
      direction = 'row',
      wrap = 'nowrap',
      alignItems = 'flex-start',
      justify = 'flex-start',
      gap = '0.5rem',
      className,
      style,
      children,
      ...props
    }: FlexProps<E> & { style?: CSSProperties },
    ref: React.Ref<FlexDomMap[E]>
  ) => {
    const Component = as ?? ('div' as React.ElementType)
    const { global } = useNSUI()

    const defaultFlex: CSSProperties = {
      display: 'flex',
      flexDirection: direction,
      flexWrap: wrap,
      alignItems,
      justifyContent: justify,
      gap
    }

    return (
      <Component
        {...props}
        ref={ref}
        className={cn(`${global.prefixCls}-flex`, className)}
        style={{ ...defaultFlex, ...style }}
      >
        {children}
      </Component>
    )
  }
)

Flex.displayName = 'Flex'
