import { CollectionGroup, type CollectionGroupProps } from '@negative-space/collection'
import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

export type MenuGroupProps = CollectionGroupProps

export const MenuGroup = ({ classNames, ...props }: MenuGroupProps) => {
  const { global } = useNSUI()

  return (
    <CollectionGroup
      {...props}
      classNames={{
        root: cn(`${global.prefixCls}-menu-group`, classNames?.root),
        heading: cn(`${global.prefixCls}-menu-group-heading`, classNames?.heading)
      }}
    />
  )
}

MenuGroup.displayName = 'MenuGroup'
