import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

export type TableHeaderProps = React.HTMLAttributes<HTMLTableCellElement>

export const TableHeader = React.forwardRef<HTMLTableCellElement, TableHeaderProps>(
  ({ className, style, ...props }, ref) => {
    const { global } = useNSUI()

    return (
      <th
        ref={ref}
        className={cn(`${global.prefixCls}-table-header`, className)}
        style={style}
        {...props}
      />
    )
  }
)

TableHeader.displayName = 'TableHeader'
