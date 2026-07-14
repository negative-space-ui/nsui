import { Collection, type CollectionProps } from '@negative-space/collection'
import { Field, type FieldProps } from '@negative-space/field'
import { cn, mergeCn, useNSUI } from '@negative-space/system'
import React, { useMemo, useState } from 'react'

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
    field?: FieldProps['classNames']
    root?: string
    group?: ListboxGroupProps['classNames']
    option?: ListboxOptionProps['classNames']
    separator?: string
  }
  styles?: {
    field?: FieldProps['styles']
    root?: React.CSSProperties
    group?: ListboxGroupProps['styles']
    option?: ListboxOptionProps['styles']
    separator?: React.CSSProperties
  }
  items: ListboxComponent[]
  selectionMode?: SelectionMode
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
  fieldProps?: Omit<FieldProps, 'classNames' | 'styles'>
}

export function Listbox({
  items,
  classNames,
  styles,
  disabled,
  selectionMode = 'single',
  defaultValue,
  onValueChange,
  fieldProps,
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
      <Field {...fieldProps} classNames={classNames?.field} styles={styles?.field}>
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
