import { Resizable, ResizableHandle, ResizablePanel } from '@negative-space/resizable'
import { cn } from '@negative-space/system'
import React from 'react'

import { Sidebar, type SidebarProps } from '..'

export default {
  title: 'Layout/Sidebar',
  component: Sidebar,
  tags: ['autodocs']
}

export const Default = (args: SidebarProps) => (
  <Sidebar
    {...args}
    classNames={{
      root: 'h-70 w-60 relative bg-neutral-200 data-[collapsed=true]:w-20 transition-width duration-800 ease-in-out',
      collapseButton: {
        root: 'absolute top-2 right-2 text-neutral-500 hover:text-neutral-700',
        icon: 'w-4.5 h-4.5'
      }
    }}
  />
)

export const WithLayout = (args: SidebarProps) => {
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <Resizable className="w-full">
      <Sidebar
        {...args}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        minSize={20}
        defaultSize={30}
        classNames={{
          root: 'h-60 relative bg-neutral-200',
          collapseButton: {
            root: 'absolute top-2 right-2 text-neutral-500 hover:text-neutral-700',
            icon: 'w-4.5 h-4.5'
          }
        }}
        resizable
      />

      <ResizableHandle
        className={`w-1 bg-neutral-300 ${collapsed ? 'cursor-default' : 'cursor-ew-resize'}`}
      />

      <ResizablePanel as="main" className="pl-4" defaultSize={70}>
        Content
      </ResizablePanel>
    </Resizable>
  )
}

export const AnimatedCollapse = (args: SidebarProps) => {
  const [collapsed, setCollapsed] = React.useState(false)
  const [animate, setAnimate] = React.useState(false)

  const handleCollapsedChange = (value: boolean) => {
    setAnimate(true)
    setCollapsed(value)

    window.setTimeout(() => {
      setAnimate(false)
    }, 800)
  }

  return (
    <Resizable className="w-full">
      <Sidebar
        {...args}
        collapsed={collapsed}
        onCollapsedChange={handleCollapsedChange}
        minSize={20}
        defaultSize={30}
        classNames={{
          root: cn(
            'h-60 relative bg-neutral-200',
            animate && 'transition-flex-basis duration-800 ease-in-out'
          ),
          collapseButton: {
            root: 'absolute top-2 right-2 text-neutral-500 hover:text-neutral-700',
            icon: 'w-4.5 h-4.5'
          }
        }}
        resizable
      />

      <ResizableHandle
        className={`w-1 bg-neutral-300 ${collapsed ? 'cursor-default' : 'cursor-ew-resize'}`}
      />

      <ResizablePanel as="main" className="pl-4" defaultSize={70}>
        Content
      </ResizablePanel>
    </Resizable>
  )
}
