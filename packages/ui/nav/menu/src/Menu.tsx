import React from 'react'
import { cn, mergeCn, useNSUI } from '@negative-space/system'
import { Collection, type CollectionProps } from '@negative-space/system'
import { MenuContext } from './MenuContext'
import { MenuItem, type MenuItemProps } from './MenuItem'
import { MenuGroup, type MenuGroupProps } from './MenuGroup'
import { MenuSeparator, type MenuSeparatorProps } from './MenuSeparator'

export type MenuComponent =
  | { group: MenuGroupProps; item?: never; separator?: never }
  | { item: MenuItemProps; group?: never; separator?: never }
  | { separator: MenuSeparatorProps; group?: never; item?: never }

export interface MenuProps extends Omit<CollectionProps, 'rovingOptions' | 'className' | 'style'> {
  classNames?: {
    root?: string
    group?: { root?: string; label?: string }
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
    group?: { root?: React.CSSProperties; label?: React.CSSProperties }
    item?: {
      root?: React.CSSProperties
      prefix?: React.CSSProperties
      content?: React.CSSProperties
      suffix?: React.CSSProperties
      link?: React.CSSProperties
    }
    separator?: React.CSSProperties
  }
  items: MenuComponent[]
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  ({ classNames, styles, disabled, items, columns = 1, ...props }, ref) => {
    const { global } = useNSUI()

    return (
      <MenuContext.Provider value={{ disabled }}>
        <Collection
          {...({ ref } as object)}
          role="menu"
          columns={columns}
          disabled={disabled}
          rovingOptions={{
            allowHorizontal: false,
            containerRole: 'menu'
          }}
          className={cn(`${global.prefixCls}-menu`, classNames?.root)}
          style={styles?.root}
          {...props}
        >
          {items.map((component, index) => {
            if ('group' in component && component.group) {
              return (
                <MenuGroup
                  key={`group-${index}`}
                  classNames={mergeCn(classNames?.group, component.group.classNames)}
                  styles={{ ...styles?.group, ...component.group.styles }}
                  {...component.group}
                />
              )
            }
            if ('item' in component && component.item) {
              return (
                <MenuItem
                  key={component.item.value ?? `item-${index}`}
                  classNames={mergeCn(classNames?.item, component.item.classNames)}
                  styles={{ ...styles?.item, ...component.item.styles }}
                  {...component.item}
                />
              )
            }
            if ('separator' in component && component.separator) {
              return (
                <MenuSeparator
                  key={`separator-${index}`}
                  className={cn(classNames?.separator, component.separator.className)}
                  style={{ ...styles?.separator, ...component.separator.style }}
                  {...component.separator}
                />
              )
            }
            return null
          })}
        </Collection>
      </MenuContext.Provider>
    )
  }
)

Menu.displayName = 'Menu'
