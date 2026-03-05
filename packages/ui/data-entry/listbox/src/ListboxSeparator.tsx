import { CollectionSeparator, type CollectionSeparatorProps } from '@negative-space/collection'
import React from 'react'

export type ListboxSeparatorProps = CollectionSeparatorProps

export function ListboxSeparator(props: ListboxSeparatorProps) {
  return <CollectionSeparator {...props} />
}

ListboxSeparator.displayName = 'ListboxSeparator'
