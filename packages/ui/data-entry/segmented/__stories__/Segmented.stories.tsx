import React from 'react'

import { Segmented, type SegmentedProps } from '..'

export default {
  title: 'Data Entry/Segmented',
  component: Segmented,
  tags: ['autodocs'],
  args: {
    gap: '0.3rem',
    classNames: {
      root: 'w-fit px-2 py-1 bg-neutral-200 border border-neutral-300 rounded-md',
      overlay: 'bg-black/20 rounded-md transition-transform duration-300 ease-in-out',
      item: {
        root: 'cursor-pointer px-2 text-neutral-600 data-[pressed=true]:text-neutral-950 data-[pressed=true]:font-medium'
      }
    },
    items: [
      { id: '1', children: 'Dark' },
      { id: '2', children: 'Light' },
      { id: '3', children: 'System' }
    ]
  }
}

export const Default = (args: SegmentedProps) => <Segmented {...args} />
