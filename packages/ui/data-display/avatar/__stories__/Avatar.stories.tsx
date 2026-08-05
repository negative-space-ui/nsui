import React from 'react'

import { Avatar, type AvatarProps } from '..'

export default {
  title: 'Data Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    className:
      'h-20 w-20 flex items-center justify-center rounded-full border border-neutral-300 text-white text-4xl font-medium'
  }
}

export const Default = (args: AvatarProps) => (
  <Avatar {...args} src="https://picsum.photos/id/10/200/200" />
)

export const WithName = (args: AvatarProps) => (
  <Avatar {...args} name="Negative Space" backgroundColors={['#DA70D6']} />
)

export const WithSrc = (args: AvatarProps) => (
  <Avatar {...args} src="https://picsum.photos/id/10/200/200" />
)

export const WithFallbackImage = (args: AvatarProps) => (
  <Avatar {...args} fallbackImage="https://picsum.photos/id/12/200/200" />
)
