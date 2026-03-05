import {
  arrow,
  autoUpdate,
  flip,
  type FlipOptions,
  offset,
  type OffsetOptions,
  type Placement,
  shift,
  type ShiftOptions,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useRole
} from '@floating-ui/react'
import { type CSSProperties, type HTMLProps, useCallback, useRef, useState } from 'react'

export type PopoverTrigger = 'click' | 'hover' | 'press'
export type FixedPosition = 'center' | 'top' | 'bottom'

export interface UsePopoverOptions {
  placement?: Placement
  offset?: OffsetOptions
  showArrow?: boolean
  dismissOnClickOutside?: boolean
  dismissOnEscape?: boolean
  trapFocus?: boolean
  usePortal?: boolean
  zIndex?: number
  flipOptions?: FlipOptions
  shiftOptions?: ShiftOptions
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: PopoverTrigger
  hoverDelay?: { open?: number; close?: number } | number
  overlay?: boolean
  /**
   * When set, disables floating-ui anchor positioning and places the element
   * at a fixed position on the screen. Useful for modals and drawers.
   */
  fixedPosition?: FixedPosition
}

export interface PopoverInternal {
  isOpen: boolean
  floatingRef: (node: HTMLElement | null) => void
  floatingStyles: CSSProperties
  arrowRef: React.RefObject<SVGSVGElement | null>
  context: ReturnType<typeof useFloating>['context']
  getFloatingProps: (props?: HTMLProps<HTMLElement>) => Record<string, unknown>
  opts: Required<
    Pick<
      UsePopoverOptions,
      'showArrow' | 'trapFocus' | 'usePortal' | 'zIndex' | 'trigger' | 'overlay'
    >
  > & { fixedPosition: FixedPosition | false }
}

export interface PopoverHandle {
  triggerProps: Record<string, unknown>
  open: () => void
  close: () => void
  toggle: () => void
  isOpen: boolean
  _internal: PopoverInternal
}

const FIXED_POSITION_STYLES: Record<FixedPosition, CSSProperties> = {
  center: { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  top: { position: 'fixed', top: '5%', left: '50%', transform: 'translateX(-50%)' },
  bottom: { position: 'fixed', bottom: '5%', left: '50%', transform: 'translateX(-50%)' }
}

export { FIXED_POSITION_STYLES }

export function usePopover(options: UsePopoverOptions = {}): PopoverHandle {
  const {
    placement = 'bottom',
    offset: offsetValue = 14,
    showArrow = true,
    dismissOnClickOutside = true,
    dismissOnEscape = true,
    trapFocus = true,
    usePortal = true,
    zIndex = 9999,
    flipOptions,
    shiftOptions,
    defaultOpen = false,
    open: controlledOpen,
    onOpenChange,
    trigger = 'click',
    overlay = false,
    hoverDelay = { open: 100, close: 150 },
    fixedPosition
  } = options

  const isControlled = controlledOpen !== undefined
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const isOpen = isControlled ? controlledOpen! : uncontrolledOpen
  const arrowRef = useRef<SVGSVGElement | null>(null)

  const setOpen = useCallback(
    (next: boolean) => {
      if (isControlled) onOpenChange?.(next)
      else setUncontrolledOpen(next)
    },
    [isControlled, onOpenChange]
  )

  const floating = useFloating({
    open: isOpen,
    onOpenChange: setOpen,
    placement,
    whileElementsMounted: fixedPosition ? undefined : autoUpdate,
    middleware: fixedPosition
      ? []
      : [
          offset(offsetValue),
          flip(flipOptions),
          shift({ padding: 8, ...shiftOptions }),
          ...(showArrow ? [arrow({ element: arrowRef })] : [])
        ]
  })

  const clickInteraction = useClick(floating.context, { enabled: trigger === 'click' })

  const normalizedDelay =
    typeof hoverDelay === 'number' ? { open: hoverDelay, close: hoverDelay } : hoverDelay

  const hoverInteraction = useHover(floating.context, {
    enabled: trigger === 'hover',
    delay: normalizedDelay,
    handleClose: null
  })

  const pressInteraction = useClick(floating.context, {
    enabled: trigger === 'press',
    toggle: true
  })

  const dismiss = useDismiss(floating.context, {
    outsidePress: dismissOnClickOutside,
    escapeKey: dismissOnEscape
  })

  const role = useRole(floating.context)

  const activeInteraction =
    trigger === 'click'
      ? clickInteraction
      : trigger === 'hover'
        ? hoverInteraction
        : pressInteraction

  const { getReferenceProps, getFloatingProps } = useInteractions([
    activeInteraction,
    dismiss,
    role
  ])

  const baseTriggerProps = getReferenceProps({ ref: floating.refs.setReference })

  const triggerProps: Record<string, unknown> =
    trigger === 'press'
      ? {
          ...baseTriggerProps,
          onClick: undefined,
          onPointerDown: (e: React.PointerEvent) => {
            e.preventDefault()
            setOpen(true)
          },
          onPointerUp: () => setOpen(false),
          onPointerLeave: () => setOpen(false)
        }
      : baseTriggerProps

  return {
    triggerProps,
    isOpen,
    open: () => setOpen(true),
    close: () => setOpen(false),
    toggle: () => setOpen(!isOpen),
    _internal: {
      isOpen,
      floatingRef: floating.refs.setFloating,
      floatingStyles: floating.floatingStyles,
      arrowRef,
      context: floating.context,
      getFloatingProps,
      opts: {
        showArrow,
        trapFocus,
        usePortal,
        zIndex,
        trigger,
        overlay,
        fixedPosition: fixedPosition ?? false
      }
    }
  }
}
