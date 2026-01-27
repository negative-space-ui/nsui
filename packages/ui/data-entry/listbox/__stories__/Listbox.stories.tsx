import React from 'react'
import { Listbox, type ListboxProps } from '../src'

export default {
  title: 'Data Entry/Listbox',
  component: Listbox,
  tags: ['autodocs'],
  args: {
    defaultValue: '2',
    classNames: {
      checkmark: 'w-4 h-4 text-neutral-600'
    },
    items: [
      { option: { value: '1', children: 'Option 1' } },
      { option: { value: '2', children: 'Option 2' } },
      { option: { value: '3', children: 'Option 3' } }
    ]
  }
}

export const Default = (args: ListboxProps) => {
  return <Listbox {...args} onValueChange={(v) => console.log('Selected:', v)} />
}
