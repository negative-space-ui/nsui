import { CollectionSubmenu, type CollectionSubmenuProps } from '@negative-space/collection'
import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

import { DropdownContext } from './dropdownContext'
import { useDropdownContext } from './useDropdownContext'

type SubmenuClassNames = NonNullable<CollectionSubmenuProps['classNames']>
type SubmenuStyles = NonNullable<CollectionSubmenuProps['styles']>

export interface DropdownSubmenuProps extends Omit<
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

export const DropdownSubmenu = ({
  classNames,
  styles,
  disabled,
  ...props
}: DropdownSubmenuProps) => {
  const { global } = useNSUI()
  const { disabled: groupDisabled } = useDropdownContext()

  const isDisabled = disabled || groupDisabled

  return (
    <DropdownContext.Provider value={{ disabled: isDisabled }}>
      <CollectionSubmenu
        {...props}
        disabled={isDisabled}
        classNames={{
          heading: cn(`${global.prefixCls}-dropdown-submenu`, classNames?.heading),
          popover: classNames?.popover
        }}
        styles={{
          heading: styles?.heading,
          popover: styles?.popover
        }}
      />
    </DropdownContext.Provider>
  )
}

DropdownSubmenu.displayName = 'DropdownSubmenu'
