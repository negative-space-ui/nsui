import { CollectionSeparator, type CollectionSeparatorProps } from '@negative-space/collection'
import React from 'react'

export type DropdownSeparatorProps = CollectionSeparatorProps

export const DropdownSeparator = (props: DropdownSeparatorProps) => (
  <CollectionSeparator {...props} />
)

DropdownSeparator.displayName = 'DropdownSeparator'
