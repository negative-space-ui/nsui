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
}

export interface PopoverInternal {
  isOpen: boolean
  floatingRef: (node: HTMLElement | null) => void
  floatingStyles: CSSProperties
  arrowRef: React.RefObject<SVGSVGElement | null>
  context: ReturnType<typeof useFloating>['context']
  getFloatingProps: (props?: HTMLProps<HTMLElement>) => Record<string, unknown>
  opts: Required<
    Pick<UsePopoverOptions, 'showArrow' | 'trapFocus' | 'usePortal' | 'zIndex' | 'trigger'>
  >
}

export interface PopoverHandle {
  triggerProps: Record<string, unknown>
  open: () => void
  close: () => void
  toggle: () => void
  isOpen: boolean
  _internal: PopoverInternal
}

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
    hoverDelay = { open: 100, close: 150 }
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
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offsetValue),
      flip(flipOptions),
      shift({ padding: 8, ...shiftOptions }),
      ...(showArrow ? [arrow({ element: arrowRef })] : [])
    ]
  })

  const clickInteraction = useClick(floating.context, {
    enabled: trigger === 'click'
  })

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
          onPointerUp: () => {
            setOpen(false)
          },
          onPointerLeave: () => {
            setOpen(false)
          }
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
      opts: { showArrow, trapFocus, usePortal, zIndex, trigger }
    }
  }
}
