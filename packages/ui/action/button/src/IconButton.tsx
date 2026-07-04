import { useRipple } from '@negative-space/ripple'
import { type ClickableAnimation, cn, useNSUI } from '@negative-space/system'
import React from 'react'

import { useButtonContextConditional } from './useButtonContext'

export interface IconButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'style'
> {
  classNames?: {
    root?: string
    icon?: string
  }
  styles?: {
    root?: React.CSSProperties
    icon?: React.CSSProperties
  }
  controlled?: boolean
  animation?: ClickableAnimation
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      classNames,
      styles,
      controlled,
      type = 'button',
      children,
      disabled,
      animation,
      onClick,
      ...props
    },
    ref
  ) => {
    const { global, components } = useNSUI()
    const rippleDisabled = (animation ?? components.iconButton.animation) !== 'ripple'

    const context = useButtonContextConditional(!!controlled)
    const groupDisabled = context.disabled
    const isDisabled = disabled || (controlled ? groupDisabled : false)

    const { createRipple } = useRipple(`${global.prefixCls}-ripple`)

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
      if (isDisabled) return
      const isKeyboard = e.detail === 0
      if (!rippleDisabled) createRipple(e, { centered: isKeyboard })

      onClick?.(e)
    }

    return (
      <button
        {...props}
        ref={ref}
        type={type}
        disabled={isDisabled}
        data-disabled={isDisabled}
        onClick={handleClick}
        className={cn(
          `${global.prefixCls}-icon-button ${global.prefixCls}-clickable`,
          classNames?.root
        )}
        style={styles?.root}
      >
        <span
          className={cn(`${global.prefixCls}-icon-button-icon`, classNames?.icon)}
          style={styles?.icon}
        >
          {children}
        </span>
      </button>
    )
  }
)

IconButton.displayName = 'IconButton'
