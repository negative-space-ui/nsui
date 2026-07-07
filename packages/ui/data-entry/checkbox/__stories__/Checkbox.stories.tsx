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
      label: 'w-fit px-4 py-2 border-1 border-neutral-300 rounded-md',
      checkbox:
        'w-4 h-4 border-1 border-neutral-500 data-[checked=true]:border-neutral-600 rounded-sm transition-colors will-change-border',
      checkmark: 'w-4 h-4 text-neutral-800'
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
