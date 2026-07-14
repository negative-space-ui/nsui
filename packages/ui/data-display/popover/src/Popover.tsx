import { FloatingArrow, FloatingFocusManager, FloatingPortal } from '@floating-ui/react'
import { cn, type OverlayAnimation, useNSUI } from '@negative-space/system'
import React, { useEffect, useState } from 'react'

import { FIXED_POSITION_STYLES, type PopoverHandle, type PopoverTrigger } from './usePopover'

export interface PopoverProps extends Omit<
  React.HTMLProps<HTMLDivElement>,
  'className' | 'popover' | 'style'
> {
  classNames?: {
    root?: string
    content?: string
    arrow?: string
    overlay?: string
  }
  styles?: {
    root?: React.CSSProperties
    content?: React.CSSProperties
    arrow?: React.CSSProperties
    overlay?: React.CSSProperties
  }
  animation?: OverlayAnimation
  popover: PopoverHandle
}

const NON_FOCUS_TRIGGERS: PopoverTrigger[] = ['hover']

export const Popover = ({
  children,
  popover,
  classNames,
  styles,
  animation,
  ...props
}: PopoverProps) => {
  const { global, components } = useNSUI()

  const {
    isOpen,
    isPositioned,
    floatingStyles,
    arrowRef,
    context,
    getFloatingProps,
    opts,
    floatingRef
  } = popover

  const Animation = animation ?? components.popover.animation

  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hasPosition, setHasPosition] = useState(false)

  const shouldTrapFocus = opts.trapFocus && !NON_FOCUS_TRIGGERS.includes(opts.trigger)

  useEffect(() => {
    if (isPositioned) {
      setHasPosition(true)
    }

    if (!mounted) {
      setHasPosition(false)
    }
  }, [isPositioned, mounted])

  const positionReady = opts.fixedPosition ? true : hasPosition

  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      return
    }

    setVisible(false)

    if (Animation === 'none') setMounted(false)
  }, [isOpen, Animation])

  useEffect(() => {
    if (!mounted || !positionReady) return

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
  }, [mounted, isOpen, positionReady])

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target !== e.currentTarget) return

    if (!visible) {
      setMounted(false)
    }
  }

  if (!mounted) return null

  const wrapperStyles: React.CSSProperties = opts.fixedPosition
    ? {
        ...FIXED_POSITION_STYLES[opts.fixedPosition],
        zIndex: opts.zIndex,
        pointerEvents: visible ? 'auto' : 'none'
      }
    : positionReady
      ? {
          ...floatingStyles,
          zIndex: opts.zIndex,
          pointerEvents: visible ? 'auto' : 'none'
        }
      : {
          position: floatingStyles.position,
          zIndex: opts.zIndex,
          visibility: 'hidden',
          pointerEvents: 'none'
        }

  const panel = (
    <>
      {opts.overlay && (
        <div
          aria-hidden="true"
          data-visible={visible}
          onClick={() => popover.close()}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: opts.zIndex - 1,
            pointerEvents: visible ? 'auto' : 'none',
            ...styles?.overlay
          }}
          className={cn(
            `${global.prefixCls}-popover-overlay`,
            Animation !== 'none' && `${global.prefixCls}-fade`,
            classNames?.overlay
          )}
        />
      )}

      <FloatingFocusManager context={context} disabled={!shouldTrapFocus}>
        <div ref={floatingRef} {...getFloatingProps(props)} style={wrapperStyles}>
          <div
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
    </>
  )

  return opts.usePortal ? <FloatingPortal>{panel}</FloatingPortal> : panel
}
