import React from 'react'

import { Checkbox, type CheckboxProps } from '..'

export default {
  title: 'Data Entry/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: {
    children: 'Checkbox',
    animation: 'pop',
    classNames: {
      field: {
        root: 'cursor-pointer w-fit',
        label: 'w-fit px-4 py-2 border-1 text-lg border-neutral-300 rounded-md'
      },
      checkbox:
        'w-4 h-4 border flex items-center justify-center data-[checked=true]:bg-blue-500 border-neutral-500 data-[checked=true]:border-blue-600 rounded-sm transition-colors will-change-border',
      checkmark: 'w-3 h-3 text-white'
    }
  }
}

export const Default = (args: CheckboxProps) => {
  const [checked, setChecked] = React.useState(args.checked)

  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={(value) => {
        setChecked(value)
        args.onChange?.(value)
      }}
    />
  )
}
