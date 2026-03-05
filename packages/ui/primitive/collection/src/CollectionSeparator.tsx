import { Divider, type DividerProps } from '@negative-space/divider'
import React from 'react'

export type CollectionSeparatorProps = Omit<DividerProps, 'role'>

export function CollectionSeparator(props: CollectionSeparatorProps) {
  return <Divider role="separator" {...props} />
}

CollectionSeparator.displayName = 'CollectionSeparator'
