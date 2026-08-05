import { Collection, type CollectionProps } from '@negative-space/collection'
import { Popover, type PopoverProps } from '@negative-space/popover'
import { cn, mergeCn, useNSUI } from '@negative-space/system'
import React from 'react'

import { DropdownContext } from './dropdownContext'
import { DropdownGroup, type DropdownGroupProps } from './DropdownGroup'
import { DropdownItem, type DropdownItemProps } from './DropdownItem'
import { DropdownSeparator, type DropdownSeparatorProps } from './DropdownSeparator'
import { DropdownSubmenu, type DropdownSubmenuProps } from './DropdownSubmenu'
import { type DropdownHandle } from './useDropdown'

export type DropdownGroupItem =
  | {
      item: DropdownItemProps
      separator?: never
      submenu?: never
    }
  | {
      separator: DropdownSeparatorProps
      item?: never
      submenu?: never
    }
  | {
      submenu: Omit<DropdownSubmenuProps, 'children'> & {
        items: DropdownComponent[]
      }
      item?: never
      separator?: never
    }

export type DropdownComponent =
  | {
      group: Omit<DropdownGroupProps, 'children'> & {
        items: DropdownGroupItem[]
      }
      item?: never
      separator?: never
      submenu?: never
    }
  | {
      item: DropdownItemProps
      group?: never
      separator?: never
      submenu?: never
    }
  | {
      separator: DropdownSeparatorProps
      group?: never
      item?: never
      submenu?: never
    }
  | {
      submenu: Omit<DropdownSubmenuProps, 'children'> & {
        items: DropdownComponent[]
      }
      group?: never
      item?: never
      separator?: never
    }

export interface DropdownProps extends Omit<
  CollectionProps,
  'rovingOptions' | 'className' | 'style' | 'popover'
> {
  dropdown: DropdownHandle

  classNames?: PopoverProps['classNames'] & {
    content?: string
    group?: DropdownGroupProps['classNames']
    item?: DropdownItemProps['classNames']
    separator?: string
    submenu?: DropdownSubmenuProps['classNames']
  }

  styles?: PopoverProps['styles'] & {
    content?: React.CSSProperties
    group?: DropdownGroupProps['styles']
    item?: DropdownItemProps['styles']
    separator?: React.CSSProperties
    submenu?: DropdownSubmenuProps['styles']
  }

  items: DropdownComponent[]
}

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ dropdown, classNames, styles, disabled, items, columns = 1, ...props }, ref) => {
    const { global } = useNSUI()

    const renderItem = (component: DropdownComponent, index: number): React.ReactNode => {
      if ('item' in component && component.item) {
        const {
          classNames: itemClassNames,
          styles: itemStyles,
          value,
          ...restItem
        } = component.item

        return (
          <DropdownItem
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
          <DropdownSeparator
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
          <DropdownSubmenu
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
          </DropdownSubmenu>
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
          <DropdownGroup
            key={`group-${index}`}
            {...groupProps}
            classNames={mergeCn(classNames?.group, groupClassNames)}
            styles={{
              ...styles?.group,
              ...groupStyles
            }}
          >
            {groupItems.map((groupComponent, groupIndex) => renderItem(groupComponent, groupIndex))}
          </DropdownGroup>
        )
      }

      return null
    }

    return (
      <Popover
        classNames={{
          root: cn(`${global.prefixCls}-dropdown`, classNames?.root),
          overlay: classNames?.overlay,
          arrow: classNames?.arrow
        }}
        styles={{
          root: styles?.root,
          overlay: styles?.overlay,
          arrow: styles?.arrow
        }}
        popover={dropdown}
      >
        <DropdownContext.Provider value={{ disabled }}>
          <Collection
            {...props}
            {...({ ref } as object)}
            role="menu"
            columns={columns}
            disabled={disabled}
            rovingOptions={{
              allowHorizontal: false,
              containerRole: 'menu'
            }}
            className={cn(`${global.prefixCls}-dropdown-content`, classNames?.content)}
            style={styles?.content}
          >
            {items.map(renderItem)}
          </Collection>
        </DropdownContext.Provider>
      </Popover>
    )
  }
)

Dropdown.displayName = 'Dropdown'
