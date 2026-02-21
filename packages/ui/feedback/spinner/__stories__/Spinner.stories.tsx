import React from 'react'
import { Spinner, type SpinnerProps } from '../src'

export default {
  title: 'Feedback/Loaders/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  args: {
    className: 'w-8 h-8 border-4 border-solid border-neutral-300 border-t-blue-500',
    isLoading: true
  },
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' }
  }
}

export const Default = (args: SpinnerProps) => <Spinner {...args} />
