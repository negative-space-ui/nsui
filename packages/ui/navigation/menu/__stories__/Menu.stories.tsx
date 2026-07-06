import React from 'react'

import { Menu, type MenuProps } from '../src'

export default {
  title: 'Nav/Menu',
  component: Menu,
  tags: ['autodocs']
}

export const Default = (args: MenuProps) => {
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <Menu
      {...args}
      collapsed={collapsed}
      items={[
        {
          item: {
            prefix: collapsed ? '➡️' : '⬅️',
            content: collapsed ? 'Expand Menu' : 'Collapse Menu',
            onClick: () => setCollapsed((v) => !v)
          }
        },
        {
          item: {
            prefix: '📂',
            content: 'New File',
            href: 'https://example.com'
          }
        },
        {
          item: {
            prefix: '🔍',
            content: 'Open'
          }
        },
        {
          item: {
            prefix: '💾',
            content: 'Save'
          }
        }
      ]}
    />
  )
}
