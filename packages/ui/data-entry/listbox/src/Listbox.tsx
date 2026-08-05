import { Collection, type CollectionProps } from '@negative-space/collection'
import { Field, type FieldProps } from '@negative-space/field'
import { cn, mergeCn, useNSUI } from '@negative-space/system'
import React, { useMemo, useState } from 'react'

import { ListboxContext, type SelectionMode } from './ListboxContext'
import { ListboxGroup, type ListboxGroupProps } from './ListboxGroup'
import { ListboxOption, type ListboxOptionProps } from './ListboxOption'
import { ListboxSeparator, type ListboxSeparatorProps } from './ListboxSeparator'

export type ListboxGroupItem =
  | { option: ListboxOptionProps; separator?: never }
  | { separator: ListboxSeparatorProps; option?: never }

export type ListboxComponent =
  | {
      group: Omit<ListboxGroupProps, 'children'> & { items: ListboxGroupItem[] }
      option?: never
      separator?: never
    }
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

  const renderGroupItem = (
    groupItem: ListboxGroupItem,
    groupIndex: number,
    parentIndex: number
  ) => {
    if ('option' in groupItem && groupItem.option) {
      const { classNames: optionClassNames, styles: optionStyles, ...restOption } = groupItem.option

      return (
        <ListboxOption
          key={groupItem.option.value ?? `group-${parentIndex}-option-${groupIndex}`}
          {...restOption}
          classNames={mergeCn(classNames?.option, optionClassNames)}
          styles={{ ...styles?.option, ...optionStyles }}
        />
      )
    }

    if ('separator' in groupItem && groupItem.separator) {
      const { className: sepClassName, style: sepStyle, ...restSeparator } = groupItem.separator

      return (
        <ListboxSeparator
          key={`group-${parentIndex}-separator-${groupIndex}`}
          {...restSeparator}
          className={cn(classNames?.separator, sepClassName)}
          style={{ ...styles?.separator, ...sepStyle }}
        />
      )
    }

    return null
  }

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
              const {
                items: groupItems,
                classNames: groupClassNames,
                styles: groupStyles,
                ...restGroup
              } = item.group

              return (
                <ListboxGroup
                  key={`group-${index}`}
                  {...restGroup}
                  classNames={mergeCn(classNames?.group, groupClassNames)}
                  styles={{ ...styles?.group, ...groupStyles }}
                >
                  {groupItems.map((groupItem, groupIndex) =>
                    renderGroupItem(groupItem, groupIndex, index)
                  )}
                </ListboxGroup>
              )
            }

            if ('option' in item && item.option) {
              const {
                classNames: optionClassNames,
                styles: optionStyles,
                ...restOption
              } = item.option

              return (
                <ListboxOption
                  key={item.option.value ?? `option-${index}`}
                  {...restOption}
                  classNames={mergeCn(classNames?.option, optionClassNames)}
                  styles={{ ...styles?.option, ...optionStyles }}
                />
              )
            }

            if ('separator' in item && item.separator) {
              const { className: sepClassName, style: sepStyle, ...restSeparator } = item.separator

              return (
                <ListboxSeparator
                  key={`separator-${index}`}
                  {...restSeparator}
                  className={cn(classNames?.separator, sepClassName)}
                  style={{ ...styles?.separator, ...sepStyle }}
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
