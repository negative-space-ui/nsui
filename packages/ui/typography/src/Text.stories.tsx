import type { Meta, StoryObj } from '@storybook/react'
import { Text } from './Text'

const meta: Meta<typeof Text> = {
  title: 'Typography/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['span', 'p', 'label', 'small']
    },
    children: {
      control: 'text'
    }
  }
}

export default meta

export const Default: StoryObj<typeof Text> = {
  args: {
    as: 'span',
    children: 'Hello World'
  }
}
