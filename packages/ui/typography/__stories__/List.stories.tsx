import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { List } from '../src/List'

const meta: Meta<typeof List> = {
  title: 'Typography/List',
  component: List,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['ul', 'ol']
    },
    children: {
      control: 'object'
    }
  }
}

export default meta

export const Ordered: StoryObj<typeof List> = {
  args: {
    as: 'ol',
    children: [<li key="1">Item 1</li>, <li key="2">Item 2</li>, <li key="3">Item 3</li>]
  }
}

export const Unordered: StoryObj<typeof List> = {
  args: {
    as: 'ul',
    children: [<li key="1">Item 1</li>, <li key="2">Item 2</li>, <li key="3">Item 3</li>]
  }
}
