import React from 'react'

import { Dropdown, type DropdownProps, useDropdown } from '..'

export default {
  title: 'Action/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  args: {
    classNames: {
      root: 'bg-neutral-200 px-2 py-1 rounded-md shadow-md border border-neutral-300',
      arrow: 'fill-neutral-200',
      group: {
        root: 'text-neutral-800'
      },
      item: {
        button: {
          root: 'cursor-pointer'
        }
      },
      separator: 'bg-neutral-300 px-2 py-1 rounded-md shadow-md border border-neutral-300'
    },

    items: [
      {
        group: {
          heading: 'Files',
          items: [
            {
              item: {
                prefix: '📂',
                children: 'File',
                onClick: () => alert('File clicked'),
                value: 'file'
              }
            },
            {
              item: {
                prefix: '🔍',
                children: 'Open',
                onClick: () => alert('Open clicked'),
                value: 'open'
              }
            }
          ]
        }
      }
    ]
  }
}

export const Default = (args: Omit<DropdownProps, 'dropdown'>) => {
  const dropdown = useDropdown({
    placement: 'right'
  })

  return (
    <div>
      <button
        ref={dropdown.referenceRef}
        {...dropdown.getReferenceProps()}
        className="cursor-pointer"
      >
        Open dropdown
      </button>

      <Dropdown {...args} dropdown={dropdown} />
    </div>
  )
}
