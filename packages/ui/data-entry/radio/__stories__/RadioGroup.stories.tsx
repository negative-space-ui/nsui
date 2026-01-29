import React from 'react'
import { RadioGroup, type RadioGroupProps } from '../src'

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
    ],
    classNames: {
      option: {
        radio: 'w-4 h-4 border-1 border-neutral-400 data-[checked=true]:border-neutral-600',
        inner: 'w-2 h-2 bg-neutral-500'
      }
    }
  }
}

export const Default = (args: RadioGroupProps) => <RadioGroup {...args} />
