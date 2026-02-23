import React from 'react'
import { Input, type InputProps } from '../src'

export default {
  title: 'Data Entry/Inputs/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    classNames: {
      root: 'border-1 border-gray-400 px-2 py-1 rounded-md focus-within:border-gray-600'
    },
    placeholder: 'Input placeholder'
  }
}

export const Default = (args: InputProps) => <Input {...args} />
