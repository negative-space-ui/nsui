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
      classNames={{
        item: { root: 'cursor-pointer' },
        submenu: { popover: { content: 'bg-neutral-100 p-2 rounded-md' } }
      }}
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
          group: {
            prefix: '🍿',
            heading: 'Group',
            classNames: {
              heading: 'text-neutral-500 font-medium'
            },
            items: [
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
            ]
          }
        }
      ]}
    />
  )
}
