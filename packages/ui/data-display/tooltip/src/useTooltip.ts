import { type Placement, type PopoverHandle, usePopover } from '@negative-space/popover'

export interface UseTooltipOptions {
  placement?: Placement
  delay?: { open?: number; close?: number } | number
  showArrow?: boolean
  usePortal?: boolean
  zIndex?: number
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export type TooltipHandle = PopoverHandle

export function useTooltip(options: UseTooltipOptions = {}): TooltipHandle {
  const {
    placement = 'right',
    delay = { open: 100, close: 100 },
    showArrow = true,
    usePortal = true,
    zIndex = 10000,
    open,
    onOpenChange
  } = options

  return usePopover({
    placement,
    trigger: 'hover',
    hoverDelay: delay,
    showArrow,
    usePortal,
    zIndex,
    trapFocus: false,
    dismissOnClickOutside: false,
    dismissOnEscape: true,
    overlay: false,
    offset: 14,
    open,
    onOpenChange
  })
}
