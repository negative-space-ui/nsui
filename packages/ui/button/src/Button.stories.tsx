import React from 'react'
import { Button, type ButtonProps } from './Button'

export default {
  title: 'Actions/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    prefix: { control: { type: 'text' } },
    suffix: { control: { type: 'text' } },
    children: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } }
  }
}

export const Default = (args: ButtonProps) => (
  <Button
    {...args}
    classNames={
      args.classNames ?? {
        root: 'bg-neutral-300 rounded-md border-1 border-neutral-400/50 text-neutral-700 font-medium hover:bg-neutral-400 active:scale-97'
      }
    }
  >
    {args.children ?? 'Button'}
  </Button>
)
