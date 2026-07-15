import React from 'react'

import { Skeleton, type SkeletonProps } from '..'

export default {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  args: {
    className: 'w-40 h-40 bg-neutral-300'
  }
}

export const Default = (args: SkeletonProps) => <Skeleton {...args} />
