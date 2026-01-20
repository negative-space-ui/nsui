import React from 'react'
import { cn, useNSUI } from '@negative-space/system'
import { Collection, type CollectionProps } from '@negative-space/collection'
import { Checkmark, type CheckmarkProps } from '@negative-space/checkmark'

export interface ListboxOption<T> {
  value: T
  label: React.ReactNode
  disabled?: boolean
}

export interface ListboxProps<T = string> extends Omit<
  CollectionProps,
  'onChange' | 'className' | 'style'
> {
  classNames?: {
    listbox?: string
    option?: string
    label?: string
  }
  styles?: {
    listbox?: React.CSSProperties
    option?: React.CSSProperties
    label?: React.CSSProperties
  }
  direction?: 'vertical' | 'horizontal'
  options: ListboxOption<T>[]
  value?: T
  onChange?: (value: T) => void
  disabled?: boolean
  checkmarkProps?: CheckmarkProps
}

export const Listbox = React.forwardRef<HTMLDivElement, ListboxProps>(
  ({ classNames, styles, options, value, onChange, disabled, checkmarkProps, ...props }, ref) => {
    const { global } = useNSUI()

    return (
      <Collection
        {...props}
        ref={ref}
        role="listbox"
        className={cn(`${global.prefixCls}-listbox`, classNames?.listbox)}
        style={styles?.listbox}
      >
        {options.map((option, index) => {
          const isSelected = option.value === value
          const isDisabled = disabled || option.disabled

          return (
            <Collection.Item
              key={index}
              role="option"
              disabled={isDisabled}
              aria-selected={isSelected}
              data-selected={isSelected}
              data-disabled={isDisabled}
              onClick={() => {
                if (!isDisabled) {
                  onChange?.(option.value)
                }
              }}
              className={cn(`${global.prefixCls}-listbox-option`, classNames?.option)}
              style={styles?.option}
            >
              <span
                className={cn(`${global.prefixCls}-listbox-label`, classNames?.label)}
                style={styles?.label}
              >
                {option.label}
              </span>
              {isSelected && <Checkmark {...checkmarkProps} />}
            </Collection.Item>
          )
        })}
      </Collection>
    )
  }
)

Listbox.displayName = 'Listbox'
