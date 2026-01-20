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
  columns?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'
  rows?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'auto'
  alignItems?: 'start' | 'center' | 'end' | 'stretch'
  justifyItems?: 'start' | 'center' | 'end' | 'stretch'
  alignContent?: 'start' | 'center' | 'end' | 'stretch' | 'between' | 'around' | 'evenly'
  justifyContent?: 'start' | 'center' | 'end' | 'stretch' | 'between' | 'around' | 'evenly'
} & React.ComponentPropsWithoutRef<E>

export const Grid = forwardRef(
  <E extends GridElement = 'div'>(
    {
      as,
      columns = '2',
      rows = '1',
      alignItems,
      justifyItems,
      alignContent,
      justifyContent,
      className,
      children,
      ...props
    }: GridProps<E>,
    ref: React.Ref<GridDomMap[E]>
  ) => {
    const { global, components } = useNSUI()
    const prefix = global.prefixCls

    const Component = as ?? (components.grid?.typeElement as React.ElementType)

    const AlignItems = alignItems ?? components.grid?.alignItems
    const JustifyItems = justifyItems ?? components.grid?.justifyItems
    const AlignContent = alignContent ?? components.grid?.alignContent
    const JustifyContent = justifyContent ?? components.grid?.justifyContent

    return (
      <Component
        {...props}
        ref={ref}
        className={cn(
          `${prefix}-grid`,
          columns && `${prefix}-grid-cols-${columns}`,
          rows && `${prefix}-grid-rows-${rows}`,
          AlignItems && `${prefix}-grid-align-items-${AlignItems}`,
          JustifyItems && `${prefix}-grid-justify-items-${JustifyItems}`,
          AlignContent && `${prefix}-grid-align-content-${AlignContent}`,
          JustifyContent && `${prefix}-grid-justify-content-${JustifyContent}`,
          className
        )}
      >
        {children}
      </Component>
    )
  }
)

Grid.displayName = 'Grid'
