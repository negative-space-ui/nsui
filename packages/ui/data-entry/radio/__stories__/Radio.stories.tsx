import React from 'react'
import { RadioGroup, type RadioGroupProps } from '../src/RadioGroup'
import { Radio } from '../src/Radio'

export default {
  title: 'Data Entry/Radio',
  component: RadioGroup,
  tags: ['autodocs']
}

export const Default = (args: RadioGroupProps) => (
  <RadioGroup name="Radio" {...args}>
    <Radio value="1">Option 1</Radio>
    <Radio value="2">Option 2</Radio>
    <Radio value="3">Option 3</Radio>
  </RadioGroup>
)
