import React from 'react'

import { RadioGroup, type RadioGroupProps } from '..'

export default {
  title: 'Data Entry/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
  args: {
    disabled: false,
    onChange: () => {},
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' }
    ].map((item) => ({ ...item, alignItems: 'center', gap: '0.4rem' })),
    classNames: {
      option: {
        root: 'cursor-pointer',
        radio:
          'w-4 cursor-pointer h-4 rounded-full border-1 border-neutral-400 data-[checked=true]:border-neutral-600',
        inner: 'w-2 h-2 bg-blue-600'
      }
    }
  }
}

export const Default = (args: RadioGroupProps) => <RadioGroup {...args} />
