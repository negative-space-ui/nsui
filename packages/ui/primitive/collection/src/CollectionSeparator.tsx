import React from 'react'
import { Divider, type DividerProps } from '@negative-space/divider'

export type CollectionSeparatorProps = DividerProps

export const CollectionSeparator = (props: CollectionSeparatorProps) => {
  return <Divider role="separator" {...props} />
}
