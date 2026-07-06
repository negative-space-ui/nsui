import { IconButton, type IconButtonProps } from '@negative-space/button'
import { ResizablePanel, type ResizablePanelProps } from '@negative-space/resizable'
import { cn, PanelLeft, PanelRight, useNSUI } from '@negative-space/system'
import React, { useState } from 'react'

export interface SidebarProps extends Omit<
  React.HTMLAttributes<HTMLDivElement> & Omit<ResizablePanelProps, 'as' | 'className' | 'style'>,
  'className' | 'style'
> {
  classNames?: {
    root?: string
    collapseButton?: IconButtonProps['classNames']
  }
  styles?: {
    root?: React.CSSProperties
    collapseButton?: IconButtonProps['styles']
  }
  resizable?: boolean
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  collapsedSize?: number
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      classNames,
      styles,
      collapsed: collapsedProp,
      onCollapsedChange,
      resizable,
      collapsedSize = 80,
      children,
      ...props
    },
    ref
  ) => {
    const { global } = useNSUI()
    const [internalCollapsed, setInternalCollapsed] = useState(false)
    const isControlled = collapsedProp !== undefined
    const collapsed = isControlled ? collapsedProp : internalCollapsed

    const toggleCollapsed = () => {
      const next = !collapsed
      if (!isControlled) setInternalCollapsed(next)
      onCollapsedChange?.(next)
    }

    const collapseButton = (
      <IconButton
        classNames={classNames?.collapseButton}
        styles={styles?.collapseButton}
        onClick={toggleCollapsed}
      >
        {collapsed ? <PanelRight /> : <PanelLeft />}
      </IconButton>
    )

    if (resizable) {
      return (
        <ResizablePanel
          {...props}
          ref={ref}
          as="aside"
          data-collapsed={collapsed}
          className={cn(
            `${global.prefixCls}-sidebar`,
            collapsed && `${global.prefixCls}-sidebar-collapsed`,
            classNames?.root
          )}
          style={{
            ...styles?.root,
            ...(collapsed && {
              flexGrow: 0,
              flexShrink: 0,
              flexBasis: `${collapsedSize}px`
            })
          }}
        >
          {children}
          {collapseButton}
        </ResizablePanel>
      )
    }

    return (
      <aside
        {...props}
        ref={ref}
        data-collapsed={collapsed}
        className={cn(
          `${global.prefixCls}-sidebar`,
          collapsed && `${global.prefixCls}-sidebar-collapsed`,
          classNames?.root
        )}
        style={styles?.root}
      >
        {children}
        {collapseButton}
      </aside>
    )
  }
)

Sidebar.displayName = 'Sidebar'
