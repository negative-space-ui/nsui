import React from 'react'
import { Spinner, type SpinnerProps } from './Spinner'

export default {
  title: 'Feedback/Loaders/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    className: { control: { type: 'text' } },
    style: { control: { type: 'text' } }
  }
}

export const Default = (args: SpinnerProps) => (
  <Spinner
    className="w-8 h-8 border-4 border-solid border-neutral-300 border-t-blue-500"
    {...args}
  />
)
