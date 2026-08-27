import { CollectionGroup, type CollectionGroupProps } from '@negative-space/collection'
import { Flex, type FlexProps } from '@negative-space/flex'
import { ChevronDown, cn, useNSUI } from '@negative-space/system'
import React, { useState } from 'react'

export interface MenuGroupProps extends Omit<
  CollectionGroupProps,
  'classNames' | 'styles' | 'prefix'
> {
  classNames?: CollectionGroupProps['classNames'] & {
    content?: string
    prefix?: string
    trigger?: string
    chevronIcon?: string
  }
  styles?: CollectionGroupProps['styles'] & {
    content?: React.CSSProperties
    prefix?: React.CSSProperties
    trigger?: React.CSSProperties
    chevronIcon?: React.CSSProperties
  }
  prefix?: React.ReactNode
  flexProps?: Omit<FlexProps<'div'>, 'className' | 'style'>
  collapsible?: boolean
  defaultCollapsed?: boolean
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  chevronIcon?: React.ReactNode | ((collapsed: boolean) => React.ReactNode)
}

export const MenuGroup = ({
  classNames,
  styles,
  prefix,
  heading,
  children,
  flexProps,
  collapsible = false,
  defaultCollapsed = false,
  collapsed,
  onCollapsedChange,
  chevronIcon,
  ...props
}: MenuGroupProps) => {
  const { global } = useNSUI()

  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed)
  const isControlled = collapsed !== undefined
  const isCollapsed = collapsible && (isControlled ? collapsed : internalCollapsed)

  const toggleCollapsed = () => {
    if (!collapsible) return

    const next = !isCollapsed

    if (!isControlled) {
      setInternalCollapsed(next)
    }

    onCollapsedChange?.(next)
  }

  const flexPropsWithDefaults: FlexProps<'div'> = {
    direction: 'column',
    ...flexProps
  }

  const headingContent = (
    <>
      {prefix && (
        <span
          className={cn(`${global.prefixCls}-menu-group-prefix`, classNames?.prefix)}
          style={styles?.prefix}
        >
          {prefix}
        </span>
      )}

      {heading}

      {collapsible && (
        <span
          className={cn(`${global.prefixCls}-menu-group-chevron`, classNames?.chevronIcon)}
          style={styles?.chevronIcon}
        >
          {typeof chevronIcon === 'function'
            ? chevronIcon(isCollapsed)
            : (chevronIcon ?? (
                <ChevronDown
                  className={cn(
                    `${global.prefixCls}-menu-group-chevron-icon`,
                    classNames?.chevronIcon
                  )}
                  style={{
                    rotate: isCollapsed ? '180deg' : '0deg',
                    ...styles?.chevronIcon
                  }}
                />
              ))}
        </span>
      )}
    </>
  )

  return (
    <CollectionGroup
      {...props}
      heading={
        collapsible ? (
          <button
            type="button"
            onClick={toggleCollapsed}
            aria-expanded={!isCollapsed}
            className={cn(`${global.prefixCls}-menu-group-trigger`, classNames?.trigger)}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              ...styles?.trigger
            }}
          >
            {headingContent}
          </button>
        ) : (
          headingContent
        )
      }
      classNames={{
        root: cn(`${global.prefixCls}-menu-group`, classNames?.root),
        heading: cn(`${global.prefixCls}-menu-group-heading`, classNames?.heading)
      }}
      styles={{
        root: styles?.root,
        heading: styles?.heading
      }}
    >
      {!isCollapsed && (
        <Flex
          {...flexPropsWithDefaults}
          className={cn(`${global.prefixCls}-menu-group-content`, classNames?.content)}
        >
          {children}
        </Flex>
      )}
    </CollectionGroup>
  )
}

MenuGroup.displayName = 'MenuGroup'
