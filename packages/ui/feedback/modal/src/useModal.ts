import {
  type FixedPosition,
  type PopoverHandle,
  usePopover,
  type UsePopoverOptions
} from '@negative-space/popover'

export type { FixedPosition as ModalPosition }

export interface UseModalOptions {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  dismissOnClickOutside?: boolean
  dismissOnEscape?: boolean
  trapFocus?: boolean
  usePortal?: boolean
  zIndex?: number
  position?: FixedPosition
}

export type ModalHandle = PopoverHandle

export function useModal(options: UseModalOptions = {}): ModalHandle {
  const { position = 'center', ...rest } = options

  return usePopover({
    ...rest,
    overlay: true,
    showArrow: false,
    trigger: 'click',
    trapFocus: true,
    usePortal: true,
    zIndex: 9999,
    fixedPosition: position
  } satisfies UsePopoverOptions)
}
