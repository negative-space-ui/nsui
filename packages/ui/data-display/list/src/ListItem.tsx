import React from 'react'
import { cn, useNSUI } from '@negative-space/system'

export interface ListItemProps extends Omit<React.HTMLAttributes<HTMLLIElement>, 'content'> {
  content: React.ReactNode
}

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, content, ...props }, ref) => {
    const { global } = useNSUI()

    return (
      <li {...props} ref={ref} className={cn(`${global.prefixCls}-list-item`, className)}>
        {content}
      </li>
    )
  }
)

ListItem.displayName = 'ListItem'
