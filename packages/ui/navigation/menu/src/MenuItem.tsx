import { CollectionItem, type CollectionItemProps } from '@negative-space/collection'
import { Link, type LinkProps } from '@negative-space/link'
import { cn, useNSUI } from '@negative-space/system'
import React, { useRef } from 'react'

import { useMenuContext } from './useMenuContext'

export interface MenuItemProps extends Omit<
  LinkProps,
  'content' | 'className' | 'style' | 'tabIndex' | 'aria-disabled' | 'prefix'
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
  value?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  itemProps?: Omit<CollectionItemProps, 'className' | 'style' | 'value'>
}

export const MenuItem = ({
  children,
  value,
  disabled,
  prefix,
  suffix,
  classNames,
  styles,
  itemProps,
  ...linkProps
}: MenuItemProps) => {
  const { global } = useNSUI()
  const { disabled: groupDisabled, collapsed } = useMenuContext()
  const linkRef = useRef<HTMLAnchorElement>(null)

  const isDisabled = disabled || groupDisabled
  const isCollapsed = !!collapsed

  const handleItemClick = (
    itemValue: string | undefined,
    event: React.MouseEvent<HTMLLIElement>
  ) => {
    if (isDisabled) return
    itemProps?.onClick?.(itemValue, event)

    if (!linkProps.href) {
      linkProps.onClick?.(event as unknown as React.MouseEvent<HTMLAnchorElement>)
    }
  }

  const handleItemSelect = (itemValue: string | undefined) => {
    if (isDisabled) return
    itemProps?.onSelect?.(itemValue)

    if (linkProps.href && linkRef.current) {
      linkRef.current.click()
    }
  }

  return (
    <CollectionItem
      {...itemProps}
      value={value}
      disabled={isDisabled}
      role="menuitem"
      onClick={handleItemClick}
      onSelect={handleItemSelect}
      className={cn(`${global.prefixCls}-menu-item`, classNames?.root)}
      styles={{ root: styles?.root }}
    >
      <Link
        {...linkProps}
        ref={linkRef}
        disabled={isDisabled}
        tabIndex={-1}
        className={cn(`${global.prefixCls}-menu-link`, classNames?.link)}
        style={{ display: 'flex', ...styles?.link }}
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
            {children}
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
