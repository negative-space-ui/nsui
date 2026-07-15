import React from 'react'

import { Menu, type MenuProps } from '..'

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
      classNames={{ item: { root: 'cursor-pointer' } }}
      gap="0.4rem"
      collapsed={collapsed}
      items={[
        {
          item: {
            prefix: collapsed ? '➡️' : '⬅️',
            children: collapsed ? 'Expand Menu' : 'Collapse Menu',
            onClick: () => setCollapsed((v) => !v)
          }
        },
        {
          item: {
            prefix: '📂',
            children: 'New File',
            href: 'https://example.com'
          }
        },
        {
          item: {
            prefix: '🔍',
            children: 'Open'
          }
        },
        {
          item: {
            prefix: '💾',
            children: 'Save'
          }
        }
      ]}
    />
  )
}
