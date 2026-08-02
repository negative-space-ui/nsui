import { Collection, type CollectionProps } from '@negative-space/collection'
import { cn, mergeCn, useNSUI } from '@negative-space/system'
import React from 'react'

import { MenuContext } from './MenuContext'
import { MenuGroup, type MenuGroupProps } from './MenuGroup'
import { MenuItem, type MenuItemProps } from './MenuItem'
import { MenuSeparator, type MenuSeparatorProps } from './MenuSeparator'

export type MenuGroupItem =
  | { item: MenuItemProps; separator?: never }
  | { separator: MenuSeparatorProps; item?: never }

export type MenuComponent =
  | {
      group: Omit<MenuGroupProps, 'children'> & { items: MenuGroupItem[] }
      item?: never
      separator?: never
    }
  | { item: MenuItemProps; group?: never; separator?: never }
  | { separator: MenuSeparatorProps; group?: never; item?: never }

export interface MenuProps extends Omit<CollectionProps, 'rovingOptions' | 'className' | 'style'> {
  classNames?: {
    root?: string
    group?: MenuGroupProps['classNames']
    item?: MenuItemProps['classNames']
    separator?: string
  }
  styles?: {
    root?: React.CSSProperties
    group?: MenuGroupProps['styles']
    item?: MenuItemProps['styles']
    separator?: React.CSSProperties
  }
  items: MenuComponent[]
  collapsed?: boolean
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  ({ classNames, styles, disabled, collapsed = false, items, columns = 1, ...props }, ref) => {
    const { global } = useNSUI()

    const renderGroupItem = (
      groupComponent: MenuGroupItem,
      groupIndex: number,
      parentIndex: number
    ) => {
      if ('item' in groupComponent && groupComponent.item) {
        const { classNames: itemClassNames, styles: itemStyles, ...restItem } = groupComponent.item

        return (
          <MenuItem
            key={groupComponent.item.value ?? `group-${parentIndex}-item-${groupIndex}`}
            {...restItem}
            classNames={mergeCn(classNames?.item, itemClassNames)}
            styles={{ ...styles?.item, ...itemStyles }}
          />
        )
      }

      if ('separator' in groupComponent && groupComponent.separator) {
        const {
          className: sepClassName,
          style: sepStyle,
          ...restSeparator
        } = groupComponent.separator

        return (
          <MenuSeparator
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
      <MenuContext.Provider value={{ disabled, collapsed }}>
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
              const {
                items: groupItems,
                classNames: groupClassNames,
                styles: groupStyles,
                ...restGroup
              } = component.group

              return (
                <MenuGroup
                  key={`group-${index}`}
                  {...restGroup}
                  classNames={mergeCn(classNames?.group, groupClassNames)}
                  styles={{ ...styles?.group, ...groupStyles }}
                >
                  {groupItems.map((groupComponent, groupIndex) =>
                    renderGroupItem(groupComponent, groupIndex, index)
                  )}
                </MenuGroup>
              )
            }

            if ('item' in component && component.item) {
              const { classNames: itemClassNames, styles: itemStyles, ...restItem } = component.item

              return (
                <MenuItem
                  key={component.item.value ?? `item-${index}`}
                  {...restItem}
                  classNames={mergeCn(classNames?.item, itemClassNames)}
                  styles={{ ...styles?.item, ...itemStyles }}
                />
              )
            }

            if ('separator' in component && component.separator) {
              const {
                className: sepClassName,
                style: sepStyle,
                ...restSeparator
              } = component.separator

              return (
                <MenuSeparator
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
      </MenuContext.Provider>
    )
  }
)

Menu.displayName = 'Menu'
