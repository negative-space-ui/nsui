import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Flex } from '../src'

const meta: Meta<typeof Flex> = {
  title: 'Layout/Flex',
  component: Flex,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: [
        'div',
        'aside',
        'header',
        'footer',
        'main',
        'section',
        'nav',
        'article',
        'label',
        'fieldset',
        'ol',
        'ul',
        'li',
        'dl',
        'dt',
        'dd',
        'button',
        'form'
      ]
    },
    direction: {
      control: 'select',
      options: ['row', 'column', 'row-reverse', 'column-reverse']
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse']
    },
    alignItems: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch']
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly']
    }
  }
}

export default meta

export const Default: StoryObj<typeof Flex> = {
  args: {
    children: (
      <>
        <span>Flex Item 1</span>
        <span>Flex Item 2</span>
      </>
    )
  }
}
