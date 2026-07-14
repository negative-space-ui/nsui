import React from 'react'

import { Grid, type GridProps } from '..'

export default {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  args: {
    className: 'w-50',
    children: (
      <>
        <div>Content 1</div>
        <div>Content 2</div>
        <div>Content 3</div>
        <div>Content 4</div>
      </>
    )
  }
}

export const Default = (args: GridProps) => <Grid {...args} />
