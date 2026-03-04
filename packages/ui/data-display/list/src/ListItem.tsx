import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

export type ListItemProps = React.LiHTMLAttributes<HTMLLIElement>

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, children, ...props }, ref) => {
    const { global } = useNSUI()

    return (
      <li {...props} ref={ref} className={cn(`${global.prefixCls}-list-item`, className)}>
        {children}
      </li>
    )
  }
)

ListItem.displayName = 'ListItem'
