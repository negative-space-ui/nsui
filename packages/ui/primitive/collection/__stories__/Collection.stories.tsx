import React from 'react'

import {
  Collection,
  CollectionGroup,
  CollectionItem,
  type CollectionProps,
  CollectionSeparator
} from '..'

export default {
  title: 'Primitive/Collection',
  component: Collection,
  tags: ['autodocs'],
  args: {
    children: [
      <CollectionGroup heading="Group 1">
        <CollectionItem>Item 1</CollectionItem>
        <CollectionItem>Item 2</CollectionItem>
      </CollectionGroup>,
      <CollectionSeparator />,
      <CollectionGroup heading="Group 2">
        <CollectionItem>Item 3</CollectionItem>
        <CollectionItem>Item 4</CollectionItem>
      </CollectionGroup>
    ]
  }
}

export const Default = (args: CollectionProps) => <Collection {...args} />
