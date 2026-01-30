import type { Meta, StoryObj } from '@storybook/react'
import { Heading } from '../src'

const meta: Meta<typeof Heading> = {
  title: 'Typography/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span']
    },
    children: {
      control: 'text'
    }
  }
}

export default meta

export const Default: StoryObj<typeof Heading> = {
  args: {
    as: 'h1',
    children: 'Hello World'
  }
}
