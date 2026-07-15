import React from 'react'

import { Resizable, ResizableHandle, ResizablePanel, type ResizableProps } from '..'

export default {
  title: 'Layout/Resizable',
  component: Resizable,
  tags: ['autodocs'],
  args: {
    className: 'w-full h-12 overflow-hidden'
  }
}

export const Default = (args: ResizableProps) => (
  <Resizable {...args}>
    <ResizablePanel defaultSize={50} className="bg-neutral-200 p-4 text-neutral-700">
      Panel 1
    </ResizablePanel>
    <ResizableHandle className="h-14 cursor-ew-resize border-2 border-neutral-300" />
    <ResizablePanel defaultSize={50} className="bg-neutral-200 p-4 text-neutral-700">
      Panel 2
    </ResizablePanel>
  </Resizable>
)

export const Vertical = (args: ResizableProps) => (
  <Resizable {...args} direction="column">
    <ResizablePanel defaultSize={50} className="bg-neutral-200 p-4 text-neutral-700">
      Panel 1
    </ResizablePanel>
    <ResizableHandle
      orientation="vertical"
      className="w-20 cursor-ns-resize border-2 border-neutral-300"
    />
    <ResizablePanel defaultSize={50} className="bg-neutral-200 p-4 text-neutral-700">
      Panel 2
    </ResizablePanel>
  </Resizable>
)
