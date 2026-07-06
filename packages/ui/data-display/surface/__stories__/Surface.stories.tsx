import React from 'react'

import { Surface, type SurfaceProps } from '../src'

export default {
  title: 'Data Display/Surface',
  component: Surface,
  tags: ['autodocs'],
  args: {
    className: 'bg-neutral-200 p-4 rounded-md shadow-sm w-40 h-40 border-1 border-neutral-300/50'
  }
}

export const Default: React.FC<SurfaceProps> = (args) => <Surface {...args} />
