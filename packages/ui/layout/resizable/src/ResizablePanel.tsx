import {
  cn,
  type PolymorphicElement,
  type PolymorphicElementMap,
  useNSUI
} from '@negative-space/system'
import React, { CSSProperties, forwardRef, useId, useLayoutEffect } from 'react'

import { useResizable } from './useResizable'

export type ResizablePanelProps<E extends PolymorphicElement = 'div'> = {
  as?: E
  id?: string
  defaultSize?: number
  minSize?: number
  maxSize?: number
  style?: CSSProperties
} & Omit<React.ComponentPropsWithoutRef<E>, 'style' | 'id'>

export const ResizablePanel = forwardRef(
  <E extends PolymorphicElement = 'div'>(
    {
      as,
      id: idProp,
      children,
      className,
      style,
      defaultSize = 0,
      minSize = 0,
      maxSize = Infinity,
      ...props
    }: ResizablePanelProps<E>,
    ref: React.Ref<PolymorphicElementMap[E]>
  ) => {
    const Component = as ?? ('div' as React.ElementType)

    const { global } = useNSUI()

    const autoId = useId()
    const id = idProp ?? autoId

    const { sizes, registerPanel, unregisterPanel } = useResizable()

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
