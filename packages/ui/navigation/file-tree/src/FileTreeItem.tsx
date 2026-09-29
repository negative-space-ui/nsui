import { Flex, type FlexProps } from '@negative-space/flex'
import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

export interface FileTreeItemProps extends Omit<
  FlexProps,
  'children' | 'className' | 'style' | 'prefix'
> {
  classNames?: {
    root?: string
    prefix?: string
    label?: string
    suffix?: string
  }
  styles?: {
    root?: React.CSSProperties
    prefix?: React.CSSProperties
    label?: React.CSSProperties
    suffix?: React.CSSProperties
  }
  prefix?: React.ReactNode
  label?: React.ReactNode
  suffix?: React.ReactNode
}

export const FileTreeItem = React.forwardRef<HTMLDivElement, FileTreeItemProps>(
  ({ classNames, styles, prefix, label, suffix, ...props }, ref) => {
    const { global } = useNSUI()

    return (
      <Flex
        ref={ref}
        className={cn(`${global?.prefixCls}-file-tree-item`, classNames?.root)}
        style={styles?.root}
        {...props}
      >
        {prefix && (
          <div
            className={cn(`${global?.prefixCls}-file-tree-item-prefix`, classNames?.prefix)}
            style={styles?.prefix}
          >
            {prefix}
          </div>
        )}

        <div
          className={cn(`${global?.prefixCls}-file-tree-item-label`, classNames?.label)}
          style={styles?.label}
        >
          {label}
        </div>

        {suffix && (
          <div
            className={cn(`${global?.prefixCls}-file-tree-item-suffix`, classNames?.suffix)}
            style={styles?.suffix}
          >
            {suffix}
          </div>
        )}
      </Flex>
    )
  }
)

FileTreeItem.displayName = 'FileTreeItem'
