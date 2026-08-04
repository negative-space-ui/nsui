import { CollectionSubmenu, type CollectionSubmenuProps } from '@negative-space/collection'
import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

import { MenuContext } from './MenuContext'
import { useMenuContext } from './useMenuContext'

type SubmenuClassNames = NonNullable<CollectionSubmenuProps['classNames']>
type SubmenuStyles = NonNullable<CollectionSubmenuProps['styles']>

export interface MenuSubmenuProps extends Omit<
  CollectionSubmenuProps,
  'classNames' | 'styles' | 'disabled'
> {
  classNames?: {
    heading?: string
    popover?: SubmenuClassNames['popover']
  }
  styles?: {
    heading?: React.CSSProperties
    popover?: SubmenuStyles['popover']
  }
  disabled?: boolean
}

export const MenuSubmenu = ({ classNames, styles, disabled, ...props }: MenuSubmenuProps) => {
  const { global } = useNSUI()
  const { disabled: groupDisabled } = useMenuContext()

  const isDisabled = disabled || groupDisabled

  return (
    <MenuContext.Provider value={{ disabled: isDisabled, collapsed: false }}>
      <CollectionSubmenu
        {...props}
        disabled={isDisabled}
        classNames={{
          heading: cn(`${global.prefixCls}-menu-submenu`, classNames?.heading),
          popover: classNames?.popover
        }}
        styles={{
          heading: styles?.heading,
          popover: styles?.popover
        }}
      />
    </MenuContext.Provider>
  )
}

MenuSubmenu.displayName = 'MenuSubmenu'
