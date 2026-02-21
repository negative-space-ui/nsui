import React, { cloneElement, isValidElement } from 'react'
import { cn, useNSUI } from '@negative-space/system'
import { CollectionItem, type CollectionItemProps } from '@negative-space/collection'
import { Checkmark, type CheckmarkProps } from '@negative-space/checkmark'
import { useListboxContext } from './useListboxContext'

export interface ListboxOptionProps extends Omit<
  CollectionItemProps,
  'onClick' | 'selected' | 'value'
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
  checkmark?: React.ReactNode
  checkmarkProps?: Omit<CheckmarkProps, 'checked' | 'className' | 'style'>
  onClick?: (value: string, event: React.MouseEvent<HTMLLIElement>) => void
}

export function ListboxOption({
  children,
  value,
  disabled,
  classNames,
  styles,
  checkmark = <Checkmark />,
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
      classNames={{
        root: cn(
          `${global.prefixCls}-listbox-option`,
          `${global.prefixCls}-clickable`,
          classNames?.root
        )
      }}
      styles={{ root: styles?.root }}
    >
      <span>{children}</span>

      {isValidElement(checkmark)
        ? cloneElement(checkmark as React.ReactElement<Record<string, unknown>>, {
            ...(checkmark.type === Checkmark
              ? {
                  checked: isSelected,
                  className: classNames?.checkmark,
                  style: styles?.checkmark
                }
              : {}),
            ...checkmarkProps
          })
        : checkmark}
    </CollectionItem>
  )
}

ListboxOption.displayName = 'ListboxOption'
