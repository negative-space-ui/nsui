import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { List, ListProps } from '../src/List'

const unorderedMarkers = ['disc', 'circle', 'square'] as const
const orderedMarkers = [
  'decimal',
  'decimal-leading-zero',
  'lower-alpha',
  'upper-alpha',
  'lower-roman',
  'upper-roman'
] as const

type ListUnionProps = ListProps<'ul'> | ListProps<'ol'>

const meta: Meta<ListUnionProps> = {
  title: 'Typography/List',
  component: List,
  tags: ['autodocs'],
  args: {
    children: [<li key="1">Item 1</li>, <li key="2">Item 2</li>, <li key="3">Item 3</li>]
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['ul', 'ol']
    },
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal']
    },
    marker: {
      control: 'select',
      options: [...unorderedMarkers, ...orderedMarkers, 'none']
    },
    children: {
      control: 'object'
    }
  }
}

export default meta

export const Default: StoryObj<ListUnionProps> = {}

export const Ordered: StoryObj<ListProps<'ol'>> = {
  args: {
    as: 'ol',
    marker: 'decimal'
  },
  argTypes: {
    marker: {
      control: 'select',
      options: [...orderedMarkers, 'none']
    }
  }
}

export const Unordered: StoryObj<ListProps<'ul'>> = {
  args: {
    as: 'ul',
    marker: 'disc'
  },
  argTypes: {
    marker: {
      control: 'select',
      options: [...unorderedMarkers, 'none']
    }
  }
}

export const Horizontal: StoryObj<ListProps<'ul'>> = {
  args: {
    as: 'ul',
    direction: 'horizontal'
  }
}
