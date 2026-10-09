import { IconButton, type IconButtonProps } from '@negative-space/button'
import { Flex, type FlexProps } from '@negative-space/flex'
import { ChevronDown, cn, useNSUI } from '@negative-space/system'
import React, { useEffect, useState } from 'react'

export interface FileTreeFolderProps extends Omit<
  FlexProps,
  'children' | 'className' | 'style' | 'prefix'
> {
  classNames?: {
    root?: string
    header?: string
    collapseButton?: IconButtonProps['classNames']
    prefix?: string
    label?: string
    suffix?: string
    children?: string
  }
  styles?: {
    root?: React.CSSProperties
    header?: React.CSSProperties
    collapseButton?: IconButtonProps['styles']
    prefix?: React.CSSProperties
    label?: React.CSSProperties
    suffix?: React.CSSProperties
    children?: React.CSSProperties
  }
  prefix?: React.ReactNode
  label?: React.ReactNode
  suffix?: React.ReactNode
  children?: React.ReactNode
  collapsable?: boolean
  collapsed?: boolean
  setCollapsed?: (collapsed: boolean) => void
  active?: boolean
}

export const FileTreeFolder = React.forwardRef<HTMLDivElement, FileTreeFolderProps>(
  (
    {
      children,
      classNames,
      styles,
      collapsable = true,
      collapsed = true,
      setCollapsed: setCollapsedProp,
      prefix,
      label,
      suffix,
      active,
      ...props
    },
    ref
  ) => {
    const { global } = useNSUI()
    const [collapsedState, setCollapsedState] = useState(collapsed)

    useEffect(() => {
      setCollapsedState(collapsed)
    }, [collapsed])

    const isCollapsed = setCollapsedProp ? collapsed : collapsedState

    const handleCollapse = () => {
      const nextCollapsed = !isCollapsed

      setCollapsedState(nextCollapsed)
      setCollapsedProp?.(nextCollapsed)
    }

    return (
      <Flex
        direction="column"
        className={cn(`${global?.prefixCls}-file-tree-folder`, classNames?.root)}
        data-active={active}
        style={styles?.root}
      >
        <Flex
          ref={ref}
          {...props}
          className={cn(`${global?.prefixCls}-file-tree-folder-header`, classNames?.header)}
          data-active={active}
          data-collapsed={isCollapsed}
          style={styles?.header}
        >
          {collapsable && (
            <IconButton
              classNames={classNames?.collapseButton}
              data-collapsed={isCollapsed}
              styles={styles?.collapseButton}
              onClick={handleCollapse}
            >
              <ChevronDown
                style={{
                  transform: isCollapsed ? 'rotate(-90deg)' : '',
                  ...styles?.collapseButton?.icon
                }}
              />
            </IconButton>
          )}

          {prefix && (
            <div
              className={cn(`${global?.prefixCls}-file-tree-folder-prefix`, classNames?.prefix)}
              style={styles?.prefix}
            >
              {prefix}
            </div>
          )}

          <div
            className={cn(`${global?.prefixCls}-file-tree-folder-label`, classNames?.label)}
            style={styles?.label}
          >
            {label}
          </div>

          {suffix && (
            <div
              className={cn(`${global?.prefixCls}-file-tree-folder-suffix`, classNames?.suffix)}
              style={styles?.suffix}
            >
              {suffix}
            </div>
          )}
        </Flex>

        {!isCollapsed && (
          <div
            className={cn(`${global?.prefixCls}-file-tree-folder-children`, classNames?.children)}
            style={styles?.children}
          >
            {children}
          </div>
        )}
      </Flex>
    )
  }
)

FileTreeFolder.displayName = 'FileTreeFolder'
