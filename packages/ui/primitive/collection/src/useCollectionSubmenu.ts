import { type PopoverHandle, usePopover, type UsePopoverOptions } from '@negative-space/popover'
import React, { useContext, useEffect, useId, useRef } from 'react'

import { CollectionContext } from './collectionContext'

export interface UseCollectionSubmenuOptions {
  value?: string
  disabled?: boolean
  popoverOptions?: UsePopoverOptions
}

export interface CollectionSubmenuTriggerProps {
  tabIndex: number
  'aria-disabled': true | undefined
  'aria-haspopup': 'menu'
  'aria-expanded': boolean
  onFocus: () => void
  onClick: () => void
  onKeyDown: (e: React.KeyboardEvent<HTMLLIElement>) => void
}

export interface CollectionSubmenuContentProps {
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void
}

export interface UseCollectionSubmenuReturn {
  itemRef: React.RefObject<HTMLLIElement | null>
  contentRef: React.RefObject<HTMLDivElement | null>
  setItemRef: (node: HTMLLIElement | null) => void
  popover: PopoverHandle
  isDisabled: boolean
  triggerProps: CollectionSubmenuTriggerProps
  contentProps: CollectionSubmenuContentProps
}

export function useCollectionSubmenu(
  options: UseCollectionSubmenuOptions = {}
): UseCollectionSubmenuReturn {
  const { value, disabled = false, popoverOptions } = options

  const itemRef = useRef<HTMLLIElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const generatedId = useId()
  const itemId = value ?? generatedId

  const ctx = useContext(CollectionContext)
  const registerItem = ctx?.registerItem
  const unregisterItem = ctx?.unregisterItem
  const focusItem = ctx?.focusItem
  const handleItemKeyDown = ctx?.handleItemKeyDown
  const containerRef = ctx?.containerRef
  const isDisabled = disabled || (ctx?.disabled ?? false)

  const popover = usePopover({
    placement: 'right-start',
    trigger: 'hover',
    trapFocus: false,
    showArrow: false,
    ...popoverOptions
  })

  useEffect(() => {
    if (!registerItem || !unregisterItem) return
    registerItem({
      id: itemId,
      ref: itemRef as React.RefObject<HTMLElement>,
      disabled: isDisabled
    })
    return () => unregisterItem(itemId)
  }, [itemId, isDisabled, registerItem, unregisterItem])

  useEffect(() => {
    if (isDisabled && popover.isOpen) popover.close()
  }, [isDisabled, popover.isOpen, popover.close])

  const setItemRef = (node: HTMLLIElement | null) => {
    itemRef.current = node
    popover.referenceRef(node)
  }

  const focusFirstSubmenuItem = () => {
    requestAnimationFrame(() => {
      const el = contentRef.current?.querySelector<HTMLElement>(
        '[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"], [role="option"]'
      )
      el?.focus()
    })
  }

  const handleFocus = () => {
    if (!isDisabled) focusItem?.(itemId)
  }

  const handleClick = () => {
    if (isDisabled) return
    focusItem?.(itemId)
    popover.toggle()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (isDisabled) return
    if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      popover.open()
      focusFirstSubmenuItem()
      return
    }

    if (e.key === 'Escape' && popover.isOpen) {
      popover.close()
      return
    }

    handleItemKeyDown?.(
      e,
      itemId,
      () => {
        popover.open()
        focusFirstSubmenuItem()
      },
      containerRef
    )
  }

  const handleContentKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft' || e.key === 'Escape') {
      e.stopPropagation()
      e.preventDefault()
      popover.close()
      itemRef.current?.focus()
    }
  }

  const tabIndex = isDisabled ? -1 : !ctx ? 0 : -1

  return {
    itemRef,
    contentRef,
    setItemRef,
    popover,
    isDisabled,
    triggerProps: {
      tabIndex,
      'aria-disabled': isDisabled || undefined,
      'aria-haspopup': 'menu',
      'aria-expanded': popover.isOpen,
      onFocus: handleFocus,
      onClick: handleClick,
      onKeyDown: handleKeyDown
    },
    contentProps: {
      onKeyDown: handleContentKeyDown
    }
  }
}
