import React from 'react'

import { Sortable, SortableItem, type SortableProps } from '..'

export default {
  title: 'Layout/Sortable',
  component: Sortable,
  tags: ['autodocs'],
  args: {
    classNames: {
      item: { root: 'items-center', handle: 'text-neutral-500 w-4 h-4' }
    }
  }
}

export const Default: React.FC<SortableProps> = (props) => {
  return (
    <Sortable {...props}>
      <SortableItem>Item 1</SortableItem>
      <SortableItem>Item 2</SortableItem>
      <SortableItem>Item 3</SortableItem>
      <SortableItem>Item 4</SortableItem>
      <SortableItem>Item 5</SortableItem>
    </Sortable>
  )
}
