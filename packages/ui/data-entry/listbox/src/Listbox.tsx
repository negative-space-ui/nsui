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

export interface ListboxProps extends Omit<GridProps, 'children' | 'className' | 'style'> {
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
  disabled?: boolean
  items: ListboxComponent[]
  selectionMode?: SelectionMode
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
}

export const Listbox = React.forwardRef<HTMLDivElement, ListboxProps>(
  (
    {
      classNames,
      styles,
      disabled,
      items,
      columns = 1,
      selectionMode = 'single',
      defaultValue,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const { global } = useNSUI()
    const roving = useRovingFocus()

    const initialSelectedIds = useMemo(() => {
      if (selectionMode === 'single') {
        return defaultValue ? new Set([defaultValue as string]) : new Set<string>()
      }
      return new Set((defaultValue as string[]) ?? [])
    }, [defaultValue, selectionMode])

    const [selectedIds, setSelectedIds] = useState<Set<string>>(initialSelectedIds)

    const emitChange = useCallback(
      (next: Set<string>) => {
        if (!onValueChange) return
        const value = selectionMode === 'single' ? Array.from(next)[0] : Array.from(next)
        onValueChange(value)
      },
      [onValueChange, selectionMode]
    )

    const toggleSelection = useCallback(
      (value: string) => {
        if (disabled) return
        setSelectedIds((prev) => {
          const next = new Set(prev)
          if (selectionMode === 'single') {
            next.clear()
            next.add(value)
          } else {
            if (next.has(value)) next.delete(value)
            else next.add(value)
          }
          emitChange(next)
          return next
        })
      },
      [selectionMode, emitChange, disabled]
    )

    const isSelected = useCallback((value: string) => selectedIds.has(value), [selectedIds])

    const contextValue = useMemo(
      () => ({
        ...roving,
        registerOption: roving.registerItem,
        unregisterOption: roving.unregisterItem,
        selectedIds,
        toggleSelection,
        isSelected,
        selectionMode,
        disabled
      }),
      [roving, selectedIds, toggleSelection, isSelected, selectionMode, disabled]
    )

    return (
      <ListboxContext.Provider value={contextValue}>
        <Grid
          {...props}
          ref={ref}
          role="listbox"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          data-disabled={disabled}
          aria-multiselectable={selectionMode === 'multiple'}
          columns={columns}
          className={cn(`${global.prefixCls}-listbox`, classNames?.root)}
          style={styles?.root}
          onKeyDown={disabled ? undefined : roving.onKeyDown}
          onFocus={disabled ? undefined : roving.onFocus}
          onBlur={disabled ? undefined : roving.onBlur}
        >
          {items.map((component, index) => {
            if ('group' in component) {
              return (
                <ListboxGroup
                  key={`group-${index}`}
                  className={classNames?.group}
                  style={styles?.group}
                  {...component.group}
                />
              )
            }

            if ('option' in component) {
              const key = component.option.value ?? `option-${index}`
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
            }

            if ('separator' in component) {
              return (
                <ListboxSeparator
                  key={`separator-${index}`}
                  className={classNames?.separator}
                  style={styles?.separator}
                  {...component.separator}
                />
              )
            }

            return null
          })}
        </Grid>
      </ListboxContext.Provider>
    )
  }
)

Listbox.displayName = 'Listbox'
