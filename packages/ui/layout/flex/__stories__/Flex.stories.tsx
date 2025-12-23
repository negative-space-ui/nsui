import React from 'react'
import { Flex, type FlexProps } from '../src/Flex'

export default {
  title: 'Layout/Flex',
  component: Flex,
  tags: ['autodocs']
}

export const Default = (args: FlexProps) => (
  <Flex {...args}>
    <span>Flex Item 1</span>
    <span>Flex Item 2</span>
  </Flex>
)
