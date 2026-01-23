import React, { forwardRef } from 'react'
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
  alignItems?: 'start' | 'center' | 'end' | 'stretch'
  justifyItems?: 'start' | 'center' | 'end' | 'stretch'
  alignContent?: 'start' | 'center' | 'end' | 'stretch' | 'between' | 'around' | 'evenly'
  justifyContent?: 'start' | 'center' | 'end' | 'stretch' | 'between' | 'around' | 'evenly'
} & React.ComponentPropsWithoutRef<E>

export const Grid = forwardRef(
  <E extends GridElement = 'div'>(
    {
      as,
      columns = 2,
      rows = 1,
      alignItems = 'start',
      justifyItems = 'start',
      alignContent = 'start',
      justifyContent = 'start',
      className,
      children,
      ...props
    }: GridProps<E>,
    ref: React.Ref<GridDomMap[E]>
  ) => {
    const Component = as ?? ('div' as React.ElementType)
    const { global } = useNSUI()

    return (
      <Component
        {...props}
        ref={ref}
        className={cn(
          `${global.prefixCls}-grid`,
          columns && `${global.prefixCls}-grid-cols-${columns}`,
          rows && `${global.prefixCls}-grid-rows-${rows}`,
          `${global.prefixCls}-grid-align-items-${alignItems}`,
          `${global.prefixCls}-grid-justify-items-${justifyItems}`,
          `${global.prefixCls}-grid-align-content-${alignContent}`,
          `${global.prefixCls}-grid-justify-content-${justifyContent}`,
          className
        )}
      >
        {children}
      </Component>
    )
  }
)

Grid.displayName = 'Grid'
