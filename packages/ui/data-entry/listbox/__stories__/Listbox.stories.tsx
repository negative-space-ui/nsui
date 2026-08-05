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
      {
        group: {
          heading: 'Group 1',
          classNames: {
            root: 'mb-2',
            heading: 'text-neutral-500 font-medium'
          },
          items: [
            {
              option: {
                value: '1',
                children: 'Option 1',
                alignItems: 'center',
                gap: '0.4rem'
              }
            }
          ]
        }
      },
      { option: { value: '2', children: 'Option 2', alignItems: 'center', gap: '0.4rem' } },
      { option: { value: '3', children: 'Option 3', alignItems: 'center', gap: '0.4rem' } }
    ]
  }
}

export const Default = (args: ListboxProps) => {
  return <Listbox {...args} onValueChange={(v) => console.log('Selected:', v)} />
}
