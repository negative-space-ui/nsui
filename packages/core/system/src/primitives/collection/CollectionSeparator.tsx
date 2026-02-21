import React from 'react'
import { Divider, type DividerProps } from '@negative-space/divider'

export type CollectionSeparatorProps = Omit<DividerProps, 'role'>

export function CollectionSeparator(props: CollectionSeparatorProps) {
  return <Divider role="separator" {...props} />
}

CollectionSeparator.displayName = 'CollectionSeparator'
