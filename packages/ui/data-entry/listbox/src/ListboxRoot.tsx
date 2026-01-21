import React, { useCallback, useMemo, useState } from 'react'
import { cn, useNSUI } from '@negative-space/system'
import { Grid, type GridProps } from '@negative-space/grid'
import { useRovingFocus } from '@negative-space/roving-focus'
import { ListboxOption, type ListboxOptionProps } from './ListboxOption'
import { ListboxGroup, type ListboxGroupProps } from './ListboxGroup'
import { ListboxSeparator, type ListboxSeparatorProps } from './ListboxSeparator'
import { ListboxContext, type SelectionMode } from './ListboxContext'

export type ListboxComponent =
  | { group: Omit<ListboxGroupProps, 'className' | 'style'> }
  | { option: Omit<ListboxOptionProps, 'className' | 'style'> }
  | { separator: Omit<ListboxSeparatorProps, 'className' | 'style'> }

export interface ListboxRootProps extends Omit<GridProps, 'className' | 'style'> {
  classNames?: {
    root?: string
    group?: string
    option?: string
    checkmark?: string
    separator?: string
  }
  styles?: {
    root?: React.CSSProperties
    group?: React.CSSProperties
    option?: React.CSSProperties
    checkmark?: React.CSSProperties
    separator?: React.CSSProperties
  }
  items: ListboxComponent[]
  selectionMode?: SelectionMode
  defaultValue?: string[]
  onValueChange?: (value: string | string[]) => void
}

export const ListboxRoot = React.forwardRef<HTMLDivElement, ListboxRootProps>(
  (
    {
      classNames,
      styles,
      items,
      columns = '1',
      selectionMode = 'single',
      defaultValue = [],
      onValueChange,
      ...props
    },
    ref
  ) => {
    const { global } = useNSUI()
    const rovingFocus = useRovingFocus()

    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(defaultValue))

    const toggleSelection = useCallback(
      (value: string) => {
        setSelectedIds((prev) => {
          const newSelected = new Set(prev)

          if (selectionMode === 'single') {
            newSelected.clear()
            newSelected.add(value)
          } else {
            if (newSelected.has(value)) newSelected.delete(value)
            else newSelected.add(value)
          }

          if (onValueChange) {
            const newValue =
              selectionMode === 'single' ? Array.from(newSelected)[0] : Array.from(newSelected)
            onValueChange(newValue)
          }

          return newSelected
        })
      },
      [selectionMode, onValueChange]
    )

    const isSelected = useCallback((value: string) => selectedIds.has(value), [selectedIds])

    const registerOption = useCallback(() => {}, [])
    const unregisterOption = useCallback(() => {}, [])

    const contextValue = useMemo(
      () => ({
        ...rovingFocus,
        selectedIds,
        toggleSelection,
        isSelected,
        selectionMode,
        registerOption,
        unregisterOption
      }),
      [
        rovingFocus,
        selectedIds,
        toggleSelection,
        isSelected,
        selectionMode,
        registerOption,
        unregisterOption
      ]
    )

    return (
      <ListboxContext.Provider value={contextValue}>
        <Grid
          {...props}
          ref={ref}
          role="listbox"
          className={cn(`${global.prefixCls}-listbox`, classNames?.root)}
          style={styles?.root}
          aria-multiselectable={selectionMode === 'multiple'}
          columns={columns}
          tabIndex={0}
          onKeyDown={rovingFocus.onKeyDown}
          onFocus={rovingFocus.onFocus}
          onBlur={rovingFocus.onBlur}
        >
          {items.map((component, index) => {
            const key = `Listbox-${index}`

            if ('group' in component)
              return (
                <ListboxGroup
                  key={key}
                  className={classNames?.group}
                  style={styles?.group}
                  {...component.group}
                />
              )
            if ('option' in component)
              return (
                <ListboxOption
                  key={key}
                  className={classNames?.option}
                  style={styles?.option}
                  checkmarkProps={{
                    className: classNames?.checkmark,
                    style: styles?.checkmark
                  }}
                  {...component.option}
                />
              )
            if ('separator' in component)
              return (
                <ListboxSeparator
                  key={key}
                  className={classNames?.separator}
                  style={styles?.separator}
                  {...component.separator}
                />
              )

            return null
          })}
        </Grid>
      </ListboxContext.Provider>
    )
  }
)

ListboxRoot.displayName = 'Listbox'
