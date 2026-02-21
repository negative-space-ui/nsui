import React from 'react'
import { cn, useNSUI } from '@negative-space/system'
import { CollectionItem, type CollectionItemProps } from '@negative-space/collection'
import { Link, type LinkProps } from '@negative-space/link'
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
  direction?: CollectionItemProps['direction']
  alignItems?: CollectionItemProps['alignItems']
  gap?: CollectionItemProps['gap']
  prefix?: React.ReactNode
  content: React.ReactNode
  suffix?: React.ReactNode
}

export const MenuItem = ({
  value,
  disabled,
  direction,
  alignItems,
  gap,
  prefix,
  content,
  suffix,
  classNames,
  styles,
  onClick,
  ...linkProps
}: MenuItemProps) => {
  const { global } = useNSUI()
  const { disabled: groupDisabled } = useMenuContext()
  const isDisabled = disabled || groupDisabled

  return (
    <CollectionItem
      value={value}
      disabled={isDisabled}
      direction={direction}
      alignItems={alignItems}
      gap={gap}
      role="menuitem"
      onSelect={() => {
        onClick?.({} as React.MouseEvent<HTMLAnchorElement>)
        if (linkProps.href && !isDisabled) {
          if (linkProps.target === '_blank') {
            window.open(linkProps.href, '_blank', 'noopener,noreferrer')
          } else {
            window.location.href = linkProps.href
          }
        }
      }}
      classNames={{ root: cn(`${global.prefixCls}-menu-item`, classNames?.root) }}
      styles={{ root: styles?.root }}
    >
      <Link
        {...linkProps}
        tabIndex={-1}
        aria-disabled={isDisabled || undefined}
        onClick={(e) => {
          e.stopPropagation()
          if (!isDisabled) onClick?.(e as unknown as React.MouseEvent<HTMLAnchorElement>)
        }}
        className={cn(`${global.prefixCls}-menu-link`, classNames?.link)}
        style={styles?.link}
      >
        {prefix && (
          <span
            className={cn(`${global.prefixCls}-menu-prefix`, classNames?.prefix)}
            style={styles?.prefix}
          >
            {prefix}
          </span>
        )}

        <span
          className={cn(`${global.prefixCls}-menu-content`, classNames?.content)}
          style={styles?.content}
        >
          {content}
        </span>

        {suffix && (
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
