import React from 'react'
import { RadioGroup, type RadioGroupProps } from '../src/RadioGroup'
import { Radio } from '../src/Radio'

export default {
  title: 'Data Entry/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
  args: {
    disabled: false,
    onChange: () => {},
    classNames: {
      radio: 'w-4 h-4 border-1 border-neutral-400 data-[checked=true]:border-neutral-600',
      inner: 'w-3 h-3 bg-neutral-500'
    }
  }
}

export const Default = (args: RadioGroupProps) => (
  <RadioGroup name="Radio" {...args}>
    <Radio value="1" {...args}>
      Option 1
    </Radio>
    <Radio value="2" {...args}>
      Option 2
    </Radio>
    <Radio value="3" {...args}>
      Option 3
    </Radio>
  </RadioGroup>
)
