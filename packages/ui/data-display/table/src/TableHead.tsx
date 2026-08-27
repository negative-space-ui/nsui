import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

export type TableHeadProps = React.HTMLAttributes<HTMLTableSectionElement>

export const TableHead = React.forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ className, style, ...props }, ref) => {
    const { global } = useNSUI()

    return (
      <thead
        ref={ref}
        className={cn(`${global.prefixCls}-table-head`, className)}
        style={style}
        {...props}
      />
    )
  }
)

TableHead.displayName = 'TableHead'
