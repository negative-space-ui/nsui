import React from 'react'
import { Button, ButtonProps } from './Button'

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    left: { control: { type: 'text' } },
    right: { control: { type: 'text' } },
    children: { control: { type: 'text' } }
  }
}

export const Default = (args: ButtonProps) => (
  <Button
    {...args}
    classNames={
      args.classNames ?? {
        root: 'bg-blue-200 p-2 rounded-md border-1 border-blue-300/50 text-blue-700 hover:bg-blue-300 active:scale-97'
      }
    }
  >
    {args.children ?? 'Button'}
  </Button>
)
