import React, { useMemo, useState } from 'react'
import { cn, mergeCn, useNSUI } from '@negative-space/system'
import { Grid, type GridProps } from '@negative-space/grid'
import { useRovingFocus } from '@negative-space/roving-focus'
import { ListboxOption, type ListboxOptionProps } from './ListboxOption'
import { ListboxGroup, type ListboxGroupProps } from './ListboxGroup'
import { ListboxSeparator, type ListboxSeparatorProps } from './ListboxSeparator'
import { ListboxContext, type SelectionMode } from './ListboxContext'

export type ListboxComponent =
  | { group: ListboxGroupProps }
  | { option: ListboxOptionProps }
  | { separator: ListboxSeparatorProps }

export interface ListboxProps extends Omit<GridProps, 'children' | 'className' | 'style'> {
  classNames?: {
    root?: string
    group?: {
      root?: string
      label?: string
    }
    option?: {
      label?: string
      checkmark?: string
    }
    separator?: string
  }
  styles?: {
    root?: React.CSSProperties
    group?: {
      root?: React.CSSProperties
      label?: React.CSSProperties
    }
    option?: {
      label?: React.CSSProperties
      checkmark?: React.CSSProperties
    }
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
        },
        roving
      }),
      [disabled, selectionMode, value, onValueChange, roving]
    )

    return (
      <ListboxContext.Provider value={contextValue}>
        <Grid
          {...props}
          ref={ref}
          role="listbox"
          tabIndex={disabled ? -1 : roving.hasInteracted ? -1 : 0}
          aria-disabled={disabled}
          aria-multiselectable={selectionMode === 'multiple'}
          columns={columns}
          className={cn(`${global.prefixCls}-listbox`, classNames?.root)}
          style={styles?.root}
          onKeyDown={disabled ? undefined : roving.handleGroupKeyDown}
          onBlur={disabled ? undefined : roving.handleGroupBlur}
        >
          {items.map((component, index) => {
            if ('group' in component) {
              return (
                <ListboxGroup
                  key={`group-${index}`}
                  {...component.group}
                  classNames={mergeCn(classNames?.group, component.group.classNames)}
                  styles={{ ...styles?.group, ...component.group.styles }}
                />
              )
            }

            if ('option' in component) {
              const key = component.option.value ?? `option-${index}`

              return (
                <ListboxOption
                  key={key}
                  {...component.option}
                  classNames={mergeCn(classNames?.option, component.option.classNames)}
                  styles={{ ...styles?.option, ...component.option.styles }}
                />
              )
            }

            if ('separator' in component) {
              return (
                <ListboxSeparator
                  key={`separator-${index}`}
                  {...component.separator}
                  className={cn(classNames?.separator, component.separator.className)}
                  style={{ ...styles?.separator, ...component.separator.style }}
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
