import React from 'react'
import { InputPassword, type InputPasswordProps } from '../src/'

export default {
  title: 'Data Entry/Inputs/Password',
  component: InputPassword,
  tags: ['autodocs'],
  args: {
    placeholder: 'Enter your password',
    classNames: {
      root: 'border-1 border-gray-400 px-2 py-1 rounded-md focus-within:border-gray-600',
      button: 'w-5 h-4 text-gray-500 hover:text-gray-700'
    }
  }
}

export const Default = (args: InputPasswordProps) => <InputPassword {...args} />
