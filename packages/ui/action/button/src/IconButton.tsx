import React from 'react'
import { useRipple } from '@negative-space/ripple'
import { cn, useNSUI } from '@negative-space/system'
import { useButtonContextConditional } from './useButtonContext'

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  controlled?: boolean
  isRippleDisabled?: boolean
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, controlled, style, disabled, isRippleDisabled, onClick, ...props }, ref) => {
    const { global, components } = useNSUI()
    const rippleDisabled = isRippleDisabled ?? components.iconButton.isRippleDisabled

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
        ref={ref}
        disabled={isDisabled}
        data-disabled={isDisabled}
        onClick={handleClick}
        className={cn(`${global.prefixCls}-icon-btn ${global.prefixCls}-clickable`, className)}
        style={style}
        {...props}
      />
    )
  }
)

IconButton.displayName = 'IconButton'
