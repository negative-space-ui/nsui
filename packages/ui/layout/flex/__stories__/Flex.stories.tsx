import React from 'react'

import { Flex, type FlexProps } from '..'

export default {
  title: 'Layout/Flex',
  component: Flex,
  tags: ['autodocs'],
  args: {
    children: (
      <>
        <div>Content 1</div>
        <div>Content 2</div>
      </>
    )
  }
}

export const Default = (args: FlexProps) => <Flex {...args} gap="0.5rem" />

export const Vertical = (args: FlexProps) => <Flex {...args} direction="column" gap="0.5rem" />
