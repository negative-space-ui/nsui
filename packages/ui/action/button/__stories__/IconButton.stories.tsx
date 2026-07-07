import React from 'react'

import { IconButton, type IconButtonProps } from '..'

export default {
  title: 'Actions/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: {
    children: '🔍',
    animation: 'ripple'
  },
  argTypes: {
    disabled: { control: 'boolean' }
  }
}

export const Default = (args: IconButtonProps) => <IconButton {...args} />
