import React from 'react'
import { Collection, type CollectionProps } from '../src'

export default {
  title: 'Primitive/Collection',
  component: Collection,
  tags: ['autodocs']
}

export const Default = (args: CollectionProps) => <Collection {...args} />
