import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

export type TableDataProps = React.HTMLAttributes<HTMLTableCellElement>

export const TableData = React.forwardRef<HTMLTableCellElement, TableDataProps>(
  ({ className, style, ...props }, ref) => {
    const { global } = useNSUI()

    return (
      <td
        ref={ref}
        className={cn(`${global.prefixCls}-table-data`, className)}
        style={style}
        {...props}
      />
    )
  }
)

TableData.displayName = 'TableData'
