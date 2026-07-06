import React from 'react'

import { Select, type SelectProps } from '../src'

export default {
  title: 'Data Entry/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    children: 'Select',
    classNames: {
      trigger: {
        btn: 'p-2 bg-neutral-200 rounded-md border border-neutral-300 w-20'
      },
      popover: { root: 'px-1 py-1 bg-neutral-200 rounded-md border border-neutral-300' }
    },
    items: [
      {
        option: { value: '1', children: 'Option 1' }
      }
    ]
  }
}

export const Default = (args: SelectProps) => <Select {...args} />
