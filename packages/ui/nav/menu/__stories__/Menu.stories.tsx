import React from 'react'
import { Menu, type MenuProps } from '../src'

export default {
  title: 'Nav/Menu',
  component: Menu,
  tags: ['autodocs'],
  args: {
    items: [
      {
        item: {
          content: 'New File',
          href: 'https://example.com'
        }
      },
      { item: { content: 'Open' } },
      { item: { content: 'Save' } }
    ]
  }
}

export const Default = (args: MenuProps) => {
  return <Menu {...args} />
}
