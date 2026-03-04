import { FloatingArrow, FloatingFocusManager, FloatingPortal } from '@floating-ui/react'
import { cn, type OverlayAnimation, useNSUI } from '@negative-space/system'
import React, { useEffect, useState } from 'react'

import { type PopoverHandle, type PopoverTrigger } from './usePopover'

export interface PopoverProps extends Omit<
  React.HTMLProps<HTMLDivElement>,
  'className' | 'popover' | 'style'
> {
  classNames?: {
    root?: string
    content?: string
    arrow?: string
  }
  styles?: {
    root?: React.CSSProperties
    content?: React.CSSProperties
    arrow?: React.CSSProperties
  }
  animation?: OverlayAnimation
  popover: PopoverHandle
}

const NON_FOCUS_TRIGGERS: PopoverTrigger[] = ['hover']

export const Popover = ({
  popover,
  animation,
  children,
  classNames,
  styles,
  ...props
}: PopoverProps) => {
  const { global, components } = useNSUI()

  const { isOpen, floatingRef, floatingStyles, arrowRef, context, getFloatingProps, opts } =
    popover._internal

  const Animation = animation ?? components.popover.animation

  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  const shouldTrapFocus = opts.trapFocus && !NON_FOCUS_TRIGGERS.includes(opts.trigger)

  useEffect(() => {
    if (isOpen) {
      setMounted(true)
    } else {
      setVisible(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (!mounted) return

    let id2: number
    const id = requestAnimationFrame(() => {
      id2 = requestAnimationFrame(() => {
        if (isOpen) setVisible(true)
      })
    })

    return () => {
      cancelAnimationFrame(id)
      cancelAnimationFrame(id2)
    }
  }, [mounted, isOpen])

  const handleTransitionEnd = () => {
    if (!visible) setMounted(false)
  }

  if (!mounted) return null

  const panel = (
    <FloatingFocusManager context={context} disabled={!shouldTrapFocus}>
      <div
        ref={floatingRef}
        style={{
          ...floatingStyles,
          zIndex: opts.zIndex,
          pointerEvents: visible ? 'auto' : 'none'
        }}
      >
        <div
          {...(getFloatingProps(props) as React.HTMLProps<HTMLDivElement>)}
          data-visible={visible ? 'true' : 'false'}
          data-trigger={opts.trigger}
          onTransitionEnd={handleTransitionEnd}
          className={cn(
            Animation !== 'none' && `${global.prefixCls}-${Animation}`,
            classNames?.root
          )}
          style={styles?.root}
        >
          <div
            className={cn(`${global.prefixCls}-popover-content`, classNames?.content)}
            style={styles?.content}
          >
            {children}
          </div>

          {opts.showArrow && (
            <FloatingArrow
              ref={arrowRef}
              context={context}
              className={cn(`${global.prefixCls}-popover-arrow`, classNames?.arrow)}
              style={styles?.arrow}
            />
          )}
        </div>
      </div>
    </FloatingFocusManager>
  )

  return opts.usePortal ? <FloatingPortal>{panel}</FloatingPortal> : panel
}
