import React from 'react'
import { IconButton, type IconButtonProps } from '../src'

export default {
  title: 'Actions/Buttons/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: {
    children: '🔍'
  },
  argTypes: {
    disabled: { control: 'boolean' }
  }
}

export const Default = (args: IconButtonProps) => <IconButton {...args} />
