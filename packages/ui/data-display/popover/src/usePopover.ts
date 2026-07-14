import {
  arrow,
  autoUpdate,
  type ElementProps,
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
import { type CSSProperties, useCallback, useRef, useState } from 'react'

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
  fixedPosition?: FixedPosition
}

export interface PopoverOpts {
  showArrow: boolean
  trapFocus: boolean
  usePortal: boolean
  zIndex: number
  trigger: PopoverTrigger
  overlay: boolean
  fixedPosition: FixedPosition | false
}

export interface PopoverHandle {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
  referenceRef: (node: Element | null) => void
  getReferenceProps: (userProps?: React.HTMLProps<Element>) => Record<string, unknown>
  floatingRef: (node: HTMLElement | null) => void
  getFloatingProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>
  floatingStyles: CSSProperties
  isPositioned: boolean
  context: ReturnType<typeof useFloating>['context']
  arrowRef: React.RefObject<SVGSVGElement | null>
  opts: PopoverOpts
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
  const resolvedShowArrow = fixedPosition ? false : showArrow

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
          ...(resolvedShowArrow ? [arrow({ element: arrowRef })] : [])
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

  const pressInteraction: ElementProps | undefined =
    trigger === 'press'
      ? {
          reference: {
            onPointerDown: (event) => {
              event.preventDefault()
              setOpen(true)
            },
            onPointerUp: () => setOpen(false),
            onPointerLeave: () => setOpen(false)
          }
        }
      : undefined

  const dismiss = useDismiss(floating.context, {
    outsidePress: dismissOnClickOutside,
    escapeKey: dismissOnEscape
  })

  const role = useRole(floating.context)

  const { getReferenceProps, getFloatingProps } = useInteractions([
    clickInteraction,
    hoverInteraction,
    pressInteraction,
    dismiss,
    role
  ])

  return {
    isOpen,
    open: () => setOpen(true),
    close: () => setOpen(false),
    toggle: () => setOpen(!isOpen),

    referenceRef: floating.refs.setReference,
    getReferenceProps,

    floatingRef: floating.refs.setFloating,
    getFloatingProps,
    floatingStyles: floating.floatingStyles,
    isPositioned: floating.isPositioned,
    context: floating.context,
    arrowRef,
    opts: {
      showArrow: resolvedShowArrow,
      trapFocus,
      usePortal,
      zIndex,
      trigger,
      overlay,
      fixedPosition: fixedPosition ?? false
    }
  }
}
