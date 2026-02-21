import React from 'react'
import { Checkmark, type CheckmarkProps } from '../src'

export default {
  title: 'Feedback/Checkmark',
  component: Checkmark,
  tags: ['autodocs'],
  args: {
    checked: true,
    className: 'w-6 h-6 text-neutral-600'
  }
}

export const Default = (args: CheckmarkProps) => <Checkmark {...args} />
