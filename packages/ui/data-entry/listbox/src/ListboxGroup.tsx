import React from 'react'
import { cn, useNSUI } from '@negative-space/system'
import { CollectionGroup, type CollectionGroupProps } from '@negative-space/system'

export type ListboxGroupProps = CollectionGroupProps

export function ListboxGroup({ children, classNames, styles, label, ...props }: ListboxGroupProps) {
  const { global } = useNSUI()

  return (
    <CollectionGroup
      {...props}
      label={label}
      classNames={{
        root: cn(`${global.prefixCls}-listbox-group`, classNames?.root),
        label: cn(`${global.prefixCls}-listbox-group-label`, classNames?.label)
      }}
      styles={styles}
    >
      {children}
    </CollectionGroup>
  )
}

ListboxGroup.displayName = 'ListboxGroup'
