import React from 'react'
import { CollectionSeparator, type CollectionSeparatorProps } from '@negative-space/collection'

export type ListboxSeparatorProps = CollectionSeparatorProps

export function ListboxSeparator(props: ListboxSeparatorProps) {
  return <CollectionSeparator {...props} />
}

ListboxSeparator.displayName = 'ListboxSeparator'
