import { Flex, type FlexProps } from '@negative-space/flex'
import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

import { BreadcrumbItem, type BreadcrumbItemProps } from './BreadcrumbItem'

export interface BreadcrumbProps extends Omit<FlexProps, 'children' | 'className' | 'style'> {
  separator?: React.ReactNode
  classNames?: {
    root?: string
    items?: BreadcrumbItemProps['classNames']
    separator?: string
  }
  styles?: {
    root?: React.CSSProperties
    items?: BreadcrumbItemProps['styles']
    separator?: React.CSSProperties
  }
  items?: Omit<BreadcrumbItemProps, 'className' | 'style' | 'current'>[]
}

export const Breadcrumb = React.forwardRef<HTMLDivElement, BreadcrumbProps>(
  ({ classNames, styles, items, separator, ...props }, ref) => {
    const { global, components } = useNSUI()

    const Separator = separator ?? components?.breadcrumb?.separator

    return (
      <Flex
        {...props}
        ref={ref}
        className={cn(`${global.prefixCls}-breadcrumb`, classNames?.root)}
        style={styles?.root}
      >
        {items?.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <span
                aria-hidden="true"
                className={cn(`${global.prefixCls}-breadcrumb-separator`, classNames?.separator)}
                style={styles?.separator}
              >
                {Separator}
              </span>
            )}

            <BreadcrumbItem
              {...item}
              current={index === items.length - 1}
              classNames={classNames?.items}
              styles={styles?.items}
            />
          </React.Fragment>
        ))}
      </Flex>
    )
  }
)

Breadcrumb.displayName = 'Breadcrumb'
