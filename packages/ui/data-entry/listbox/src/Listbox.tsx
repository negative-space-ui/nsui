import React, { useMemo, useState } from 'react'
import { cn, mergeCn, useNSUI } from '@negative-space/system'
import { Field } from '@negative-space/field'
import { Collection, type CollectionProps } from '@negative-space/collection'
import { ListboxContext, type SelectionMode } from './ListboxContext'
import { ListboxGroup, type ListboxGroupProps } from './ListboxGroup'
import { ListboxOption, type ListboxOptionProps } from './ListboxOption'
import { ListboxSeparator, type ListboxSeparatorProps } from './ListboxSeparator'

export type ListboxComponent =
  | { group: ListboxGroupProps; option?: never; separator?: never }
  | { option: ListboxOptionProps; group?: never; separator?: never }
  | { separator: ListboxSeparatorProps; group?: never; option?: never }

export interface ListboxProps extends Omit<CollectionProps, 'rovingOptions'> {
  classNames?: {
    field?: {
      root?: string
      error?: string
    }
    root?: string
    group?: {
      root?: string
      label?: string
    }
    option?: {
      root?: string
      checkmark?: string
    }
    separator?: string
  }
  styles?: {
    field?: {
      root?: React.CSSProperties
      error?: React.CSSProperties
    }
    root?: React.CSSProperties
    group?: {
      root?: React.CSSProperties
      label?: React.CSSProperties
    }
    option?: {
      root?: React.CSSProperties
      checkmark?: React.CSSProperties
    }
    separator?: React.CSSProperties
  }
  error?: string
  items: ListboxComponent[]
  selectionMode?: SelectionMode
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
}

export function Listbox({
  items,
  classNames,
  styles,
  error,
  disabled,
  selectionMode = 'single',
  defaultValue,
  onValueChange,
  ...props
}: ListboxProps) {
  const { global } = useNSUI()
  const [value, setValue] = useState<string | string[] | null>(
    defaultValue ?? (selectionMode === 'multiple' ? [] : null)
  )

  const contextValue = useMemo(
    () => ({
      disabled,
      selectionMode,
      value,
      onChange: (next: string | string[]) => {
        setValue(next)
        onValueChange?.(next)
      }
    }),
    [disabled, selectionMode, value, onValueChange]
  )

  return (
    <ListboxContext.Provider value={contextValue}>
      <Field classNames={classNames?.field} styles={styles?.field} error={error}>
        <Collection
          role="listbox"
          aria-multiselectable={selectionMode === 'multiple' || undefined}
          disabled={disabled}
          rovingOptions={{ containerRole: 'listbox' }}
          className={cn(`${global.prefixCls}-listbox`, classNames?.root)}
          style={styles?.root}
          {...props}
        >
          {items.map((item, index) => {
            if ('group' in item && item.group) {
              return (
                <ListboxGroup
                  key={index}
                  classNames={mergeCn(classNames?.group, item.group.classNames)}
                  styles={{ ...styles?.group, ...item.group.styles }}
                  {...item.group}
                />
              )
            }
            if ('option' in item && item.option) {
              return (
                <ListboxOption
                  key={item.option.value ?? index}
                  classNames={mergeCn(classNames?.option, item.option.classNames)}
                  styles={{ ...styles?.option, ...item.option.styles }}
                  {...item.option}
                />
              )
            }
            if ('separator' in item && item.separator) {
              return (
                <ListboxSeparator
                  key={index}
                  className={classNames?.separator}
                  style={styles?.separator}
                  {...item.separator}
                />
              )
            }
            return null
          })}
        </Collection>
      </Field>
    </ListboxContext.Provider>
  )
}

Listbox.displayName = 'Listbox'
