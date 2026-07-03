import { useRipple } from '@negative-space/ripple'
import { type ClickableAnimation, cn, useNSUI } from '@negative-space/system'
import React from 'react'

import { useButtonContextConditional } from './useButtonContext'

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  controlled?: boolean
  animation?: ClickableAnimation
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, controlled, type = 'button', disabled, animation, onClick, ...props }, ref) => {
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
        className={cn(`${global.prefixCls}-icon-btn ${global.prefixCls}-clickable`, className)}
      />
    )
  }
)

IconButton.displayName = 'IconButton'
