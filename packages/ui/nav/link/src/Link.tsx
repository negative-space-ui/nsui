import React from 'react'
import { cn, useNSUI } from '@negative-space/system'

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean
  underline?: boolean
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { className, disabled = false, underline, target, rel, ...rest } = props

  const { global, components } = useNSUI()

  const Underline = underline ?? components.link.underline

  const isExternal = target === '_blank'

  return (
    <a
      ref={ref}
      {...rest}
      rel={isExternal ? 'noopener noreferrer' : rel}
      target={target}
      aria-disabled={disabled}
      data-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      onClick={disabled ? (e) => e.preventDefault() : props.onClick}
      className={cn(
        `${global.prefixCls}-link ${Underline ? `${global.prefixCls}-link-underline` : ''}`,
        className
      )}
    />
  )
})

Link.displayName = 'Link'
