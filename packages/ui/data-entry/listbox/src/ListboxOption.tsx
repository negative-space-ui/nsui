import { Checkmark, type CheckmarkProps } from '@negative-space/checkmark'
import { CollectionItem, type CollectionItemProps } from '@negative-space/collection'
import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

import { useListboxContext } from './useListboxContext'

export interface ListboxOptionProps extends Omit<
  CollectionItemProps,
  'style' | 'className' | 'onClick' | 'selected' | 'value'
> {
  classNames?: {
    root?: string
    checkmark?: string
  }
  styles?: {
    root?: React.CSSProperties
    checkmark?: React.CSSProperties
  }
  value: string
  checkmarkProps?: Omit<CheckmarkProps, 'checked' | 'className' | 'style'>
  onClick?: (value: string, event: React.MouseEvent<HTMLLIElement>) => void
}

export function ListboxOption({
  children,
  classNames,
  styles,
  value,
  disabled,
  checkmarkProps,
  onClick,
  ...props
}: ListboxOptionProps) {
  const { global } = useNSUI()
  const ctx = useListboxContext()

  const { value: selectedValue, onChange, selectionMode, disabled: groupDisabled } = ctx
  const isDisabled = disabled ?? groupDisabled ?? false

  const isSelected =
    selectionMode === 'multiple'
      ? Array.isArray(selectedValue) && selectedValue.includes(value)
      : selectedValue === value

  const select = () => {
    if (isDisabled) return
    if (selectionMode === 'multiple') {
      const current = Array.isArray(selectedValue) ? selectedValue : []
      onChange?.(isSelected ? current.filter((v) => v !== value) : [...current, value])
    } else {
      onChange?.(value)
    }
  }

  const handleClick = (itemValue: string | undefined, event: React.MouseEvent<HTMLLIElement>) => {
    select()
    onClick?.(value, event)
  }

  return (
    <CollectionItem
      {...props}
      role="option"
      value={value}
      disabled={isDisabled}
      onClick={handleClick}
      onSelect={select}
      data-selected={isSelected}
      className={cn(`${global.prefixCls}-listbox-option`, classNames?.root)}
      style={styles?.root}
    >
      <span>{children}</span>
      <Checkmark
        {...checkmarkProps}
        checked={isSelected}
        className={classNames?.checkmark}
        style={styles?.checkmark}
      />
    </CollectionItem>
  )
}

ListboxOption.displayName = 'ListboxOption'
