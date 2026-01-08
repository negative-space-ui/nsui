import React from 'react'
import { Collection, type CollectionRootProps } from '../src'

export default {
  title: 'Primitive/Collection',
  component: Collection,
  tags: ['autodocs'],
  args: {
    className: 'w-fit',
    components: [
      { group: { label: 'Group 1' } },
      { item: { children: 'Item 1' } },
      { item: { children: 'Item 2' } },
      { separator: { className: 'w-full px-4 border-1 border-neutral-200' } },
      { group: { label: 'Group 2' } },
      { item: { children: 'Item 3' } },
      { item: { children: 'Item 4' } }
    ]
  }
}

export const Default = (args: CollectionRootProps) => <Collection {...args} />
