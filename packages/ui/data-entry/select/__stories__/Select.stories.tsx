import React from 'react'

import { Select, type SelectProps } from '..'

export default {
  title: 'Data Entry/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    placeholder: 'Select an option',
    popoverProps: {
      placement: 'right'
    },
    classNames: {
      trigger: {
        root: 'px-2 cursor-pointer bg-neutral-200 rounded-md border border-neutral-300 h-9 w-42',
        suffix: 'ml-auto mr-2'
      },
      listbox: {
        root: 'w-fit',
        option: {
          root: 'w-30 px-2 h-7 rounded-md hover:bg-neutral-100 cursor-pointer data-[selected=true]:bg-neutral-300',
          checkmark: 'ml-auto text-blue-600 h-4 w-4'
        }
      },
      iconButton: {
        root: 'flex items-center',
        icon: 'cursor-pointer w-4 h-4 text-neutral-600 transition-transform duration-600 ease-in-out'
      },
      popover: {
        root: 'px-1 py-1 bg-neutral-200 rounded-md border border-neutral-300',
        arrow: 'fill-neutral-200'
      }
    },
    items: [
      {
        option: {
          value: '1',
          children: 'Option 1'
        }
      },
      {
        option: {
          value: '2',
          children: 'Option 2'
        }
      },
      {
        option: {
          value: '3',
          children: 'Option 3'
        }
      }
    ].map((item) => ({
      option: {
        ...item.option,
        alignItems: 'center'
      }
    }))
  }
}

export const Default = (args: SelectProps) => <Select {...args} />
