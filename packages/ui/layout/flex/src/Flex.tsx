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
  | 'a'
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
  a: HTMLAnchorElement
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
  style?: CSSProperties
} & React.ComponentPropsWithoutRef<E>

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
    }: FlexProps<E>,
    ref: React.Ref<FlexDomMap[E]>
  ) => {
    const Component = as ?? ('div' as React.ElementType)
    const { global } = useNSUI()

    const flexStyle: CSSProperties = {
      display: 'flex',
      flexDirection: direction,
      flexWrap: wrap,
      alignItems,
      justifyContent: justify,
      gap,
      ...style
    }

    return (
      <Component
        {...props}
        ref={ref}
        className={cn(`${global.prefixCls}-flex`, className)}
        style={flexStyle}
      >
        {children}
      </Component>
    )
  }
)

Flex.displayName = 'Flex'
