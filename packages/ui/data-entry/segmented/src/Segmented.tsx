import { Flex, type FlexProps } from '@negative-space/flex'
import { cn, mergeRefs, useNSUI } from '@negative-space/system'
import React from 'react'

import { SegmentedItem, type SegmentedItemProps } from './SegmentedItem'

export interface SegmentedProps extends Omit<FlexProps, 'classNames' | 'style' | 'children'> {
  classNames?: {
    root?: string
    item?: SegmentedItemProps['classNames']
    overlay?: string
  }
  styles?: {
    root?: React.CSSProperties
    item?: SegmentedItemProps['styles']
    overlay?: React.CSSProperties
  }
  items?: SegmentedItemProps[]
}

export const Segmented = React.forwardRef<HTMLDivElement, SegmentedProps>(
  ({ classNames, styles, items, ...props }, ref) => {
    const { global } = useNSUI()
    const rootRef = React.useRef<HTMLDivElement>(null)
    const itemRefs = React.useRef(new Map<string, HTMLButtonElement>())
    const [selected, setSelected] = React.useState(items?.[0]?.id)

    const setRefs = React.useMemo(() => mergeRefs(ref, rootRef), [ref])

    const setItemRef = React.useCallback(
      (id: string | undefined) => (node: HTMLButtonElement | null) => {
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
        transform: `translate(${itemRect.left - rootRect.left}px, ${itemRect.top - rootRect.top}px)`,
        width: itemRect.width,
        height: itemRect.height
      }
    }, [selected])

    const [overlay, setOverlay] = React.useState<React.CSSProperties>({})

    React.useLayoutEffect(() => {
      setOverlay(updateOverlay() ?? {})
    }, [selected, updateOverlay, items])

    return (
      <Flex
        ref={setRefs}
        {...props}
        className={cn(`${global.prefixCls}-segmented`, classNames?.root)}
        style={{
          position: 'relative',
          ...styles?.root
        }}
      >
        <div
          aria-hidden
          className={cn(`${global.prefixCls}-segmented-overlay`, classNames?.overlay)}
          style={{
            top: 0,
            left: 0,
            zIndex: 0,
            position: 'absolute',
            pointerEvents: 'none',
            ...overlay,
            ...styles?.overlay
          }}
        />

        {items?.map((item, index) => (
          <SegmentedItem
            {...item}
            key={item.id ?? index}
            ref={setItemRef(item.id)}
            pressed={item.id === selected}
            onPressedChange={() => {
              setSelected(item.id)
            }}
            classNames={classNames?.item}
            styles={styles?.item}
          />
        ))}
      </Flex>
    )
  }
)

Segmented.displayName = 'Segmented'
