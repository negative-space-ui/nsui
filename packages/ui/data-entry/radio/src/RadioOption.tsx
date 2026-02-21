import React from 'react'
import { cn, useNSUI } from '@negative-space/system'
import { CollectionItem, type CollectionItemProps } from '@negative-space/system'
import { useRadioContext } from './useRadioContext'

export interface RadioOptionProps extends Omit<
  CollectionItemProps,
  'onClick' | 'selected' | 'value' | 'role' | 'classNames' | 'styles'
> {
  classNames?: {
    label?: string
    radio?: string
    inner?: string
  }
  styles?: {
    label?: React.CSSProperties
    radio?: React.CSSProperties
    inner?: React.CSSProperties
  }
  disabled?: boolean
  value: string
  label: React.ReactNode
}

export function RadioOption({
  value,
  label,
  disabled,
  classNames,
  styles,
  ...props
}: RadioOptionProps) {
  const { global } = useNSUI()
  const { selectedValue, onChange, disabled: groupDisabled } = useRadioContext()

  const isDisabled = disabled ?? groupDisabled ?? false
  const checked = selectedValue === value

  const select = () => {
    if (!isDisabled) onChange?.(value)
  }

  return (
    <CollectionItem
      {...props}
      role="radio"
      value={value}
      disabled={isDisabled}
      onClick={select}
      onSelect={select}
      data-checked={checked}
      aria-checked={checked}
      classNames={{
        root: cn(
          `${global.prefixCls}-radio-label`,
          `${global.prefixCls}-clickable`,
          classNames?.label
        )
      }}
      styles={{ root: styles?.label }}
    >
      <div
        data-checked={checked}
        className={cn(`${global.prefixCls}-radio`, classNames?.radio)}
        style={{
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          ...styles?.radio
        }}
      >
        <div
          data-visible={checked}
          className={cn(
            `${global.prefixCls}-radio-inner ${global.prefixCls}-fade`,
            classNames?.inner
          )}
          style={{
            borderRadius: '50%',
            ...styles?.inner
          }}
        />
      </div>

      {label}
    </CollectionItem>
  )
}

RadioOption.displayName = 'RadioOption'
