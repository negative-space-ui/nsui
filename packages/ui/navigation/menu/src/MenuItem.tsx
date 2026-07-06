import { CollectionItem, type CollectionItemProps } from '@negative-space/collection'
import { Link, type LinkProps } from '@negative-space/link'
import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

import { useMenuContext } from './useMenuContext'

export interface MenuItemProps extends Omit<
  LinkProps,
  'content' | 'className' | 'style' | 'tabIndex' | 'aria-disabled' | 'children' | 'prefix'
> {
  classNames?: {
    root?: string
    link?: string
    prefix?: string
    content?: string
    suffix?: string
  }
  styles?: {
    root?: React.CSSProperties
    link?: React.CSSProperties
    prefix?: React.CSSProperties
    content?: React.CSSProperties
    suffix?: React.CSSProperties
  }
  value?: CollectionItemProps['value']
  disabled?: CollectionItemProps['disabled']
  gap?: CollectionItemProps['gap']
  alignItems?: CollectionItemProps['alignItems']
  direction?: CollectionItemProps['direction']
  prefix?: React.ReactNode
  content: React.ReactNode
  suffix?: React.ReactNode
}

export const MenuItem = ({
  value,
  disabled,
  prefix,
  content,
  suffix,
  classNames,
  styles,
  gap = '0.5rem',
  alignItems = 'center',
  direction = 'row',
  ...linkProps
}: MenuItemProps) => {
  const { global } = useNSUI()
  const { disabled: groupDisabled, collapsed } = useMenuContext()

  const isDisabled = disabled || groupDisabled
  const isCollapsed = !!collapsed

  return (
    <CollectionItem
      value={value}
      disabled={isDisabled}
      role="menuitem"
      className={cn(`${global.prefixCls}-menu-item`, classNames?.root)}
      styles={{ root: styles?.root }}
    >
      <Link
        {...linkProps}
        disabled={isDisabled}
        tabIndex={-1}
        className={cn(`${global.prefixCls}-menu-link`, classNames?.link)}
        style={{ display: 'flex', flexDirection: direction, gap, alignItems, ...styles?.link }}
      >
        {prefix && (
          <span
            className={cn(`${global.prefixCls}-menu-prefix`, classNames?.prefix)}
            style={styles?.prefix}
          >
            {prefix}
          </span>
        )}

        {!isCollapsed && (
          <span
            className={cn(`${global.prefixCls}-menu-content`, classNames?.content)}
            style={styles?.content}
          >
            {content}
          </span>
        )}

        {!isCollapsed && suffix && (
          <span
            className={cn(`${global.prefixCls}-menu-suffix`, classNames?.suffix)}
            style={styles?.suffix}
          >
            {suffix}
          </span>
        )}
      </Link>
    </CollectionItem>
  )
}

MenuItem.displayName = 'MenuItem'
