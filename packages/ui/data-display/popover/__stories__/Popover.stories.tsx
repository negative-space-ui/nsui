import React from 'react'

import { Popover, type PopoverProps } from '../src'
import { usePopover } from '../src'

export default {
  title: 'Data Display/Overlay/Popover',
  component: Popover,
  tags: ['autodocs'],
  args: {
    classNames: {
      root: 'bg-neutral-200 px-2 py-1 rounded-md shadow-md border-1 border-neutral-300',
      overlay: 'bg-black/20 backdrop-blur-[2px]',
      arrow: 'fill-neutral-200'
    }
  }
}

export const Click = (args: Omit<PopoverProps, 'popover'>) => {
  const popover = usePopover({ placement: 'right', trigger: 'click' })

  return (
    <div>
      <button {...popover.triggerProps} className="cursor-pointer">
        Click to open
      </button>
      <Popover {...args} popover={popover}>
        Popover Content
      </Popover>
    </div>
  )
}

export const Hover = (args: Omit<PopoverProps, 'popover'>) => {
  const popover = usePopover({
    placement: 'right',
    trigger: 'hover',
    hoverDelay: { open: 100, close: 150 }
  })

  return (
    <div>
      <button {...popover.triggerProps}>Hover to open</button>
      <Popover {...args} popover={popover}>
        Popover Content
      </Popover>
    </div>
  )
}

export const Press = (args: Omit<PopoverProps, 'popover'>) => {
  const popover = usePopover({ placement: 'right', trigger: 'press' })

  return (
    <div>
      <button {...popover.triggerProps} className="cursor-pointer">
        Hold to open
      </button>
      <Popover {...args} popover={popover}>
        Popover Content
      </Popover>
    </div>
  )
}

export const Overlay = (args: Omit<PopoverProps, 'popover'>) => {
  const popover = usePopover({ placement: 'right', overlay: true })

  return (
    <div>
      <button {...popover.triggerProps} className="cursor-pointer">
        Click to open
      </button>
      <Popover {...args} popover={popover}>
        Popover Content
      </Popover>
    </div>
  )
}
