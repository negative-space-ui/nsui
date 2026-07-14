import React from 'react'

import { Listbox, type ListboxProps } from '..'

export default {
  title: 'Data Entry/Listbox',
  component: Listbox,
  tags: ['autodocs'],
  args: {
    defaultValue: '2',
    classNames: {
      root: 'w-26',
      option: {
        root: 'cursor-pointer',
        checkmark: 'w-4 h-4 text-blue-600'
      }
    },
    items: [
      { option: { value: '1', children: 'Option 1' } },
      { option: { value: '2', children: 'Option 2' } },
      { option: { value: '3', children: 'Option 3' } }
    ].map((item) => ({
      option: {
        ...item.option,
        alignItems: 'center',
        gap: '0.4rem'
      }
    }))
  }
}

export const Default = (args: ListboxProps) => {
  return <Listbox {...args} onValueChange={(v) => console.log('Selected:', v)} />
}
