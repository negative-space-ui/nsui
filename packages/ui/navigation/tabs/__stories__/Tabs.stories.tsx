import React from 'react'

import { Tabs, type TabsProps } from '..'

export default {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {
    gap: '0.5rem',
    items: [
      {
        id: '1',
        children: 'Tab 1'
      },
      {
        id: '2',
        children: 'Tab 2'
      },
      {
        id: '3',
        children: 'Tab 3'
      }
    ],
    classNames: {
      root: 'cursor-pointer',
      overlay: 'bg-neutral-500 h-[2px] rounded-md transition-transform duration-300 ease-in-out'
    }
  }
}

export const Default = (args: TabsProps) => <Tabs {...args} />
