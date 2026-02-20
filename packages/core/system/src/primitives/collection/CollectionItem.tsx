import React, { useRef, useEffect, useId, useContext } from 'react'
import { Flex, type FlexProps } from '@negative-space/flex'
import { CollectionContext } from './CollectionContext'

export interface CollectionItemProps extends Omit<
  FlexProps<'li'>,
  | 'aria-disabled'
  | 'aria-selected'
  | 'as'
  | 'onClick'
  | 'onFocus'
  | 'onKeyDown'
  | 'onSelect'
  | 'ref'
  | 'role'
  | 'tabIndex'
> {
  value?: string
  disabled?: boolean
  selected?: boolean
  role?: React.AriaRole
  classNames?: { root?: string }
  styles?: { root?: React.CSSProperties }
  onClick?: (value: string | undefined, event: React.MouseEvent<HTMLLIElement>) => void
  onSelect?: (value: string | undefined) => void
}

export function CollectionItem({
  children,
  value,
  disabled = false,
  selected,
  role = 'option',
  classNames,
  styles,
  onClick,
  onSelect,
  alignItems = 'center',
  ...props
}: CollectionItemProps) {
  const ref = useRef<HTMLLIElement>(null)

  const generatedId = useId()
  const itemId = value ?? generatedId

  const ctx = useContext(CollectionContext)
  const registerItem = ctx?.registerItem
  const unregisterItem = ctx?.unregisterItem
  const focusItem = ctx?.focusItem
  const handleItemKeyDown = ctx?.handleItemKeyDown
  const containerRef = ctx?.containerRef
  const isDisabled = disabled || (ctx?.disabled ?? false)
  useEffect(() => {
    if (!registerItem || !unregisterItem) return
    registerItem({
      id: itemId,
      ref: ref as React.RefObject<HTMLElement>,
      disabled: isDisabled
    })
    return () => unregisterItem(itemId)
  }, [itemId, isDisabled, registerItem, unregisterItem])

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    if (isDisabled) return
    focusItem?.(itemId)
    onClick?.(value, event)
  }

  const handleFocus = () => {
    if (!isDisabled) focusItem?.(itemId)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (isDisabled || !handleItemKeyDown) return
    handleItemKeyDown(
      e,
      itemId,
      () => {
        onSelect?.(value)
        onClick?.(value, e as unknown as React.MouseEvent<HTMLLIElement>)
      },
      containerRef
    )
  }

  const tabIndex = isDisabled ? -1 : !ctx ? 0 : -1

  return (
    <Flex
      ref={ref}
      as="li"
      role={role}
      alignItems={alignItems}
      tabIndex={tabIndex}
      aria-disabled={isDisabled || undefined}
      aria-selected={selected}
      onFocus={handleFocus}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={classNames?.root}
      style={styles?.root}
      {...props}
    >
      {children}
    </Flex>
  )
}

CollectionItem.displayName = 'CollectionItem'
