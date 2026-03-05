import { Popover, type PopoverProps } from '@negative-space/popover'
import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

import { type TooltipHandle } from './useTooltip'

export interface TooltipProps extends Omit<PopoverProps, 'popover'> {
  tooltip: TooltipHandle
}

export const Tooltip = ({ tooltip, classNames, ...popoverProps }: TooltipProps) => {
  const { global } = useNSUI()

  return (
    <Popover
      {...popoverProps}
      popover={tooltip}
      role="tooltip"
      classNames={{
        root: cn(`${global.prefixCls}-tooltip`, classNames?.root),
        content: cn(`${global.prefixCls}-tooltip-content`, classNames?.content),
        arrow: cn(`${global.prefixCls}-tooltip-arrow`, classNames?.arrow),
        overlay: cn(`${global.prefixCls}-tooltip-overlay`, classNames?.overlay)
      }}
    />
  )
}
