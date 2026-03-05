import React from 'react'

import { InputPassword, type InputPasswordProps } from '../src/'

export default {
  title: 'Data Entry/Inputs/Password',
  component: InputPassword,
  tags: ['autodocs'],
  args: {
    loading: false,
    placeholder: 'Enter your password',
    classNames: {
      root: 'w-60 h-8 border-1 border-gray-400 px-2 py-1 rounded-md focus-within:border-gray-600',
      icon: 'text-gray-500 hover:text-gray-700 w-5 h-5',
      spinner: 'w-4 h-4 border-3 border-solid border-neutral-300 border-t-blue-400',
      tooltip: {
        root: 'bg-neutral-200 px-2 py-1 rounded-md shadow-md border-1 border-neutral-300',
        arrow: 'fill-neutral-200'
      }
    }
  }
}

export const Default = (args: InputPasswordProps) => <InputPassword {...args} />
