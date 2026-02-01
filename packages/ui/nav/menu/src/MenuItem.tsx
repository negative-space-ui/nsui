import React, { useRef, useEffect, useId } from 'react'
import { cn, useNSUI } from '@negative-space/system'
import { Flex, type FlexProps } from '@negative-space/flex'
import { useMenuContext } from './useMenuContext'

export interface MenuItemProps extends Omit<
  React.HTMLAttributes<HTMLLIElement>,
  'content' | 'className' | 'style' | 'prefix'
> {
  classNames?: {
    root?: string
    prefix?: string
    content?: string
    suffix?: string
    link?: string
  }
  styles?: {
    root?: React.CSSProperties
    prefix?: React.CSSProperties
    content?: React.CSSProperties
    suffix?: React.CSSProperties
    link?: React.CSSProperties
  }
  disabled?: boolean
  prefix?: React.ReactNode
  content: React.ReactNode
  suffix?: React.ReactNode
  linkProps?: Omit<FlexProps, 'className' | 'style' | 'as' | 'direction' | 'align'>
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

export const MenuItem = React.forwardRef<HTMLElement, MenuItemProps>(
  (
    { classNames, styles, disabled, prefix, content, suffix, linkProps, onClick, ...props },
    ref
  ) => {
    const { global } = useNSUI()
    const ctx = useMenuContext()
    const innerRef = useRef<HTMLElement>(null!)
    const id = useId()

    if (!ctx) return null

    const { roving } = ctx
    const isActive = roving.activeId === id
    const isDisabled = disabled || ctx.disabled

    useEffect(() => {
      roving.registerItem({
        id,
        ref: innerRef,
        disabled: isDisabled
      })
      return () => roving.unregisterItem(id)
    }, [id, isDisabled, roving])

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      if (!isDisabled) {
        roving.focusItem(id)
        onClick?.(event)
      }
    }

    return (
      <li
        {...props}
        className={cn(`${global.prefixCls}-menu-item`, classNames?.root)}
        style={styles?.root}
      >
        <Flex
          {...linkProps}
          ref={(node) => {
            innerRef.current = node
            if (typeof ref === 'function') {
              ref(node)
            } else if (ref) {
              ref.current = node
            }
          }}
          as="a"
          role="menuitem"
          direction="row"
          alignItems="center"
          tabIndex={isDisabled ? -1 : roving.hasInteracted && isActive ? 0 : -1}
          aria-disabled={isDisabled}
          onFocus={() => roving.focusItem(id)}
          onClick={handleClick}
          onKeyDown={(e: React.KeyboardEvent<HTMLElement>) =>
            roving.handleItemKeyDown(
              e,
              id,
              () => {
                handleClick(e as unknown as React.MouseEvent<HTMLElement>)
              },
              {
                allowHorizontal: false
              }
            )
          }
          className={cn(
            `${global.prefixCls}-menu-link ${global.prefixCls}-clickable`,
            classNames?.link
          )}
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
        </Flex>
      </li>
    )
  }
)

MenuItem.displayName = 'MenuItem'
