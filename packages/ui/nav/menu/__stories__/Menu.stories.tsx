import React from 'react'
import { Menu, type MenuProps } from '../src'

export default {
  title: 'Nav/Menu',
  component: Menu,
  tags: ['autodocs'],
  args: {
    items: [
      { item: { content: 'New File' } },
      { item: { content: 'Open' } },
      { item: { content: 'Save' } }
    ]
  }
}

export const Default = (args: MenuProps) => {
  return <Menu {...args} />
}
