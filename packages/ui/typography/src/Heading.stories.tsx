import type { Meta, StoryObj } from '@storybook/react'
import { Heading } from './Heading'

const meta: Meta<typeof Heading> = {
  title: 'Typography/Heading',
  component: Heading,
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    },
    children: {
      control: 'text'
    }
  }
}

export default meta

type Story = StoryObj<typeof Heading>

export const Default: Story = {
  args: {
    as: 'h1',
    children: 'Hello World'
  }
}
