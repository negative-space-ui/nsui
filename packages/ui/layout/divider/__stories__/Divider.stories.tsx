import React from 'react'

import { Divider, type DividerProps } from '..'

export default {
  title: 'Layout/Divider',
  component: Divider,
  tags: ['autodocs'],
  args: {
    className:
      'data-[orientation=horizontal]:h-0.5 border-2 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-70 data-[orientation=vertical]:w-0.5 border-neutral-200'
  }
}

export const Default = (args: DividerProps) => <Divider {...args} />

export const Vertical = (args: DividerProps) => <Divider {...args} orientation="vertical" />
