import { CollectionGroup, type CollectionGroupProps } from '@negative-space/collection'
import { Flex, type FlexProps } from '@negative-space/flex'
import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

export interface MenuGroupProps extends Omit<
  CollectionGroupProps,
  'classNames' | 'styles' | 'prefix'
> {
  classNames?: CollectionGroupProps['classNames'] & {
    content?: string
    prefix?: string
  }
  styles?: CollectionGroupProps['styles'] & {
    content?: React.CSSProperties
    prefix?: React.CSSProperties
  }
  prefix?: React.ReactNode
  flexProps?: Omit<FlexProps<'div'>, 'className' | 'style'>
}

export const MenuGroup = ({
  classNames,
  styles,
  prefix,
  heading,
  children,
  flexProps,
  ...props
}: MenuGroupProps) => {
  const { global } = useNSUI()

  const flexPropsWithDefaults: FlexProps<'div'> = {
    direction: 'column',
    ...flexProps
  }

  return (
    <CollectionGroup
      {...props}
      heading={
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
        </>
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
      <Flex
        {...flexPropsWithDefaults}
        className={cn(`${global.prefixCls}-menu-group-content`, classNames?.content)}
      >
        {children}
      </Flex>
    </CollectionGroup>
  )
}

MenuGroup.displayName = 'MenuGroup'
