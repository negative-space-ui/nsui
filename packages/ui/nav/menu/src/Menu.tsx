import React, { useMemo } from 'react'
import { cn, mergeCn, useNSUI } from '@negative-space/system'
import { Grid, type GridProps } from '@negative-space/grid'
import { useRovingFocus } from '@negative-space/roving-focus'
import { MenuItem, type MenuItemProps } from './MenuItem'
import { MenuGroup, type MenuGroupProps } from './MenuGroup'
import { MenuSeparator, type MenuSeparatorProps } from './MenuSeparator'
import { MenuContext } from './MenuContext'

export type MenuComponent =
  | { group: MenuGroupProps }
  | { item: MenuItemProps }
  | { separator: MenuSeparatorProps }

export interface MenuProps extends Omit<GridProps, 'children' | 'className' | 'style'> {
  classNames?: {
    root?: string
    group?: {
      root?: string
      label?: string
    }
    item?: {
      root?: string
      prefix?: string
      content?: string
      suffix?: string
      link?: string
    }
    separator?: string
  }
  styles?: {
    root?: React.CSSProperties
    group?: {
      root?: React.CSSProperties
      label?: React.CSSProperties
    }
    item?: {
      root?: React.CSSProperties
      prefix?: React.CSSProperties
      content?: React.CSSProperties
      suffix?: React.CSSProperties
      link?: React.CSSProperties
    }
    separator?: React.CSSProperties
  }
  disabled?: boolean
  items: MenuComponent[]
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  ({ classNames, styles, disabled, items, columns = 1, ...props }, ref) => {
    const { global } = useNSUI()
    const roving = useRovingFocus()

    const contextValue = useMemo(
      () => ({
        disabled,
        roving
      }),
      [disabled, roving]
    )

    return (
      <MenuContext.Provider value={contextValue}>
        <Grid
          {...props}
          ref={ref}
          role="menu"
          tabIndex={disabled ? -1 : roving.hasInteracted ? -1 : 0}
          aria-disabled={disabled}
          columns={columns}
          className={cn(`${global.prefixCls}-menu`, classNames?.root)}
          style={styles?.root}
          onKeyDown={disabled ? undefined : roving.handleGroupKeyDown}
          onBlur={disabled ? undefined : roving.handleGroupBlur}
        >
          {items.map((component, index) => {
            if ('group' in component) {
              return (
                <MenuGroup
                  key={`group-${index}`}
                  {...component.group}
                  classNames={mergeCn(classNames?.group, component.group.classNames)}
                  styles={{ ...styles?.group, ...component.group.styles }}
                />
              )
            }

            if ('item' in component) {
              const key = component.item.content ? `item-${index}` : `item-${index}`

              return (
                <MenuItem
                  key={key}
                  {...component.item}
                  classNames={mergeCn(classNames?.item, component.item.classNames)}
                  styles={{ ...styles?.item, ...component.item.styles }}
                />
              )
            }

            if ('separator' in component) {
              return (
                <MenuSeparator
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
      </MenuContext.Provider>
    )
  }
)

Menu.displayName = 'Menu'
