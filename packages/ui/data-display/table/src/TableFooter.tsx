import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

export type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement>

export const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, style, ...props }, ref) => {
    const { global } = useNSUI()

    return (
      <tfoot
        ref={ref}
        className={cn(`${global.prefixCls}-table-foot`, className)}
        style={style}
        {...props}
      />
    )
  }
)

TableFooter.displayName = 'TableFooter'
