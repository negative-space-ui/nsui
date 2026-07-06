import React from 'react'

import { Resizable, ResizableHandle, ResizablePanel, type ResizableProps } from '..'

export default {
  title: 'Layout/Resizable',
  component: Resizable,
  tags: ['autodocs'],
  args: {
    className: 'w-full h-40'
  }
}

export const Default = (args: ResizableProps) => (
  <Resizable {...args}>
    <ResizablePanel defaultSize={50} className="bg-neutral-200 p-4 text-neutral-700">
      Panel 1
    </ResizablePanel>
    <ResizableHandle className="w-1 bg-neutral-300" />
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
    <ResizableHandle className="h-1 bg-neutral-300" />
    <ResizablePanel defaultSize={50} className="bg-neutral-200 p-4 text-neutral-700">
      Panel 2
    </ResizablePanel>
  </Resizable>
)
