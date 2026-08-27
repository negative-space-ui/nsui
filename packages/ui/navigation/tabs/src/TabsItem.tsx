import { Link, type LinkProps } from '@negative-space/link'
import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

export type TabsItemProps = LinkProps

export const TabsItem = React.forwardRef<HTMLAnchorElement, TabsItemProps>(
  ({ className, ...props }, ref) => {
    const { global } = useNSUI()

    return <Link {...props} ref={ref} className={cn(`${global.prefixCls}-tabs-item`, className)} />
  }
)

TabsItem.displayName = 'TabsItem'
