import React from 'react'
import { CollectionSeparator, type CollectionSeparatorProps } from '@negative-space/system'

export type ListboxSeparatorProps = CollectionSeparatorProps

export function ListboxSeparator(props: ListboxSeparatorProps) {
  return <CollectionSeparator {...props} />
}

ListboxSeparator.displayName = 'ListboxSeparator'
