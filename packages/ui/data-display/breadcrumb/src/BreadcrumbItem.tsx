import { Flex, type FlexProps } from '@negative-space/flex'
import { cn, useNSUI } from '@negative-space/system'
import { Text, type TextProps } from '@negative-space/text'
import React from 'react'

export interface BreadcrumbItemProps extends Omit<
  FlexProps,
  'as' | 'children' | 'prefix' | 'className' | 'style'
> {
  classNames?: {
    root?: string
    prefix?: string
    label?: string
  }
  styles?: {
    root?: React.CSSProperties
    prefix?: React.CSSProperties
    label?: React.CSSProperties
  }
  href?: string
  prefix?: React.ReactNode
  label: React.ReactNode
  current?: boolean
  labelProps?: Omit<TextProps, 'children' | 'className' | 'style'>
}

export const BreadcrumbItem = React.forwardRef<
  HTMLAnchorElement | HTMLSpanElement,
  BreadcrumbItemProps
>(({ classNames, styles, href, current, label, prefix, labelProps, ...props }, ref) => {
  const { global } = useNSUI()

  const isLink = href && !current

  return (
    <Flex
      {...props}
      as={isLink ? 'a' : 'div'}
      href={href}
      className={cn(`${global.prefixCls}-breadcrumb-item`, classNames?.root)}
      style={styles?.root}
    >
      <span
        className={cn(`${global.prefixCls}-breadcrumb-item-prefix`, classNames?.prefix)}
        style={styles?.prefix}
      >
        {prefix}
      </span>
      <Text
        {...labelProps}
        ref={ref as React.Ref<HTMLSpanElement>}
        className={cn(`${global.prefixCls}-breadcrumb-item-label`, classNames?.label)}
        style={styles?.label}
        aria-current={current ? 'page' : undefined}
        data-current={current}
      >
        {label}
      </Text>
    </Flex>
  )
})

BreadcrumbItem.displayName = 'BreadcrumbItem'
