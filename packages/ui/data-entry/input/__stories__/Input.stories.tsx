import React from 'react'

import { Input, type InputProps } from '../src'

export default {
  title: 'Data Entry/Inputs/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    classNames: {
      root: 'w-60 h-8 border-1 border-gray-400 px-2 py-1 rounded-md focus-within:border-gray-600',
      spinner: 'w-4 h-4 border-2 border-solid border-neutral-300 border-t-blue-400'
    },
    placeholder: 'Input placeholder'
  }
}

export const Default = (args: InputProps) => <Input {...args} />
