import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, style, ...props }, ref) => {
    const { global } = useNSUI()

    return (
      <tbody
        ref={ref}
        className={cn(`${global.prefixCls}-table-body`, className)}
        style={style}
        {...props}
      />
    )
  }
)

TableBody.displayName = 'TableBody'
