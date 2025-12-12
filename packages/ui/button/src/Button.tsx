import React from 'react'
import { useNSUI } from '@nsui/provider'
import { useRipple } from '@nsui/ripple'
import '@nsui/ripple/ripple.css'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  left?: React.ReactNode
  right?: React.ReactNode
  classNames?: { root?: string; children?: string; left?: string; right?: string }
  styles?: {
    root?: React.CSSProperties
    children?: React.CSSProperties
    left?: React.CSSProperties
    right?: React.CSSProperties
  }
  disableRipple?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, left, right, classNames, styles, disableRipple, onClick, ...props }, ref) => {
    const { prefixCls, transitionDuration } = useNSUI()
    const { createRipple } = useRipple()

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
      if (!disableRipple) createRipple(e)
      onClick?.(e)
    }

    return (
      <button
        {...props}
        ref={ref}
        className={`${prefixCls}-btn ${classNames?.root ?? ''}`}
        onClick={handleClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          transition: 'all ease-in-out',
          transitionDuration: `${transitionDuration}ms`,
          ...styles?.root
        }}
      >
        {left && (
          <span className={`${prefixCls}-btn-left ${classNames?.left ?? ''}`} style={styles?.left}>
            {left}
          </span>
        )}

        <span
          className={`${prefixCls}-btn-content ${classNames?.children ?? ''}`}
          style={styles?.children}
        >
          {children}
        </span>

        {right && (
          <span
            className={`${prefixCls}-btn-right ${classNames?.right ?? ''}`}
            style={styles?.right}
          >
            {right}
          </span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
