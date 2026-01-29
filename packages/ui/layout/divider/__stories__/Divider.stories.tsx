import React from 'react'
import { Divider, type DividerProps } from '../src/Divider'

export default {
  title: 'Layout/Divider',
  component: Divider,
  tags: ['autodocs'],
  args: {
    className: 'w-md h-0.5 bg-neutral-300'
  }
}

export const Default = (args: DividerProps) => <Divider {...args} />

export const Vertical = (args: DividerProps) => (
  <Divider {...args} orientation="vertical" className="h-70 w-0.5 bg-neutral-300" />
)
