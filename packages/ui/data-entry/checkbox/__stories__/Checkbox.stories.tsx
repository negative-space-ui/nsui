import React from 'react'
import { Checkbox, type CheckboxProps } from '../src/Checkbox'

export default {
  title: 'Data Entry/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: {
    children: 'Checkbox'
  }
}

export const Default = (args: CheckboxProps) => <Checkbox {...args} />
