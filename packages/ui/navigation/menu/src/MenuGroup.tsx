import { CollectionGroup, type CollectionGroupProps } from '@negative-space/collection'
import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

export type MenuGroupProps = CollectionGroupProps

export const MenuGroup = ({ classNames, styles, ...props }: MenuGroupProps) => {
  const { global } = useNSUI()

  return (
    <CollectionGroup
      {...props}
      classNames={{
        root: cn(`${global.prefixCls}-menu-group`, classNames?.root),
        label: cn(`${global.prefixCls}-menu-group-label`, classNames?.label)
      }}
      styles={styles}
    />
  )
}

MenuGroup.displayName = 'MenuGroup'
