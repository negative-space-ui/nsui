import type { Meta, StoryObj } from '@storybook/react'
import { Text } from './Text'

const meta: Meta<typeof Text> = {
  title: 'Typography/Text',
  component: Text,
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

type Story = StoryObj<typeof Text>

export const Default: Story = {
  args: {
    as: 'span',
    children: 'Hello World'
  }
}
