import { Collection, type CollectionProps } from '@negative-space/collection'
import { cn, mergeCn, useNSUI } from '@negative-space/system'
import React from 'react'

import { MenuContext } from './MenuContext'
import { MenuGroup, type MenuGroupProps } from './MenuGroup'
import { MenuItem, type MenuItemProps } from './MenuItem'
import { MenuSeparator, type MenuSeparatorProps } from './MenuSeparator'
import { MenuSubmenu, type MenuSubmenuProps } from './MenuSubmenu'

export type MenuGroupItem =
  | {
      item: MenuItemProps
      separator?: never
      submenu?: never
    }
  | {
      separator: MenuSeparatorProps
      item?: never
      submenu?: never
    }
  | {
      submenu: Omit<MenuSubmenuProps, 'children'> & {
        items: MenuComponent[]
      }
      item?: never
      separator?: never
    }

export type MenuComponent =
  | {
      group: Omit<MenuGroupProps, 'children'> & {
        items: MenuGroupItem[]
      }
      item?: never
      separator?: never
      submenu?: never
    }
  | {
      item: MenuItemProps
      group?: never
      separator?: never
      submenu?: never
    }
  | {
      separator: MenuSeparatorProps
      group?: never
      item?: never
      submenu?: never
    }
  | {
      submenu: Omit<MenuSubmenuProps, 'children'> & {
        items: MenuComponent[]
      }
      group?: never
      item?: never
      separator?: never
    }

export interface MenuProps extends Omit<CollectionProps, 'rovingOptions' | 'className' | 'style'> {
  classNames?: {
    root?: string
    group?: MenuGroupProps['classNames']
    item?: MenuItemProps['classNames']
    separator?: string
    submenu?: MenuSubmenuProps['classNames']
  }
  styles?: {
    root?: React.CSSProperties
    group?: MenuGroupProps['styles']
    item?: MenuItemProps['styles']
    separator?: React.CSSProperties
    submenu?: MenuSubmenuProps['styles']
  }
  items: MenuComponent[]
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  ({ classNames, styles, disabled, items, columns = 1, ...props }, ref) => {
    const { global } = useNSUI()

    const renderItem = (component: MenuComponent, index: number) => {
      if ('item' in component && component.item) {
        const {
          classNames: itemClassNames,
          styles: itemStyles,
          value,
          ...restItem
        } = component.item

        return (
          <MenuItem
            key={value != null ? String(value) : `item-${index}`}
            {...restItem}
            value={value}
            classNames={mergeCn(classNames?.item, itemClassNames)}
            styles={{
              ...styles?.item,
              ...itemStyles
            }}
          />
        )
      }

      if ('separator' in component && component.separator) {
        const {
          className: separatorClassName,
          style: separatorStyle,
          ...restSeparator
        } = component.separator

        return (
          <MenuSeparator
            key={`separator-${index}`}
            {...restSeparator}
            className={cn(classNames?.separator, separatorClassName)}
            style={{
              ...styles?.separator,
              ...separatorStyle
            }}
          />
        )
      }

      if ('submenu' in component && component.submenu) {
        const {
          items: submenuItems,
          classNames: submenuClassNames,
          styles: submenuStyles,
          ...restSubmenu
        } = component.submenu

        return (
          <MenuSubmenu
            key={
              component.submenu.value != null ? String(component.submenu.value) : `submenu-${index}`
            }
            {...restSubmenu}
            classNames={mergeCn(classNames?.submenu, submenuClassNames)}
            styles={{
              ...styles?.submenu,
              ...submenuStyles
            }}
          >
            {submenuItems.map((item, itemIndex) => renderItem(item, itemIndex))}
          </MenuSubmenu>
        )
      }

      if ('group' in component && component.group) {
        const {
          items: groupItems,
          classNames: groupClassNames,
          styles: groupStyles,
          ...groupProps
        } = component.group

        return (
          <MenuGroup
            key={`group-${index}`}
            {...groupProps}
            classNames={mergeCn(classNames?.group, groupClassNames)}
            styles={{
              ...styles?.group,
              ...groupStyles
            }}
          >
            {groupItems.map((groupComponent, groupIndex) => renderItem(groupComponent, groupIndex))}
          </MenuGroup>
        )
      }

      return null
    }

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
          {items.map(renderItem)}
        </Collection>
      </MenuContext.Provider>
    )
  }
)

Menu.displayName = 'Menu'
