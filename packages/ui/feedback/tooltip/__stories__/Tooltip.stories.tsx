import React from 'react'

import { Tooltip, type TooltipProps, useTooltip } from '../src'

export default {
  title: 'Feedback/Overlay/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  args: {
    children: 'Tooltip',
    classNames: {
      root: 'bg-neutral-200 px-2 py-1 rounded-md shadow-md border-1 border-neutral-300',
      arrow: 'fill-neutral-200'
    }
  }
}

export const Default = (args: Omit<TooltipProps, 'tooltip'>) => {
  const tooltip = useTooltip()

  return (
    <div>
      <button {...tooltip.triggerProps}>Hover to open</button>
      <Tooltip {...args} tooltip={tooltip}>
        Tooltip Content
      </Tooltip>
    </div>
  )
}
