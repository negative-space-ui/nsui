import React from 'react'
import { Divider, type DividerProps } from '../src/Divider'

export default {
  title: 'Layout/Divider',
  component: Divider,
  tags: ['autodocs'],
  args: {
    className: 'w-md border-1 border-neutral-300'
  }
}

export const Default = (args: DividerProps) => <Divider {...args} />
