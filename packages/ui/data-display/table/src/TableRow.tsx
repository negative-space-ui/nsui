import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, style, ...props }, ref) => {
    const { global } = useNSUI()

    return (
      <tr
        ref={ref}
        className={cn(`${global.prefixCls}-table-row`, className)}
        style={style}
        {...props}
      />
    )
  }
)

TableRow.displayName = 'TableRow'
