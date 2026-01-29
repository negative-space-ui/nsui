import React from 'react'
import { Checkbox, type CheckboxProps } from '../src/Checkbox'

export default {
  title: 'Data Entry/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: {
    children: 'Checkbox',
    disabled: false,
    onChange: () => {},
    classNames: {
      label: 'w-fit px-4 py-2 border-1 border-neutral-300 rounded-md',
      checkbox:
        'w-4 h-4 border-1 border-neutral-500 data-[checked=true]:border-neutral-600 rounded-sm transition-colors will-change-border',
      checkboxInner: 'bg-neutral-600'
    },
    checkmarkProps: { className: 'text-[12px] text-neutral-600' }
  }
}

export const Default = (args: CheckboxProps) => <Checkbox {...args} />
