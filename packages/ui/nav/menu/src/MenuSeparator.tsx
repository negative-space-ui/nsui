import React from 'react'
import { Divider, type DividerProps } from '@negative-space/divider'

export type MenuSeparatorProps = DividerProps

export const MenuSeparator = (props: MenuSeparatorProps) => {
  return <Divider role="separator" {...props} />
}
