import { cn, useNSUI } from '@negative-space/system'
import React, { CSSProperties, forwardRef, useId, useLayoutEffect } from 'react'

import { useResizable } from './useResizable'

type ResizablePanelElement =
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

type ResizablePanelDomMap = {
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

export type ResizablePanelProps<E extends ResizablePanelElement = 'div'> = {
  as?: E
  id?: string
  defaultSize?: number
  minSize?: number
  maxSize?: number
  style?: CSSProperties
} & Omit<React.ComponentPropsWithoutRef<E>, 'style' | 'id'>

export const ResizablePanel = forwardRef(
  <E extends ResizablePanelElement = 'div'>(
    {
      as,
      id: idProp,
      defaultSize = 50,
      minSize = 0,
      maxSize = Infinity,
      className,
      style,
      children,
      ...props
    }: ResizablePanelProps<E>,
    ref: React.Ref<ResizablePanelDomMap[E]>
  ) => {
    const Component = as ?? ('div' as React.ElementType)
    const { global } = useNSUI()
    const { sizes, registerPanel, unregisterPanel } = useResizable()
    const autoId = useId()
    const id = idProp ?? autoId

    useLayoutEffect(() => {
      registerPanel(id, defaultSize, minSize, maxSize)
      return () => unregisterPanel(id)
    }, [id])

    const size = sizes[id] ?? defaultSize

    return (
      <Component
        {...props}
        ref={ref}
        data-resizable-id={id}
        className={cn(`${global.prefixCls}-resizable-panel`, className)}
        style={{
          flexBasis: 0,
          flexGrow: size,
          flexShrink: size,
          minWidth: 0,
          overflow: 'hidden',
          ...style
        }}
      >
        {children}
      </Component>
    )
  }
)

ResizablePanel.displayName = 'ResizablePanel'
