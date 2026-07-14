import React from 'react'

import { IconButton, type IconButtonProps } from '..'

export default {
  title: 'Actions/Icon button',
  component: IconButton,
  tags: ['autodocs'],
  args: {
    children: '🔍',
    classNames: { root: 'cursor-pointer' },
    animation: 'ripple'
  },
  argTypes: {
    disabled: { control: 'boolean' }
  }
}

export const Default = (args: IconButtonProps) => <IconButton {...args} />
