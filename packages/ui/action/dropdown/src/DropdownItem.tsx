import { Button, type ButtonProps } from '@negative-space/button'
import { CollectionItem } from '@negative-space/collection'
import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

import { useDropdownContext } from './useDropdownContext'

export interface DropdownItemProps extends Omit<ButtonProps, 'classNames' | 'styles'> {
  classNames?: {
    root?: string
    button?: ButtonProps['classNames']
  }
  styles?: {
    root?: React.CSSProperties
    button?: ButtonProps['styles']
  }
}

export const DropdownItem = ({
  disabled,
  children,
  classNames,
  styles,
  ...props
}: DropdownItemProps) => {
  const { global } = useNSUI()
  const { disabled: groupDisabled } = useDropdownContext()

  const isDisabled = disabled || groupDisabled

  return (
    <CollectionItem
      disabled={isDisabled}
      role="dropdownitem"
      className={cn(`${global.prefixCls}-dropdown-item`, classNames?.root)}
      style={styles?.root}
    >
      <Button
        {...props}
        disabled={isDisabled}
        classNames={classNames?.button}
        styles={styles?.button}
      >
        {children}
      </Button>
    </CollectionItem>
  )
}

DropdownItem.displayName = 'DropdownItem'
