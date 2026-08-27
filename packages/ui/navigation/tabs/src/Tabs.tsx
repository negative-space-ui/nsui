import { Flex, type FlexProps } from '@negative-space/flex'
import { cn, mergeRefs, useNSUI } from '@negative-space/system'
import React from 'react'

import { TabsItem, type TabsItemProps } from './TabsItem'

export interface TabsProps extends Omit<FlexProps, 'className' | 'style' | 'children'> {
  classNames?: {
    root?: string
    item?: string
    overlay?: string
  }
  styles?: {
    root?: React.CSSProperties
    item?: React.CSSProperties
    overlay?: React.CSSProperties
  }
  items?: TabsItemProps[]
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ classNames, styles, items, ...props }, ref) => {
    const { global } = useNSUI()

    const rootRef = React.useRef<HTMLDivElement>(null)
    const itemRefs = React.useRef(new Map<string, HTMLAnchorElement>())
    const [selected, setSelected] = React.useState(items?.[0]?.id)
    const [overlay, setOverlay] = React.useState<React.CSSProperties>({})

    const setRefs = React.useMemo(() => mergeRefs(ref, rootRef), [ref])

    const setItemRef = React.useCallback(
      (id: string | undefined) => (node: HTMLAnchorElement | null) => {
        if (!id) return

        if (node) itemRefs.current.set(id, node)
        else itemRefs.current.delete(id)
      },
      []
    )

    const updateOverlay = React.useCallback(() => {
      const root = rootRef.current
      const item = selected ? itemRefs.current.get(selected) : undefined

      if (!root || !item) return

      const rootRect = root.getBoundingClientRect()
      const itemRect = item.getBoundingClientRect()

      return {
        transform: `translateX(${itemRect.left - rootRect.left}px)`,
        width: itemRect.width
      }
    }, [selected])

    React.useLayoutEffect(() => {
      setOverlay(updateOverlay() ?? {})
    }, [updateOverlay, items])

    return (
      <Flex
        {...props}
        ref={setRefs}
        className={cn(`${global.prefixCls}-tabs`, classNames?.root)}
        style={{
          position: 'relative',
          ...styles?.root
        }}
      >
        <div
          aria-hidden
          className={cn(`${global.prefixCls}-tabs-overlay`, classNames?.overlay)}
          style={{
            bottom: 0,
            left: 0,
            zIndex: 0,
            position: 'absolute',
            pointerEvents: 'none',
            ...overlay,
            ...styles?.overlay
          }}
        />

        {items?.map((item, index) => (
          <TabsItem
            {...item}
            key={item.id ?? index}
            ref={setItemRef(item.id)}
            data-active={item.id === selected}
            aria-current={item.id === selected ? 'page' : undefined}
            onClick={(event) => {
              item.onClick?.(event)
              setSelected(item.id)
            }}
            className={cn(classNames?.item, item.className)}
            style={styles?.item}
          />
        ))}
      </Flex>
    )
  }
)

Tabs.displayName = 'Tabs'
