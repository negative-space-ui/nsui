import React, { forwardRef, CSSProperties } from 'react'
import { cn, useNSUI } from '@negative-space/system'

type GridElement =
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
  | 'form'

type GridDomMap = {
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
  form: HTMLFormElement
}

export type GridProps<E extends GridElement = 'div'> = {
  as?: E
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  rows?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto'
  gap?: CSSProperties['gap']
  alignItems?: CSSProperties['alignItems']
  justifyItems?: CSSProperties['justifyItems']
  alignContent?: CSSProperties['alignContent']
  justifyContent?: CSSProperties['justifyContent']
} & Omit<React.ComponentPropsWithoutRef<E>, 'style'>

export const Grid = forwardRef(
  <E extends GridElement = 'div'>(
    {
      as,
      columns = 2,
      rows = 1,
      gap = '0.5rem',
      alignItems = 'start',
      justifyItems = 'start',
      alignContent = 'start',
      justifyContent = 'start',
      className,
      style,
      children,
      ...props
    }: GridProps<E> & { style?: CSSProperties },
    ref: React.Ref<GridDomMap[E]>
  ) => {
    const Component = as ?? ('div' as React.ElementType)
    const { global } = useNSUI()

    const defaultGrid: CSSProperties = {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gridTemplateRows: rows === 'auto' ? 'auto' : `repeat(${rows}, 1fr)`,
      gap,
      alignItems,
      justifyItems,
      alignContent,
      justifyContent
    }

    return (
      <Component
        {...props}
        ref={ref}
        className={cn(`${global.prefixCls}-grid`, className)}
        style={{ ...defaultGrid, ...style }}
      >
        {children}
      </Component>
    )
  }
)

Grid.displayName = 'Grid'
