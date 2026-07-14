import { CollectionGroup, type CollectionGroupProps } from '@negative-space/collection'
import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

export type ListboxGroupProps = CollectionGroupProps

export function ListboxGroup({ classNames, ...props }: ListboxGroupProps) {
  const { global } = useNSUI()

  return (
    <CollectionGroup
      {...props}
      classNames={{
        root: cn(`${global.prefixCls}-listbox-group`, classNames?.root),
        heading: cn(`${global.prefixCls}-listbox-group-heading`, classNames?.heading)
      }}
    />
  )
}

ListboxGroup.displayName = 'ListboxGroup'
