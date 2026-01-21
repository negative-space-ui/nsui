import React from 'react'
import { Divider, type DividerProps } from '@negative-space/divider'

export type ListboxSeparatorProps = DividerProps

export const ListboxSeparator = (props: ListboxSeparatorProps) => {
  return <Divider role="separator" {...props} />
}
