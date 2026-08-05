import { CollectionGroup, type CollectionGroupProps } from '@negative-space/collection'
import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

export type DropdownGroupProps = CollectionGroupProps

export const DropdownGroup = ({ classNames, children, ...props }: DropdownGroupProps) => {
  const { global } = useNSUI()

  return (
    <CollectionGroup
      {...props}
      classNames={{
        root: cn(`${global.prefixCls}-dropdown-group`, classNames?.root),
        heading: cn(`${global.prefixCls}-dropdown-group-heading`, classNames?.heading)
      }}
    >
      {children}
    </CollectionGroup>
  )
}

DropdownGroup.displayName = 'DropdownGroup'
