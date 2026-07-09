import { useRipple } from '@negative-space/ripple'
import { type ClickableAnimation, cn, useNSUI } from '@negative-space/system'
import React from 'react'

import { useButtonContextConditional } from './useButtonContext'

type IconChildProps = {
  className?: string
  style?: React.CSSProperties
}

export interface IconButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'className' | 'style'
> {
  children: React.ReactElement<IconChildProps>
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
      children,
      onClick,
      classNames,
      styles,
      controlled,
      type = 'button',
      disabled,
      animation,
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

    const child = React.cloneElement(children, {
      className: cn(
        `${global.prefixCls}-icon-button-icon`,
        classNames?.icon,
        children.props.className
      ),
      style: {
        ...styles?.icon,
        ...children.props.style
      }
    })

    return (
      <button
        {...props}
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        data-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
        onClick={handleClick}
        className={cn(`${global.prefixCls}-icon-button`, classNames?.root)}
        style={styles?.root}
      >
        {child}
      </button>
    )
  }
)

IconButton.displayName = 'IconButton'
