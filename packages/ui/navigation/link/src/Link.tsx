import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean
  underline?: boolean
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, style, disabled = false, underline, onClick, target, rel, ...props }, ref) => {
    const { global, components } = useNSUI()

    const Underline = underline ?? components.link.underline

    const isExternal = target === '_blank'

    return (
      <a
        {...props}
        ref={ref}
        rel={isExternal ? 'noopener noreferrer' : rel}
        target={target}
        aria-disabled={disabled}
        data-disabled={disabled}
        data-underline={Underline}
        tabIndex={disabled ? -1 : undefined}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        className={cn(`${global.prefixCls}-link`, className)}
        style={{
          textDecoration: Underline ? 'underline' : 'none',
          ...style
        }}
      />
    )
  }
)

Link.displayName = 'Link'
