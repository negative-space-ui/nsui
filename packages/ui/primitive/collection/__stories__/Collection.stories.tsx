import React from 'react'

import {
  Collection,
  CollectionGroup,
  CollectionItem,
  type CollectionProps,
  CollectionSeparator,
  CollectionSubmenu
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
        <CollectionSubmenu
          heading="Submenu"
          classNames={{
            heading: 'cursor-default',
            popover: { content: 'bg-neutral-200 p-2 rounded-md' }
          }}
        >
          <CollectionItem>Subitem 1</CollectionItem>
          <CollectionItem>Subitem 2</CollectionItem>
          <CollectionItem>Subitem 3</CollectionItem>
        </CollectionSubmenu>
      </CollectionGroup>
    ]
  }
}

export const Default = (args: CollectionProps) => <Collection {...args} />
