import { Flex, type FlexProps } from '@negative-space/flex'
import React, { useContext, useEffect, useId, useRef } from 'react'

import { CollectionContext } from './CollectionContext'

export interface CollectionItemProps extends Omit<FlexProps<'li'>, 'as' | 'onClick' | 'onSelect'> {
  value?: string
  disabled?: boolean
  selected?: boolean
  role?: React.AriaRole
  onClick?: (value: string | undefined, event: React.MouseEvent<HTMLLIElement>) => void
  onSelect?: (value: string | undefined) => void
}

export function CollectionItem({
  children,
  value,
  disabled = false,
  selected,
  role = 'option',
  onClick,
  onSelect,
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
      {...props}
      ref={ref}
      as="li"
      role={role}
      tabIndex={tabIndex}
      aria-disabled={isDisabled || undefined}
      aria-selected={selected}
      onFocus={handleFocus}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </Flex>
  )
}

CollectionItem.displayName = 'CollectionItem'
